import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";
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
      padding: "20px 0 30px",
      "@media(max-width:991px)": {
        padding: "40px 0 80px",
      },
      "@media(max-width:767px)": {
        padding: "40px 0",
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
                flex: "0 100%",
                alignItems: "center",
                justifyContent: "space-between",
                "@media(max-width:479px)": {
                  flexWrap: "wrap",
                },
                "& .main-title": {
                  fontSize: "20px ",
                  fontWeight: "500",
                  lineHeight: "1.2",
                  color: colors.red,
                  "@media(max-width:767px)": {
                    fontSize: "16px",
                  },
                  "@media(max-width:479px)": {
                    maxWidth: "100%",
                    flex: "0 0 100%",
                    marginTop: "15px",
                  },
                },
                "& .updated-date": {
                  "& span": {
                    color: colors.lightText,
                  },
                  fontSize: "16px ",
                  paddingRight: "20px",
                  fontWeight: "500",
                  lineHeight: "1.2",
                  color: colors.red,
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
                  "@media(max-width:467px)": {
                    maxWidth: "100%",
                    flex: "0 0 100%",
                    padding: "0",
                  },

                  "& .left-title-inner": {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: "8px 0px",
                    "@media(max-width:408px)": {
                      flexWrap: "wrap",
                    },
                    "& .title": {
                      paddingRight: "15px",
                      fontWeight: "600",
                      fontSize: "18px",
                      "@media(max-width:767px)": {
                        fontSize: "16px",
                      },
                      "@media(max-width:408px)": {
                        fontSize: "13px",
                      },
                    },
                    "& .value-container": {
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "& .view-pdf": {
                        "& a": {
                          "& img": {
                            height: "25px",
                            width: "30px",
                            "@media(max-width:767px)": {
                              height: "20px",
                              width: "25px",
                            },
                            "@media(max-width:367px)": {
                              height: "15px",
                              width: "20px",
                            },
                          },
                        },
                      },
                      "& .right-arrow": {
                        padding: "0px 10px",
                        fontSize: "20px",
                        color: `${colors.primary} !important`,
                      },
                      "& .updated-value": {
                        fontWeight: "400",
                        color: `${colors.primary} !important`,
                      },
                      "& h3": {
                        fontSize: "18px",
                        fontWeight: "400",
                        lineHeight: "1.2",
                        color: colors.lightText,
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

export { popupStyle };
