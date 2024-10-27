import React, { useState } from "react";
import { quoteRequeststyle, viewproductStyle } from "./style";
import {
  Button,
  Dialog,
  DialogActions,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  Card,
  CardContent,
} from "@mui/material";
import cx from "classnames";
import { setImageArray } from "@utils/commonFunctions";
import redEyeIcon from "@assets/images/red-eye.png";
import crossIcon from "@assets/images/cross-mark-white.svg";
import dropDownIcon from "@assets/images/down-arrow-red.svg";
import dropDownGrayIcon from "@assets/images/down-arrow-gray.svg";
import ImageHistoryPopup from "@components/popup/image-history-popup";
import AddVariationDetails from "../view-flavor-popup";
import {
  getProductHistoryOrderFormat,
  getProductHistoryNewFlavorFormat,
  getProductHistoryOtherFormat,
  getProductHistoryOldFlavorFormat,
} from "@utils/commonFunctions";

function ProductHistoryPopup(props) {
  const { handleOpenConfirmPopup, product, role } = props;
  const classes = viewproductStyle();
  const [openView, setOpenView] = useState(false);
  const quoteRequest = quoteRequeststyle();
  const [scroll] = useState("body");
  const [flavorData, setFlavorData] = useState();
  const [openModalView, setOpenModalView] = useState(false);
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const checkFlavorDetails = (data) => {
    setFlavorData(data);
    setOpenModalView(true);
  };

  const OrderDetailsHistory = getProductHistoryOrderFormat(
    product?.product_edit_history
  );
  const NewFlavorDetailsHistory = getProductHistoryNewFlavorFormat(
    product?.product_edit_history
  );
  const OldFlavorDetailsHistory = getProductHistoryOldFlavorFormat(
    product?.product_edit_history
  );
  const OtherDetailsHistory = getProductHistoryOtherFormat(
    product?.product_edit_history
  );

  return (
    <Dialog
      open={props.openView}
      onClose={props.closeProductView}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={cx(classes.customDialogWrapper)}
    >
      <div className={quoteRequest.quoteRequestWrapper} >
        <div className={classes.viewproductWrapper}>
          <div className="popup-header">
            <Typography variant="h4">Product History</Typography>
            <Button title="Close" onClick={props.closeProductView}>
              <img src={crossIcon} alt="close" />
            </Button>
          </div>
          <div className="quote-page-wrapper">
            <div className="quote-request-list">
              <div className="profile-image">
                <img
                  className="user-image"
                  src={
                    setImageArray(product?.image, product?.products_gallery)[0]
                  }
                  alt={product.name}
                />
              </div>

              <span className="imageHeading">{product?.name}</span>
              {OrderDetailsHistory.length > 0 && (
                <div className="quote-request-item" id="product-details">
                  <div className="white-box">
                    <Accordion
                      expanded={expanded === 0}
                      onChange={handleChange(0)}
                    >
                      <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                      >
                        <div className="quote-heading">
                          <div className="quote-title-block">
                            <Typography variant="h2">Order Details</Typography>
                          </div>
                          <div className="down-arrow-wrapper">
                            <img
                              src={dropDownIcon}
                              alt="drop-down-arrow"
                              className="open-dropdown"
                            />
                            <img
                              src={dropDownGrayIcon}
                              alt="drop-down-arrow"
                              className="close-dropdown"
                            />
                          </div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="viewpopup-content">
                          <List className="product-info">
                            {OrderDetailsHistory?.map((data) => (
                              <ListItem className="border">
                                <span>{data[0]}</span>
                                <div className="oldNewContainer">
                                  {data[0] === "Products Gallery" 
                                 ? (
                                    <Button
                                      color="primary"
                                      className="primary-btn"
                                      onClick={() => setOpenView(true)}
                                    >
                                      Image History
                                    </Button>
                                  ) : (
                                    <>
                                      {" "}
                                      {(data[0] ===
                                      "Featured Product Thumbnail" ||  data[0] === "Upload Nutrition Facts" ) ? (
                                        <div>
                                          <Card
                                            style={{
                                              height: "9rem",
                                              width: "9rem",
                                            }}
                                          >
                                            <CardContent>
                                              <a href={data[1]}>
                                                <img
                                                  style={{
                                                    height: "7rem",
                                                    width: "7rem",
                                                  }}
                                                  src={data[1]}
                                                  alt="Old Featured Product Thumbnail"
                                                />
                                              </a>
                                            </CardContent>
                                          </Card>
                                        </div>
                                      ) : (
                                        <div>
                                          {" "}
                                          <h3 className="oldValue">
                                            {" "}
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: data[1],
                                              }}
                                            />
                                          </h3>
                                        </div>
                                      )}
                                      <div className="right-arrow">&rarr;</div>
                                      {(data[0] ===
                                      "Featured Product Thumbnail" ||  data[0] === "Upload Nutrition Facts" ) ? (
                                        <div>
                                          <Card
                                            style={{
                                              height: "9rem",
                                              width: "9rem",
                                            }}
                                          >
                                            <CardContent>
                                              <a href={data[2]}>
                                                <img
                                                  style={{
                                                    height: "7rem",
                                                    width: "7rem",
                                                  }}
                                                  src={data[2]}
                                                  alt="New Featured Product Thumbnail"
                                                />
                                              </a>
                                            </CardContent>
                                          </Card>
                                        </div>
                                      ) : (
                                        <div>
                                          {" "}
                                          <h3 className="newValue">
                                            {" "}
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: data[2],
                                              }}
                                            />
                                          </h3>
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                                {data[0] === "Products Gallery" && (
                                  <ImageHistoryPopup
                                    openView={openView}
                                    productImage={data[1]}
                                    closeProductView={() => setOpenView(false)}
                                  />
                                )}
                              </ListItem>
                            ))}
                          </List>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              )}
              {OldFlavorDetailsHistory[0]?.length > 0 && (
                <div className="quote-request-item" id="product-flavours">
                  <div className="white-box">
                    <Accordion
                      expanded={expanded === 1}
                      onChange={handleChange(1)}
                    >
                      <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                      >
                        <div className="quote-heading">
                          <div className="quote-title-block">
                            <Typography variant="h2">Flavor Details</Typography>
                          </div>
                          <div className="down-arrow-wrapper">
                            <img
                              src={dropDownIcon}
                              alt="drop-down-arrow"
                              className="open-dropdown"
                            />
                            <img
                              src={dropDownGrayIcon}
                              alt="drop-down-arrow"
                              className="close-dropdown"
                            />
                          </div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="viewpopup-content">
                          <List className="product-info">
                            {OldFlavorDetailsHistory[0]?.map((data, index) => (
                              <ListItem className="border">
                                {index === 0 ? (
                                  <span>Old Flavors:</span>
                                ) : (
                                  <span></span>
                                )}
                                <div className="oldNewContainer">
                                  <h3 className="oldValue">
                                    {" "}
                                    {data.variation_name}
                                  </h3>
                                  <div className="flavor-arrow">&rarr;</div>
                                  {data?.variations_options?.map((result) => (
                                    <div style={{ display: "flex" }}>
                                      <h3 className="oldValue">
                                        {result.name}
                                      </h3>
                                      <div
                                        onClick={() =>
                                          checkFlavorDetails(result)
                                        }
                                        title="View image"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          src={redEyeIcon}
                                          alt="view"
                                          style={{
                                            height: "1.3rem",
                                            marginLeft: "0.3rem",
                                          }}
                                        />
                                      </div>
                                      ,
                                      <AddVariationDetails
                                        open={openModalView}
                                        handleClose={() =>
                                          setOpenModalView(false)
                                        }
                                        heading="View Variations Details"
                                        value={flavorData}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </ListItem>
                            ))}
                            <br></br>
                            {NewFlavorDetailsHistory[0]?.map((data, index) => (
                              <ListItem className="border">
                                {index === 0 ? (
                                  <span>New Flavors:</span>
                                ) : (
                                  <span></span>
                                )}
                                <div className="oldNewContainer">
                                  <h3 className="newValue">
                                    {" "}
                                    {data.variation_name}
                                  </h3>
                                  <div className="flavor-arrow">&rarr;</div>
                                  {data?.variations_options?.map((result) => (
                                    <div style={{ display: "flex" }}>
                                      <h3 className="newValue">
                                        {result.name}
                                      </h3>
                                      <div
                                        onClick={() =>
                                          checkFlavorDetails(result)
                                        }
                                        title="View image"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          src={redEyeIcon}
                                          alt="view"
                                          style={{
                                            height: "1.3rem",
                                            marginLeft: "0.3rem",
                                          }}
                                        />
                                      </div>
                                      ,
                                      <AddVariationDetails
                                        open={openModalView}
                                        handleClose={() =>
                                          setOpenModalView(false)
                                        }
                                        heading="View Variations Details"
                                        value={flavorData}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </ListItem>
                            ))}
                          </List>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              )}
              {OtherDetailsHistory.length > 0 && (
                <div className="quote-request-item" id="other-details">
                  <div className="white-box">
                    <Accordion
                      expanded={expanded === 2}
                      onChange={handleChange(2)}
                    >
                      <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                      >
                        <div className="quote-heading">
                          <div className="quote-title-block">
                            <Typography variant="h2">Other Details</Typography>
                          </div>
                          <div className="down-arrow-wrapper">
                            <img
                              src={dropDownIcon}
                              alt="drop-down-arrow"
                              className="open-dropdown"
                            />
                            <img
                              src={dropDownGrayIcon}
                              alt="drop-down-arrow"
                              className="close-dropdown"
                            />
                          </div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="viewpopup-content">
                          <List className="product-info">
                            {OtherDetailsHistory.map((data) => (
                              <ListItem className="border">
                                <span>{data[0]}</span>
                                <div className="oldNewContainer">
                                  <h3 className="oldValue">{data[1]}</h3>
                                  <div className="right-arrow">&rarr;</div>
                                  <h3 className="newValue">{data[2]}</h3>
                                </div>
                              </ListItem>
                            ))}
                          </List>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              )}

              {role === "VRM" && (
                <DialogActions>
                  <div className="button-wrapper">
                    <Button
                      className="primary-border-btn full-width"
                      style={{ margin: "1rem" }}
                      onClick={() => {
                        handleOpenConfirmPopup(product?.product_id, "active");
                        props.closeProductView();
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      className="primary-border-btn full-width"
                      style={{ margin: "1rem" }}
                      onClick={() => {
                        handleOpenConfirmPopup(product?.product_id, "reject");
                        props.closeProductView();
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                </DialogActions>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default ProductHistoryPopup;
