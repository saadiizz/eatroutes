import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const footerStyle = makeStyles((theme) => ({
  footerWrapper: {
    "& .site-footer": {
      borderTop: "1px solid #e5e4e8",
      padding: "18px 0",
      position:"absolute",
      left:"0",
      right:"0",
      bottom:"0",
      "& .footer-content-wrapper": {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        "@media (max-width:767px)": {
          flexDirection: "column",
        },
        "& p": {
          color: colors.lightText,
          fontSize: "14px",
          padding: "0px 12px",
          "@media (max-width:767px)": {
            marginTop: "8px",
            order: "2",
            textAlign: "center",
          },
        },
        "& .footer-content-list": {
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          padding: "0px",
          "@media (max-width:767px)": {
            order: "1",
          },
          "@media (max-width:479px)": {
            flexDirection: "column",
          },
          "& li": {
            padding: "0px 12px",
            width: "auto",
            color: colors.lightText,
            fontSize: "14px",
            "& + li": {
              "@media (max-width:479px)": {
                marginTop: "8px",
              },
            },
            "& a": {
              color: colors.lightText,
              "&:hover": {
                color: colors.primary,
              }
            }
          }
        }
      },
    }
  },
}));

export { footerStyle };