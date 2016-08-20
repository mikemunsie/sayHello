import _ from "lodash";
import { USER_PROFILE_UPDATED } from "./giphySearchActions";

const defaultState = {
  pic: null,
  name: "Michael Munsie",
  phone: "817.932.1234",
  email: "mike@munstrocity.com"
  website: "munstrocity.com",
  profession: "developer",
  title: "Software Engineer",
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