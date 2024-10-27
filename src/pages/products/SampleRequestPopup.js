import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  Link,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { commonStyle } from "@utils/commonStyle";
import cx from "classnames";
import crossIcon from "@assets/images/cross-mark-white.svg";
import { popupStyle } from "./style";
import { countries } from "@utils/commonData";

function SampleRequestPopup(props) {
  const classes = popupStyle();
  const commonstyle = commonStyle();
  const { formik, brandName } = props;
  const [countriesData, setCountriesData] = useState([]);
  const [scroll] = useState("body");
  useEffect(() => {
    setCountriesData(countries);
  }, []);

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
            Sample Request
            <Link className="cross-btn" onClick={props.handleClose}>
              <img src={crossIcon} alt="Success Icon" />
            </Link>
          </Typography>
        </div>
        <div className="popup-content">
          <div className="form-wrapper">
            <div className="form-group full-width">
              <TextField
                required
                id="address"
                name="address"
                label="Shipping Address"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.address}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                placeholder="Enter Address would you like your sample box shipped to"
              />
            </div>

            <div className="form-group">
              <TextField
                id="city"
                name="city"
                label="City"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.city}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                required
              />
            </div>

            <div className="form-group">
              <TextField
                id="state"
                name="state"
                label="State / Province"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.state}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
                required
              />
            </div>

            <div className="form-group">
              <TextField
                id="postal_code"
                name="postal_code"
                label="Postal/Zip"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.postal_code}
                error={
                  formik.touched.postal_code &&
                  Boolean(formik.errors.postal_code)
                }
                helperText={
                  formik.touched.postal_code && formik.errors.postal_code
                }
              />
            </div>

            <div className="form-group">
              <TextField
                select
                id="country"
                name="country"
                label="Country"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.country}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
                required
              >
                <MenuItem
                  value=""
                  selected={!formik.values.country}
                  disabled={!!formik.values.country}
                >
                  Select Country
                </MenuItem>
                {!!countriesData?.length &&
                  countriesData?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.code}>
                        {item.label}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </div>

            <div className="form-group full-width">
              <TextField
                id="notes"
                name="notes"
                className="reject-reason"
                label={`Are there specific ${brandName} products you're most interested in?`}
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.notes}
                multiline
                rows={2}
              />
            </div>

            <div className="form-group full-width">
              <TextField
                id="request"
                name="request"
                className="reject-reason"
                label={`Do you have any special requests (e.g. custom invoice)?`}
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.request}
                multiline
                rows={2}
              />
            </div>
          </div>

          <DialogActions>
            <Button
              className="primary-btn"
              type="submit"
              onClick={formik.handleSubmit}
            >
              Submit
            </Button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
}
export default SampleRequestPopup;
