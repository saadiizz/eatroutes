import React, { useEffect, useState } from "react";
import { viewcustomerStyle } from "./style";
import { commonStyle } from "@utils/commonStyle";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  Typography,
  List,
  ListItem,
  Avatar,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import cx from "classnames";
import NoImage from "@assets/images/no-image.jpg";
import callIcon from "@assets/images/call.svg";
import speechIcon from "@assets/images/speech-bubble.svg";
import crossIcon from "@assets/images/cross-mark-white.svg";
import EditCustomer from "../edit-customer-popup";
import QuoteRequest from "../quote-request-popup";
import SampleRequestStaff from "../sample-request-popup";
import ViewOrderStaffRequest from "../order-request-popup";
import { getRole } from "@utils/commonFunctions";
import { countries } from "@utils/commonData";
import { useStore } from "@store/store";

function ViewCustomer(props) {
  let roles = {
    crm: "crm",
  };
  const classes = viewcustomerStyle();
  const commonstyle = commonStyle();
  const [scroll] = useState("body");
  const { customer } = props;
  const [openQuoteRequestModal, setOpenQuoteRequestModal] = useState(false);
  const [openSampleRequestModal, setOpenSampleRequestModal] = useState(false);
  const [openOrderRequestModal, setOpenOrderRequestModal] = useState(false);

  const navigate = useNavigate();
  const openQuoteRequestModalFunction = () => {
    setOpenQuoteRequestModal(true);
  };
  const openSampleRequestModalFunction = () => {
    setOpenSampleRequestModal(true);
  };
  const openOrderRequestModalFunction = () => {
    setOpenOrderRequestModal(true);
  };
  const closeQuoteRequestModal = () => {
    setOpenQuoteRequestModal(false);
  };

  const closeSampleRequestModal = () => {
    setOpenSampleRequestModal(false);
  };

  const closeOrderRequestModal = () => {
    setOpenOrderRequestModal(false);
  };

  return (
    <Dialog
      open={props.openView}
      onClose={props.handleViewCustomerClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={cx(commonstyle.customDialogWrapper, classes.smallPopup)}
    >
      <div className={classes.viewcustomerWrapper}>
        <div className="popup-header">
          <Typography variant="h4">
            {props?.leadLabel
              ? props?.leadLabel
              : props?.staffLabel
              ? props?.staffLabel
              : "View Customer"}
          </Typography>
          <Button title="Close" onClick={props.handleViewCustomerClose}>
            <img src={crossIcon} alt="close" />
          </Button>
        </div>
        <div className="viewpopup-content">
          <div className="center-align">
            <List className="customer-contact-info">
              <ListItem>
                <a
                  href={`tel:${customer?.phone}`}
                  title="Call us"
                  className="red-circle-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={callIcon} alt="call icon" />
                </a>
              </ListItem>
              <ListItem>
                <div className="profile-name">
                  {customer?.avatar ? (
                    <Avatar alt={customer?.avatar} src={customer?.avatar} />
                  ) : (
                    <span>
                      {/* {console.log('customer view data==>',customer?.first_name[0][0])} */}
                      {customer?.first_name ? customer?.first_name[0][0] : ""}
                      {customer?.last_name ? customer?.last_name[0][0] : ""}
                    </span>
                  )}
                </div>
              </ListItem>
              <ListItem>
                <a
                  href={`mailto:${customer?.email}`}
                  title="Chat us"
                  className="red-circle-icon"
                  target="_new"
                >
                  <img src={speechIcon} alt="speech icon" />
                </a>
              </ListItem>
            </List>
            <span className="customer-name">
              {customer?.first_name} {customer?.last_name}
            </span>
            <Link
              to=""
              title="Mail us"
              onClick={() => (window.location = `mailto:${customer.email}`)}
            >
              {customer?.email}
            </Link>
          </div>
          <List className="customer-info">
            {!props.leadLabel ? (
              <ListItem>
                <span>User Name</span>
                <p>{customer?.user_name}</p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || customer?.lead_status ? (
              <ListItem>
                <span>Status</span>
                <p>{customer?.lead_status}</p>
              </ListItem>
            ) : (
              ""
            )}
            {customer?.reason_for_dead !== null ? (
              <ListItem>
                <span>Dead Lead Reason</span>
                <p>{customer?.reason_for_dead}</p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || customer?.first_name ? (
              <ListItem>
                <span>First Name</span>
                <p>{customer?.first_name}</p>
              </ListItem>
            ) : (
              ""
            )}
            {customer?.last_name || props.leadLabel ? (
              <ListItem>
                <span>Last Name</span>
                <p>{customer?.last_name}</p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || customer?.company ? (
              <ListItem>
                <span>Company Name</span>
                <p>{customer?.company ? customer?.company : "-"}</p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || customer?.role_in_company ? (
              <ListItem>
                <span>Role In Company</span>
                <p>
                  {customer?.role_in_company ? customer?.role_in_company : "-"}
                </p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || customer?.no_of_employees ? (
              <ListItem>
                <span>Total Employees</span>
                <p>
                  {customer?.no_of_employees ? customer?.no_of_employees : "-"}
                </p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || customer?.street_address ? (
              <ListItem>
                <span>Street Address</span>
                <p>
                  {customer?.street_address ? customer?.street_address : "-"}
                </p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || customer?.country ? (
              <ListItem>
                <span>Country</span>
                <p>
                  {customer?.country
                    ? countries.find((c) => c.code === customer?.country)?.label
                    : "-"}
                </p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || customer?.city ? (
              <ListItem>
                <span>City</span>
                <p>{customer?.city ? customer?.city : "-"}</p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || props.customDetail || customer?.postal_code ? (
              <ListItem>
                <span>Postal/Zip</span>
                <p>{customer?.postal_code ? customer?.postal_code : "-"}</p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || props.customDetail || customer?.phone ? (
              <ListItem>
                <span>Phone Number</span>
                <p>{customer?.phone ? customer?.phone : "-"}</p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || props.customDetail || customer?.email ? (
              <ListItem>
                <span>Email Address</span>
                <p>{customer?.email ? customer?.email : "-"}</p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel ||
            props.customDetail ||
            customer?.primary_method_of_sale?.length ? (
              <ListItem>
                <span>Primary Method for sale</span>
                <p
                  style={{
                    display: "flex",
                    flexFlow: "wrap",
                    alignItems: "center",
                    // justifyContent: "space-between",
                  }}
                >
                  {customer?.primary_method_of_sale?.length
                    ? customer?.primary_method_of_sale.map((i) => {
                        return (
                          <>
                            <button
                              style={{
                                borderRadius: "6px",
                                color: "white",
                                background: "#bf1e2e",
                                border: "none",
                                padding: "8px",
                                margin: "4px 5px 5px 4px",
                              }}
                            >
                              {i}
                            </button>
                          </>
                        );
                      })
                    : "-"}
                </p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel ||
            props.customDetail ||
            customer?.regions_to_sell?.length ? (
              <ListItem>
                <span>Regions for sale</span>
                <p
                  style={{
                    display: "flex",
                    flexFlow: "wrap",
                    alignItems: "center",
                  }}
                >
                  {customer?.regions_to_sell?.length
                    ? customer?.regions_to_sell.map((i) => {
                        return (
                          <>
                            <button
                              style={{
                                borderRadius: "6px",
                                color: "white",
                                background: "#bf1e2e",
                                border: "none",
                                padding: "8px",
                                margin: "4px 5px 5px 4px",
                              }}
                            >
                              {i}
                            </button>
                          </>
                        );
                      })
                    : "-"}
                </p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || customer?.annual_turnover ? (
              <ListItem>
                <span>Annual Turn Over</span>
                <p>
                  {customer?.annual_turnover ? customer?.annual_turnover : "-"}
                </p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || customer?.brands_currently_working ? (
              <ListItem>
                <span>Brands Currently Working</span>
                <p>
                  {customer?.brands_currently_working
                    ? customer?.brands_currently_working
                    : "-"}
                </p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || customer?.facebook_url ? (
              <ListItem>
                <span>Facebook URL</span>
                <p>{customer?.facebook_url ? customer?.facebook_url : "-"}</p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || customer?.instagram_url ? (
              <ListItem>
                <span>Instagram URL</span>
                <p>{customer?.instagram_url ? customer?.instagram_url : "-"}</p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || customer?.linkedin_url ? (
              <ListItem>
                <span>LinkedIn URL</span>
                <p>{customer?.linkedin_url ? customer?.linkedin_url : "-"}</p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || customer?.other_social_1 ? (
              <ListItem>
                <span>Company Website URL</span>
                <p>
                  {customer?.other_social_1 ? customer?.other_social_1 : "-"}
                </p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || customer?.source ? (
              <ListItem>
                <span>Source</span>
                <p>{customer?.source ? customer?.source : "-"}</p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || customer?.supplier_name ? (
              <ListItem>
                <span>Supplier Name</span>
                <p>{customer?.supplier_name ? customer?.supplier_name : "-"}</p>
              </ListItem>
            ) : (
              ""
            )}
            {props.leadLabel || props.customDetail || customer?.other_notes ? (
              <ListItem>
                <span>Other Notes</span>
                <p>{customer?.other_notes ? customer?.other_notes : "-"}</p>
              </ListItem>
            ) : (
              ""
            )}
            {getRole() == roles.crm ? (
              <>
                {props.isLead ? (
                  <ListItem>
                    <span>Rating</span>
                    <p>{customer?.rating ? customer?.rating : "-"}</p>
                  </ListItem>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </List>
          {!(getRole() == roles.crm) ? (
            <>
              {" "}
              <div className="customer-brand-wrapper">
                <div className="brand-heading">
                  <div className="brand-title">Brands</div>
                </div>
                <List>
                  {customer?.suppliers?.map((brand) => (
                    <ListItem key={brand.id}>
                      <div className="list-inner brand-img-list">
                        <img
                          src={brand.image ? brand.image : NoImage}
                          alt={brand.name}
                        />
                      </div>
                    </ListItem>
                  ))}
                  <Divider
                    style={{
                      width: "-webkit-fill-available",
                      marginBottom: "10px",
                    }}
                  />
                </List>
              </div>
              <div className="view-request-container">
                <Button
                  className="primary-border-btn view-btn"
                  onClick={openSampleRequestModalFunction}
                >
                  Sample Requests
                </Button>

                <Button
                  className="primary-border-btn view-btn"
                  onClick={openQuoteRequestModalFunction}
                >
                  Quote Requests
                </Button>

                <Button
                  className="primary-border-btn view-btn"
                  onClick={openOrderRequestModalFunction}
                >
                  Orders
                </Button>
              </div>
              <div className="button-wrapper">
                <DialogActions>
                  <Button
                    className="primary-border-btn full-width"
                    onClick={() =>
                      navigate(`/staff-client-regulatory/${customer?.id}`)
                    }
                  >
                    regulatory settings
                  </Button>
                </DialogActions>
                <DialogActions>
                  <Button
                    className="primary-border-btn"
                    onClick={props.handleEditCustomerOpen}
                  >
                    Edit Customer
                  </Button>
                  {!customer?.invite && (
                    <Button
                      className="primary-btn"
                      onClick={() => props.handleInvite(customer?.id)}
                    >
                      Invite
                    </Button>
                  )}
                </DialogActions>
              </div>
            </>
          ) : (
            ""
          )}

          <EditCustomer
            customer={customer && customer}
            open={props.openEdit}
            handleClose={props.handleEditCustomerClose}
            formik={props.formik}
            brands={props.brands}
            selectedBrands={props.selectedBrands}
            openBrandAccess={props.openBrandAccess}
            handleBrandAccessOpen={props.handleBrandAccessOpen}
            handleBrandAccessClose={props.handleBrandAccessClose}
            handleBrandAccessChange={props.handleBrandAccessChange}
            handleBrandAccessSubmit={props.handleBrandAccessSubmit}
            categories={props.categories}
            categoryName={props.categoryName}
            handleCategoryChange={props.handleCategoryChange}
          />
          <QuoteRequest
            id={customer?.id}
            open={openQuoteRequestModal}
            handleClose={closeQuoteRequestModal}
            name={`${customer?.first_name} ${customer?.last_name}`}
          />
          <SampleRequestStaff
            id={customer?.id}
            name={`${customer?.first_name} ${customer?.last_name}`}
            open={openSampleRequestModal}
            handleClose={closeSampleRequestModal}
          />
          <ViewOrderStaffRequest
            id={customer?.id}
            open={openOrderRequestModal}
            handleClose={closeOrderRequestModal}
            name={`${customer?.first_name} ${customer?.last_name}`}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default ViewCustomer;
