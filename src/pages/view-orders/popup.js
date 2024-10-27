import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  Link,
  Typography,
  TextField,
} from "@mui/material";
import { commonStyle } from "@utils/commonStyle";
import cx from "classnames";
import crossIcon from "@assets/images/cross-mark-white.svg";
import { popupStyle } from "./style";

function Popup(props) {
  const classes = popupStyle();
  const commonstyle = commonStyle();
  const [scroll] = useState("body");
  const { formik } = props;
  return (
    <Dialog
      open={props.open}
      scroll={scroll}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={cx(commonstyle.customDialogWrapper, classes.customModal)}
    >
      <div className={classes.popupWrapper}>
        <div className="popup-header">
          <Typography variant="h4">
            Reject Quote request
            <Link className="cross-btn" onClick={props.handleClose}>
              <img src={crossIcon} alt="Success Icon" />
            </Link>
          </Typography>
        </div>
        <div className="popup-content">
          <div className="form-wrapper">
            <div className="form-group full-width">
              <TextField
                id="reason"
                name="reason"
                className="reject-reason"
                label="Reason"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.reason}
                error={formik.touched.reason && Boolean(formik.errors.reason)}
                helperText={formik.touched.reason && formik.errors.reason}
                placeholder="Enter reason to reject request"
                multiline
                rows={2}
              />
            </div>
          </div>

          <DialogActions>
            <Button className="primary-btn" onClick={formik.handleSubmit}>
              Submit
            </Button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
}
export default Popup;
