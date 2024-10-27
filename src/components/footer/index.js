import React from "react";
import { footerStyle } from './style';
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

function Footer() {
  const classes = footerStyle();
  return <div className={classes.footerWrapper}>
    <div className="site-footer">
      <div className="container">
        <div className="footer-content-wrapper">
          <p>&copy; 2021 Eat Routes. All Rights Reserved.</p>
          <List className="footer-content-list">
            <ListItem>
              <Link to="/coming-soon" title="Terms & Conditions">
                Terms & Conditions
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/coming-soon" title="Privacy Policy">
                Privacy Policy
              </Link>
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  </div>;
}

export default Footer;