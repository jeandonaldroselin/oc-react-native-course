import React from 'react';
import {ActivityIndicator, Button, FlatList, Image, StyleSheet, TextInput, View} from "react-native";
import Film from "../helpers/film-model";
import {getFilmsFromApiWithSearchedText} from "../api/tmdb-api";
import {connect} from "react-redux";
import FilmList from "./film-list";

class Search extends React.Component<{ navigation: any, favoritesFilm: Film[] }, { films: Film[], isLoading: boolean }> {

    private searchedText: string = '';
    private page: number = 1;
    private totalPages: any = null;

    constructor(props: any) {
        super(props);
        this.searchedText = '';
        this.page = 0;
        this.totalPages = 0;
        this.state = {
            films: [],
            isLoading: false
        }
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true })
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page;
                this.totalPages = data.total_pages;
                const mergedFilms: Film[] = [];
                this.state.films.concat(data.results).filter(function(item){
                    const i = mergedFilms.findIndex(x => x.id == item.id);
                    if(i <= -1){
                        mergedFilms.push(item);
                    }
                    return null;
                });
                console.log("mergedFilms : ", mergedFilms);
                this.setState({
                    films: mergedFilms,
                    isLoading: false
                })
            })
        }
    }

    _searchTextInputChanged(text: string) {
        this.searchedText = text
    }

    _searchFilms() {
        this.page = 0;
        this.totalPages = 0;
        this.setState({
            films: [],
        }, () => {
            this._loadFilms()
        })
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput style={[styles.textinput]}
                           placeholder={'Titre du film'}
                           onSubmitEditing={() => this._searchFilms()}
                           onChangeText={(text) => this._searchTextInputChanged(text) }/>
                <Button title={'Rechercher'} onPress={() => this._searchFilms()}>rechercher</Button>
                <FilmList films={this.state.films}
                          navigation={this.props.navigation}
                          favoritesFilm={this.props.favoritesFilm}
                          onEndReached={() => {
                              if (this.page < this.totalPages) {
                                  this._loadFilms()
                              }
                          }}/>
               {this._displayLoading()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
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
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
};

export default connect(mapStateToProps)(Search);
