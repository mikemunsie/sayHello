import Api from "./api";
import * as UserActions from "./actions/user";
import * as PulseActions from "./actions/pulse";
import { defaultState as defaultUser } from "./reducers/user";

class PulseClass {
  init() {
    this.GPSWatch();
  }
  GPSWatch() {
    Api.pulseMyLocation(32.7795921, -96.8080133);
  }
}

class UserClass {
  init() {
    let userId = Api.createUser(defaultUser).key;
    Api.setCurrentUserId(userId);
    return UserActions.getCurrentUser();
  }
}

export const Pulse = new PulseClass;
export const User = new UserClass;