import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import post from './postReducer'

export const reducers = combineReducers({ auth, posts, post });