import _ from "lodash";
import { PULSE_RECEIVED } from "./giphySearchActions";

const defaultState = [];

export const Pulse = (state = defaultState, action) => {
  switch (action.type) {
    case PULSE_RECEIVED:
      return _.cloneDeep(action.users);
    default:
      return state;
  }
}