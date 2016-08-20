import { combineReducers } from 'redux';
import * as UserReducers from "./user";
import * as PulseReducers from "./pulse";
import * as NotificationReducers from "./notification";

export const combinedReducers = combineReducers(
  Object.assign(
    UserReducers,
    PulseReducers,
    NotificationReducers
  )
);