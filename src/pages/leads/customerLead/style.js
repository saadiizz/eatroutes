import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const customerLeadStyle = makeStyles((theme) => ({
  addnewcustomerWrapper: {
    "& .add-new-customer-wrapper": {
      padding: "50px 0 80px",
      "@media(max-width:991px)": {
        padding: "40px 0 80px",
      },
      "@media(max-width:767px)": {
        padding: "40px 0",
      },
      "& h1": {
        marginBottom: "38px",
        "@media(max-width:991px)": {
          marginBottom: "15px",
        },
      },
      "& .white-box": {
        padding: "30px 30px 40px",
        "@media (max-width:1199px)": {
          padding: "25px",
        },
        "@media (max-width:991px)": {
          padding: "15px",
        },
        "& .form-wrapper": {
          display: "flex",
          flexWrap: "wrap",
          margin: "0 -15px -28px",
          "@media (max-width:1199px)": {
            margin: "0 -15px -25px",
          },
          "@media (max-width:991px)": {
            margin: "0 -15px -20px",
          },
          "& .phone-wrapper": {
            "& .MuiOutlinedInput-root": {
              border: `1px solid ${colors.lightGray}`,
              borderRadius: "50px",
              padding: "0 20px !important",
            },
            "& .Mui-focused.MuiOutlinedInput-root": {
              border: `1px solid ${colors.primary} !important`,
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
            marginBottom: "28px",
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
    "& .bottom-btn-wrapper": {
      marginTop: "30px",
      display: "flex",
      justifyContent: "center",
      "@media (max-width:991px)": {
        marginTop: "20px",
      },
      "& button": {
        minWidth: "108px",
        "& +button": {
          marginLeft: "20px",
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

export { customerLeadStyle };
