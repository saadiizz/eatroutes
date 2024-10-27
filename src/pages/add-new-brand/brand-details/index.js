import React, { useState } from "react";
import {
  TextField,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Autocomplete,
  Chip,
} from "@mui/material";
import { addnewbrandStyle } from "../style";
import { getRole, getToken  } from "@utils/commonFunctions";
import MuiPhoneNumber from "material-ui-phone-number";
import { userRole } from "@utils/constant";
import EyeIcon from "@assets/images/eye.svg";
import EyeHideIcon from "@assets/images/eye-line.svg";
import galleryIcon from "@assets/images/gallery.png";
import redEyeIcon from "@assets/images/red-eye.png";

function BrandDetailsForm(props) {
  const classes = addnewbrandStyle();
  const { formik, handleFileChange, edit, state } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  return (
    <>
      <div className="profile-wrapper">
        <div className="upload-image">
          <img
            className="user-image"
            src={formik.values.imageUrl ? formik.values.imageUrl : galleryIcon}
            alt="profile img"
          />
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
        </div>
        <span className="file-name" id="file-image">
          {formik.values.image
            ? formik.values.image?.name
              ? formik.values.image?.name
              : formik.values.image.split("/").pop()
            : null}
        </span>
        <h4>Upload your brand logo</h4>
        <p>Recommended size: 500px x 500px</p>
      </div>

      <div className="form-group">
        <TextField
          required
          name="brandName"
          id="brandName"
          label="Brand Name"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.brandName}
          error={formik.touched.brandName && Boolean(formik.errors.brandName)}
          helperText={formik.touched.brandName && formik.errors.brandName}
        />
      </div>
      <div className="form-group">
        <TextField
          required
          id="brandWebsite"
          name="brandWebsite"
          label="Brand Website"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.brandWebsite}
          error={
            formik.touched.brandWebsite && Boolean(formik.errors.brandWebsite)
          }
          helperText={formik.touched.brandWebsite && formik.errors.brandWebsite}
        />
      </div>
      {(getRole() === userRole.vrm || !getToken()) && (
        <div className="form-group-autocomplete">
          <InputLabel id="category-label">Category *</InputLabel>
          {/* <Autocomplete
            id="categories"
            name="categories"
            openOnFocus={false}
            autoHighlight
            options={state?.brands?.categoriesData.map((o) => o.id)}
            getOptionLabel={(option) =>
              state?.brands?.categoriesData.find((o) => o.id === option)
                ?.name || ""
            }
            onChange={(e, value) => formik.setFieldValue("categories", value)}
            value={formik.values.categories}
            renderInput={(params) => (
              <TextField
                className="autocomplete-textfield"
                {...params}
                variant="outlined"
              />
            )}
          /> */}

          <Autocomplete
            id="categories"
            name="categories"
            multiple
            limitTags={3}
            openOnFocus={false}
            autoHighlight
            onBlur={formik.handleBlur}
            value={formik.values.categories}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
     
              
                return (
                  <Chip
                    {...getTagProps({ index })}
                    key={index}
                    label={
                      state?.brands?.categoriesData.find((o) => o.id === option)
                        ?.name
                    }
                  />
                );
              })
            }
            renderInput={(params) => (
              <TextField
                required
                className="autocomplete-textfield"
                {...params}
                variant="outlined"
                error={
                  formik.touched.categories && Boolean(formik.errors.categories)
                }
                helperText={
                  formik.touched.categories && formik.errors.categories
                }
             
              />
            )}
            options={state?.brands?.categoriesData?.map((o) => o.id)}
            getOptionLabel={(option) =>
              state?.brands?.categoriesData?.find((o) => o.id === option)
                ?.name || ""
            }
            onChange={(e, value) => {
         
              formik.setFieldValue("categories", value);
            }}
          />
        </div>
      )}
      <div className="form-group">
        <TextField
          required
          name="companyName"
          id="companyName"
          label="Company Legal Name"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.companyName}
          error={
            formik.touched.companyName && Boolean(formik.errors.companyName)
          }
          helperText={formik.touched.companyName && formik.errors.companyName}
        />
      </div>
      <div className="form-group">
        <TextField
          required
          id="companyAddress"
          name="companyAddress"
          label="Company Address"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
          required
          name="firstName"
          id="firstName"
          label="Contact First Name"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
      </div>
      <div className="form-group">
        <TextField
          required
          id="lastName"
          name="lastName"
          label="Contact Last Name"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
      </div>
      <div className="form-group phone-wrapper">
        <MuiPhoneNumber
          id="phone"
          name="phone"
          label="Contact Phone Number"
          dropdownClass={classes.countrySelect}
          defaultCountry={"us"}
          value={formik.values.phone}
          onChange={(e) =>
            formik.setFieldValue("phone", e.replace(/[\s-)(]+/g, ""))
          }
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          variant="outlined"
          required
        />
      </div>
      <div className="form-group phone-wrapper">
      <TextField
          required
          id="userName"
          name="userName"
          label="Contact User Name"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
        />
        </div>
      <div className="form-group">
        <TextField
          required
          id="emailAddress"
          name="emailAddress"
          label="Contact Email Address"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.emailAddress}
          error={
            formik.touched.emailAddress && Boolean(formik.errors.emailAddress)
          }
          helperText={formik.touched.emailAddress && formik.errors.emailAddress}
        />
      </div>
      {!edit && (
        <div className="form-group password-group">
          <TextField
            required
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span onClick={handleClick} edge="end">
                    {showPassword ? (
                      <img src={EyeIcon} alt="eye" />
                    ) : (
                      <img src={EyeHideIcon} alt="eye" />
                    )}
                  </span>
                </InputAdornment>
              ),
            }}
            id="assword"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
      )}
      {getRole() === userRole.brand && (
        <div className="form-group">
          <FormControl variant="outlined">
            <div className="labelWithEye">
              <InputLabel className="label-text" htmlFor="avatar">
                Contact Profile Image
              </InputLabel>
              {formik?.values?.avatarUrl && (
                <a
                  href={formik?.values?.avatarUrl}
                  title="View image"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={redEyeIcon} alt="view" />
                </a>
              )}
            </div>
            <div className={classes.fileInput}>
              <TextField
                id="avatar"
                name="avatar"
                variant="outlined"
                type="file"
                multiple
                onChange={(e) =>
                  handleFileChange(
                    e,
                    "file-avatar",
                    "avatar",
                    "Upload Profile Image"
                  )
                }
                InputProps={{
                  inputProps: { accept: "image/*" },
                }}
                onClick={(event) => {
                  event.target.value = null;
                }}
              />
              <div className="label-block">
                <span className="file-name" id="file-avatar">
                  {formik.values.avatar
                    ? formik.values.avatar?.name
                      ? formik.values.avatar?.name
                      : formik.values.avatar.split("/").pop()
                    : "Upload Avatar"}
                </span>
              </div>
            </div>
            <FormHelperText className="error-text">
              {formik.touched.avatar && formik.errors.avatar}
            </FormHelperText>
          </FormControl>
        </div>
      )}
    </>
  );
}

export default BrandDetailsForm;
