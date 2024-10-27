import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

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
          },
          "& .Mui-disabled": {
            backgroundColor: colors.lightGray,
            borderColor: colors.lightGray,
          },
        },
        "& .upload-image": {
          height: "140px",
          width: "220px",
          marginRight: "15px",
          position: "relative",
          borderRadius: "15px",
          overflow: "hidden",
          padding: "5px",
          boxShadow: "0 0 18px 0 rgb(0 0 0 / 10%)",
          "@media(max-width:991px)": {
            height: "110px",
            width: "173px",
            marginRight: "10px",
          },
          "@media(max-width:374px)": {
            height: "80px",
            width: "90px",
            marginRight: "5px",
          },
          "& .user-image": {
            height: "100%",
            width: "100%",
            position: "relative",
            "@media(max-width:991px)": {
              height: "100%",
              width: "100%",
            },
            "@media(max-width:374px)": {
              height: "70px",
              width: "80px",
            },
          },
          "& .MuiFormControl-root": {
            height: "100%",
            width: "100%",
            zIndex: "100",
            position: "absolute",
            left: 0,
            "& .MuiInputBase-formControl": {
              height: "100%",
              width: "100%",
              border: "none",
              "& input": {
                padding: "0",
                position: "relative",
                zIndex: "99",
                opacity: "0",
                height: "100%",
                width: "100%",
                cursor: "pointer",
                paddingLeft: "100%",
                marginRight: "-100%",
              },
              "& fieldset": {
                display: "none",
              },
            },
          },
          "& em": {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            "& img": {
              cursor: "pointer",
            },
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
                  flex: "0 0 50%",
                  maxWidth: "50%",
                },
                "@media(max-width:991px)": {
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
          "& .vender-info": {
            flex: "0 0 264px",
            maxWidth: "264px",
            "@media(max-width:991px)": {
              flex: "0 0 100%",
              maxWidth: "100%",
              marginTop: "30px",
            },
            "& .white-box": {
              "& .MuiCardContent-root": {
                padding: "0px",
                "& .sidebar-title": {
                  textAlign: "center",
                  background: colors.grayBg,
                  padding: "21px 30px",
                  borderRadius: "20px 20px 0 0",
                  color: colors.primary,
                  fontSize: "20px",
                  fontWeight: "500",
                  "@media(max-width:991px)": {
                    padding: "15px",
                    fontSize: "18px",
                    textAlign: "center",
                  },
                },
                "& .vendor-content": {
                  padding: "30px 26px",
                  textAlign: "center",
                  "@media(max-width:991px)": {
                    padding: "15px",
                  },
                  "& > img": {
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "25px",
                  },
                  "& span": {
                    display: "block",
                    color: colors.lightText,
                    "&.vendor-name": {
                      fontSize: "20px",
                      color: colors.primary,
                      fontWeight: "700",
                      "@media(max-width:991px)": {
                        fontSize: "18px",
                      },
                    },
                  },
                  "& ul": {
                    marginTop: "20px",
                    padding: "0",
                    "& li": {
                      padding: "0",
                      "& + li": {
                        marginTop: "15px",
                      },
                      "& a": {
                        color: colors.black,
                        fontSize: "18px",
                        display: "flex",
                        width: "100%",
                        wordBreak: "break-all",
                        "@media(max-width:991px)": {
                          fontSize: "16px",
                          justifyContent: "center",
                        },
                        "&:hover": {
                          color: colors.primary,
                        },
                        "& em": {
                          flex: "0 0 27px",
                          maxWidth: "27px",
                          marginRight: "10px",
                          textAlign: "center",
                          position: "relative",
                          top: "-2px",
                        },
                      },
                    },
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
              padding: "0 15px",
              maxWidth: "33.33%",
              flex: "0 0 33.33%",
              marginBottom: "30px",
              "@media(max-width:1024px)": {
                maxWidth: "50%",
                flex: "0 0 50%",
              },
              "@media(max-width:991px)": {
                maxWidth: "33.33%",
                flex: "0 0 33.33%",
                padding: "0 10px",
                marginBottom: "20px",
              },
              "@media(max-width:679px)": {
                maxWidth: "50%",
                flex: "0 0 50%",
              },
              "@media(max-width:479px)": {
                maxWidth: "100%",
                flex: "0 0 100%",
              },
              "& a": {
                display: "block",
                width: "100%",
                "&:hover": {
                  "& .white-box": {
                    borderColor: colors.primary,
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
                  maxHeight: "194px",
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
}));

const popupStyle = makeStyles((theme) => ({
  customModal: {
    "& .MuiDialog-paperWidthSm": {
      boxShadow: "0 3px 8px 0 rgba(0, 0, 0, 0.24)",
      maxWidth: "580px",
      width: "100%",
      "@media(max-width:691px)": {
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
          "&.full-width": {
            maxWidth: "100%",
            flex: "0 0 100%",
          },
        },
      },
      "& .reject-reason": {
        "& .MuiInputLabel-root": {
          marginLeft: "12px !important",
          marginBottom: "0px !important",
          whiteSpace: "normal !important",
        },
        "& .MuiOutlinedInput-root": {
          padding: "5px",
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

const customerListStyle = makeStyles((theme) => ({
  customerSearchWrapper: {
    display: "flex",
    justifyContent: "end",
    flexWrap: "wrap",
    "& .form-wrapper": {
      margin: "0 5px",
      "@media(max-width:767px)": {
        margin: "10px 5px 0",
      },
      "@media(max-width:479px)": {
        width: "100%",
      },
    },
    "& input": {
      "&::placeholder": {
        color: colors.lightText,
        fontWeight: "500",
      },
    },
    "& .select-all": {
      height: "40px",
      margin: "20px 30px 10px 0px",
      border: `1px solid rgb(194,194,194)`,
      borderRadius: "20px",
      "& div": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 12px",
      },
      "& p": {
        fontSize: "16px",
        fontWeight: "normal",
        paddingRight: "10px",
        color: colors.lightText,
      },
      "& .MuiCheckbox-root": {
        padding: "0px !important",
      },
    },
  },
  formWrapper: {
    margin: "20px 20px 10px 0px",
    "& .form-group": {
      position: "relative",
      "& img": {
        position: "absolute",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        "@media(max-width:767px)": {
          right: "15px",
        },
      },
      "& .MuiOutlinedInput-root": {
        borderRadius: "20px",
      },
      "& .MuiOutlinedInput-input": {
        padding: "0 55px 0 30px !important",
        maxWidth: "180px",
        height: "40px",
        "@media(max-width:767px)": {
          padding: "0 45px 0 20px !important",
        },
        "@media(max-width:479px)": {
          maxWidth: "100%",
        },
      },
    },
  },
  customerListBox: {
    padding: "20px 30px",
    "@media(max-width:991px)": {
      padding: "20px",
    },
    "& .customer-list-row": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "0 -30px",
      "@media(max-width:991px)": {
        margin: "0 -20px",
      },
      "@media(max-width:574px)": {
        flexDirection: "column",
        alignItems: "flex-start",
      },
      "& + .customer-list-row": {
        borderTop: "1px solid rgba(211,210,216,0.6)",
        marginTop: "20px",
        paddingTop: "20px",
      },
      "& .left-column": {
        display: "flex",
        alignItems: "center",
        padding: "0 15px 0 30px",
        "@media(max-width:991px)": {
          padding: "0 15px 0 20px",
        },
        "@media(max-width:374px)": {
          flexDirection: "column",
          alignItems: "flex-start",
        },
        "& .short-name": {
          fontSize: "24px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: colors.primary,
          color: colors.white,
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          "@media(max-width:991px)": {
            fontSize: "20px",
            width: "50px",
            height: "50px",
          },
          "& img": {
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            objectFit: "cover",
          },
        },
        "& .customer-detail": {
          display: "flex",
          flexDirection: "column",
          marginLeft: "20px",
          "@media(max-width:991px)": {
            marginLeft: "15px",
          },
          "@media(max-width:374px)": {
            marginLeft: "0px",
            marginTop: "10px",
          },
          "& .customer-name": {
            fontSize: "20px",
            marginBottom: "8px",
            "@media(max-width:991px)": {
              fontSize: "18px",
              marginBottom: "3px",
            },
          },
          "& a": {
            fontSize: "18px",
            textDecoration: "none",
            color: colors.primary,
            "@media(max-width:991px)": {
              fontSize: "16px",
            },
          },
        },
      },
      "& .right-column": {
        padding: "0 30px 0 15px",
        "@media(max-width:991px)": {
          padding: "0 20px 0 15px",
        },
        "@media(max-width:574px)": {
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          marginTop: "10px",
        },
      },
      "&.brown-color": {
        "& .left-column": {
          "& .short-name": {
            backgroundColor: colors.brown,
          },
          "& .customer-detail": {
            "& a": {
              color: colors.brown,
            },
          },
        },
      },
      "&.orange-color": {
        "& .left-column": {
          "& .short-name": {
            backgroundColor: colors.orange,
          },
          "& .customer-detail": {
            "& a": {
              color: colors.orange,
            },
          },
        },
      },
      "&.yellow-color": {
        "& .left-column": {
          "& .short-name": {
            backgroundColor: colors.lightYellow,
          },
          "& .customer-detail": {
            "& a": {
              color: colors.lightYellow,
            },
          },
        },
      },
      "&.blue-color": {
        "& .left-column": {
          "& .short-name": {
            backgroundColor: colors.skyBlue,
          },
          "& .customer-detail": {
            "& a": {
              color: colors.skyBlue,
            },
          },
        },
      },
      "&.green-color": {
        "& .left-column": {
          "& .short-name": {
            backgroundColor: colors.lightGreen,
          },
          "& .customer-detail": {
            "& a": {
              color: colors.lightGreen,
            },
          },
        },
      },
    },
  },
}));

export { productStyle, popupStyle, customerListStyle };
