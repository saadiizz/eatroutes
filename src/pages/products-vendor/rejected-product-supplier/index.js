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
} from "@mui/material";
import { Link } from "react-router-dom";
import { setImageArray } from "@utils/commonFunctions";
import ProductHistoryPopup from "../../../components/popup/product-history-popup";

import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "@utils/actionType";
import { useStore } from "@store/store";
import API from "@services/axios";
import Loader from "@components/loader";
import CustomPagination from "@components/pagination";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import eyeIcon from "@assets/images/red-eye.png";
import editIcon from "@assets/images/edit.png";

function RejectedProductsSupplier() {
  const classes = productStyle();
  const [state, dispatch] = useStore();
  const [openView, setOpenView] = useState(false);
  const [product, setProduct] = useState({});
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getRejectedProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getRejectedProducts = () => {
    dispatch({ type: FETCH_PRODUCTS });
    API.post(`/product/get-pending-products?page=${page}`, { status: "3" })
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

  const handleProductView = (data) => {
    setProduct(data);
    setOpenView(true);
  };
  const closeProductView = () => {
    setProduct({});
    setOpenView(false);
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
              <Typography variant="h1">Rejected Products</Typography>
            </div>
            <div className="btn-wrapper">
              <Button
                className="primary-btn primary-border-btn"
                onClick={() => navigate("/products-vendor")}
              >
                Back To Products
              </Button>
            </div>
          </div>
          <div className="product-list-outer has-three-column">
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
                      <Link to="" onClick={() => handleProductView(product)}>
                        <img src={eyeIcon} alt="view product" />
                      </Link>
                      <Link
                        to={`/edit-product/${product.product_id}`}
                        title={product.name}
                        className="edit-product"
                      >
                        <img src={editIcon} alt="Edit product" />
                      </Link>
                    </div>
                  </ListItem>
                ))}
              </List>
              {!!state?.products?.productsData?.length && (
                <CustomPagination
                  count={count}
                  page={page}
                  onChange={handleChangePage}
                />
              )}
            </div>
          </div>
          <ProductHistoryPopup
            openView={openView}
            product={product && product}
            closeProductView={() => closeProductView()}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RejectedProductsSupplier;
