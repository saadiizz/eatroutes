import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const productFilterStyle = makeStyles((theme) => ({
  productFilterWrapper: {
    height: "auto",
    "@media(max-width:991px)": {
      minHeight: "100vh",
    },
    "& .white-box": {
      height: "100%",

      "@media(max-width:991px)": {
        minHeight: "100vh",
        borderRadius: "0",
        boxShadow: "none",
      },
      "& .MuiCardContent-root": {
        padding: "0",
        height: "100%",
        "@media(max-width:991px)": {
          minHeight: "100vh",
        },
      },
      "& .sidebar-title": {
        background: colors.grayBg,
        padding: "21px 30px",
        borderRadius: "20px 20px 0 0",
        color: colors.primary,
        fontSize: "20px",
        fontWeight: "500",
        "& .close-sidebar": {
          display: "none",
        },
        "@media(max-width:991px)": {
          padding: "15px",
          fontSize: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "0",
          "& .close-sidebar": {
            display: "inline-block",
            padding: "15px",
            margin: "-15px -15px -15px 0",
            cursor: "pointer",
            "& img": {
              width: "20px",
            },
          },
        },
      },
      "& .checkbox-list": {
        padding: "24px 33px",
        "@media(max-width:991px)": {
          padding: "15px",
        },
      },
    },
  },
}));

export { productFilterStyle };
