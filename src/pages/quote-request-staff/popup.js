import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  Link,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
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
            {status === "Ready" ? "Ready" : "Update"}
            <Link className="cross-btn" onClick={props.handleClose}>
              <img src={crossIcon} alt="Success Icon" />
            </Link>
          </Typography>
        </div>
        <div className="popup-content">
          <div className="form-wrapper">
            {(status === "Ready" || status === "Update") && (
              <>
                <div className="form-group full-width">
                  <InputLabel className="status-label">File</InputLabel>
                  <FormControl variant="outlined">
                    <div className={classes.fileInput}>
                      <TextField
                        id="pdf"
                        variant="outlined"
                        name="pdf"
                        type="file"
                        multiple
                        onChange={(e) =>
                          formik.setFieldValue("pdf", e.target.files[0])
                        }
                        onBlur={formik.handleBlur}
                        InputProps={{
                          inputProps: { accept: ".pdf" },
                        }}
                        required
                      />
                      <div className="label-block">
                        <span className="file-name" id="file-name">
                          {formik.values.pdf
                            ? formik.values.pdf?.name
                              ? formik.values.pdf?.name
                              : formik.values.pdf.split("/").pop()
                            : "Upload PDF file"}
                        </span>
                      </div>
                    </div>
                    <FormHelperText className="error-text">
                      {formik.touched.pdf && formik.errors.pdf}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div className="form-group full-width">
                  <TextField
                    id="notes"
                    name="notes"
                    className="reject-reason"
                    label="Notes"
                    type="text"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.notes}
                    error={formik.touched.notes && Boolean(formik.errors.notes)}
                    helperText={formik.touched.notes && formik.errors.notes}
                    multiline
                    rows={2}
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
