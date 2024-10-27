import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_DETAILS,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCT_DETAILS_FAILURE,
  FETCH_PRODUCT_CATEGORIES,
  FETCH_PRODUCT_CATEGORIES_SUCCESS,
  FETCH_PRODUCT_CATEGORIES_FAILURE,
  ADD_CSV,
  ADD_CSV_SUCCESS,
  ADD_CSV_FAILURE,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_VARIATIONS,
  ADD_PRODUCT_VARIATIONS_SUCCESS,
  ADD_PRODUCT_VARIATIONS_FAILURE,
  ADD_VARIATIONS_OPTION,
  ADD_VARIATIONS_OPTION_SUCCESS,
  ADD_VARIATIONS_OPTION_FAILURE,
  ADD_PRODUCT_Gallery,
  ADD_PRODUCT_Gallery_SUCCESS,
  ADD_PRODUCT_Gallery_FAILURE,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAILURE,
  EDIT_PRODUCT_IMAGE,
  EDIT_PRODUCT_IMAGE_SUCCESS,
  EDIT_PRODUCT_IMAGE_FAILURE,
  FETCH_PRODUCT_VARIATIONS,
  FETCH_PRODUCT_VARIATIONS_SUCCESS,
  FETCH_PRODUCT_VARIATIONS_FAILURE,
  FETCH_SUBVARIATIONS,
  FETCH_SUBVARIATIONS_SUCCESS,
  FETCH_SUBVARIATIONS_FAILURE,
  FETCH_SUBVARIATIONS_OPTIONS,
  FETCH_SUBVARIATIONS_OPTIONS_SUCCESS,
  FETCH_SUBVARIATIONS_OPTIONS_FAILURE,
} from "@utils/actionType";

const INIT_STATE = {
  loadingProducts: false,
  productsData: null,
  loadingProductDetails: false,
  productDetailsData: null,
  loadingCategories: false,
  categoriesData: [],
  loadingAddCsv: false,
  loadingAddProduct: false,
  loadingEditProduct: false,
  loadingEditProductImage: false,
  loadingAddProductVariations: false,
  loadingAddNewVariationOption: false,
  loadingAddProductGallery: false,

  loadingProductVariations: false,
  productVariationsData: [],
  loadingSubVariations: false,
  subVariationsData: [],
  loadingSubVariationsOptions: false,
  subVariationsOptionsData: [],
};

const brandsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, loadingProducts: true };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsData: typeof action.payload === "string" ? [] : action.payload,
        loadingProducts: false,
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        productsData: typeof action.payload === "string" ? [] : action.payload,
        loadingProducts: false,
      };

    case FETCH_PRODUCT_DETAILS:
      return { ...state, loadingProductDetails: true };
    case FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        productDetailsData: action.payload,
        loadingProductDetails: false,
      };
    case FETCH_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        productDetailsData: action.payload,
        loadingProductDetails: false,
      };

    case FETCH_PRODUCT_CATEGORIES:
      return { ...state, loadingCategories: true };
    case FETCH_PRODUCT_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoriesData: action.payload,
        loadingCategories: false,
      };
    case FETCH_PRODUCT_CATEGORIES_FAILURE:
      return {
        ...state,
        categoriesData: action.payload,
        loadingCategories: false,
      };

    case ADD_PRODUCT:
      return { ...state, loadingAddProduct: true };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingAddProduct: false,
      };
    case ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loadingAddProduct: false,
      };

    case ADD_CSV:
      return { ...state, loadingAddCsv: true };
    case ADD_CSV_SUCCESS:
      return {
        ...state,
        loadingAddCsv: false,
      };
    case ADD_CSV_FAILURE:
      return {
        ...state,
        loadingAddCsv: false,
      };

    case EDIT_PRODUCT:
      return { ...state, loadingEditProduct: true };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingEditProduct: false,
      };
    case EDIT_PRODUCT_FAILURE:
      return {
        ...state,
        loadingEditProduct: false,
      };

    case EDIT_PRODUCT_IMAGE:
      return { ...state, loadingEditProductImage: true };
    case EDIT_PRODUCT_IMAGE_SUCCESS:
      return {
        ...state,
        loadingEditProductImage: false,
      };
    case EDIT_PRODUCT_IMAGE_FAILURE:
      return {
        ...state,
        loadingEditProductImage: false,
      };

    case ADD_PRODUCT_VARIATIONS:
      return { ...state, loadingAddProductVariations: true };
    case ADD_PRODUCT_VARIATIONS_SUCCESS:
      return {
        ...state,
        loadingAddProductVariations: false,
      };
    case ADD_PRODUCT_VARIATIONS_FAILURE:
      return {
        ...state,
        loadingAddProductVariations: false,
      };

    case ADD_VARIATIONS_OPTION:
      return { ...state, loadingAddNewVariationOption: true };
    case ADD_VARIATIONS_OPTION_SUCCESS:
      return {
        ...state,
        loadingAddNewVariationOption: false,
      };
    case ADD_VARIATIONS_OPTION_FAILURE:
      return {
        ...state,
        loadingAddNewVariationOption: false,
      };

    case ADD_PRODUCT_Gallery:
      return { ...state, loadingAddProductGallery: true };
    case ADD_PRODUCT_Gallery_SUCCESS:
      return {
        ...state,
        loadingAddProductGallery: false,
      };
    case ADD_PRODUCT_Gallery_FAILURE:
      return {
        ...state,
        loadingAddProductGallery: false,
      };

    case FETCH_PRODUCT_VARIATIONS:
      return { ...state, loadingProductVariations: true };
    case FETCH_PRODUCT_VARIATIONS_SUCCESS:
      return {
        ...state,
        productVariationsData:
          typeof action.payload === "string" ? [] : action.payload,
        loadingProductVariations: false,
      };
    case FETCH_PRODUCT_VARIATIONS_FAILURE:
      return {
        ...state,
        productVariationsData:
          typeof action.payload === "string" ? [] : action.payload,
        loadingProductVariations: false,
      };

    case FETCH_SUBVARIATIONS:
      return { ...state, loadingSubVariationsData: true };
    case FETCH_SUBVARIATIONS_SUCCESS:
      return {
        ...state,
        subVariationsData:
          typeof action.payload === "string" ? [] : action.payload,
        loadingSubVariationsData: false,
      };
    case FETCH_SUBVARIATIONS_FAILURE:
      return {
        ...state,
        subVariationsData:
          typeof action.payload === "string" ? [] : action.payload,
        loadingSubVariationsData: false,
      };

    case FETCH_SUBVARIATIONS_OPTIONS:
      return { ...state, loadingSubVariationsOptions: true };
    case FETCH_SUBVARIATIONS_OPTIONS_SUCCESS:
      return {
        ...state,
        subVariationsOptionsData:
          typeof action.payload === "string" ? [] : action.payload,
        loadingSubVariationsOptions: false,
      };
    case FETCH_SUBVARIATIONS_OPTIONS_FAILURE:
      return {
        ...state,
        subVariationsOptionsData:
          typeof action.payload === "string" ? [] : action.payload,
        loadingSubVariationsOptions: false,
      };

    default:
      return state;
  }
};
export default brandsReducer;
