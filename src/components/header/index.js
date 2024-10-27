import React, { useState, useEffect,useContext } from "react";
import { headerStyle } from "./style";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ListItem, AppBar, List } from "@mui/material";
import siteLogo from "@assets/images/site-logo.png";
import cartIcon from "@assets/images/estimation.svg";
// import orderIcon from "@assets/images/order.svg";
// import locationIcon from "@assets/images/location.svg";
// import salesIcon from "@assets/images/sales-order.svg";
// import settingsIcon from "@assets/images/settings.svg";
// import orderredIcon from "@assets/images/order-red-icon.svg";
// import locationredIcon from "@assets/images/location-red-icon.svg";
// import salesredIcon from "@assets/images/sales-order-red-icon.svg";
// import settingsredIcon from "@assets/images/settings-red-icon.svg";
// import orderwhiteIcon from "@assets/images/order-white-icon.svg";
// import locationwhiteIcon from "@assets/images/location-white-icon.svg";
// import saleswhiteIcon from "@assets/images/sales-order-white-icon.svg";
// import settingswhiteIcon from "@assets/images/settings-white-icon.svg";
import profileIcon from "@assets/images/profile.svg";
import profileredIcon from "@assets/images/profile-red-icon.svg";
import passwordIcon from "@assets/images/password.svg";
import passwordredIcon from "@assets/images/password-red-icon.svg";
import signoutIcon from "@assets/images/logout.svg";
import signoutredIcon from "@assets/images/logout-red-icon.svg";
import {
  getToken,
  getUserName,
  getRole,
  getFromLocalStore,
} from "@utils/commonFunctions";
import { useStore } from "@store/store";
import { LOGOUT } from "@utils/actionType";
import { userRole } from "@utils/constant";
import cx from "classnames";
import ConfirmationPopup from "@components/confirmationPopup";
import { BrandContext } from "@context/brand";

