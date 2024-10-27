import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const brandAccessStyle = makeStyles((theme) => ({
  brandAccessWrapper: {
    "& .popup-content": {
      padding: "30px 28px",
      "& ::-webkit-scrollbar": {
        width: 0,
        background: "transparent",
      },
      "& ::-webkit-scrollbar-thumb": {
        background: "#fff",
      },
      "@media (max-width:1199px)": {
        padding: "25px",
      },
      "@media (max-width:991px)": {
        padding: "15px",
      },
      "& .brand-list": {
        padding: "0px",
        display: "flex",
        flexWrap: "wrap",
        paddingTop: "30px",
        overflow: "auto",
        maxHeight: "calc(100vh - 320px)",
        "& .custom-box": {
          "& .MuiFormControlLabel-label": {
            width: "100%",
            height: "100%",
            padding: "0px",
            minHeight: "150px",
            "@media (max-width:769px)": {
              minHeight: "150px !important",
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
              padding: "15px",
              "& img": {
                maxHeight: "100px",
                width: "auto",
                "@media (max-width:374px)": {
                  maxHeight: "80px",
                },
              },
            },
          },
          "& .MuiCheckbox-root": {
            minHeight: "150px !important",
            "@media (max-width:769px)": {
              minHeight: "150px !important",
            },
            "@media (max-width:479px)": {
              minHeight: "130px !important",
            },
            "@media (max-width:374px)": {
              minHeight: "100px !important",
            },
          },
        },
        "& .brand-list-item": {
          flex: "0 0 33.33%",
          maxWidth: "33.33%",
          padding: "0 15px",
          marginBottom: "30px",
          "@media (max-width:991px)": {
            marginBottom: "20px",
          },
          "@media (max-width:679px)": {
            flex: "0 0 50%",
            maxWidth: "50%",
          },
          "& ul": {
            display: "flex",
            margin: "0 -15px -5px",
            flexWrap: "wrap",
            "@media (max-width:767px)": {
              margin: "0 -10px",
            },
            "& li": {
              flex: "0 0 25%",
              maxWidth: "25%",
              padding: "0 15px 28px",
              "@media (max-width:991px)": {
                maxWidth: "33.33%",
                flex: "0 0 33.33%",
              },
              "@media (max-width:767px)": {
                maxWidth: "50%",
                flex: "0 0 50%",
                padding: "0 10px 20px",
              },
              "@media (max-width:374px)": {
                maxWidth: "100%",
                flex: "0 0 100%",
              },
            },
          },
        },
      },
      "& .filter-category-wrapper": {
        display: "flex",
        justifyContent: "end",
        marginBottom: "30px",
        "@media(max-width:465px)": {
          display: "block",
          maxWidth: "232px",
          marginLeft: "auto",
        },
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
              "@media(max-width:767px)": {
                minHeight: "40px",
                lineHeight: "40px",
                borderRadius: "20px",
              },
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
        "& .filter-icon": {
          color: colors.black,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
        "& .btn-wrapper": {
          marginLeft: "20px",
          "@media(max-width:465px)": {
            display: "block",
            minWidth: "232px",
            marginLeft: "0",
            marginTop: "10px",
          },

          "& :first-child": {
            marginLeft: "0",
          },
          "& button": {
            minWidth: "inherit",
            marginLeft: "20px",
            "@media(max-width:650px)": {
              display: "grid",
              "& +button": {
                marginTop: "10px",
                marginLeft: "0",
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

export { brandAccessStyle };
