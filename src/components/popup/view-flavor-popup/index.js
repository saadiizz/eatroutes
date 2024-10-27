import React, { useState } from "react";
import { editcustomerStyle } from "./style";
import { commonStyle } from "@utils/commonStyle";
import { Typography, Link, Dialog } from "@mui/material";
import cx from "classnames";
import crossIcon from "@assets/images/cross-mark-white.svg";

function AddVariationDetails(props) {
  const [scroll] = useState("body");
  const classes = editcustomerStyle();
  const commonstyle = commonStyle();

  const { heading, open, handleClose, value } = props;

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
              <h4>Unit Cost</h4>
              <br></br>
              <p>{value?.price_per_case}</p>
            </div>
            <div className="form-group">
              <h4>MSRP</h4>
              <br></br>
              <p>{value?.msrp}</p>
            </div>
            <div className="form-group">
              <h4>Product Dimension</h4>
              <br></br>
              <p>{value?.product_dimension}</p>
            </div>

            <div className="form-group">
              <h4>Case Dimension (H*W*L)</h4>
              <p>{value?.case_dimension}</p>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default AddVariationDetails;
