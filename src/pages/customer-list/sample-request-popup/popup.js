import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  Link,
  Typography,
  TextField,
  Checkbox,
} from "@mui/material";
import { commonStyle } from "@utils/commonStyle";
import cx from "classnames";
import crossIcon from "@assets/images/cross-mark-white.svg";
import { popupStyle } from "./style";
import { allowOnlyNumbers } from "@utils/commonFunctions";
import { useFormik } from "formik";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";

function Popup(props) {
  const classes = popupStyle();
  const commonstyle = commonStyle();
  const [isValue, setIsValue] = useState(false);
  const [scroll] = useState("body");
  const { formik, handleStatusRequest } = props;
  const { status, id } = props?.staffStatus;

  const handleCheckbox = () => {
    setIsValue(!isValue);
  };

  const approvedFormik = useFormik({
    initialValues: schema.requestSampleApprovedSchema,
    validationSchema:
      isValue && validationSchema.requestSampleApprovedValidationSchema,
    onSubmit: (value) => {
      value = {
        charge_amount: isValue ? value.charge_amount : 0,
        charge: isValue ? 1 : 0,
      };
      handleApprovedRequest(value);
    },
  });

  const handleApprovedRequest = (value) => {
    handleStatusRequest(id, status, value);
    handleClose();
  };

  const handleClose = () => {
    setIsValue(false);
    approvedFormik.handleReset();
    props.handleClose();
  };

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
            {status === "Approved"
              ? "Approve request"
              : status === "Update"
              ? "Update request"
              : "Reject sample request"}
            <Link className="cross-btn" onClick={handleClose}>
              <img src={crossIcon} alt="Success Icon" />
            </Link>
          </Typography>
        </div>
        <div className="popup-content">
          <div className="form-wrapper">
            {status === "Approved" || status === "Update" ? (
              <>
                <div className="charge-container">
                  <p>Is there a charge ?</p>
                  <Checkbox
                    checked={isValue}
                    onChange={(e) => handleCheckbox(e)}
                    inputProps={{ "aria-label": "controlled" }}
                  />{" "}
                  Yes
                  <Checkbox
                    checked={!isValue}
                    onChange={(e) => handleCheckbox(e)}
                    inputProps={{ "aria-label": "controlled" }}
                  />{" "}
                  No
                </div>
                {isValue && (
                  <div className="form-group full-width">
                    <TextField
                      id="charge_amount"
                      name="charge_amount"
                      label="Cost to Ship Samples ($USD)"
                      type="number"
                      variant="outlined"
                      placeholder="Enter Charge to Ship Samples"
                      onChange={approvedFormik.handleChange}
                      value={approvedFormik.values.charge_amount}
                      error={
                        approvedFormik.touched.charge_amount &&
                        Boolean(approvedFormik.errors.charge_amount)
                      }
                      helperText={
                        approvedFormik.touched.charge_amount &&
                        approvedFormik.errors.charge_amount
                      }
                      onKeyPress={allowOnlyNumbers}
                    />
                  </div>
                )}
              </>
            ) : status === "Rejected" ? (
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
                  placeholder="Enter reason to reject sample request"
                  multiline
                  rows={2}
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <DialogActions>
            <Button
              className="primary-btn"
              onClick={
                status === "Approved" || status === "Update"
                  ? approvedFormik.handleSubmit
                  : formik.handleSubmit
              }
            >
              Submit
            </Button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
}
export default Popup;
