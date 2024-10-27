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
      },
      "& .white-box": {
        marginTop: "30px",
        padding: "30px 0 7px",
        "& .profile-image": {
          height: "130px",
          width: "130px",
          margin: "0 auto 5px",
          position: "relative",
          backgroundColor: colors.lightGrayBg,
          borderRadius: "50%",
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
              fontSize: "30px",
            },
          },
          "& .user-image": {
            height: "130px",
            width: "130px",
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
          "& .upload-image": {
            position: "absolute",
            bottom: "0",
            right: "0",
            height: "45px",
            width: "45px",
            backgroundColor: colors.primary,
            borderRadius: "50%",
            cursor: "pointer",
            "@media(max-width:767px)": {
              height: "35px",
              width: "35px",
            },
            "& .MuiFormControl-root": {
              height: "100%",
              width: "100%",
              zIndex: "100",
              "& .MuiInputBase-formControl": {
                height: "100%",
                width: "100%",
                borderRadius: "50%",
                border: "none",
                "& input": {
                  padding: "0",
                  position: "relative",
                  zIndex: "99",
                  opacity: "0",
                  height: "100%",
                  width: "100%",
                  cursor: "pointer",
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
        "& .profile-detail": {
          padding: "0",
          "& li": {
            display: "block",
            padding: "0",
            borderBottom: "1px solid rgba(211,210,216,0.6)",
            "& .profile-detail-inner": {
              padding: "21px 30px",
              "@media(max-width:991px)": {
                padding: "15px 20px",
              },
              "@media(max-width:374px)": {
                padding: "15px",
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
                "@media(max-width:991px)": {
                  fontSize: "18px",
                },
                "@media(max-width:374px)": {
                  fontSize: "16px",
                },
              },
            },
          },
          "& :last-child": {
            borderBottom: "none",
          },
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
