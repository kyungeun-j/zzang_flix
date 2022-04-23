import { CONTENT_LIST, GENRE_LIST } from '../_actions/types'

const initialState = {
    content: [],
    randomContent: {},
    genre: []
};

export default function (state=initialState, action) {
    console.log(action)
    switch (action.type) {
        case CONTENT_LIST:
            return action.payload.length > 0 ? 
            { ...state, content: action.payload, randomContent: action.payload[Math.floor(Math.random() * action.payload.length)] } : { ...state };
        case GENRE_LIST:
            return action.payload.length > 0 ? 
            { ...state, genre: action.payload } : { ...state };
        default:
            return state;
    }
}