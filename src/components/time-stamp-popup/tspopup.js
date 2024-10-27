import React, { useState } from "react";
import {
  Dialog,
  Link,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import cx from "classnames";
import crossIcon from "@assets/images/cross-mark-white.svg";
import { popupStyle } from "./style";
import dropDownIcon from "@assets/images/down-arrow-red.svg";
import dropDownGrayIcon from "@assets/images/down-arrow-gray.svg";
import NoData from "@components/no-data";
import { utcToLocal } from "@utils/commonFunctions";
import redEyeIcon from "@assets/images/red-eye.png";

function TimeStampPopup(props) {
  const classes = popupStyle();
  const { data } = props;
  const [scroll] = useState("body");
  const [expanded, setExpanded] = useState(0);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Dialog
      open={props.open}
      scroll={scroll}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={cx(classes.customDialogWrapper)}
    >
      <div className={classes.popupWrapper}>
        <div className="popup-header">
          <Typography variant="h4">
            History
            <Link className="cross-btn" onClick={props.handleClose}>
              <img src={crossIcon} alt="Success Icon" />
            </Link>
          </Typography>
        </div>
        <div className="popup-content">
          <div className={classes.quoteRequestWrapper}>
            <div className="quote-page-wrapper">
              <div className="container">
                <div className="quote-request-list">
                  {data?.map((obj, index) => {
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
                                  <div className="main-title">
                                    {`Updated by ${obj?.update_by?.role} ${
                                      obj?.update_by?.first_name || ""
                                    } ${obj?.update_by?.last_name || ""} `}
                                  </div>
                                  <div className="updated-date">
                                    <span>Updated at </span>
                                    {utcToLocal(
                                      obj?.at_dateTime,
                                      "MMMM DD, YYYY"
                                    )}
                                  </div>
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
                                    {obj?.changes.map((o, i) => {
                                      return (
                                        (!!o?.updated_value ||
                                          !!o?.old_value) &&
                                        o?.field_name !== "Charge" && (
                                          <div
                                            className="left-title-inner"
                                            key={i}
                                          >
                                            <p className="title">
                                              {o?.field_name === "Charge Amount"
                                                ? "Cost to Ship Samples ($USD)"
                                                : o?.field_name}
                                              :{" "}
                                            </p>
                                            <div className="value-container">
                                              {o?.field_name === "Pdf" ? (
                                                <>
                                                  {o?.old_value ? (
                                                    <Typography
                                                      variant="h3"
                                                      className="view-pdf"
                                                    >
                                                      old_pdf
                                                      {` `}
                                                      <a
                                                        href={o?.old_value}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                      >
                                                        <img
                                                          src={redEyeIcon}
                                                          alt="view"
                                                        />
                                                      </a>
                                                    </Typography>
                                                  ) : (
                                                    "-"
                                                  )}
                                                  <span
                                                    variant="h3"
                                                    className="right-arrow"
                                                  >
                                                    &rarr;
                                                  </span>
                                                  {o?.updated_value ? (
                                                    <Typography
                                                      variant="h3"
                                                      className="view-pdf updated-value"
                                                    >
                                                      new_pdf
                                                      {` `}
                                                      <a
                                                        href={o?.updated_value}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                      >
                                                        <img
                                                          src={redEyeIcon}
                                                          alt="view"
                                                        />
                                                      </a>
                                                    </Typography>
                                                  ) : (
                                                    "-"
                                                  )}
                                                </>
                                              ) : (
                                                <>
                                                  <Typography
                                                    variant="h3"
                                                    className="redSpan"
                                                  >
                                                    {!!o?.old_value
                                                      ? o?.old_value
                                                      : "-"}
                                                  </Typography>
                                                  <span
                                                    variant="h3"
                                                    className="right-arrow"
                                                  >
                                                    &rarr;
                                                  </span>
                                                  <Typography
                                                    variant="h3"
                                                    className="updated-value"
                                                  >
                                                    {!!o?.updated_value
                                                      ? o?.updated_value
                                                      : "-"}
                                                  </Typography>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        )
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </div>
                    );
                  })}
                  {data?.length === 0 && <NoData text="No history found" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
export default TimeStampPopup;
