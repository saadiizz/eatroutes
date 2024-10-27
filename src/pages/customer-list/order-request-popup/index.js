import React, { useState, useEffect } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputLabel,
  MenuItem,
  Link,
  Dialog,
} from "@mui/material";
import cx from "classnames";
import crossIcon from "@assets/images/cross-mark-white.svg";
import {
  FETCH_VIEW_ORDER_REQUEST,
  FETCH_VIEW_ORDER_REQUEST_SUCCESS,
  FETCH_VIEW_ORDER_REQUEST_FAILURE,
  APPROVE_REJECT_QUOTE_SAMPLE,
  APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS,
  APPROVE_REJECT_QUOTE_SAMPLE_FAILURE,
} from "@utils/actionType";
import API from "@services/axios";
import { quoteRequeststyle } from "./style";
import NoImage from "@assets/images/no-image.jpg";
import dropDownIcon from "@assets/images/down-arrow-red.svg";
import dropDownGrayIcon from "@assets/images/down-arrow-gray.svg";
import { useStore } from "@store/store";
import Loader from "@components/loader";
import { toast } from "react-toastify";
import NoData from "@components/no-data";
import CustomPagination from "@components/pagination";
import { quoteRequestStaffStatus } from "@utils/commonData";
import { utcToLocal, strToURL } from "@utils/commonFunctions";
import Popup from "./popup";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { useFormik } from "formik";
import { ShopForm } from "./shopForm";
import redEyeIcon from "@assets/images/red-eye.png";

