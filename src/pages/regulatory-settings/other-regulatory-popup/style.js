import { makeStyles } from "@mui/styles";

const otherRegulatoryStyle = makeStyles((theme) => ({
  "& .MuiDialog-paper": {
    maxWidth: "460px",
  },
  OtherRegulatoryWrapper: {
    "& .regulatory-popup-content": {
      padding: "35px 30px 0",
      "@media (max-width:767px)": {
        padding: "20px 15px 0",
      },
      "& .MuiInputLabel-root": {
        fontSize: "16px",
        marginBottom: "10px",
      },
    },
    "& .MuiDialogActions-root": {
      justifyContent: "flex-start !important",
      padding: "30px !important",
      "@media (max-width:767px)": {
        padding: "20px 15px !important",
      },
      "& button": {
        minWidth: "134px !important",
        "@media (max-width:767px)": {
          minWidth: "118px !important",
        },
      },
    },
    "& .form-wrapper": {
      "& .form-group": {
        "& .MuiOutlinedInput-input": {
          padding: "0 30px !important",
          fontSize: "18px",
          fontWeight: "500",
          "@media (max-width:767px)": {
            padding: "0 15px !important",
          },
        },
      },
    },
  },
  smallPopup: {
    "& .MuiDialog-paper": {
      maxWidth: "460px",
      "@media (max-width:991px)": {
        maxWidth: "460px !important",
      },
      "@media (max-width:767px)": {
        maxWidth: "calc(100% - 30px) !important",
      },
    },
  },
}));

export { otherRegulatoryStyle };
