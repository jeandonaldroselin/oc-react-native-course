// navigation/navigation.tsx

import React from 'react' // N'oubliez pas l'import de React ici. On en a besoin pour rendre nos components React Native Image !
import { createStackNavigator } from 'react-navigation-stack';
import Search from "../components/search";
import News from "../components/news";
import {createAppContainer} from "react-navigation";
import FilmDetail from "../components/film-detail";
import Favorites from "../components/favorites";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {StyleSheet, Image} from 'react-native';

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Search'
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: 'Detail'
        }
    }
});

const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: 'Detail'
        }
    }
});

const NewsStackNavigator = createStackNavigator({
    News: {
        screen: News,
        navigationOptions: {
            title: 'Latest Films'
        },
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: 'Detail'
        }
    }
});

const MoviesTabNavigator = createBottomTabNavigator({
        Search: {
            screen: SearchStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image source={require('../images/ic_search.png')} style={styles.icon}/>
                }
            }
        },
        Favorites: {
            screen: FavoritesStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image source={require('../images/ic_favorite.png')} style={styles.icon}/>
                }
            }
        },
        News: {
            screen: NewsStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image source={require('../images/ic_fiber_new.png')} style={styles.icon}/>
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false, // On masque les titres
            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
        }
    });

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(MoviesTabNavigator)
