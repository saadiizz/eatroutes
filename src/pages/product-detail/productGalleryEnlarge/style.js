import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const productGalleryEnlargStyle = makeStyles((theme) => ({
  ConfirmWrapper: {
    width: "100%",
    "& a": {
      color: colors.primary + " ! important",
    },
  },
  customModal: {
    "& .popup-header h4": {
      background: "transparent !important",
    },
    "& .MuiDialog-paper": {
      maxWidth: "70vh !important",
      "@media (max-width:513px)": {
        maxWidth: "calc(100% - 64px) !important",
      },
    },
    "& .swiper": {
      position: "unset !important",
      "& .swiper-button-prev": {
        left: "0px",
        color: colors.primary,
        fontWeight: "900",
      },
      "& .swiper-button-next": {
        right: "0px",
        color: colors.primary,
        fontWeight: "900",
      },
      "& .swiper-pagination-bullet": {
        background: colors.primary,
      },
      "& .swiper-wrapper": {
        diaplay: "flex",
        alignItems: "center",
      },
    },
    "& .popup-content": {
      padding: "30px 28px",
      // maxHeight: "calc(100vh - 110px)",
      height: "800px",
      overflow: "auto",
      "@media (max-width:1199px)": {
        padding: "25px",
      },
      "@media (max-width:991px)": {
        padding: "15px",
      },
    },
    "& .MuiDialog-paperWidthSm": {
      boxShadow: "none",
      // padding: "30px",
      textAlign: "center",
      backgroundColor: "transparent",
      // "@media(max-width:991px)": {
      //   width: "auto",
      // },
      "@media(max-width:767px)": {
        // width: "auto",
        // maxWidth: "100%",
        padding: "25px 15px",
        margin: "0 15px",
      },
      "& .MuiDialogContent-root,& .MuiDialogActions-root, & .MuiDialogTitle-root":
        {
          padding: "30px",
          justifyContent: "center",
        },
      "& .MuiDialogContent-root": {
        "& .MuiTypography-root": {
          fontWeight: "400",
          fontSize: "21px",
          lineHeight: "24px",
          color: colors.black,
          maxWidth: "300px",
          margin: "0 auto 20px",
          "@media(max-width:991px)": {
            fontSize: "18px",
          },
          "@media(max-width:767px)": {
            fontSize: "16px",
          },
        },
      },
    },
  },
}));

export { productGalleryEnlargStyle };
