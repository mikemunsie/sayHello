import { Api } from "../api";

export const USER_PROFILE_UPDATED = 'USER_PROFILE_UPDATED';

function receiveProfile(user) {
  return {
    type: USER_PROFILE_UPDATED,
    user
  }
}

export function saveProfile(user) {
  return (dispatch) => {
    Api.createUser(user).then(() => dispatch(receiveProfile(user)));
  }
}
