import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import API from "@services/axios";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import Header from "@components/header";
import Footer from "@components/footer";
import { customerLeadStyle } from "./style";
import MuiPhoneNumber from "material-ui-phone-number";
import { FocusError } from "focus-formik-error";
import {
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import NoImage from "@assets/images/no-image.jpg";
import EyeIcon from "@assets/images/eye.svg";
import EyeHideIcon from "@assets/images/eye-line.svg";
import { useStore } from "@store/store";
import {
  ADD_CUSTOMER,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILURE,
  FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
  FETCH_BRAND_CATEGORIES,
  FETCH_BRAND_CATEGORIES_SUCCESS,
  FETCH_BRAND_CATEGORIES_FAILURE,
} from "@utils/actionType";
import { countries } from "@utils/commonData";
// import BrandAccess from "../brand-access-popup";
import Loader from "@components/loader";
import { toast } from "react-toastify";
import AddLeadSlect from "../addLead/addLeadSlect";
import {
  AnnualTurnoverData,
  NumberEmployeeData,
  PrimarySaleData,
} from "../../../utils/commonData";
import LeadPopUp from "../../../components/leadPopUp";

function CustomerLead({ leadData }) {
  const classes = customerLeadStyle();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [countriesData, setCountriesData] = useState([]);
  const [state, dispatch] = useStore();
  const [openBrandAccess, setOpenBrandAccess] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [primaryData, setPrimaryData] = useState([]);
  const [regionInpt, setRegionInpt] = useState([]);
  const [leadId, setLeadId] = useState(0);
  const [categoryName, setCategoryName] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [accesLeadToStaff, setAccesLeadToStaff] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("us");
  const handleClick = () => setShowPassword(!showPassword);

  const getBrandsByCategory = (data) => {
    dispatch({ type: FETCH_BRANDS });
    API.post("/brand/search-brands/category", { categories: data })
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_BRANDS_SUCCESS,
            payload:
              typeof response.data.data === "string" ? [] : response.data.data,
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
  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    value.length ? getBrandsByCategory(value) : getBrands();
  };
  useEffect(() => {
    setCountriesData(countries);
    setPrimaryData(PrimarySaleData);
    // setRegionInpt(regionData)
  }, []);

  // API calling to add customer
  const addCustomer = (data) => {
    let objData = {
      lead_id: location?.state?.leadId,
      userName: data?.userName,
      firstName: data?.firstName,
      lastName: data?.lastName,
      company: data?.company,
      streetAddress: data?.streetAddress,
      city: data?.city,
      country: data?.country,
      phone: data?.phone,
      emailAddress: data?.emailAddress,
      postalCode: data?.postalCode,
      password: data?.password,
      staff_id: accesLeadToStaff?.id,
      no_of_employees: data?.employee,
      annual_turnover: data?.annualRevenue,
      brands_currently_working: data?.currentBrand,
      facebook_url: data?.facebook,
      instagram_url: data?.instagram,
      linkedin_url: data?.linkedin,
      other_social_1: data?.otherSocial,
      primary_method_of_sale: data?.saleMethod,
      regions_to_sell: data?.regionsSide,
      source: data?.source,
      supplier_name: data?.supplierName,
      role_in_company: data?.roleInCompany,
      otherNotes: data?.otherNotes,
    };

    dispatch({ type: ADD_CUSTOMER });
    API.post("leads/create-client-from-lead", objData)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: ADD_CUSTOMER_SUCCESS,
            payload: response.data.data,
          });
          data?.invite === true && toast.success("Client invited successfully");
          toast.success(response.data.successMessage);
          navigate("/customer-list");
        } else {
          dispatch({ type: ADD_CUSTOMER_FAILURE, payload: response.data.data });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: ADD_CUSTOMER_FAILURE, payload: err });
      });
  };

  const formik = useFormik({
    initialValues: location?.state
      ? {
          userName: "",
          firstName: location?.state?.firstName ?? "",
          lastName: location?.state?.lastName ?? "",
          company: location?.state?.company ?? "",
          streetAddress: location?.state?.streetAddress ?? "",
          city: location?.state?.city ?? "",
          postalCode: location?.state?.postalCode ?? "",
          country: location?.state?.country ?? "",
          phone: location?.state?.phone ?? "",
          emailAddress: location?.state?.emailAddress ?? "",
          employee: location?.state?.employee ?? "",
          annualRevenue: location?.state?.annualRevenue ?? "",
          currentBrand: location?.state?.currentBrand ?? "",
          facebook: location?.state?.facebook ?? "",
          instagram: location?.state?.instagram ?? "",
          linkedin: location?.state?.linkedin ?? "",
          otherSocial: location?.state?.otherSocial ?? "",
          saleMethod: location?.state?.saleMethod ?? "",
          regionsSide: location?.state?.regionsSide ?? "",
          source: location?.state?.source ?? "",
          supplierName: location?.state?.supplierName ?? "",
          roleInCompany: location?.state?.roleInCompany ?? "",
          otherNotes: location?.state?.otherNotes ?? "",
          password: "",
        }
      : schema.customerLeadSchema,
    validationSchema: validationSchema.addCustomerLeadValidationSchema,
    onSubmit: (value) => {
      value = { ...value, phone: value?.phone.replace(/[\s-)(]+/g, "") };
      addCustomer(value);
      // value?.brand_ids?.length
      //   ?
      //   : toast.error("At least one brand is required");
    },
    enableReinitialize: true,
  });
  const getRegions = () => {
    dispatch({ type: FETCH_BRANDS });
    API.get("/countries")
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_BRANDS_SUCCESS,
            payload: response.data.data,
          });

          setRegionInpt(response.data.data);
        } else {
          dispatch({ type: FETCH_BRANDS_FAILURE, payload: response.data.data });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_BRANDS_FAILURE, payload: error });
      });
  };
  useEffect(() => {
    setAccesLeadToStaff({
      id: location?.state?.id,
      first_name: location?.state?.first_name,
    });
    getRegions();
  }, [location?.state?.id, location?.state?.first_name]);

  const handleInvite = () => {
    formik.setFieldValue("invite", true);
    formik.handleSubmit();
  };

  const getBrands = () => {
    dispatch({ type: FETCH_BRANDS });
    API.get("/brand")
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
            payload: response.data.data,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_BRAND_CATEGORIES_FAILURE, payload: error });
      });
  };
  const { pathname } = useLocation();
  useEffect(() => {
    getBrands();
    getCategories();
    getStaff();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleBrandAccessOpen = () => {
    setOpenBrandAccess(true);
    setSelectedBrands(formik?.values?.brand_ids);
  };
  const handleBrandAccessClose = () => {
    setSelectedBrands(formik?.values?.brand_ids);
    setOpenBrandAccess(false);
  };
  const handleBrandAccessChange = (id) => {
    let value = [...selectedBrands, id];
    if (selectedBrands.includes(id)) {
      value = value.filter((f) => f !== id);
    }
    setSelectedBrands(value);
  };
  const handleBrandAccessSubmit = (data) => {
    setSelectedBrands(selectedBrands);
    formik.setFieldValue("brand_ids", [...selectedBrands]);
    handleBrandAccessClose();
  };
  const handleAssingChange = (bool) => {
    setOpenDrawer(bool);
  };
  const handlestaffAccess = (data) => {
    setAccesLeadToStaff(data);
  };

  const getStaff = () => {
    // dispatch({ type: FETCH_BRAND_CATEGORIES });
    API.get("/staff")
      .then((response) => {
        if (response.data.statusCode === 200) {
          setStaffList(response.data.data?.data);
        } else {
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.errorMessage);
      });
  };
  return (
    <div className={classes.addnewcustomerWrapper}>
      <Header />
      <Loader
        loading={
          state?.brands?.loadingBrands || state?.customers?.addingCustomer
        }
      />
      <FocusError formik={formik} />
      <div className="add-new-customer-wrapper">
        <div className="container">
          <Typography variant="h1">Add New Customer</Typography>
          <div className="white-box">
            <div className="form-wrapper">
              <div className="form-group full-width">
                <TextField
                  id="userName"
                  name="userName"
                  label="User Name *"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                  error={
                    formik.touched.userName && Boolean(formik.errors.userName)
                  }
                  helperText={formik.touched.userName && formik.errors.userName}
                />
              </div>
              <div className="form-group">
                <TextField
                  name="firstName"
                  id="firstName"
                  label="First Name *"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </div>
              <div className="form-group">
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name *"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="roleInCompany"
                  name="roleInCompany"
                  label="Role in company"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.roleInCompany}
                  error={
                    formik.touched.roleInCompany &&
                    Boolean(formik.errors.roleInCompany)
                  }
                  helperText={
                    formik.touched.roleInCompany && formik.errors.roleInCompany
                  }
                />
              </div>
              <div className="form-group">
                <TextField
                  id="company"
                  name="company"
                  label="Company *"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.company}
                  error={
                    formik.touched.company && Boolean(formik.errors.company)
                  }
                  helperText={formik.touched.company && formik.errors.company}
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  id="streetAddress"
                  name="streetAddress"
                  label="Street Address  *"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.streetAddress}
                  error={
                    formik.touched.streetAddress &&
                    Boolean(formik.errors.streetAddress)
                  }
                  helperText={
                    formik.touched.streetAddress && formik.errors.streetAddress
                  }
                />
              </div>
              <div className="form-group">
                <TextField
                  select
                  id="country"
                  name="country"
                  label="Country"
                  type="text"
                  variant="outlined"
                  onChange={(event) => {
                    formik.handleChange(event);

                    setSelectedCountry(event.target.value.toLowerCase());
                  }}
                  value={formik.values.country}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
                >
                  {countriesData?.length &&
                    countriesData?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.code}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
              <div className="form-group">
                <TextField
                  id="city"
                  name="city"
                  label="City *"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="postalCode"
                  name="postalCode"
                  label="Postal/Zip"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.postalCode}
                  error={
                    formik.touched.postalCode &&
                    Boolean(formik.errors.postalCode)
                  }
                  helperText={
                    formik.touched.postalCode && formik.errors.postalCode
                  }
                />
              </div>
              <div className="form-group phone-wrapper">
                <MuiPhoneNumber
                  id="phone"
                  name="phone"
                  label="Phone Number *"
                  defaultCountry={
                    ["aq", "bv", "gg"].includes(selectedCountry)
                      ? "us"
                      : selectedCountry
                  }
                  dropdownClass={classes.countrySelect}
                  value={formik.values.phone}
                  onChange={(e) =>
                    formik.setFieldValue("phone", e.replace(/[\s-)(]+/g, ""))
                  }
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  variant="outlined"
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  id="emailAddress"
                  name="emailAddress"
                  label="Email Address *"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.emailAddress}
                  error={
                    formik.touched.emailAddress &&
                    Boolean(formik.errors.emailAddress)
                  }
                  helperText={
                    formik.touched.emailAddress && formik.errors.emailAddress
                  }
                />
              </div>

              <div className="form-group full-width password-group">
                <TextField
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <span onClick={handleClick} edge="end">
                          {showPassword ? (
                            <img src={EyeIcon} alt="eye" />
                          ) : (
                            <img src={EyeHideIcon} alt="eye" />
                          )}
                        </span>
                      </InputAdornment>
                    ),
                  }}
                  id="temp-password"
                  name="password"
                  label="Temporary Password *"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </div>
              <div className="form-group full-width">
                <div variant="outlined" onClick={() => setOpenDrawer(true)}>
                  <TextField
                    label="Assign Staff to Client *"
                    variant="outlined"
                    value={accesLeadToStaff?.first_name}
                  />
                  <LeadPopUp
                    leadToCustomerData={staffList}
                    selectedStaff={accesLeadToStaff}
                    setOpenDrawer={setOpenDrawer}
                    handlestaffAccess={(e) => handlestaffAccess(e)}
                    openDrawer={openDrawer}
                    handleCloseDrawer={() => handleAssingChange(false)}
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <TextField
                  select
                  id="annualRevenue"
                  name="annualRevenue"
                  label="Annual turnover (USD equivalent)"
                  type="text"
                  placeholder="Select Annual Turnover"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.annualRevenue}
                  error={
                    formik.touched.annualRevenue &&
                    Boolean(formik.errors.annualRevenue)
                  }
                  helperText={
                    formik.touched.annualRevenue && formik.errors.annualRevenue
                  }
                >
                  <MenuItem
                    value=""
                    selected={!formik.values.annualRevenue}
                    disabled={formik.values.annualRevenue}
                  >
                    Select Annual
                  </MenuItem>
                  {!!AnnualTurnoverData?.length &&
                    AnnualTurnoverData?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
              <div className="form-group full-width">
                <AddLeadSlect
                  PrimarySaleData={location?.state?.saleMethod}
                  formik={formik}
                />
                {/* <CustomSlectOption/> */}
              </div>
              <div className="form-group full-width">
                <AddLeadSlect
                  regionData={regionInpt}
                  formik={formik}
                  type={"region"}
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  select
                  id="employee"
                  name="employee"
                  label="NUMBER OF EMPLOYEES"
                  placeholder="Select Employees"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.employee}
                  error={
                    formik.touched.employee && Boolean(formik.errors.employee)
                  }
                  helperText={formik.touched.employee && formik.errors.employee}
                >
                  <MenuItem
                    value=""
                    selected={!formik.values.employee}
                    disabled={formik.values.employee}
                  >
                    Select Employees
                  </MenuItem>
                  {!!NumberEmployeeData?.length &&
                    NumberEmployeeData?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
              <div className="form-group full-width">
                <TextField
                  id="currentBrand"
                  name="currentBrand"
                  //   label="City"
                  placeholder="What Brands Are You Working currently with?"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.currentBrand}
                  error={
                    formik.touched.currentBrand &&
                    Boolean(formik.errors.currentBrand)
                  }
                  helperText={
                    formik.touched.currentBrand && formik.errors.currentBrand
                  }
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  name="source"
                  id="source"
                  label="Source"
                  type="text"
                  variant="outlined"
                  // onChange={formik.handleChange}
                  value={formik.values.source}
                  error={
                    // toast.error(formik.errors.firstName) &&
                    formik.touched.source && formik.errors.source
                  }
                  helperText={
                    // toast.error(formik.touched.firstName && formik.errors.firstName) &&
                    formik.touched.source && formik.errors.source
                  }
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  name="supplierName"
                  id="supplierName"
                  label="Supplier Name"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.supplierName}
                  error={
                    // toast.error(formik.errors.firstName) &&
                    formik.touched.supplierName && formik.errors.supplierName
                  }
                  helperText={
                    // toast.error(formik.touched.firstName && formik.errors.firstName) &&
                    formik.touched.supplierName && formik.errors.supplierName
                  }
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  id="facebook"
                  name="facebook"
                  //   label="City"
                  type="text"
                  placeholder="Facebook URL"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.facebook}
                  error={
                    formik.touched.facebook && Boolean(formik.errors.facebook)
                  }
                  helperText={formik.touched.facebook && formik.errors.facebook}
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  id="instagram"
                  name="instagram"
                  //   label="City"
                  placeholder="Instagram URL"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.instagram}
                  error={
                    formik.touched.instagram && Boolean(formik.errors.instagram)
                  }
                  helperText={
                    formik.touched.instagram && formik.errors.instagram
                  }
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  id="linkedin"
                  name="linkedin"
                  //   label="City"
                  placeholder="LinkedIn URL"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.linkedin}
                  error={
                    formik.touched.linkedin && Boolean(formik.errors.linkedin)
                  }
                  helperText={formik.touched.linkedIn && formik.errors.linkedin}
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  id="otherSocial"
                  name="otherSocial"
                  //   label="City"
                  placeholder="Company Website URL"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.otherSocial}
                  error={
                    formik.touched.otherSocial &&
                    Boolean(formik.errors.otherSocial)
                  }
                  helperText={
                    formik.touched.otherSocial && formik.errors.otherSocial
                  }
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  id="otherNotes"
                  name="otherNotes"
                  placeholder="Other Notes"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.otherNotes}
                  error={
                    formik.touched.otherNotes &&
                    Boolean(formik.errors.otherNotes)
                  }
                  helperText={
                    formik.touched.otherNotes && formik.errors.otherNotes
                  }
                />
              </div>
            </div>
            {/* <div className="customer-brand-wrapper">
              <div className="brand-heading">
                <div className="brand-title">Brands</div>
                <Button
                  color="primary"
                  className="primary-border-btn"
                  onClick={() => handleBrandAccessOpen()}
                >
                  brand access
                </Button>
              </div>
              <List>
                {state?.brands?.brandsData.map(
                  (brand) =>
                    formik?.values?.brand_ids?.includes(brand.id) && (
                      <ListItem key={brand.id}>
                        <div className="list-inner brand-img-list">
                          <img
                            src={brand.image ? brand.image : NoImage}
                            alt={brand.name}
                          />
                        </div>
                      </ListItem>
                    )
                )}
              </List>
            </div> */}
          </div>
          <div className="bottom-btn-wrapper">
            {/* <Button
              color="primary"
              className="primary-border-btn"
              onClick={handleInvite}
            >
              invite
            </Button> */}
            <Button
              color="primary"
              className="primary-btn"
              type="submit"
              onClick={formik.handleSubmit}
            >
              save
            </Button>
          </div>
          {/* <BrandAccess
            brands={state?.brands?.brandsData}
            selectedBrands={selectedBrands}
            open={openBrandAccess}
            handleClose={handleBrandAccessClose}
            formik={formik}
            handleChange={handleBrandAccessChange}
            handleSubmit={handleBrandAccessSubmit}
            categories={state?.brands?.categoriesData}
            categoryName={categoryName}
            handleCategoryChange={handleCategoryChange}
          /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CustomerLead;
