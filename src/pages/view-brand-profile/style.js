import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const myprofileStyle = makeStyles((theme) => ({
  myprofileWrapper: {
    "& .myprofile-page-wrapper": {
      padding: "50px 0 80px",
      "@media(max-width:991px)": {
        padding: "40px 0 80px",
      },
      "@media(max-width:767px)": {
        padding: "40px 0",
      },
      "& .myprofile-heading": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
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
        padding: "30px 0 7px",
        "& .MuiStepper-root.MuiStepper-horizontal": {
          display: "none",
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
        "& .profile-detail": {
          display: "flex",
          flexWrap: "wrap",
          padding: "0",
          "& .full-width": {
            maxWidth: "100%",
            flex: "0 0 100%",
          },
          "& .no-collaps": {
            maxWidth: "100%",
            flex: "0 0 100%",
          },
          "& .profile-wrapper": {
            display: "flex",
            flex: "0 0 100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
            "& .upload-image": {
              height: "130px",
              width: "126px",
              overflow: "hidden",
              padding: "8px",
              border: `2px solid ${colors.primary}`,
              boxShadow: "0 0 18px 0 rgb(0 0 0 / 10%)",
              "@media(max-width:767px)": {
                height: "110px",
                width: "106px",
              },
              "& .MuiFormControl-root": {
                height: "100%",
                width: "100%",
                zIndex: "100",
                "& .MuiInputBase-formControl": {
                  height: "100%",
                  width: "100%",
                  border: "none",
                  "& fieldset": {
                    display: "none",
                  },
                },
              },
            },
            "& .user-image": {
              height: "110px",
              width: "110px",
              "@media(max-width:767px)": {
                height: "90px",
                width: "90px",
              },
            },
          },
          "& li": {
            display: "block",
            padding: "0 15px",
            maxWidth: "50%",
            flex: "0 0 50%",
            "@media (max-width:667px)": {
              maxWidth: "100%",
              flex: "0 0 100%",
            },
            "& .profile-detail-inner": {
              padding: "21px 15px",
              width: "100%",
              borderBottom: "1px solid rgba(211,210,216,0.6)",
              "@media(max-width:991px)": {
                padding: "15px 20px",
              },
              "@media(max-width:374px)": {
                padding: "15px",
              },
              "& .labelWithEye": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "& a": {
                  height: "20px",
                  width: "22px",
                  right: "20px",
                  "& img": {
                    height: "20px",
                    width: "22px",
                  },
                },
              },
              "& span": {
                fontSize: "18px",
                color: colors.lightText,
                display: "block",
                "@media(max-width:991px)": {
                  fontSize: "16px",
                },
                "@media(max-width:374px)": {
                  fontSize: "14px",
                },
              },
              "& p": {
                fontSize: "20px",
                marginTop: "5px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                "@media(max-width:991px)": {
                  fontSize: "18px",
                },
                "@media(max-width:374px)": {
                  fontSize: "16px",
                },
                "& .custome-url": {
                  color: colors?.primary,
                },
              },
              "& .no-collaps": {
                whiteSpace: "normal",
                wordBreak: "break-all",
              },
            },
          },
          "& :last-child": {
            borderBottom: "none",
          },
        },
        "& .btn-list": {
          padding: "15px",
        },
      },
      "& .btn-wrapper": {
        marginTop: "30px",
        textAlign: "center",
        "& .primary-btn": {
          minWidth: "128px",
        },
      },
    },
  },
}));

export { myprofileStyle };
