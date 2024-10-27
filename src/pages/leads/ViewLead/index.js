import React, { useState } from "react";
import { viewLeadStyle } from "./style";
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
// import EditCustomer from "../edit-customer-popup";
// import QuoteRequest from "../quote-request-popup";
// import SampleRequestStaff from "../sample-request-popup";
// import ViewOrderStaffRequest from "../order-request-popup";

function ViewLead(props) {
  const classes = viewLeadStyle();
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
          <Typography variant="h4">View Leads</Typography>
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
                      {customer?.first_name[0][0]}
                      {customer?.last_name[0][0]}
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
            <ListItem>
              <span>First Name</span>
              <p>{customer?.first_name}</p>
            </ListItem>
            <ListItem>
              <span>Last Name</span>
              <p>{customer?.last_name}</p>
            </ListItem>
            <ListItem>
              <span>Company Name</span>
              <p>{customer?.company ? customer?.company : "-"}</p>
            </ListItem>
            <ListItem>
              <span>Street Address</span>
              <p>{customer?.street_address ? customer?.street_address : "-"}</p>
            </ListItem>
            <ListItem>
              <span>Country</span>
              <p>{customer?.country ? customer?.country : "-"}</p>
            </ListItem>
            <ListItem>
              <span>City</span>
              <p>{customer?.city ? customer?.city : "-"}</p>
            </ListItem>
            <ListItem>
              <span>Postal/Zip</span>
              <p>{customer?.postal_code ? customer?.postal_code : "-"}</p>
            </ListItem>
            <ListItem>
              <span>Phone Number</span>
              <p>{customer?.phone ? customer?.phone : "-"}</p>
            </ListItem>
            <ListItem>
              <span>Email Address</span>
              <p>{customer?.email ? customer?.email : "-"}</p>
            </ListItem>
          </List>
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
          {/* <EditCustomer
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
          /> */}
          {/* <QuoteRequest
            id={customer?.id}
            open={openQuoteRequestModal}
            handleClose={closeQuoteRequestModal}
            name={`${customer?.first_name} ${customer?.last_name}`}
          /> */}
          {/* <SampleRequestStaff
            id={customer?.id}
            name={`${customer?.first_name} ${customer?.last_name}`}
            open={openSampleRequestModal}
            handleClose={closeSampleRequestModal}
          /> */}
          {/* <ViewOrderStaffRequest
            id={customer?.id}
            open={openOrderRequestModal}
            handleClose={closeOrderRequestModal}
            name={`${customer?.first_name} ${customer?.last_name}`}
          /> */}
        </div>
      </div>
    </Dialog>
  );
}

export default ViewLead;
