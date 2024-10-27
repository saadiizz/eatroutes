import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import API from "@services/axios";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import Header from "@components/header";
import Footer from "@components/footer";
import { addnewproductStyle } from "./style";
import {
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepButton,
  StepLabel,
} from "@mui/material";
import { useStore } from "@store/store";
import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAILURE,
  EDIT_PRODUCT_IMAGE,
  EDIT_PRODUCT_IMAGE_SUCCESS,
  EDIT_PRODUCT_IMAGE_FAILURE,
  ADD_PRODUCT_VARIATIONS,
  ADD_PRODUCT_VARIATIONS_SUCCESS,
  ADD_PRODUCT_VARIATIONS_FAILURE,
  ADD_PRODUCT_Gallery,
  ADD_PRODUCT_Gallery_SUCCESS,
  ADD_PRODUCT_Gallery_FAILURE,
  FETCH_PRODUCT_CATEGORIES,
  FETCH_PRODUCT_CATEGORIES_SUCCESS,
  FETCH_PRODUCT_CATEGORIES_FAILURE,
  FETCH_PRODUCT_VARIATIONS,
  FETCH_PRODUCT_VARIATIONS_SUCCESS,
  FETCH_PRODUCT_VARIATIONS_FAILURE,
  FETCH_SUBVARIATIONS,
  FETCH_SUBVARIATIONS_SUCCESS,
  FETCH_SUBVARIATIONS_FAILURE,
  FETCH_SUBVARIATIONS_OPTIONS,
  FETCH_SUBVARIATIONS_OPTIONS_SUCCESS,
  FETCH_SUBVARIATIONS_OPTIONS_FAILURE,
  FETCH_PRODUCT_DETAILS,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCT_DETAILS_FAILURE,
  FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
  ADD_VARIATIONS_OPTION,
  ADD_VARIATIONS_OPTION_SUCCESS,
  ADD_VARIATIONS_OPTION_FAILURE,
} from "@utils/actionType";
import Loader from "@components/loader";
import { toast } from "react-toastify";
import { setImageArray, getRole, fileToUrl } from "@utils/commonFunctions";
import { userRole } from "@utils/constant";
import ProductDetailsForm from "./details-form";
import VariationDetailsForm from "./variation-details-form";
import SelfLifeDetailsForm from "./self-life-detail-form";
import AddVariationDetails from "./popups/add-variation-details";
import ExamplesPopup from "./popups/examples-popup";

import AddVariationSize from "./popups/variation-size-popup";
import AddFlavorSize from "./popups/flavor-size-popup";

const steps = ["Product Details", "Flavor Details", "Other Details"];

