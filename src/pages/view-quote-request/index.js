import React, { useState, useEffect } from "react";
import Header from "@components/header";
import Footer from "@components/footer";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import {
  FETCH_VIEW_QUOTE_REQUEST,
  FETCH_VIEW_QUOTE_REQUEST_SUCCESS,
  FETCH_VIEW_QUOTE_REQUEST_FAILURE,
  APPROVE_REJECT_QUOTE_SAMPLE,
  APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS,
  APPROVE_REJECT_QUOTE_SAMPLE_FAILURE,
  FILTER_QUOTE,
  FILTER_QUOTE_SUCCESS,
  FILTER_QUOTE_FAILURE,
} from "@utils/actionType";
import NoImage from "@assets/images/no-image.jpg";
import { toast } from "react-toastify";
import dropDownIcon from "@assets/images/down-arrow-red.svg";
import dropDownGrayIcon from "@assets/images/down-arrow-gray.svg";
import { useStore } from "@store/store";
import API from "@services/axios";
import Loader from "@components/loader";
import CustomPagination from "@components/pagination";
import NoData from "@components/no-data";
import { quoteRequeststyle } from "./style";
import { utcToLocal, strToURL } from "@utils/commonFunctions";
import Popup from "./popup";
import ConfirmationPopup from "@components/confirmationPopup";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { useFormik } from "formik";
import redEyeIcon from "@assets/images/red-eye.png";
import { quoteRequestStaffStatus } from "../../utils/commonData";
import SuccessPopup from "@components/success-popup";
import TimeStampPopup from "@components/time-stamp-popup/tspopup";
import { useNavigate } from "react-router-dom";

