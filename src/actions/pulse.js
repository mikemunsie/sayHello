import Api from "../api";

export const PULSE_RECEIVED = 'PULSE_RECEIVED';

function receivePulse(users) {
  return {
    type: PULSE_RECEIVED,
    users
  }
}

export function receiveUsers(users) {
  return (dispatch) => {
    dispatch(receivePulse(users));
  }
}