function AddNewProduct() {
  const classes = addnewproductStyle();
  const [state, dispatch] = useStore();
  const [productDetails, setProductDetails] = useState([]);
  const [errors, setErrors] = useState({});
  const [edit, setEdit] = useState(false);
  const [openConfirmPopup, setConfirmPopup] = useState(false);
  const [confirmParams, setConfirmParams] = useState(null);
  const [openList, setOpenList] = useState({
    categories: false,
    variationTypes: false,
    subVariations: false,
  });
  const [showDynamicForm, setShowDynamicForm] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [openVariationDetails, setOpenVariationDetails] = useState(false);
  const [openExamples, setOpenExamples] = useState(false);
  const [variationIds, setVariationIds] = useState({
    parentId: "",
    childId: "",
  });
  const [currentVariationData, setCurrentVariationData] = useState({});
  const [allVariationDatas, setAllVariationDatas] = useState({});
  const [addVariationValue, setAddVariationValue] = useState({
    variationOption: "",
    variationSubOption: "",
    measurement: "",
  });

  const handleExamplesOpen = (heading) => {
    setOpenExamples(true);
  };
  const handleExamplesClose = () => {
    setOpenExamples(false);
  };
  const onVariationSubmit = (variationName, subVarId) => {
    if (
      (variationName === "flavour" &&
        !!addVariationValue.variationOption.trim()) ||
      (variationName === "size" &&
        !!addVariationValue.variationSubOption.trim())
    ) {
      setAddVariationValue({
        variationOption: "",
        variationSubOption: "",
        measurement: "",
      });
      dispatch({ type: ADD_VARIATIONS_OPTION });
      API.post("/product_variation/add-variations", {
        variation_type: variationName,
        name:
          variationName === "flavour"
            ? addVariationValue?.variationOption.trim()
            : addVariationValue?.variationSubOption.trim() +
              formik?.values?.measurement?.label.toLowerCase(),
      })
        .then((response) => {
          if (response.data.statusCode === 200) {
            dispatch({
              type: ADD_VARIATIONS_OPTION_SUCCESS,
            });
            toast.success(response.data.successMessage);
            if (variationName === "flavour") {
              formik.setFieldValue("subVariations", [
                ...formik?.values?.subVariations,
                response.data.data.id,
              ]);
              formik?.values?.variationTypes &&
                getSubVariations(formik?.values?.variationTypes);
            } else {
              allVariationDatas[subVarId] = !!allVariationDatas[subVarId]
                ? [
                    ...allVariationDatas[subVarId],
                    {
                      size: response.data.data.id,
                      unit_price: "",
                      product_dimension: "",
                      case_dimension: "",
                      msrp: "",
                      units_per_case: "",
                      units_per_master_case: "",
                      units_per_pallet: "",
                      pallet_length: "",
                      pallet_width: "",
                      pallet_height: "",
                    },
                  ]
                : [
                    {
                      size: response.data.data.id,
                      unit_price: "",
                      product_dimension: "",
                      case_dimension: "",
                      msrp: "",
                      units_per_case: "",
                      units_per_master_case: "",
                      units_per_pallet: "",
                      pallet_length: "",
                      pallet_width: "",
                      pallet_height: "",
                    },
                  ];
              handleSetError();
              formik?.values?.variationTypes &&
                getSubVariationsOptions(formik?.values?.variationTypes);
            }
          } else {
            dispatch({ type: ADD_VARIATIONS_OPTION_FAILURE });
            toast.error(response.data.errorMessage);
          }
        })
        .catch((error) => {
          dispatch({ type: ADD_VARIATIONS_OPTION_FAILURE });
          toast.error("Some thing went wrong please try again letter");
        });
    } else {
      toast.error(`Please enter proper ${variationName} value`);
    }
    closeConfirmPopup();
  };
  const handleVariationDetailsOpen = (parentId, childId) => {
    setOpenVariationDetails(true);
    setVariationIds({ parentId, childId });
    setCurrentVariationData(
      allVariationDatas[parentId]?.find((val) => val.size === childId)
    );
  };
  const handleVariationDetailsClose = () => {
    setOpenVariationDetails(false);
    setCurrentVariationData({});
  };
  const handleVariationDetailsSubmit = () => {
    let data = allVariationDatas[variationIds.parentId]?.map((val) =>
      val.size === variationIds.childId ? currentVariationData : val
    );
    setAllVariationDatas({
      ...allVariationDatas,
      [variationIds.parentId]: data,
    });
    handleVariationDetailsClose();
  };

  const { id } = useParams();
  const navigate = useNavigate();

  const getCategories = () => {
    dispatch({ type: FETCH_PRODUCT_CATEGORIES });
    API.get("/product/get-product-categories")
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_PRODUCT_CATEGORIES_SUCCESS,
            payload: response.data.data,
          });
        } else {
          dispatch({
            type: FETCH_PRODUCT_CATEGORIES_FAILURE,
            payload: response.data.errorMessage,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_PRODUCT_CATEGORIES_FAILURE, payload: error });
      });
  };
  const getBrands = () => {
    dispatch({ type: FETCH_BRANDS });
    API.get("/brand/allbrands")
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_BRANDS_SUCCESS,
            payload: response.data.data,
          });
        } else {
          dispatch({ type: FETCH_BRANDS_FAILURE, payload: response.data.data });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_BRANDS_FAILURE, payload: error });
      });
  };

  const getProductVariations = () => {
    dispatch({ type: FETCH_PRODUCT_VARIATIONS });
    API.get("product_variation/variations")
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_PRODUCT_VARIATIONS_SUCCESS,
            payload: response.data.data,
          });
          formik.setFieldValue("variationTypes", response.data.data[0].id);
        } else {
          dispatch({
            type: FETCH_PRODUCT_VARIATIONS_FAILURE,
            payload: response.data.errorMessage,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_PRODUCT_VARIATIONS_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getCategories();
    userRole.vrm === getRole() && getBrands();
    getProductVariations();
    setEdit(id ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductDetails = () => {
    dispatch({ type: FETCH_PRODUCT_DETAILS });
    API.get(`/product/get-product-detail/${id}`)
      .then((response) => {
        dispatch({
          type: FETCH_PRODUCT_DETAILS_SUCCESS,
          payload: response.data.data,
        });
        setProductDetails(response.data.data);
      })
      .catch((error) => {
        dispatch({ type: FETCH_PRODUCT_DETAILS_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    id && getProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const addProduct = (productData, productImagesData, variationData) => {
    dispatch({ type: ADD_PRODUCT });
    API.post(`product/create-product/${formik?.values?.brandId}`, productData)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: ADD_PRODUCT_SUCCESS,
          });
          formik.values.products_gallery.length &&
            addProductsGallery(response.data.data.id, productImagesData);
          addVariations(response.data.data.id, variationData);
        } else {
          dispatch({ type: ADD_PRODUCT_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: ADD_PRODUCT_FAILURE });
        toast.error("Some thing went wrong please try again letter");
      });
  };

  const editProduct = (productData, productImagesData, variationData) => {
    dispatch({ type: EDIT_PRODUCT });
    API.post(`product/update-product-details/${id}`, productData)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: EDIT_PRODUCT_SUCCESS,
          });
          formik.values.products_gallery.length >= 0 &&
            addProductsGallery(response.data.data.id, productImagesData);
          addVariations(response.data.data.id, variationData);
        } else {
          dispatch({ type: EDIT_PRODUCT_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: EDIT_PRODUCT_FAILURE });
        toast.error("Some thing went wrong please try again letter");
      });
  };

  const editProductImage = (image) => {
    const formData = new FormData();
    formData.append("image", image);
    dispatch({ type: EDIT_PRODUCT_IMAGE });
    API.post(`product/product-image/${id}`, formData)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: EDIT_PRODUCT_IMAGE_SUCCESS,
          });
          toast.success("Image Updated Succefully");
          getProductDetails();
        } else {
          dispatch({ type: EDIT_PRODUCT_IMAGE_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: EDIT_PRODUCT_IMAGE_FAILURE });
      });
  };

  const addVariations = (variationId, variationData) => {
    dispatch({ type: ADD_PRODUCT_VARIATIONS });
    API.post(`product/product-sub-variants/${variationId}`, variationData)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: ADD_PRODUCT_VARIATIONS_SUCCESS,
          });
          id
            ? toast.success("Product Edited successfully")
            : toast.success("Product Added successfully");
          navigate("/products-vendor");
        } else {
          dispatch({ type: ADD_PRODUCT_VARIATIONS_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: ADD_PRODUCT_VARIATIONS_FAILURE });
      });
  };
  const addProductsGallery = (productId, productImagesData) => {
    dispatch({ type: ADD_PRODUCT_Gallery });
    API.post(`product/product-gallery/${productId}`, productImagesData)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: ADD_PRODUCT_Gallery_SUCCESS,
          });
          id
            ? toast.success("Product gallery Edited successfully")
            : toast.success("Product gallery Added successfully");
        } else {
          dispatch({ type: ADD_PRODUCT_Gallery_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: ADD_PRODUCT_Gallery_FAILURE });
      });
  };

  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    initialValues:
      productDetails && edit
        ? {
            brandId: productDetails?.brand_id ? productDetails?.brand_id : "",
            name: productDetails?.name ? productDetails?.name : "",
            headline: productDetails?.product_heading
              ? productDetails?.product_heading
              : "",

            image: productDetails?.product_image
              ? productDetails?.product_image
              : "",
            products_gallery: productDetails?.products_gallery
              ? setImageArray("", productDetails?.products_gallery)
              : [],
            nutrition_facts: productDetails?.nutrition_facts
              ? productDetails?.nutrition_facts
              : "",
            description: productDetails?.description
              ? productDetails?.description
              : "",
            ingredients: productDetails?.ingredients
              ? productDetails?.ingredients
              : "",
            categories: productDetails?.categories
              ? productDetails?.categories.map((data) => data.id)
              : [],
            productSelfLife: productDetails?.product_shelf_life
              ? productDetails?.product_shelf_life
              : "",
            countryOfOrigin: productDetails?.country_of_origin
              ? productDetails?.country_of_origin
              : "",
            currency: productDetails?.currency ? productDetails?.currency : "",
            unitsPerCase: productDetails?.units_per_case
              ? productDetails?.units_per_case
              : "",
            unitsPerMasterCase: productDetails?.units_per_master_case
              ? productDetails?.units_per_master_case
              : "",
            unitsPerPallet: productDetails?.units_per_pallet
              ? productDetails?.units_per_pallet
              : "",
            palletLength: productDetails?.pallet_length
              ? productDetails?.pallet_length
              : "",
            palletWidth: productDetails?.pallet_width
              ? productDetails?.pallet_width
              : "",
            palletHeight: productDetails?.pallet_height
              ? productDetails?.pallet_height
              : "",
            variationTypes:
              productDetails?.products_variations?.length > 0
                ? productDetails?.products_variations[0].variation_type_id
                : "",
            subVariations: productDetails?.products_variations
              ? productDetails?.products_variations.map(
                  (data) => data.variation_id
                )
              : [],

            measurement: { id: null, label: null },
            imageUrl: productDetails?.product_image
              ? productDetails?.product_image
              : "",
            nutrition_factsUrl: productDetails?.nutrition_facts
              ? productDetails?.nutrition_facts
              : "",
          }
        : schema.addProductSchema,

    validationSchema: validationSchema.addProductValidationSchema,
    onSubmit: (value) => {
      // handleSetError();
      const firstData = {
        name: value.name,
        description: value.description,
        ...(!!value.headline ? { product_heading: value.headline } : {}),
        ...(!!value.ingredients ? { ingredients: value.ingredients } : {}),
        ...(!edit && !!value.image ? { image: value.image } : {}),
        ...(typeof value.nutrition_facts !== "string" && !!value.nutrition_facts
          ? { nutrition_facts: value.nutrition_facts }
          : {}),
        ...(!!value.productSelfLife
          ? { product_shelf_life: value.productSelfLife }
          : {}),
        ...(!!value.countryOfOrigin
          ? { country_of_origin: value.countryOfOrigin }
          : {}),
        ...(!!value.currency ? { currency: value.currency } : {}),
        ...(!!value.unitsPerCase ? { units_per_case: value.unitsPerCase } : {}),
        ...(!!value.unitsPerMasterCase
          ? { units_per_master_case: value.unitsPerMasterCase }
          : {}),
        ...(!!value.unitsPerPallet
          ? { units_per_pallet: value.unitsPerPallet }
          : {}),
        ...(!!value.palletLength ? { pallet_length: value.palletLength } : {}),
        ...(!!value.palletWidth ? { pallet_width: value.palletWidth } : {}),
        ...(!!value.palletHeight ? { pallet_height: value.palletHeight } : {}),
        ...(!!value?.categories ? { "categories[0]": value?.categories } : {}),
      };

      // value.categories.map(
      //   (data, index) => (firstData[`categories[${index}]`] = data)
      // );
      const formData = new FormData();

      Object.keys(firstData).forEach((fieldName) => {
        formData.append(fieldName, firstData[fieldName]);
      });

      let productsGallary = {};
      value.products_gallery.length &&
        value.products_gallery.map(
          (data, index) => (productsGallary[`image[${index}]`] = data)
        );

      const formData2 = new FormData();

      Object.keys(productsGallary).forEach((fieldName) => {
        formData2.append(fieldName, productsGallary[fieldName]);
      });

      const secondData =
        value.subVariations.length &&
        value.subVariations.reduce((obj, cur) => {
          return allVariationDatas[cur]?.length
            ? {
                ...obj,
                [cur]: Object.assign({}, allVariationDatas[cur]),
              }
            : { ...obj };
        }, {});

      const finalSecondData = {
        [formik.values.variationTypes]: secondData,
      };

      id
        ? editProduct(formData, formData2, {
            subVariants: finalSecondData,
          })
        : addProduct(formData, formData2, {
            subVariants: finalSecondData,
          });
    },
  });

  const handleSetError = () => {
    let errorData = {};
    if (formik?.values?.subVariations.length) {
      formik?.values?.subVariations.map((data) => {
        return allVariationDatas
          ? allVariationDatas[data]?.length
            ? delete errorData[data]
            : (errorData[data] = true)
          : (errorData = {});
      });
    }
    return setErrors(errorData);
  };
  useEffect(() => {
    formik.values.subVariations.length && handleSetError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.subVariations.length, allVariationDatas]);
  const getSubVariations = (id) => {
    dispatch({ type: FETCH_SUBVARIATIONS });
    API.get(`product_variation/sub-variations/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_SUBVARIATIONS_SUCCESS,
            payload: response.data.data,
          });
        } else {
          dispatch({
            type: FETCH_SUBVARIATIONS_FAILURE,
            payload: response.data.errorMessage,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_SUBVARIATIONS_FAILURE, payload: error });
      });
  };

  const getSubVariationsOptions = (id) => {
    dispatch({ type: FETCH_SUBVARIATIONS_OPTIONS });
    API.get(`/product_variation/variation-detail/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_SUBVARIATIONS_OPTIONS_SUCCESS,
            payload: response.data.data,
          });
          setShowDynamicForm(true);
        } else {
          dispatch({
            type: FETCH_SUBVARIATIONS_OPTIONS_FAILURE,
            payload: response.data.errorMessage,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_SUBVARIATIONS_OPTIONS_FAILURE, payload: error });
      });
  };
  useEffect(() => {
    formik?.values?.variationTypes &&
      getSubVariations(formik?.values?.variationTypes);
    formik?.values?.variationTypes &&
      getSubVariationsOptions(formik?.values?.variationTypes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik?.values?.variationTypes]);

  const handleSubOptionsChange = (nestChildId, value) => {
    let newArr = Array.from(value);
    value?.map((element, index) => {
      const item = allVariationDatas[nestChildId]?.find(
        (o) => o.size === element
      );
      let data = !!item
        ? (newArr[index] = item)
        : (newArr[index] = {
            size: element,
            unit_price: "",
            product_dimension: "",
            case_dimension: "",
            msrp: "",
            units_per_case: "",
            units_per_master_case: "",
            units_per_pallet: "",
            pallet_length: "",
            pallet_width: "",
            pallet_height: "",
          });
      return data;
    });
    setAllVariationDatas({
      ...allVariationDatas,
      [nestChildId]: newArr,
    });
  };

  const handleOptOnSubVarChanged = (value) => {
    let varOptData = {};
    if (value?.length) {
      value.map((data) => {
        return (
          allVariationDatas[data] &&
          (varOptData[data] = allVariationDatas[data])
        );
      });
    }
    return setAllVariationDatas(varOptData);
  };

  const setDefaultSubVarDetails = () => {
    const defaultData = productDetails?.products_variations
      ? productDetails?.products_variations.map((data) => data.variation_id)
      : [];
    const result = defaultData?.length
      ? defaultData?.reduce(
          (obj, cur) => ({
            ...obj,
            [cur]: productDetails?.products_variations?.find(
              (pv) => pv.variation_id === cur
            )
              ? productDetails?.products_variations
                  .find((pv) => pv.variation_id === cur)
                  ?.variations_options.map((data) => ({
                    size: data?.id,
                    unit_price: data?.unit_price || "",
                    product_dimension: data?.product_dimension || "",
                    case_dimension: data?.case_dimension || "",
                    msrp: data?.msrp || "",
                    units_per_case: data?.units_per_case || "",
                    units_per_master_case: data?.units_per_master_case || "",
                    units_per_pallet: data?.units_per_pallet || "",
                    pallet_length: data?.pallet_length || "",
                    pallet_width: data?.pallet_width || "",
                    pallet_height: data?.pallet_height || "",
                  }))
              : allVariationDatas[cur]?.length
              ? allVariationDatas[cur]
              : [],
          }),
          {}
        )
      : {};
    setAllVariationDatas(result);
  };

  useEffect(() => {
    setDefaultSubVarDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetails?.products_variations]);

  const handleFileChange = (event, idName, fieldName, defaultText) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      fileToUrl(file).then((data) =>
        formik.setFieldValue(`${fieldName}Url`, data)
      );
      document.getElementById(idName).innerHTML = file.name;
      formik.setFieldValue(fieldName, file);
      edit && fieldName === "image" && editProductImage(file);
    } else {
      document.getElementById(idName).innerHTML = defaultText;
    }
  };

  const handleMultipleFileChange = (event, idName, fieldName, defaultText) => {
    if (event.target.files.length) {
      let files = Array.from(event.target.files);
      formik.setFieldValue(fieldName, [
        ...formik?.values.products_gallery,
        ...files,
      ]);
    } else {
      document.getElementById(idName).innerHTML = defaultText;
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  // const isStepOptional = (step) => {
  //   return step === 0 || step === 1;
  // };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  useEffect(() => {
    setDisableBtn(false);
    activeStep === 0 &&
      setDisableBtn(
        !!formik?.errors?.name ||
          !!formik?.errors?.categories ||
          !!formik?.errors?.description ||
          !!formik?.errors?.image ||
          formik?.values?.description === "<p><br></p>" ||
          (userRole.vrm === getRole() && !!formik?.errors?.brandId)
      );
    activeStep === 1 &&
      setDisableBtn(
        !!formik?.errors?.subVariations || Object.keys(errors).length !== 0
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.errors, formik?.values, errors, activeStep]);

  const handleVariationDataChange = (e) => {
    setCurrentVariationData({
      ...currentVariationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenConfirmPopup = (name, id) => {
    setConfirmPopup(true);
    setConfirmParams({ name, id });
  };
  const closeConfirmPopup = () => {
    setConfirmPopup(false);
    setConfirmParams(null);
  };

  return (
    <div className={classes.addnewproductWrapper}>
      <Header />
      <Loader
        loading={
          state?.products?.loadingCategories ||
          state?.brands?.loadingBrands ||
          state?.products?.loadingProductDetails ||
          state?.products?.loadingProductVariations ||
          state?.products?.loadingSubVariations ||
          state?.products?.loadingSubVariationsOptions ||
          state?.products?.loadingAddProduct ||
          state?.products?.loadingEditProduct ||
          state?.products?.loadingEditProductImage ||
          state?.products?.loadingAddProductVariations ||
          state?.products?.loadingAddNewVariationOption
        }
      />
      <div className="add-new-product-wrapper">
        <div className="container">
          <div className="product-heading">
            <Typography variant="h1">
              {edit ? "Edit" : "Add New"} Product
            </Typography>
            {activeStep > 0 ? (
              <Button
                onClick={handleBack}
                sx={{ mr: 1 }}
                color="primary"
                className="primary-border-btn"
              >
                Back
              </Button>
            ) : (
              activeStep === 0 && (
                <Button
                  onClick={() => navigate(-1)}
                  sx={{ mr: 1 }}
                  color="primary"
                  className="primary-border-btn"
                >
                  Exit
                </Button>
              )
            )}
          </div>
          <div className="white-box">
            <Box sx={{ width: "100%" }}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  // if (isStepOptional(index)) {
                  //   labelProps.optional = (
                  //     <Typography variant="caption">Optional</Typography>
                  //   );
                  // }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      {edit ? (
                        <StepButton color="inherit" onClick={handleStep(index)}>
                          {label}
                        </StepButton>
                      ) : (
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      )}
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      onClick={handleReset}
                      color="primary"
                      className="primary-btn"
                    >
                      Reset
                    </Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="form-wrapper">
                    {activeStep === 0 && (
                      <ProductDetailsForm
                        formik={formik}
                        handleFileChange={handleFileChange}
                        handleMultipleFileChange={handleMultipleFileChange}
                        edit={edit}
                        userRoleVrm={userRole.vrm === getRole()}
                        openList={openList}
                        setOpenList={setOpenList}
                        handleExamplesOpen={handleExamplesOpen}
                      />
                    )}
                    {activeStep === 1 && (
                      <VariationDetailsForm
                        formik={formik}
                        errors={errors}
                        showDynamicForm={showDynamicForm}
                        allVariationDatas={allVariationDatas}
                        handleSubOptionsChange={handleSubOptionsChange}
                        handleOptOnSubVarChanged={handleOptOnSubVarChanged}
                        handleVariationDetailsOpen={handleVariationDetailsOpen}
                        addVariationValue={addVariationValue}
                        setAddVariationValue={setAddVariationValue}
                        handleOpenConfirmPopup={handleOpenConfirmPopup}
                      />
                    )}
                    {activeStep === 2 && (
                      <SelfLifeDetailsForm
                        formik={formik}
                        userRoleVrm={userRole.vrm === getRole()}
                      />
                    )}
                  </div>
                  <Box
                    className="stepper-btn-wrapper"
                    sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                  >
                    <div className="stepper-btn-2">
                      {activeStep < steps.length - 1 && (
                        <>
                          <Button
                            className="primary-btn"
                            onClick={handleNext}
                            disabled={disableBtn}
                          >
                            Next
                          </Button>
                          <Button
                            className="primary-btn"
                            disabled={
                              !formik.isValid ||
                              Object.keys(errors).length !== 0
                            }
                            type="submit"
                            onClick={formik.handleSubmit}
                          >
                            Save
                          </Button>
                        </>
                      )}
                      {activeStep === steps.length - 1 && (
                        <Button
                          color="primary"
                          className="primary-btn"
                          type="submit"
                          onClick={formik.handleSubmit}
                          disabled={
                            !formik.isValid || Object.keys(errors).length !== 0
                          }
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </div>
          <AddVariationDetails
            open={openVariationDetails}
            handleClose={() => handleVariationDetailsClose()}
            heading="Add Variations Details"
            value={currentVariationData}
            handleChange={handleVariationDataChange}
            handleSubmit={handleVariationDetailsSubmit}
          />
          <ExamplesPopup
            open={openExamples}
            handleClose={handleExamplesClose}
          />

          {confirmParams?.name === "flavour" ? (
            <AddFlavorSize
              open={openConfirmPopup}
              handleClose={closeConfirmPopup}
              handleConfirm={() =>
                onVariationSubmit(confirmParams?.name, confirmParams?.id)
              }
              setAddVariationValue={setAddVariationValue}
              fieldData={addVariationValue?.variationOption}
              addVariationValue={addVariationValue}
              confirmText={"What is the name of this flavor?"}
            />
          ) : (
            <AddVariationSize
              open={openConfirmPopup}
              handleClose={closeConfirmPopup}
              showDynamicForm={showDynamicForm}
              formik={formik}
              setAddVariationValue={setAddVariationValue}
              addVariationValue={addVariationValue}
              fieldData={addVariationValue?.variationSubOption}
              handleConfirm={() =>
                onVariationSubmit(confirmParams?.name, confirmParams?.id)
              }
              confirmText={"Are you sure to add variation option?"}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddNewProduct;
