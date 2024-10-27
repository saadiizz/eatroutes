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
} from "@mui/material";
import callIcon from "@assets/images/call.svg";
import speechIcon from "@assets/images/speech-bubble.svg";
import searchIcon from "@assets/images/magnifying-glass.svg";
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
import { StaffListStyle } from "./style";
import { useDebounce } from "@hooks/useDebounce";
import { countries } from "@utils/commonData";
// import deleteIcon from "@assets/images/delete.png";
import Loader from "@components/loader";
import { handleColorClass } from "@utils/commonFunctions";
import CustomPagination from "@components/pagination";
import { toast } from "react-toastify";
import ConfirmationPopup from "@components/confirmationPopup";
import { getRole } from "@utils/commonFunctions";
import { userRole } from "@utils/constant";
import ViewCustomer from "../customer-list/view-customer-popup";

function StaffList() {
  const classes = StaffListStyle();
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };
  // useDebounce(() => filterClient(), 1000, search);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    // setChangeTxt(search)
  };

  const getStaff = () => {
    dispatch({ type: FETCH_CUSTOMERS });
    API.get(`/staff?page=${page}`)
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
          setCount(response?.data?.data?.last_page);
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

  useEffect(() => {
    getStaff();
    // search === "" ? getCustomers() : handleFilterStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValue,
    validationSchema: validationSchema.editCustomerValidationSchema,
    onSubmit: (value) => {
      // value = { ...value, phone: value.phone.replace(/[\s-)(]+/g, "") };
      // value?.brand_ids?.length
      //   ? editCustomer(value)
      //   : toast.error("At least one brand is required");
    },
  });

  const handleViewCustomerClose = () => {
    setCustomer();
    setOpenView(false);
  };
  const handleEditCustomerOpen = (scrollType) => () => {
    setInitialValue({
      firstName: customer?.first_name,
      lastName: customer?.last_name,
      company: customer?.company,
      streetAddress: customer?.street_address,
      city: customer?.city,
      postalCode: customer?.postal_code,
      country:
        customer?.country &&
        countries.find((c) => c.label === customer?.country).code,
      phone: customer?.phone,
      emailAddress: customer?.email,
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

  useEffect(() => {
    // getBrands();
    // getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // value.length ? getBrandsByCategory(value) : getBrands();
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

  const filterAndSearch = data?.filter(
    (item) =>
      item?.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      (item?.first_name + " " + item?.last_name)
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase())
  );

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
            <Typography variant="h1">Staff List</Typography>
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
                        {customer.first_name[0][0]}
                        {customer.last_name[0][0]}
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
              <p>No Staff found</p>
            )}
            <ViewCustomer
              customer={customer && customer}
              // handleInvite={handleInvite}
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
              staffLabel={"View Staff"}
            />
            {/* <ViewCustomer
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
            /> */}
          </div>
          {!!data?.length && (
            <CustomPagination
              count={count}
              page={page}
              onChange={handleChangePage}
            />
          )}
        </div>
        {/* <ConfirmationPopup
          open={openConfirmPopup}
          handleClose={closeConfirmPopup}
          handleConfirm={() => handleDeleteCustomer(confirmParams?.id)}
          confirmText={"Are you sure to delete client?"}
        /> */}
      </div>
      <Footer />
    </div>
  );
}

export default StaffList;
