import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  Autocomplete,
  Chip,
} from "@mui/material";
import TextEditor from "@components/text-editor";
import { textEditorConfig } from "@utils/commonData";
import { useStore } from "@store/store";
import { addnewproductStyle } from "../style";
import Preview from "../products-preview";
import redEyeIcon from "@assets/images/red-eye.png";

function ProductDetailsForm(props) {
  const [state] = useStore();

  const classes = addnewproductStyle();
  const {
    formik,
    handleFileChange,
    handleMultipleFileChange,
    userRoleVrm,
    handleExamplesOpen,
    // openList,
    // setOpenList,
  } = props;


  return (
    <>
      {userRoleVrm && (
        <div className="form-group-autocomplete">
          <FormControl className="filter-category-wrapper">
            <InputLabel id="brandId-label" required>
              Select Brand
            </InputLabel>
            <Autocomplete
              id="brandId"
              name="brandId"
              openOnFocus={false}
              autoHighlight
              options={state?.brands?.brandsData?.map(
                (o) => o.user_supplier.id
              )}
              isOptionEqualToValue={(option, value) => option === value}
              getOptionLabel={(option) =>
                state?.brands?.brandsData?.find(
                  (o) => o.user_supplier.id === option
                )?.user_supplier?.name || ""
              }
              onChange={(e, value) => formik.setFieldValue("brandId", value)}
              onBlur={formik.handleBlur}
              value={formik.values.brandId}
              renderInput={(params) => (
                <TextField
                  className="autocomplete-textfield"
                  {...params}
                  variant="outlined"
                />
              )}
            />
            <FormHelperText className="error-text">
              {formik.touched.brandId && formik.errors.brandId}
            </FormHelperText>
          </FormControl>
        </div>
      )}
      <div className="form-group">
        <TextField
          name="name"
          id="name"
          label="Product Name"
          type="text"
          variant="outlined"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </div>
      <div className="form-group">
        <TextField
          name="headline"
          id="headline"
          label="Product Headline"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.headline}
          error={formik.touched.headline && Boolean(formik.errors.headline)}
          helperText={formik.touched.headline && formik.errors.headline}
        />
      </div>
      <div className="form-group-autocomplete">
        <FormControl className="filter-category-wrapper">
          <InputLabel id="category-label" required>
            Product Category
          </InputLabel>

          <Autocomplete
              id="categories"
              name="categories"
            multiple
            limitTags={3}
            openOnFocus={false}
            noOptionsText="No such size available. Please add"
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
                      state?.products?.categoriesData.find(
                        (o) => o.id === option
                      )?.name
                    }
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
        
            options={state?.products?.categoriesData?.map((o) => o.id)}
            getOptionLabel={(option) =>
              state?.products?.categoriesData?.find((o) => o.id === option)
                ?.name || ""
            }
            onChange={(e, value) => {
             
              formik.setFieldValue("categories", value);
            }}
          />
          <FormHelperText className="error-text">
            {formik.touched.categories && formik.errors.categories}
          </FormHelperText>
        </FormControl>
      </div>
      <div className="form-group full-width">
        <InputLabel required className="label-text">
          Product Description
        </InputLabel>
        <TextEditor
          config={textEditorConfig}
          value={formik.values.description}
          onChange={(c) => {
            formik.setFieldValue("description", c);
          }}
          onBlur={formik.handleBlur}
        />
        <FormHelperText className="error-text">
          {formik.touched.description && formik.errors.description}
        </FormHelperText>
      </div>
      <div className="form-group">
        <FormControl variant="outlined">
          <div className="labelWithEye">
            <InputLabel className="label-text" htmlFor="image" required>
              Featured Product Thumbnail
            </InputLabel>
            {formik?.values?.imageUrl && (
              <a
                href={formik?.values?.imageUrl}
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
              id="image"
              variant="outlined"
              type="file"
              multiple
              onChange={(e) =>
                handleFileChange(e, "file-name", "image", "Upload Photo")
              }
              onBlur={formik.handleBlur}
              InputProps={{
                inputProps: { accept: "image/*" },
              }}
            />
            <div className="label-block">
              <span className="file-name" id="file-name">
                {formik.values.image
                  ? formik.values.image?.name
                    ? formik.values.image?.name
                    : formik.values.image.split("/").pop()
                  : "Upload Photo"}
              </span>
            </div>
          </div>
          <FormHelperText>
            Requirements: Min Resolution 500px X 500px, must be white background
          </FormHelperText>
          <FormHelperText className="error-text">
            {formik.touched.image && formik.errors.image}
          </FormHelperText>
        </FormControl>
      </div>
      <div className="form-group">
        <FormControl variant="outlined">
          <div className="labelWithEye">
            <InputLabel className="label-text" htmlFor="nutrition_facts">
              Upload Nutrition Facts
            </InputLabel>
            {formik?.values?.nutrition_factsUrl && (
              <a
                href={formik?.values?.nutrition_factsUrl}
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
              id="nutrition_facts"
              variant="outlined"
              type="file"
              multiple
              onChange={(e) =>
                handleFileChange(
                  e,
                  "file-nutrition-facts",
                  "nutrition_facts",
                  "Upload Nutrition Fact"
                )
              }
              InputProps={{
                inputProps: { accept: "image/*" },
              }}
            />
            <div className="label-block">
              <span className="file-name" id="file-nutrition-facts">
                {formik.values.nutrition_facts
                  ? formik.values.nutrition_facts?.name
                    ? formik.values.nutrition_facts?.name
                    : formik.values.nutrition_facts.split("/").pop()
                  : "Upload Photo"}
              </span>
            </div>
          </div>
          <FormHelperText className="see-examples">
            <span onClick={() => handleExamplesOpen()}>See example</span> (Min
            Resolution 500px X 130px)
          </FormHelperText>
          <FormHelperText className="error-text">
            {formik.touched.nutrition_facts && formik.errors.nutrition_facts}
          </FormHelperText>
        </FormControl>
      </div>
      <div className="form-group full-width custom-products-gallary">
        <FormControl variant="outlined">
          <InputLabel className="label-text" htmlFor="products_gallery">
            Products Gallery
          </InputLabel>
          <div className={classes.fileInput}>
            <TextField
              id="products_gallery"
              variant="outlined"
              type="file"
              onChange={(e) =>
                handleMultipleFileChange(
                  e,
                  "file-products_gallery",
                  "products_gallery",
                  "Drop files here to upload"
                )
              }
              InputProps={{
                inputProps: { accept: "image/*", multiple: true },
              }}
            />
            <div className="label-block product-gallery-label-block">
              <span className="file-name" id="file-products_gallery">
                {formik.values.products_gallery.length ? (
                  <Preview formik={formik} />
                ) : (
                  "Drop files here to upload"
                )}
              </span>
            </div>
          </div>
          <FormHelperText>
            Requirements: Min Resolution 500px X 500px, Image size cannot exceed
            1MB
          </FormHelperText>
        </FormControl>
      </div>
      <div className="form-group full-width">
        <InputLabel className="label-text">Product Ingredients</InputLabel>
        <TextEditor
          config={textEditorConfig}
          value={formik.values.ingredients}
          onChange={(c) => {
            formik.setFieldValue("ingredients", c);
          }}
          onBlur={formik.handleBlur}
        />
      </div>
    </>
  );
}

export default ProductDetailsForm;
