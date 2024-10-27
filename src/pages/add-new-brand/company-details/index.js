import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import { addnewbrandStyle } from "../style";

function CompanyDetailsForm(props) {
  const classes = addnewbrandStyle();
  const { formik, state, handleFileChange } = props;

  return (
    <>
      {/* <div className="form-group">
        <TextField
          name="companyName"
          id="companyName"
          label="Company Name"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.companyName}
          error={
            formik.touched.companyName && Boolean(formik.errors.companyName)
          }
          helperText={formik.touched.companyName && formik.errors.companyName}
        />
      </div>
      <div className="form-group">
        <TextField
          id="companyAddress"
          name="companyAddress"
          label="Company Address"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.companyAddress}
          error={
            formik.touched.companyAddress &&
            Boolean(formik.errors.companyAddress)
          }
          helperText={
            formik.touched.companyAddress && formik.errors.companyAddress
          }
        />
      </div>
      <div className="form-group">
        <TextField
          name="brandName"
          id="brandName"
          label="Brand Name"
          type="text"
          variant="outlined"
          required
          onChange={formik.handleChange}
          value={formik.values.brandName}
          error={formik.touched.brandName && Boolean(formik.errors.brandName)}
          helperText={formik.touched.brandName && formik.errors.brandName}
        />
      </div>
      <div className="form-group">
        <TextField
          id="brandWebsite"
          name="brandWebsite"
          label="Brand Website"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.brandWebsite}
          error={
            formik.touched.brandWebsite && Boolean(formik.errors.brandWebsite)
          }
          helperText={formik.touched.brandWebsite && formik.errors.brandWebsite}
        />
      </div> */}
      <div className="form-group">
        <FormControl variant="outlined">
          <InputLabel className="label-text" htmlFor="image">
            Brand Image
          </InputLabel>
          <div className={classes.fileInput}>
            <TextField
              id="image"
              variant="outlined"
              type="file"
              multiple
              onChange={(e) =>
                handleFileChange(e, "file-image", "image", "Upload Brand Image")
              }
              InputProps={{
                inputProps: { accept: "image/*" },
              }}
              onClick={(event) => {
                event.target.value = null;
              }}
            />
            <div className="label-block">
              <span className="file-name" id="file-image">
                {formik.values.image
                  ? formik.values.image?.name
                    ? formik.values.image?.name
                    : formik.values.image.split("/").pop()
                  : "Upload Photo"}
              </span>
            </div>
          </div>
          <FormHelperText className="error-text">
            {formik.touched.image && formik.errors.image}
          </FormHelperText>
        </FormControl>
      </div>
      <div className="form-group-autocomplete hide-dropdown-icon">
        <InputLabel id="category-label">Categories</InputLabel>
        <Autocomplete
          id="categories"
          name="categories"
          limitTags={3}
          options={state?.brands?.categoriesData.map((o) => o.id)}
          disableCloseOnSelect
          getOptionLabel={(option) =>
            state?.brands?.categoriesData.find((o) => o.id === option)?.name
          }
          multiple
          onChange={(e, value) => formik.setFieldValue("categories", value)}
          value={formik.values.categories}
          renderInput={(params) => (
            <TextField
              className="autocomplete-textfield"
              {...params}
              variant="outlined"
              error={
                formik.touched.categories && Boolean(formik.errors.categories)
              }
              helperText={formik.touched.categories && formik.errors.categories}
            />
          )}
        />
      </div>
    </>
  );
}

export default CompanyDetailsForm;
