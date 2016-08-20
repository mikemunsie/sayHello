import { Api } from "../api";

export const NOTIFICATION_RECEIVED = 'NOTIFICATION_RECEIVED';

function notificationReceived(notification) {
  return {
    type: NOTIFICATION_RECEIVED,
    notification
  }
}

export function getNotifications() {
  return (dispatch) => {
    Api.getNotifications().then((response) => dispatch(notificationReceived, response))
  };
}