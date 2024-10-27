import React from "react";
import { TextField, Button } from "@mui/material";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { useFormik } from "formik";

export const ShopForm = (props) => {
  const { data } = props;
  const approveFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      sales_order: data?.sales_order
        ? data?.sales_order
        : schema.requestQuoteStaffApprovedSchema.sales_order,
      tracking_url: data?.tracking_url
        ? data?.tracking_url
        : schema.requestQuoteStaffApprovedSchema.tracking_url,
      // estimated_date: data?.estimated_date
      //   ? data?.estimated_date
      //   : schema.requestQuoteStaffApprovedSchema.estimated_date,
    },
    validationSchema:
      validationSchema.requestQuoteStaffApprovedValidationSchema,
    onSubmit: (value) => {
      props.handleStatusRequest(data?.quote_id, "Submit", value);
    },
  });

  return (
    <div className="shipping-details" key={data?.quote_id}>
      <div className="child-heading">Shipping Details</div>
      <div className="left-title-inner shipping-form">
        <p className="title">Sales Order:</p>
        <div className="form-group full-width">
          <TextField
            id="sales_order"
            name="sales_order"
            type="number"
            className="shipping-input"
            variant="outlined"
            onChange={approveFormik.handleChange}
            placeholder="Enter Sales No."
            value={approveFormik.values.sales_order}
            error={
              approveFormik.touched.sales_order &&
              Boolean(approveFormik.errors.sales_order)
            }
            helperText={
              approveFormik.touched.sales_order &&
              approveFormik.errors.sales_order
            }
          />
        </div>
      </div>
      <div className="left-title-inner shipping-form">
        <p className="title">Traking URL:</p>
        <div className="form-group full-width">
          <TextField
            className="shipping-input"
            id="tracking_url"
            name="tracking_url"
            type="text"
            variant="outlined"
            placeholder="Enter tracking URL"
            onChange={approveFormik.handleChange}
            value={approveFormik.values.tracking_url}
            // inputProps={{ pattern: "https://" }}
            error={
              approveFormik.touched.tracking_url &&
              Boolean(approveFormik.errors.tracking_url)
            }
            helperText={
              approveFormik.touched.tracking_url &&
              approveFormik.errors.tracking_url
            }
          />
        </div>
      </div>
      {/* <div className="left-title-inner shipping-form">
        <p className="title">Est. Date of Arrival:</p>
        <div className="form-group full-width">
          <TextField
            className="date-input"
            id="estimated_date"
            name="estimated_date"
            type="date"
            variant="outlined"
            onChange={approveFormik.handleChange}
            onSelect={approveFormik.handleBlur}
            value={approveFormik.values.estimated_date}
            defaultValue={null}
            error={
              approveFormik.touched.estimated_date &&
              Boolean(approveFormik.errors.estimated_date)
            }
            helperText={
              approveFormik.touched.estimated_date &&
              approveFormik.errors.estimated_date
            }
          />
        </div>
      </div> */}
      {data?.tracking_url ? (
        <Button
          onClick={approveFormik.handleSubmit}
          color="primary"
          type="submit"
          className="primary-border-btn shipping-btn"
          disabled={!(approveFormik.values.tracking_url !== data?.tracking_url)}
        >
          Update
        </Button>
      ) : (
        <Button
          onClick={approveFormik.handleSubmit}
          color="primary"
          type="submit"
          className="primary-border-btn shipping-btn"
        >
          Save
        </Button>
      )}
    </div>
  );
};
