import React, { useState, useEffect } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputLabel,
  MenuItem,
  Dialog,
  Link,
} from "@mui/material";
import {
  APPROVE_REJECT_QUOTE_SAMPLE,
  APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS,
  APPROVE_REJECT_QUOTE_SAMPLE_FAILURE,
  FILTER_SAMPLE,
  FILTER_SAMPLE_SUCCESS,
  FILTER_SAMPLE_FAILURE,
} from "@utils/actionType";
import API from "@services/axios";
import { toast } from "react-toastify";
import { quoteRequeststyle } from "./style";
import dropDownIcon from "@assets/images/down-arrow-red.svg";
import dropDownGrayIcon from "@assets/images/down-arrow-gray.svg";
import { useStore } from "@store/store";
import Loader from "@components/loader";
import NoData from "@components/no-data";
import cx from "classnames";
import crossIcon from "@assets/images/cross-mark-white.svg";
import CustomPagination from "@components/pagination";
import { utcToLocal, strToURL } from "@utils/commonFunctions";
import NoImage from "@assets/images/no-image.jpg";
import Popup from "./popup";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { useFormik } from "formik";

function SampleRequestStaff(props) {
  const classes = quoteRequeststyle();
  const [state, dispatch] = useStore();
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("All");
  const [openPopup, setOpenPopup] = useState(false);
  const [staffStatus, setStaffStatus] = useState({ id: null, status: null });
  const [count, setCount] = useState(0);
  const [scroll] = useState("body");
  const [expanded, setExpanded] = useState(0);
  const [data, setData] = useState();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    handleFilterStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterStatus]);

  const rejectedFormik = useFormik({
    initialValues: schema.requestSampleRejectedSchema,
    validationSchema: validationSchema.requestSampleRejectedValidationSchema,
    onSubmit: (value) => {
      handleStatusRequest(staffStatus.id, staffStatus.status, value);
    },
  });

  const handleSampleStatus = (id, e) => {
    const status = e.target.value;
    if (status === "Pending") {
      handleStatusRequest(id, status);
    } else {
      setStaffStatus({ id, status });
      setOpenPopup(true);
    }
  };

  const handleStatusRequest = (id, status, value) => {
    let data;
    if (status === "Approved" || status === "Update") {
      data = {
        status,
        ...value,
        charge_reject_reason: null,
      };
    } else if (status === "Rejected") {
      data = {
        status,
        reason: value?.reason ? value?.reason : null,
      };
    }
    dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE });
    API.post(`/sample_management/update-sample-status/${id}`, data)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS,
          });
          toast.success(
            `Charge request ${
              status === "Approved"
                ? "approved"
                : status === "Update"
                ? "updated"
                : "rejected"
            } successfully`
          );
          handleFilterStatus();
        } else {
          dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE_FAILURE });
        toast.error("Some thing went wrong");
      });

    closeConfirmPopup();
  };

  const handleFilterStatusAndPage = (e) => {
    setPage(1);
    setFilterStatus(e.target.value);
  };

  const handleFilterStatus = () => {
    dispatch({ type: FILTER_SAMPLE });
    API.post(`sample_management/filter-sample?page=${page}`, {
      client_id: props.id,
      ...(filterStatus !== "All" ? { staff_status: filterStatus } : {}),
    })
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FILTER_SAMPLE_SUCCESS,
            payload: response.data.data,
          });
          setData(response.data.data);
          setCount(response?.data?.totalPageCount);
        } else {
          dispatch({ type: FILTER_SAMPLE_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: FILTER_SAMPLE_FAILURE });
        toast.error("Some thing went wrong");
      });
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const closeConfirmPopup = () => {
    setOpenPopup(false);
    rejectedFormik.handleReset();
    setStaffStatus({ id: null, status: null });
  };

  return (
    <Dialog
      open={props.open}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={cx(classes.customDialogWraper, classes.smallPopup)}
    >
      <div className={classes.quoteRequestWrapper}>
        <Loader
          loading={
            state?.quotes?.loadingViewSampleRequest ||
            state?.quotes?.accessRequesting
          }
        />
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

        <div className="quote-page-wrapper">
          <div className="container">
            <div className="heading">
              <Typography variant="h1">Sample request</Typography>
              <div className="search-wrapper">
                <div className="form-group">
                  <InputLabel className="status-label">
                    Filter By Status
                  </InputLabel>
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
                    <MenuItem key={3} value="Rejected">
                      Rejected
                    </MenuItem>
                    <MenuItem key={6} value="Update">
                      Update
                    </MenuItem>
                    <MenuItem key={4} value="Pending Payment">
                      Pending Payment
                    </MenuItem>
                    <MenuItem key={5} value="With VRM">
                      With VRM
                    </MenuItem>
                    <MenuItem key={2} value="Shipped">
                      Shipped
                    </MenuItem>
                  </TextField>
                </div>
              </div>
            </div>
            <div className="quote-request-list">
              {!!data?.length ? (
                data.map((data, index) => {
                  return (
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
                                  <div className="left-title-inner brand-inner">
                                    <p className="title">Brand:</p>
                                    <div className="brand-container">
                                      <Typography variant="h3">
                                        {data?.supplier?.name}
                                      </Typography>
                                      <em>
                                        <img
                                          src={
                                            data?.supplier?.image
                                              ? data?.supplier?.image
                                              : NoImage
                                          }
                                          alt={index}
                                        />
                                      </em>
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
                                    <p className="title">Company:</p>
                                    <div className="value-container">
                                      <Typography variant="h3">
                                        {data?.user?.company
                                          ? data?.user?.company
                                          : "N/A"}
                                      </Typography>
                                    </div>
                                  </div>
                                  <div className="left-title-inner">
                                    <p className="title">Phone:</p>
                                    <div className="value-container">
                                      <Typography variant="h3">
                                        {data?.user?.phone
                                          ? data?.user?.phone
                                          : "N/A"}
                                      </Typography>
                                    </div>
                                  </div>
                                  <div className="left-title-inner">
                                    <p className="title">Staff Member:</p>
                                    <div className="value-container">
                                      <Typography variant="h3">
                                        new staff
                                      </Typography>
                                    </div>
                                  </div>
                                  <div className="left-title-inner">
                                    <p className="title">Address:</p>
                                    <div className="value-container">
                                      <Typography variant="h3">
                                        {!!data?.address
                                          ? data?.address
                                          : "N/A"}
                                      </Typography>
                                    </div>
                                  </div>
                                  <div className="left-title-inner">
                                    <p className="title">Notes:</p>
                                    <div className="value-container">
                                      <Typography variant="h3">
                                        {!!data?.notes ? data?.notes : "N/A"}
                                      </Typography>
                                    </div>
                                  </div>
                                  <div className="shipping-details">
                                    <div className="details-heading">
                                      <div>
                                        {data?.charge_request === "Rejected"
                                          ? "Charge Rejected by Client "
                                          : "Shipping Details"}
                                      </div>
                                      {/* <Button
                                      // onClick={() => backToclientList()}
                                      color="primary"
                                      title="View time-stamps"
                                      className="primary-border-btn back-btn"
                                    >
                                      History time-stamps
                                    </Button> */}
                                    </div>
                                    {data?.charge_request === "Rejected" ? (
                                      <div className="left-title-inner rejected-reason">
                                        {/* <p className="title">Reason:</p> */}
                                        <div className="value-container">
                                          <Typography variant="h3">
                                            &#x2022;
                                            {!!data?.charge_reject_reason
                                              ? " " + data?.charge_reject_reason
                                              : "N/A"}
                                          </Typography>
                                        </div>
                                      </div>
                                    ) : (
                                      <>
                                        {data?.staff_status ===
                                          "Pending Payment" && (
                                          <div className="left-title-inner">
                                            <p className="title">
                                              Charge Request:
                                            </p>
                                            <div className="value-container">
                                              <Typography variant="h3">
                                                {!!data?.charge_request
                                                  ? data?.charge_request
                                                  : "N/A"}
                                              </Typography>
                                            </div>
                                          </div>
                                        )}
                                        <div className="left-title-inner">
                                          <p className="title">
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
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="right-block">
                                  <div className="right-inner">
                                    {data?.staff_status === "With Vrm" ||
                                    data?.staff_status === "Shipped" ||
                                    (data?.staff_status === "Rejected" &&
                                      data?.charge_request !== "Rejected") ? (
                                      <div className="status-block">
                                        <p>
                                          Status:{" "}
                                          <span
                                          // className={
                                          //   data?.client_status === "Rejected"
                                          //     ? "redSpan"
                                          //     : "greenSpan"
                                          // }
                                          >
                                            {data?.staff_status}
                                          </span>
                                        </p>
                                      </div>
                                    ) : (
                                      <div className="form-group status-group">
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
                                            handleSampleStatus(data?.id, e)
                                          }
                                          value={data?.staff_status}
                                        >
                                          {data?.staff_status !== "Approved" &&
                                            data?.staff_status !==
                                              "Rejected" && (
                                              <MenuItem
                                                key={0}
                                                value={data?.staff_status}
                                                disabled
                                              >
                                                {data?.staff_status}
                                              </MenuItem>
                                            )}

                                          <MenuItem
                                            key={1}
                                            value={
                                              data?.staff_status === "Rejected"
                                                ? "Update"
                                                : "Approved"
                                            }
                                          >
                                            {data?.staff_status === "Rejected"
                                              ? "Update"
                                              : "Approved"}
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
            {!!data?.length && (
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
          staffStatus={staffStatus}
          handleStatusRequest={handleStatusRequest}
          formik={rejectedFormik}
        />
      </div>
    </Dialog>
  );
}

export default SampleRequestStaff;
