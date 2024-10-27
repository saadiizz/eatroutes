import { LOGOUT } from "@utils/actionType";
import {
  removeToken,
  removeUserName,
  removeUserId,
  removeRole,
  removeLocalStore,
} from "@utils/commonFunctions";

const logoutReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT:
      removeToken();
      removeUserName();
      removeUserId();
      removeRole();
      removeLocalStore("client-quotes");
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default logoutReducer;
