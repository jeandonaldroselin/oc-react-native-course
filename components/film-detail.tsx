// components/film-detail.tsx

import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity,
    Share,
    Platform
} from 'react-native';
import {getFilmDetailFromApi, getImageFromApi} from "../api/tmdb-api";
import Film from "../helpers/film-model";
import moment from "moment";
import numeral from "numeral";
import { connect } from 'react-redux';
import EnlargeShrink from '../animations/enlarge-shrink';

class FilmDetail extends React.Component<{ navigation: any, favoritesFilm: Film[], dispatch: Function }, {film: Film, isLoading: boolean}> {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        if (params.film != undefined && Platform.OS === 'ios') {
            return {
                headerRight: () => (
                    <TouchableOpacity
                        style={styles.share_touchable_headerrightbutton}
                        onPress={() => params.shareFilm()}>
                        <Image
                            style={styles.share_image}
                            source={require('../images/ic_share.png')} />
                    </TouchableOpacity>
                )
            }
        }
    }

    constructor(props: any) {
        super(props);
        this.state = {
            film: undefined,
            isLoading: false
        }
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.getParam('filmId'))
            .then((film: Film) => {
                this.setState({
                    film: film,
                    isLoading: false
                }, () => {
                    this.props.navigation.setParams({ shareFilm : () => this._shareFilm(), film : this.state.film } );
                });
            });
    }

    componentDidUpdate() {
        console.log("componentDidUpdate : ");
        console.log(this.props.favoritesFilm);
    }

    _displayLoading() {
        if (this.state.isLoading) {
            // Si isLoading vaut true, on affiche le chargement à l'écran
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _displayFavoriteImage() {
        const isFavourite = (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1);
        const sourceImage = isFavourite ? require('../images/ic_favorite.png') : require('../images/ic_favorite_border.png');
        return (
            <EnlargeShrink shouldEnlarge={isFavourite}>
                <Image
                    style={styles.favorite_image}
                    source={sourceImage}
                />
            </EnlargeShrink>
        )
    }

    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action);
    }

    _displayFilm() {
        if (this.state.film != undefined) {
            const film = this.state.film;
            return (
                <ScrollView style={styles.scrollview_container}>
                    {
                        film.backdrop_path != '' ?
                        <Image source={{ uri: getImageFromApi(film.backdrop_path) }} style={styles.image}/>
                        :
                        <Image source={{ uri: getImageFromApi(film.poster_path) }} style={styles.image}/>
                    }
                    <Text style={styles.title}>{film.title}</Text>
                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description}>{film.overview}</Text>
                    <Text style={styles.label}>Sorti le { moment(film.release_date).format('DD/MM/Y')}</Text>
                    <Text style={styles.label}>Note: {film.vote_average} / 10</Text>
                    <Text style={styles.label}>Nombre de votes: {film.vote_count}</Text>
                    <Text style={styles.label}>Budget: {film.budget ? numeral(film.budget).format('0,0[.]00 $') : 'non disponible' }</Text>
                    <Text style={styles.label}>Genre(s): {
                        film.genres.map((genre) => {
                            return genre.name
                        }).join(" / ")
                    }</Text>
                    <Text style={styles.label}>Companie(s): {
                        film.production_companies.map((company) => {
                            return company.name
                        }).join(" / ")
                    }</Text>

                    {/* Pour l'instant je n'affiche que le titre, je vous laisserais le soin de créer la vue. Après tout vous êtes aussi là pour ça non ? :)*/}
                </ScrollView>
            )
        }
    }

    _shareFilm() {
        const { film } = this.state
        Share.share({ title: film.title, message: film.overview })
    }

    _displayFloatingActionButton() {
        const { film } = this.state
        if (film != undefined && Platform.OS === 'android') { // Uniquement sur Android et lorsque le film est chargé
            return (
                <TouchableOpacity
                    style={styles.share_touchable_floatingactionbutton}
                    onPress={() => this._shareFilm()}>
                    <Image
                        style={styles.share_image}
                        source={require('../images/ic_share.png')} />
                </TouchableOpacity>
            )
        }
    }

    render() {
        console.log('film Detail Props', this.props);
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
                {this._displayFloatingActionButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        padding: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        width: '100%',
        height: 190
    },
    title: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        paddingVertical: 10
    },
    description: {
        flex: 1,
        paddingVertical: 10,
        fontStyle: 'italic',
        color: '#666666'
    },
    label: {
        lineHeight: 30
    },
    favorite_container: {
        alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
    },
    favorite_image: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_image: {
        width: 30,
        height: 30
    },
    share_touchable_headerrightbutton: {
        marginRight: 8
    }
});

const mapStateToProps = (state: any) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
};

export default connect(mapStateToProps)(FilmDetail);
