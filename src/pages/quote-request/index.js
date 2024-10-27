import React, { useState, useEffect } from "react";
import Header from "@components/header";
import Footer from "@components/footer";
import {
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { quoteRequeststyle } from "./style";
import { Link } from "react-router-dom";
import NoImage from "@assets/images/no-image.jpg";
import editIcon from "@assets/images/pen.svg";
import dropDownIcon from "@assets/images/down-arrow-red.svg";
import dropDownGrayIcon from "@assets/images/down-arrow-gray.svg";
import SuccessPopup from "@components/success-popup";
import { useStore } from "@store/store";
import API from "@services/axios";
import {
  setImageArray,
  getFromLocalStore,
  removeLocalStore,
  getUserName,
} from "@utils/commonFunctions";
import {
  CREATE_QUOTE_REQUEST,
  CREATE_QUOTE_REQUEST_SUCCESS,
  CREATE_QUOTE_REQUEST_FAILURE,
  CREATE_QUOTES,
} from "@utils/actionType";
import { useNavigate } from "react-router-dom";
import Loader from "@components/loader";
import ConfirmationPopup from "@components/confirmationPopup";
import NoData from "@components/no-data";

function QuoteRequest() {
  const classes = quoteRequeststyle();
  const [state, dispatch] = useStore();
  const [open, setOpen] = useState(false);
  const [, setScroll] = useState("paper");
  const [openConfirmPopup, setConfirmPopup] = useState(false);

  useEffect(() => {
    let data = state?.quotes?.quotesData?.length
      ? state?.quotes?.quotesData
      : getFromLocalStore("client-quotes", true)
      ? getFromLocalStore("client-quotes", true)
      : [];
    dispatch({
      type: CREATE_QUOTES,
      payload: data,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { quotesData } = state?.quotes;

  const navigate = useNavigate();
  const handleRemoveQuote = () => {
    dispatch({
      type: CREATE_QUOTES,
      payload: [],
    });
    removeLocalStore("client-quotes");
  };
  const handleClickOpen = (scrollType) => () => {
    closeConfirmPopup();
    setOpen(true);
    setScroll(scrollType);
    let quoteList = {};
    let newArr = Array.from(quotesData);
    // let data = newArr?.map((item, index) =>
    //   item?.products.map(({ size, flavour, status, ...p }) => p)
    // );

    // newArr = newArr
    //   .map(({ brandDetails, ...item }) => item)
    //   .map((item, index) => ({
    //     ...item,
    //     products: data[index],
    //   }));

    quoteList.quotes = newArr.map((item) => {
      const products = item.products.map(
        ({ product_id, product_variation_id, quantity }) => {
          return {
            product_id,
            product_variation_id,
            quantity,
          };
        }
      );
      return { brand_id: item.brand_id, products };
    });
    dispatch({ type: CREATE_QUOTE_REQUEST });
    API.post("quote/create-quote", quoteList)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: CREATE_QUOTE_REQUEST_SUCCESS,
          });
          dispatch({
            type: CREATE_QUOTES,
            payload: {},
          });
          handleRemoveQuote();
        } else {
          dispatch({ type: CREATE_QUOTE_REQUEST_FAILURE });
          console.log(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: CREATE_QUOTE_REQUEST_FAILURE, payload: error });
        console.log(error);
      });
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/view-quote-request");
  };
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleOpenConfirmPopup = () => {
    setConfirmPopup(true);
  };
  const closeConfirmPopup = () => {
    setConfirmPopup(false);
  };
  return (
    <div className={classes.quoteRequestWrapper}>
      <Header />
      <Loader loading={state?.quotes?.quoteRequesting} />
      <div className="quote-page-wrapper">
        <div className="container">
          <Typography variant="h1">Quote Request</Typography>
          <div className="quote-request-list">
            {!!quotesData?.length ? (
              quotesData?.map((data, index) => {
                return (
                  <div className="quote-request-item" key={data.brand_id}>
                    <div className="white-box">
                      <Accordion
                        expanded={expanded === index}
                        onChange={handleChange(index)}
                      >
                        <AccordionSummary
                          aria-controls="panel1d-content"
                          id="panel1d-header"
                        >
                          <div className="quote-heading">
                            <div className="quote-title-block">
                              <em>
                                <img
                                  src={
                                    data?.brandDetails?.image
                                      ? data?.brandDetails?.image
                                      : NoImage
                                  }
                                  alt={data?.brandDetails?.name}
                                />
                              </em>
                              <Typography variant="h2">
                                {data?.brandDetails?.name}
                              </Typography>
                            </div>
                            <div className="down-arrow-wrapper">
                              <img
                                src={dropDownIcon}
                                alt="drop-down-arrow"
                                className="open-dropdown"
                              />
                              <img
                                src={dropDownGrayIcon}
                                alt="drop-down-arrow"
                                className="close-dropdown"
                              />
                            </div>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="quote-content">
                            {data?.products?.map((quoteProduct) => {
                              let productDetails =
                                data?.brandDetails?.products?.find(
                                  (p) => p.id === quoteProduct.product_id
                                );
                              return (
                                <div
                                  className="quote-list-item"
                                  key={quoteProduct.product_variation_id}
                                >
                                  <div className="left-block">
                                    <div className="left-title-inner">
                                      <em>
                                        <img
                                          src={
                                            setImageArray(
                                              productDetails?.product_image,
                                              productDetails?.products_gallery
                                            )[0]
                                          }
                                          alt={productDetails?.name}
                                        />
                                      </em>
                                      <Typography variant="h3">
                                        {productDetails?.name}
                                      </Typography>
                                    </div>
                                  </div>
                                  <div className="right-block">
                                    <div className="right-inner">
                                      <p>
                                        Flavour:{" "}
                                        <span>{quoteProduct.flavour}</span>
                                      </p>
                                      <p>
                                        Size: <span>{quoteProduct.size}</span>
                                      </p>
                                      <p>
                                        Quantity:{" "}
                                        <span>{quoteProduct.quantity}</span>
                                        <Link
                                          to={`/product-detail/${quoteProduct.product_id}`}
                                          title="EDIT"
                                        >
                                          <img src={editIcon} alt="Edit" />
                                        </Link>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </div>
                );
              })
            ) : (
              <NoData text="No items added into quote" />
            )}
          </div>
          <div className="btn-wrapper">
            {!!state?.quotes?.quotesData?.length && (
              <Button
                color="primary"
                className="primary-btn"
                onClick={handleOpenConfirmPopup}
              >
                Submit your quote request
              </Button>
            )}
          </div>
        </div>
        <SuccessPopup
          open={open}
          headline={`Thank You ${getUserName().split(" ")[0]}`}
          text="Your quote request is being reviewed by a team member who will reach out to you soon."
          handleClose={() => handleClose(false)}
        />
        <ConfirmationPopup
          open={openConfirmPopup}
          handleClose={closeConfirmPopup}
          handleConfirm={handleClickOpen("body")}
          confirmText={"Are you sure to Submit Quotes?"}
        />
      </div>
      <Footer />
    </div>
  );
}

export default QuoteRequest;
