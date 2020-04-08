// store/reducers/seen-reducer.ts

import Film from "../../helpers/film-model";
import {AnyAction} from "redux";

const initialState = { watchedFilms: new Array<Film>() }

function toggleSeen(state = initialState, action: AnyAction ) {
    let nextState;
    switch (action.type) {
        case 'TOGGLE_SEEN':
            const film: Film = action.value;
            const SeenFilms: Film[] = state.watchedFilms;
            const indexOfFilmOccurence = SeenFilms.findIndex((seenFilm: Film) => seenFilm.id === film.id);
            const newSeenFilms = indexOfFilmOccurence === -1 ? [...SeenFilms, film] : SeenFilms.filter((seenFilm: Film) => seenFilm.id !== film.id);
            nextState = {
                ...state,
                watchedFilms: newSeenFilms
            };
            return nextState;
        default:
            return state
    }
}

export default toggleSeen;
