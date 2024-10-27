import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const editcustomerStyle = makeStyles((theme) => ({
  editcustomerWrapper: {
    "& .popup-content": {
      padding: "30px 35px",
      maxHeight: "calc(100vh - 110px)",
      overflow: "auto",
      "@media (max-width:1199px)": {
        padding: "25px 35px",
      },
      "@media (max-width:991px)": {
        padding: "15px 25px",
      },

      "& .filter-category-wrapper": {
        width: "100%",
        display: "flex",
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
      "& .hide-dropdown-icon": {
        "& .MuiAutocomplete-popupIndicator ": {
          display: "none !important",
        },
      },
      "& .form-group-autocomplete": {
        padding: "0",
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
          fontSize: "16px",
          marginBottom: "10px",
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
      "& .MuiDialogContentText-root": {
        justifyContent: "center",
        fontSize: "18px",
      },
      "& .MuiDialogActions-root": {
        padding: "0 !important",
        marginTop: "20px",
        justifyContent: "center",
        "& .Mui-disabled": {
          backgroundColor: "#838383",
          color: "#fff",
        },
        "& .primary-btn": {
          width: "100%",
        },
      },
    },
  },
}));

export { editcustomerStyle };
