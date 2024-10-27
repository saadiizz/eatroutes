import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@components/header";
import Footer from "@components/footer";
import { myprofileStyle } from "./style";
import { Typography, Button, TextField, List, ListItem } from "@mui/material";
import cameraIcon from "@assets/images/camera.svg";
import { useFormik } from "formik";
import { useStore } from "@store/store";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { getUserId, setUserName } from "@utils/commonFunctions";
import {
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  LOGOUT,
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  SET_PROFILE_IMAGE,
  SET_PROFILE_IMAGE_SUCCESS,
  SET_PROFILE_IMAGE_FAILURE,
} from "@utils/actionType";
import API from "@services/axios";
import Loader from "@components/loader";
import EditProfile from "./edit-profile-popup";
import { toast } from "react-toastify";
import ConfirmationPopup from "@components/confirmationPopup";

function MyProfile() {
  const classes = myprofileStyle();
  const [state, dispatch] = useStore();
  const navigate = useNavigate();
  const [data, setData] = useState(schema.updateProfileSchema);
  const [open, setOpen] = useState(false);
  const [initialValue, setInitialValue] = useState(schema.customerSchema);
  const [openConfirmPopup, setConfirmPopup] = useState(false);

  // API calling to get user profile data
  const getUser = () => {
    dispatch({ type: GET_PROFILE });
    API.get(`user/${getUserId()}`)
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

  useEffect(() => {
    console.log("effect", data);
  }, [data]);

  const handleLogout = () => {
    closeConfirmPopup();
    dispatch({ type: LOGOUT });
    navigate("/login");
  };

  const editProfile = (data) => {
    if (data.roleInCompany) {
      data.role_in_company = data.roleInCompany;
      delete data.roleInCompany;
    }

    if (data.annualTurnover) {
      data.annual_turnover = data.annualTurnover;
      delete data.annualTurnover;
    }

    if (data.totalEmployees) {
      data.no_of_employees = data.totalEmployees;
      delete data.totalEmployees;
    }

    if (data.primaryMethodOfSale) {
      data.primary_method_of_sale = data.primaryMethodOfSale;
      delete data.primaryMethodOfSale;
    }

    if (data.regionsToSell) {
      data.regions_to_sell = data.regionsToSell;
      delete data.regionsToSell;
    }

    if (data.brandsCurrentlyWorking) {
      data.brands_currently_working = data.brandsCurrentlyWorking;
      delete data.brandsCurrentlyWorking;
    }

    if (data.facebookURL) {
      data.facebook_url = data.facebookURL;
      delete data.facebookURL;
    }

    if (data.instagramURL) {
      data.instagram_url = data.instagramURL;
      delete data.instagramURL;
    }

    if (data.linkedinURL) {
      data.linkedin_url = data.linkedinURL;
      delete data.linkedinURL;
    }

    if (data.companyWebsiteURL) {
      data.other_social_1 = data.companyWebsiteURL;
      delete data.companyWebsiteURL;
    }

    if (data.supplierName) {
      data.supplier_name = data.supplierName;
      delete data.supplierName;
    }

    if (data.otherNotes) {
      data.other_notes = data.otherNotes;
      delete data.otherNotes;
    }

    console.log("send", data);

    dispatch({ type: EDIT_PROFILE });
    API.post(`user/${getUserId()}`, data)
      .then((response) => {
        console.log("resp", response);
        if (response.data.statusCode === 200) {
          dispatch({
            type: EDIT_PROFILE_SUCCESS,
            payload: response.data.data,
          });
          setUserName(
            `${response.data.data.first_name} ${response.data.data.last_name}`
          );
          console.log(
            "before",
            response.data.data,
            response.data.data.primary_method_of_sale
          );
          setData(response.data.data);
          toast.success("Profile Updated Successfully");
          handleEditProfileClose();
        } else {
          dispatch({ type: EDIT_PROFILE_FAILURE, payload: response.data });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: EDIT_PROFILE_FAILURE, payload: err });
      });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValue,
    validationSchema: validationSchema.editCustomerValidationSchema,
    onSubmit: (value) => {
      // value = {
      //   firstName: value?.firstName,
      //   lastName: value?.lastName,

      //   phone: value?.phone.replace(/[\s-)(]+/g, ""),
      //   emailAddress: value?.emailAddress,
      //   userName: value?.userName,
      //   ...(!!value?.company ? { company: value?.company } : {}),
      //   ...(!!value?.streetAddress
      //     ? { streetAddress: value?.streetAddress }
      //     : {}),
      //   ...(!!value?.city ? { city: value?.city } : {}),
      //   ...(!!value?.postalCode ? { postalCode: value?.postalCode } : {}),
      //   ...(!!value?.country ? { country: value?.country } : {}),
      // };

      editProfile(value);
    },
  });

  const handleEditProfileOpen = () => {
    console.log("country", data?.country);
    console.log("sale", data?.primary_method_of_sale);
    setInitialValue({
      firstName: data?.first_name,
      lastName: data?.last_name,
      company: data?.company,
      roleInCompany: data?.role_in_company,
      totalEmployees: data?.no_of_employees,
      streetAddress: data?.street_address,
      city: data?.city,
      postalCode: data?.postal_code,
      country: data?.country,
      phone: data?.phone,
      emailAddress: data?.email,
      primaryMethodOfSale: data?.primary_method_of_sale,
      regionsToSell: data?.regions_to_sell,
      annualTurnover: data?.annual_turnover,
      brandsCurrentlyWorking: data?.brands_currently_working,
      facebookURL: data?.facebook_url,
      instagramURL: data?.instagram_url,
      linkedinURL: data?.linkedin_url,
      companyWebsiteURL: data?.other_social_1,
      source: data?.source,
      supplierName: data?.supplier_name,
      otherNotes: data?.other_notes,
      userName: data?.user_name,
      password: data?.tempory_password,
    });
    setOpen(true);
  };
  const handleEditProfileClose = () => {
    formik.handleReset();
    setInitialValue(schema.customerSchema);
    setOpen(false);
  };

  const handleProfileImage = (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    dispatch({ type: SET_PROFILE_IMAGE });
    API.post("client/avatar", formData).then((response) => {
      if (response.data.statusCode === 200) {
        dispatch({
          type: SET_PROFILE_IMAGE_SUCCESS,
          payload: response.data.data,
        });
        getUser();
        toast.success("Profile Picture Updated Successfully");
      } else {
        dispatch({
          type: SET_PROFILE_IMAGE_FAILURE,
          payload: response.data.errorMessage,
        });
        toast.error(response.data.errorMessage);
      }
    });
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
          state?.profile?.gettingProfile ||
          state?.profile?.editingProfile ||
          state?.profile?.addingProfileImage
        }
      />
      <div className="myprofile-page-wrapper">
        <div className="container">
          <div className="myprofile-heading">
            <Typography variant="h1">My Profile</Typography>
            <Button
              color="primary"
              className="primary-border-btn"
              onClick={handleEditProfileOpen}
            >
              Edit
            </Button>
          </div>

          <div className="white-box">
            <div className="profile-image">
              {data?.avatar ? (
                <img
                  className="user-image"
                  src={data?.avatar}
                  alt="profile img"
                />
              ) : (
                <span>
                  {data?.first_name && data?.first_name[0][0]}
                  {data?.last_name && data?.last_name[0][0]}
                </span>
              )}
              <div className="upload-image">
                <TextField
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  variant="outlined"
                  placeholder=""
                  onChange={handleProfileImage}
                />
                <em>
                  <img src={cameraIcon} alt="camera icon" />
                </em>
              </div>
            </div>
            <List className="profile-detail">
              <ListItem>
                <div className="profile-detail-inner">
                  <span>User Name</span>
                  <p>{data?.user_name ? data?.user_name : "-"}</p>
                </div>
              </ListItem>

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
                  <span>Role In Company</span>
                  <p>{data?.role_in_company ? data?.role_in_company : "-"}</p>
                </div>
              </ListItem>

              <ListItem>
                <div className="profile-detail-inner">
                  <span>Company</span>
                  <p>{data?.company ? data?.company : "-"}</p>
                </div>
              </ListItem>

              <ListItem>
                <div className="profile-detail-inner">
                  <span>No Of Employees</span>
                  <p>{data?.no_of_employees ? data?.no_of_employees : "-"}</p>
                </div>
              </ListItem>

              <ListItem>
                <div className="profile-detail-inner">
                  <span>Street Address</span>
                  <p>{data?.street_address ? data?.street_address : "-"}</p>
                </div>
              </ListItem>

              <ListItem>
                <div className="profile-detail-inner">
                  <span>Country</span>
                  <p>{data?.country ? data?.country : "-"}</p>
                </div>
              </ListItem>

              <ListItem>
                <div className="profile-detail-inner">
                  <span>City</span>
                  <p>{data?.city ? data?.city : "-"}</p>
                </div>
              </ListItem>

              <ListItem>
                <div className="profile-detail-inner">
                  <span>Postal/Zip</span>
                  <p>{data?.postal_code ? data?.postal_code : "-"}</p>
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

              <ListItem>
                <div className="profile-detail-inner">
                  <span>Primary Sale Data</span>
                  <p>
                    {data?.primary_method_of_sale?.length
                      ? data?.primary_method_of_sale.map((i) => {
                          return (
                            <>
                              <button
                                style={{
                                  borderRadius: "6px",
                                  color: "white",
                                  background: "#bf1e2e",
                                  border: "none",
                                  padding: "8px",
                                  margin: "4px 5px 5px 4px",
                                }}
                              >
                                {i}
                              </button>
                            </>
                          );
                        })
                      : "-"}
                  </p>
                </div>
              </ListItem>

              <ListItem>
                <div className="profile-detail-inner">
                  <span>Regions To Sell</span>
                  <p>
                    {data?.regions_to_sell?.length
                      ? data?.regions_to_sell.map((i) => {
                          return (
                            <>
                              <button
                                style={{
                                  borderRadius: "6px",
                                  color: "white",
                                  background: "#bf1e2e",
                                  border: "none",
                                  padding: "8px",
                                  margin: "4px 5px 5px 4px",
                                }}
                              >
                                {i}
                              </button>
                            </>
                          );
                        })
                      : "-"}
                  </p>
                </div>
              </ListItem>

              <ListItem>
                <div className="profile-detail-inner">
                  <span>Annual Turnover</span>
                  <p>{data?.annual_turnover ? data?.annual_turnover : "-"}</p>
                </div>
              </ListItem>

              <ListItem>
                <div className="profile-detail-inner">
                  <span>Brands Currently Working With</span>
                  <p>
                    {data?.brands_currently_working
                      ? data?.brands_currently_working
                      : "-"}
                  </p>
                </div>
              </ListItem>

              <ListItem>
                <div className="profile-detail-inner">
                  <span>Facebook URL</span>
                  <p>{data?.facebook_url ? data?.facebook_url : "-"}</p>
                </div>
              </ListItem>

              <ListItem>
                <div className="profile-detail-inner">
                  <span>Instagram URL</span>
                  <p>{data?.instagram_url ? data?.instagram_url : "-"}</p>
                </div>
              </ListItem>

              <ListItem>
                <div className="profile-detail-inner">
                  <span>Linkedin URL</span>
                  <p>{data?.linkedin_url ? data?.linkedin_url : "-"}</p>
                </div>
              </ListItem>

              <ListItem>
                <div className="profile-detail-inner">
                  <span>Company Website URL</span>
                  <p>{data?.other_social_1 ? data?.other_social_1 : "-"}</p>
                </div>
              </ListItem>

              <ListItem>
                <div className="profile-detail-inner">
                  <span>Source</span>
                  <p>{data?.source ? data?.source : "-"}</p>
                </div>
              </ListItem>

              {data?.source === "SUPPLIER" ? (
                <ListItem>
                  <div className="profile-detail-inner">
                    <span>Supplier Name</span>
                    <p>{data?.supplier_name ? data?.supplier_name : "-"}</p>
                  </div>
                </ListItem>
              ) : null}

              <ListItem>
                <div className="profile-detail-inner">
                  <span>Other Notes</span>
                  <p>{data?.other_notes ? data?.other_notes : "-"}</p>
                </div>
              </ListItem>
            </List>
          </div>
          <div className="btn-wrapper">
            <Button
              color="primary"
              className="primary-btn"
              onClick={handleOpenConfirmPopup}
            >
              Logout
            </Button>
          </div>
          <EditProfile
            open={open}
            handleClose={handleEditProfileClose}
            formik={formik}
          />
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

export default MyProfile;
