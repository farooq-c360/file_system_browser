import {combineReducers} from 'redux';
import files from './browser'
import recent from './recent'
import bookmark from './bookmark';

const rootReducer = combineReducers({
    files,
    recent,
    bookmark
});

export default rootReducer;