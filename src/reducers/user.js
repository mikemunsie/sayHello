import _ from "lodash";
import { USER_PROFILE_UPDATED } from "../actions/user";

export const defaultState = {
  pic: null,
  name: "First & Last Name",
  phone: "123.456.7890",
  email: "youremail@sample.com",
  website: "http://",
  profession: "developer",
  title: "Your Awesome Title",
  social: {
    twitter: null,
    linkedIn: null
  }
}

export const User = (state = defaultState, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATED:
      return _.cloneDeep(action.user);
    default:
      return state;
  }
}