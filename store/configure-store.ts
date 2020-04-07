// store/configure-store.js

import {createStore} from 'redux'
import toggleFavorite from './reducers/favorite-reducer'
import setAvatar from './reducers/avatar-reducer'
import { persistCombineReducers } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';


const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
};

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, setAvatar}))
