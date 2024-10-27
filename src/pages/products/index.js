import React, { useState, useEffect } from "react";
import Header from "@components/header";
import Footer from "@components/footer";
import ProductFilterSidebar from "@components/product-filter-sidebar";
import { productStyle } from "./style";
import {
  Typography,
  List,
  Card,
  CardContent,
  ListItem,
  Button,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import filterIcon from "@assets/images/filter.svg";
import NoImage from "@assets/images/no-image.jpg";
import callIcon from "@assets/images/phone-call.svg";
import mailIcon from "@assets/images/email.svg";
import { setImageArray, getUserName, getRole } from "@utils/commonFunctions";
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_CATEGORIES,
  FETCH_PRODUCT_CATEGORIES_SUCCESS,
  FETCH_PRODUCT_CATEGORIES_FAILURE,
  GET_CONTACT_DETAILS,
  GET_CONTACT_DETAILS_SUCCESS,
  GET_CONTACT_DETAILS_FAILURE,
  FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
  CREATE_SAMPLE_REQUEST,
  CREATE_SAMPLE_REQUEST_SUCCESS,
  CREATE_SAMPLE_REQUEST_FAILURE,
} from "@utils/actionType";
import { useStore } from "@store/store";
import API from "@services/axios";
import Loader from "@components/loader";
import CustomPagination from "@components/pagination";
import { toast } from "react-toastify";
import SampleRequestPopup from "./SampleRequestPopup";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { useFormik } from "formik";
import SuccessPopup from "@components/success-popup";
import ShareBrandPopup from "./ShareBrandPopup";

