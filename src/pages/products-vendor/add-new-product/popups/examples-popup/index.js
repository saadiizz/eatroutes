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
import NutritionFacts2 from "@assets/images/nutrition-facts2.png";
import NutritionFacts3 from "@assets/images/nutrition-facts3.png";
import NutritionFacts4 from "@assets/images/nutrition-facts4.png";

function ExamplesPopup(props) {
  const [scroll] = useState("body");
  const classes = editcustomerStyle();
  const commonstyle = commonStyle();

  const { open, handleClose } = props;

  return (
    <Dialog
      open={open}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={cx(commonstyle.customDialogWrapper, classes.smallPopup)}
    >
      <div className={classes.editcustomerWrapper}>
        <div className="popup-header">
          <Typography variant="h4">
            Nutrition Facts Examples
            <Link className="cross-btn" onClick={handleClose}>
              <img src={crossIcon} alt="Success Icon" />
            </Link>
          </Typography>
        </div>
        <div className="popup-content">
          <List className="brand-list">
            <ListItem className="brand-list-item">
              <Card className="logo-wrapper white-box">
                <CardContent>
                  <Link to="">
                    <img src={NutritionFacts1} alt="image1" />
                  </Link>
                  <div className="card-info-links">
                    <a
                      href={NutritionFacts1}
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
            <ListItem className="brand-list-item">
              <Card className="logo-wrapper white-box">
                <CardContent>
                  <Link to="">
                    <img src={NutritionFacts2} alt="image2" />
                  </Link>
                  <div className="card-info-links">
                    <a
                      href={NutritionFacts2}
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
            <ListItem className="brand-list-item">
              <Card className="logo-wrapper white-box">
                <CardContent>
                  <Link to="">
                    <img src={NutritionFacts3} alt="image3" />
                  </Link>
                  <div className="card-info-links">
                    <a
                      href={NutritionFacts3}
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
            <ListItem className="brand-list-item">
              <Card className="logo-wrapper white-box">
                <CardContent>
                  <Link to="">
                    <img src={NutritionFacts4} alt="image4" />
                  </Link>
                  <div className="card-info-links">
                    <a
                      href={NutritionFacts4}
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
          </List>
        </div>
      </div>
    </Dialog>
  );
}

export default ExamplesPopup;