function ViewQuoteRequest() {
  const classes = quoteRequeststyle();
  const [state, dispatch] = useStore();
  const [page, setPage] = useState(1);
  const [openPopup, setOpenPopup] = useState(false);
  const [openConfirmPopup, setConfirmPopup] = useState(false);
  const [readyStatus, setReadyStatus] = useState({ id: null, status: null });
  const [filterStatus, setFilterStatus] = useState("All");
  const [expanded, setExpanded] = useState(0);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [count, setCount] = useState(0);
  const [openModel, setOpenModel] = useState(false);
  const [quoteData, setQuoteData] = useState([]);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleCloseModal = (status) => {
    setOpenSuccess(false);
    navigate("/view-orders");
  };

  const openTimeStampModel = (id) => {
    setOpenModel(true);
    quotesData.map((item) => {
      id === item.quote_id && setQuoteData(item?.quote_history);
      return {};
    });
  };

  const handleModelClose = () => {
    setOpenModel(false);
    setQuoteData([]);
  };

  const getViewQuoteRequest = () => {
    dispatch({ type: FETCH_VIEW_QUOTE_REQUEST });
    API.get(`quote/quote-list?page=${page}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_VIEW_QUOTE_REQUEST_SUCCESS,
            payload: response.data.data,
          });
          setCount(response?.data?.totalPageCount);
        } else {
          dispatch({
            type: FETCH_VIEW_QUOTE_REQUEST_FAILURE,
            payload: response.data.errorMessage,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_VIEW_QUOTE_REQUEST_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    filterStatus === "All" ? getViewQuoteRequest() : handleFilterStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterStatus]);

  const quotesData = state?.quotes?.viewQuoteRequestData;

  const handleSampleStatus = (id, e) => {
    const status = e.target.value;
    setReadyStatus({ id, status });
    status === "Rejected" ? setOpenPopup(true) : setConfirmPopup(true);
  };

  const rejectedFormik = useFormik({
    initialValues: schema.requestSampleRejectedSchema,
    validationSchema: validationSchema.requestSampleRejectedValidationSchema,
    onSubmit: (value) => {
      handleStatusRequest(readyStatus.id, readyStatus.status, value);
    },
  });

  const handleStatusRequest = (id, status, value) => {
    let data;
    if (status === "Rejected") {
      data = { quote_id: id, quote_status: status, reason: value?.reason };
    } else if (status === "Approved") {
      data = { quote_id: id, quote_status: status };
    }
    dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE });
    API.post(`quote/update-quotetable-status`, data)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS,
          });
          if (status === "Approved") {
            setOpenSuccess(true);
          }
          toast.success(response.data.successMessage);

          filterStatus === "All" ? getViewQuoteRequest() : handleFilterStatus();
        } else {
          dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE_FAILURE });
          toast.error(response.data.errorMessage);
          setOpenSuccess(false);
        }
      })
      .catch((err) => {
        dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE_FAILURE });
      });

    closeConfirmPopup();
    if (status === "Rejected") {
      rejectedFormik.handleReset();
    }
  };

  const handleFilterStatus = () => {
    dispatch({ type: FILTER_QUOTE });
    API.post(`/quote/filter-quote?page=${page}`, {
      status: filterStatus,
    })
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FILTER_QUOTE_SUCCESS,
            payload: response.data.data,
          });
          setCount(response?.data?.totalPageCount);
        } else {
          dispatch({ type: FILTER_QUOTE_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: FILTER_QUOTE_FAILURE });
      });
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const closeConfirmPopup = () => {
    readyStatus.status === "Rejected"
      ? setOpenPopup(false)
      : setConfirmPopup(false);
    // rejectedFormik.handleReset();
    setReadyStatus({ id: null, status: null });
  };
  return (
    <div className={classes.quoteRequestWrapper}>
      <Header />
      <Loader loading={state?.quotes?.loadingViewQuoteRequest} />
      <div className="quote-page-wrapper">
        <div className="container">
          <div className="heading">
            <Typography variant="h1">View Quote Request</Typography>
            <div className="form-group">
              <InputLabel className="status-label">Filter By Status</InputLabel>
              <TextField
                select
                id="filter-status"
                name="filter-status"
                type="text"
                variant="outlined"
                onChange={(e) => setFilterStatus(e.target.value)}
                value={filterStatus}
              >
                <MenuItem key={0} value="All">
                  Show All
                </MenuItem>
                {!!quoteRequestStaffStatus?.length &&
                  quoteRequestStaffStatus?.map((item, index) => {
                    return (
                      <MenuItem key={index + 1} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                <MenuItem key={8} value="Rejected">
                  Rejected
                </MenuItem>
              </TextField>
            </div>
          </div>
          <div className="quote-request-list">
            {!!quotesData?.length && typeof quotesData === "object" ? (
              quotesData?.map((data, index) => {
                return (
                  data?.client_status !== "Approved" && (
                    <div className="quote-request-item" key={data.quote_id}>
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
                                <Typography variant="h2">
                                  {`Quote #${data?.quote_id}`}
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
                              <div className="quote-list-top-item" key={index}>
                                <div className="left-block">
                                  <div className="left-title-inner">
                                    <p className="title">Status:</p>
                                    <div className="value-container">
                                      <Typography
                                        variant="h3"
                                        className={
                                          data?.client_status === "Rejected"
                                            ? "red-value"
                                            : "green-value"
                                        }
                                      >
                                        {data?.client_status}
                                      </Typography>
                                    </div>
                                  </div>
                                  <div className="left-title-inner">
                                    <p className="title">Date:</p>
                                    <div className="value-container">
                                      <Typography variant="h3">
                                        {utcToLocal(
                                          data?.created_date,
                                          "MMMM DD, YYYY"
                                        )}
                                      </Typography>
                                    </div>
                                  </div>
                                </div>
                                <div className="right-block">
                                  <div className="right-inner">
                                    <div className="form-group">
                                      {data?.client_status === "Ready" ||
                                      data?.client_status === "Update" ? (
                                        <>
                                          <InputLabel className="status-label">
                                            Quote Ready
                                          </InputLabel>
                                          <TextField
                                            select
                                            id="your-status"
                                            name="your-status"
                                            type="text"
                                            variant="outlined"
                                            onChange={(e) =>
                                              handleSampleStatus(
                                                data?.quote_id,
                                                e
                                              )
                                            }
                                            value={
                                              data?.staff_status === "Ready" ||
                                              data?.staff_status === "Update"
                                                ? "select"
                                                : data?.client_status
                                            }
                                          >
                                            <MenuItem
                                              key={0}
                                              value="select"
                                              selected
                                              disabled
                                            >
                                              Select
                                            </MenuItem>
                                            <MenuItem key={1} value="Approved">
                                              Approved
                                            </MenuItem>
                                            <MenuItem key={2} value="Rejected">
                                              Rejected
                                            </MenuItem>
                                          </TextField>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="quote-list-top-item middle-scope">
                                <div className="left-block">
                                  <div className="shipping-details">
                                    <div className="child-heading">
                                      <div>Order Details</div>
                                      <Button
                                        color="primary"
                                        className="primary-border-btn back-btn"
                                        style={{ marginRight: "-15px" }}
                                        onClick={() =>
                                          openTimeStampModel(data?.quote_id)
                                        }
                                      >
                                        History
                                      </Button>
                                    </div>
                                    <div className="left-title-inner">
                                      <p className="title">Sales Order:</p>
                                      <div className="value-container">
                                        <Typography variant="h3">
                                          {!!data?.sales_order
                                            ? data?.sales_order
                                            : "N/A"}
                                        </Typography>
                                      </div>
                                    </div>
                                    <div className="left-title-inner">
                                      <p className="title">Traking URL:</p>
                                      <div className="value-container">
                                        <Typography variant="h3">
                                          {!!data?.tracking_url ? (
                                            <a
                                              href={strToURL(
                                                data?.tracking_url,
                                                "https://"
                                              )}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              {data?.tracking_url}
                                            </a>
                                          ) : (
                                            "N/A"
                                          )}
                                        </Typography>
                                      </div>
                                    </div>
                                    {/* <div className="left-title-inner">
                                      <p className="title">
                                        Est. Date of Arrival:
                                      </p>
                                      <div className="value-container">
                                        <Typography variant="h3">
                                          {!!data?.estimated_date
                                            ? utcToLocal(
                                                data?.estimated_date,
                                                "MMMM DD, YYYY"
                                              )
                                            : "N/A"}
                                        </Typography>
                                      </div>
                                    </div> */}
                                  </div>
                                </div>
                                <div className="left-block">
                                  {(data?.client_status === "Ready" ||
                                    data?.client_status === "Update" ||
                                    data?.client_status === "Approved") && (
                                    <div className="read-details">
                                      <div className="child-heading">
                                        Details By Staff
                                      </div>
                                      <div className="left-title-inner">
                                        <p className="title">Quote pdf:</p>
                                        <div className="value-container">
                                          <Typography
                                            variant="h3"
                                            className="view-pdf"
                                          >
                                            {data?.pdf.substring(
                                              data?.pdf.lastIndexOf("/") + 1
                                            )}
                                            {` `}
                                            {!!data?.pdf ? (
                                              <a
                                                href={data?.pdf}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                <img
                                                  src={redEyeIcon}
                                                  alt="view"
                                                />
                                              </a>
                                            ) : (
                                              "N/A"
                                            )}
                                          </Typography>
                                        </div>
                                      </div>
                                      <div className="left-title-inner">
                                        <p className="title">Notes:</p>
                                        <div className="value-container">
                                          <Typography variant="h3">
                                            {!!data?.notes
                                              ? data?.notes
                                              : "N/A"}
                                          </Typography>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {data?.quote_details?.map((quoteProduct) =>
                                quoteProduct?.product_details?.map(
                                  (productDetails, index) => (
                                    <div
                                      className="quote-list-item"
                                      key={index}
                                    >
                                      <div className="left-block">
                                        <div className="left-title-inner">
                                          <em>
                                            <img
                                              src={
                                                productDetails?.product_image ||
                                                productDetails?.products_gallery
                                                  ? productDetails?.product_image ||
                                                    productDetails?.products_gallery
                                                  : NoImage
                                              }
                                              alt={productDetails?.product_name}
                                            />
                                          </em>
                                          <div className="titles-container">
                                            <Typography variant="h3">
                                              {productDetails?.product_name}
                                            </Typography>
                                            <Typography variant="h3">
                                              {quoteProduct.supplier_name}
                                            </Typography>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="right-block">
                                        <div className="right-inner">
                                          {/* <p>
                                            Status:{" "}
                                            <span>
                                              {productDetails?.status}
                                            </span>
                                          </p> */}
                                          <p>
                                            {!!productDetails.variation1_name
                                              ? `${productDetails.variation1_name}:`
                                              : ""}

                                            <span>
                                              {productDetails?.variation1_value}
                                            </span>
                                          </p>
                                          <p>
                                            {!!productDetails.variation2_name
                                              ? `${productDetails.variation2_name}:`
                                              : ""}
                                            <span>
                                              {productDetails?.variation2_value}
                                            </span>
                                          </p>

                                          <p>
                                            Quantity:{" "}
                                            <span>
                                              {productDetails?.quantity}
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              )}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                      <SuccessPopup
                        open={openSuccess}
                        headline={`Congratulations ${data?.client_name}`}
                        text="Thank you for your business."
                        handleClose={() => handleCloseModal(readyStatus.status)}
                      />
                    </div>
                  )
                );
              })
            ) : (
              <NoData text="No quote request found" />
            )}
          </div>
          {!!quotesData?.length && typeof quotesData === "object" && (
            <CustomPagination
              count={count}
              page={page}
              onChange={handleChangePage}
            />
          )}
        </div>
      </div>
      <ConfirmationPopup
        open={openConfirmPopup}
        handleClose={closeConfirmPopup}
        handleConfirm={() =>
          handleStatusRequest(readyStatus.id, readyStatus.status)
        }
        confirmText={`Are you sure to approve request ?`}
      />
      <Popup
        open={openPopup}
        handleClose={closeConfirmPopup}
        formik={rejectedFormik}
      />
      <TimeStampPopup
        open={openModel}
        handleClose={handleModelClose}
        data={quoteData}
      />
      <Footer />
    </div>
  );
}

export default ViewQuoteRequest;
