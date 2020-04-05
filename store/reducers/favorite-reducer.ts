// store/reducers/favorite-reducer.ts

import Film from "../../helpers/film-model";

const initialState = { favoritesFilm: new Array<Film>() }

function toggleFavorite(state = initialState, action: { type: string, value: Film }) {
    let nextState;
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const film = action.value;
            const favoritesFilm: Film[] = state.favoritesFilm;
            const indexOfFilmOccurence = favoritesFilm.findIndex((favoriteFilm: Film) => favoriteFilm.id === film.id);
            const newFavoritesFilm = indexOfFilmOccurence === -1 ? [...favoritesFilm, film] : favoritesFilm.filter((favoriteFilm: Film) => favoriteFilm.id !== film.id);
            nextState = {
                ...state,
                favoritesFilm: newFavoritesFilm
            };
            return nextState;
        default:
            return state
    }
}

export default toggleFavorite;
