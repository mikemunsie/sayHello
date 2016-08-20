import Api from "./api";
import * as UserActions from "./actions/user";
import { defaultState as defaultUser } from "./reducers/user";

class PulseClass {
  constructor() {

  }
}

class UserClass {
  constructor() {

  }
  init() {
    let userId = Api.createUser(defaultUser).key;
    Api.setCurrentUserId(userId);
    return UserActions.getCurrentUser();
  }
}

export const Pules = new PulseClass;
export const User = new UserClass;