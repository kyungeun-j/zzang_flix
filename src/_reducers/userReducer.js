import { LOGIN_USER, AUTH_USER, LOGOUT_USER } from '../_actions/types'

const initialState = {
    isLogin: false,
    userEmail: undefined
};

export default function (state=initialState, action) {
    console.log(state, action)
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, isLogin: true, userEmail: action.payload.userEmail };
        case LOGOUT_USER:
            return action.payload === true ? { isLogin: false, userEmail: undefined} :
            { ...state, isLogin: true, userEmail: action.payload.userEmail };
        default:
            return state;
    }
}