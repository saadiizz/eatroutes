import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const addnewproductStyle = makeStyles((theme) => ({
  addnewproductWrapper: {
    "& .add-new-product-wrapper": {
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
      "& .product-heading": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        "& h1": {
          marginBottom: "0",
        },
        "& .primary-border-btn": {
          minWidth: "92px",
        },
        "@media (max-width:470px)": {
          display: "block",
          "& .primary-border-btn": {
            marginTop: "10px",
          },
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
          justifyContent: "center",
          "& .stepper-btn-2": {
            "& button": {
              margin: "0px 8px",
            },
          },
          "@media (max-width:475px)": {
            display: "block",
            "& .stepper-btn-2": {
              "& button": {
                marginTop: "10px !important",
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
            "& .error-text": {
              color: "#d32f2f",
              margin: "3px 14px 0 14px",
            },
            "& .see-examples": {
              "& span": {
                cursor: "pointer",
                color: colors.skyBlue,
              },
            },
            // "& .jodit-container": {
            //   borderRadius: "25px !important",
            // },
            // "& .jodit-toolbar__box": {
            //   borderRadius: "25px 25px 0 0 !important",
            // },
            // "& .jodit-editor__resize svg": {
            //   display: "none",
            // },

            "&.full-width": {
              maxWidth: "100%",
              flex: "0 0 100%",
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
          "& .custom-products-gallary > .MuiFormControl-root": {
            height: "100% !important",
            "& >div": {
              // height: "100% !important",
              "& .MuiFormControl-root": {
                height: "100% !important",
                "& .MuiOutlinedInput-root ": {
                  height: "100% !important",
                },
              },
            },
          },
          "& .custom-products-gallary > .MuiFormControl-root  > div": {
            minHeight: "175px !important",
            "& .MuiOutlinedInput-input": {
              height: "100% !important",
              minHeight: "175px !important",
            },
            "& .label-block": {
              minHeight: "175px",
              height: "auto",
            },
          },

          "& .product-gallery-label-block": {
            display: "flex",
            justifyContent: "center",
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
            "& .autocomplete-filter-inner": {
              position: "relative",
            },
            "& .custom-chip-label": {
              display: "flex",
              "& .chip-label-data": {
                marginRight: "12px",
              },
              "& .chip-label-img": {
                width: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "-5px",
                cursor: "pointer",
                "& .add-icon": {
                  width: "18.33px",
                  height: "18.33px",
                },
              },
            },
          },
        },
      },
    },
    "& .measurment-btn-wrapper": {
      margin: "-2px -10px 0px",
      width: "100%",
      "@media (max-width:782px)": {
        margin: "-2px -5px 0px",
      },
      "@media (max-width:682px)": {
        margin: "-2px -4px 0px",
      },
      "& button": {
        width: "100%",
        maxWidth: "calc(20% - 20px)",
        height: "48px",
        borderRadius: "10px",
        backgroundColor: colors.white,
        color: colors.primary,
        borderColor: colors.primary,
        margin: "2px 8px",
        "@media (max-width:950px)": {
          maxWidth: "calc(20% - 10px)",
          margin: "2px 4px",
          minWidth: "calc(20% - 10px)",
        },
        "@media (max-width:790px)": {
          maxWidth: "calc(20% - 10px)",
          margin: "2px 2px",
        },
        "@media (max-width:682px)": {
          margin: "2px 4px",
          maxWidth: "calc(20% - 8px)",
        },
        "&:hover": {
          color: colors.white,
          backgroundColor: colors.primary,
        },
      },
      "& .measurment-border-btn": {
        border: `1px solid ${colors.primary}`,
      },
      "& .measurment-btn": {
        color: colors.white,
        backgroundColor: colors.primary,
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
      "& .add-variation-button": {
        position: "absolute",
        right: "2%",
        top: "30%",
        height: "23px",
        width: "23px",
        cursor: "pointer",
        "@media (max-width:767px)": {
          top: "23%",
        },
      },
      "& .with-add-btn": {
        "& .MuiAutocomplete-endAdornment": {
          right: "35px",
          marginRight: "9px"
        },
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
}));

export { addnewproductStyle };
