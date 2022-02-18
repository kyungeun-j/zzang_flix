import { combineReducers } from 'redux';
import user from './userReducer';
import content from './contentReducer';

const rootReducer = combineReducers({
    user,
    content
});

export default rootReducer;