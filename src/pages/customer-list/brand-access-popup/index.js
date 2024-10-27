import React, { useState } from "react";
import { brandAccessStyle } from "./style";
import { commonStyle } from "@utils/commonStyle";
import {
  Button,
  Typography,
  Link,
  Dialog,
  List,
  ListItem,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  ListItemText,
} from "@mui/material";
import cx from "classnames";
import crossIcon from "@assets/images/cross-mark-white.svg";
import filterGrayIcon from "@assets/images/filter-gray.svg";
import checkIcon from "@assets/images/checked.svg";
import NoImage from "@assets/images/no-image.jpg";

function BrandAccess(props) {
  const [scroll] = useState("body");
  const classes = brandAccessStyle();
  const commonstyle = commonStyle();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const { categories, categoryName, handleCategoryChange } = props;

  return (
    <Dialog
      open={props.open}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={cx(commonstyle.customDialogWrapper, classes.smallPopup)}
    >
      <div className={classes.brandAccessWrapper}>
        <div className="popup-header">
          <Typography variant="h4">
            Brand Access
            <Link className="cross-btn" onClick={props.handleClose}>
              <img src={crossIcon} alt="Success Icon" />
            </Link>
          </Typography>
        </div>

        <div className="popup-content">
          <div className="filter-category-wrapper">
            <FormControl sx={{ m: 1, width: 232 }}>
              <Select
                id="demo-multiple-checkbox"
                multiple
                displayEmpty
                value={categoryName}
                onChange={handleCategoryChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => {
                  return (
                    <span className="filter-icon">
                      <img src={filterGrayIcon} alt="filter icon" />
                      Filter by Category
                    </span>
                  );
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                {categories?.map((category) => (
                  <MenuItem
                    key={category.id}
                    value={category.id}
                    className="category-checkbox"
                  >
                    <FormGroup
                      aria-label="position"
                      className="custom-checkbox"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={categoryName.indexOf(category.id) > -1}
                            icon={<span className="normal-check"></span>}
                            checkedIcon={<span className="active-check"></span>}
                          />
                        }
                        label=""
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <List className="brand-list">
            {props?.brands?.map((brand) => (
              <ListItem className="brand-list-item" key={brand.id}>
                <FormGroup
                  aria-label="setting"
                  className="card-checkbox custom-box"
                >
                  <FormControlLabel
                    value={brand?.id}
                    control={
                      <Checkbox
                        checked={props.selectedBrands.includes(brand?.id)}
                        icon={<span></span>}
                        checkedIcon={
                          <span className="active">
                            <img src={checkIcon} alt="tick" />
                          </span>
                        }
                      />
                    }
                    label={
                      <Link to="" title={brand.name}>
                        <img
                          src={brand.image ? brand.image : NoImage}
                          alt={brand.name}
                        />
                      </Link>
                    }
                    labelPlacement="end"
                    onChange={() => props.handleChange(brand.id)}
                  />
                </FormGroup>
              </ListItem>
            ))}
          </List>
          <DialogActions>
            <Button
              className="primary-btn"
              onClick={() => props.handleSubmit(props.selectedBrands)}
            >
              Save
            </Button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
}

export default BrandAccess;
