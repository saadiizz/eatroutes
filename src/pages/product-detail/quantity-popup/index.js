import React, { useState } from "react";
import { quantityPopupStyle } from "./style";
import { commonStyle } from "@utils/commonStyle";
import {
  Button,
  Dialog,
  DialogActions,
  Typography,
  List,
  ListItem,
} from "@mui/material";

function ProductQuantity(props) {
  const [scroll] = useState("body");
  const classes = quantityPopupStyle();

  const commonstyle = commonStyle();

  const {
    open,
    handleClose,
    childVariations,
    flavour,
    handleIncrementFlavour,
    handleDecrementFlavour,
    handleQuantityChange,
    handleAddToQuote,
    tab,
    handleTabChange,
    productVariationsData,
  } = props;
  function getUniqueListByKey(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={commonstyle.customDialogWrapper}
    >
      <div className={classes.ProductQuantityWrapper}>
        <div className="popup-header">
          <Typography variant="h4">
            Select Serving {productVariationsData[0]?.name}
          </Typography>
          <div className="btn-wrapper">
            {childVariations?.map((cv, index) => (
              <Button
                color="primary"
                className="primary-btn"
                style={
                  tab === index
                    ? {
                        backgroundColor: "white",
                        color: "#bf1e2e",
                      }
                    : {}
                }
                key={index}
                onClick={() => handleTabChange(index)}
              >
                {cv.variation_name}
              </Button>
            ))}
          </div>
        </div>
        <div className="quantity-popup-info">
          <span>
            <em>{childVariations && childVariations[tab]?.variation_name}</em>
            &apos;s {productVariationsData[0]?.subVariations[0]?.name} Available
          </span>
          <span>Add Quantity</span>
        </div>
        <div className="quantity-popup-content">
          <List>
            {childVariations &&
              childVariations[tab] &&
              getUniqueListByKey(
                childVariations[tab]?.variations_options,
                "name"
              ).map((cv) => {
                let val =
                  flavour &&
                  flavour.find(
                    (f) => f.product_variation_id === cv.product_variation_id
                  );
                val = val?.quantity;
                return (
                  <ListItem key={cv.id}>
                    <p>{cv.name}</p>
                    <div className="qty-group">
                      <Button
                        className="border-btn"
                        onClick={() =>
                          handleDecrementFlavour(cv.product_variation_id, val)
                        }
                      >
                        -
                      </Button>
                      <input
                        className="number-count"
                        name={cv.name}
                        value={val}
                        onChange={(e) =>
                          handleQuantityChange(e, cv.product_variation_id, val)
                        }
                        // readOnly
                      />
                      <Button
                        className="border-btn"
                        onClick={() =>
                          handleIncrementFlavour(cv.product_variation_id, val)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </ListItem>
                );
              })}
          </List>
        </div>
      </div>
      <DialogActions>
        <Button className="primary-btn small-btn" onClick={handleAddToQuote}>
          Add To Quote
        </Button>
        <Button className="primary-border-btn small-btn" onClick={handleClose}>
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductQuantity;
