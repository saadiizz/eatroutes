import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { commonStyle } from "@utils/commonStyle";
import cx from "classnames";

import { ConfirmationPopupStyle } from "./style";

function AddFlavorSize(props) {
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
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.confirmText}
          </DialogContentText>

          <TextField
            style={{ width: "20rem" }}
            name="flavorName"
            id="flavorName"
            type="text"
            defaultValue={props.fieldData}
            onChange={(event) => {
              const updatedInputValue = event.target.value;
              props.setAddVariationValue({
                ...props.addVariationValue,
                variationOption: updatedInputValue,
              });
            }}
          />
        </DialogContent>
        <DialogActions style={{ marginTop: "2rem" }}>
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
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddFlavorSize;
