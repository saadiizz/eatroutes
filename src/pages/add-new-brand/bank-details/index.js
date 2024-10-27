import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import pdfIcon from "@assets/images/pdf.png";
import redEyeIcon from "@assets/images/red-eye.png";
import { countries } from "@utils/commonData";

function BankDetailsForm(props) {
  const { formik, handleFileChange } = props;
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    setCountriesData(countries);
  }, []);

  return (
    <>
      <div className="wirepayment-wrapper">
        <div className="wirepayment-text">
          <h2>UPLOAD WIRE PAYMENT INSTRUCTIONS (PDF)</h2>
          <h5>PDF UPLOADED MUST BE STAMPED AND SIGNED</h5>
        </div>
        <div>
          <div className="upload-image wirepayment-image">
            <img
              className="user-image wirepayment-image"
              src={pdfIcon}
              alt="profile img"
            />
            <TextField
              id="wirePaymentDetail"
              variant="outlined"
              type="file"
              multiple
              onChange={(e) =>
                handleFileChange(
                  e,
                  "file-wirePaymentDetail",
                  "wirePaymentDetail",
                  "Upload wirePaymentDetail"
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
          <span className="file-name" id="file-wirePaymentDetail">
            {formik.values.wirePaymentDetail
              ? formik.values.wirePaymentDetail?.name
                ? formik.values.wirePaymentDetail?.name
                : formik.values.wirePaymentDetail.split("/").pop()
              : null}
          </span>
          <div className="labelWithEye">
            {formik.values.wirePaymentDetail && (
              <a
                href={formik.values.wirePaymentDetailUrl}
                title="View pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={redEyeIcon} alt="view" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="form-group">
        <TextField
          name="bankName"
          id="bankName"
          label="Bank Name"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.bankName}
          error={formik.touched.bankName && Boolean(formik.errors.bankName)}
          helperText={formik.touched.bankName && formik.errors.bankName}
        />
      </div>
      <div className="form-group">
        <TextField
          id="bankAddress"
          name="bankAddress"
          label="Bank Address"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.bankAddress}
          error={
            formik.touched.bankAddress && Boolean(formik.errors.bankAddress)
          }
          helperText={formik.touched.bankAddress && formik.errors.bankAddress}
        />
      </div>
      <div className="form-group shrink-width">
        <TextField
          name="bankCity"
          id="bankCity"
          label="Bank City"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.bankCity}
          error={formik.touched.bankCity && Boolean(formik.errors.bankCity)}
          helperText={formik.touched.bankCity && formik.errors.bankCity}
        />
      </div>
      <div className="form-group shrink-width">
        <TextField
          name="bankState"
          id="bankState"
          label="Bank State/Province"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.bankState}
          error={formik.touched.bankState && Boolean(formik.errors.bankState)}
          helperText={formik.touched.bankState && formik.errors.bankState}
        />
      </div>
      <div className="form-group shrink-width">
        <TextField
          name="bankPostalCode"
          id="bankPostalCode"
          label="Bank Postal Code"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.bankPostalCode}
          error={
            formik.touched.bankPostalCode &&
            Boolean(formik.errors.bankPostalCode)
          }
          helperText={
            formik.touched.bankPostalCode && formik.errors.bankPostalCode
          }
        />
      </div>
      <div className="form-group shrink-width">
        <TextField
          select
          id="bankCountry"
          name="bankCountry"
          label="Bank Country"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.bankCountry}
          error={
            formik.touched.bankCountry && Boolean(formik.errors.bankCountry)
          }
          helperText={formik.touched.bankCountry && formik.errors.bankCountry}
        >
          <MenuItem
            value=""
            selected={!formik.values.bankCountry}
            disabled={formik.values.bankCountry}
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
      <div className="line-break" />
      <div className="form-group">
        <TextField
          name="beneficiaryName"
          id="beneficiaryName"
          label="Beneficiary Name"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.beneficiaryName}
          error={
            formik.touched.beneficiaryName &&
            Boolean(formik.errors.beneficiaryName)
          }
          helperText={
            formik.touched.beneficiaryName && formik.errors.beneficiaryName
          }
        />
      </div>
      <div className="form-group">
        <TextField
          id="beneficiaryAddress"
          name="beneficiaryAddress"
          label="Beneficiary Address"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.beneficiaryAddress}
          error={
            formik.touched.beneficiaryAddress &&
            Boolean(formik.errors.beneficiaryAddress)
          }
          helperText={
            formik.touched.beneficiaryAddress &&
            formik.errors.beneficiaryAddress
          }
        />
      </div>
      <div className="form-group shrink-width">
        <TextField
          name="beneficiaryCity"
          id="beneficiaryCity"
          label="Beneficiary City"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.beneficiaryCity}
          error={
            formik.touched.beneficiaryCity &&
            Boolean(formik.errors.beneficiaryCity)
          }
          helperText={formik.touched.beneficiaryCity && formik.errors.bankCity}
        />
      </div>
      <div className="form-group shrink-width">
        <TextField
          name="beneficiaryState"
          id="beneficiaryState"
          label="Beneficiary State/Province"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.beneficiaryState}
          error={
            formik.touched.beneficiaryState &&
            Boolean(formik.errors.beneficiaryState)
          }
          helperText={
            formik.touched.beneficiaryState && formik.errors.beneficiaryState
          }
        />
      </div>
      <div className="form-group shrink-width">
        <TextField
          name="beneficiaryPostalCode"
          id="beneficiaryPostalCode"
          label="Beneficiary Postal Code"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.beneficiaryPostalCode}
          error={
            formik.touched.beneficiaryPostalCode &&
            Boolean(formik.errors.beneficiaryPostalCode)
          }
          helperText={
            formik.touched.beneficiaryPostalCode &&
            formik.errors.beneficiaryPostalCode
          }
        />
      </div>
      <div className="form-group shrink-width">
        <TextField
          select
          id="beneficiaryCountry"
          name="beneficiaryCountry"
          label="Beneficiary Country"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.beneficiaryCountry}
          error={
            formik.touched.beneficiaryCountry &&
            Boolean(formik.errors.beneficiaryCountry)
          }
          helperText={
            formik.touched.beneficiaryCountry &&
            formik.errors.beneficiaryCountry
          }
        >
          <MenuItem
            value=""
            selected={!formik.values.beneficiaryCountry}
            disabled={formik.values.beneficiaryCountry}
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
      <div className="line-break" />
      <div className="form-group">
        <TextField
          name="accountNumber"
          id="accountNumber"
          label="Account Number"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.accountNumber}
          error={
            formik.touched.accountNumber && Boolean(formik.errors.accountNumber)
          }
          helperText={
            formik.touched.accountNumber && formik.errors.accountNumber
          }
        />
      </div>
      <div className="form-group">
        <TextField
          id="routingNumber"
          name="routingNumber"
          label="Routing Number"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.routingNumber}
          error={
            formik.touched.routingNumber && Boolean(formik.errors.routingNumber)
          }
          helperText={
            formik.touched.routingNumber && formik.errors.routingNumber
          }
        />
      </div>
      <div className="form-group">
        <TextField
          id="swiftCode"
          name="swiftCode"
          label="Swift Code"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.swiftCode}
          error={formik.touched.swiftCode && Boolean(formik.errors.swiftCode)}
          helperText={formik.touched.swiftCode && formik.errors.swiftCode}
        />
      </div>
    </>
  );
}

export default BankDetailsForm;
