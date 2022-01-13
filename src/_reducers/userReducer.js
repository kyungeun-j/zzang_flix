import { LOGIN_USER, LOGOUT_USER } from '../_actions/types'

const initialState = {
    isLogin: false,
    userEmail: undefined
};

export default function (state=initialState, action) {
    console.log(state, action)
    switch (action.type) {
        case LOGIN_USER:
            return action.payload.result === true ? { isLogin: true, userEmail: action.payload.userEmail } : { ...state };
        case LOGOUT_USER:
            return action.payload === true ? { isLogin: false, userEmail: undefined} :
            { ...state };
        default:
            return state;
    }
}