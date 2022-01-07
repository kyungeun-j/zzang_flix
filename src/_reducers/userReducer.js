import { LOGIN_USER } from '../_actions/types'

export default function (state={}, action) {
    console.log(action)
    switch (action.type) {
        case LOGIN_USER:
            console.log(state, action)
            // return { ...state, user: action.user };
        default:
            return state;
    }
}