import React, { useState } from "react";
import { otherRegulatoryStyle } from "./style";
import { commonStyle } from "@utils/commonStyle";
import {
  Button,
  Dialog,
  DialogActions,
  Typography,
  TextField,
} from "@mui/material";
import cx from "classnames";

function OtherRegulatory(props) {
  const [scroll] = useState("body");
  const classes = otherRegulatoryStyle();
  const commonstyle = commonStyle();
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={cx(commonstyle.customDialogWrapper, classes.smallPopup)}
    >
      <div className={classes.OtherRegulatoryWrapper}>
        <div className="popup-header">
          <Typography variant="h4">Other Regulatory</Typography>
        </div>
        <div className="regulatory-popup-content">
          <div className="form-wrapper">
            <div className="form-group">
              <TextField
                id="other-regulatory"
                label="Add Other Regulatory"
                type="text"
                variant="outlined"
                value={props.otherRegulatory}
                onChange={props.handleChange}
                error={!!props.error}
                helperText={props.error && props.error}
              />
            </div>
          </div>
        </div>
        <DialogActions>
          <Button className="primary-btn" onClick={props.handleSubmit}>
            Confirm
          </Button>
          <Button className="primary-border-btn" onClick={props.handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

export default OtherRegulatory;
