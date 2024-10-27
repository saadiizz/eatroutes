import {
  FETCH_REGULATORY,
  FETCH_REGULATORY_SUCCESS,
  FETCH_REGULATORY_FAILURE,
  FETCH_SUB_OPTIONS,
  FETCH_SUB_OPTIONS_SUCCESS,
  FETCH_SUB_OPTIONS_FAILURE,
  SAVE_LOCAL_REGULATORY,
} from "@utils/actionType";

const INIT_STATE = {
  loadingRegulatory: false,
  defaultRegulatory: [],
  loadingSubOptions: false,
  defaultSubOptions: [],
  localRegulatory: [],
};

const regulatoryReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_REGULATORY:
      return { ...state, loadingRegulatory: true };
    case FETCH_REGULATORY_SUCCESS:
      return {
        ...state,
        defaultRegulatory: action.payload,
        loadingRegulatory: false,
      };
    case FETCH_REGULATORY_FAILURE:
      return {
        ...state,
        defaultRegulatory: action.payload,
        loadingRegulatory: false,
      };

    case FETCH_SUB_OPTIONS:
      return { ...state, loadingSubOptions: true };
    case FETCH_SUB_OPTIONS_SUCCESS:
      return {
        ...state,
        defaultSubOptions: action.payload,
        loadingSubOptions: false,
      };
    case FETCH_SUB_OPTIONS_FAILURE:
      return {
        ...state,
        defaultSubOptions: action.payload,
        loadingSubOptions: false,
      };

    case SAVE_LOCAL_REGULATORY:
      return {
        ...state,
        localRegulatory: action.payload,
      };

    default:
      return state;
  }
};
export default regulatoryReducer;
