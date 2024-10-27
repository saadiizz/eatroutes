import React, { useState, useEffect } from "react";
import { TextField, InputLabel, Autocomplete } from "@mui/material";
import { countries, currency } from "@utils/commonData";
import { allowOnlyNumbers } from "@utils/commonFunctions";

function SelfLifeDetailsForm(props) {
  const { formik} = props;

  const [countriesData, setCountriesData] = useState([]);

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

  useEffect(() => {
    const ShortedCountries = shortCountries(countries);
    setCountriesData(ShortedCountries);
  }, []);

  return (
    <>
      <div className="form-group">
        <TextField
          name="productSelfLife"
          id="productSelfLife"
          label="Product Self Life (Months)"
          type="text"
          variant="outlined"
          onKeyPress={allowOnlyNumbers}
          onChange={formik.handleChange}
          value={formik.values.productSelfLife}
          error={
            formik.touched.productSelfLife &&
            Boolean(formik.errors.productSelfLife)
          }
          helperText={
            formik.touched.productSelfLife && formik.errors.productSelfLife
          }
        />
      </div>
      <div className="form-group-autocomplete">
        <InputLabel id="category-label">Country Of Origin</InputLabel>
        <Autocomplete
          id="countryOfOrigin"
          name="countryOfOrigin"
          openOnFocus={false}
          autoHighlight
          options={countriesData.map((o) => o.label)}
          getOptionLabel={(option) => option}
          onChange={(e, value) =>
            formik.setFieldValue("countryOfOrigin", value)
          }
          value={formik.values.countryOfOrigin}
          renderInput={(params) => (
            <TextField
              className="autocomplete-textfield"
              {...params}
              variant="outlined"
            />
          )}
        />
      </div>
      <div className="form-group-autocomplete">
        <InputLabel id="category-label">Currency</InputLabel>
        <Autocomplete
          id="currency"
          name="currency"
          openOnFocus={false}
          autoHighlight
          filterSelectedOptions
          options={currency}
          getOptionLabel={(option) => option}
          onChange={(e, value) => formik.setFieldValue("currency", value)}
          value={formik.values.currency}
          renderInput={(params) => (
            <TextField
              className="autocomplete-textfield"
              {...params}
              variant="outlined"
            />
          )}
        />
      </div>
          </>
  );
}

export default SelfLifeDetailsForm;
