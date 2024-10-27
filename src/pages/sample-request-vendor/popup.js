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
  const { status } = props?.statusData;
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
            {status === "Shipped" ? "Shipping" : "Reject sample request"}
            <Link className="cross-btn" onClick={props.handleClose}>
              <img src={crossIcon} alt="Success Icon" />
            </Link>
          </Typography>
        </div>
        <div className="popup-content">
          <div className="form-wrapper">
            {status === "Shipped" && (
              <>
                <div className="form-group full-width">
                  <TextField
                    id="tracking_url"
                    name="tracking_url"
                    label="Tracking URL"
                    type="text"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.tracking_url}
                    error={
                      formik.touched.tracking_url &&
                      Boolean(formik.errors.tracking_url)
                    }
                    helperText={
                      formik.touched.tracking_url && formik.errors.tracking_url
                    }
                  />
                </div>
              </>
            )}
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
