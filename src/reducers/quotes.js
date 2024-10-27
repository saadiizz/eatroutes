import {
  CREATE_QUOTES,
  CREATE_QUOTE_REQUEST,
  CREATE_QUOTE_REQUEST_SUCCESS,
  CREATE_QUOTE_REQUEST_FAILURE,
  CREATE_SAMPLE_REQUEST,
  CREATE_SAMPLE_REQUEST_SUCCESS,
  CREATE_SAMPLE_REQUEST_FAILURE,
  FETCH_VIEW_QUOTE_REQUEST,
  FETCH_VIEW_QUOTE_REQUEST_SUCCESS,
  FETCH_VIEW_QUOTE_REQUEST_FAILURE,
  FETCH_VIEW_SAMPLE_REQUEST,
  FETCH_VIEW_SAMPLE_REQUEST_SUCCESS,
  FETCH_VIEW_SAMPLE_REQUEST_FAILURE,
  APPROVE_REJECT_QUOTE_SAMPLE,
  APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS,
  APPROVE_REJECT_QUOTE_SAMPLE_FAILURE,
  FILTER_SAMPLE,
  FILTER_SAMPLE_SUCCESS,
  FILTER_SAMPLE_FAILURE,
  FILTER_QUOTE,
  FILTER_QUOTE_SUCCESS,
  FILTER_QUOTE_FAILURE,
  FETCH_VIEW_ORDER_REQUEST,
  FETCH_VIEW_ORDER_REQUEST_SUCCESS,
  FETCH_VIEW_ORDER_REQUEST_FAILURE,
  SELECT_ALL_SHARE_BRANDS,
} from "@utils/actionType";

const INIT_STATE = {
  quotesData: [],
  quoteRequesting: false,
  sampleRequesting: false,
  accessRequesting: false,
  viewQuoteRequestData: [],
  loadingViewQuoteRequest: false,
  viewSampleRequestData: [],
  loadingViewSampleRequest: false,
  viewOrderRequestData: [],
  loadingViewOrderRequest: false,
  selectAllShareBrands: false,
};

const quotesReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_QUOTES:
      return {
        ...state,
        quotesData: action.payload,
      };

    case CREATE_QUOTE_REQUEST:
      return { ...state, quoteRequesting: true };
    case CREATE_QUOTE_REQUEST_SUCCESS:
      return {
        ...state,
        quoteRequesting: false,
      };
    case CREATE_QUOTE_REQUEST_FAILURE:
      return {
        ...state,
        quoteRequesting: false,
      };

    case CREATE_SAMPLE_REQUEST:
      return { ...state, sampleRequesting: true };
    case CREATE_SAMPLE_REQUEST_SUCCESS:
      return {
        ...state,
        sampleRequesting: false,
      };
    case CREATE_SAMPLE_REQUEST_FAILURE:
      return {
        ...state,
        sampleRequesting: false,
      };

    case FETCH_VIEW_QUOTE_REQUEST:
      return { ...state, loadingViewQuoteRequest: true };
    case FETCH_VIEW_QUOTE_REQUEST_SUCCESS:
      return {
        ...state,
        viewQuoteRequestData: action.payload,
        loadingViewQuoteRequest: false,
      };
    case FETCH_VIEW_QUOTE_REQUEST_FAILURE:
      return {
        ...state,
        viewQuoteRequestData: action.payload,
        loadingViewQuoteRequest: false,
      };

    case FETCH_VIEW_SAMPLE_REQUEST:
      return { ...state, loadingViewSampleRequest: true };
    case FETCH_VIEW_SAMPLE_REQUEST_SUCCESS:
      return {
        ...state,
        viewSampleRequestData: action.payload,
        loadingViewSampleRequest: false,
      };
    case FETCH_VIEW_SAMPLE_REQUEST_FAILURE:
      return {
        ...state,
        viewSampleRequestData: action.payload,
        loadingViewSampleRequest: false,
      };

    case FETCH_VIEW_ORDER_REQUEST:
      return { ...state, loadingViewOrderRequest: true };
    case FETCH_VIEW_ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        viewOrderRequestData: action.payload,
        loadingViewOrderRequest: false,
      };
    case FETCH_VIEW_ORDER_REQUEST_FAILURE:
      return {
        ...state,
        viewOrderRequestData: action.payload,
        loadingViewOrderRequest: false,
      };

    case APPROVE_REJECT_QUOTE_SAMPLE:
      return { ...state, accessRequesting: true };
    case APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS:
      return {
        ...state,
        accessRequesting: false,
      };
    case APPROVE_REJECT_QUOTE_SAMPLE_FAILURE:
      return {
        ...state,
        accessRequesting: false,
      };

    case FILTER_SAMPLE:
      return { ...state, loadingViewSampleRequest: true };
    case FILTER_SAMPLE_SUCCESS:
      return {
        ...state,
        viewSampleRequestData: action.payload,
        loadingViewSampleRequest: false,
      };
    case FILTER_SAMPLE_FAILURE:
      return {
        ...state,
        viewSampleRequestData: action.payload,
        loadingViewSampleRequest: false,
      };

    case FILTER_QUOTE:
      return { ...state, loadingViewQuoteRequest: true };
    case FILTER_QUOTE_SUCCESS:
      return {
        ...state,
        viewQuoteRequestData: action.payload,
        loadingViewQuoteRequest: false,
      };
    case FILTER_QUOTE_FAILURE:
      return {
        ...state,
        viewQuoteRequestData: action.payload,
        loadingViewQuoteRequest: false,
      };

    case SELECT_ALL_SHARE_BRANDS:
      return {
        selectAllShareBrands: action.payload,
      };

    default:
      return state;
  }
};
export default quotesReducer;
