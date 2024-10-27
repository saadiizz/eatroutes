import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const viewproductStyle = makeStyles((theme) => ({
  viewproductWrapper: {
    "& .popup-header": {
      display: "flex",
      justifyContent: "space-between",
      padding: "27px 30px",
      background: colors.primary,
      "@media(max-width:767px)": {
        padding: "15px",
      },
      "& h4": {
        background: "transparent !important",
        padding: "0 !important",
      },
      "& button": {
        minWidth: "inherit",
        padding: "0",
      },
    },
    "& .viewpopup-content": {
      padding: "0 0 30px 0",
      maxHeight: "calc(100vh - 110px)",
      overflow: "auto",
      "& .product-info": {
        "& li": {
          padding: "13px 30px",
          display: "flex",
          "@media(max-width:767px)": {
            padding: "10px 15px",
          },
          "@media(max-width:575px)": {
            flexWrap: "wrap",
          },
          "& +li.border": {
            borderTop: "1px solid rgba(211,210,216,0.6)",
          },
          "& .product-img": {
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
          "& span": {
            flex: "0 0 155px",
            maxWidth: "155px",
            paddingRight: "15px",
            fontSize: "16px",
            color: colors.lightText,
            "@media(max-width:575px)": {
              flex: "0 0 100%",
              maxWidth: "100%",
              paddingRight: "0",
              paddingBottom: "3px",
              fontSize: "14px",
            },
          },
          "& p": {
            fontSize: "20px",
            flex: "1",
            "@media(max-width:767px)": {
              fontSize: "18px",
            },
            "@media(max-width:575px)": {
              flex: "auto",
              fontSize: "16px",
            },
          },
        },
      },
      "& .customer-brand-wrapper": {
        padding: "0 28px",
        marginTop: "5px",
        "@media(max-width:767px)": {
          padding: "0 15px",
        },
        "& .brand-heading": {
          marginBottom: "20px",
          "& .brand-title": {
            fontSize: "24px",
            fontWeight: "500",
            "@media(max-width:767px)": {
              fontSize: "20px",
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
      "& .button-wrapper": {
        marginTop: "25px",
        padding: "0 30px",
        "@media(max-width:767px)": {
          padding: "0 15px",
          marginTop: "10px",
        },
        "& .MuiDialogActions-root": {
          padding: "0 !important",
          "@media(max-width:575px)": {
            flexWrap: "wrap",
          },
          "& button": {
            width: "100%",
            "@media(max-width:575px)": {
              marginLeft: "0",
              "&  +button": {
                marginTop: "15px",
              },
            },
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
    },
  },
}));

export { viewproductStyle };
