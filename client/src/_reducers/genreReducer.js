import { GENRE_LIST } from '../_actions/types'

const initialState = {
    
};

export default function (state=initialState, action) {
    console.log(action)
    switch (action.type) {
        case GENRE_LIST:
            return action.payload.length > 0 ? { state: action.payload } : { ...state };
        default:
            return state;
    }
}