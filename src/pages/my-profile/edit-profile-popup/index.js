import React, { useState, useEffect } from "react";
import { editprofileStyle } from "./style";
import { commonStyle } from "@utils/commonStyle";
import {
  Button,
  Typography,
  Link,
  Dialog,
  TextField,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
} from "@mui/material";
import cx from "classnames";
import crossIcon from "@assets/images/cross-mark-white.svg";
import { countries } from "@utils/commonData";
import MuiPhoneNumber from "material-ui-phone-number";
import { PrimarySaleData } from "../../../utils/commonData";
import { useTheme } from "@mui/material/styles";
import {
  FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
} from "@utils/actionType";
import { useStore } from "@store/store";
import API from "@services/axios";
import { toast } from "react-toastify";

function EditProfile(props) {
  const theme = useTheme();
  const [state, dispatch] = useStore();
  const [scroll] = useState("body");
  const classes = editprofileStyle();
  const commonstyle = commonStyle();
  const [countriesData, setCountriesData] = useState([]);
  const [saleMethod, setSaleMethod] = React.useState([]);
  const [region, setRegion] = React.useState([]);
  const [regionData, setRegionData] = React.useState(props.regions);
  const [selectedCountry, setSelectedCountry] = useState("us");
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function saleMethodStyles(accesData, saleMethod, theme) {
    return {
      fontWeight:
        saleMethod?.indexOf(accesData) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handlePrimarySaleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSaleMethod(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    if (formik) {
      formik.setFieldValue(
        "primaryMethodOfSale",
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  const handleRegionChange = (event) => {
    const {
      target: { value },
    } = event;

    setRegion(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    if (formik) {
      formik.setFieldValue(
        "regionsToSell",
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  const getRegions = () => {
    dispatch({ type: FETCH_BRANDS });
    API.get("/countries")
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_BRANDS_SUCCESS,
            payload: response.data.data,
          });

          setRegionData(response.data.data);
        } else {
          dispatch({ type: FETCH_BRANDS_FAILURE, payload: response.data.data });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_BRANDS_FAILURE, payload: error });
      });
  };

  const shortCountries = (countriesArray) =>
    countriesArray.sort((country1, country2) => {
      const country1Label = country1.label.toLowerCase();
      const country2Label = country2.label.toLowerCase();
      if (country1Label < country2Label) {
        return -1;
      }
      if (country1Label > country2Label) {
        return 1;
      }
      return 0;
    });

  const { formik } = props;

  useEffect(() => {
    const ShortedCountries = shortCountries(countries);
    setCountriesData(ShortedCountries);
    getRegions();
  }, []);

  return (
    <Dialog
      open={props.open}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={cx(commonstyle.customDialogWrapper, classes.smallPopup)}
    >
      <div className={classes.editprofileWrapper}>
        <div className="popup-header">
          <Typography variant="h4">
            Edit Profile
            <Link className="cross-btn" onClick={props.handleClose}>
              <img src={crossIcon} alt="Success Icon" />
            </Link>
          </Typography>
        </div>
        <div className="popup-content">
          <div className="form-wrapper inline-groups">
            <div className="form-group">
              <TextField
                name="firstName"
                id="firstName"
                label="First Name"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </div>
            <div className="form-group">
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </div>
            <div className="form-group">
              <TextField
                id="roleInCompany"
                name="roleInCompany"
                label="Role In Company"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.roleInCompany}
                error={
                  formik.touched.roleInCompany &&
                  Boolean(formik.errors.roleInCompany)
                }
                helperText={
                  formik.touched.roleInCompany && formik.errors.roleInCompany
                }
              />
            </div>
            <div className="form-group">
              <TextField
                id="company"
                name="company"
                label="Company"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.company}
                error={formik.touched.company && Boolean(formik.errors.company)}
                helperText={formik.touched.company && formik.errors.company}
              />
            </div>
            <div className="form-group full-width">
              <TextField
                id="totalEmployees"
                name="totalEmployees"
                label="Total Employees"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.totalEmployees}
                error={
                  formik.touched.totalEmployees &&
                  Boolean(formik.errors.totalEmployees)
                }
                helperText={
                  formik.touched.totalEmployees && formik.errors.totalEmployees
                }
              />
            </div>
            <div className="form-group full-width">
              <TextField
                id="streetAddress"
                name="streetAddress"
                label="Street Address"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.streetAddress}
                error={
                  formik.touched.streetAddress &&
                  Boolean(formik.errors.streetAddress)
                }
                helperText={
                  formik.touched.streetAddress && formik.errors.streetAddress
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
                onChange={(event) => {
                  formik.handleChange(event);

                  setSelectedCountry(event.target.value.toLowerCase());
                }}
                value={formik.values.country}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              >
                {countriesData?.length &&
                  countriesData?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.code}>
                        {item.label}
                      </MenuItem>
                    );
                  })}
              </TextField>
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
              />
            </div>
            <div className="form-group">
              <TextField
                id="postalCode"
                name="postalCode"
                label="Postal/Zip"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.postalCode}
                error={
                  formik.touched.postalCode && Boolean(formik.errors.postalCode)
                }
                helperText={
                  formik.touched.postalCode && formik.errors.postalCode
                }
              />
            </div>
            <div className="form-group phone-wrapper">
              <MuiPhoneNumber
                id="phone"
                name="phone"
                label="Phone Number"
                defaultCountry={
                  ["aq", "bv", "gg"].includes(selectedCountry)
                    ? "us"
                    : selectedCountry
                }
                dropdownClass={classes.countrySelect}
                value={formik.values.phone}
                onChange={(e) =>
                  formik.setFieldValue("phone", e.replace(/[\s-)(]+/g, ""))
                }
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                variant="outlined"
              />
            </div>
            <div className="form-group full-width">
              <TextField
                id="emailAddress"
                name="emailAddress"
                label="Email Address"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.emailAddress}
                error={
                  formik.touched.emailAddress &&
                  Boolean(formik.errors.emailAddress)
                }
                helperText={
                  formik.touched.emailAddress && formik.errors.emailAddress
                }
              />
            </div>
            <div className="form-group full-width">
              {PrimarySaleData?.length ? (
                <div>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-multiple-name-label">
                      Primary method of sale
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      // native
                      value={saleMethod || []}
                      onChange={handlePrimarySaleChange}
                      //   placeholder='Primary method of sale'
                      input={<OutlinedInput label="Primary method of sale" />}
                      MenuProps={MenuProps}
                    >
                      {PrimarySaleData?.map((name, ind) => (
                        <MenuItem
                          key={ind}
                          value={name}
                          style={saleMethodStyles(name, saleMethod, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group full-width">
              {regionData?.length ? (
                <div>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-multiple-name-label">
                      In which regions do they sell?
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      // native
                      value={region || []}
                      onChange={handleRegionChange}
                      //   placeholder='Primary method of sale'
                      input={
                        <OutlinedInput label="In which regions do they sell?" />
                      }
                      MenuProps={MenuProps}
                    >
                      {regionData?.map((item, ind) => (
                        <MenuItem
                          key={ind}
                          value={item?.name}
                          style={saleMethodStyles(item?.name, region, theme)}
                        >
                          {item?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group full-width">
              <TextField
                id="annualTurnover"
                name="annualTurnover"
                label="Annual Turnover"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.annualTurnover}
                error={
                  formik.touched.annualTurnover &&
                  Boolean(formik.errors.annualTurnover)
                }
                helperText={
                  formik.touched.annualTurnover && formik.errors.annualTurnover
                }
              />
            </div>
            <div className="form-group full-width">
              <TextField
                id="brandsCurrentlyWorking"
                name="brandsCurrentlyWorking"
                label="Brands Currently Working With"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.brandsCurrentlyWorking}
                error={
                  formik.touched.brandsCurrentlyWorking &&
                  Boolean(formik.errors.brandsCurrentlyWorking)
                }
                helperText={
                  formik.touched.brandsCurrentlyWorking &&
                  formik.errors.brandsCurrentlyWorking
                }
              />
            </div>
            <div className="form-group full-width">
              <TextField
                id="facebookURL"
                name="facebookURL"
                label="Facebook URL"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.facebookURL}
                error={
                  formik.touched.facebookURL &&
                  Boolean(formik.errors.facebookURL)
                }
                helperText={
                  formik.touched.facebookURL && formik.errors.facebookURL
                }
              />
            </div>
            <div className="form-group full-width">
              <TextField
                id="instagramURL"
                name="instagramURL"
                label="Instagram URL"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagramURL}
                error={
                  formik.touched.instagramURL &&
                  Boolean(formik.errors.instagramURL)
                }
                helperText={
                  formik.touched.instagramURL && formik.errors.instagramURL
                }
              />
            </div>
            <div className="form-group full-width">
              <TextField
                id="linkedinURL"
                name="linkedinURL"
                label="Linkedin URL"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.linkedinURL}
                error={
                  formik.touched.linkedinURL &&
                  Boolean(formik.errors.linkedinURL)
                }
                helperText={
                  formik.touched.linkedinURL && formik.errors.linkedinURL
                }
              />
            </div>
            <div className="form-group full-width">
              <TextField
                id="companyWebsiteURL"
                name="companyWebsiteURL"
                label="Company Website URL"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.companyWebsiteURL}
                error={
                  formik.touched.companyWebsiteURL &&
                  Boolean(formik.errors.companyWebsiteURL)
                }
                helperText={
                  formik.touched.companyWebsiteURL &&
                  formik.errors.companyWebsiteURL
                }
              />
            </div>
            <div className="form-group full-width">
              <TextField
                id="source"
                name="source"
                label="Source"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.source}
                error={formik.touched.source && Boolean(formik.errors.source)}
                helperText={formik.touched.source && formik.errors.source}
              />
            </div>
            <div className="form-group full-width">
              <TextField
                id="supplierName"
                name="supplierName"
                label="Supplier Name"
                type="text"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.supplierName}
                error={
                  formik.touched.supplierName &&
                  Boolean(formik.errors.supplierName)
                }
                helperText={
                  formik.touched.supplierName && formik.errors.supplierName
                }
              />
            </div>
            <div className="form-group full-width">
              <TextField
                id="otherNotes"
                name="otherNotes"
                label="Other Notes"
                type="textArea"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.otherNotes}
                error={
                  formik.touched.otherNotes && Boolean(formik.errors.otherNotes)
                }
                helperText={
                  formik.touched.otherNotes && formik.errors.otherNotes
                }
              />
            </div>
          </div>
          <DialogActions>
            <Button className="primary-btn" onClick={formik.handleSubmit}>
              Save
            </Button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
}

export default EditProfile;
