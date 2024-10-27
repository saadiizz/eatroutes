import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import API from "@services/axios";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import Header from "@components/header";
import Footer from "@components/footer";
import { addnewcustomerStyle } from "./style";
import MuiPhoneNumber from "material-ui-phone-number";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
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
import { countries, AnnualTurnoverData } from "@utils/commonData";
import BrandAccess from "../brand-access-popup";
import Loader from "@components/loader";
import { toast } from "react-toastify";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import { PrimarySaleData } from "../../../utils/commonData";

function AddNewCustomer() {
  const [state, dispatch] = useStore();
  const theme = useTheme();
  const classes = addnewcustomerStyle();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [countriesData, setCountriesData] = useState([]);
  const [openBrandAccess, setOpenBrandAccess] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [saleMethod, setSaleMethod] = React.useState([]);
  const [region, setRegion] = React.useState([]);
  const [regionData, setRegionData] = React.useState([]);
  const [annualData] = useState(AnnualTurnoverData);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const handleClick = () => setShowPassword(!showPassword);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const getRegions = () => {
    dispatch({ type: FETCH_BRANDS });
    API.get("/countries")
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_BRANDS_SUCCESS,
            payload: response.data.data,
          });

          setRegionData(response.data.data);
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
    getRegions();
  }, []);

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
  }, []);

  // API calling to add customer
  const addCustomer = (data) => {
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

    dispatch({ type: ADD_CUSTOMER });
    API.post("client", data)
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
    initialValues: schema.customerSchema,
    validationSchema: validationSchema.addCustomerValidationSchema,
    onSubmit: (value) => {
      value = {
        ...value,
        phone: value.phone.replace(/[\s-)(]+/g, ""),
        userName:
          value.firstName?.charAt(0).toUpperCase() + "." + value.lastName,
      };
      value?.brand_ids?.length
        ? addCustomer(value)
        : toast.error("At least one brand is required");
    },
  });

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

  useEffect(() => {
    getBrands();
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  function getStyles(accesData, saleMethod, theme) {
    return {
      fontWeight:
        saleMethod?.indexOf(accesData) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handlePrimarySaleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSaleMethod(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    if (formik) {
      formik.setFieldValue(
        "primaryMethodOfSale",
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  const handleRegionChange = (event) => {
    const {
      target: { value },
    } = event;

    setRegion(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    if (formik) {
      formik.setFieldValue(
        "regionsToSell",
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  return (
    <div className={classes.addnewcustomerWrapper}>
      <Header />
      <Loader
        loading={
          state?.brands?.loadingBrands || state?.customers?.addingCustomer
        }
      />
      <div className="add-new-customer-wrapper">
        <div className="container">
          <Typography variant="h1">Add New Customer</Typography>
          <div className="white-box">
            <div className="form-wrapper">
              <div className="form-group">
                <TextField
                  name="firstName"
                  id="firstName"
                  label="First Name"
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
                  label="Last Name"
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
                  label="Role In Company"
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
                  id="totalEmployees"
                  name="totalEmployees"
                  label="Total Employees"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.totalEmployees}
                  error={
                    formik.touched.totalEmployees &&
                    Boolean(formik.errors.totalEmployees)
                  }
                  helperText={
                    formik.touched.totalEmployees &&
                    formik.errors.totalEmployees
                  }
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
                  <MenuItem
                    value=""
                    selected={!formik.values.country}
                    disabled={formik.values.country}
                  >
                    Select Country
                  </MenuItem>
                  {!!countriesData?.length &&
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
                  label="Phone Number"
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
              <div className="form-group">
                <TextField
                  id="emailAddress"
                  name="emailAddress"
                  label="Email Address"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="verifyEmail"
                  name="verifyEmail"
                  label="Verify Email Address"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.verifyEmail}
                  error={
                    formik.touched.verifyEmail &&
                    Boolean(formik.errors.verifyEmail)
                  }
                  helperText={
                    formik.touched.verifyEmail && formik.errors.verifyEmail
                  }
                />
              </div>
              <div className="form-group full-width">
                {PrimarySaleData?.length ? (
                  <div>
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="demo-multiple-name-label">
                        Primary method of sale
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        // native
                        value={saleMethod || []}
                        onChange={handlePrimarySaleChange}
                        //   placeholder='Primary method of sale'
                        input={<OutlinedInput label="Primary method of sale" />}
                        MenuProps={MenuProps}
                      >
                        {PrimarySaleData?.map((name, ind) => (
                          <MenuItem
                            key={ind}
                            value={name}
                            style={getStyles(name, saleMethod, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group full-width">
                {regionData?.length ? (
                  <div>
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="demo-multiple-name-label">
                        In which regions do they sell?
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        // native
                        value={region || []}
                        onChange={handleRegionChange}
                        //   placeholder='Primary method of sale'
                        input={
                          <OutlinedInput label="In which regions do they sell?" />
                        }
                        MenuProps={MenuProps}
                      >
                        {regionData?.map((item, ind) => (
                          <MenuItem
                            key={ind}
                            value={item?.name}
                            style={getStyles(item?.name, region, theme)}
                          >
                            {item?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group full-width">
                <TextField
                  select
                  id="annualTurnover"
                  name="annualTurnover"
                  label="Annual turnover (USD equivalent)"
                  type="text"
                  placeholder="Select Annual Turnover"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.annualTurnover}
                  error={
                    formik.touched.annualTurnover &&
                    Boolean(formik.errors.annualTurnover)
                  }
                  helperText={
                    formik.touched.annualTurnover &&
                    formik.errors.annualTurnover
                  }
                >
                  <MenuItem
                    value=""
                    selected={!formik.values.annualTurnover}
                    disabled={formik.values.annualTurnover}
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
                  id="brandsCurrentlyWorking"
                  name="brandsCurrentlyWorking"
                  label="Brands Currently Working With"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.brandsCurrentlyWorking}
                  error={
                    formik.touched.brandsCurrentlyWorking &&
                    Boolean(formik.errors.brandsCurrentlyWorking)
                  }
                  helperText={
                    formik.touched.brandsCurrentlyWorking &&
                    formik.errors.brandsCurrentlyWorking
                  }
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  id="facebookURL"
                  name="facebookURL"
                  label="Facebook URL"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.facebookURL}
                  error={
                    formik.touched.facebookURL &&
                    Boolean(formik.errors.facebookURL)
                  }
                  helperText={
                    formik.touched.facebookURL && formik.errors.facebookURL
                  }
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  id="instagramURL"
                  name="instagramURL"
                  label="Instagram URL"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.instagramURL}
                  error={
                    formik.touched.instagramURL &&
                    Boolean(formik.errors.instagramURL)
                  }
                  helperText={
                    formik.touched.instagramURL && formik.errors.instagramURL
                  }
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  id="linkedinURL"
                  name="linkedinURL"
                  label="Linkedin URL"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.linkedinURL}
                  error={
                    formik.touched.linkedinURL &&
                    Boolean(formik.errors.linkedinURL)
                  }
                  helperText={
                    formik.touched.linkedinURL && formik.errors.linkedinURL
                  }
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  id="companyWebsiteURL"
                  name="companyWebsiteURL"
                  label="Company Website URL"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.companyWebsiteURL}
                  error={
                    formik.touched.companyWebsiteURL &&
                    Boolean(formik.errors.companyWebsiteURL)
                  }
                  helperText={
                    formik.touched.companyWebsiteURL &&
                    formik.errors.companyWebsiteURL
                  }
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  id="source"
                  name="source"
                  label="Source"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.source}
                  error={formik.touched.source && Boolean(formik.errors.source)}
                  helperText={formik.touched.source && formik.errors.source}
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  id="supplierName"
                  name="supplierName"
                  label="Supplier Name"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.supplierName}
                  error={
                    formik.touched.supplierName &&
                    Boolean(formik.errors.supplierName)
                  }
                  helperText={
                    formik.touched.supplierName && formik.errors.supplierName
                  }
                />
              </div>
              <div className="form-group full-width">
                <TextField
                  id="otherNotes"
                  name="otherNotes"
                  label="Other Notes"
                  type="textArea"
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
                  label="Temporary Password"
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
            </div>
            <div className="customer-brand-wrapper">
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
            </div>
          </div>
          <div className="bottom-btn-wrapper">
            <Button
              color="primary"
              className="primary-border-btn"
              onClick={handleInvite}
            >
              invite
            </Button>
            <Button
              color="primary"
              className="primary-btn"
              type="submit"
              onClick={formik.handleSubmit}
            >
              save
            </Button>
          </div>
          <BrandAccess
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
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddNewCustomer;
