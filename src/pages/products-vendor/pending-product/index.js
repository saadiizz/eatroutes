import React, { useState, useEffect } from "react";
import Header from "@components/header";
import Footer from "@components/footer";
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
import { Link } from "react-router-dom";
import { setImageArray } from "@utils/commonFunctions";
import editIcon from "@assets/images/edit.png";
import {
  FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  APPROVE_REJECT_QUOTE_SAMPLE,
  APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS,
  APPROVE_REJECT_QUOTE_SAMPLE_FAILURE,
} from "@utils/actionType";
import { useStore } from "@store/store";
import ConfirmationPopup from "@components/confirmationPopup";
import API from "@services/axios";
import Loader from "@components/loader";
import CustomPagination from "@components/pagination";
import { userRole } from "@utils/constant";
import { getRole } from "@utils/commonFunctions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import searchIcon from "@assets/images/magnifying-glass.svg";
import { useDebounce } from "@hooks/useDebounce";
import ProductHistoryPopup from "../../../components/popup/product-history-popup";

function PendingProductsVendor() {
  const classes = productStyle();
  const [state, dispatch] = useStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [confirmRejectParams, setConfirmRejectParams] = useState(null);
  const [openConfirmRejectPopup, setConfirmRejectPopup] = useState(false);
  const [page, setPage] = useState(1);
  //const [product,setProduct]=useState();
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [brands, setBrands] = useState(null);
  const [product, setProduct] = useState();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };
  const [brandName, setBrandName] = useState({ id: "", name: "Select Brands" });
  const navigate = useNavigate();

  const handleProductData = (ind) => {
    setProduct(ind);
    setOpenView(true);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApproveRejectRequest = (id, status) => {
    const isActive = status === "reject" ? "3" : "1";
    dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE });
    API.post(`/product/update-product-details/${id}`, { is_active: isActive })
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS,
          });
          toast.success(
            `Product ${
              status === "reject" ? "rejected" : "approved"
            } successfully`
          );
          getProducts();
        } else {
          dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE_FAILURE });
      });
    closeConfirmRejectPopup();
  };

  const filterClient = () => {
    const trimVal = search?.toLowerCase().trimStart();
    const searchData = brands.filter((data) => {
      if (data?.user_supplier?.name.toLowerCase().includes(trimVal)) {
        return true;
      }
      return false;
    });
    search ? setBrands(searchData) : setBrands(state?.brands?.brandsData);
  };

  useDebounce(() => filterClient(), 1000, search);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const getProducts = (supplier) => {
    if (!!supplier) {
      const { id, name } = supplier;
      setBrandName({ id, name });
      handleClose();
    }
    dispatch({ type: FETCH_PRODUCTS });
    API.post(`/product/get-pending-products?page=${page}`, {
      ...(!!supplier ? { brand_id: supplier.id } : {}),
      status: "2",
    })
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

  useEffect(() => {
    getProducts();
    userRole.vrm === getRole() && getBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleOpenConfirmPopup = (id, status) => {
    setConfirmRejectPopup(true);
    setConfirmRejectParams({
      id,
      status,
    });
  };

  const closeConfirmRejectPopup = () => {
    setConfirmRejectPopup(false);
    setConfirmRejectParams(null);
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
              <Typography variant="h1">Pending Products</Typography>
            </div>
            <div className="btn-wrapper">
              <Button
                className="primary-btn primary-border-btn"
                onClick={() => navigate("/products-vendor")}
              >
                Back To Products
              </Button>
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
                    getProducts();
                    setBrandName({ name: "All Brands" });
                    handleClose();
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
                      style={{
                        color:
                          data?.user_supplier?.id === brandName.id
                            ? "#bf1e2e"
                            : "#000",
                      }}
                      onClick={() => getProducts(data.user_supplier)}
                    >
                      {data?.user_supplier?.name}
                    </MenuItem>
                  ))}
              </Menu>
            </div>
          </div>
          <div className="product-list-outer has-three-column">
            <div className="product-list">
              {state?.products?.productsData?.length === 0 && (
                <p className="no-data">No products available</p>
              )}
              <List className="brand-list-ul">
                {state?.products?.productsData?.map((product, index) => (
                  <>
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
                        {/* <Link to="" title="Approve product">
                          <img
                            src={tickIcon}
                            alt="tick"
                            onClick={() =>
                              handleOpenConfirmPopup(product?.id, "active")
                            }
                          />
                        </Link>
                        <Link to="" title="Reject Brand">
                          <img
                            src={rejectIcon}
                            alt="Reject product"
                            onClick={() =>
                              handleOpenConfirmPopup(product?.id, "reject")
                            }
                          />
                        </Link> */}
                        <Link
                          to={`/edit-product/${product.product_id}`}
                          title={product.name}
                          className="edit-product"
                        >
                          <img src={editIcon} alt="Edit product" />
                        </Link>

                        <Link to="" onClick={() => handleProductData(product)}>
                          <p className="compareIcon">&#128472;</p>{" "}
                        </Link>
                      </div>
                    </ListItem>
                  </>
                ))}
              </List>
              {product && (
                <ProductHistoryPopup
                  openView={openView}
                  product={product && product}
                  closeProductView={() => setOpenView(false)}
                  role="VRM"
                  handleOpenConfirmPopup={handleOpenConfirmPopup}
                />
              )}
              {!!state?.products?.productsData?.length && (
                <CustomPagination
                  count={count}
                  page={page}
                  onChange={handleChangePage}
                />
              )}
            </div>
          </div>

          {/* <ViewProduct
            openView={openView}
            product={product && product}
            closeProductView={() => closeProductView()}
          /> */}
        </div>

        <ConfirmationPopup
          open={openConfirmRejectPopup}
          handleClose={closeConfirmRejectPopup}
          handleConfirm={() =>
            handleApproveRejectRequest(
              confirmRejectParams?.id,
              confirmRejectParams?.status
            )
          }
          confirmText={`Are you sure to ${confirmRejectParams?.status} product?`}
        />
      </div>
      <Footer />
    </div>
  );
}

export default PendingProductsVendor;
