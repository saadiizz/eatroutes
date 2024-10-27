import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";
import downarrowIcon from "@assets/images/down-arrow.svg";

const headerStyle = makeStyles((theme) => ({
  headerWrapper: {
    "& .site-header": {
      backgroundColor: colors.primary,
      boxShadow: "none",
      position: "relative",
      "& .header-wrapper": {
        padding: "17px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "@media (max-width: 767px)": {
          padding: "10px 0",
        },
        "& .logo-wrapper": {
          maxWidth: "119px",
          flex: "0 0 119px",
          "@media (max-width:767px)": {
            maxWidth: "90px",
            flex: "0 0 90px",
            paddingRight: "10px",
          },
          "& a": {
            display: "inline-block",
          },
        },
        "& .nav-wrapper": {
          flex: "1",
          "& .navbar": {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            "& .nav-links": {
              display: "flex",
              justifyContent: "flex-end",
              padding: "0",
              alignItems: "center",
              // marginRight: "8px",
              margin:"0 auto",
              "@media (max-width: 767px)": {
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                padding: "20px 0",
                position: "fixed",
                left: "0",
                top: "71px",
                right: "0",
                background: colors.primary,
                zIndex: "99",
                height: "calc(100% - 71px)",
                transition: "0.5s all",
                transform: "translateX(101%)",
                ".open-menu &": {
                  transform: "translateX(0)",
                },
              },
              "& li": {
                margin: "0 24px",
                padding: "0",
                width: "auto",
                "@media(max-width:1199px)": {
                  margin: "0 15px",
                },
                "& .isActive": {
                  "&:after": {
                    width: "100%",
                    opacity: "1",
                    visibility: "visible",
                  },
                  
                },
                 "& .badge": {
                  position: "relative",
                  left: "0px",
                  top: "-12px",
                  background: "red",
                  fontSize: "12px",
                  borderRadius: "18px",
                  padding: "3px 4px",
                  border: "1px solid #fff",
                },
                "&:hover": {
                  "& a": {
                    "@media (min-width:992px)": {
                      "&:after": {
                        width: "100%",
                        opacity: "1",
                        visibility: "visible",
                      },
                    },
                  },
                },
                "&.active": {
                  "& a": {
                    fontWeight: 500,
                    "@media (min-width:992px)": {
                      "&:after": {
                        width: "100%",
                        opacity: "1",
                        visibility: "visible",
                      },
                    },
                  },
                },
              },
              "& a": {
                position: "relative",
                padding: "15px 0",
               
                "&:after": {
                  content: "''",
                  position: "absolute",
                  width: "0",
                  height: "2px",
                  backgroundColor: colors.white,
                  left: "0",
                  bottom: "0",
                  opacity: "0",
                  visibility: "visible",
                  transition: "all 0.3s",
                },
              },
            },
          },
        },
        "& a": {
          color: colors.lightRed,
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: "400",
          fontSize: "13px",
        },
        "& .hamburger": {
          display: "none",
          "@media (max-width:767px)": {
            position: "relative",
            width: "25px",
            height: "25px",
            zIndex: "9",
            cursor: "pointer",
            textAlign: "right",
            display: "block",
            paddingLeft: "0 !important",
            marginLeft: "15px",
            "& span": {
              position: "absolute",
              backgroundColor: colors.white,
              height: "2px",
              width: "18px",
              top: "50%",
              bottom: "0px",
              left: "auto",
              right: "0px",
              transform: "translateY(-50%)",
              marginLeft: "5px",
              transition: "0.3s all",
              ".open-menu &": {
                backgroundColor: "transparent",
              },
              "&::before, &::after": {
                marginLeft: "-5px",
                width: "23px",
                content: "' '",
                position: "absolute",
                backgroundColor: colors.white,
                height: "2px",
                transition: "0.3s all",
                right: "0px",
              },
              "&::before": {
                bottom: "-8px",
                ".open-menu &": {
                  transform: "rotate(45deg)",
                  bottom: "0px",
                },
              },
              "&::after": {
                top: "-8px",
                ".open-menu &": {
                  transform: "rotate(-45deg)",
                  top: "0px",
                },
              },
            },
          },
        },
        "& .cart-info-wrap": {
          display: "flex",
          justifyContent: "flex-end",
          padding: "0",
          alignItems: "center",
          "& li": {
            width: "auto",
            padding: "0",
            "& +li": {
              paddingLeft: "20px",
              "@media (max-width:767px)": {
                padding: "0 15px",
              },
            },
            "& a": {
              padding: "15px 0",
              fontWeight: "600",
              color: colors.white,
            },
          },
          "& .cart-link": {
            position: "relative",
            padding: "0",
            margin: "0 7px",
            "& a": {
              "& img": {
                height: "35px",
                width: "35px",
              },
            },
            "& span": {
              position: "absolute",
              top: "5px",
              right: "-5px",
              backgroundColor: colors.yellow,
              borderRadius: "50%",
              fontSize: "11px",
              color: colors.blue,
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: "500",
              width: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
          "& .profile": {
            "& a": {
              "& .down-arrow": {
                marginLeft: "12px",
                position: "relative",
                transition: "all 0.3s",
                backgroundImage: "url(" + downarrowIcon + ")",
                width: "17px",
                height: "8px",
                backgroundSize: "17px",
                display: "inline-block",
                backgroundRepeat: "no-repeat",
                transform: "rotate(0)",
                "@media (max-width:767px)": {
                  marginLeft: "7px",
                },
              },
            },
            "& .sub-menu": {
              minWidth: "150px",
              right: "0",
              left: "auto",
              transform: "none",
              paddingTop: "0",
              "& a": {
                color: colors.grayText,
                fontWeight: 500,
              },
              "&  li": {
                "&:hover": {
                  "& a": {
                    color: colors.red,
                  },
                },
              },
            },
            "&.open-submenu": {
              "& a": {
                "& .down-arrow": {
                  transform: "rotate(180deg)",
                },
              },
              "& .sub-menu": {
                display: "block",
              },
            },
          },
        },
        "& .has-submenu": {
          "& >a": {
            position: "relative",
            "&:after": {
              "@media (max-width:767px)": {
                content: "''",
                backgroundImage: "url(" + downarrowIcon + ")",
                width: "17px !important",
                height: "8px !important",
                backgroundSize: "17px",
                display: "inline-block",
                backgroundRepeat: "no-repeat",
                transform: "translateY(-50%) rotate(0)",
                top: "50%",
                position: "absolute",
                right: "-25px",
                left: "auto !important",
                bottom: "auto !important",
                opacity: "1 !important",
                backgroundColor: "transparent !important",
              },
            },
          },
          "&.open-accordian": {
            "& >a": {
              "&:after": {
                "@media (max-width:767px)": {
                  transform: "translateY(-50%) rotate(180deg)",
                },
              },
            },
          },
        },
        "& .sub-menu": {
          display: "none",
          position: "absolute",
          top: "100%",
          left: "50%",
          minWidth: "250px",
          paddingTop: "30px",
          transform: "translateX(-50%)",
          zIndex: "99",
          cursor: "pointer",
          "& ul": {
            backgroundColor: colors.white,
            boxShadow: "0 0 10px 0 rgba(30, 36, 35, 0.25)",
            padding: "0",
            "&:before": {
              content: "''",
              width: "0",
              height: "0",
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "10px solid #fff",
              position: "absolute",
              top: "-9px",
              left: "45%",
            },
          },

          "& li": {
            padding: "0 !important",
            margin: "0 !important",
            "&.active": {
              "& a": {
                color: colors.red,
                backgroundColor: "rgba(190,30,45,0.1)",
               
                "& .normal": {
                  display: "none",
                },
                "& .hover": {
                  display: "inline-block",
                },
                "& .xs-icon": {
                  display: "none",
                },
                "@media (max-width:767px)": {
                  "& .normal": {
                    display: "none",
                  },
                  "& .xs-icon": {
                    display: "inline-block",
                  },
                  "& .hover": {
                    display: "none",
                  },
                },
              },
            },
          },
          "& a": {
            textTransform: "capitalize",
            color: colors.grayText,
            padding: "12px 15px !important",
            width: "100%",
            transition: "all 0.3s",
            fontWeight: "500",

            "&:after": {
              display: "none",
            },
            "& .normal": {
              display: "inline-block",
            },
            "& .hover": {
              display: "none",
            },
            "& .xs-icon": {
              display: "none",
            },
            "@media (max-width:767px)": {
              fontWeight: "400",
              "& .normal": {
                display: "none",
              },
              "& .xs-icon": {
                display: "inline-block",
              },
              "& .hover": {
                display: "none",
              },
            },
            "&:hover": {
              color: colors.red,
              backgroundColor: "rgba(190,30,45,0.1)",
              "& .normal": {
                display: "none",
              },
              "& .hover": {
                display: "inline-block",
              },
              "@media (max-width:767px)": {
                "& .normal": {
                  display: "none",
                },
                "& .xs-icon": {
                  display: "inline-block",
                },
                "& .hover": {
                  display: "none",
                },
              },
            },
            "& span": {
              paddingRight: "10px",
            },
          },
          "& .isActiveSubMenu": {
            color: colors.red,
            backgroundColor: "rgba(190,30,45,0.1)",
            "& .normal": {
              display: "none",
            },
            "& .hover": {
              display: "inline-block",
            },
            "@media (max-width:767px)": {
              "& .normal": {
                display: "none",
              },
              "& .xs-icon": {
                display: "inline-block",
              },
              "& .hover": {
                display: "none",
              },
            },
          },
        },
        "& .nav-links": {
          "& li": {
            "@media (min-width:992px)": {
              "&:hover": {
                "& .sub-menu": {
                  display: "block",
                },
              },
            },
            "@media (max-width:767px)": {
              display: "block",
              "& a": {
                display: "inline-block",
              },
              "& .sub-menu": {
                position: "relative",
                top: "0",
                left: "0",
                minWidth: "inherit",
                padding: "0",
                transform: "none",
                "& ul": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  "&:before": {
                    display: "none",
                  },
                  "& a": {
                    color: colors.lightRed,
                  },
                },
              },
            },
            "&.open-accordian": {
              "& .sub-menu": {
                display: "block",
              },
            },
          },
        },
      },
    },
  },
}));

export { headerStyle };
