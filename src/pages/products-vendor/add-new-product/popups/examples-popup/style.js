import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const editcustomerStyle = makeStyles((theme) => ({
  editcustomerWrapper: {
    "& .popup-header": {
      "& h4": {
        paddingRight: "44px !important",
      },
    },
    "& .popup-content": {
      minHeight: "150px",
      padding: "30px 28px",
      maxHeight: "calc(100vh - 110px)",
      overflow: "auto",
      "& .list-item": {
        flex: "0 0 33.33%",
        maxWidth: "33.33%",
        padding: "0 15px",
        marginBottom: "30px",
        "@media (max-width:991px)": {
          marginBottom: "20px",
        },
        "@media (max-width:679px)": {
          flex: "0 0 50%",
          maxWidth: "50%",
        },
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
      },
      "& .brand-list": {
        padding: "0px",
        display: "flex",
        flexWrap: "wrap",
        margin: "0 -15px -30px",
        "@media (max-width:991px)": {
          margin: "0 -10px -20px",
        },
        "& .brand-list-item": {
          flex: "0 0 33.33%",
          maxWidth: "33.33%",
          padding: "0 15px",
          marginBottom: "30px",
          display: "inline-block",
          "@media (max-width:991px)": {
            padding: "0 10px",
            marginBottom: "20px",
          },
          "@media (max-width:679px)": {
            flex: "0 0 50%",
            maxWidth: "50%",
          },
          "@media (max-width:300px)": {
            flex: "0 0 100%",
            maxWidth: "100%",
          },
          "& h3": {
            fontSize: "20px",
            fontWeight: "500",
            color: "#000",
            textAlign: "center",
            marginTop: "5px",
            "@media(max-width:991px)": {
              fontSize: "18px",
            },
          },
          "& .logo-wrapper": {
            width: "100%",
            height: "100%",
            border: "3px solid transparent",
            transition: "border 0.5s",
            "& .card-info-links": {
              position: "absolute",
              top: "2px",
              left: "17px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "160px",
              right: "17px",
              opacity: "0",
              visibility: "hidden",
              backgroundColor: "rgba(255,255,255,0.5)",
              transition: "all 0.5s",
              borderRadius: "20px",
              zIndex: "1",
              "@media(max-width:991px)": {
                left: "12px",
                right: "12px",
                minHeight: "150px",
              },
              "@media (max-width:479px)": {
                minHeight: "135px",
              },
              "@media (max-width:374px)": {
                minHeight: "102px",
              },
              "& a": {
                width: "35px",
                "@media(max-width:991px)": {
                  width: "30px",
                },
                "@media (max-width:479px)": {
                  width: "25px",
                },
                "@media (max-width:251px)": {
                  width: "20px",
                },
                "&+a": {
                  marginLeft: "10px",
                },
              },
            },
            "&:hover": {
              borderColor: colors.primary,
              "& .card-info-links": {
                opacity: "1",
                visibility: "visible",
              },
            },

            "& .MuiCardContent-root": {
              width: "100%",
              height: "100%",
              padding: "0px",
              minHeight: "160px",
              "@media (max-width:991px)": {
                minHeight: "150px",
              },
              "@media (max-width:479px)": {
                minHeight: "130px",
              },
              "@media (max-width:374px)": {
                minHeight: "100px",
              },
              "& a": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                padding: "0",
                "& img": {
                  maxHeight: "200px",
                  width: "auto",
                  cursor: "pointer",
                  "@media (max-width:991px)": {
                    maxHeight: "175px",
                  },
                  "@media (max-width:479px)": {
                    maxHeight: "130px",
                  },
                  "@media (max-width:374px)": {
                    maxHeight: "100px",
                  },
                },
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

export { editcustomerStyle };
