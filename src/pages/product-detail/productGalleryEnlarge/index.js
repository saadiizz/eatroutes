import React, { useState } from "react";
import { Dialog, DialogContent, Typography, Link } from "@mui/material";
import crossIcon from "@assets/images/cross-mark-white.svg";
import { commonStyle } from "@utils/commonStyle";
import cx from "classnames";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFade, Navigation, Pagination } from "swiper";

import { productGalleryEnlargStyle } from "./style";

function ProductGalleryEnlarg(props) {
  const classes = productGalleryEnlargStyle();
  const commonstyle = commonStyle();

  const [scroll] = useState("body");
  return (
    <div className={classes.ConfirmWrapper}>
      <Dialog
        open={props.open}
        scroll={scroll}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={cx(commonstyle.customDialogWrapper, classes.customModal)}
      >
        <div className="popup-header">
          <Typography variant="h4">
            <Link className="cross-btn" onClick={props.handleClose}>
              <img src={crossIcon} alt="Success Icon" />
            </Link>
          </Typography>
        </div>
        <DialogContent>
          <Swiper
            spaceBetween={30}
            effect={"fade"}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[EffectFade, Navigation, Pagination]}
            className="mySwiper"
          >
            {props?.images?.map((image, i) => {
              return (
                <SwiperSlide key={i}>
                  <img src={image} alt={i} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default ProductGalleryEnlarg;
