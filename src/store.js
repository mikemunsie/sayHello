import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combinedReducers } from "./reducers";

const initialState = {};

export let configureStore = () => {
  return createStore(
    combinedReducers,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware
      )
    )
  )
}