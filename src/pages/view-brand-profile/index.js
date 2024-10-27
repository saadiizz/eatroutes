import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@components/header";
import Footer from "@components/footer";
import { myprofileStyle } from "./style";
import {
  Typography,
  Button,
  List,
  ListItem,
  Box,
  Stepper,
  Step,
  StepLabel,
  Card,
} from "@mui/material";
import { useStore } from "@store/store";
import { schema } from "@utils/schemas";
import { getUserId, getRole } from "@utils/commonFunctions";
import redEyeIcon from "@assets/images/red-eye.png";
import {
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  LOGOUT,
} from "@utils/actionType";
import API from "@services/axios";
import { userRole } from "@utils/constant";
import Loader from "@components/loader";
import { toast } from "react-toastify";
import NoImage from "@assets/images/no-image.jpg";
import ConfirmationPopup from "@components/confirmationPopup";

const steps = [
  "User Details",
  "Supplier Details",
  "Bank Details",
  "Upload Wireframs",
];

function ViewBrandProfile() {
  const classes = myprofileStyle();
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, dispatch] = useStore();
  const [data, setData] = useState(schema.updateProfileSchema);
  const [openConfirmPopup, setConfirmPopup] = useState(false);

  // API calling to get user profile data
  const getUser = () => {
    const url = id ? `user/${id}` : `user/${getUserId()}`;
    dispatch({ type: GET_PROFILE });
    API.get(url)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({ type: GET_PROFILE_SUCCESS, payload: response.data.data });
          setData(response.data.data);
        } else {
          dispatch({ type: GET_PROFILE_FAILURE, payload: response.data.data });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: GET_PROFILE_FAILURE, payload: error.response.data });
      });
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    closeConfirmPopup();
    dispatch({ type: LOGOUT });
    navigate("/login");
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleOpenConfirmPopup = () => {
    setConfirmPopup(true);
  };
  const closeConfirmPopup = () => {
    setConfirmPopup(false);
  };

  return (
    <div className={classes.myprofileWrapper}>
      <Header />
      <Loader
        loading={
          state?.profile?.gettingProfile || state?.profile?.addingProfileImage
        }
      />
      <div className="myprofile-page-wrapper">
        <div className="container">
          <div className="myprofile-heading">
            <Typography variant="h1">
              {getRole() === userRole.brand ? "My Profile" : "Brand Profile"}
            </Typography>
            {getRole() === userRole.brand ? (
              <Button
                color="primary"
                className="primary-border-btn"
                onClick={() => navigate(`/edit-brand/${id ? id : getUserId()}`)}
              >
                Edit
              </Button>
            ) : (
              <Button
                className="primary-btn primary-border-btn"
                onClick={() => navigate(-1)}
              >
                Back To Brands
              </Button>
            )}
          </div>

          <div className="white-box">
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
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
                  <List className="profile-detail">
                    {activeStep === 0 && (
                      <>
                        <div className="profile-wrapper">
                          <Card className="upload-image">
                            <img
                              className="user-image"
                              src={
                                data?.user_supplier?.image
                                  ? data?.user_supplier?.image
                                  : NoImage
                              }
                              alt="profile img"
                            />
                          </Card>
                        </div>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <span>First Name</span>
                            <p>{data?.first_name ? data?.first_name : "-"}</p>
                          </div>
                        </ListItem>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <span>Last Name</span>
                            <p>{data?.last_name ? data?.last_name : "-"}</p>
                          </div>
                        </ListItem>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <span>Phone Number</span>
                            <p>{data?.phone ? data?.phone : "-"}</p>
                          </div>
                        </ListItem>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <span>Email Address</span>
                            <p>{data?.email ? data?.email : "-"}</p>
                          </div>
                        </ListItem>
                      </>
                    )}
                    {activeStep === 1 && (
                      <>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <span>Company Name</span>
                            <p>
                              {data?.user_supplier?.company_legal_name
                                ? data?.user_supplier?.company_legal_name
                                : "-"}
                            </p>
                          </div>
                        </ListItem>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <span>Company Address</span>
                            <p>
                              {data?.user_supplier?.company_address
                                ? data?.user_supplier?.company_address
                                : "-"}
                            </p>
                          </div>
                        </ListItem>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <span>Brand Name</span>
                            <p>
                              {data?.user_supplier?.name
                                ? data?.user_supplier?.name
                                : "-"}
                            </p>
                          </div>
                        </ListItem>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <span>Brand Website</span>
                            <p>
                              {data?.user_supplier?.url ? (
                                <a
                                  href={data?.user_supplier?.url}
                                  title="brand website"
                                  className="custome-url"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {data?.user_supplier?.url}
                                </a>
                              ) : (
                                "-"
                              )}
                            </p>
                          </div>
                        </ListItem>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <span>Category</span>
                            <p className="no-collaps">
                              {data?.user_supplier?.categories.length
                                ? data?.user_supplier?.categories
                                    .map(({ name, data }) => name)
                                    .join(", ")
                                : "-"}
                            </p>
                          </div>
                        </ListItem>
                      </>
                    )}
                    {activeStep === 2 && (
                      <>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <span>Bank Name</span>
                            <p>
                              {data?.user_supplier?.bank_name
                                ? data?.user_supplier?.bank_name
                                : "-"}
                            </p>
                          </div>
                        </ListItem>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <span>Bank Address</span>
                            <p>
                              {data?.user_supplier?.bank_address
                                ? data?.user_supplier?.bank_address
                                : "-"}
                            </p>
                          </div>
                        </ListItem>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <span>Beneficiary Name</span>
                            <p>
                              {data?.user_supplier?.beneficiary_name
                                ? data?.user_supplier?.beneficiary_name
                                : "-"}
                            </p>
                          </div>
                        </ListItem>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <span>Beneficiary Address</span>
                            <p>
                              {data?.user_supplier?.beneficiary_address
                                ? data?.user_supplier?.beneficiary_address
                                : "-"}
                            </p>
                          </div>
                        </ListItem>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <span>Account Number</span>
                            <p>
                              {data?.user_supplier?.accounting_number
                                ? data?.user_supplier?.accounting_number
                                : "-"}
                            </p>
                          </div>
                        </ListItem>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <span>Routing Number</span>
                            <p>
                              {data?.user_supplier?.routing_number
                                ? data?.user_supplier?.routing_number
                                : "-"}
                            </p>
                          </div>
                        </ListItem>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <div className="labelWithEye">
                              <span>WirePayment Detail</span>
                              {data?.user_supplier?.wire_payment_detail && (
                                <a
                                  href={
                                    data?.user_supplier?.wire_payment_detail
                                  }
                                  title="View pdf"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img src={redEyeIcon} alt="view" />
                                </a>
                              )}
                            </div>
                            <p>
                              {data?.user_supplier?.wire_payment_detail ? (
                                <a
                                  href={
                                    data?.user_supplier?.wire_payment_detail
                                  }
                                  title="WirePayment Detail"
                                  className="custome-url"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {data?.user_supplier?.wire_payment_detail}
                                </a>
                              ) : (
                                "-"
                              )}
                            </p>
                          </div>
                        </ListItem>
                      </>
                    )}
                    {activeStep === 3 && (
                      <>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <div className="labelWithEye">
                              <span>Product Catalog</span>{" "}
                              {data?.user_supplier?.catalogue_form && (
                                <a
                                  href={data?.user_supplier?.catalogue_form}
                                  title="View pdf"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img src={redEyeIcon} alt="view" />
                                </a>
                              )}
                            </div>
                            <p>
                              {data?.user_supplier?.catalogue_form ? (
                                <a
                                  href={data?.user_supplier?.catalogue_form}
                                  title="Product Catalog"
                                  className="custome-url"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {data?.user_supplier?.catalogue_form}
                                </a>
                              ) : (
                                "-"
                              )}
                            </p>
                          </div>
                        </ListItem>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <div className="labelWithEye">
                              <span>Order Form</span>
                              {data?.user_supplier?.order_form && (
                                <a
                                  href={data?.user_supplier?.order_form}
                                  title="View pdf"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img src={redEyeIcon} alt="view" />
                                </a>
                              )}
                            </div>
                            <p>
                              {data?.user_supplier?.order_form ? (
                                <a
                                  href={data?.user_supplier?.order_form}
                                  title="Order Form"
                                  className="custome-url"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {data?.user_supplier?.order_form}
                                </a>
                              ) : (
                                "-"
                              )}
                            </p>
                          </div>
                        </ListItem>
                        <ListItem>
                          <div className="profile-detail-inner">
                            <div className="labelWithEye">
                              <span>Business License</span>{" "}
                              {data?.user_supplier?.business_license && (
                                <a
                                  href={data?.user_supplier?.business_license}
                                  title="View pdf"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img src={redEyeIcon} alt="view" />
                                </a>
                              )}
                            </div>
                            <p>
                              {data?.user_supplier?.business_license ? (
                                <a
                                  href={data?.user_supplier?.business_license}
                                  title="Business License"
                                  className="custome-url"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {data?.user_supplier?.business_license}
                                </a>
                              ) : (
                                "-"
                              )}
                            </p>
                          </div>
                        </ListItem>
                      </>
                    )}
                  </List>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                    className="btn-list"
                  >
                    {activeStep > 0 && (
                      <Button
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                        color="primary"
                        className="primary-border-btn"
                      >
                        Back
                      </Button>
                    )}
                    <Box sx={{ flex: "1 1 auto" }} />

                    {activeStep < steps.length - 1 && (
                      <Button className="primary-btn" onClick={handleNext}>
                        Next
                      </Button>
                    )}
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </div>
          {getRole() === userRole.brand && (
            <div className="btn-wrapper">
              <Button
                color="primary"
                className="primary-btn"
                onClick={handleOpenConfirmPopup}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
        <ConfirmationPopup
          open={openConfirmPopup}
          handleClose={closeConfirmPopup}
          handleConfirm={() => handleLogout()}
          confirmText={"Are you sure you want to Logout ?"}
        />
      </div>
      <Footer />
    </div>
  );
}

export default ViewBrandProfile;
