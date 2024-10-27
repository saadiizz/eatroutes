import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const viewproductStyle = makeStyles((theme) => ({
  customDialogWrapper: {
    "& .MuiBackdrop-root ": {
      background: "rgba(0,0,0,0.7)",
    },
    "& .MuiDialog-paper ": {
      maxWidth: "1000px",
      width: "100%",
      boxShadow: "0 0 18px 0 rgba(0, 0, 0, 0.1)",
      borderRadius: "20px",
      margin: "15px",
      "@media(max-width:691px)": {
        maxWidth: "calc(100% - 30px) !important",
      },
      "& .popup-header": {
        "& .cross-btn": {
          position: "absolute",
          right: "30px",
          margin: "-10px",
          padding: "10px",
          top: "62%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          "@media(max-width:767px)": {
            right: "15px",
            top: "69%",
          },
        },
        "& h4": {
          position: "relative",
          padding: "27px 30px",
          background: colors.primary,
          fontSize: "20px",
          lineHeight: "1.2",
          fontWeight: "500",
          color: colors.white,
          "@media(max-width:767px)": {
            padding: "15px",
            fontSize: "18px",
          },
        },
      },
      "& .MuiDialogActions-root ": {
        justifyContent: "center",
        padding: "17px 15px 30px",
        "& button": {
          minWidth: "118px",
        },
        "@media(max-width:767px)": {
          padding: "15px",
        },
      },
    },
  },
  viewproductWrapper: {
    "& .popup-header": {
      display: "flex",
      justifyContent: "space-between",
      padding: "27px 30px",
      background: colors.primary,
      "@media(max-width:767px)": {
        padding: "15px",
      },
      "& h4": {
        background: "transparent !important",
        padding: "0 !important",
      },
      "& button": {
        minWidth: "inherit",
        padding: "0",
      },
    },
    "& .viewpopup-content": {
      padding: "0 0 30px 0",

      "& .product-info": {
        "& li": {
          padding: "13px 30px",
          display: "flex",
          "@media(max-width:767px)": {
            padding: "10px 15px",
          },
          "@media(max-width:575px)": {
            flexWrap: "wrap",
          },
          "& +li.border": {
            borderTop: "1px solid rgba(211,210,216,0.6)",
          },
          "& .product-img": {
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
          "& span": {
            flex: "0 0 155px",
            maxWidth: "155px",
            paddingRight: "15px",
            fontSize: "18px",
            color: "black",
            "@media(max-width:767px)": {
              fontSize: "16px",
            },
            "@media(max-width:575px)": {
              flex: "0 0 100%",
              maxWidth: "100%",
              paddingRight: "0",
              paddingBottom: "3px",
              fontSize: "14px",
            },
          },
          "& .oldNewContainer": {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            "& h3": {
              fontSize: "18px",
              fontWeight: "400",
              lineHeight: "1.2",
              color: "black",
              wordBreak: "break-all",
              "@media(max-width:767px)": {
                fontSize: "16px",
              },
              "@media(max-width:408px)": {
                fontSize: "14px",
              },
              "& a": {
                color: colors.lightText,
                textDecoration: "underline",
              },
            },
            "& .oldValue": {
              color: colors.lightText,
            },
            "& .right-arrow": {
              padding: "0px 12px",
              fontSize: "30px",
              fontWeight: "700",
              color: `${colors.primary} !important`,
              "@media(max-width:867px)": {
                fontSize: "22px",
              },
              "@media(max-width:676px)": {
                fontSize: "16px",
              },
            },
            "& .flavor-arrow": {
              padding: "0px 12px",
              fontSize: "30px",
              fontWeight: "700",
              color: "#838383",
              "@media(max-width:867px)": {
                fontSize: "22px",
              },
              "@media(max-width:676px)": {
                fontSize: "16px",
              },
            },
          },
        },
      },

      "& .button-wrapper": {
        marginTop: "25px",
        padding: "0 30px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "& button": {
          width: "100%",
          "&  +button": {
            marginLeft: "20px",
          },
          "@media(max-width:575px)": {
            marginLeft: "0",
            "&  +button": {
              marginTop: "15px",
            },
          },
        },
        "@media(max-width:767px)": {
          padding: "0 15px",
          marginTop: "10px",
        },
        "@media(max-width:575px)": {
          flexWrap: "wrap",
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
const quoteRequeststyle = makeStyles((theme) => ({
  quoteRequestWrapper: {
    "& .quote-page-wrapper": {
      padding: "10px 15px",
      "@media(max-width:991px)": {
        padding: "40px 0 80px",
      },
      "@media(max-width:767px)": {
        padding: "40px 0",
      },
      "& h1": {
        marginBottom: "28px",
        "@media(max-width:991px)": {
          marginBottom: "18px",
        },
      },
      "& .form-group": {
        "& .MuiTextField-root": {
          paddingRight: "55px",
        },
        "& .MuiSelect-select": {
          padding: "6px 13px",
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: "30px !important",
          minWidth: "140px",
        },
        "& .MuiOutlinedInput-root:focus": {
          outline: "none",
          border: "none",
        },
        "& .status-label": {
          paddingLeft: "8px",
          paddingBottom: "3px",
          fontWeight: "500",
          color: colors.primary,
          fontSize: "18px",
        },
      },
      "& .heading": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        "& h1": {
          marginBottom: "0",
        },
        "& .search-wrapper": {
          display: "flex",
          alignItems: "end",
          "@media(max-width:479px)": {
            flexWrap: "wrap",
          },
          "& .form-wrapper": {
            "& .form-group": {
              position: "relative",
              "& img": {
                position: "absolute",
                right: "35px",
                top: "50%",
                transform: "translateY(-50%)",
                "@media(max-width:767px)": {
                  right: "30px",
                },
              },
              "& .MuiTextField-root": {
                paddingRight: "20px",
                marginRight: "-40px",
              },
              "& .MuiOutlinedInput-input": {
                padding: "0 55px 0 30px !important",
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
          "& input": {
            "&::placeholder": {
              color: colors.lightText,
              fontWeight: "500",
            },
          },
        },
        "& .form-group": {
          "& .MuiTextField-root": {
            marginRight: "-55px",
          },
        },
        "@media (max-width:470px)": {
          display: "block",
          "& .form-group": {
            marginTop: "25px",
          },
        },
      },
      "& .quote-request-list": {
        overflow: "auto",
        paddingBottom:"2rem",
        "& .profile-image": {
          height: "130px",
          width: "130px",
          margin: "20px auto 5px",
          position: "relative",
          borderRadius: "50%",
          backgroundColor: colors.lightGrayBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "@media(max-width:991px)": {
            height: "110px",
            width: "110px",
            margin: "0 auto",
          },
          "@media(max-width:374px)": {
            height: "100px",
            width: "100px",
          },
          "& span": {
            fontSize: "36px",
            "@media(max-width:991px)": {
              fontSize: "11px",
            },
          },
          "& .user-image": {
            height: "130px",
            width: "130px",
            border: `1px solid ${colors.lightGrayBg}`,
            borderRadius: "50%",

            "@media(max-width:991px)": {
              height: "110px",
              width: "110px",
            },
            "@media(max-width:374px)": {
              height: "100px",
              width: "100px",
            },
          },
        },
        "& .imageHeading": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "20px",
          textAlign: "center",
          color: colors.primary,
          margin: "0px auto",
          marginBottom: "2rem",
        },
        "& .quote-request-item": {
          padding: "0px 10px",
          "&+.quote-request-item": {
            marginTop: "30px",
          },
          "& .white-box": {
            padding: "30px 0 30px",
            overflow: "hidden",
            "@media(max-width:1199px)": {
              padding: "15px 0  20px",
            },
            "& .MuiAccordion-root": {
              boxShadow: "none",
              borderRadius: "0",
              border: "0",
              "& .MuiAccordionSummary-root": {
                padding: "0",
                minHeight: "inherit",
                "& .MuiAccordionSummary-content": {
                  margin: "0",
                },
              },
              "& .MuiAccordionDetails-root": {
                padding: "0",
              },
              "& .down-arrow-wrapper": {
                position: "relative",
                width: "26px",
                height: "26px",
                "@media(max-width:479px)": {
                  width: "20px",
                  height: "20px",
                },
                "& img": {
                  position: "absolute",
                  right: "0px",
                  left: "0px",
                  top: "0px",
                  bottom: "0px",
                  transition: "0.3s",
                },
              },
              "& .open-dropdown": {
                opacity: "0",
                visibility: "hidden",
              },
              "&.Mui-expanded": {
                "& .open-dropdown": {
                  opacity: "1",
                  visibility: "visible",
                },
                "& .down-arrow-wrapper": {
                  "& img": {
                    transform: "rotate(180deg)",
                  },
                },
                "& .close-dropdown": {
                  opacity: "0",
                  visibility: "hidden",
                },
              },
            },
            "& .quote-heading": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 30px",
              width: "100%",
              "@media(max-width:1199px)": {
                padding: "0 20px",
              },
              "@media(max-width:767px)": {
                padding: "0 15px",
              },
              "& .quote-title-block": {
                display: "flex",
                alignItems: "center",
                "@media(max-width:479px)": {
                  flexWrap: "wrap",
                },
                "& h2": {
                  fontSize: "20px",
                  fontWeight: "500",
                  lineHeight: "1.2",
                  color: colors.red,
                  "@media(max-width:767px)": {
                    fontSize: "18px",
                  },
                  "@media(max-width:479px)": {
                    maxWidth: "100%",
                    flex: "0 0 100%",
                    marginTop: "10px",
                  },
                },
              },
              "& a": {
                color: colors.primary,
                fontSize: "18px",
                textTransform: "uppercase",
                padding: "10px",
                margin: "-10px -10px -10px 0",
                "&:hover": {
                  textDecoration: "underline",
                },
                "@media(max-width:767px)": {
                  order: "1",
                  margin: "-10px -10px 0  auto",
                },
              },
            },
            "& .quote-content": {
              marginBottom: "-30px",
              "@media(max-width:1199px)": {
                marginBottom: "-20px",
              },
              "@media(max-width:767px)": {
                marginBottom: "-15px",
              },
              "& .quote-list-item": {
                padding: "20px 0px 20px 30px",
                display: "flex",
                justifyContent: "space-between",
                "@media(max-width:1199px)": {
                  padding: "15px 0px 15px 20px",
                },
                "@media(max-width:767px)": {
                  padding: "15px",
                  flexWrap: "wrap",
                },
                "&+.quote-list-item": {
                  borderTop: "1px solid #d3d2d8",
                },
                "& .left-block": {
                  paddingRight: "15px",
                  maxWidth: "70%",
                  "@media(max-width:467px)": {
                    maxWidth: "100%",
                    flex: "0 0 100%",
                    padding: "0",
                  },
                  "& .brand-inner": {
                    marginBottom: "-9px !important",
                    alignItems: "center !important",
                  },
                  "& .left-title-inner": {
                    display: "flex",
                    alignItems: "flex-start",
                    margin: "8px 0px",
                    "& .title": {
                      minWidth: "140px",
                      paddingRight: "10px",
                      fontWeight: "600",
                      fontSize: "18px",
                      "@media(max-width:767px)": {
                        fontSize: "16px",
                      },
                      "@media(max-width:408px)": {
                        minWidth: "115px",
                        fontSize: "14px",
                      },
                    },
                    "& .brand-container": {
                      display: "flex",
                      alignItems: "center",
                      "@media(max-width:408px)": {
                        flexWrap: "wrap",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        "& em": {
                          margin: "5px 0px",
                        },
                      },
                      "& h3": {
                        fontSize: "18px",
                        fontWeight: "400",
                        lineHeight: "1.2",
                        color: colors.lightText,
                        "@media(max-width:767px)": {
                          fontSize: "16px",
                        },
                        "@media(max-width:408px)": {
                          fontSize: "14px",
                        },
                      },
                    },
                    "& em": {
                      height: "45px",
                      maxWidth: "60px",
                      minWidth: "60px",
                      margin: "0 20px",
                      display: "inline-block",
                      padding: "5px",
                      borderRadius: "10px",
                      boxShadow: "0 0 18px 0 rgb(0 0 0 / 10%)",
                      "@media(max-width:767px)": {
                        marginRight: "15px",
                      },
                      "@media(max-width:479px)": {
                        maxWidth: "60px",
                        minWidth: "60px",
                        height: "50px",
                      },
                      "& img": {
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      },
                    },
                    "& .value-container": {
                      "& h3": {
                        fontSize: "18px",
                        fontWeight: "400",
                        lineHeight: "1.2",
                        color: colors.lightText,
                        wordBreak: "break-word",
                        "@media(max-width:767px)": {
                          fontSize: "16px",
                        },
                        "@media(max-width:479px)": {
                          maxWidth: "100%",
                          flex: "0 0 100%",
                        },
                        "@media(max-width:408px)": {
                          fontSize: "14px",
                        },
                        "& a": {
                          color: colors.lightText,
                          textDecoration: "underline",
                        },
                      },
                    },
                  },
                  "& .shipping-details": {
                    marginTop: "20px",
                    "@media(max-width:712px)": {
                      marginBottom: "20px",
                    },
                    "& .heading": {
                      color: colors.primary,
                      fontSize: "20px",
                      fontWeight: "500",
                      marginBottom: "10px",
                      "@media(max-width:767px)": {
                        fontSize: "18px",
                      },
                    },
                    "& .details-heading": {
                      marginBottom: "10px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      "& div": {
                        color: colors.primary,
                        fontSize: "20px",
                        fontWeight: "500",
                        "@media(max-width:767px)": {
                          fontSize: "18px",
                        },
                      },
                      "& button": {
                        height: "35px",
                        minWidth: "100px",
                        margin: "0px 35px",
                      },
                    },
                    "& .left-title-inner": {
                      "& .title": {
                        minWidth: "180px !important",
                      },
                    },
                  },
                },
                "& .right-block": {
                  "@media(max-width:467px)": {
                    maxWidth: "100%",
                    flex: "0 0 100%",
                    paddingLeft: "100px",
                  },
                  "@media(max-width:479px)": {
                    paddingLeft: "0",
                  },
                  "& .right-inner": {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    "@media(max-width:479px)": {
                      flexWrap: "wrap",
                    },
                    "& .Mui-disabled": {
                      color: colors.lightGray,
                      fontWeight: "500",
                    },
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

const popupStyle = makeStyles((theme) => ({
  customModal: {
    "& .MuiDialog-paperWidthSm": {
      boxShadow: "0 3px 8px 0 rgba(0, 0, 0, 0.24)",
      maxWidth: "500px",
      width: "100%",
      "@media(max-width:991px)": {
        width: "450px",
      },
      "@media(max-width:391px)": {
        width: "auto",
      },
    },
  },
  popupWrapper: {
    "& .popup-content": {
      padding: "30px 28px",
      maxHeight: "calc(100vh - 110px)",
      overflow: "auto",
      "@media (max-width:1199px)": {
        padding: "25px",
      },
      "@media (max-width:991px)": {
        padding: "18px",
      },
      "& .MuiDialogActions-root": {
        padding: "25px 15px 0px !important",
      },
      "& .form-wrapper": {
        display: "flex",
        flexWrap: "wrap",
        margin: "0 -15px -30px",
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
          marginBottom: "30px",
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
          "& .MuiInputLabel-root": {
            fontSize: "16px",
            marginLeft: "6px",
          },
          "& .MuiOutlinedInput-input": {
            "&::placeholder": {
              fontSize: "12px",
              "@media (max-width:667px)": {
                fontSize: "10px",
              },
              "@media (max-width:391px)": {
                fontSize: "9px",
              },
            },
          },
          "& .date-input": {
            color: "red",
            fontSize: "30px",
            "& .MuiOutlinedInput-root": {
              "& .MuiOutlinedInput-input": {
                color: "grey",
                "&::-webkit-calendar-picker-indicator": {
                  cursor: "pointer",
                },
              },
            },
          },
          "& .reject-reason": {
            "& .MuiInputLabel-root": {
              marginLeft: "15px !important",
              marginBottom: "0px !important",
            },
            "& .MuiOutlinedInput-root": {
              padding: "5px",
            },
          },
          "&.full-width": {
            maxWidth: "100%",
            flex: "0 0 100%",
          },
        },
      },
      "& .customer-brand-wrapper ": {
        "& .brand-heading ": {
          "& .brand-title": {
            "@media(min-width:1199px)": {
              fontSize: "24px",
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
      "& .MuiDialogActions-root": {
        padding: "0 !important",
        marginTop: "20px",
        "& .primary-btn": {
          width: "100%",
        },
      },
    },
  },
}));

export { viewproductStyle, quoteRequeststyle, popupStyle };
