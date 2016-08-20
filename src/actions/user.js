import Api from "../api";

export const USER_PROFILE_UPDATED = 'USER_PROFILE_UPDATED';

function receiveProfile(user) {
  return {
    type: USER_PROFILE_UPDATED,
    user
  }
}

export function getCurrentUser() {
  return (dispatch) => {
    Api.getCurrentUser()
    .then((user) => dispatch(receiveProfile(user)));
  }
}

export function saveProfile(user) {
  return (dispatch) => {
    console.log(dispatch);
    console.log(Api.updateMyUser(user));
    dispatch(receiveProfile(user));
  }
}