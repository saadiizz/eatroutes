import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { commonStyle } from "@utils/commonStyle";
import cx from "classnames";

import { ConfirmPopupStyle } from "./style";

function ConfirmPopup(props) {
  const classes = ConfirmPopupStyle();
  const commonstyle = commonStyle();

  const [scroll] = useState("body");
  return (
    <div className={classes.ConfirmWrapper}>
      <Dialog
        open={props.open}
        scroll={scroll}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={cx(commonstyle.customDialogWrapper, classes.customModal)}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.confirmText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleClose}
            color="primary"
            className="primary-border-btn"
          >
            Cancel
          </Button>
          <Button
            onClick={props.handleConfirm}
            color="primary"
            className="primary-btn"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ConfirmPopup;
