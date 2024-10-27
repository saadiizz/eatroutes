import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import API from "@services/axios";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import Header from "@components/header";
import Footer from "@components/footer";
import { addnewleadStyle } from "./style";
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
  EDIT_CUSTOMER,
  EDIT_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_FAILURE,
} from "@utils/actionType";
import { countries, leadTopData } from "@utils/commonData";
// import BrandAccess from "../brand-access-popup";
import Loader from "@components/loader";
import { toast } from "react-toastify";
import {
  AnnualTurnoverData,
  NumberEmployeeData,
  PrimarySaleData,
  RatingData,
  sourceData,
} from "../../../utils/commonData";
import AddLeadSlect from "./addLeadSlect";
import CustomerLead from "../customerLead";
import CustomSlectOption from "../../../components/customSlect";
import LeadPopUp from "../../../components/leadPopUp";

function AddNewLead() {
  let shownOnlyOnce = useRef(true);
  let staffType = {
    vetted: "VETTED",
    dead: "DEAD",
    unvetted: "UNVETTED",
  };
  const location = useLocation();
  const classes = addnewleadStyle();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSupplierSelected, setIsSupplierSelected] = useState(false);
  const [countriesData, setCountriesData] = useState([]);
  const [source, setSource] = useState([]);
  const [ratingList, setRatingList] = useState([]);
  const [primaryData, setPrimaryData] = useState([]);
  const [annualData, setAnnualData] = useState([]);
  const [employeesData, setEmployeesData] = useState([]);
  const [leaddata, setLeadData] = useState([]);
  const [showInpt, setShowInpt] = useState("");
  const [customShow, setCustomShow] = useState(false);
  const [regionInpt, setRegionInpt] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("us");
  // const [initialInpt,setInitialInpt]=useState('Unvited')
  const [openCustomerLead, setOpenCustomerLead] = useState(false);
  const [deadinpt, setDeadInpt] = useState(
    location?.state?.customer?.reason_for_dead
      ? location?.state?.customer?.reason_for_dead
      : ""
  );
  const [state, dispatch] = useStore();
  // const [inialRat,setInialRat]=useState('')
  // const [vitedBol, setVitedBol] = useState(0);
  const [openBrandAccess, setOpenBrandAccess] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showInptEror, setShowInptEror] = React.useState(
    location?.state?.customer?.lead_status ?? ""
  );
  // const [categoryName, setCategoryName] = useState([]);
  const [AssignStafData, setAssignStafData] = useState([]);
  const [errorFor, setErrorFor] = useState(false);
  const [stafflist, setStaffList] = useState([]);
  const handleClick = () => setShowPassword(!showPassword);

  useEffect(() => {
    setCountriesData(countries);
    setLeadData(leadTopData);
    setSource(sourceData);
    setRatingList(RatingData);
    setEmployeesData(NumberEmployeeData);
    setPrimaryData(PrimarySaleData);
    setAnnualData(AnnualTurnoverData);
  }, []);

  // API calling to add customer
  const addCustomer = (data, type) => {
    let obj = {
      first_name: data?.firstName,
      email: data?.emailAddress,
      phone: data?.phone,
      rating: data?.rating,
      lead_status: data?.unvitInpt,
      reason_for_dead: data?.deadinpt,
    };

    if (data?.lastName) {
      obj.last_name = data?.lastName;
    }

    if (data?.company) {
      obj.company = data?.company;
    }

    if (data?.streetAddress) {
      obj.street_address = data?.streetAddress;
    }

    if (data?.country) {
      obj.country = data?.country;
    }

    if (data?.city) {
      obj.city = data?.city;
    }

    if (data?.source) {
      obj.source = data?.source;
    }
    if (data?.supplierName) {
      obj.supplier_name = data?.supplierName;
    }

    if (data?.roleInCompany) {
      obj.role_in_company = data?.roleInCompany;
    }

    if (data?.otherNotes) {
      obj.other_notes = data?.otherNotes;
    }

    if (data?.employee) {
      obj.no_of_employees = data?.employee;
    }

    // if (data?.employee) {
    //   obj.no_of_employees = data?.employee;
    // }

    if (data?.facebook) {
      obj.facebook_url = data?.facebook;
    }

    if (data?.instagram) {
      obj.instagram_url = data?.instagram;
    }

    if (data?.linkedin) {
      obj.linkedin_url = data?.linkedin;
    }

    if (data?.otherSocial) {
      obj.other_social_1 = data?.otherSocial;
    }

    if (data?.currentBrand) {
      obj.brands_currently_working = data?.currentBrand;
    }

    if (data?.annualRevenue) {
      obj.annual_turnover = data?.annualRevenue;
    }

    if (data?.postalCode) {
      obj.postal_code = data?.postalCode;
    }

    if (data?.saleMethod) {
      obj.primary_method_of_sale = data?.saleMethod;
    }

    if (data?.regionsSide) {
      obj.regions_to_sell = data?.regionsSide;
    }

    if (deadinpt) {
      obj.reason_for_dead = deadinpt;
    }

    if (location?.state?.customer?.id) {
      dispatch({ type: EDIT_CUSTOMER });
      updateLead(obj, data, type);
    } else {
      dispatch({ type: ADD_CUSTOMER });
      addLead(obj, data, type);
    }
  };

  const addLead = (obj, data, type) => {
    API.post("leads", obj)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: ADD_CUSTOMER_SUCCESS,
            payload: response.data.data,
          });

          data = { ...data, leadId: response.data.data.id };
          // toast.success(response.data.successMessage);
          if (type === staffType.vetted) {
            navigate("/customerLead", { state: data });
          } else {
            navigate("/");
          }
        } else {
          dispatch({ type: ADD_CUSTOMER_FAILURE, payload: response.data.data });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: ADD_CUSTOMER_FAILURE, payload: err });
      });
  };
  const updateLead = (obj, data, type) => {
    console.log("put", obj);
    API.put("leads/" + location?.state?.customer?.id, obj)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: EDIT_CUSTOMER_SUCCESS,
            payload: response.data.data,
          });

          data = { ...data, leadId: response.data.data.id };
          // toast.success(response.data.successMessage);
          if (type === staffType.vetted) {
            navigate("/customerLead", { state: data });
          } else {
            navigate("/");
          }
        } else {
          dispatch({
            type: EDIT_CUSTOMER_FAILURE,
            payload: response.data.data,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: EDIT_CUSTOMER_FAILURE, payload: err });
      });
  };

  const formik = useFormik({
    initialValues: location?.state?.customer
      ? {
          unvitInpt: location?.state?.customer?.lead_status ?? "",
          firstName: location?.state?.customer?.first_name ?? "",
          lastName: location?.state?.customer?.last_name ?? "",
          company: location?.state?.customer?.company ?? "",
          streetAddress: location?.state?.customer?.street_address ?? "",
          city: location?.state?.customer?.city ?? "",
          postalCode: location?.state?.customer?.postal_code ?? "",
          country: location?.state?.customer?.country ?? "",
          phone: location?.state?.customer?.phone ?? "",
          rating: location?.state?.customer?.rating ?? "",
          source: location?.state?.customer?.source ?? "",
          supplier_name: location?.state?.customer?.supplier_name ?? "",
          emailAddress: location?.state?.customer?.email ?? "",
          employee: location?.state?.customer?.no_of_employees ?? "",
          annualRevenue: location?.state?.customer?.annual_turnover ?? "",
          currentBrand:
            location?.state?.customer?.brands_currently_working ?? "",
          facebook: location?.state?.customer?.facebook_url ?? "",
          instagram: location?.state?.customer?.instagram_url ?? "",
          linkedin: location?.state?.customer?.linkedin_url ?? "",
          otherSocial: location?.state?.customer?.other_social_1 ?? "",
          saleMethod: location?.state?.customer?.primary_method_of_sale ?? "",
          regionsSide: location?.state?.customer?.regions_to_sell ?? "",
        }
      : schema.leadSchema,
    validationSchema: validationSchema.addLeadValidationSchema,
    enableReinitialize: true,
    onSubmit: (value, { setSubmitting, setErrors }) => {
      value = { ...value, phone: value.phone.replace(/[\s-)(]+/g, "") };

      let obj = { ...value, ...AssignStafData };

      switch (showInptEror) {
        case staffType.vetted:
          if (!AssignStafData?.id) {
            toast.error("Staff Is Required");
          } else {
            addCustomer(obj, staffType.vetted);
          }
          break;
        case staffType.dead:
          if (!deadinpt) {
            toast.error("Dead Reason is Required");
          } else {
            addCustomer(obj, staffType.dead);
          }
          break;

        default:
          addCustomer(obj, staffType.dead);
          break;
      }
      // (showInptEror==="VETTED") ? :(showInptEror==="DEAD") ? toast.error('Dead Reason is Required'):customShow===false ? addCustomer(value):navigate('/customerLead',{state:obj});
    },
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
  const getStaff = () => {
    // dispatch({ type: FETCH_BRAND_CATEGORIES });
    API.get("/staff")
      .then((response) => {
        if (response.data.statusCode === 200) {
          // dispatch({
          //   type: FETCH_BRAND_CATEGORIES_SUCCESS,
          //   payload: response.data.data,
          // });
          setStaffList(response.data.data?.data);
        } else {
          // dispatch({
          //   type: FETCH_BRAND_CATEGORIES_FAILURE,
          //   payload: response.data.data,
          // });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        // dispatch({ type: FETCH_BRAND_CATEGORIES_FAILURE, payload: error });
      });
  };
  useEffect(() => {
    getStaff();
    getRegions();
  }, []);

  const accessLeadData = (id, data) => {
    if (data === "VETTED") {
      setShowInptEror(data);
    } else if (data === "DEAD") {
      setShowInptEror(data);
    } else {
      setShowInptEror(data);
    }
  };
  const handleInitialRat = (event) => {
    setOpenDrawer(true);
    setCustomShow(true);
  };
  const handleAssingChange = (value) => {
    setOpenDrawer(value);
  };
  const handlestaffAccess = (data) => {
    setAssignStafData(data);
  };
  const handleDeadSide = (eve) => {
    setDeadInpt(eve.target.value);
  };

  return (
    <div className={classes.addnewcustomerWrapper}>
      <Header />
      <Loader
        loading={
          state?.brands?.loadingBrands ||
          state?.customers?.loadingCustomer ||
          state?.customers?.editingCustomer ||
          state?.customers?.deletingCustomer
        }
      />
      <div className="add-new-customer-wrapper">
        <FocusError formik={formik} />
        <div className="container">
          <Typography variant="h1">
            {" "}
            {location?.state ? "Edit Lead" : "Add New Lead"}{" "}
          </Typography>
          <div className="white-box">
            <div className="form-wrapper">
              <div className="form-group full-width">
                <TextField
                  select
                  id="country"
                  name="country"
                  //   label="Country"
                  type="text"
                  variant="outlined"
                  onChange={(e) => {
                    formik.setFieldValue("unvitInpt", e.target.value);
                  }}
                  value={formik.values.unvitInpt}
                  error={
                    formik.touched.unvitInpt && Boolean(formik.errors.unvitInpt)
                  }
                  helperText={
                    formik.touched.unvitInpt && formik.errors.unvitInpt
                  }
                >
                  {!!leaddata?.length &&
                    leaddata?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={item}
                          onClick={() => accessLeadData(index, item)}
                        >
                          {item}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
              {showInptEror === "VETTED" ? (
                <div className="form-group full-width">
                  <div
                    // id="select_staff"
                    // name="select_staff"
                    // label="Assign Staff to Client"
                    variant="outlined"
                  >
                    <TextField
                      // id="select_staff"
                      // name="select_staff"
                      label="Assign Staff to Client *"
                      variant="outlined"
                      value={
                        formik.values?.vitedInpt
                          ? formik.values?.vitedInpt
                          : AssignStafData?.first_name
                      }
                      onClick={(e) => handleInitialRat(e)}
                      error={
                        formik.touched.vitedInpt &&
                        Boolean(formik.errors.vitedInpt)
                      }
                      helperText={
                        formik.touched.vitedInpt && formik.errors.vitedInpt
                      }
                    />
                    <LeadPopUp
                      selectedStaff={AssignStafData?.id}
                      leadToCustomerData={stafflist}
                      setOpenDrawer={setOpenDrawer}
                      handlestaffAccess={(e) => handlestaffAccess(e)}
                      openDrawer={openDrawer}
                      handleCloseDrawer={() => handleAssingChange(false)}
                    />
                  </div>
                </div>
              ) : showInptEror === "DEAD" ? (
                <div className="form-group full-width">
                  <TextField
                    // name="firstName"
                    // id="firstName"
                    label="Reason for Dead *"
                    type="text"
                    variant="outlined"
                    onChange={(e) => handleDeadSide(e)}
                    value={deadinpt}
                    // error={
                    //   formik.touched.firstName && Boolean(formik.errors.firstName)
                    // }
                    // helperText={
                    //   formik.touched.firstName && formik.errors.firstName
                    // }
                  />
                </div>
              ) : (
                ""
              )}
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
                    // toast.error(formik.errors.firstName) &&
                    formik.touched.firstName && formik.errors.firstName
                  }
                  helperText={
                    // toast.error(formik.touched.firstName && formik.errors.firstName) &&
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </div>
              <div className="form-group">
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  error={formik.touched.lastName && formik.errors.lastName}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="roleInCompany"
                  name="roleInCompany"
                  label="Role In Company"
                  type="text"
                  variant="outlined"
                  onChange={(e) =>
                    formik.setFieldValue("roleInCompany", e.target.value)
                  }
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
                  label="Company"
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
                  label="Street Address"
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
                  label="City"
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
                  error={() =>
                    toast.error(formik.touched.phone && formik.errors.phone) &&
                    formik.touched.phone &&
                    Boolean(formik.errors.phone)
                  }
                  helperText={
                    // toast.error(formik.touched.firstName && formik.errors.firstName) &&
                    formik.touched.phone && formik.errors.phone
                  }
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
              <div className="form-group full-width">
                <TextField
                  select
                  id="source"
                  name="source"
                  label="Select Source"
                  type="text"
                  variant="outlined"
                  onChange={(e) => {
                    if (e.target.value === "SUPPLIER") {
                      setIsSupplierSelected(true);
                    } else {
                      setIsSupplierSelected(false);
                    }

                    formik.handleChange(e);
                  }}
                  value={formik.values.source}
                  error={formik.touched.source && Boolean(formik.errors.source)}
                  helperText={formik.touched.source && formik.errors.source}
                >
                  <MenuItem
                    value=""
                    selected={!formik.values.source}
                    disabled={formik.values.source}
                  >
                    Select Source
                  </MenuItem>
                  {!!sourceData?.length &&
                    sourceData?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={item}
                          sx={{ textTransform: "uppercase" }}
                        >
                          {item}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
              {isSupplierSelected ? (
                <div className="form-group full-width">
                  <TextField
                    name="supplierName"
                    id="supplierName"
                    label="Supplier Name"
                    type="text"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.supplier_name}
                    error={
                      // toast.error(formik.errors.firstName) &&
                      formik.touched.supplier_name &&
                      formik.errors.supplier_name
                    }
                    helperText={
                      // toast.error(formik.touched.firstName && formik.errors.firstName) &&
                      formik.touched.supplier_name &&
                      formik.errors.supplier_name
                    }
                  />
                </div>
              ) : null}
              <div className="form-group full-width">
                <TextField
                  select
                  id="rating"
                  name="rating"
                  label="Select Rating *"
                  type="text"
                  variant="outlined"
                  // onChange={(e) =>
                  //   formik.setFieldValue("rating", e.target.value)
                  // }
                  onChange={formik.handleChange}
                  value={formik.values.rating}
                  error={formik.touched.rating && Boolean(formik.errors.rating)}
                  helperText={formik.touched.rating && formik.errors.rating}
                >
                  {!!ratingList?.length &&
                    ratingList?.map((item, index) => {
                      return (
                        <MenuItem
                          key={`rating-${index}`}
                          value={item}
                          sx={{ textTransform: "uppercase" }}
                        >
                          {item}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
              <div className="form-group full-width">
                <AddLeadSlect
                  formik={formik}
                  PrimarySaleData={PrimarySaleData}
                  type={"primary"}
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
                  {!!annualData?.length &&
                    annualData?.map((item, index) => {
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
                  select
                  id="country"
                  name="country"
                  label="NUMBER OF EMPLOYEES"
                  placeholder="Select Employees"
                  type="text"
                  variant="outlined"
                  onChange={(e) =>
                    formik.setFieldValue("employee", e.target.value)
                  }
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
                  {!!employeesData?.length &&
                    employeesData?.map((item, index) => {
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
                  id="city"
                  name="city"
                  //   label="City"
                  placeholder="What Brands Are You Working currently with?"
                  type="text"
                  variant="outlined"
                  onChange={(e) =>
                    formik.setFieldValue("currentBrand", e.target.value)
                  }
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
                  id="city"
                  name="city"
                  //   label="City"
                  type="text"
                  placeholder="Facebook URL"
                  variant="outlined"
                  onChange={(e) =>
                    formik.setFieldValue("facebook", e.target.value)
                  }
                  value={formik.values.facebook}
                  error={
                    formik.touched.facebook && Boolean(formik.errors.facebook)
                  }
                  helperText={formik.touched.facebook && formik.errors.facebook}
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  id="city"
                  name="city"
                  //   label="City"
                  placeholder="Instagram URL"
                  type="text"
                  variant="outlined"
                  onChange={(e) =>
                    formik.setFieldValue("instagram", e.target.value)
                  }
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
                  id="city"
                  name="city"
                  placeholder="LinkedIn URL"
                  type="text"
                  variant="outlined"
                  onChange={(e) =>
                    formik.setFieldValue("linkedin", e.target.value)
                  }
                  value={formik.values.linkedin}
                  error={
                    formik.touched.linkedin && Boolean(formik.errors.linkedin)
                  }
                  helperText={formik.touched.linkedin && formik.errors.linkedin}
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  id="city"
                  name="city"
                  //   label="City"
                  placeholder="Company Website URL"
                  type="text"
                  variant="outlined"
                  onChange={(e) =>
                    formik.setFieldValue("otherSocial", e.target.value)
                  }
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
                  onChange={(e) =>
                    formik.setFieldValue("otherNotes", e.target.value)
                  }
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
          </div>
          <div className="bottom-btn-wrapper">
            <Button
              color="primary"
              className="primary-btn"
              type="submit"
              onClick={() => {
                setErrorFor(!errorFor);
                formik.handleSubmit();
              }}
            >
              save
            </Button>
          </div>
          {openCustomerLead === true ? <CustomerLead leadData={formik} /> : ""}
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

export default AddNewLead;
