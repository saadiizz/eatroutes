import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useStore } from "@store/store";
import congratsImage from "@assets/images/Confetti_blast.png";
import { makeStyles } from "@mui/styles";
import Footer from "@components/footer";
import Header from "@components/header";
import { colors } from "@utils/constant";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  rootMain: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F6F8",
    display: "flex",
    height: "100%",
    minHeight: "calc(100vh - 110px)",
    flexDirection: "column",
    padding: "50px 0 80px",
    "@media(max-width:991px)": {
      padding: "40px 0 80px",
    },
    "@media(max-width:767px)": {
      padding: "40px 0",
    },
    "@media(max-width:316px)": {
      padding: "40px 0",

      minHeight: "calc(100vh - 130px)",
    },
    "& img": {
      maxWidth: "280px",
      zIndex: "1",
      position: "absolute",
      top: "7%",
      "@media(max-width:991px)": {
        maxWidth: "250px",
      },
      "@media(max-width:767px)": {
        maxWidth: "220px",
        top: "5%",
      },
      "@media(max-width:467px)": {
        maxWidth: "190px",
      },
    },

    "& .text-box": {
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      marginTop: "160px",

      "@media(max-width:991px)": {
        marginTop: "155px",
      },
      "@media(max-width:767px)": {
        marginTop: "145px",
      },
      "@media(max-width:467px)": {
        marginTop: "140px",
      },
      "& .primaryBtn": {
        borderRadius: "25px",
        backgroundColor: "#bf1e2e",
        color: "#fff",
        padding: "0 10px",
        minWidth: "240px",
        height: "50px",
        lineHeight: "50px",
        fontWeight: "500",
        fontSize: "20px",
        transition: "all 0.5s",
        marginTop: "8px",
      },
      "& h3": {
        margin: "10px 8px 0px",
        fontWeight: "500",
        fontSize: "25px",
        color: colors.red,
        "@media(max-width:991px)": {
          fontSize: "23px",
        },
        "@media(max-width:767px)": {
          fontSize: "21px",
        },
        "@media(max-width:467px)": {
          fontSize: "19px",
        },
      },
      "& h1": {
        fontWeight: "600",
        fontSize: "50px",
        "@media(max-width:991px)": {
          fontSize: "45px",
        },
        "@media(max-width:767px)": {
          fontSize: "40px",
        },
        "@media(max-width:467px)": {
          fontSize: "35px",
        },
      },
      "& h5": {
        fontWeight: "400",
        textAlign: "center",
        margin: "15px 150px",
        fontSize: "27px",
        lineHeight: "40px",
        "@media(max-width:991px)": {
          fontSize: "25px",
          margin: "15px 80px",
        },
        "@media(max-width:767px)": {
          fontSize: "23px",
          margin: "15px 60px",
        },
        "@media(max-width:467px)": {
          fontSize: "21px",
          margin: "15px 40px",
        },
      },
    },
  },
  logo: {
    alignSelf: "center",
    marginBottom: "54px",
  },
}));

function BrandRegistered() {
  const classes = useStyles();
  const [state] = useStore();
  let navigate = useNavigate();

  useEffect(() => {
    let shouldRedirect = false;
    shouldRedirect = !!state?.brands?.addBrandData;
    const goToHomePage = () => navigate("/");
    if (!shouldRedirect) {
      goToHomePage();
    }
    return () => {
      shouldRedirect = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className={classes.rootMain}>
        <img src={congratsImage} alt="Eat routes" />
        <div className="text-box">
          <h3>
            Great job{" "}
            {state?.brands?.addBrandData?.first_name
              ? state?.brands?.addBrandData?.first_name
                  ?.charAt(0)
                  .toUpperCase() +
                state?.brands?.addBrandData?.first_name?.slice(1)
              : null}
          </h3>
          <h1>CONGRATS!</h1>
          <h5>
            {state?.brands?.addBrandData?.user_supplier?.name?.toUpperCase()} IS
            NOW BEING PROCESSED BY AN EAT ROUTES VENDOR RELATIONS MANAGER! ONCE
            APPROVED AND AVAILABLE TO OUR CLIENT PORTAL, YOU WILL BE NOTIFIED
            EMAIL AND/OR SMS. THIS APPROVAL PROCESS CAN TAKE UP TO 5 BUSINESS
            DAYS
          </h5>
          <Button
            color="primary"
            className="primaryBtn"
            onClick={() => navigate("/login")}
          >
            Back to login
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default BrandRegistered;
