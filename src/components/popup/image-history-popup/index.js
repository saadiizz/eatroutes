import React, { useState } from "react";
import { editcustomerStyle } from "./style";
import { commonStyle } from "@utils/commonStyle";
import {
  Typography,
  Link,
  Dialog,
  List,
  ListItem,
  Card,
  CardContent,
} from "@mui/material";
import cx from "classnames";
import eyeIcon from "@assets/images/red-eye.png";
import crossIcon from "@assets/images/cross-mark-white.svg";
import NutritionFacts1 from "@assets/images/nutrition-facts.png";


function ImageHistoryPopup(props) {
  const [scroll] = useState("body");
  const classes = editcustomerStyle();
  const commonstyle = commonStyle();



  return (
    <Dialog
      open={props.openView}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={cx(commonstyle.customDialogWrapper, classes.smallPopup)}
    >
      <div className={classes.editcustomerWrapper}>
        <div className="popup-header">
          <Typography variant="h4">
            Image History
            <Link className="cross-btn" onClick={props.closeProductView}>
              <img src={crossIcon} alt="Success Icon" />
            </Link>
          </Typography>
        </div>
        <div className="popup-content">
        <h3>Old Image</h3>
            <br></br>
          <List className="brand-list">
       
            {props.productImage?.map((data)=>(
                <ListItem className="brand-list-item">
              <Card className="logo-wrapper white-box">
                <CardContent>
              
                    <img src={NutritionFacts1} alt="imageOne"/>
                 
                  <div className="card-info-links">
                    <a
                      href={data}
                      target="_blank"
                      title="View Nutrition Facts"
                      rel="noopener noreferrer"
                    >
                      <img src={eyeIcon} alt="view product" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </ListItem>
            ))}
          </List>
          <br></br>
          <h3>New Image</h3>
            <br></br>
          <List className="brand-list">
       
            {props.productImage?.map((data)=>(
                <ListItem className="brand-list-item">
              <Card className="logo-wrapper white-box">
                <CardContent>
              
                    <img src={NutritionFacts1} alt="ImageTwo"/>
                 
                  <div className="card-info-links">
                    <a
                      href={data}
                      target="_blank"
                      title="View Nutrition Facts"
                      rel="noopener noreferrer"
                    >
                      <img src={eyeIcon} alt="view product" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </ListItem>
            ))}
          </List>
        </div>
      </div>
    </Dialog>
  );
}

export default ImageHistoryPopup;
