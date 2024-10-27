import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const quoteRequeststyle = makeStyles((theme) => ({
  quoteRequestWrapper: {
    "& .quote-page-wrapper": {
      padding: "50px 0 80px",
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
          padding: "6px 30px 6px 13px",
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
        "& .quote-request-item": {
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
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    "& .brand-inner-img": {
                      marginRight: "20px",
                      marginBottom: "10px",
                      borderRadius: "10px",
                      boxShadow: "0 0 18px 0 rgb(0 0 0 / 10%)",
                      "& img": {
                        padding: "8px",
                        height: "120px",
                        width: "125px",
                      },
                    },
                  },
                  "& .left-title-inner": {
                    display: "flex",
                    alignItems: "flex-start",
                    margin: "8px 0px",
                    "& .title": {
                      minWidth: "100px",
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
                  "& .rejected-reason": {
                    flexWrap: "wrap",
                    "& h3": {
                      color: `${colors.white} !important`,
                      backgroundColor: colors.primary,
                      fontWeight: 500,
                      padding: "5px 10px",
                      borderRadius: "10px",
                    },
                  },
                  "& .shipping-details": {
                    marginTop: "10px",
                    "& .child-heading": {
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
                        fontSize: "14px",
                        "@media(max-width:350px)": {
                          fontSize: "13px",
                          minWidth: "150px",
                        },
                        padding: "0px 15px",
                      },
                    },
                    "& .left-title-inner": {
                      "& .title": {
                        minWidth: "170px !important",
                      },
                    },
                  },
                },
                "& .approval-block": {
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
                    flexDirection: "column",
                    "@media(max-width:479px)": {
                      flexWrap: "wrap",
                    },
                    "@media(max-width:691px)": {
                      alignItems: "baseline",
                    },
                    "& .form-group": {
                      padding: "20px 0px 3px 0px",
                      "& .MuiSelect-select": {
                        paddingLeft: "30px",
                      },
                      "& .MuiOutlinedInput-root": {
                        minWidth: "172px !important",
                      },
                    },
                    "& .right-block": {
                      paddingRight: "65px",
                      "@media(max-width:767px)": {
                        paddingRight: "5px",
                      },
                      "& p": {
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#212121",
                        "@media(max-width:767px)": {
                          fontSize: "17px",
                          marginTop: "10px",
                        },
                        "@media(max-width:479px)": {
                          maxWidth: "100%",
                          flex: "0 0 100%",
                          marginTop: "10px",
                          lineHeight: "1.3",
                        },
                        "& span": {
                          color: colors.primary,
                          marginLeft: "3px",
                          "& .grrenSpan": {
                            fontWeight: "500",
                            color: colors.green,
                          },
                          "& .redSpan": {
                            fontWeight: "500",
                            color: colors.red,
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
      "& .charge-container": {
        display: "flex",
        flexDirection: "row",
        margin: "0px 10px 16px 21px",
        alignItems: "center",
        "& p": {
          margin: "0px",
          fontWeight: "400",
          color: colors.grayLight,
          fontSize: "18px",
        },
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

          "& .reject-reason": {
            "& .MuiInputLabel-root": {
              marginLeft: "15px !important",
              marginBottom: "0px !important",
            },
            "& .MuiOutlinedInput-root": {
              padding: "5px",
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

export { quoteRequeststyle, popupStyle };
