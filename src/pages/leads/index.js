import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  List,
  ListItem,
  Card,
  CardContent,
  Avatar,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
  ListItemText,
  Select,
  Checkbox,
  OutlinedInput,
  Button,
  Typography,
  TextField,
  IconButton,
  InputLabel,
} from "@mui/material";
import callIcon from "@assets/images/call.svg";
import speechIcon from "@assets/images/speech-bubble.svg";
import searchIcon from "@assets/images/magnifying-glass.svg";
import editVariationIcon from "@assets/images/edit-variation.png";
import Header from "@components/header";
import Footer from "@components/footer";
import API from "@services/axios";
import { useStore } from "@store/store";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
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
// import ViewCustomer from "./view-customer-popup";
import { LeadListStyle } from "./style";
import { useDebounce } from "@hooks/useDebounce";
import deleteIcon from "@assets/images/delete.png";
import Loader from "@components/loader";
import { handleColorClass } from "@utils/commonFunctions";
import { AnnualTurnoverData } from "../../utils/commonData";
import CustomPagination from "@components/pagination";
import { toast } from "react-toastify";
import ConfirmationPopup from "@components/confirmationPopup";
import { getRole } from "@utils/commonFunctions";
import { userRole } from "@utils/constant";
import ViewLead from "./ViewLead";
import ViewCustomer from "../customer-list/view-customer-popup";
import { leadFilter } from "../brands/brandConstant";
import BrandFilterIcon from "@assets/images/brandFilter.svg";
import { useTheme } from "@mui/material/styles";
import _ from "lodash";
import { pascalCase } from "pascal-case";
import { countries } from "@utils/commonData";
import ReactSelect from "react-select";

