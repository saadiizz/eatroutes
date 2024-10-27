import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Button,
  Typography,
  TextField,
  Avatar,
  List,
  ListItem,
  FormGroup,
  Checkbox,
  ListItemText,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import callIcon from "@assets/images/call.svg";
import speechIcon from "@assets/images/speech-bubble.svg";
import searchIcon from "@assets/images/magnifying-glass.svg";
// import editvariantIcon from "@assets/images/edit-variant.svg";
import Header from "@components/header";
import Footer from "@components/footer";
import API from "@services/axios";
import { useStore } from "@store/store";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import _ from "lodash";
import {
  FETCH_CUSTOMERS,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE,
  FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
  FETCH_BRAND_CATEGORIES,
  FETCH_BRAND_CATEGORIES_SUCCESS,
  FETCH_BRAND_CATEGORIES_FAILURE,
  EDIT_CUSTOMER,
  EDIT_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_FAILURE,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILURE,
} from "@utils/actionType";
import BrandFilterIcon from "@assets/images/brandFilter.svg";
import ViewCustomer from "./view-customer-popup";
import { customerListStyle } from "./style";
import { useDebounce } from "@hooks/useDebounce";
import { countries, AnnualTurnoverData } from "@utils/commonData";
import deleteIcon from "@assets/images/delete.png";
import Loader from "@components/loader";
import { handleColorClass } from "@utils/commonFunctions";
import CustomPagination from "@components/pagination";
import { toast } from "react-toastify";
import ConfirmationPopup from "@components/confirmationPopup";
import { getRole } from "@utils/commonFunctions";
import { userRole } from "@utils/constant";
import EditCustomer from "./edit-customer-popup";
import { customerFilter } from "../brands/brandConstant";
import { useTheme } from "@mui/material/styles";
import ReactSelect from "react-select";