function ViewOrderStaffRequest(props) {
  const classes = quoteRequeststyle();
  const [state, dispatch] = useStore();
  const [page, setPage] = useState(1);
  const [openPopup, setOpenPopup] = useState(false);
  const [staffStatus, setStaffStatus] = useState({ id: null, status: null });
  const [expanded, setExpanded] = useState(0);
  const [data, setData] = useState();
  const [count, setCount] = useState(0);
  const [scroll] = useState("body");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };
  const getViewOrderRequest = () => {
    dispatch({ type: FETCH_VIEW_ORDER_REQUEST });
    API.post(`search-order-by-client?page=${page}`, { client_id: props.id })
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_VIEW_ORDER_REQUEST_SUCCESS,
            payload: response.data.data,
          });
          setCount(response?.data?.totalPageCount);
          setData(response.data.data);
        } else {
          dispatch({ type: FETCH_VIEW_ORDER_REQUEST_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: FETCH_VIEW_ORDER_REQUEST_FAILURE });
      });
  };

  const readyFormik = useFormik({
    initialValues: schema.requestQuoteReadySchema,
    validationSchema: validationSchema.requestQuoteReadyValidationSchema,
    onSubmit: (value) => {
      handleStatusRequest(staffStatus.id, staffStatus.status, value);
    },
  });

  const handleSampleStatus = (id, e) => {
    const status = e;
    if (status === "Pending" || status === "In Progress") {
      handleStatusRequest(id, status);
    } else {
      setStaffStatus({ id, status });
      setOpenPopup(true);
    }
  };

  const handleStatusRequest = (id, status, value) => {
    let data;
    if (status === "Pending" || status === "In Progress") {
      data = { quote_id: id, quote_status: status };
    } else if (status === "Ready" || status === "Update") {
      const formData = new FormData();

      const pdfData = {
        quote_id: id,
        quote_status: status,
        notes: value?.notes,
        pdf: value?.pdf,
      };

      Object.keys(pdfData).forEach((fieldName) => {
        formData.append(fieldName, pdfData[fieldName]);
      });
      data = formData;
    } else {
      data = {
        quote_id: id,
        quote_status: status,
        sales_order: value?.sales_order,
        tracking_url: strToURL(value?.tracking_url, "https://www."),
      };
    }

    dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE });
    API.post(`quote/update-quotetable-status`, data)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS,
          });
          status === "Submit"
            ? toast.success("Shipping Details Added Successfully")
            : toast.success(response.data.successMessage);
          getViewOrderRequest();
        } else {
          dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE_FAILURE });
      });

    closeConfirmPopup();
    if (status === "Ready" || status === "Update") {
      readyFormik.handleReset();
    }
  };

  useEffect(() => {
    getViewOrderRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const closeConfirmPopup = () => {
    setOpenPopup(false);
    setStaffStatus({ id: "null", status: "null" });
  };

  return (
    <Dialog
      open={props.open}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={cx(classes.customDialogWraper, classes.smallPopup)}
    >
      <div className={classes.editcustomerWrapper}>
        <div className="popup-header">
          <Typography variant="h4">
            {props.name}
            <Link className="cross-btn" onClick={props.handleClose}>
              <img src={crossIcon} alt="Success Icon" />
            </Link>
          </Typography>
        </div>
      </div>
      <div className={classes.quoteRequestWrapper}>
        <Loader
          loading={
            state?.quotes?.loadingViewOrderRequest ||
            state?.quotes?.accessRequesting
          }
        />
        <div className="quote-page-wrapper">
          <div className="container">
            <div className="heading">
              <Typography variant="h1">Orders</Typography>
              <div className="search-wrapper"></div>
            </div>
            <div className="quote-request-list">
              {!!data?.length && typeof data === "object" ? (
                data?.map((data, index) => {
                  return (
                    data?.client_status === "Approved" && (
                      <div className="quote-request-item" key={index}>
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
                                <div
                                  className="quote-list-top-item"
                                  key={index}
                                >
                                  <div className="left-block">
                                    <div className="left-title-inner">
                                      <p className="title">Quote Id:</p>
                                      <div className="value-container">
                                        <Typography variant="h3">
                                          {data?.quote_id}
                                        </Typography>
                                      </div>
                                    </div>
                                    <div className="left-title-inner">
                                      <p className="title">Client Name:</p>
                                      <div className="value-container">
                                        <Typography variant="h3">
                                          {data?.client_name}
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
                                    <div className="left-title-inner">
                                      <p className="title">Company:</p>
                                      <div className="value-container">
                                        <Typography variant="h3">
                                          {!!data?.client_company
                                            ? data?.client_company
                                            : "N/A"}
                                        </Typography>
                                      </div>
                                    </div>
                                    <div className="left-title-inner">
                                      <p className="title">Phone:</p>
                                      <div className="value-container">
                                        <Typography variant="h3">
                                          {!!data?.client_phone
                                            ? data?.client_phone
                                            : "N/A"}
                                        </Typography>
                                      </div>
                                    </div>
                                    <div className="left-title-inner">
                                      <p className="title">Address:</p>
                                      <div className="value-container">
                                        <Typography variant="h3">
                                          {!!data?.client_address
                                            ? data?.client_address
                                            : "N/A"}
                                        </Typography>
                                      </div>
                                    </div>
                                    {(data?.staff_status === "Ready" ||
                                      data?.staff_status === "Update") && (
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
                                    )}
                                    {data?.client_status === "Approved" && (
                                      <ShopForm
                                        data={data}
                                        handleStatusRequest={
                                          handleStatusRequest
                                        }
                                      />
                                    )}
                                    {data?.client_status === "Rejected" && (
                                      <div className="shipping-details">
                                        <div className="child-heading">
                                          Rejected Reason:
                                        </div>
                                        <div className="left-title-inner rejected-reason">
                                          {/* <p className="title"></p> */}
                                          <div className="value-container">
                                            <Typography variant="h3">
                                              &#x2022;
                                              {!!data?.reason
                                                ? " " + data?.reason
                                                : " N/A"}
                                            </Typography>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div className="right-block">
                                    <div className="right-inner">
                                      <div className="form-group">
                                        <InputLabel className="status-label">
                                          Your Status
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
                                              e.target.value
                                            )
                                          }
                                          value={data?.staff_status}
                                        >
                                          {!!quoteRequestStaffStatus?.length &&
                                            quoteRequestStaffStatus?.map(
                                              (item, index) => {
                                                return (
                                                  <MenuItem
                                                    key={index}
                                                    value={item}
                                                  >
                                                    {item}
                                                  </MenuItem>
                                                );
                                              }
                                            )}
                                        </TextField>
                                      </div>

                                      <div className="client-status">
                                        <p className="status-label">
                                          Client Status
                                        </p>
                                        <div className="status">
                                          {data?.client_status === "Ready" ||
                                          data?.client_status === "Update"
                                            ? "Awaiting Response"
                                            : data?.client_status}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="quote-details">
                                  <div className="child-heading">
                                    Quote Details
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
                                                    productDetails?.product_image
                                                      ? productDetails?.product_image
                                                      : NoImage
                                                  }
                                                  alt={
                                                    productDetails?.product_name
                                                  }
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
                                              <p className="firstP">
                                                {!!productDetails.variation1_name
                                                  ? `${productDetails.variation1_name}:`
                                                  : ""}
                                                <span>
                                                  {
                                                    productDetails.variation1_value
                                                  }
                                                </span>
                                              </p>
                                              <p className="secondP">
                                                {!!productDetails.variation2_name
                                                  ? `${productDetails.variation2_name}:`
                                                  : ""}
                                                <span>
                                                  {
                                                    productDetails.variation2_value
                                                  }
                                                </span>
                                              </p>

                                              <p className="thirdP">
                                                Quantity:{" "}
                                                <span>
                                                  {productDetails.quantity}
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )
                                  )}
                                </div>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </div>
                    )
                  );
                })
              ) : (
                <NoData text="No order request found" />
              )}
            </div>
            {!!data?.length && typeof data === "object" && (
              <CustomPagination
                count={count}
                page={page}
                onChange={handleChangePage}
              />
            )}
          </div>
        </div>
        <Popup
          open={openPopup}
          handleClose={closeConfirmPopup}
          statusData={staffStatus}
          formik={readyFormik}
        />
      </div>
    </Dialog>
  );
}

export default ViewOrderStaffRequest;
