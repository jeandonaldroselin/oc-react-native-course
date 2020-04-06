// components/film-item.js

import React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import Film from '../helpers/film-model';
import moment from 'moment';
import {getImageFromApi} from "../api/tmdb-api";
import FadeIn from "../animations/fade-in";

class FilmItem extends React.Component<{ film: Film, displayDetailForFilm: Function, isFilmFavorite: boolean }> {

    _displayFavoriteImage() {
        if (this.props.isFilmFavorite) {
            // Film dans nos favoris
            const sourceImage = require('../images/ic_favorite.png')
            return (
                <Image
                    style={styles.favorite_image}
                    source={sourceImage}
                />
            )
        }
        return null;
    }

    render() {
        const { film, displayDetailForFilm } = this.props;
        return (
            <FadeIn>
                <TouchableOpacity style={styles.main_container} activeOpacity={0.6} onPress={() => displayDetailForFilm(film.id)}>
                    {
                        film.poster_path ?
                        <Image source={{uri : getImageFromApi(film.poster_path)}} style={styles.thumbnailImage} />
                        :
                        <View style={styles.thumbnailImage}/>
                    }
                    <View style={styles.content_container}>
                        <View style={styles.title_container}>
                            {this._displayFavoriteImage()}
                            <Text style={styles.title_text}>
                                {film.title}
                            </Text>
                            <Text style={styles.rate_text}>{film.vote_average}</Text>
                        </View>
                        <View style={styles.description_container}>
                            <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                        </View>
                        <View style={styles.date_container}>
                            <Text style={styles.date_text}>Sorti le {moment(film.release_date).format('DD/MM/Y')}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row',
    },
    title_text: {
        fontSize: 20,
        fontWeight: 'bold',
        height: '100%',
        flex: 1,
        flexWrap: 'wrap'
    },
    rate_text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#666666',
    },
    title_container: {
        flexDirection: 'row',
        flex: 3,
    },
    thumbnailImage: {
      backgroundColor: 'gray',
      height: 180,
      width: 120,
      margin: 5,
    },
    description_container: {
        flex: 7
    },
    description_text: {
        color: '#666666',
        fontStyle: 'italic'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        fontSize: 14,
        textAlign: 'right',
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5
    }
});

export default FilmItem;
