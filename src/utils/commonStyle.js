import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const commonStyle = makeStyles((theme) => ({
  customDialogWrapper: {
    "& .MuiBackdrop-root ": {
      background: "rgba(0,0,0,0.7)",
    },
    "& .MuiDialog-paper ": {
      maxWidth: "750px",
      width: "100%",
      boxShadow: "0 0 18px 0 rgba(0, 0, 0, 0.1)",
      borderRadius: "20px",
      margin: "15px",
      "@media(max-width:691px)": {
        maxWidth: "calc(100% - 30px) !important",
      },
      "& .popup-header": {
        "& .cross-btn": {
          position: "absolute",
          right: "30px",
          margin: "-10px",
          padding: "10px",
          top: "62%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          "@media(max-width:767px)": {
            right: "15px",
            top: "69%",
          },
        },
        "& h4": {
          position: "relative",
          padding: "27px 30px",
          background: colors.primary,
          fontSize: "20px",
          lineHeight: "1.2",
          fontWeight: "500",
          color: colors.white,
          "@media(max-width:767px)": {
            padding: "15px",
            fontSize: "18px",
          },
        },
      },
      "& .MuiDialogActions-root ": {
        justifyContent: "center",
        padding: "17px 15px 30px",
        "& button": {
          minWidth: "118px",
        },
        "@media(max-width:767px)": {
          padding: "15px",
        },
      },
    },
  },
  successDialogWrapper: {
    "& .MuiBackdrop-root ": {
      background: "rgba(0,0,0,0.7)",
    },
    "& .MuiDialog-paper ": {
      maxWidth: "556px",
      width: "100%",
      boxShadow: "0 0 18px 0 rgba(0, 0, 0, 0.1)",
      borderRadius: "20px",
      margin: "15px",
      overflowY: "hidden",
      "@media(max-width:679px)": {
        maxWidth: "calc(100% - 30px) !important",
      },
      "& .success-popup-header": {
        "& .MuiDialogActions-root": {
          padding: "30px 30px 0",
          "@media(max-width:767px)": {
            padding: "15px 15px 0",
          },
          "& a": {
            cursor: "pointer",
          },
        },
      },
      "& .success-popup-body": {
        padding: "0 30px 45px",
        textAlign: "center",
        "@media(max-width:767px)": {
          padding: "0 15px 30px",
        },
        "& .success-icon-wrapper": {
          display: "block",
          marginBottom: "23px",
          "@media(max-width:767px)": {
            marginBottom: "15px",
          },
          "& img": {
            "@media(max-width:991px)": {
              maxWidth: "90px",
            },
            "@media(max-width:767px)": {
              maxWidth: "70px",
            },
          },
        },
        "& h2": {
          color: colors.green,
          fontWeight: "600",
          marginBottom: "20px",
          "@media(max-width:767px)": {
            marginBottom: "10px",
          },
        },
        "& p": {
          fontSize: "22px",
          lineHeight: "1.64",
          color: colors.black,
          maxWidth: "450px",
          margin: "0 auto",
          "@media(max-width:991px)": {
            fontSize: "20px",
          },
          "@media(max-width:767px)": {
            fontSize: "18px",
          },
        },
      },
    },
  },
}));

export { commonStyle };
