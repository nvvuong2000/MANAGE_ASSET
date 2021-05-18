import { combineReducers } from 'redux'
import user from './user'
import asset from './asset'
import category from './category'

const rootReducer = combineReducers({ user, asset,category });

export default rootReducer;