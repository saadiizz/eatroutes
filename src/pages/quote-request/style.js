import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const quoteRequeststyle = makeStyles((theme) => ({
  quoteRequestWrapper: {
    "& .quote-page-wrapper": {
      padding: "50px 0 80px",
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
                "& em": {
                  height: "100px",
                  width: "122px",
                  display: "inline-block",
                  padding: "5px",
                  borderRadius: "10px",
                  marginRight: "30px",
                  boxShadow: "0 0 18px 0 rgb(0 0 0 / 10%)",
                  "@media(max-width:767px)": {
                    marginRight: "15px",
                  },
                  "@media(max-width:479px)": {
                    width: "100px",
                  },
                  "& img": {
                    width: "100%",
                    height: "100%",
                  },
                },
                "& h2": {
                  fontSize: "20px",
                  fontWeight: "500",
                  lineHeight: "1.2",
                  color: colors.black,
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
                      // border: "2px solid #e5e4e8",
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
                        wordBreak: "break-all",
                        overflow: "auto",
                      },
                      "& ::-webkit-scrollbar": {
                        width: 0,
                        background: "transparent",
                      },
                      "& ::-webkit-scrollbar-thumb": {
                        background: "#fff",
                      },
                    },
                    "& h3": {
                      fontSize: "18px",
                      fontWeight: "400",
                      lineHeight: "1.2",
                      color: colors.black,
                      "@media(max-width:767px)": {
                        fontSize: "16px",
                      },
                      "@media(max-width:479px)": {
                        maxWidth: "100%",
                        flex: "0 0 100%",
                        marginTop: "10px",
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
                    paddingLeft: "100px",
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
                      },
                      "& a": {
                        marginLeft: "18px",
                        "@media(max-width:1199px)": {
                          marginLeft: "10px",
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
                  },
                },
              },
            },
          },
        },
      },
      "& .btn-wrapper": {
        marginTop: "30px",
        textAlign: "center",
        "& .primary-btn": {
          minWidth: "217px",
        },
      },
    },
  },
}));

export { quoteRequeststyle };
