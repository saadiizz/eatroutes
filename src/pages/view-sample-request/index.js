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
import { quoteRequeststyle } from "./style";
import {
  FETCH_VIEW_SAMPLE_REQUEST,
  FETCH_VIEW_SAMPLE_REQUEST_SUCCESS,
  FETCH_VIEW_SAMPLE_REQUEST_FAILURE,
  APPROVE_REJECT_QUOTE_SAMPLE,
  APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS,
  APPROVE_REJECT_QUOTE_SAMPLE_FAILURE,
  FILTER_SAMPLE,
  FILTER_SAMPLE_SUCCESS,
  FILTER_SAMPLE_FAILURE,
} from "@utils/actionType";
import dropDownIcon from "@assets/images/down-arrow-red.svg";
import dropDownGrayIcon from "@assets/images/down-arrow-gray.svg";
import { useStore } from "@store/store";
import API from "@services/axios";
import Loader from "@components/loader";
import { toast } from "react-toastify";
import CustomPagination from "@components/pagination";
import NoData from "@components/no-data";
import { utcToLocal, strToURL } from "@utils/commonFunctions";
import NoImage from "@assets/images/no-image.jpg";
import ConfirmationPopup from "../../components/confirmationPopup";
import { useFormik } from "formik";
import Popup from "./popup";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import TimeStampPopup from "@components/time-stamp-popup/tspopup";

