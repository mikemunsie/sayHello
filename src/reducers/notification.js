import _ from "lodash";
import { NOTIFICATION_RECEIVED } from "../actions/notification";

const defaultState = {};

export const Notification = (state = defaultState, action) => {
  switch (action.type) {
    case NOTIFICATION_RECEIVED:
      return _.cloneDeep(action.user);
    default:
      return state;
  }
}