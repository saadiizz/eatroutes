import React, { useState, useEffect, useContext } from "react";
import Header from "@components/header";
import Footer from "@components/footer";
import ProductFilterSidebar from "@components/product-filter-sidebar";
import { productStyle } from "./style";
import {
  Button,
  Typography,
  List,
  Card,
  CardContent,
  ListItem,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import { BrandContext } from "@context/brand";
import { Link, useNavigate } from "react-router-dom";
import NoImage from "@assets/images/no-image.jpg";
import { setImageArray } from "@utils/commonFunctions";
import filterIcon from "@assets/images/filter.svg";
import callIcon from "@assets/images/phone-call.svg";
import mailIcon from "@assets/images/email.svg";
import editIcon from "@assets/images/edit.png";
import deleteIcon from "@assets/images/delete.png";
import eyeIcon from "@assets/images/red-eye.png";
import {
  FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
  FETCH_PRODUCT_CATEGORIES,
  FETCH_PRODUCT_CATEGORIES_SUCCESS,
  FETCH_PRODUCT_CATEGORIES_FAILURE,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_CSV,
  ADD_CSV_SUCCESS,
  ADD_CSV_FAILURE,
  GET_CONTACT_DETAILS,
  GET_CONTACT_DETAILS_SUCCESS,
  GET_CONTACT_DETAILS_FAILURE,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  FETCH_PRODUCT_DETAILS,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCT_DETAILS_FAILURE,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  SET_PROFILE_IMAGE,
  SET_PROFILE_IMAGE_SUCCESS,
  SET_PROFILE_IMAGE_FAILURE,
} from "@utils/actionType";
import { useStore } from "@store/store";
import API from "@services/axios";
import Loader from "@components/loader";
import CustomPagination from "@components/pagination";
import { userRole } from "@utils/constant";
import { getRole, getUserId } from "@utils/commonFunctions";
import { toast } from "react-toastify";
import ViewProduct from "./view-product-popup";
import ConfirmationPopup from "@components/confirmationPopup";
import searchIcon from "@assets/images/magnifying-glass.svg";
import { useDebounce } from "@hooks/useDebounce";

function ProductsVendor() {
  const classes = productStyle();
  let navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [state, dispatch] = useStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [contact, setContact] = useState({});
  const [openView, setOpenView] = useState(false);
  const [product, setProduct] = useState({});
  const [openConfirmPopup, setConfirmPopup] = useState(false);
  const [confirmParams, setConfirmParams] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filterCount, setFilterCount] = useState(0);
  const [pageFilter, setPageFilter] = useState(1);
  const [search, setSearch] = useState("");
  const [brands, setBrands] = useState(null);
  const handleChangePage = (event, newPage) => {
    selectedCategory.length >= 1 ? setPageFilter(newPage) : setPage(newPage);
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const { brandName, setBrandName } = useContext(BrandContext);
  const [data, setData] = useState({});

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterBrands = () => {
    const trimVal = search?.toLowerCase().trimStart();
    const searchData = brands.filter((data) => {
      if (data?.user_supplier?.name.toLowerCase().includes(trimVal)) {
        return true;
      }
      return false;
    });
    search ? setBrands(searchData) : setBrands(state?.brands?.brandsData);
  };

  useDebounce(() => filterBrands(), 1000, search);
  const handleSearch = (e) => {
    setSearch(e.target.value);
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
            payload: response.data.data,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_PRODUCT_CATEGORIES_FAILURE, payload: error });
      });
  };

  const getProducts = () => {
    dispatch({ type: FETCH_PRODUCTS });
    API.get(`product/all?page=${page}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: response.data.data,
          });
          if (selectedCategory.length) {
            setFilterCount(response?.data?.totalPageCount);
          }
          setCount(response?.data?.totalPageCount);
        } else {
          dispatch({
            type: FETCH_PRODUCTS_FAILURE,
            payload: response.data.erroMessage,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error });
      });
  };

  const getBrands = () => {
    dispatch({ type: FETCH_BRANDS });
    API.get("/brand/allbrands")
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_BRANDS_SUCCESS,
            payload: response.data.data,
          });
          setBrands(response?.data?.data);
        } else {
          dispatch({ type: FETCH_BRANDS_FAILURE, payload: response.data.data });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_BRANDS_FAILURE, payload: error });
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

  const getUser = () => {
    // const url = id ? `user/${id}` : `user/${getUserId()}`;
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
    getCategories();

    if (!selectedCategory.length) {
      !!brandName?.id ? getProductsBySupplier(brandName, 0) : getProducts();
    }
    userRole.brand === getRole() && getContatDetails();
    userRole.brand === getRole() && getUser();
    userRole.vrm === getRole() && getBrands();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, count]);
  useEffect(() => {
    selectedCategory.length >= 1 && handleProductFilter();

    selectedCategory.length === 0 && getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageFilter, brandName?.id]);

  useEffect(() => {
    setPageFilter(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCount]);

  const handleProfileImage = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    dispatch({ type: SET_PROFILE_IMAGE });
    API.post("supplier/update-supplier-logo", formData).then((response) => {
      if (response.data.statusCode === 200) {
        dispatch({
          type: SET_PROFILE_IMAGE_SUCCESS,
          payload: response.data.data,
        });
        setData(response.data.data);
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

  const getProductsByCategory = (data) => {
    const url = brandName?.id
      ? `product/filter-products/${brandName?.id}?page=${pageFilter}`
      : `product/filter-products?page=${pageFilter}`;
    dispatch({ type: FETCH_PRODUCTS });
    API.post(url, { category_id: data })
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: response.data.data,
          });
          setFilterCount(response?.data?.totalPageCount);
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
  const addCsv = (formData) => {
    const url =
      getRole() === userRole?.vrm
        ? brandName?.id
          ? `product/import-products/${brandName?.id}`
          : "product/import-products"
        : "product/import-products";
    dispatch({ type: ADD_CSV });
    API.post(url, formData)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: ADD_CSV_SUCCESS,
          });
          toast.success(`${response.data.successMessage}`);

          userRole.vrm === getRole()
            ? getProductsBySupplier(brandName, 0)
            : getProducts();
        } else {
          dispatch({ type: ADD_CSV_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: ADD_CSV_FAILURE });
        toast.error("Some thing went wrong please try again letter");
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
    value.length
      ? getProductsByCategory(value)
      : brandName?.id
      ? getProductsBySupplier(brandName, 0)
      : getProducts();
  };

  const handleBulkImport = () => {
    document.getElementById("csv").click();
  };
  const handleCsv = (e) => {
    const formData = new FormData();
    formData.append("products_import", e.target.files[0]);

    addCsv(formData);
  };

  const handleDeleteProduct = (id) => {
    dispatch({ type: DELETE_PRODUCT });
    API.delete(`/product/delete-product/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: DELETE_PRODUCT_SUCCESS,
          });
          toast.success("Product deleted successfully");
          getProducts();
          setBrandName({ id: "", name: "Select Brands" });
        } else {
          dispatch({ type: DELETE_PRODUCT_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: DELETE_PRODUCT_FAILURE });
      });
    closeConfirmPopup();
  };
  const getProductDetails = (id) => {
    dispatch({ type: FETCH_PRODUCT_DETAILS });
    API.get(`/product/get-product-detail/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_PRODUCT_DETAILS_SUCCESS,
            payload: response.data.data,
          });
          setProduct(response.data.data);
        } else {
          dispatch({
            type: FETCH_PRODUCT_DETAILS_FAILURE,
            payload: response.data.errorMessage,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_PRODUCT_DETAILS_FAILURE, payload: error });
      });
  };
  const handleProductView = (data) => {
    getProductDetails(data?.id);
    setOpenView(true);
  };
  const closeProductView = () => {
    setProduct({});
    setOpenView(false);
  };

  const getProductsBySupplier = (supplier, flag) => {
    {
      flag === 1 ? setPage(1) : setPage(page);
    }
    const { id, name } = supplier;
    setBrandName({ id, name });
    dispatch({ type: FETCH_PRODUCTS });
    API.get(`product/get-product-list-by-supplier/${id}?page=${page}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: response.data.data,
          });
          {
            flag === 1 && setFilterCount(response?.data?.totalPageCount);
          }
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
    handleClose();
  };

  const handleOpenConfirmPopup = (id) => {
    setConfirmPopup(true);
    setConfirmParams({
      id,
    });
  };
  const closeConfirmPopup = () => {
    setConfirmPopup(false);
    setConfirmParams(null);
  };

  return (
    <div className={classes.productWrapper}>
      <Header />
      <Loader
        loading={
          state?.products?.loadingProductDetails ||
          state?.products?.loadingProducts ||
          state?.brands?.loadingBrands ||
          state?.products?.loadingAddCsv ||
          state?.products?.loadingCategories ||
          state?.profile?.gettingProfile ||
          state?.profile?.addingProfileImage
        }
      />
      <div className="product-page-wrapper">
        <div className="container">
          <div className="product-title-wrapper">
            <div className="product-title-inner">
              {userRole.brand === getRole() && (
                <Card className="upload-image">
                  <img
                    className="user-image"
                    src={data?.user_supplier?.image || NoImage}
                    alt="profile img"
                  />
                  <TextField
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    variant="outlined"
                    placeholder=""
                    onChange={handleProfileImage}
                  />
                  {/* <em>
                    <img src={cameraIcon} alt="camera icon" />
                  </em> */}
                </Card>
              )}
              {userRole.vrm === getRole() && (
                <Typography variant="h1">Manage Your Products</Typography>
              )}
            </div>
            <div className="btn-wrapper">
              <Button
                color="primary"
                className="primary-border-btn"
                onClick={() => navigate("/add-new-product")}
              >
                Add New Product
              </Button>
              {getRole() === userRole.vrm && (
                <Button
                  color="primary"
                  className="primary-border-btn"
                  onClick={() => navigate("/pending-products-vrm")}
                >
                  Pending Product
                </Button>
              )}
              {getRole() === userRole.brand && (
                <>
                  <Button
                    color="primary"
                    className="primary-border-btn"
                    onClick={() => navigate("/pending-products-supplier")}
                  >
                    Pending Products
                  </Button>
                  <Button
                    color="primary"
                    className="primary-border-btn"
                    onClick={() => navigate("/rejected-products-supplier")}
                  >
                    Rejected Products
                  </Button>
                </>
              )}

              <Button
                color="primary"
                className="primary-border-btn"
                onClick={handleBulkImport}
                disabled={getRole() === userRole.vrm ? !brandName?.id : false}
              >
                Bulk Import
              </Button>

              <TextField
                id="csv"
                name="csv"
                label="CSV"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleCsv(e)}
                InputProps={{
                  inputProps: { accept: ".csv , .txt" },
                }}
                onClick={(event) => {
                  event.target.value = null;
                }}
                variant="outlined"
              />

              {userRole.vrm === getRole() && (
                <Button
                  id="select-brand-button"
                  color="primary"
                  className="primary-btn"
                  onClick={handleClick}
                >
                  {brandName.name} <span className="down-arrow"></span>
                </Button>
              )}
              <Menu
                id="select-brand-button"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                className={classes.customMenu}
              >
                <div
                  onKeyDown={(e) => e.stopPropagation()}
                  className="form-wrapper"
                >
                  <div className="form-group">
                    <TextField
                      id="search"
                      type="search"
                      variant="standard"
                      placeholder="Search Brand"
                      value={search}
                      onChange={handleSearch}
                    />
                    <img src={searchIcon} alt="search icon" />
                  </div>
                </div>
                <MenuItem
                  key={0}
                  onClick={() => {
                    setBrandName({ id: null, name: "All Brands" });
                    handleClose();
                    getProducts();
                  }}
                  style={{
                    color:
                      brandName.name === "All Brands" ||
                      brandName.name === "Select Brands"
                        ? "#bf1e2e"
                        : "#838383",
                  }}
                >
                  All Brands
                </MenuItem>
                {!!brands &&
                  brands?.map((data) => (
                    <MenuItem
                      key={data?.id + 1}
                      onClick={() =>
                        getProductsBySupplier(data.user_supplier, 1)
                      }
                    >
                      {data?.user_supplier?.name}
                    </MenuItem>
                  ))}
              </Menu>
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
              {state?.products?.productsData?.length === 0 && (
                <p className="no-data">No products available</p>
              )}
              <List className="brand-list-ul">
                {state?.products?.productsData?.map((product) => (
                  <ListItem className="brand-list-item" key={product.id}>
                    <Link to="" title={product.name}>
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
                    <div className="card-info-links">
                      <Link
                        to={`/edit-product/${product.id}`}
                        title={product.name}
                        className="edit-product"
                      >
                        <img src={editIcon} alt="Edit" />
                      </Link>
                      <Link
                        to=""
                        title="Delete Products"
                        onClick={() =>
                          // handleDeleteProduct(product.id)
                          handleOpenConfirmPopup(product.id)
                        }
                      >
                        <img src={deleteIcon} alt="Delete" />
                      </Link>
                      {/* <Link to="">
                          <img src={tickIcon} alt="tick" />
                        </Link> */}
                      <Link to="" onClick={() => handleProductView(product)}>
                        <img src={eyeIcon} alt="view product" />
                      </Link>
                    </div>
                  </ListItem>
                ))}
              </List>
              {!!state?.products?.productsData?.length && (
                <CustomPagination
                  count={selectedCategory.length >= 1 ? filterCount : count}
                  page={selectedCategory.length >= 1 ? pageFilter : page}
                  onChange={handleChangePage}
                />
              )}
            </div>
            {userRole.brand === getRole() && (
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
                      <span className="vendor-profile">
                        Vendor Relations Manager
                      </span>
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
          <ViewProduct
            openView={openView}
            product={product && product}
            closeProductView={() => closeProductView()}
          />
        </div>
        <ConfirmationPopup
          open={openConfirmPopup}
          handleClose={closeConfirmPopup}
          handleConfirm={() => handleDeleteProduct(confirmParams?.id)}
          confirmText={"Are you sure to delete product?"}
        />
      </div>
      <Footer />
    </div>
  );
}

export default ProductsVendor;
