import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import Film from "../helpers/film-model";
import FilmItemCircle from "./film-item-circle";

class FilmListCircle extends React.Component<{ navigation: any, films: Film[], onEndReached: Function }> {

    _displayDetailForFilm = (filmId: number) => {
        this.props.navigation && this.props.navigation.navigate('FilmDetail', { filmId: filmId });
    };

    render() {
        return (
            <View style={styles.main_container}>
                <FlatList
                showsVerticalScrollIndicator={true}
                data={this.props.films}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <FilmItemCircle film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    this.props.onEndReached()
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    }
});

export default FilmListCircle;
