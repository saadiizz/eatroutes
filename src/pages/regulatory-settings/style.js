import { makeStyles } from "@mui/styles";

const regulatorySettingsStyle = makeStyles((theme) => ({
  regulatorySettingsWrapper: {
    "& .regulatory-page-wrapper": {
      padding: "50px 0 80px",
      "@media(max-width:991px)": {
        padding: "40px 0 80px",
      },
      "@media(max-width:767px)": {
        padding: "40px 0",
      },
      "& .regulatory-list": {
        "& ul": {
          display: "flex",
          margin: "0 -15px -5px",
          flexWrap: "wrap",
          "@media (max-width:767px)": {
            margin: "0 -10px",
          },
          "& li": {
            flex: "0 0 25%",
            maxWidth: "25%",
            padding: "0 15px 28px",
            "@media (max-width:991px)": {
              maxWidth: "33.33%",
              flex: "0 0 33.33%",
            },
            "@media (max-width:767px)": {
              maxWidth: "50%",
              flex: "0 0 50%",
              padding: "0 10px 20px",
            },
            "@media (max-width:374px)": {
              maxWidth: "100%",
              flex: "0 0 100%",
            },
          },
        },
        "& .btn-wrap": {
          textAlign: "center",
          "& .primary-btn": {
            minWidth: "137px",
          },
        },
      },
    },
  },
}));

export { regulatorySettingsStyle };
