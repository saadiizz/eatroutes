import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import API from "@services/axios";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import Header from "@components/header";
import Footer from "@components/footer";
import { addnewbrandStyle } from "./style";
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
  ADD_BRAND,
  ADD_BRAND_SUCCESS,
  ADD_BRAND_FAILURE,
  FETCH_BRAND_CATEGORIES,
  FETCH_BRAND_CATEGORIES_SUCCESS,
  FETCH_BRAND_CATEGORIES_FAILURE,
  FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
} from "@utils/actionType";
import Loader from "@components/loader";
import BrandDetailsForm from "./brand-details";
// import CompanyDetailsForm from "./company-details";
import BankDetailsForm from "./bank-details";
import DocumentDetailsForm from "./document-details";
import { toast } from "react-toastify";
import {
  getToken,
  fileToUrl,
  setUserName,
  getRole,
} from "@utils/commonFunctions";
import { userRole } from "@utils/constant";
import secureNoteIcon from "@assets/images/secure-note.png";
import SuccessPopup from "@components/success-popup";

const steps = [
  "Brand Details",
  "Upload Documents",
  "Bank Details",
  // "Upload Wireframs",
];

function AddNewBrand() {
  const classes = addnewbrandStyle();
  const [state, dispatch] = useStore();
  const [edit, setEdit] = useState(false);
  const [brand, setBrand] = useState({});
  const [disableBtn, setDisableBtn] = useState(true);
  const [openSuccess, setOpenSuccess] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const getCategories = () => {
    dispatch({ type: FETCH_BRAND_CATEGORIES });
    API.get("/category")
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_BRAND_CATEGORIES_SUCCESS,
            payload: response.data.data,
          });
        } else {
          dispatch({
            type: FETCH_BRAND_CATEGORIES_FAILURE,
            payload: response.data.errorMessage,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_BRAND_CATEGORIES_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBrands = (id) => {
    dispatch({ type: FETCH_BRANDS });
    API.get(`/user/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_BRANDS_SUCCESS,
            payload: response.data.data,
          });
          setBrand(response.data.data);
        } else {
          dispatch({
            type: FETCH_BRANDS_FAILURE,
            payload: response.data.data,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_BRANDS_FAILURE, payload: error });
      });
  };
  useEffect(() => {
    id && getBrands(id);
    setEdit(id ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    initialValues:
      brand && edit
        ? {
            firstName: brand?.first_name ? brand?.first_name : "",
            lastName: brand?.last_name ? brand?.last_name : "",
            phone: brand?.phone ? brand?.phone : "",
            emailAddress: brand?.email ? brand?.email : "",
            userName: brand?.user_name ? brand?.user_name : "",
            password: "",
            avatar: brand?.avatar ? brand?.avatar : "",

            companyName: brand?.user_supplier?.company_legal_name
              ? brand?.user_supplier?.company_legal_name
              : "",
            companyAddress: brand?.user_supplier?.company_address,
            brandName: brand?.user_supplier?.name
              ? brand?.user_supplier?.name
              : "",
            brandWebsite: brand?.user_supplier?.url
              ? brand?.user_supplier?.url
              : "",
            image: brand?.user_supplier?.image
              ? brand?.user_supplier?.image
              : "",

            categories: brand?.user_supplier?.categories
              ? brand?.user_supplier?.categories.map((data) => data.id)
              : [],

            bankName: brand?.user_supplier?.bank_name
              ? brand?.user_supplier?.bank_name
              : "",
            bankAddress: brand?.user_supplier?.bank_address
              ? brand?.user_supplier?.bank_address
              : "",
            bankCity: brand?.user_supplier?.bank_city
              ? brand?.user_supplier?.bank_city
              : "",
            bankstate: brand?.user_supplier?.bank_state
              ? brand?.user_supplier?.bank_state
              : "",
            bankPostalCode: brand?.user_supplier?.bank_postal_code
              ? brand?.user_supplier?.bank_postal_code
              : "",
            bankCountry: brand?.user_supplier?.bank_country
              ? brand?.user_supplier?.bank_country
              : "",
            beneficiaryName: brand?.user_supplier?.beneficiary_name
              ? brand?.user_supplier?.beneficiary_name
              : "",
            beneficiaryAddress: brand?.user_supplier?.beneficiary_address
              ? brand?.user_supplier?.beneficiary_address
              : "",
            beneficiaryCity: brand?.user_supplier?.beneficiary_city
              ? brand?.user_supplier?.beneficiary_city
              : "",
            beneficiarystate: brand?.user_supplier?.beneficiary_state
              ? brand?.user_supplier?.beneficiary_state
              : "",
            beneficiaryPostalCode: brand?.user_supplier?.beneficiary_postal_code
              ? brand?.user_supplier?.beneficiary_postal_code
              : "",
            beneficiaryCountry: brand?.user_supplier?.beneficiary_country
              ? brand?.user_supplier?.beneficiary_country
              : "",

            accountNumber: brand?.user_supplier?.accounting_number
              ? brand?.user_supplier?.accounting_number
              : "",
            routingNumber: brand?.user_supplier?.routing_number
              ? brand?.user_supplier?.routing_number
              : "",
            swiftCode: brand?.user_supplier?.swift_code
              ? brand?.user_supplier?.swift_code
              : "",

            catalogForm: brand?.user_supplier?.catalogue_form
              ? brand?.user_supplier?.catalogue_form
              : "",
            orderForm: brand?.user_supplier?.order_form
              ? brand?.user_supplier?.order_form
              : "",
            productsImport: brand?.user_supplier?.products_import
              ? brand?.user_supplier?.products_import
              : "",
            businessLicense: brand?.user_supplier?.business_license
              ? brand?.user_supplier?.business_license
              : "",
            wirePaymentDetail: brand?.user_supplier?.wire_payment_detail
              ? brand?.user_supplier?.wire_payment_detail
              : "",

            avatarUrl: brand?.avatar ? brand?.avatar : "",
            imageUrl: brand?.user_supplier?.image
              ? brand?.user_supplier?.image
              : "",
            catalogFormUrl: brand?.user_supplier?.catalogue_form
              ? brand?.user_supplier?.catalogue_form
              : "",
            orderFormUrl: brand?.user_supplier?.order_form
              ? brand?.user_supplier?.order_form
              : "",
            productsImportUrl: brand?.user_supplier?.products_import
              ? brand?.user_supplier?.products_import
              : "",
            businessLicenseUrl: brand?.user_supplier?.business_license
              ? brand?.user_supplier?.business_license
              : "",
            wirePaymentDetailUrl: brand?.user_supplier?.wire_payment_detail
              ? brand?.user_supplier?.wire_payment_detail
              : "",
          }
        : schema.addBrandSchema,

    validationSchema: edit
      ? validationSchema.editBrandValidationSchema
      : validationSchema.addBrandValidationSchema,
    onSubmit: (value) => {
      const firstData = {
        first_name: value.firstName,
        last_name: value.lastName,
        contact_phone: value.phone.replace(/[\s-)(]+/g, ""),
        contact_email: value.emailAddress,
        user_name: value.userName,
        ...(value.password ? { password: value.password } : {}),
        ...(typeof value.avatar !== "string" && !!value.avatar
          ? { avatar: value.avatar }
          : {}),

        ...(value.companyName ? { company_legal_name: value.companyName } : {}),
        ...(value.companyAddress
          ? { company_address: value.companyAddress }
          : {}),
        ...(value.brandName ? { name: value.brandName } : {}),
        ...(value.brandWebsite ? { url: value.brandWebsite } : {}),
        ...(typeof value.image !== "string" && !!value.image
          ? { image: value.image }
          : {}),

        ...(value.bankName ? { bank_name: value.bankName } : {}),
        ...(value.bankAddress ? { bank_address: value.bankAddress } : {}),
        ...(value.bankCity ? { bank_city: value.bankCity } : {}),
        ...(value.bankState ? { bank_state: value.bankState } : {}),
        ...(value.bankPostalCode
          ? { bank_postal_code: value.bankPostalCode }
          : {}),
        ...(value.bankCountry ? { bank_country: value.bankCountry } : {}),

        ...(value.beneficiaryName
          ? { beneficiary_name: value.beneficiaryName }
          : {}),
        ...(value.beneficiaryAddress
          ? { beneficiary_address: value.beneficiaryAddress }
          : {}),
        ...(value.beneficiaryCity
          ? { beneficiary_city: value.beneficiaryCity }
          : {}),
        ...(value.beneficiaryState
          ? { beneficiary_state: value.beneficiaryState }
          : {}),
        ...(value.beneficiaryPostalCode
          ? { beneficiary_postal_code: value.beneficiaryPostalCode }
          : {}),
        ...(value.beneficiaryCountry
          ? { beneficiary_country: value.beneficiaryCountry }
          : {}),

        ...(value.accountNumber
          ? { accounting_number: value.accountNumber }
          : {}),
        ...(value.routingNumber ? { routing_number: value.routingNumber } : {}),
        ...(value.swiftCode ? { swift_code: value.swiftCode } : {}),

        ...(typeof value.catalogForm !== "string" && !!value.catalogForm
          ? { catalogue_form: value.catalogForm }
          : {}),
        ...(typeof value.orderForm !== "string" && !!value.orderForm
          ? { order_form: value.orderForm }
          : {}),
        ...(typeof value.productsImport !== "string" && !!value.productsImport
          ? { products_import: value.productsImport }
          : {}),
        ...(typeof value.businessLicense !== "string" && !!value.businessLicense
          ? { business_license: value.businessLicense }
          : {}),
        ...(typeof value.wirePaymentDetail !== "string" &&
        !!value.wirePaymentDetail
          ? { wire_payment_detail: value.wirePaymentDetail }
          : {}),

        ...(!!value?.categories ? { "categories[0]": value?.categories } : {}),
      };

      // value.categories.map(
      //   (data, index) => (firstData[`categories[${index}]`] = data)
      // );

      const formData = new FormData();
      Object.keys(firstData).forEach((fieldName) => {
        formData.append(fieldName, firstData[fieldName]);
      });

      edit ? editBrand(formData) : addBrand(formData);
    },
  });

  const addBrand = (brandData) => {
    dispatch({ type: ADD_BRAND });
    API.post("/supplier/create-supplier", brandData)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: ADD_BRAND_SUCCESS,
            payload: response.data.data,
          });
          toast.success("Brand created Successfully");
          formik.handleReset();
          setOpenSuccess(true);
        } else {
          dispatch({ type: ADD_BRAND_FAILURE, payload: {} });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: ADD_BRAND_FAILURE, payload: {} });
        toast.error("Some thing went wrong please try again letter");
      });
  };
  const editBrand = (brandData) => {
    dispatch({ type: ADD_BRAND });
    API.post(`/supplier/update-supplier/details/${id}`, brandData)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: ADD_BRAND_SUCCESS,
          });
          getRole() === userRole.brand &&
            setUserName(
              `${response.data.data.first_name} ${response.data.data.last_name}`
            );
          toast.success("Brand Edited Successfully");
          navigate("/brands");
        } else {
          dispatch({ type: ADD_BRAND_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: ADD_BRAND_FAILURE });
        toast.error("Some thing went wrong please try again letter");
      });
  };
  const handleFileChange = (event, idName, fieldName, defaultText) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      fileToUrl(file).then((data) =>
        formik.setFieldValue(`${fieldName}Url`, data)
      );
      document.getElementById(idName).innerHTML = file.name;
      formik.setFieldValue(fieldName, file);
    } else {
      document.getElementById(idName).innerHTML = defaultText;
    }
  };
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

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
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  useEffect(() => {
    setDisableBtn(false);
    activeStep === 0 &&
      setDisableBtn(
        !!formik?.errors?.brandName ||
          !!formik?.errors?.brandWebsite ||
          !!formik?.errors?.categories ||
          !!formik?.errors?.companyName ||
          !!formik?.errors?.companyAddress ||
          !!formik?.errors?.firstName ||
          !!formik?.errors?.lastName ||
          !!formik?.errors?.phone ||
          !!formik?.errors?.emailAddress ||
          !!formik?.errors?.userName ||
          (!edit && !!formik?.errors?.password)
      );
    activeStep === 1 &&
      setDisableBtn(
        !formik?.values?.catalogForm &&
          !formik?.values?.orderForm &&
          !formik?.values?.businessLicense
      );
    activeStep === 2 &&
      setDisableBtn(
        !formik?.values?.wirePaymentDetail &&
          (!formik?.values?.bankName ||
            !formik?.values?.bankAddress ||
            !formik?.values?.bankCity ||
            !formik?.values?.bankState ||
            !formik?.values?.bankCountry ||
            !formik?.values?.bankPostalCode ||
            !formik?.values?.beneficiaryName ||
            !formik?.values?.beneficiaryAddress ||
            !formik?.values?.beneficiaryCity ||
            !formik?.values?.beneficiaryState ||
            !formik?.values?.beneficiaryCountry ||
            !formik?.values?.beneficiaryPostalCode ||
            !formik?.values?.accountNumber ||
            !formik?.values?.routingNumber)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values, formik.errors, activeStep]);

  const closeSuccessPopup = (value) => {
    setOpenSuccess(value);
    getToken() ? navigate("/brands") : navigate("/login");
  };

  return (
    <div className={classes.addnewbrandWrapper}>
      <Header />
      <Loader
        loading={
          state?.brands?.loadingBrands ||
          state?.brands?.loadingCategoriesData ||
          state?.brands?.loadingAddBrand
        }
      />
      <div className="add-new-brand-wrapper">
        <div className="container">
          <div className="brand-heading">
            <Typography variant="h1">
              {id
                ? "Edit Brand"
                : getToken()
                ? "Add Brand"
                : "Let's Get Your Brand Setup"}
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

              {activeStep < steps.length && (
                <React.Fragment>
                  <div className="form-wrapper">
                    {activeStep === 0 && (
                      <BrandDetailsForm
                        formik={formik}
                        handleFileChange={handleFileChange}
                        edit={edit}
                        state={state}
                      />
                    )}
                    {activeStep === 1 && (
                      <DocumentDetailsForm
                        formik={formik}
                        handleFileChange={handleFileChange}
                      />
                    )}
                    {activeStep === 2 && (
                      <BankDetailsForm
                        formik={formik}
                        handleFileChange={handleFileChange}
                      />
                    )}

                    {/* {activeStep === 3 && (
                      <CompanyDetailsForm
                        formik={formik}
                        state={state}
                        handleFileChange={handleFileChange}
                      />
                    )} */}
                  </div>
                  <Box
                    className="stepper-btn-wrapper"
                    sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                  >
                    {(activeStep === 1 || activeStep === 2) && (
                      <div className="secure-note">
                        <img src={secureNoteIcon} alt=""></img>
                        <h5>
                          All documents provided are 100% private and secured.
                          <br />
                          All documents will be reviewed by an Eat routes vendor
                          Relations Manager
                        </h5>
                      </div>
                    )}
                    {activeStep === 0 && <Box sx={{ flex: "1 1 auto" }} />}
                    <div className="stepper-btn-2">
                      {activeStep < 2 && edit && (
                        <Button
                          color="primary"
                          className="primary-btn"
                          type="submit"
                          onClick={formik.handleSubmit}
                          disabled={!formik.isValid}
                          sx={{ mr: 1 }}
                        >
                          Save
                        </Button>
                      )}
                      {activeStep === 1 && (
                        <Button
                          onClick={handleSkip}
                          sx={{ mr: 1 }}
                          color="primary"
                          className="primary-border-btn"
                        >
                          Skip
                        </Button>
                      )}
                      {activeStep < 2 && (
                        <Button
                          className="primary-btn"
                          onClick={handleNext}
                          disabled={disableBtn}
                        >
                          Next
                        </Button>
                      )}

                      {activeStep === 2 && (
                        <Button
                          color="primary"
                          className="primary-border-btn"
                          onClick={formik.handleSubmit}
                          sx={{ mr: 1 }}
                        >
                          SKIP
                        </Button>
                      )}
                      {activeStep === 2 && (
                        <Button
                          color="primary"
                          className="primary-btn"
                          type="submit"
                          onClick={formik.handleSubmit}
                          disabled={
                            !(
                              formik.isValid &&
                              (formik?.values?.wirePaymentDetail ||
                                (formik?.values?.bankName &&
                                  formik?.values?.bankAddress &&
                                  formik?.values?.beneficiaryName &&
                                  formik?.values?.beneficiaryAddress &&
                                  formik?.values?.accountNumber &&
                                  formik?.values?.routingNumber))
                            )
                          }
                        >
                          NEXT
                        </Button>
                      )}
                    </div>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </div>
        </div>
      </div>
      <SuccessPopup
        open={openSuccess}
        headline={`Greate Job ${
          state?.brands?.addBrandData?.first_name
            ? state?.brands?.addBrandData?.first_name?.charAt(0).toUpperCase() +
              state?.brands?.addBrandData?.first_name?.slice(1)
            : null
        }`}
        text={`${
          getToken()
            ? "Brand account created successfully"
            : "Your brand account is being reviewed by a team member who will reach out to you soon."
        }`}
        handleClose={() => closeSuccessPopup(false)}
      />
      <Footer />
    </div>
  );
}

export default AddNewBrand;
