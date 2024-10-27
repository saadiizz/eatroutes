import React, { useState } from "react";
import { editcustomerStyle } from "./style";
import { commonStyle } from "@utils/commonStyle";
import {
  Button,
  Typography,
  Link,
  Dialog,
  TextField,
  DialogActions,
} from "@mui/material";

import { userRole } from "@utils/constant";
import { getRole } from "@utils/commonFunctions";
import cx from "classnames";
import crossIcon from "@assets/images/cross-mark-white.svg";
import { allowOnlyDecimal, allowOnlyNumbers } from "@utils/commonFunctions";

function AddVariationDetails(props) {
  const [scroll] = useState("body");
  const classes = editcustomerStyle();
  const commonstyle = commonStyle();

  const { heading, open, handleClose, value, handleChange, handleSubmit } =
    props;

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
        <div className="popup-content">
          <div className="form-wrapper inline-groups">
            <div className="form-group">
              <TextField
                name="unit_price"
                id="unit_price"
                label="Unit Cost"
                type="text"
                variant="outlined"
                onChange={handleChange}
                value={value?.unit_price}
                onKeyPress={allowOnlyNumbers}
              />
            </div>
            <div className="form-group">
              <TextField
                name="msrp"
                id="msrp"
                label="MSRP"
                type="text"
                variant="outlined"
                onChange={handleChange}
                value={value?.msrp}
                onKeyPress={allowOnlyDecimal}
              />
            </div>
            <div className="form-group">
              <TextField
                id="product_dimension"
                name="product_dimension"
                label="Product Dimension (H*W*L)"
                type="text"
                variant="outlined"
                onChange={handleChange}
                value={value?.product_dimension}
              />
            </div>

            <div className="form-group">
              <TextField
                id="case_dimension"
                name="case_dimension"
                label="Case Dimension (H*W*L)"
                type="text"
                variant="outlined"
                onChange={handleChange}
                value={value?.case_dimension}
              />
            </div>
            {getRole() === userRole.vrm && (
              <>
                {" "}
                <div className="form-group">
                  <TextField
                    id="units_per_case"
                    name="units_per_case"
                    label="Units Per Case"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                    value={value?.units_per_case}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="units_per_master_case"
                    name="units_per_master_case"
                    label="Units Per Master Case"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                    value={value?.units_per_master_case}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="units_per_pallet"
                    name="units_per_pallet"
                    label="Units Per Pallet"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                    value={value?.units_per_pallet}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="pallet_length"
                    name="pallet_length"
                    label="Pallet Length"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                    value={value?.pallet_length}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="pallet_width"
                    name="pallet_width"
                    label="Pallet Width"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                    value={value?.pallet_width}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="pallet_height"
                    name="pallet_height"
                    label="Pallet Height"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                    value={value?.pallet_height}
                  />
                </div>
              </>
            )}
          </div>
          <DialogActions>
            <Button
              className="primary-btn"
              onClick={handleSubmit}
              disabled={
                !value?.unit_price &&
                !value?.msrp &&
                !value?.product_dimension &&
                !value?.case_dimension &&
                !value?.units_per_case &&
                !value?.units_per_master_case &&
                !value?.units_per_pallet &&
                !value?.pallet_length &&
                !value?.pallet_width &&
                !value?.pallet_height
              }
            >
              Save
            </Button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
}

export default AddVariationDetails;
