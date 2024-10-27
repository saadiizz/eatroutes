import React, { useState } from "react";
import { editcustomerStyle } from "./style";
import { commonStyle } from "@utils/commonStyle";
import {
  Button,
  Typography,
  Link,
  Dialog,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  TextField,
  DialogContent,
} from "@mui/material";
import cx from "classnames";
import crossIcon from "@assets/images/cross-mark-white.svg";
import { measurementList } from "@utils/commonData";

function AddVariationSize(props) {
  const [scroll] = useState("body");
  const classes = editcustomerStyle();
  const commonstyle = commonStyle();

  const { heading, open, handleClose, showDynamicForm, formik } = props;

  return (
    <Dialog
      open={open}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={cx(commonstyle.customDialogWrapper, classes.smallPopup)}
    >
      <div className={classes.editcustomerWrapper}>
        <div className="popup-header">
          <Typography variant="h4">
            {heading}
            <Link className="cross-btn" onClick={handleClose}>
              <img src={crossIcon} alt="Success Icon" />
            </Link>
          </Typography>
        </div>
        <DialogContent style={{ display: "flex" }}>
          <DialogContentText
            style={{ marginLeft: "0.8rem", marginTop: "2rem" }}
            id="alert-dialog-description"
          >
            What size do you want to add?
          </DialogContentText>

          <TextField
            style={{ marginLeft: "1rem", marginTop: "1rem", width: "11.5rem" }}
            name="flavorName"
            id="flavorName"
            type="text"
            defaultValue={props.fieldData}
            onChange={(event) => {
              const updatedInputValue = event.target.value;
              props.setAddVariationValue({
                ...props.addVariationValue,
                variationSubOption: updatedInputValue,
              });
            }}
          />
        </DialogContent>
        <div className="popup-content">
          {showDynamicForm &&
            !!formik.values.variationTypes &&
            !!formik?.values?.subVariations.length && (
              <div className="form-group-autocomplete hide-dropdown-icon">
                <FormControl className="filter-category-wrapper">
                  <InputLabel id="measurement-label" required>
                    Please select unit of measurement
                  </InputLabel>
                  <div className="measurment-btn-wrapper">
                    {measurementList.map((data) => {
                      return (
                        <Button
                          color="primary"
                          className={`${
                            formik?.values?.measurement?.id === data?.id
                              ? "measurment-btn"
                              : "measurment-border-btn"
                          }`}
                          onClick={() =>
                            formik.setFieldValue("measurement", data)
                          }
                          key={data?.id}
                        >
                          {data?.label.toUpperCase()}
                        </Button>
                      );
                    })}
                  </div>
                </FormControl>
              </div>
            )}
          <DialogContentText id="alert-dialog-description">
            {props.confirmText}
          </DialogContentText>
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
              className="primary-border-btn"
              disabled={!formik?.values?.measurement?.id}
            >
              Add
            </Button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
}

export default AddVariationSize;
