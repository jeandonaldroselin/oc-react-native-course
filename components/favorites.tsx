// components/favorites.tsx

import React from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native'
import {connect} from "react-redux";
import FilmList from "./film-list";
import Film from "../helpers/film-model";

class Favorites extends React.Component<{ navigation: any, favoritesFilm: Film[] }> {

    render() {
        return (
            <SafeAreaView style={styles.main_container}>
                <FilmList films={this.props.favoritesFilm}
                          navigation={this.props.navigation}
                          favoritesFilm={this.props.favoritesFilm}
                          onEndReached={() => {}} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = (state: any) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
};

export default connect(mapStateToProps)(Favorites);
