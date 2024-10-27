import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  Autocomplete,
  Chip,
  Button,
} from "@mui/material";
import { useStore } from "@store/store";
import editIcon from "@assets/images/edit-variation.png";
import { allowOnlyDecimal } from "@utils/commonFunctions";

function VariationDetailsForm(props) {
  const [state] = useStore();

  const {
    formik,
    showDynamicForm,
    allVariationDatas,
    handleOptOnSubVarChanged,
    handleSubOptionsChange,
    handleOpenConfirmPopup,
    handleVariationDetailsOpen,
    // openList,
    // setOpenList,
    addVariationValue,
    setAddVariationValue,
    errors,
  } = props;

  return (
    <>
      {formik.values.variationTypes && (
        <div className="form-group-autocomplete hide-dropdown-icon">
          <FormControl className="filter-category-wrapper">
            <InputLabel id="subVariations-label" required>
              {`Add Product ${
                state?.products?.productVariationsData?.find(
                  (data) => data.id === formik?.values?.variationTypes
                )?.name
              }(s)`}
            </InputLabel>
            <div className="autocomplete-filter-inner">
              <Autocomplete
                multiple
                limitTags={3}
                noOptionsText="No such flavour available. Please add"
                autoHighlight
                filterSelectedOptions
                // open={openList.subVariations}
                // onInputChange={(event, newInputValue) => {
                //   newInputValue
                //     ? setOpenList({ ...openList, subVariations: true })
                //     : setOpenList({ ...openList, subVariations: false });
                // }}
                onInputChange={(event, newInputValue) => {
                  setAddVariationValue({
                    ...addVariationValue,
                    variationOption: newInputValue,
                  });
                }}
                onBlur={formik.handleBlur}
                id="subVariations"
                name="subVariations"
                options={state?.products?.subVariationsData?.map((o) => o.id)}
                getOptionLabel={(option) =>
                  state?.products?.subVariationsData.find(
                    (o) => o.id === option
                  )?.name
                }
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={index}
                      label={
                        state?.products?.subVariationsData.find(
                          (o) => o.id === option
                        )?.name
                      }
                    />
                  ))
                }
                onChange={(e, value) => {
                  formik.setFieldValue("subVariations", value);
                  handleOptOnSubVarChanged(value);
                }}
                value={formik.values.subVariations}
                disabled={!formik.values.variationTypes}
                onMouseDownCapture={(e) =>
                  e.target.localName === "input" && e.stopPropagation()
                }
                clearOnBlur={!addVariationValue.variationOption}
                renderInput={(params) => (
                  <TextField
                    className="autocomplete-textfield with-add-btn"
                    {...params}
                    variant="outlined"
                  />
                )}
              />
              <div className="add-variation-button">
                <Button
                  color="primary"
                  className="primary-btn"
                  onClick={() => handleOpenConfirmPopup("flavour")}
                  style={{
                    fontSize: "small",
                    position: "absolute",
                    height: "25px",
                    borderRadius: "30px",
                    right: "-6.5px",
                    top: "-1px",
                    minWidth: "10px",
                    maxWidth: "35px",
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
            <FormHelperText className="error-text">
              {props.formik.touched.subVariations &&
                props.formik.errors.subVariations}
            </FormHelperText>
          </FormControl>
        </div>
      )}

      {/* {showDynamicForm &&
        !!formik.values.variationTypes &&
        !!formik?.values?.subVariations.length && (
          <div className="form-group-autocomplete hide-dropdown-icon">
            <FormControl className="filter-category-wrapper">
              <InputLabel id="measurement-label" required>
                Unit Of Measurement
              </InputLabel>
              <div className="measurment-btn-wrapper">
                {measurementList.map((data) => {
                  return (
                    <Button
                      color="primary"
                      className={`${
                        formik?.values?.measurement?.id === data?.id
                          ? "measurment-btn"
                          : "measurment-border-btn"
                      }`}
                      onClick={() => formik.setFieldValue("measurement", data)}
                      key={data?.id}
                    >
                      {data?.label.toUpperCase()}
                    </Button>
                  );
                })}
              </div>
            </FormControl>
          </div>
        )} */}

      {showDynamicForm &&
        !!formik.values.variationTypes &&
        formik?.values?.subVariations.map((childValue, index) => {
          let subOptionName = state?.products?.subVariationsData.find(
            (o) => o.id === childValue
          )?.name;

          return (
            <div
              className="form-group-autocomplete hide-dropdown-icon"
              key={index}
            >
              <FormControl className="filter-category-wrapper">
                <InputLabel id="flavours-label" required>
                  {`${subOptionName} Flavor
                  ${
                    state?.products?.productVariationsData?.find(
                      (data) => data.id === formik?.values?.variationTypes
                    )?.subVariations[0]?.name
                  }(s) Available`}
                </InputLabel>
                <div className="autocomplete-filter-inner">
                  <Autocomplete
                    onKeyPress={allowOnlyDecimal}
                    multiple
                    limitTags={3}
                    noOptionsText="No such size available. Please add"
                    autoHighlight
                    filterSelectedOptions
                    id={subOptionName}
                    name={subOptionName}
                    options={state?.products?.subVariationsOptionsData[0]?.products_variations?.map(
                      (o) => o.id
                    )}
                    getOptionLabel={(option) =>
                      state?.products?.subVariationsOptionsData[0]?.products_variations?.find(
                        (o) => o.id === option
                      )?.name
                    }
                    onInputChange={(event, newInputValue) => {
                      setAddVariationValue({
                        ...addVariationValue,
                        variationSubOption: newInputValue,
                      });
                    }}
                    onChange={(e, value) =>
                      handleSubOptionsChange(childValue, value)
                    }
                    onBlur={formik.handleBlur}
                    value={
                      allVariationDatas[childValue]?.map((data) => data.size) ||
                      []
                    }
                    onMouseDownCapture={(e) =>
                      e.target.localName === "input" && e.stopPropagation()
                    }
                    clearOnBlur={!addVariationValue.variationSubOption}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => {
                        let data =
                          state?.products?.subVariationsOptionsData[0]?.products_variations?.find(
                            (o) => o.id === option
                          )?.name;
                        data = (
                          <div className="custom-chip-label">
                            <p className="chip-label-data">{data}</p>
                            <div className="chip-label-img">
                              <img
                                onClick={() =>
                                  handleVariationDetailsOpen(childValue, option)
                                }
                                src={editIcon}
                                alt="add-icon"
                                className="add-icon"
                                title="Add Variations Details"
                              />
                            </div>
                          </div>
                        );
                        return (
                          <Chip
                            {...getTagProps({ index })}
                            key={index}
                            label={data}
                          />
                        );
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        className="autocomplete-textfield with-add-btn"
                        {...params}
                        variant="outlined"
                      />
                    )}
                  />
                  <div className="add-variation-button">
                    <Button
                      color="primary"
                      className="primary-btn"
                      onClick={() => handleOpenConfirmPopup("size", childValue)}
                      style={{
                        fontSize: "small",
                        position: "absolute",
                        height: "25px",
                        borderRadius: "30px",
                        right: "-6.5px",
                        top: "-1px",
                        minWidth: "10px",
                        maxWidth: "35px",
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                <FormHelperText className="error-text">
                  {!!errors && errors[childValue] && "Please add flavor size"}
                </FormHelperText>
              </FormControl>
            </div>
          );
        })}
    </>
  );
}

export default VariationDetailsForm;
