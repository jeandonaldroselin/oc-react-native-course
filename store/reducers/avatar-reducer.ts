// store/reducers/avatar-reducer.ts

const initialState = { avatar: require('../../images/ic_tag_faces.png') }

function setAvatar(state = initialState, action: { type: string, value: { uri: string } }) {
    let nextState;
    switch (action.type) {
        case 'SET_AVATAR':
            nextState = {
                ...state,
                avatar: action.value
            };
            return nextState;
        default:
            return state
    }
}

export default setAvatar;
