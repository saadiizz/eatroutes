import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const addnewbrandStyle = makeStyles((theme) => ({
  addnewbrandWrapper: {
    "& .add-new-brand-wrapper": {
      padding: "50px 0 80px",
      "@media(max-width:991px)": {
        padding: "40px 0 80px",
      },
      "@media(max-width:767px)": {
        padding: "40px 0",
      },
      "& h1": {
        marginBottom: "38px",
        "@media(max-width:991px)": {
          marginBottom: "15px",
        },
      },
      "& .brand-heading": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& h1": {
          marginBottom: "0",
        },
        "& .primary-border-btn": {
          minWidth: "92px",
        },
      },
      "& .white-box": {
        marginTop: "30px",
        padding: "30px 30px 40px",
        "@media (max-width:1199px)": {
          padding: "25px",
        },
        "@media (max-width:991px)": {
          padding: "15px",
        },
        "& .stepper-btn-wrapper": {
          display: "flex",
          paddingTop: "30px",
          justifyContent: "space-between",
          alignItems: "center",
          "@media (max-width:1023px)": {
            display: "block",
            overflow: "overlay",
            "& .stepper-btn-2": {
              float: "right",
              "& button": {
                marginTop: "10px",
              },
            },
          },
        },
        "& .MuiStepper-root.MuiStepper-horizontal": {
          // display: "none",
          marginBottom: "30px",
        },
        "@media(max-width:550px)": {
          "& .MuiStepper-root.MuiStepper-horizontal": {
            display: "block",
          },
        },
        "& .MuiStepButton-root": {
          margin: "-12px -8px",
        },
        "& .primary-border-btn,.primary-btn": {
          minWidth: "108px",
        },
        "& .primary-border-btn": {
          color: colors.primary,
          "&:hover": {
            color: colors.white,
          },
        },
        "& .secure-note": {
          display: "flex",
          alignItems: "center",
          "& img": {
            height: "50px",
            width: "50px",
            marginRight: "10px",
          },
          "& h5": {
            textAlign: "left",
            lineHeight: "20px",
          },
        },
        "& .form-wrapper": {
          display: "flex",
          flexWrap: "wrap",
          margin: "0 -15px -28px",
          "@media (max-width:1199px)": {
            margin: "0 -15px -25px",
          },
          "@media (max-width:991px)": {
            margin: "0 -15px -20px",
          },
          "& .labelWithEye": {
            display: "flex",
            marginTop: "10px",
            "& a": {
              height: "30px",
              width: "32px",
              "& img": {
                height: "30px",
                width: "32px",
              },
            },
          },
          "& .csv-info": {
            "& p": {
              paddingRight: "4px",
              "& a": {
                textDecoration: "underline",
                cursor: "pointer",
                color: colors.primary,
              },
            },
            "& .i-btn": {
              padding: "1px 8px",
              textAlign: "center",
              borderRadius: "100%",
              color: colors.white,
              cursor: "pointer",
              backgroundColor: colors.primary,
              position: "relative",
              left: "8px",
              top: "2px",
            },
          },
          "& .profile-wrapper": {
            display: "flex",
            flex: "0 0 100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
            "& h4": {
              margin: "8px 0px 0px",
              fontSize: "17px",
              textAlign: "center",
            },
            "& p": {
              margin: "4px",
              color: "#838383",
              fontSize: "14px",
              textAlign: "center",
            },
            "& .file-name": {
              color: colors.primary,
              wordBreak: "break-all",
              textAlign: "center",
              margin: "5px 0px 0px",
            },
          },
          "& .document-wrapper": {
            flex: "0 0 33.33%",
            minWidth: "33.33%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "10px 0px 50px",
            padding: "0 15px",
            maxWidth: "50%",

            "@media (max-width:1100px)": {
              flex: "0 0 50%",
              minWidth: "50%",
            },
            "@media (max-width:667px)": {
              flex: "0 0 100%",
              minWidth: "100%",
            },
            "& h4": {
              margin: "8px 0px 0px",
              fontSize: "16px",
              textAlign: "center",
            },
            "& p": {
              margin: "4px",
              color: "#838383",
              fontSize: "14px",
              textAlign: "center",
            },
            "& .file-name": {
              color: colors.primary,
              wordBreak: "break-all",
              textAlign: "center",
              margin: "5px 0px 0px",
            },
          },
          "& .wirepayment-wrapper": {
            display: "flex",
            flex: "0 0 100%",
            alignItems: "center",
            padding: "0px 15px 15px",
            "@media(max-width:991px)": {
              flex: "0 0 95%",
            },
            "@media(max-width:374px)": {
              flex: "0 0 100%",
              flexDirection: "column",
              textAlign: "center",
              "& .wirepayment-text": {
                marginBottom: "10px",
              },
            },
            "& .wirepayment-text": {
              marginRight: "15px",
              "& h2": {
                marginBottom: "5px",
              },
            },
            "& .wirepayment-image": {
              height: "80px !important",
              width: "80px !important",
            },
            "& .file-name": {
              color: colors.primary,
              wordBreak: "break-all",
              textAlign: "center",
              margin: "5px 0px 0px",
            },
          },
          "& .upload-image": {
            height: "130px",
            width: "126px",
            marginRight: "15px",
            position: "relative",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 0 18px 0 rgb(0 0 0 / 10%)",
            padding: "8px",
            border: `2px solid ${colors.primary}`,
            "@media(max-width:767px)": {
              height: "110px",
              width: "106px",
              marginRight: "10px",
            },
            "@media(max-width:374px)": {
              height: "90px",
              width: "86px",
              marginRight: "5px",
            },
            "& .user-image": {
              height: "111px",
              width: "118px",
              position: "relative",
              "@media(max-width:767px)": {
                height: "92px",
                width: "98px",
              },
              "@media(max-width:374px)": {
                height: "72px",
                width: "78px",
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

          "& .phone-wrapper": {
            "& .MuiOutlinedInput-root": {
              border: `1px solid ${colors.lightGray}`,
              borderRadius: "50px",
              padding: "0 20px !important",
            },
            "& .Mui-focused.MuiOutlinedInput-root": {
              border: `1px solid ${colors.primary} !important`,
            },
            "& input": {
              border: "none",
              padding: "0 !important",
            },
          },
          "& .line-break": {
            height: "25px",
            width: "100%",
            margin: "0px 12px",
            borderTop: `2px solid ${colors.lightGray}`,
          },
          "& .shrink-width": {
            maxWidth: "25% !important",
            flex: "0 0 25%",
            "@media ( max-width: 891px)": {
              maxWidth: "50% !important",
              flex: "0 0 50%",
            },
            "@media ( max-width: 667px)": {
              maxWidth: "100% !important",
              flex: "0 0 100%",
            },
          },
          "& .form-group": {
            "& .MuiFormControl-root": {
              width: "100%",
              "& .error-text": {
                color: "#d32f2f",
              },
            },
            padding: "0 15px",
            maxWidth: "50%",
            flex: "0 0 50%",
            marginBottom: "28px",
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
            "& .full-width": {
              maxWidth: "100%",
              flex: "0 0 100%",
            },
            "& .labelWithEye": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              "& a": {
                height: "20px",
                width: "22px",
                position: "absolute",
                right: "20px",
                top: "-2px",
                "& img": {
                  height: "20px",
                  width: "22px",
                },
              },
            },
            "& .label-text": {
              position: "relative !important",
              transform: "none !important",
              color: "#838383",
              maxWidth: "100%",
              fontSize: "14px",
              marginBottom: "6px",
              lineHeight: "1.2",
              display: "flex",
            },
          },
          "& .custom-textarea div div": {
            padding: "0 !important",
          },
          "& .filter-category-wrapper": {
            width: "100%",
            "& .MuiFormControl-root": {
              margin: "0px",
              "& .MuiInputBase-root": {
                "& fieldset": {
                  border: "none",
                  "& legend": {
                    display: "none",
                  },
                },
                "& .MuiSelect-select": {
                  padding: "0 30px !important",
                  minHeight: "50px",
                  lineHeight: "50px",
                  border: "1px solid #e5e4e8",
                  borderRadius: "25px",
                },
                "& .MuiSelect-icon": {
                  display: "none",
                },
                "&.Mui-focused": {
                  "& .MuiInputBase-input": {
                    borderColor: colors.lightGray,
                  },
                },
                "&.MuiInput-underline": {
                  "&:before, &:after": {
                    display: "none",
                  },
                },
              },
            },
            "& .error-text": {
              color: "#d32f2f",
            },
          },
        },
      },
    },
    "& .bottom-btn-wrapper": {
      marginTop: "30px",
      display: "flex",
      justifyContent: "center",
      "@media (max-width:991px)": {
        marginTop: "20px",
      },
      "& button": {
        minWidth: "108px",
        "& +button": {
          marginLeft: "20px",
        },
      },
    },
    "& .hide-dropdown-icon": {
      "& .MuiAutocomplete-popupIndicator ": {
        display: "none !important",
      },
    },
    "& .form-group-autocomplete": {
      padding: "0 15px",
      minWidth: "50%",
      flex: "0 0 50%",
      marginBottom: "28px",
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
      "& .MuiInputLabel-root ": {
        position: "relative !important",
        transform: "none !important",
        color: "#838383",
        maxWidth: "100%",
        fontSize: "14px",
        marginBottom: "6px",
        lineHeight: "1.2",
      },
      "& .autocomplete-textfield": {
        width: "100%",
        justifyContent: "center",
        "& .Mui-focused": {
          border: `1px solid ${colors.primary} !important`,
        },
        "& .MuiChip-root": {
          backgroundColor: "#bf1e2d4d",
          height: 24,
          position: "relative",
          zIndex: 0,
          "& .MuiChip-label": {
            color: "#fff",
          },
          "& .MuiChip-deleteIcon": {
            color: colors.primary,
          },
          "&:after": {
            content: '""',
            right: 10,
            top: 6,
            height: 12,
            width: 12,
            position: "absolute",
            backgroundColor: "white",
            zIndex: -1,
          },
        },
        "& .MuiOutlinedInput-root": {
          padding: "0px",
          paddingLeft: "9px",
          border: "1px solid #e5e4e8",
          borderRadius: "25px",
          minHeight: "50px",
          "@media (max-width:767px)": {
            minHeight: "40px",
            borderRadius: "20px",
          },
        },
        "& .MuiInputBase-root": {
          "& fieldset": {
            border: "none",
            "& legend": {
              display: "none",
            },
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
  "& .registered-block": {
    "& img": {
      height: "180px",
      width: "180px",
    },
  },
  countrySelect: {
    "& .MuiPaper-root": {
      height: "200px !important",
    },
  },
}));

export { addnewbrandStyle };
