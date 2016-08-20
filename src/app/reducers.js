import { combineReducers } from 'redux';
import * as GiphyReducers from "../giphySearch/giphySearchReducer";

export const combinedReducers = combineReducers(
  Object.assign(
    GiphyReducers
  )
);