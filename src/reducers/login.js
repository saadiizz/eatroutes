import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from "@utils/actionType";
import {
  setToken,
  setUserId,
  setUserName,
  setRole,
} from "@utils/commonFunctions";

const INIT_STATE = {
  user: null,
  loading: false,
};

const loginReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      setToken(action.payload.data.token);
      setUserName(
        `${action.payload.data.user.first_name} ${action.payload.data.user.last_name}`
      );
      setUserId(action.payload.data.user.id);
      setRole(action.payload.data.user.role);
      return {
        ...state,
        user: action.payload.data,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: action?.payload?.data,
        loading: false,
      };
    default:
      return state;
  }
};
export default loginReducer;
