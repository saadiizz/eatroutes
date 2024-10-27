import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const quantityPopupStyle = makeStyles((theme) => ({
  ProductQuantityWrapper: {
    "& .popup-header": {
      display: "flex",
      justifyContent: "space-between",
      padding: "22px 30px 10px",
      background: colors.primary,
      alignItems: "center",
      "@media(max-width:767px)": {
        padding: "15px",
      },
      "@media(max-width:479px)": {
        flexDirection: "column",
        alignItems: "flex-start",
      },
      "& h4": {
        background: "transparent !important",
        padding: "0 !important",
      },
      "& .btn-wrapper": {
        "@media(max-width:479px)": {
          marginTop: "10px",
        },
        "& button": {
          minWidth: "72px",
          backgroundColor: "transparent",
          border: "1px solid #fff",
          height: "31px",
          lineHeight: "31px",
          margin: "0 14px 12px 0 !important",
          "& + button": {
            marginLeft: "14px",
            "@media(max-width:575px)": {
              marginLeft: "8px",
            },
          },
          "&:hover": {
            backgroundColor: colors.white,
            color: colors.primary,
          },
        },
      },
    },
    "& .quantity-popup-info": {
      padding: "25px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #e5e4e8",
      "@media(max-width:767px)": {
        padding: "15px",
      },
      "& span": {
        fontSize: "20px",
        color: colors.primary,
        fontWeight: "500",
        "@media(max-width:767px)": {
          fontSize: "18px",
        },
        "@media(max-width:479px)": {
          fontSize: "16px",
        },
        "& em": {
          fontStyle: "inherit",
        },
        "&:last-child": {
          paddingLeft: "15px",
          textAlign: "right",
        },
      },
    },
    "& .quantity-popup-content": {
      "& ul": {
        padding: "0",
        maxHeight: "calc(100vh - 280px)",
        overflow: "auto",
        "& li": {
          padding: "25px 30px",
          borderBottom: "1px solid #e5e4e8",
          justifyContent: "space-between",
          "@media(max-width:767px)": {
            padding: "15px",
          },
          "& p": {
            fontSize: "18px",
            color: colors.black,
            paddingRight: "10px",
            maxWidth: "calc(100% - 120px)",
            flex: "0 0 calc(100% - 120px)",
            "@media(max-width:767px)": {
              fontSize: "16px",
            },
          },
          "& .qty-group": {
            maxWidth: "120px",
            flex: "0 0 120px",
          },
        },
      },
    },
  },
}));

export { quantityPopupStyle };