function ViewSampleRequest() {
  const classes = quoteRequeststyle();
  const [state, dispatch] = useStore();
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("All");
  const [count, setCount] = useState(0);
  const [approvePopup, setApprovePopup] = useState(false);
  const [rejectPopup, setRejectPopup] = useState(false);
  const [chargeStatus, setChargeStatus] = useState({ id: null, status: null });
  const [openModel, setOpenModel] = useState(false);
  const [sampleData, setSampleData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleModelClose = () => {
    setOpenModel(false);
    setSampleData([]);
  };

  const openTimeStampModel = (id) => {
    setOpenModel(true);
    quotesData.map((item) => {
      id === item.id && setSampleData(item?.sample_history);
      return {};
    });
  };

  const getViewSampleRequest = () => {
    dispatch({ type: FETCH_VIEW_SAMPLE_REQUEST });
    API.get(`/sample_management/get-sample?page=${page}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_VIEW_SAMPLE_REQUEST_SUCCESS,
            payload: response.data.data,
          });
          setCount(response?.data?.totalPageCount);
        } else {
          dispatch({
            type: FETCH_VIEW_SAMPLE_REQUEST_FAILURE,
            payload: response.data.errorMessage,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_VIEW_SAMPLE_REQUEST_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    filterStatus === "All" ? getViewSampleRequest() : handleFilterStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterStatus]);

  const quotesData = state?.quotes?.viewSampleRequestData;

  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleFilterStatusAndPage = (e) => {
    setPage(1);
    setFilterStatus(e.target.value);
  };

  const handleFilterStatus = () => {
    dispatch({ type: FILTER_SAMPLE });
    API.post(`sample_management/filter-sample?page=${page}`, {
      ...(filterStatus !== "All" ? { status: filterStatus } : ""),
    })
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FILTER_SAMPLE_SUCCESS,
            payload: response.data.data,
          });
          setCount(response?.data?.totalPageCount);
        } else {
          dispatch({ type: FILTER_SAMPLE_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: FILTER_SAMPLE_FAILURE });
      });
  };

  const closePopup = () => {
    if (chargeStatus.status === "Rejected") {
      setRejectPopup(false);
      rejectedFormik.handleReset();
    } else {
      setApprovePopup(false);
    }
    setChargeStatus({ id: null, status: null });
  };

  const rejectedFormik = useFormik({
    initialValues: schema.requestSampleRejectedSchema,
    validationSchema: validationSchema.requestSampleRejectedValidationSchema,
    onSubmit: (value) => {
      handleStatusRequest(chargeStatus.id, chargeStatus.status, value);
    },
  });

  const handleStatus = (status, id) => {
    setChargeStatus({ id: id, status: status });
    status === "Approved" ? setApprovePopup(true) : setRejectPopup(true);
  };

  const handleStatusRequest = (id, status, value) => {
    let data;
    if (status === "Approved") {
      data = {
        charge_request: status,
        charge_reject_reason: null,
      };
    } else if (status === "Rejected") {
      data = {
        charge_request: status,
        charge_reject_reason: value?.reason,
      };
    }
    dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE });
    API.post(`/sample_management/update-sample-status/${id}`, data)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS,
          });
          toast.success(response.data.successMessage);
          filterStatus === "All"
            ? getViewSampleRequest()
            : handleFilterStatus();
        } else {
          dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE_FAILURE });
        toast.error("Some thing went wrong");
      });
    closePopup();
  };

  return (
    <div className={classes.quoteRequestWrapper}>
      <Header />
      <Loader loading={state?.quotes?.loadingViewSampleRequest} />
      <div className="quote-page-wrapper">
        <div className="container">
          <div className="heading">
            <Typography variant="h1">Sample Request</Typography>
            <div className="form-group">
              <InputLabel className="status-label">Filter By Status</InputLabel>
              <TextField
                select
                id="filter-status"
                name="filter-status"
                type="text"
                variant="outlined"
                onChange={(e) => handleFilterStatusAndPage(e)}
                value={filterStatus}
              >
                <MenuItem key={0} value="All">
                  Show All
                </MenuItem>
                <MenuItem key={1} value="Pending">
                  Pending
                </MenuItem>
                <MenuItem key={2} value="In Process">
                  In Process
                </MenuItem>
                <MenuItem key={3} value="Rejected">
                  Rejected
                </MenuItem>
                <MenuItem key={4} value="Shipped">
                  Shipped
                </MenuItem>
              </TextField>
            </div>
          </div>
          <div className="quote-request-list">
            {!!quotesData?.length ? (
              quotesData?.map((data, index) => {
                return (
                  <div className="quote-request-item" key={data.id}>
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
                                {`Sample #${data?.id}`}
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
                            <div className="quote-list-item" key={index}>
                              <div className="left-block">
                                <div className="brand-inner">
                                  <div className="brand-inner-img">
                                    <img
                                      src={
                                        data?.supplier?.image
                                          ? data?.supplier?.image
                                          : NoImage
                                      }
                                      alt={index}
                                    />
                                  </div>
                                  <div>
                                    <div className="left-title-inner">
                                      <p className="title">Brand:</p>
                                      <div className="brand-container">
                                        <Typography variant="h3">
                                          {data?.supplier?.name}
                                        </Typography>
                                      </div>
                                    </div>
                                    <div className="left-title-inner">
                                      <p className="title">Date:</p>
                                      <div className="value-container">
                                        <Typography variant="h3">
                                          {utcToLocal(
                                            data?.created_at,
                                            "MMMM DD, YYYY"
                                          )}
                                        </Typography>
                                      </div>
                                    </div>
                                    <div className="left-title-inner">
                                      <p className="title">Address:</p>
                                      <div className="value-container">
                                        <Typography variant="h3">
                                          {data?.address
                                            ? data?.address
                                            : "N/A"}
                                        </Typography>
                                      </div>
                                    </div>
                                    <div className="left-title-inner">
                                      <p className="title">Notes:</p>
                                      <div className="value-container">
                                        <Typography variant="h3">
                                          {data?.notes ? data?.notes : "N/A"}
                                        </Typography>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="shipping-details">
                                  <div className="child-heading">
                                    <div>
                                      {data?.staff_status === "Rejected"
                                        ? "Rejected Reason By Staff"
                                        : "Shipping Details"}
                                    </div>
                                    <Button
                                      color="primary"
                                      className="primary-border-btn back-btn"
                                      style={{ marginRight: "-15px" }}
                                      onClick={() =>
                                        openTimeStampModel(data?.id)
                                      }
                                    >
                                      History
                                    </Button>
                                  </div>
                                  {data?.staff_status === "Rejected" ? (
                                    <div className="left-title-inner rejected-reason">
                                      <div className="value-container">
                                        <Typography variant="h3">
                                          &#x2022;
                                          {!!data?.reason
                                            ? " " + data?.reason
                                            : " N/A"}
                                        </Typography>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="left-title-inner">
                                        <p
                                          className="title"
                                          style={{
                                            minWidth: "85px !important",
                                          }}
                                        >
                                          Cost to Ship Samples:
                                        </p>
                                        <div className="value-container">
                                          <Typography variant="h3">
                                            {!!data?.charge_amount
                                              ? `$${data?.charge_amount} USD`
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
                                    </>
                                  )}
                                </div>
                              </div>

                              <div
                                className="approval-block"
                                style={{ paddingRight: "0" }}
                              >
                                <div className="right-inner">
                                  <div className="right-block">
                                    <p>
                                      Status:{" "}
                                      <span
                                      // className={
                                      //   data?.client_status === "Rejected"
                                      //     ? "redSpan"
                                      //     : "greenSpan"
                                      // }
                                      >
                                        {data?.client_status}
                                      </span>
                                    </p>
                                  </div>
                                  {data?.charge_request === "Pending" &&
                                    data?.staff_status === "Pending Payment" &&
                                    data?.client_status !== "Rejected" && (
                                      <div className="form-group">
                                        <InputLabel
                                          className="status-label"
                                          style={{
                                            fontSize: "16px",
                                            width: "170px",
                                            whiteSpace: "normal",
                                          }}
                                        >
                                          A charge of ${data?.charge_amount} USD
                                          is required to ship sample box.
                                        </InputLabel>
                                        <TextField
                                          select
                                          id="your-status"
                                          name="your-status"
                                          type="text"
                                          variant="outlined"
                                          onChange={(e) =>
                                            handleStatus(
                                              e.target.value,
                                              data?.id
                                            )
                                          }
                                          value={data?.charge_request}
                                        >
                                          {data?.charge_request ===
                                            "Pending" && (
                                            <MenuItem
                                              key={0}
                                              value={data?.charge_request}
                                              disabled
                                            >
                                              {data?.charge_request}
                                            </MenuItem>
                                          )}

                                          <MenuItem key={1} value="Approved">
                                            Approved
                                          </MenuItem>
                                          <MenuItem key={2} value="Rejected">
                                            Rejected
                                          </MenuItem>
                                        </TextField>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </div>
                );
              })
            ) : (
              <NoData text="No sample request found" />
            )}
          </div>
          <ConfirmationPopup
            open={approvePopup}
            handleClose={closePopup}
            handleConfirm={() =>
              handleStatusRequest(chargeStatus.id, chargeStatus.status)
            }
            confirmText="Are you sure to Approve charge ?"
          />
          <Popup
            open={rejectPopup}
            handleClose={closePopup}
            handleStatusRequest={handleStatusRequest}
            formik={rejectedFormik}
          />
          {!!quotesData?.length && (
            <CustomPagination
              count={count}
              page={page}
              onChange={handleChangePage}
            />
          )}
        </div>
      </div>
      <TimeStampPopup
        open={openModel}
        handleClose={handleModelClose}
        data={sampleData}
      />
      <Footer />
    </div>
  );
}

export default ViewSampleRequest;