function Products() {
  const classes = productStyle();

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [state, dispatch] = useStore();
  const [contact, setContact] = useState({});
  const [brand, setBrand] = useState();
  const [openConfirmPopup, setConfirmPopup] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countFilter, setCountFilter] = useState(0);
  const [pageFilter, setPageFilter] = useState(1);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [initialValues, setInitialValues] = useState(schema.addSampleSchema);

  const handleChangePage = (event, newPage) => {
    selectedCategory.length ? setPageFilter(newPage) : setPage(newPage);
    window.scrollTo(0, 0);
  };

  const { id } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validationSchema.addSampleValidationSchema,
    onSubmit: (value) => {
      handleSampleRequest(value);
    },
  });

  const checkViewingBrand = () => {
    API.get(`/brand/viewing-brand/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          window.open(brand?.catalogue_form);
        } else {
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        console.log("Error occured in checkViewingBrand", error);
      });
  };

  const handleSampleRequest = (data) => {
    if (!!data) {
      const value = {
        // product_id: parseInt(id),
        supplier_id: id,
        ...data,
      };
      dispatch({ type: CREATE_SAMPLE_REQUEST });
      API.post("sample_management/submit-sample", value).then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: CREATE_SAMPLE_REQUEST_SUCCESS,
          });
          setOpenSuccess(true);
          formik.handleReset();
        } else {
          dispatch({ type: CREATE_SAMPLE_REQUEST_FAILURE });
          toast.error(response.data.errorMessage);
        }
      });
    }
    closeConfirmPopup();
  };

  const getProducts = () => {
    dispatch({ type: FETCH_PRODUCTS });
    API.get(`product/get-product-list-by-supplier/${id}?page=${page}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: response.data.data,
          });
          setCount(response?.data?.totalPageCount);
        } else {
          dispatch({
            type: FETCH_PRODUCTS_FAILURE,
            payload: response.data.data,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error });
      });
  };

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

  const getContatDetails = () => {
    dispatch({ type: GET_CONTACT_DETAILS });
    API.get(`contact`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: GET_CONTACT_DETAILS_SUCCESS,
            payload: response.data.data,
          });
          setContact(response.data.data);
        } else {
          dispatch({
            type: GET_CONTACT_DETAILS_FAILURE,
            payload: response.data.data,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_CONTACT_DETAILS_FAILURE,
          payload: error.response.data,
        });
        toast.error(error.errorMessage);
      });
  };

  const getBrands = () => {
    dispatch({ type: FETCH_BRANDS });
    API.get(`/brand/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_BRANDS_SUCCESS,
            payload: response.data.data,
          });
          setBrand(response.data.data);
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
    getProducts();
    getCategories();
    getRole() === "client" && getContatDetails();
    getBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);

  useEffect(() => {
    selectedCategory.length >= 1 && handleProductFilter();

    selectedCategory.length === 0 && getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageFilter]);

  useEffect(() => {
    setPageFilter(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countFilter]);

  const getProductsByCategory = (data) => {
    dispatch({ type: FETCH_PRODUCTS });
    API.post(`product/filter-products/${id}?page=${pageFilter}`, {
      category_id: data,
    })
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: response.data.data,
          });
          setCountFilter(response?.data?.totalPageCount);
        } else {
          dispatch({
            type: FETCH_PRODUCTS_FAILURE,
            payload: response.data.data,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error });
      });
  };

  const filterSidebar = (event) => {
    event.preventDefault();
    document.querySelector("body").classList.add("sidebar-open");
    document.querySelector("html").classList.add("sidebar-open");
  };

  const handleProductFilter = (id) => {
    let value = [...selectedCategory, id];
    if (selectedCategory.includes(id)) {
      value = value.filter((f) => f !== id);
    }
    setSelectedCategory(value);
    value.length ? getProductsByCategory(value) : getProducts();
  };

  const handleOpenConfirmPopup = () => {
    setConfirmPopup(true);
    const { street_address, city, postal_code, country } =
      state?.login?.user?.user;

    setInitialValues({
      ...initialValues,
      address: street_address,
      city,
      postal_code,
      country,
    });
  };

  const closeConfirmPopup = () => {
    setConfirmPopup(false);
    formik.handleReset();
  };

  return (
    <div className={classes.productWrapper}>
      <Header />
      <Loader
        loading={
          state?.products?.loadingCategories ||
          state?.products?.loadingProducts ||
          state?.profile?.gettingContactDetails ||
          state?.brands?.loadingBrands ||
          state?.quotes?.sampleRequesting
        }
      />
      <div className="product-page-wrapper">
        <div className="container">
          <div className="product-title-wrapper">
            <div className="product-title-inner">
              <Card className="upload-image">
                <img
                  className="user-image"
                  src={brand?.image || NoImage}
                  alt="profile img"
                />
              </Card>
            </div>
            <div className="btn-wrapper">
              {getRole() === "client" && (
                <Button
                  color="primary"
                  className="primary-border-btn"
                  onClick={handleOpenConfirmPopup}
                >
                  Get Sample Box
                </Button>
              )}
              {getRole() === "staff" && brand?.catalogue_form && (
                <Button
                  color="primary"
                  className="primary-border-btn"
                  onClick={() => setOpenShare(true)}
                >
                  Share Brand Deck
                </Button>
              )}
              {brand?.catalogue_form && (
                <Button
                  color="primary"
                  className="primary-border-btn"
                  onClick={checkViewingBrand}
                >
                  View Brand Deck
                </Button>
              )}
            </div>
          </div>
          <div className="product-list-outer has-three-column">
            <div className="mobile-sidebar-title" onClick={filterSidebar}>
              <em>
                <img src={filterIcon} alt="filter-icon" />
              </em>{" "}
              Filter by Category
            </div>
            <div className="product-sidebar">
              <ProductFilterSidebar
                handleProductFilter={handleProductFilter}
                categories={state?.products?.categoriesData}
              />
            </div>
            <div className="product-list">
              {!state?.products?.productsData?.length && (
                <p className="no-data">No products available</p>
              )}
              <List className="brand-list-ul">
                {state?.products?.productsData?.map((product) => (
                  <ListItem className="brand-list-item" key={product.id}>
                    <Link
                      to={`/product-detail/${product.id}`}
                      title={product.name}
                    >
                      <Card className="logo-wrapper white-box">
                        <CardContent>
                          <img
                            src={
                              setImageArray(
                                product.image,
                                product.products_gallery
                              )[0]
                            }
                            alt={product.name}
                          />
                        </CardContent>
                      </Card>
                      <Typography variant="h3">{product.name}</Typography>
                    </Link>
                  </ListItem>
                ))}
              </List>
              {!!state?.products?.productsData?.length && (
                <CustomPagination
                  count={selectedCategory.length ? countFilter : count}
                  page={selectedCategory.length ? pageFilter : page}
                  onChange={handleChangePage}
                />
              )}
            </div>
            {getRole() === "client" && (
              <div className="vender-info">
                <Card className="white-box">
                  <CardContent>
                    <div className="sidebar-title">NEED HELP</div>
                    <div className="vendor-content">
                      <img
                        src={contact?.avatar ? contact?.avatar : NoImage}
                        alt="Vendor img"
                      />
                      <span className="vendor-name">
                        {contact?.first_name} {contact?.last_name}
                      </span>
                      <span className="vendor-profile">Staff Member</span>
                      <List>
                        <ListItem className="contact-list-item">
                          <a
                            href={`tel:${contact.phone}`}
                            title="Call us"
                            className="red-circle-icon"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <em>
                              <img src={callIcon} alt="call icon" />
                            </em>
                            {contact.phone}
                          </a>
                        </ListItem>
                        <ListItem className="contact-list-item">
                          <a
                            href={`mailto:${contact.email}`}
                            title="Chat us"
                            className="red-circle-icon"
                            target="_new"
                          >
                            <em>
                              <img src={mailIcon} alt="mail icon" />
                            </em>
                            {contact.email}
                          </a>
                        </ListItem>
                      </List>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
        <SuccessPopup
          open={openSuccess}
          headline={`Thank You ${getUserName().split(" ")[0]}`}
          text="You can expect a response from a team member within 24 hours."
          handleClose={() => setOpenSuccess(false)}
        />
        {getRole() === "staff" && (
          <ShareBrandPopup
            open={openShare}
            handleClose={() => setOpenShare(false)}
            brandId={id}
          />
        )}
        <SampleRequestPopup
          open={openConfirmPopup}
          handleClose={closeConfirmPopup}
          brandName={brand?.name}
          formik={formik}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Products;
