// store/reducers/favorite-reducer.ts

import Film from "../../helpers/film-model";
import {AnyAction} from "redux";

const initialState = { favoriteFilms: new Array<Film>() }

function toggleFavorite(state = initialState, action: AnyAction ) {
    let nextState;
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const film: Film = action.value;
            const favoriteFilms: Film[] = state.favoriteFilms;
            const indexOfFilmOccurence = favoriteFilms.findIndex((favoriteFilm: Film) => favoriteFilm.id === film.id);
            const newFavoritesFilm = indexOfFilmOccurence === -1 ? [...favoriteFilms, film] : favoriteFilms.filter((favoriteFilm: Film) => favoriteFilm.id !== film.id);
            nextState = {
                ...state,
                favoriteFilms: newFavoritesFilm
            };
            return nextState;
        default:
            return state
    }
}

export default toggleFavorite;
