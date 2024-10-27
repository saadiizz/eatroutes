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
      padding: "28px",
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
          fontSize: "16px",
          lineHeight: "24px",
          color: colors.black,
          margin: "20px",
          textAlign: "justify",
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
        marginBottom: "5px",
      },
    },
  },
}));

export { ConfirmationPopupStyle };
