import React, { useState } from "react";
import { viewproductStyle } from "./style";
import { commonStyle } from "@utils/commonStyle";
import {
  Button,
  Dialog,
  DialogActions,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import cx from "classnames";
import { setImageArray } from "@utils/commonFunctions";
import NoImage from "@assets/images/no-image.jpg";
import crossIcon from "@assets/images/cross-mark-white.svg";

function ViewProduct(props) {
  const classes = viewproductStyle();
  const commonstyle = commonStyle();
  const [scroll] = useState("body");
  const { product } = props;

  return (
    <Dialog
      open={props.openView}
      onClose={props.closeProductView}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={cx(commonstyle.customDialogWrapper, classes.smallPopup)}
    >
      <div className={classes.viewproductWrapper}>
        <div className="popup-header">
          <Typography variant="h4">View Product</Typography>
          <Button title="Close" onClick={props.closeProductView}>
            <img src={crossIcon} alt="close" />
          </Button>
        </div>
        <div className="viewpopup-content">
          <List className="product-info">
            <ListItem className="border">
              <span>Product Name</span>
              <p>{product?.name}</p>
            </ListItem>
            <ListItem className="border">
              <span>SKU</span>
              <p>{product?.sku}</p>
            </ListItem>
            <ListItem className="border">
              <span>Category</span>
              <p>
                {typeof product?.categories === "object"
                  ? product?.categories?.length
                    ? product?.categories[0].name
                    : "-"
                  : product?.categories
                  ? product?.categories
                  : "-"}
              </p>
            </ListItem>
            {!!product.products_variations?.length &&
              product.products_variations.map((data, index) => (
                <ListItem className="border" key={index}>
                  <span>
                    {data?.variation_type_name} - {data?.variation_name}
                  </span>
                  <p>
                    {data?.variations_options?.length
                      ? data?.variations_options
                          ?.map((variant) => variant?.name)
                          .join(", ")
                      : "-"}
                  </p>
                </ListItem>
              ))}
            <ListItem className="border">
              <span>Description</span>
              <div
                dangerouslySetInnerHTML={{
                  __html: product?.description,
                }}
              />
            </ListItem>
            <ListItem className="border">
              <span>Product Image</span>
              <div className="list-inner product-img">
                <img
                  src={product.image ? product.image : NoImage}
                  alt={product.name}
                />
              </div>
            </ListItem>
          </List>
          <div className="customer-brand-wrapper">
            <div className="brand-heading">
              <div className="brand-title">Products Gallery</div>
            </div>
            <List>
              {setImageArray("", product.products_gallery)?.map(
                (image, index) => (
                  <ListItem key={index}>
                    <div className="list-inner brand-img-list">
                      <img src={image} alt={product.name} />
                    </div>
                  </ListItem>
                )
              )}
              <Divider
                style={{
                  width: "-webkit-fill-available",
                  marginBottom: "10px",
                }}
              />
            </List>
          </div>
          {product.is_active === "0" && (
            <div className="button-wrapper">
              <DialogActions>
                <Button
                  className="primary-border-btn full-width"
                  onClick={() => alert(product?.id)}
                >
                  Approve Product
                </Button>
              </DialogActions>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}

export default ViewProduct;
