import React from "react";
import { Container } from "@mui/material";
import ComingSoonImage from "@assets/images/comingSoon.png";
import { makeStyles } from "@mui/styles";

import Header from "@components/header";
import Footer from "@components/footer";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    backgroundColor: "#F4F6F8",
    display: "flex",
    height: "100%",
    minHeight: "calc(100vh - 110px)",
    flexDirection: "column",
    paddingBottom: 80,
    paddingTop: 80,
    "@media (max-width: 767px)": {
      minHeight: "calc(100vh - 78px)",
    },
    "& .img-block": {
      textAlign: "center",
      "& img": {
        maxWidth: "439px",
        "@media(max-width:1199px)": {
          maxWidth: "360px",
        },
        "@media(max-height:991px)": {
          maxWidth: "360px",
        },
        "@media(max-width:767px)": {
          maxWidth: "220px",
        },
        "@media(max-width:467px)": {
          maxWidth: "160px",
        },
      },
      "& h1": {
        marginTop: "10px",
        fontWeight: "500",
        fontSize: "30px",
        "@media(max-height:991px)": {
          fontSize: "26px",
        },
        "@media(max-width:767px)": {
          fontSize: "22px",
        },
        "@media(max-width:467px)": {
          fontSize: "18px",
        },
      },
    },
  },
  logo: {
    alignSelf: "center",
    marginBottom: "54px",
  },
}));

function ComingSoon() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.root}>
        <Container maxWidth="md">
          <div className="img-block">
            <img src={ComingSoonImage} alt="Eat routes" />
            <h1>In the very near future, We will launch this page</h1>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
export default ComingSoon;
