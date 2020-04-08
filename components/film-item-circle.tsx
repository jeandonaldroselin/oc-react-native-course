// components/film-item.js

import React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import Film from '../helpers/film-model';
import moment from 'moment';
import {getImageFromApi} from "../api/tmdb-api";
import FadeIn from "../animations/fade-in";

class FilmItemCircle extends React.Component<{ film: Film, displayDetailForFilm: Function }, { isActive: boolean }> {


    constructor(props: any) {
        super(props);
        this.state = {
            isActive: false
        };
    }

    _getLabel() {
        const film = this.props.film;
        return this.state.isActive ?
            (
                <>
                    Sorti le {moment(film.release_date).format('DD/MM/Y')}
                </>
            ) :
            (
                <>
                {film.title}
                </>
            )

    }

    _toggleActive() {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    render() {
        const { film, displayDetailForFilm } = this.props;
        return (
            <FadeIn>
                <TouchableOpacity style={styles.main_container} activeOpacity={0.6} onLongPress={() => { this._toggleActive() }} onPress={() => displayDetailForFilm(film.id)}>
                    <View style={styles.left_container}>
                        {
                            film.poster_path ?
                                <Image source={{uri : getImageFromApi(film.poster_path)}} style={styles.thumbnail_image} />
                                :
                                <View style={styles.thumbnail_image}/>
                        }
                    </View>
                    <View style={styles.right_container}>
                        <View style={styles.title_container}>
                            <Text style={styles.title_text} numberOfLines={1}>
                                {this._getLabel()}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 115,
        flexDirection: 'row',
    },
    title_container: {
        justifyContent: 'center',
        flex: 1
    },
    title_text: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#666666',
    },
    thumbnail_image: {
      backgroundColor: 'gray',
      height: 90,
      width: 90,
      borderRadius: 60,
    },
    left_container: {
        flex: 1,
        justifyContent: 'center',
        maxWidth: 120,
        alignItems: 'center',
    },
    right_container: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default FilmItemCircle;
