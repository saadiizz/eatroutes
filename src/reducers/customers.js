import {
  FETCH_CUSTOMERS,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE,
  ADD_CUSTOMER,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILURE,
  EDIT_CUSTOMER,
  EDIT_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_FAILURE,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILURE,
} from "@utils/actionType";

const INIT_STATE = {
  loadingCustomer: false,
  customersData: [],
  addingCustomer: false,
  deletingCustomer: false,
  editingCustomer: false,
  editCustomerData: null,
  loadingOneUser: false,
  oneUserData: null,
};

const customersReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS:
      return { ...state, loadingCustomer: true };
    case FETCH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customersData: typeof action.payload === "string" ? [] : action.payload,
        loadingCustomer: false,
      };
    case FETCH_CUSTOMERS_FAILURE:
      return {
        ...state,
        customersData: typeof action.payload === "string" ? [] : action.payload,
        loadingCustomer: false,
      };

    case ADD_CUSTOMER:
      return { ...state, addingCustomer: true };
    case ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        addingCustomer: false,
      };
    case ADD_CUSTOMER_FAILURE:
      return {
        ...state,
        addingCustomer: false,
      };

    case EDIT_CUSTOMER:
      return { ...state, editingCustomer: true };
    case EDIT_CUSTOMER_SUCCESS:
      return {
        ...state,
        editCustomerData: action.payload,
        editingCustomer: false,
      };
    case EDIT_CUSTOMER_FAILURE:
      return {
        ...state,
        editCustomerData: action.payload,
        editingCustomer: false,
      };

    case DELETE_CUSTOMER:
      return { ...state, deletingCustomer: true };
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        deletingCustomer: false,
      };
    case DELETE_CUSTOMER_FAILURE:
      return {
        ...state,
        deletingCustomer: false,
      };

    default:
      return state;
  }
};
export default customersReducer;
