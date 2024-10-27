import { makeStyles } from "@mui/styles";

const requirementsStyle = makeStyles((theme) => ({
  requirementsWrapper: {
    "& .requirements-page-wrapper": {
      padding: "50px 0 80px",
      "@media(max-width:991px)": {
        padding: "40px 0 80px",
      },
      "@media(max-width:767px)": {
        padding: "40px 0",
      },
      "& .requirements-box": {
        padding: "30px",
        "@media(max-width:991px)": {
          padding: "20px",
        },
        "& .requirements-list-wrapper": {
          display: "flex",
          margin: "0 -30px",
          flexWrap: "wrap",
          alignItems: "center",
          "@media(max-width:991px)": {
            margin: "0 -20px",
          },
          "& + .requirements-list-wrapper": {
            paddingTop: "30px",
            marginTop: "30px",
            borderTop: "1px solid #e5e4e8",
            "@media(max-width:991px)": {
              paddingTop: "20px",
              marginTop: "20px",
            },
          },
          "& .left-column": {
            flex: "0 0 208px",
            maxWidth: "208px",
            padding: "0 15px 0 30px",
            "@media(max-width:1199px)": {
              flex: "0 0 180px",
              maxWidth: "180px",
            },
            "@media(max-width:991px)": {
              flex: "0 0 100%",
              maxWidth: "100%",
              marginBottom: "20px",
              padding: "0 20px",
            },
          },
          "& .right-column": {
            padding: "0 30px 0 15px",
            flex: "1",
            "@media(max-width:991px)": {
              padding: "0 20px",
            },
            "& .requirements-list": {
              display: "flex",
              margin: "0 -15px -30px",
              flexWrap: "wrap",
              padding: "0px",
              "@media(max-width:767px)": {
                margin: "0 -10px -20px",
              },
              "& li": {
                flex: "0 0 25%",
                maxWidth: "25%",
                padding: "0 15px",
                marginBottom: "30px",
                "@media(max-width:767px)": {
                  padding: "0 10px",
                  flex: "0 0 50%",
                  maxWidth: "50%",
                  marginBottom: "20px",
                },
                "@media(max-width:374px)": {
                  flex: "0 0 100%",
                  maxWidth: "100%",
                },
                "& .card-checkbox": {
                  "& .MuiCheckbox-root": {
                    minHeight: "80px",
                  },
                  "& .MuiFormControlLabel-label": {
                    fontSize: "20px",
                    "@media (max-width:1199px)": {
                      fontSize: "18px",
                    },
                  },
                },
              },
            },
          },
        },
      },
      "& .btn-wrapper": {
        marginTop: "15px",
        textAlign: "center",
        "& button": {
          minWidth: "107px",
          margin: "15px 10px 0",
        },
      },
    },
  },
}));

export { requirementsStyle };
