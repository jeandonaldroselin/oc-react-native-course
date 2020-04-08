import React from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";
import Film from "../helpers/film-model";
import {getBestFilmsFromApi} from "../api/tmdb-api";
import {connect} from "react-redux";
import FilmList from "./film-list";

class News extends React.Component<{ navigation: any, favoriteFilms: Film[] }, { films: Film[], isLoading: boolean }> {

    private page: number = 1;
    private totalPages: any = null;

    constructor(props: any) {
        super(props);
        this.page = 0;
        this.totalPages = 0;
        this.state = {
            films: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this._loadFilms()
    }

    _loadFilms() {
            this.setState({ isLoading: true })
            getBestFilmsFromApi(this.page + 1).then(data => {
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
                <FilmList films={this.state.films}
                          navigation={this.props.navigation}
                          favoriteFilms={this.props.favoriteFilms}
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
        flex: 1
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
        favoriteFilms: state.toggleFavorite.favoriteFilms
    }
};

export default connect(mapStateToProps)(News);
