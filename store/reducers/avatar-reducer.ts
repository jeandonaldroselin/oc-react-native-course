// store/reducers/avatar-reducer.ts

import {AnyAction} from "redux";

const initialState = { avatar: require('../../images/ic_tag_faces.png') }

function setAvatar(state = initialState, action: AnyAction ) {
    let nextState;
    switch (action.type) {
        case 'SET_AVATAR':
            const avatar: { uri: string } = action.value;
            nextState = {
                ...state,
                avatar: avatar
            };
            return nextState;
        default:
            return state
    }
}

export default setAvatar;
