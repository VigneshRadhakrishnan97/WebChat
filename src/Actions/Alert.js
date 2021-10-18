import { SET_ALERT, REMOVE_ALERT } from "../types";
import { v4 as uuid } from "uuid";

let alert_ref = [];

// Set Alert
export const alerts = (message, color = "success", timeout = 5000) => (
  dispatch
) => {
  let id = uuid();

  dispatch({ type: SET_ALERT, payload: { message, color, id } });

  let ref = setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
    callback_alert_ref(id);
  }, timeout);
  alert_ref = [...alert_ref, { id, ref }];
};

// Remove Alert
export const removealerts = (id) => (dispatch) => {
  dispatch({ type: REMOVE_ALERT, payload: id });

  callback_alert_ref(id);
};

//call back for alert_ref

const callback_alert_ref = (id) => {
  alert_ref = alert_ref.filter((alert) => {
    if (alert.id === id) {
      clearTimeout(alert.ref);
      return false;
    }
    return true;
  });
};
