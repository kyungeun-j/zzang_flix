import { CONTENT_LIST } from '../_actions/types'

const initialState = {
    content: [],
    randomContent: {}
};

export default function (state=initialState, action) {
    console.log(action)
    switch (action.type) {
        case CONTENT_LIST:
            return action.payload.length > 0 ? { content: action.payload, randomContent: action.payload[Math.floor(Math.random() * action.payload.length)] } : { ...state };
        default:
            return state;
    }
}