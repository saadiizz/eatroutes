import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const quoteRequeststyle = makeStyles((theme) => ({
  quoteRequestWrapper: {
    "& .quote-page-wrapper": {
      padding: "30px 0 80px",
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
          margin: "1px 0px !important",
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
          "& .back-btn": {
            height: "35px",
            minWidth: "100px",
            "@media(max-width:350px)": {
              flexWrap: "wrap",
              fontSize: "13px",
            },
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
              "& .child-heading": {
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
                  fontSize: "14px",
                  "@media(max-width:350px)": {
                    fontSize: "13px",
                    minWidth: "150px",
                  },
                  padding: "0px 15px",
                },
              },
              "& .quote-details": {
                padding: "20px 0px 20px 30px",
                "@media(max-width:1199px)": {
                  padding: "15px 0px 15px 20px",
                },
                "@media(max-width:767px)": {
                  padding: "15px",
                },
              },
              "& .quote-list-top-item": {
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
                      "& .view-pdf": {
                        "& a": {
                          "& img": {
                            height: "25px",
                            width: "30px",
                          },
                        },
                      },
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
                      },
                    },
                  },
                  "& .shipping-form": {
                    alignItems: "center",
                    flexWrap: "wrap",
                    "& .title": {
                      marginBottom: "3px",
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
                    marginTop: "20px",
                    "@media(max-width:712px)": {
                      marginBottom: "20px",
                    },
                    "& .shipping-btn": {
                      minWidth: "120px",
                      height: "38px",
                      marginTop: "5px",
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
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",

                    "@media(max-width:479px)": {
                      flexWrap: "wrap",
                    },
                    "& .client-status": {
                      padding: "20px 55px 3px 0px",
                      "& p": {
                        paddingLeft: "8px",
                        paddingBottom: "3px",
                        fontWeight: "500",
                        color: colors.primary,
                        fontSize: "18px",
                      },
                      "& .status": {
                        textAlign: "center",
                        border: "1px solid",
                        borderColor: "rgba(0, 0, 0, 0.23)",
                        borderRadius: "30px !important",
                        minWidth: "140px",
                        height: "35px",
                        padding: "6px 13px",
                      },
                    },
                  },
                },
              },
              "& .quote-list-item": {
                padding: "20px 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "@media(max-width:1199px)": {
                  padding: "15px 20px",
                },
                "@media(max-width:767px)": {
                  padding: "15px",
                  flexWrap: "wrap",
                },
                "&+.quote-list-item": {
                  borderTop: "1px solid #d3d2d8",
                },
                "& .left-block": {
                  maxWidth: "50%",
                  flex: "0 0 50%",
                  paddingRight: "15px",
                  "@media(max-width:1199px)": {
                    maxWidth: "40%",
                    flex: "0 0 40%",
                  },
                  "@media(max-width:767px)": {
                    maxWidth: "100%",
                    flex: "0 0 100%",
                    padding: "0",
                  },
                  "& .left-title-inner": {
                    display: "flex",
                    alignItems: "center",
                    "@media(max-width:479px)": {
                      flexWrap: "wrap",
                    },
                    "& em": {
                      maxWidth: "80px",
                      height: "60px",
                      minWidth: "80px",
                      display: "inline-block",
                      padding: "5px",
                      borderRadius: "10px",
                      marginRight: "20px",
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
                    "& .titles-container": {
                      "& :first-child": {
                        fontSize: "16px",
                        color: colors.lightText,
                      },
                      "& h3": {
                        fontSize: "18px",
                        fontWeight: "400",
                        lineHeight: "1.2",
                        wordBreak: "break-word",
                        color: colors.black,
                        "@media(max-width:767px)": {
                          fontSize: "16px",
                        },
                        "@media(max-width:479px)": {
                          maxWidth: "100%",
                          flex: "0 0 100%",
                          marginTop: "5px",
                        },
                      },
                    },
                  },
                },
                "& .right-block": {
                  maxWidth: "50%",
                  flex: "0 0 50%",
                  "@media(max-width:1199px)": {
                    maxWidth: "60%",
                    flex: "0 0 60%",
                  },
                  "@media(max-width:767px)": {
                    maxWidth: "100%",
                    flex: "0 0 100%",
                    paddingLeft: "95px",
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
                    "& p": {
                      color: colors.lightText,
                      fontSize: "18px",
                      "@media(max-width:767px)": {
                        fontSize: "16px",
                      },
                      "@media(max-width:479px)": {
                        maxWidth: "100%",
                        flex: "0 0 100%",
                        marginTop: "10px",
                        lineHeight: "1.3",
                      },
                      "&+p": {
                        marginLeft: "10px",
                        "@media(max-width:479px)": {
                          marginLeft: "0",
                        },
                      },

                      "& span": {
                        color: colors.primary,
                        marginLeft: "3px",
                        wordBreak: "break-word",
                      },
                      "& .grrenSpan": {
                        color: colors.green,
                      },
                      "& .redSpan": {
                        color: colors.primary,
                      },
                      "& a": {
                        "&+a": {
                          marginLeft: "28px",
                          "@media(max-width:1199px)": {
                            marginLeft: "20px",
                          },
                        },
                        "& img": {
                          width: "24px",
                          height: "24px",

                          "@media(max-width:767px)": {
                            width: "18px",
                            height: "18px",
                          },
                        },
                      },
                    },
                    "@media(min-width:480px)": {
                      "& .firstP": {
                        flex: "0 0 30%",
                        maxWidth: "30%",
                      },
                      "& .secondP": {
                        flex: "0 0 21%",
                        maxWidth: "21%",
                      },
                      "& .thirdP": {
                        flex: "0 0 20%",
                        maxWidth: "20%",
                      },
                      "& .fourthP": {
                        flex: "0 0 23%",
                        maxWidth: "23%",
                        display: "flex",
                        justifyContent: "center",
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
  customDialogWrapper: {
    "& .MuiBackdrop-root ": {
      background: "rgba(0,0,0,0.7)",
    },
    "& .MuiDialog-paper ": {
      maxWidth: "1100px",
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
  timestampModal: {
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
          "& .MuiFormControl-root": {
            minWidth: "100%",
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
          "& .error-text": {
            color: "#d32f2f",
          },
          "&.full-width": {
            maxWidth: "100%",
            flex: "0 0 100%",
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
  fileInput: {
    display: "block",
    position: "relative",
    "& .MuiFormControl-root": {
      opacity: 0,
      overflow: "hidden",
      position: "absolute",
      right: "0",
      left: "0",
      "& input": {
        cursor: "pointer",
        fontSize: "0",
      },
    },
    "& .label-block": {
      width: "100%",
      border: " 1px solid #e7e4f1",
      height: "50px",
      margin: 0,
      display: "flex",
      alignItems: "center",
      padding: "0 15px",
      transition: "all 0.3s",
      lineHeight: "50px",
      borderRadius: "25px",
      cursor: "pointer",
      "@media (max-width:767px)": {
        height: "40px",
        lineHeight: "40px",
        borderRadius: "20px",
      },
      "& .file-name": {
        color: colors.primary,
        display: "block",
        marginLeft: "10px",
        lineHeight: "1.321",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      "& img": {
        height: "20px",
        width: "20px",
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
  quoteRequestWrapper: {
    "& .quote-page-wrapper": {
      padding: "50px 0 80px",
      "@media(max-width:991px)": {
        padding: "40px 0 80px",
      },
      "@media(max-width:767px)": {
        padding: "40px 0",
      },
      "& .heading": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        "& h1": {
          fontSize: "18px",
          marginBottom: "0",
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
                "& .main-title": {
                  fontSize: "18px ",
                  fontWeight: "500",
                  lineHeight: "1.2",
                  color: colors.red,
                  "@media(max-width:767px)": {
                    fontSize: "10px",
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
              "& .quote-list-top-item": {
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
                    flexDirection: "row",
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
                        minWidth: "50px",
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
                      "& .view-pdf": {
                        "& a": {
                          "& img": {
                            height: "25px",
                            width: "30px",
                          },
                        },
                      },
                      "& h3": {
                        fontSize: "18px",
                        fontWeight: "400",
                        lineHeight: "1.2",
                        maxWidth: "550px",
                        color: colors.lightText,
                        wordBreak: "break-word",
                        "@media(max-width:991px)": {
                          maxWidth: "320px",
                        },
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
                      "& .red-value": {
                        color: colors.primary,
                      },
                      "& .green-value": {
                        color: colors.green,
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

export { quoteRequeststyle, popupStyle };
