import React, { useState } from "react";
import { TextField } from "@mui/material";
import pdfIcon from "@assets/images/pdf.png";
import csvIcon from "@assets/images/csv.png";
import redEyeIcon from "@assets/images/red-eye.png";
import CsvPopup from "./csv-popup";

function DocumentDetailsForm(props) {
  const { formik, handleFileChange } = props;

  const [openPopup, setOpePopup] = useState(false);

  return (
    <>
      <div className="document-wrapper">
        <div className="upload-image">
          <img className="user-image" src={pdfIcon} alt="pdf img" />
          <TextField
            id="catalogForm"
            variant="outlined"
            type="file"
            onChange={(e) =>
              handleFileChange(
                e,
                "file-catalogForm",
                "catalogForm",
                "Upload catalogForm"
              )
            }
            InputProps={{
              inputProps: { accept: ".pdf" },
            }}
            onClick={(event) => {
              event.target.value = null;
            }}
          />
        </div>
<span className="file-name" id="file-catalogForm">
          {formik.values.catalogForm
            ? formik.values.catalogForm?.name
              ? formik.values.catalogForm?.name
              : formik.values.catalogForm.split("/").pop()
            : null}
        </span>
        <div className="labelWithEye">
          {formik.values.catalogForm && (
            <a
              href={formik.values.catalogFormUrl}
              title="View pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={redEyeIcon} alt="view" />
            </a>
          )}
        </div>
        <h4>Upload Your Brand Deck (PDF)</h4>

      {formik?.values?.catalogForm?.size > 5000000 &&  <p style={{"color":"#d32f2f"}}>File Size should be less than 5 mb</p> }
        <p>
          This document should provide an overview
          <br />
          of your brand, featured product lines, and
          <br />
          benefits. You can always add or edit later
        </p>
      </div>

      <div className="document-wrapper">
        <div className="upload-image">
          <img className="user-image" src={csvIcon} alt="pdf img" />
          <TextField
            id="orderForm"
            variant="outlined"
            type="file"
            onChange={(e) =>
              handleFileChange(
                e,
                "file-orderForm",
                "orderForm",
                "Upload orderForm"
              )
            }
            InputProps={{
              inputProps: { accept: ".csv , .txt" },
            }}
            onClick={(event) => {
              event.target.value = null;
            }}
          />
        </div>
        <span className="file-name" id="file-orderForm">
          {formik.values.orderForm
            ? formik.values.orderForm?.name
              ? formik.values.orderForm?.name
              : formik.values.orderForm.split("/").pop()
            : null}
        </span>
        <div className="labelWithEye">
          {formik.values.orderForm && (
            <a
              href={formik.values.orderFormUrl}
              title="View csv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={redEyeIcon} alt="view" />
            </a>
          )}
        </div>
        <div className="csv-info">
          <p>
            <a href="https://eatroutes-stage.s3.ca-central-1.amazonaws.com/supplier_csv/sample_csv/sample_product_import.xlsx">
              Touch here to download bulk import csv template{" "}
            </a>
            <span className="i-btn" onClick={() => setOpePopup(true)}>
              i
            </span>
          </p>
        </div>
        <h4>Upload Your Brand's Order Form (CSV)</h4>
        <p>
          This document should provide an overview
          <br />
          of your brand, featured product lines, and
          <br />
          benefits. You can always add or edit later
        </p>
      </div>

      <div className="document-wrapper">
        <div className="upload-image">
          <img className="user-image" src={pdfIcon} alt="pdf img" />
          <TextField
            id="businessLicense"
            variant="outlined"
            type="file"
            onChange={(e) =>
              handleFileChange(
                e,
                "file-businessLicense",
                "businessLicense",
                "Upload businessLicense"
              )
            }
            InputProps={{
              inputProps: { accept: ".pdf" },
            }}
            onClick={(event) => {
              event.target.value = null;
            }}
          />
        </div>
        <span className="file-name" id="file-businessLicense">
          {formik.values.businessLicense
            ? formik.values.businessLicense?.name
              ? formik.values.businessLicense?.name
              : formik.values.businessLicense.split("/").pop()
            : null}
        </span>
        <div className="labelWithEye">
          {formik?.values?.businessLicenseUrl && (
            <a
              href={formik?.values?.businessLicenseUrl}
              title="View pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={redEyeIcon} alt="view" />
            </a>
          )}
        </div>

        <h4>Upload Your Brand's Active Business Licence</h4>
        <p>
          This document will be used to import
          <br />
          your products to application.
          <br />
          You can always add or edit later
        </p>
      </div>
      <CsvPopup open={openPopup} handleClose={() => setOpePopup(false)} />
    </>
  );
}

export default DocumentDetailsForm;
