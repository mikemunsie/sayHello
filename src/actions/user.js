import Api from "../api";

export const USER_PROFILE_UPDATED = 'USER_PROFILE_UPDATED';

function receiveProfile(user) {
  console.log("Dispatched")
  console.log(user)
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
    Api.updateMyUser(user);
    dispatch(receiveProfile(user));
  }
}