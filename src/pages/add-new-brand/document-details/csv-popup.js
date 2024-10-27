import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Link,
  DialogActions,
} from "@mui/material";
import { commonStyle } from "@utils/commonStyle";
import cx from "classnames";
import crossIcon from "@assets/images/cross-mark.svg";

import { ConfirmationPopupStyle } from "./style";

function CsvPopup(props) {
  const classes = ConfirmationPopupStyle();
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
        <div className="success-popup-header">
          <DialogActions>
            <Link className="cross-btn" onClick={props.handleClose}>
              <img src={crossIcon} alt="Success Icon" />
            </Link>
          </DialogActions>
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            In order to upload multiple products in bulk, our system requires
            your products to be listed in a specific format. By downloading this
            template CSV file, you are able to format your product list in the
            specified format for bulk upload. If you require assistance, simply
            upload your product list and details in any CSV format of your
            choosing, and an Eat Routes team member will make the changes for
            you.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default CsvPopup;
