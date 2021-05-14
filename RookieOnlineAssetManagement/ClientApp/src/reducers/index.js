import { combineReducers } from 'redux'
import user from './user'
import asset from './asset'

const rootReducer = combineReducers({ user, asset });

export default rootReducer;