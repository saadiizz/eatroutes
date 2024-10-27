import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "@utils/actionType";

const INIT_STATE = {
  loadingChangePassword: false,
  loadingForgotPassword: false,
};

const changePasswordReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return { ...state, loadingChangePassword: true };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingChangePassword: false,
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        loadingChangePassword: false,
      };

    case FORGOT_PASSWORD:
      return { ...state, loadingForgotPassword: true };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingForgotPassword: false,
      };
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loadingForgotPassword: false,
      };

    default:
      return state;
  }
};
export default changePasswordReducer;
