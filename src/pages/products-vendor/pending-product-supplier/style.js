import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";
import downarrowIcon from "@assets/images/down-arrow.svg";

const productStyle = makeStyles((theme) => ({
  productWrapper: {
    "& .product-page-wrapper": {
      padding: "50px 0 80px",
      "@media(max-width:991px)": {
        padding: "40px 0 80px",
      },
      "@media(max-width:767px)": {
        padding: "40px 0",
      },
      "& .product-title-wrapper": {
        "& .product-title-inner": {
          display: "flex",
        },
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "40px",
        alignItems: "center",
        "@media(max-width:991px)": {
          marginBottom: "30px",
        },
        "@media(max-width:679px)": {
          flexDirection: "column",
          alignItems: "flex-start",
        },
        "& h1": {
          marginBottom: "0",
          display: "flex",
          alignItems: "center",
        },
        "& .btn-wrapper": {
          textAlign: "end",
          "@media(max-width:679px)": {
            marginTop: "10px",
          },
          "& :last-child": {
            marginRight: "0",
          },
          "& button": {
            minWidth: "inherit",
            marginBottom: "10px",
            marginRight: "20px",
            "@media(max-width:679px)": {
              marginRight: "10px",
            },
            "& .down-arrow": {
              marginLeft: "12px",
              position: "relative",
              transition: "all 0.3s",
              backgroundImage: "url(" + downarrowIcon + ")",
              width: "17px",
              height: "8px",
              backgroundSize: "17px",
              display: "inline-block",
              backgroundRepeat: "no-repeat",
              transform: "rotate(0)",
              "@media (max-width:767px)": {
                marginLeft: "7px",
              },
            },
          },
          "& .Mui-disabled": {
            backgroundColor: colors.lightGray,
            borderColor: colors.lightGray,
          },
        },
      },
      "& .mobile-sidebar-title": {
        display: "none",
        "@media(max-width:991px)": {
          display: "block",
          padding: "10px",
          margin: "-10px",
          cursor: "pointer",
          color: colors.primary,
          fontSize: "20px",
          fontWeight: "500",
          maxWidth: "100%",
          flex: "0 0 100%",
          "& em": {
            marginRight: "5px",
            position: "relative",
            display: "inline-block",
            top: "-2px",
          },
        },
      },
      "& .product-list-outer": {
        display: "flex",
        "@media(max-width:991px)": {
          flexWrap: "wrap",
        },
        "&.has-three-column": {
          "& .product-sidebar": {
            flex: "0 0 300px",
            maxWidth: "300px",
            "@media(max-width:991px)": {
              flex: "0 0 100%",
              maxWidth: "100%",
            },
          },
          "& .product-list": {
            flex: 1,
            maxWidth: "inherit",
            padding: "0px 30px",
            "@media(max-width:991px)": {
              padding: "0",
            },
            "& .brand-list-ul": {
              "& .brand-list-item": {
                "@media(max-width:1199px)": {
                  flex: "0 0 33.33%",
                  maxWidth: "33.33%",
                },
                "@media(max-width:679px)": {
                  flex: "0 0 50%",
                  maxWidth: "50%",
                },
                "@media(max-width:479px)": {
                  flex: "0 0 100%",
                  maxWidth: "100%",
                },
                "& .white-box": {
                  "& .MuiCardContent-root": {
                    minHeight: "142px",
                  },
                },
              },
            },
          },
        },
        "& .product-sidebar": {
          maxWidth: "359px",
          flex: "0 0 359px",
          "@media(max-width:1199px)": {
            maxWidth: "300px",
            flex: "0 0 300px",
          },
          "@media(max-width:991px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
            position: "fixed",
            left: "-100%",
            width: "100%",
            transition: "all 0.5s",
            top: "0",
            maxHeight: "100vh",
            overflow: "auto",
            zIndex: "1111",
            minHeight: "100vh",
            ".sidebar-open &": {
              left: "0",
            },
          },
        },
        "& .product-list": {
          "& .no-data": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          },
          maxWidth: "calc(100% - 359px)",
          flex: "0 0 calc(100% - 359px)",
          paddingLeft: "27px",
          "@media(max-width:1199px)": {
            maxWidth: "calc(100% - 300px)",
            flex: "0 0 calc(100% - 300px)",
          },
          "@media(max-width:991px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
            paddingLeft: "0",
            marginTop: "30px",
          },
          "& .brand-list-ul": {
            display: "flex",
            padding: "0",
            flexWrap: "wrap",
            margin: "0 -15px -30px",
            alignItems: "flex-start",
            "@media(max-width:991px)": {
              margin: "0 -10px -20px",
            },
            "& .brand-list-item": {
              flex: "0 0 33.33%",
              maxWidth: "33.33%",
              padding: "0 15px",
              marginBottom: "30px",
              "&:hover": {
                "& .card-info-links": {
                  opacity: "1",
                  visibility: "visible",
                },
                "&>a": {
                  "& .white-box": {
                    borderColor: colors.primary,
                  },
                },
              },
              "@media (max-width:991px)": {
                padding: "0 10px",
                marginBottom: "50px",
                maxWidth: "33.33%",
              },
              "@media (max-width:679px)": {
                flex: "0 0 50%",
                maxWidth: "50%",
              },
              "& a": {
                display: "block",
                width: "100%",
              },

              "& .card-info-links": {
                position: "absolute",
                top: "2px",
                left: "17px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "138px",
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
                },
                "& a": {
                  width: "35px",
                  "&+a": {
                    marginLeft: "10px",
                  },
                },
              },
              "& .white-box": {
                border: "3px solid transparent",
                transition: "all 0.5s",
                "& .MuiCardContent-root": {
                  padding: "0",
                  minHeight: "194px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  "& img": {
                    objectFit: "contain",
                    position: "absolute",
                    left: "0",
                    top: "0",
                    right: "0",
                    bottom: " 0",
                    maxWidth: "inherit",
                    height: "100%",
                    width: "100%",
                  },
                },
              },
              "& h3": {
                fontSize: "20px",
                fontWeight: "500",
                color: "#000",
                textAlign: "center",
                marginTop: "14px",
                "@media(max-width:991px)": {
                  fontSize: "18px",
                },
              },
            },
          },
        },
      },
    },
  },
  customMenu: {
    "& .MuiPopover-paper": {
      width: "194px",
      maxHeight: "300px",
    },
    "& .form-wrapper": {
      "& .form-group": {
        position: "relative",
        "& img": {
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          "@media(max-width:767px)": {
            right: "30px",
          },
        },
        "& .MuiTextField-root": {
          padding: "5px",
        },
        "& .MuiInput-input": {
          padding: "0 45px 0 15px !important",
          maxWidth: "240px",
          height: "36px",
          "@media(max-width:767px)": {
            padding: "0 40px 0 20px !important",
          },
          "@media(max-width:479px)": {
            maxWidth: "100%",
          },
        },
      },
    },
    "& .MuiMenu-list": {
      padding: "0",
      "& li": {
        padding: "15px 20px",
        fontSize: "16px",
        borderBottom: "1px solid rgba(211,210,216,0.6)",
        wordBreak: "break-all",
        whiteSpace: "normal",
      },
      "& :last-child": {
        borderBottom: "none",
      },
    },
  },
}));

export { productStyle };
