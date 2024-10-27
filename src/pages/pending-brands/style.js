import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const brandsStyle = makeStyles((theme) => ({
  brandsWrapper: {
    "& .brand-list-wrapper": {
      padding: "50px 0 80px",
      "@media(max-width:991px)": {
        padding: "40px 0 80px",
      },
      "@media(max-width:767px)": {
        padding: "40px 0",
      },
      "& .brand-title-wrapper": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "@media(max-width:650px)": {
          flexWrap: "wrap",
        },
        "& h1": {
          marginBottom: "0",
          paddingRight: "10px !important",
          "@media(max-width:650px)": {
            marginBottom: "10px",
          },
        },
        "& .heading-right": {
          display: "flex",
          margin: "0 -5px",
          "@media(max-width:630px)": {
            flexWrap: "wrap",
          },
          "& .primary-border-btn": {
            minWidth: "92px",
            margin: "0 5px 5px",
            "@media(max-width:479px)": {
              width: "100%",
            },
          },
          "& .form-wrapper": {
            margin: "0 5px 5px",
            "@media(max-width:479px)": {
              width: "100%",
            },
            "& .form-group": {
              position: "relative",
              "& img": {
                position: "absolute",
                right: "25px",
                top: "50%",
                transform: "translateY(-50%)",
                "@media(max-width:767px)": {
                  right: "20px",
                },
              },
              "& .MuiOutlinedInput-input": {
                padding: "0 55px 0 30px !important",
                maxWidth: "227px",
                "@media(max-width:767px)": {
                  padding: "0 45px 0 20px !important",
                },
                "@media(max-width:479px)": {
                  maxWidth: "100%",
                },
              },
            },
          },
        },
      },
      "& .no-data": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      },
      "& .brand-list": {
        marginTop: "30px",
        padding: "0px",
        display: "flex",
        flexWrap: "wrap",
        margin: "0 -15px -30px",
        // "@media (max-width:991px)": {
        //   margin: "0 -10px -20px",
        // },
        "& .brand-list-item": {
          flex: "0 0 33.33%",
          maxWidth: "33.33%",
          padding: "0 15px",
          marginBottom: "60px",
          display: "inline-block",
          "@media (max-width:991px)": {
            padding: "0 10px",
            marginBottom: "50px",
          },
          "@media (max-width:679px)": {
            flex: "0 0 50%",
            maxWidth: "50%",
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
              minHeight: "229px",
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
                minHeight: "197px",
              },
              "@media (max-width:479px)": {
                minHeight: "152px",
              },
              "@media (max-width:374px)": {
                minHeight: "144px",
              },
              "@media (max-width:251px)": {
                minHeight: "167px",
              },
              "& a": {
                width: "35px",
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
              minHeight: "200px",
              "@media (max-width:991px)": {
                minHeight: "175px",
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
}));

export { brandsStyle };