function LeadList() {
  const theme = useTheme();
  const classes = LeadListStyle();
  let navigate = useNavigate();
  const id = useParams();
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
  const [filterLead, setFilterLead] = useState(3);
  const [changeLeadText, setChangeLeadText] = useState("All Leads");
  const [multiTrigger, setMultiTrigger] = useState(0);
  const [count, setCount] = useState(0);
  const [countriesData, setCountriesData] = useState([]);
  const [regionsData, setRegionsData] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [annualTurnover, setAnnualTurnver] = useState("");
  const [annualData, setAnnualData] = useState(AnnualTurnoverData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const handleCountryChange = (selectedCountryArray) => {
    setSelectedCountries(selectedCountryArray.map((item) => item.value));
  };

  const handleRegionChange = (selectedCountryArray) => {
    setSelectedRegions(selectedCountryArray.map((item) => item.value));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const getAllLeads = () => {
    dispatch({ type: FETCH_CUSTOMERS });
    API.get(`/leads?page=${page}&limit=100`)
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

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const getSearchedLeads = () => {
    setTimeout(() => {
      dispatch({ type: FETCH_CUSTOMERS });
      API.get(`/leads?limit=100&search=${search}`)
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
    }, 1000);
  };

  const handleChangeLead = (event) => {
    const {
      target: { value },
    } = event;

    if (value > 3) {
      setMultiTrigger(value);
    } else {
      setMultiTrigger(0);
    }

    setFilterLead(value);
    let leadItem = leadFilter.find((ii) => ii.id == value);

    setChangeLeadText(leadItem.name);
  };

  const handleDeleteLeads = (id) => {
    dispatch({ type: DELETE_CUSTOMER });
    API.delete(`leads/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: DELETE_CUSTOMER_SUCCESS,
          });
          toast.success("Leads deleted successfully");
          getAllLeads();
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
    },
  });

  const handleViewCustomerClose = () => {
    setCustomer();
    setOpenView(false);
  };

  const handleCustomer = (cust) => {
    setCustomer(cust);
    setOpenView(true);
  };

  useEffect(() => {
    getAllLeads();
  }, [page]);

  // const getCountries = () => {
  //   dispatch({ type: FETCH_BRANDS });
  //   API.get("/countries")
  //     .then((response) => {
  //       if (response.data.statusCode === 200) {
  //         dispatch({
  //           type: FETCH_BRANDS_SUCCESS,
  //           payload: response.data.data,
  //         });

  //         setCountriesData(response.data.data);
  //       } else {
  //         dispatch({ type: FETCH_BRANDS_FAILURE, payload: response.data.data });
  //         toast.error(response.data.errorMessage);
  //       }
  //     })
  //     .catch((error) => {
  //       dispatch({ type: FETCH_BRANDS_FAILURE, payload: error });
  //     });
  // };

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
    populateCountries();
    populateRegions();
  }, []);

  useEffect(() => {
    setSelectedCountries([]);
    setSelectedRegions([]);
  }, [multiTrigger]);

  useEffect(() => {
    getSearchedLeads();
  }, [search]);

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

  function getStyles(accesData, countries, theme) {
    return {
      fontWeight:
        countries.indexOf(accesData) === 0
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleOpenConfirmPopup = (id) => {
    setConfirmPopup(true);
    setConfirmParams({ id });
  };
  const closeConfirmPopup = () => {
    setConfirmPopup(false);
    setConfirmParams(null);
  };

  const filterAndSearch = data?.filter((i) => {
    if (changeLeadText === "All Leads") {
      return i;
    } else if (i?.lead_status === changeLeadText) {
      return i;
    } else if (changeLeadText === "Country") {
      // const temp = [];

      // console.log(selectedCountries);

      // for (let item of selectedCountries) {
      //   temp.push(pascalCase(item));
      // }

      if (selectedCountries.includes(i?.country)) {
        return i;
      }
    } else if (changeLeadText === "Sale Region") {
      if (_.intersection(selectedCountries, i?.regions_to_sell).length) {
        return i;
      }
    } else if (changeLeadText === "Annual Turnover") {
      if (i?.annual_turnover === annualTurnover) {
        return i;
      }
    }
    // return changeLeadText === "All Leads"
    //   ? i
    //   : i?.first_name === search
    //   ? i
    //   : i?.lead_status === changeLeadText;
  });
  // .filter(
  //   (item) =>
  //     item?.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
  //     item?.first_name
  //       .toLocaleLowerCase()
  //       .includes(search.toLocaleLowerCase())
  // );
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
            {/* <Typography variant="h1">Lead List</Typography> */}
            {getRole() === userRole.crm ? (
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
                  value={filterLead}
                  onChange={handleChangeLead}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => {
                    return (
                      <span className="filter-icon">
                        <img src={BrandFilterIcon} alt="filter icon" />
                        <label htmlFor="Filter Brands">
                          {changeLeadText ? changeLeadText : "Filter Leads"}
                        </label>
                      </span>
                    );
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {leadFilter?.map((category) => (
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
                              checked={category.id == filterLead}
                              icon={<span className="normal-check"></span>}
                              checkedIcon={
                                <span className="active-check"></span>
                              }
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
              {getRole() === userRole.crm && (
                <Button
                  color="primary"
                  className="primary-btn"
                  onClick={() => navigate("/add-new-lead")}
                >
                  Add New Lead
                </Button>
              )}
            </div>
          </div>
          {multiTrigger === 4 ? (
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
          {multiTrigger === 5 ? (
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

          {multiTrigger === 6 ? (
            <div style={{ marginBottom: 10 }}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  select
                  id="annualRevenue"
                  name="annualRevenue"
                  label="Select annual turnover (USD equivalent)"
                  type="text"
                  placeholder="Select Annual Turnover"
                  variant="outlined"
                  onChange={(e) => setAnnualTurnver(e.target.value)}
                  value={annualTurnover}
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
              </FormControl>
            </div>
          ) : null}
          <div className="white-box customer-list-box">
            {filterAndSearch?.length ? (
              filterAndSearch?.map((customer, index) => (
                <div
                  className={`customer-list-row ${handleColorClass(index + 1)}`}
                  key={customer.id}
                  value={customer.id}
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
                        {customer?.first_name
                          ? customer.first_name[0][0].toUpperCase()
                          : ""}
                        {customer?.last_name
                          ? customer.last_name[0][0].toUpperCase()
                          : ""}
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
                          // href={`tel:${customer?.phone}`}
                          title="Edit Lead"
                          className="red-circle-icon"
                          onClick={() =>
                            navigate("/add-new-lead", { state: { customer } })
                          }
                        >
                          <img src={editVariationIcon} alt="call icon" />
                        </a>
                      </ListItem>
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
                      <ListItem>
                        <Link
                          to=""
                          title="Delete user"
                          onClick={() => handleOpenConfirmPopup(customer.id)}
                        >
                          <img src={deleteIcon} alt="delete icon" />
                        </Link>
                      </ListItem>
                    </List>
                  </div>
                </div>
              ))
            ) : (
              <p>No Leads found</p>
            )}

            <ViewCustomer
              customer={customer && customer}
              // handleInvite={handleInvite}
              // handleEditCustomerOpen={handleEditCustomerOpen("body")}
              // handleEditCustomerClose={handleEditCustomerClose}
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
              // handleCategoryChange={handleCategoryChange}
              leadLabel={"View Lead"}
              isLead={true}
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
          handleConfirm={() => handleDeleteLeads(confirmParams?.id)}
          confirmText={"Are you sure to delete lead?"}
        />
      </div>
      <Footer />
    </div>
  );
}

export default LeadList;
