import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const LeadListStyle = makeStyles((theme) => ({
  customerListWrapper: {
    "& .customer-list-page-wrapper": {
      padding: "50px 0 80px",
      "@media(max-width:991px)": {
        padding: "40px 0 80px",
      },
      "@media(max-width:767px)": {
        padding: "40px 0",
      },
      "& .customer-list-heading": {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "30px",
        alignItems: "center",
        "@media(max-width:991px)": {
          marginBottom: "20px",
        },
        "@media(max-width:767px)": {
          flexDirection: "column",
          alignItems: "flex-start",
        },
        "& h1": {
          marginBottom: "0",
        },
        "& .customer-search-wrapper": {
          display: "flex",
          margin: "0 -5px",
          "@media(max-width:479px)": {
            flexWrap: "wrap",
          },
          "& .form-wrapper": {
            margin: "0 5px",
            "@media(max-width:767px)": {
              margin: "10px 5px 0",
            },
            "@media(max-width:479px)": {
              width: "100%",
            },
          },
          "& .primary-btn": {
            margin: "0 5px",
            minWidth: "227px",
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
        },
        "& .form-wrapper": {
          "& .form-group": {
            position: "relative",
            "& img": {
              position: "absolute",
              right: "25px",
              top: "50%",
              transform: "translateY(-50%)",
              "@media(max-width:767px)": {
                right: "20px",
              },
            },
            "& .MuiOutlinedInput-input": {
              padding: "0 55px 0 30px !important",
              maxWidth: "227px",
              "@media(max-width:767px)": {
                padding: "0 45px 0 20px !important",
              },
              "@media(max-width:479px)": {
                maxWidth: "100%",
              },
            },
          },
        },
      },
      "& .customer-list-box": {
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
            cursor: "pointer",
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
                cursor: "pointer",
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
            "& .contact-list-wrapper": {
              padding: "0",
              display: "flex",
              "& li": {
                padding: "0",
                "& + li": {
                  marginLeft: "9px",
                },
                "& a": {
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: colors.primary,
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: colors.darkRed,
                  },
                },
              },
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
    },
  },
}));

export { LeadListStyle };
