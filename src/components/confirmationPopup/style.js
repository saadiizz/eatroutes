import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const ConfirmationPopupStyle = makeStyles((theme) => ({
  ConfirmWrapper: {
    width: "100%",
    "& a": {
      color: colors.primary + " ! important",
    },
  },
  customModal: {
    "& .MuiDialog-paperWidthSm": {
      boxShadow: "0 3px 8px 0 rgba(0, 0, 0, 0.24)",
      padding: "40px",
      textAlign: "center",
      maxWidth: "430px",
      width: "100%",
      "@media(max-width:991px)": {
        width: "auto",
      },
      "@media(max-width:767px)": {
        width: "auto",
        maxWidth: "100%",
        padding: "25px 15px",
        margin: "0 15px",
      },
      "& .MuiDialogContent-root,& .MuiDialogActions-root, & .MuiDialogTitle-root":
        {
          padding: "0",
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
      "& .MuiDialogActions-root": {
        "@media(max-width:374px)": {
          flexWrap: "wrap",
        },
        "& button": {
          maxWidth: "165px",
          width: "100%",
          fontSize: "16px",
          fontWeight: "600",
          textTransform: "uppercase",
          "@media(max-width:374px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
          },
        },
        "& button + button": {
          marginLeft: "20px",
          "@media(max-width:767px)": {
            marginLeft: "15px",
          },
          "@media(max-width:374px)": {
            margin: "15px 0 0",
          },
        },
      },
    },
  },
}));

export { ConfirmationPopupStyle };
