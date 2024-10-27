import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const editcustomerStyle = makeStyles((theme) => ({
  editcustomerWrapper: {
    "& .popup-content": {
      padding: "30px 28px",
      maxHeight: "calc(100vh - 110px)",
      overflow: "auto",
      "@media (max-width:1199px)": {
        padding: "25px",
      },
      "@media (max-width:991px)": {
        padding: "15px",
      },
      "& .form-wrapper": {
        display: "flex",
        flexWrap: "wrap",
        margin: "0 -15px -30px",
        "@media (max-width:1199px)": {
          margin: "0 -15px -25px",
        },
        "@media (max-width:991px)": {
          margin: "0 -15px -20px",
        },
        "& .phone-wrapper": {
          "& .MuiOutlinedInput-root": {
            borderBottom: `1px solid ${colors.lightGray}`,
            borderRadius: "0px",
            padding: "0 20px !important",
          },
          "& .Mui-focused.MuiOutlinedInput-root": {
            borderBottom: `1px solid ${colors.primary} !important`,
          },
          "& input": {
            border: "none",
            padding: "0 !important",
          },
        },
        "& .form-group": {
          padding: "0 15px",
          maxWidth: "50%",
          flex: "0 0 50%",
          marginBottom: "30px",

          "@media (max-width:1199px)": {
            marginBottom: "25px",
          },
          "@media (max-width:991px)": {
            marginBottom: "20px",
          },
          "@media (max-width:667px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
          },

          "&.full-width": {
            maxWidth: "100%",
            flex: "0 0 100%",
          },
        },
      },
      "& .customer-brand-wrapper ": {
        "& .brand-heading ": {
          "& .brand-title": {
            "@media(min-width:1199px)": {
              fontSize: "24px",
            },
          },
        },
        "& .brand-img-list": {
          width: "117px",
          height: "90px",
          maxWidth: "117px",
          maxHeight: "90px",
          "@media(max-width:767px)": {
            maxWidth: "100px",
            maxHeight: "70px",
          },
          "& img": {
            width: "100%",
            height: "100%",
          },
        },
      },
    },
  },
  smallPopup: {
    "& .MuiDialog-paper": {
      maxWidth: "586px",
      overflowY: "hidden",
      "@media (max-width:991px)": {
        maxWidth: "586px !important",
      },
      "@media (max-width:767px)": {
        maxWidth: "calc(100% - 30px) !important",
      },
      "& .MuiDialogActions-root": {
        padding: "0 !important",
        marginTop: "20px",
        "& .primary-btn": {
          width: "100%",
        },
      },
    },
  },
  countrySelect: {
    "& .MuiPaper-root": {
      height: "200px !important",
    },
  },
}));

export { editcustomerStyle };
