import { Api } from "./api";
import * as UserActions from "./actions/user";
import { defaultState as defaultUser } from "./reducers/user";

class Pulse {
  constructor() {

  }
}

class User {
  constructor() {

  }
  init() {
    let userId = api.createUser(defaultState).key;
    Api.setCurrentUserId(userId);
    return UserActions.getCurrentUser();
  }
}
