import React from "react";
import { productFilterStyle } from "./style";
import {
  Card,
  CardContent,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import closeIcon from "@assets/images/close.svg";

function ProductFilterSidebar({ handleProductFilter, categories }) {
  const classes = productFilterStyle();
  const sidebarClose = (event) => {
    event.preventDefault();
    document.querySelector("body").classList.remove("sidebar-open");
    document.querySelector("html").classList.remove("sidebar-open");
  };
  return (
    <div className={classes.productFilterWrapper}>
      <Card className="white-box">
        <CardContent>
          <div className="sidebar-title">
            Filter by Category
            <span className="close-sidebar" onClick={sidebarClose}>
              <img src={closeIcon} alt="close" />
            </span>
          </div>
          <div className="checkbox-list">
            {categories?.map((category) => (
              <FormGroup
                aria-label="position"
                className="custom-checkbox"
                key={category.id}
              >
                <FormControlLabel
                  value={category.id}
                  control={
                    <Checkbox
                      icon={<span className="normal-check"></span>}
                      checkedIcon={<span className="active-check"></span>}
                    />
                  }
                  label={category.name}
                  labelPlacement="end"
                  onChange={() => handleProductFilter(category.id)}
                />
              </FormGroup>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductFilterSidebar;