function CustomerList() {
  const theme = useTheme();
  const classes = customerListStyle();
  let navigate = useNavigate();
  const [state, dispatch] = useStore();
  const [customer, setCustomer] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [, setScroll] = useState("paper");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [initialValue, setInitialValue] = useState(schema.customerSchema);
  const [openBrandAccess, setOpenBrandAccess] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [openConfirmPopup, setConfirmPopup] = useState(false);
  const [confirmParams, setConfirmParams] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filterCustomer, setFilterCustomer] = useState(1);
  const [multiTrigger, setMultiTrigger] = useState(0);
  const [filterCustomerText, setFilterCustomerText] = useState("All");
  const [annualTurnover, setAnnualTurnver] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([""]);
  const [regionsData, setRegionsData] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [annualData, setAnnualData] = useState(AnnualTurnoverData);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const filterClient = () => {
    if (search.trimStart() === "") {
      getCustomers();
    } else {
      handleFilterStatus();
    }
  };

  const handleCountryChange = (selectedCountryArray) => {
    setSelectedCountries(selectedCountryArray.map((item) => item.value));
  };

  const handleRegionChange = (selectedCountryArray) => {
    setSelectedRegions(selectedCountryArray.map((item) => item.value));
  };

  useDebounce(() => filterClient(), 1000, search);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const getCustomers = () => {
    dispatch({ type: FETCH_CUSTOMERS });
    API.get(`/client?page=${page}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_CUSTOMERS_SUCCESS,
            payload: response.data.data.data,
          });
          if (!response.data.data.data) {
            setData(response.data.data);
          } else {
            setData(response.data.data.data);
          }
          setCount(response?.data?.totalPageCount);
          if (state?.customers?.customerId) {
            let cust = response.data.data.data.filter(
              (cu) => cu.id === +state?.customers?.customerId
            );
            handleCustomer(...cust);
          }
        } else {
          dispatch({
            type: FETCH_CUSTOMERS_FAILURE,
            payload: response.data.data,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_CUSTOMERS_FAILURE, payload: error });
      });
  };

  function getStyles(accesData, countries, theme) {
    return {
      fontWeight:
        countries.indexOf(accesData) === 0
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleFilterStatus = () => {
    dispatch({ type: FETCH_CUSTOMERS });
    API.post(`client/filter-client?page=${page}`, {
      client_name: search,
    })
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_CUSTOMERS_SUCCESS,
            payload: response.data.data.data,
          });
          setData(response.data.data.data);
          setCount(response?.data?.totalPageCount);
          if (state?.customers?.customerId) {
            let cust = response.data.data.data.filter(
              (cu) => cu.id === +state?.customers?.customerId
            );
            handleCustomer(...cust);
          }
        } else {
          dispatch({ type: FETCH_CUSTOMERS_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: FETCH_CUSTOMERS_FAILURE });
        toast.error("Some thing went wrong");
      });
  };

  useEffect(() => {
    search === "" ? getCustomers() : handleFilterStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleInvite = (id) => {
    API.get(`client/${id}/invite`)
      .then(() => {
        getCustomers();
        handleViewCustomerClose();
        toast.success("Client Invited Successfully");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const editCustomer = (data) => {
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

    dispatch({ type: EDIT_CUSTOMER });
    API.post(`client/${customer.id}`, data)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: EDIT_CUSTOMER_SUCCESS,
            payload: response.data.data,
          });
          getCustomers();
          handleViewCustomerClose();
          handleEditCustomerClose();
          toast.success("Edit customer successfully");
        } else {
          alert("failure");
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
  const handleDeleteCustomer = (id) => {
    dispatch({ type: DELETE_CUSTOMER });
    API.delete(`staff/delete-client/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: DELETE_CUSTOMER_SUCCESS,
          });
          toast.success("Client deleted successfully");
          getCustomers();
        } else {
          dispatch({ type: DELETE_CUSTOMER_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: DELETE_CUSTOMER_FAILURE });
      });
    closeConfirmPopup();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValue,
    validationSchema: validationSchema.editCustomerValidationSchema,
    onSubmit: (value) => {
      value = { ...value, phone: value.phone.replace(/[\s-)(]+/g, "") };
      value?.brand_ids?.length
        ? editCustomer(value)
        : toast.error("At least one brand is required");
    },
  });

  const handleChangeFilter = (event) => {
    const {
      target: { value },
    } = event;

    if (value > 1) {
      setMultiTrigger(value);
    } else {
      setMultiTrigger(0);
    }

    setFilterCustomer(value);

    let customerFilterItem = customerFilter.find((ii) => ii.id == value);

    setFilterCustomerText(customerFilterItem.name);
  };

  const handleViewCustomerClose = () => {
    setCustomer();
    setOpenView(false);
  };
  const handleEditCustomerOpen = (scrollType) => () => {
    setInitialValue({
      userName: customer?.user_name,
      firstName: customer?.first_name,
      lastName: customer?.last_name,
      company: customer?.company,
      roleInCompany: customer?.role_in_company,
      totalEmployees: customer?.no_of_employees,
      streetAddress: customer?.street_address,
      city: customer?.city,
      postalCode: customer?.postal_code,
      country: customer?.country,
      phone: customer?.phone,
      emailAddress: customer?.email,
      primaryMethodOfSale: customer?.primary_method_of_sale,
      regionsToSell: customer?.regions_to_sell,
      annualTurnover: customer?.annual_turnover,
      brandsCurrentlyWorking: customer?.brands_currently_working,
      facebookURL: customer?.facebook_url,
      instagramURL: customer?.instagram_url,
      linkedinURL: customer?.linkedin_url,
      companyWebsiteURL: customer?.other_social_1,
      source: customer?.source,
      supplierName: customer?.supplier_name,
      otherNotes: customer?.other_notes,
      brand_ids: customer?.suppliers?.length
        ? customer?.suppliers?.map((item) => item.id)
        : [],
    });
    setOpenEdit(true);
    setScroll(scrollType);
  };
  const handleEditCustomerClose = () => {
    setOpenEdit(false);
    formik.handleReset();
    setInitialValue(schema.customerSchema);
  };

  const handleCustomer = (cust) => {
    setCustomer(cust);
    setOpenView(true);
  };

  const getInitialBrands = () => {
    const initialBrands = customer?.suppliers?.length
      ? customer?.suppliers?.map((item) => item.id)
      : [];
    setSelectedBrands(initialBrands);
  };
  useEffect(() => {
    getInitialBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);

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

  const populateCountries = () => {
    const populatedCountries = [];

    for (let item of countries) {
      populatedCountries.push({
        value: item.label,
        label: item.label,
      });
    }

    setCountriesData(populatedCountries);
  };

  const populateRegions = () => {
    const populatedRegions = [];

    for (let item of countries) {
      populatedRegions.push({
        value: item.label,
        label: item.label,
      });
    }

    setRegionsData(populatedRegions);
  };

  useEffect(() => {
    getBrands();
    getCategories();
    populateCountries();
    populateRegions();
    setSelectedCountries([]);
    setSelectedRegions([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectedCountries([]);
    setSelectedRegions([]);
  }, [multiTrigger]);

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

  const handleOpenConfirmPopup = (id) => {
    setConfirmPopup(true);
    setConfirmParams({ id });
  };
  const closeConfirmPopup = () => {
    setConfirmPopup(false);
    setConfirmParams(null);
  };

  const getCountries = () => {
    dispatch({ type: FETCH_BRANDS });
    API.get("/countries")
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_BRANDS_SUCCESS,
            payload: response.data.data,
          });

          setCountriesData(response.data.data);
        } else {
          dispatch({ type: FETCH_BRANDS_FAILURE, payload: response.data.data });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_BRANDS_FAILURE, payload: error });
      });
  };

  const getMultiInputLabel = () => {
    if (multiTrigger === 2) {
      return "Select country";
    } else if (multiTrigger === 3) {
      return "Select sale region";
    } else if (multiTrigger === 4) {
      return "Select annual turnover";
    }
  };

  const filterAndSearch = data?.filter((i) => {
    if (filterCustomerText === "All") {
      return i;
    } else if (filterCustomerText === "Country") {
      // const temp = [];

      // for (let item of countries) {
      //   temp.push(pascalCase(item));
      // }

      if (selectedCountries.includes(i?.country)) {
        return i;
      }
    } else if (filterCustomerText === "Sale Region") {
      if (_.intersection(selectedCountries, i?.regions_to_sell).length) {
        return i;
      }
    } else if (filterCustomerText === "Annual Turnover") {
      if (i?.annual_turnover === annualTurnover) {
        return i;
      }
    }
  });

  return (
    <div className={classes.customerListWrapper}>
      <Header />
      <Loader
        loading={
          state?.brands?.loadingBrands ||
          state?.customers?.loadingCustomer ||
          state?.customers?.editingCustomer ||
          state?.customers?.deletingCustomer
        }
      />
      <div className="customer-list-page-wrapper">
        <div className="container">
          <div className="customer-list-heading">
            <Typography variant="h1">Customer List</Typography>
            <div className="customer-search-wrapper">
              <div className="form-wrapper">
                <div className="form-group">
                  <TextField
                    id="search"
                    type="search"
                    variant="outlined"
                    placeholder="SEARCH"
                    value={search}
                    onChange={handleSearch}
                  />
                  <img src={searchIcon} alt="search icon" />
                </div>
              </div>
              {!(getRole() === userRole.crm) && (
                <Button
                  color="primary"
                  className="primary-btn"
                  onClick={() => navigate("/add-new-customer")}
                >
                  Add New Customer
                </Button>
              )}
            </div>
          </div>
          {getRole() !== userRole.crm ? (
            <FormControl
              sx={{
                m: 1,
                // width: 219,
                "@media(max-width:500px)": {
                  width: "auto",
                },
              }}
            >
              <Select
                id="demo-multiple-checkbox"
                displayEmpty
                value={filterCustomer}
                onChange={handleChangeFilter}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => {
                  return (
                    <span className="filter-icon">
                      <img src={BrandFilterIcon} alt="filter icon" />
                      <label htmlFor="Filter Brands">
                        {filterCustomerText
                          ? filterCustomerText
                          : "Filter Customer"}
                      </label>
                    </span>
                  );
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                {customerFilter?.map((category) => (
                  <MenuItem
                    key={category.id}
                    value={category.id}
                    className="category-checkbox"
                  >
                    <FormGroup
                      aria-label="position"
                      className="custom-checkbox"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={category.id == filterCustomer}
                            icon={<span className="normal-check"></span>}
                            checkedIcon={<span className="active-check"></span>}
                          />
                        }
                        label=""
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
          {multiTrigger === 2 ? (
            <div style={{ marginBottom: 10 }}>
              <FormControl sx={{ width: "100%" }}>
                {/* <InputLabel id="demo-multiple-name-label">
                  {getMultiInputLabel()}
                </InputLabel> */}

                <ReactSelect
                  // defaultValue={getMultiInputLabel()}
                  placeholder={"Select country"}
                  isMulti
                  isSearchable
                  name="colors"
                  options={countriesData}
                  onChange={handleCountryChange}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 10,
                    colors: {
                      ...theme.colors,
                      neutral80: "white",
                      neutral10: "#BF1E2E",
                      primary: "#BF1E2E",
                    },
                  })}
                />

                {/* <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  // native
                  value={selectedCountries}
                  onChange={handleCountryChange}
                  //   placeholder='Primary method of sale'
                  input={
                    <OutlinedInput label="In which regions do they sell?" />
                  }
                  MenuProps={MenuProps}
                >
                  {countriesData?.map((item, ind) => (
                    <MenuItem
                      key={ind}
                      value={item?.name}
                      style={getStyles(item?.name, selectedCountries, theme)}
                    >
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select> */}
              </FormControl>
            </div>
          ) : null}

          {multiTrigger === 3 ? (
            <div style={{ marginBottom: 10 }}>
              <FormControl sx={{ width: "100%" }}>
                <ReactSelect
                  placeholder={"Select sale region"}
                  isMulti
                  isSearchable
                  name="colors"
                  options={regionsData}
                  onChange={handleRegionChange}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 10,
                    colors: {
                      ...theme.colors,
                      neutral80: "white",
                      neutral10: "#BF1E2E",
                      primary: "#BF1E2E",
                    },
                  })}
                />
              </FormControl>
            </div>
          ) : null}

          {multiTrigger === 4 ? (
            <div style={{ marginBottom: 10 }}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  select
                  id="annualTurnover"
                  name="annualTurnover"
                  label="Select annual turnover (USD equivalent)"
                  type="text"
                  placeholder="Select Annual Turnover"
                  variant="outlined"
                  onChange={(e) => setAnnualTurnver(e.target.value)}
                  value={annualTurnover}
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
              </FormControl>
            </div>
          ) : null}
          <div className="white-box customer-list-box">
            {filterAndSearch?.length ? (
              filterAndSearch?.map((customer, index) => (
                <div
                  className={`customer-list-row ${handleColorClass(index + 1)}`}
                  key={customer.id}
                >
                  <div
                    className="left-column"
                    onClick={() => handleCustomer(customer)}
                  >
                    {customer?.avatar ? (
                      <Avatar
                        className="short-name"
                        alt={customer?.avatar}
                        src={customer?.avatar}
                      />
                    ) : (
                      <Avatar className="short-name">
                        {customer.first_name ? customer.first_name[0] : null}
                        {customer.last_name ? customer.last_name[0] : null}
                      </Avatar>
                    )}
                    <div className="customer-detail">
                      <span className="customer-name">
                        {customer.first_name} {customer.last_name}
                      </span>
                      <Link to="" title="Mail us">
                        {customer.email}
                      </Link>
                      {/* <a
                          href={`mailto:${customer?.email}`}
                          title="Chat us"
                          target="_new"
                        >
                          {customer?.email}
                        </a> */}
                    </div>
                  </div>
                  <div className="right-column">
                    <List className="contact-list-wrapper">
                      <ListItem>
                        <a
                          href={`tel:${customer?.phone}`}
                          title="Call us"
                          className="red-circle-icon"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={callIcon} alt="call icon" />
                        </a>
                      </ListItem>
                      <ListItem>
                        <a
                          href={`mailto:${customer?.email}`}
                          title="Chat us"
                          className="red-circle-icon"
                          target="_new"
                        >
                          <img src={speechIcon} alt="speech icon" />
                        </a>
                      </ListItem>
                      {/* <ListItem>
                        <Link
                          to=""
                          title="Delete user"
                          onClick={() => handleOpenConfirmPopup(customer.id)}
                        >
                          <img src={deleteIcon} alt="delete icon" />
                        </Link>
                      </ListItem> */}
                    </List>
                  </div>
                </div>
              ))
            ) : (
              <p>No customer found</p>
            )}

            <ViewCustomer
              customer={customer && customer}
              handleInvite={handleInvite}
              handleEditCustomerOpen={handleEditCustomerOpen("body")}
              handleEditCustomerClose={handleEditCustomerClose}
              openEdit={openEdit}
              openView={openView}
              handleViewCustomerClose={() => handleViewCustomerClose()}
              formik={formik}
              brands={state?.brands?.brandsData}
              selectedBrands={selectedBrands}
              openBrandAccess={openBrandAccess}
              handleBrandAccessOpen={handleBrandAccessOpen}
              handleBrandAccessClose={handleBrandAccessClose}
              handleBrandAccessChange={handleBrandAccessChange}
              handleBrandAccessSubmit={handleBrandAccessSubmit}
              categories={state?.brands?.categoriesData}
              categoryName={categoryName}
              handleCategoryChange={handleCategoryChange}
              customDetail={true}
              isLead={false}
            />
            <EditCustomer
              customer={customer && customer}
              open={openEdit}
              handleClose={handleEditCustomerClose}
              formik={formik}
              brands={state?.brands?.brandsData}
              selectedBrands={selectedBrands}
              openBrandAccess={openBrandAccess}
              handleBrandAccessOpen={handleBrandAccessOpen}
              handleBrandAccessClose={handleBrandAccessClose}
              handleBrandAccessChange={handleBrandAccessChange}
              handleBrandAccessSubmit={handleBrandAccessSubmit}
              categories={state?.brands?.categoriesData}
              categoryName={categoryName}
              handleCategoryChange={handleCategoryChange}
            />
          </div>
          {!!data?.length && (
            <CustomPagination
              count={count}
              page={page}
              onChange={handleChangePage}
            />
          )}
        </div>
        <ConfirmationPopup
          open={openConfirmPopup}
          handleClose={closeConfirmPopup}
          handleConfirm={() => handleDeleteCustomer(confirmParams?.id)}
          confirmText={"Are you sure to delete client?"}
        />
      </div>
      <Footer />
    </div>
  );
}

export default CustomerList;
