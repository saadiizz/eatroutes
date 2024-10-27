import { makeStyles } from "@mui/styles";

const changePasswordStyle = makeStyles((theme) => ({
  changePasswordWrapper: {
    "& .change-password-wrapper": {
      padding: "50px 0 80px",
      "@media(max-width:991px)": {
        padding: "40px 0 80px",
      },
      "@media(max-width:767px)": {
        padding: "40px 0",
      },
      "& h1": {
        display: "flex",
        justifyContent: "center",
        marginBottom: "38px",
        "@media(max-width:991px)": {
          marginBottom: "15px",
        },
      },
      "& .white-box": {
        maxWidth: "784px",
        margin: "0 auto",
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
}));

export { changePasswordStyle };
