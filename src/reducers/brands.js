import {
  FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
  ADD_BRAND,
  ADD_BRAND_SUCCESS,
  ADD_BRAND_FAILURE,
  DELETE_BRAND,
  DELETE_BRAND_SUCCESS,
  DELETE_BRAND_FAILURE,
  FETCH_BRAND_CATEGORIES,
  FETCH_BRAND_CATEGORIES_SUCCESS,
  FETCH_BRAND_CATEGORIES_FAILURE,
  FETCH_PENDING_BRANDS,
  FETCH_PENDING_BRANDS_SUCCESS,
  FETCH_PENDING_BRANDS_FAILURE,
} from "@utils/actionType";

const INIT_STATE = {
  loadingBrands: false,
  brandsData: [],
  loadPendingBrands: false,
  pendingBrandsData: [],
  loadingDeleteBrand: false,
  loadingAddBrand: false,
  addBrandData: {},
  loadingCategories: false,
  categoriesData: [],
};

const brandsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_BRANDS:
      return { ...state, loadingBrands: true };
    case FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        brandsData: typeof action.payload === "string" ? [] : action.payload,
        loadingBrands: false,
      };
    case FETCH_BRANDS_FAILURE:
      return {
        ...state,
        brandsData: typeof action.payload === "string" ? [] : action.payload,
        loadingBrands: false,
      };

    case FETCH_PENDING_BRANDS:
      return { ...state, loadPendingBrands: true };
    case FETCH_PENDING_BRANDS_SUCCESS:
      return {
        ...state,
        pendingBrandsData:
          typeof action.payload === "string" ? [] : action.payload,
        loadPendingBrands: false,
      };
    case FETCH_PENDING_BRANDS_FAILURE:
      return {
        ...state,
        pendingBrandsData:
          typeof action.payload === "string" ? [] : action.payload,
        loadPendingBrands: false,
      };

    case ADD_BRAND:
      return { ...state, loadingAddBrand: true };
    case ADD_BRAND_SUCCESS:
      return {
        ...state,
        addBrandData: typeof action.payload === "string" ? {} : action.payload,
        loadingAddBrand: false,
      };
    case ADD_BRAND_FAILURE:
      return {
        ...state,
        addBrandData: typeof action.payload === "string" ? {} : action.payload,
        loadingAddBrand: false,
      };

    case DELETE_BRAND:
      return { ...state, loadingDeleteBrand: true };
    case DELETE_BRAND_SUCCESS:
      return {
        ...state,
        loadingDeleteBrand: false,
      };
    case DELETE_BRAND_FAILURE:
      return {
        ...state,
        loadingDeleteBrand: false,
      };

    case FETCH_BRAND_CATEGORIES:
      return { ...state, loadingCategories: true };
    case FETCH_BRAND_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoriesData:
          typeof action.payload === "string" ? [] : action.payload,
        loadingCategories: false,
      };
    case FETCH_BRAND_CATEGORIES_FAILURE:
      return {
        ...state,
        categoriesData:
          typeof action.payload === "string" ? [] : action.payload,
        loadingCategories: false,
      };

    default:
      return state;
  }
};
export default brandsReducer;
