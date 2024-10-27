import React, { useState } from "react";
import { quoteSuccessStyle } from "./style";
import { commonStyle } from "@utils/commonStyle";
import { Dialog, DialogActions, Typography, Link } from "@mui/material";
import successIcon from "@assets/images/success-icon.png";
import crossIcon from "@assets/images/cross-mark.svg";

function SuccessPopup(props) {
  const [scroll] = useState("body");
  const classes = quoteSuccessStyle();
  const commonstyle = commonStyle();
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={commonstyle.successDialogWrapper}
    >
      <div className={classes.quoteSuccessWrapper}>
        <div className="success-popup-header">
          <DialogActions>
            <Link className="cross-btn" onClick={props.handleClose}>
              <img src={crossIcon} alt="Success Icon" />
            </Link>
          </DialogActions>
        </div>
        <div className="success-popup-body">
          <em className="success-icon-wrapper">
            <img src={successIcon} alt="Success Icon" />
          </em>
          <Typography variant="h2">Congratulations !</Typography>
          <p>{props.text}</p>
        </div>
      </div>
    </Dialog>
  );
}

export default SuccessPopup;