function Header(props) {
  const {  } = props;
  const { brandRequestList } = useContext(BrandContext);
  const classes = headerStyle();
  const [state, dispatch] = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeRoute, setActiveRoute] = useState("");
  const [openConfirmPopup, setConfirmPopup] = useState(false);
  const [confirmParams, setConfirmParams] = useState(null);

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);

  let role = getRole();

  const profileMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    var parentElement = event.target.closest("li.profile");
    var element = document.querySelectorAll("li.profile");
    for (let i = 0; i < element.length; i++) {
      if (element[i] === parentElement) {
        element[i].classList.toggle("open-submenu");
      } else {
        element[i].classList.remove("open-submenu");
      }
    }
  };
  const openMenu = () => {
    document.body.classList.toggle("open-menu");
  };
  const closeMenu = () => {
    var element = document.querySelectorAll("li.profile");
    for (let i = 0; i < element.length; i++) {
      element[i].classList.remove("open-submenu");
    }
    var subMenuelement = document.querySelectorAll("li.has-submenu");
    for (let i = 0; i < subMenuelement.length; i++) {
      subMenuelement[i].classList.remove("open-accordian");
    }
  };
  document.body.addEventListener("click", closeMenu);

  // sub menu
  // const subMenu = (event) => {
  //   event.preventDefault();
  //   if (window.innerWidth < 992) {
  //     event.stopPropagation();
  //     var parentElement = event.target.closest("li.has-submenu");
  //     var element = document.querySelectorAll("li.has-submenu");
  //     for (let i = 0; i < element.length; i++) {
  //       if (element[i] === parentElement) {
  //         element[i].classList.toggle("open-accordian");
  //       } else {
  //         element[i].classList.remove("open-accordian");
  //       }
  //     }
  //   }
  // };
  const handleLogout = () => {
    closeConfirmPopup();
    dispatch({ type: LOGOUT });
    navigate("/login");
    document.getElementsByClassName(".open-submenu").style.display = "none";
  };

  const handleLogoAccess = () => {
    const data =
      // (getRole() === userRole.client && "/brands") ||
      // (getRole() === userRole.staff && "/brands") ||
      // (getRole() === userRole.staff && "/brand-request") ||
      // (getRole() === userRole.brand && "/products-vendor") ||
      // (getRole() === userRole.vrm && "/brands")||
      (getRole() === userRole.crm && "/");
    return data;
  };

  const handleOpenConfirmPopup = (flag) => {
    setConfirmPopup(true);
    setConfirmParams({
      flag,
    });
  };
  const closeConfirmPopup = () => {
    setConfirmPopup(false);
    setConfirmParams(null);
  };
  const handleCloseMobileMenu = () => {
    window.innerWidth < 768 && openMenu();
  };

  return (
    <div className={classes.headerWrapper}>
      <AppBar className="site-header" id="header" position="static">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo-wrapper">
              <Link to={handleLogoAccess()} className="site-logo" title="home">
                <img src={siteLogo} alt="logo" />
              </Link>
            </div>
            <div className="nav-wrapper">
              {getToken() ? (
                <div className="navbar">
                  <List className="nav-links">
                    {(role === userRole.client ||
                      role === userRole.vrm ||
                      role === userRole.staff) && (
                      <ListItem onClick={() => handleCloseMobileMenu()}>
                        <NavLink
                          to="/brands"
                          title="Brands"
                          className={cx({
                            isActive:
                              activeRoute === "/" ||
                              activeRoute.includes("/brands") ||
                              activeRoute.includes("/view-brand") ||
                              activeRoute.includes("/edit-brand") ||
                              activeRoute.includes("/product-detail") ||
                              activeRoute === "/add-new-brand" ||
                              activeRoute === "/pending-brands",
                          })}
                        >
                          Brands
                        </NavLink>
                      </ListItem>
                    )}
                    {role === userRole.staff && (
                      <ListItem onClick={() => handleCloseMobileMenu()}>
                        <NavLink
                          to="/brand-request"
                          title="Brand Request"
                          className={cx({
                            isActive: activeRoute === "/brand-request",
                            // activeRoute === "/add-new-customer" ||
                            // activeRoute.includes("/staff-client-regulatory"),
                          })}
                        >
                          Brand Requests
                        </NavLink>
                        {brandRequestList?.length ? (
                          <span className="badge">{brandRequestList > 50 ? "100+":brandRequestList.length}</span>
                        ) : (
                          ""
                        )}
                      </ListItem>
                    )}
                    {role === userRole.staff && (
                      <ListItem onClick={() => handleCloseMobileMenu()}>
                        <NavLink
                          to="/customer-list"
                          title="Customer"
                          className={cx({
                            isActive:
                              activeRoute === "/customer-list" ||
                              activeRoute === "/add-new-customer" ||
                              activeRoute.includes("/staff-client-regulatory"),
                          })}
                        >
                          Clients
                        </NavLink>
                      </ListItem>
                    )}

                    {(role === userRole.brand || role === userRole.vrm) && (
                      <ListItem onClick={() => handleCloseMobileMenu()}>
                        <NavLink
                          to="/products-vendor"
                          title="Products"
                          className={cx({
                            isActive:
                              activeRoute === "/products-vendor" ||
                              activeRoute === "/add-new-product" ||
                              activeRoute.includes("/edit-product"),
                          })}
                        >
                          Products
                        </NavLink>
                      </ListItem>
                    )}
                    {role === userRole.staff && (
                      <>
                        <ListItem onClick={() => handleCloseMobileMenu()}>
                          <NavLink
                            to="/quote-request-staff"
                            title="Quote Requests"
                            className={(navData) =>
                              navData.isActive ? "isActive" : ""
                            }
                          >
                            Quote Requests
                          </NavLink>
                        </ListItem>
                        <ListItem onClick={() => handleCloseMobileMenu()}>
                          <NavLink
                            to="/sample-request-staff"
                            title="Quote Requests"
                            className={(navData) =>
                              navData.isActive ? "isActive" : ""
                            }
                          >
                            Sample Requests
                          </NavLink>
                        </ListItem>
                        <ListItem onClick={() => handleCloseMobileMenu()}>
                          <NavLink
                            to="/view-orders-staff"
                            title="Orders"
                            className={(navData) =>
                              navData.isActive ? "isActive" : ""
                            }
                          >
                            Orders
                          </NavLink>
                        </ListItem>
                      </>
                    )}
                    {role === userRole.vrm && (
                      <ListItem onClick={() => handleCloseMobileMenu()}>
                        <NavLink
                          to="/sample-request-vendor"
                          title="Sample Requests"
                          className={(navData) =>
                            navData.isActive ? "isActive" : ""
                          }
                        >
                          Sample Requests
                        </NavLink>
                      </ListItem>
                    )}

                    {role === userRole.client && (
                      <>
                        <ListItem onClick={() => handleCloseMobileMenu()}>
                          <NavLink
                            to="/view-quote-request"
                            title="Quote Requests"
                            className={(navData) =>
                              navData.isActive ? "isActive" : ""
                            }
                          >
                            Quotes
                          </NavLink>
                        </ListItem>
                        <ListItem onClick={() => handleCloseMobileMenu()}>
                          <NavLink
                            to="/view-sample-request"
                            title="Sample Requests"
                            className={(navData) =>
                              navData.isActive ? "isActive" : ""
                            }
                          >
                            Samples
                          </NavLink>
                        </ListItem>
                        <ListItem onClick={() => handleCloseMobileMenu()}>
                          <NavLink
                            to="/regulatory-settings"
                            title="Regulatory Settings"
                            className={cx({
                              isActive:
                                activeRoute === "/regulatory-settings" ||
                                activeRoute === "/requirements",
                            })}
                          >
                            Regulatory
                          </NavLink>
                        </ListItem>

                        <ListItem onClick={() => handleCloseMobileMenu()}>
                          <NavLink
                            to="/view-orders"
                            title="Orders"
                            // onClick={subMenu}
                            className={(navData) =>
                              navData.isActive ? "isActive" : ""
                            }
                          >
                            Orders
                          </NavLink>
                          {/* <div className="sub-menu" id="subMenu">
                            <List>
                              <ListItem onClick={() => handleCloseMobileMenu()}>
                                <NavLink
                                  to="/coming-soon"
                                  // className={(navData) =>
                                  //   navData.isActive ? "isActiveSubMenu" : ""
                                  // }
                                >
                                  <span>
                                    <img
                                      src={orderIcon}
                                      alt="Order"
                                      className="normal"
                                    />
                                    <img
                                      src={orderredIcon}
                                      alt="Order"
                                      className="hover"
                                    />
                                    <img
                                      src={orderwhiteIcon}
                                      alt="Order"
                                      className="xs-icon"
                                    />
                                  </span>
                                  Place New Order
                                </NavLink>
                              </ListItem>
                              <ListItem onClick={() => handleCloseMobileMenu()}>
                                <NavLink
                                  to="/coming-soon"
                                  // className={(navData) =>
                                  //   navData.isActive ? "isActiveSubMenu" : ""
                                  // }
                                >
                                  <span>
                                    <img
                                      src={salesIcon}
                                      alt="sales"
                                      className="normal"
                                    />
                                    <img
                                      src={salesredIcon}
                                      alt="sales"
                                      className="hover"
                                    />
                                    <img
                                      src={saleswhiteIcon}
                                      alt="sales"
                                      className="xs-icon"
                                    />
                                  </span>
                                  View All Sales Orders
                                </NavLink>
                              </ListItem>
                              <ListItem onClick={() => handleCloseMobileMenu()}>
                                <NavLink
                                  to="/coming-soon"
                                  // className={(navData) =>
                                  //   navData.isActive ? "isActiveSubMenu" : ""
                                  // }
                                >
                                  <span>
                                    <img
                                      src={locationIcon}
                                      alt="track"
                                      className="normal"
                                    />
                                    <img
                                      src={locationredIcon}
                                      alt="track"
                                      className="hover"
                                    />
                                    <img
                                      src={locationwhiteIcon}
                                      alt="track"
                                      className="xs-icon"
                                    />
                                  </span>
                                  View Tracking
                                </NavLink>
                              </ListItem>
                              {/* <ListItem onClick={() => handleCloseMobileMenu()}>
                              <NavLink
                                to="/regulatory-settings"
                                className={(navData) =>
                                  navData.isActive ? "isActiveSubMenu" : ""
                                }
                              >
                                <span>
                                  <img
                                    src={settingsIcon}
                                    alt="settings"
                                    className="normal"
                                  />
                                  <img
                                    src={settingsredIcon}
                                    alt="settings"
                                    className="hover"
                                  />
                                  <img
                                    src={settingswhiteIcon}
                                    alt="settings"
                                    className="xs-icon"
                                  />
                                </span>
                                Regulatory Settings
                              </NavLink>
                            </ListItem>
                            <ListItem onClick={() => handleCloseMobileMenu()}>
                              <NavLink
                                to="/view-quote-request"
                                className={(navData) =>
                                  navData.isActive ? "isActiveSubMenu" : ""
                                }
                              >
                                <span>
                                  <img
                                    src={orderIcon}
                                    alt="Order"
                                    className="normal"
                                  />
                                  <img
                                    src={orderredIcon}
                                    alt="Order"
                                    className="hover"
                                  />
                                  <img
                                    src={orderwhiteIcon}
                                    alt="Order"
                                    className="xs-icon"
                                  />
                                </span>
                                View Quotes
                              </NavLink>
                            </ListItem> */}
                          {/* <ListItem onClick={() => handleCloseMobileMenu()}>
                              <NavLink
                                to="/view-sample-request"
                                className={(navData) =>
                                  navData.isActive ? "isActiveSubMenu" : ""
                                }
                              >
                                <span>
                                  <img
                                    src={orderIcon}
                                    alt="Order"
                                    className="normal"
                                  />
                                  <img
                                    src={orderredIcon}
                                    alt="Order"
                                    className="hover"
                                  />
                                  <img
                                    src={orderwhiteIcon}
                                    alt="Order"
                                    className="xs-icon"
                                  />
                                </span>
                                View Samples
                              </NavLink>
                            </ListItem> */}
                          {/* </List>
                          </div> } */}
                        </ListItem>
                      </>
                    )}
                    {/*----------------- manage for CRM roles ---------------- */}
                    {role === userRole.crm && (
                      <ListItem onClick={() => handleCloseMobileMenu()}>
                        <NavLink
                          to="/"
                          title="Customer"
                          className={cx({
                            isActive:
                              activeRoute === "/" 
                              // ||
                              // activeRoute === "/add-new-customer" ||
                              // activeRoute.includes("/staff-client-regulatory"),
                          })}
                        >
                          Leads
                        </NavLink>
                      </ListItem>
                    )}
                    {role === userRole.crm && (
                      <ListItem onClick={() => handleCloseMobileMenu()}>
                        <NavLink
                          to="/customer-list"
                          title="Customer"
                          className={cx({
                            isActive:
                              activeRoute === "/customer-list" ||
                              activeRoute === "/add-new-customer" ||
                              activeRoute.includes("/staff-client-regulatory"),
                          })}
                        >
                          Clients
                        </NavLink>
                      </ListItem>
                    )}
                    {role === userRole.crm && (
                      <ListItem onClick={() => handleCloseMobileMenu()}>
                        <NavLink
                          to="/staff-list"
                          title="Customer"
                          className={cx({
                            isActive:
                              activeRoute === "/staff-list" ||
                              activeRoute === "/add-new-customer" ||
                              activeRoute.includes("/staff-client-regulatory"),
                          })}
                        >
                          Staff
                        </NavLink>
                      </ListItem>
                    )}
                    {/*----------------- end tabs manage for CRM roles ---------------- */}
                  </List>
                  <List className="cart-info-wrap">
                    {role === userRole.client && (
                      <ListItem className="cart-link">
                        <Link to="/quote-request" title="Cart">
                          <img src={cartIcon} alt="cart" />
                          <span>
                            {state?.quotes?.quotesData?.length ||
                            getFromLocalStore("client-quotes", true)
                              ? state?.quotes?.quotesData.length ||
                                getFromLocalStore("client-quotes", true).length
                              : 0}
                          </span>
                        </Link>
                      </ListItem>
                    )}
                    <ListItem className="profile">
                      <Link onClick={profileMenu} to="/" title="">
                        {getUserName()}
                        <span className="down-arrow"></span>
                      </Link>
                      <div className="sub-menu">
                        <List>
                          {(role === userRole.client ||
                            role === userRole.brand ||
                            role===userRole.crm||
                            role === userRole.staff ||
                            role === userRole.vrm) && (
                            <ListItem>
                              <NavLink
                                to={
                                  getRole() === userRole.brand
                                    ? "/brand/my-profile"
                                    : "/my-profile"
                                }
                                className={(navData) =>
                                  navData.isActive ? "isActiveSubMenu" : ""
                                }
                              >
                                <span>
                                  <img
                                    src={profileIcon}
                                    alt="profile"
                                    className="normal"
                                  />
                                  <img
                                    src={profileredIcon}
                                    alt="profile"
                                    className="hover"
                                  />
                                </span>
                                My profile
                              </NavLink>
                            </ListItem>
                          )}
                          {(role === userRole.client ||
                            role === userRole.staff)||(role===userRole.crm) && (
                            <ListItem>
                              <NavLink
                                to="/change-password"
                                className={(navData) =>
                                  navData.isActive ? "isActiveSubMenu" : ""
                                }
                              >
                                <span>
                                  <img
                                    src={passwordIcon}
                                    alt="password"
                                    className="normal"
                                  />
                                  <img
                                    src={passwordredIcon}
                                    alt="password"
                                    className="hover"
                                  />
                                </span>
                                Password
                              </NavLink>
                            </ListItem>
                          )}
                          <ListItem>
                            <Link
                              to=""
                              onClick={() => handleOpenConfirmPopup(1)}
                            >
                              <span>
                                <img
                                  src={signoutIcon}
                                  alt="signout"
                                  className="normal"
                                />
                                <img
                                  src={signoutredIcon}
                                  alt="signout"
                                  className="hover"
                                />
                              </span>
                              Logout
                            </Link>
                          </ListItem>
                        </List>
                      </div>
                    </ListItem>
                    <ListItem className="hamburger" onClick={openMenu}>
                      <span></span>
                    </ListItem>
                  </List>
                </div>
              ) : activeRoute === "/add-new-brand" ? (
                <div className="navbar">
                  <List
                    className="nav-links"
                    onClick={() => handleOpenConfirmPopup(2)}
                  >
                    <ListItem>
                      <NavLink to="">Exit</NavLink>
                    </ListItem>
                  </List>
                </div>
              ) : (
                activeRoute === "/registered-brand" && null
              )}
            </div>
          </div>
        </div>
      </AppBar>
      {confirmParams?.flag === 2 && (
        <ConfirmationPopup
          open={openConfirmPopup}
          handleClose={closeConfirmPopup}
          handleConfirm={() => {
            navigate("/login");
          }}
          confirmText="Are you sure?"
        />
      )}
      {confirmParams?.flag === 1 && (
        <ConfirmationPopup
          open={openConfirmPopup}
          handleClose={closeConfirmPopup}
          handleConfirm={() => {
            handleLogout();
          }}
          confirmText="Are you sure you want to Logout ?"
        />
      )}
    </div>
  );
}

export default Header;
