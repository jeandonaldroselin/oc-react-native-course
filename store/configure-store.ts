// store/configure-store.js

import {combineReducers, createStore} from 'redux';
import toggleFavorite from './reducers/favorite-reducer'
import setAvatar from "./reducers/avatar-reducer";

export default createStore(combineReducers({toggleFavorite, setAvatar}))
