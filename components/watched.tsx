// components/favorites.tsx

import React from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native'
import {connect} from "react-redux";
import FilmListCircle from "./film-list-circle";
import Film from "../helpers/film-model";

class Watched extends React.Component<{ navigation: any, favoriteFilms: Film[], watchedFilms: Film[] }> {

    render() {
        return (
            <SafeAreaView style={styles.main_container}>
                <FilmListCircle films={this.props.watchedFilms}
                          navigation={this.props.navigation}
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
        watchedFilms: state.toggleWatched.watchedFilms
    }
};

export default connect(mapStateToProps)(Watched);
