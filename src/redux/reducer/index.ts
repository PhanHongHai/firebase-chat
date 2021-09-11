import {combineReducers} from 'redux'
import authReducer from './auth';
import configReducer from './config';

export default combineReducers({
    auth:authReducer,
    config:configReducer
})