import { Api } from "../api";

export const PULSE_RECEIVED = 'PULSE_RECEIVED';

function receivePulse(users) {
  return {
    type: PULSE_RECEIVED,
    users
  }
}

export function getPulse(user) {
  return (dispatch) => {
    Api.createUser(user).then(() => dispatch(receiveProfile(user)));
  };
}