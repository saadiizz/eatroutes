import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const productdetailStyle = makeStyles((theme) => ({
  productdetailWrapper: {
    "& .product-detail-page": {
      padding: "45px 0 80px",
      "@media(max-width:991px)": {
        padding: "40px 0 80px",
      },
      "@media(max-width:767px)": {
        padding: "40px 0",
      },
      "& .product-detail-wrapper": {
        display: "flex",
        "@media(max-width:991px)": {
          flexWrap: "wrap",
        },
        "& .product-slider-block": {
          "& .product-slider-inner": {
            margin: "-15px -15px 0 -15px",
          },
          "& .swiper-pagination": {
            position: "absolute",
            bottom: "25px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            zIndex: "2",
            "& .swiper-pagination-bullet": {
              background: colors.primary,
            },
          },
          "& .product-main": {
            "& .swiper-slide": {
              padding: "20px",
              "& .white-box": {
                position: "relative",
                "@media(max-width:991px)": {
                  paddingBottom: "56.25%",
                },
                "& img": {
                  position: "absolute",
                  top: "0",
                  left: "0",
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                  borderRadius: "20px",
                  padding: "15px 15px 30px",
                  cursor: "pointer",
                },
              },
            },
          },
          "& .product-thumb": {
            maxWidth: "130px",
            "& .swiper-slide": {
              "&.swiper-slide-thumb-active": {
                "& .thumb-inner": {
                  borderColor: "#bf1e2e",
                },
              },
              "& .thumb-inner": {
                border: "2px solid #e5e4e8",
                cursor: "pointer",
                transition: "all 0.5s",
              },
            },
          },
          "& .btn-wrapper": {
            display: "flex",
            justifyContent: "center",
            marginTop: "15px",
            "@media(max-width:679px)": {
              marginTop: "10px",
            },
            "& button": {
              minWidth: "inherit",
            },
          },
        },
        "& .product-content": {
          "& h1": {
            fontSize: "26px",
            fontWeight: "600",
            letterSpacing: "0.4px",
            marginBottom: "10px",
            "@media(max-width:991px)": {
              fontSize: "22px",
            },
          },
          "& .product-headline": {
            fontSize: "17px",
            fontWeight: "600",
            letterSpacing: "0.4px",
            marginBottom: "10px",
          },
          "& .box-wrapper": {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            marginBottom: "15px",
            marginLeft: "-8px",
            "& .box-3": {
              "& h1": {
                paddingBottom: "25px",
              },
            },
            "& .box": {
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              padding: "20px 5px",
              textAlign: "center",
              margin: "2px 8px 5px",
              height: "120px",
              width: "100%",
              borderRadius: "15px",
              boxShadow: "0 0 15px 0 rgb(0 0 0 / 10%)",
              "& h6": {
                fontSize: "16px",
                fontWeight: "600",
              },
              "& h1": {
                margin: "0",
                textAlign: "center",
                fontSize: "22px",
                color: colors.primary,
              },
              "& .p-tag": {
                fontSize: "12px",
                fontWeight: "600",
                color: colors.lightText,
              },
            },
            "@media(max-width:1060px)": {
              flexWrap: "wrap",
              justifyContent: "center",
              "& .box": {
                width: "60%",
              },
            },
            "@media(max-width:991px)": {
              flexWrap: "nowrap",
            },
            "@media(max-width:518px)": {
              flexWrap: "wrap",
              marginBottom: "10px",
            },
          },
          "& a": {
            color: colors.primary,
          },
          "& strong": {
            fontWeight: "700",
          },
          "& p": {
            marginBottom: "15px",
            lineHeight: "1.6",
            "& span, strong, em": {
              fontSize: "16px !important",
            },
          },
          "& .content-description > div": {
            marginBottom: "15px",
            lineHeight: "1.6",
          },
          "& h2,h3,h4,h5": {
            fontSize: "18px",
            color: colors.primary,
            fontWeight: "500",
            marginBottom: "10px",
            lineHeight: "1.2",
          },
          "& ol": {
            marginBottom: "24px",
            listStyle: "decimal",
            paddingLeft: "20px",
            "& li": {
              position: "relative",
              "& +li": {
                marginTop: "10px",
              },
            },
            "@media(max-width:991px)": {
              marginBottom: "15px",
            },
          },
          "& ul": {
            marginBottom: "24px",
            "& li": {
              position: "relative",
              padding: "0 0 0 17px !important",
              "& +li": {
                marginTop: "10px",
              },
              "&:before": {
                position: "absolute",
                content: "' '",
                left: 0,
                height: "6px",
                width: "6px",
                background: "#bf1e2e",
                borderRadius: "50%",
                top: "7px",
              },
            },
            "@media(max-width:991px)": {
              marginBottom: "15px",
            },
          },
          "& .primary-btn": {
            minWidth: "166px",
          },
          "& .nutrition-facts-block": {
            padding: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "100%",
            margin: "0 auto 19px",
            "& img, iframe": {
              border: `2px solid ${colors.lightGray}`,
              borderRadius: "15px",
              objectFit: "contain",
              maxWidth: "inherit",
              height: "auto",
              width: "100%",
              cursor: "pointer",
            },
          },
          "& .ingredients-wrapper": {
            "& h1": {
              fontSize: "18px",
              marginBottom: "4px",
              color: colors.primary,
            },
            "& span": {
              lineHeight: "1.6",
              marginBottom: "15px",
            },
          },
        },
        "& .serving-list": {
          padding: "0 !important",
          marginBottom: "30px",
          marginTop: "14px",
          "@media(max-width:991px)": {
            margin: "0 0 20px",
          },
          "& li": {
            "& +li": {
              marginTop: "21px",
              "@media(max-width:991px)": {
                marginTop: "15px",
              },
            },
            padding: "0",
            "& span": {
              minWidth: "65px",
              cursor: "pointer",
              height: "28px",
              lineHeight: "28px",
              border: "1px solid #d3d2d8",
              textAlign: "center",
              padding: "0 2px",
              borderRadius: "5px",
              display: "inline-block",
              marginLeft: "11px",
              color: colors.primary,
            },
          },
        },
        "& .serving-title": {
          backgroundColor: colors.grayBg,
          padding: "23px 25px",
          margin: "0 -25px",
          "@media(max-width:991px)": {
            padding: "25px",
          },
          "@media(max-width:767px)": {
            padding: "15px",
          },
          "& h4": {
            fontSize: "20px",
            color: colors.primary,
            fontWeight: "500",
            "@media(max-width:767px)": {
              fontSize: "18px",
            },
          },
        },
        "&.three-column-block": {
          "& .product-content": {
            flex: "1",
            maxWidth: "auto",
            padding: "0 32px",
            "@media(max-width:991px)": {
              maxWidth: "100%",
              flex: "0 0 100%",
              paddingLeft: "0",
              marginTop: "25px",
              paddingRight: "0",
            },
          },
          "& .product-serving-block": {
            flex: "0 0 233px",
            maxWidth: "233px",
            "@media(max-width:991px)": {
              maxWidth: "100%",
              flex: "0 0 100%",
              marginTop: "25px",
            },
            "& .white-box": {
              padding: "0 25px 25px",
              "@media(max-width:767px)": {
                padding: "0 15px 15px",
              },
              "& .Mui-disabled": {
                backgroundColor: "#838383",
                color: "#fff",
              },
              "& .primary-btn": {
                minWidth: "100%",
                "@media(max-width:991px)": {
                  minWidth: "240px",
                },
              },
              "& .primary-border-btn": {
                minWidth: "100%",
                "@media(max-width:991px)": {
                  minWidth: "240px",
                },
              },
              "& .sample-btn": {
                margin: "10px 0 0 0",
                "@media(max-width:991px)": {
                  margin: "0 0 0 10px",
                },
                "@media(max-width:549px)": {
                  margin: "0",
                },
                "@media(max-width:539px)": {
                  margin: "10px 0 0 0",
                },
              },
              "& .serving-list": {
                marginTop: "18px",
                marginBottom: "18px",
                "& li": {
                  display: "flex",
                  justifyContent: "space-between",
                  "& span": {
                    marginLeft: "28px",
                  },
                },
              },
              "& .serving-staff-list": {
                marginTop: "4px",
                "& p": {
                  display: "flex",
                  minWidth:"10px",
                  justifyContent: "space-between",
                  margin: "10px 0px",
                  "& span": {
                    marginLeft: "10px",
                    color: colors.primary,
                  },
                },
                "& hr": {
                  margin: "0",
                  border: "none",
                  borderTop: `1px solid ${colors.lightGray}`,
                },
              },
            },
          },
          "& .product-slider-block": {
            flex: "0 0 260px",
            maxWidth: "260px",
            "@media(max-width:991px)": {
              maxWidth: "100%",
              flex: "0 0 100%",
            },
            "& .product-main": {
              "& .swiper-slide": {
                "& .white-box": {
                  paddingBottom: "90%",
                  minHeight: "240px",
                },
              },
            },
          },
        },
      },
      "& .breadcrumb-wrapper": {
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
        "@media(max-width:767px)": {
          flexDirection: "column",
          alignItems: "flex-start",
        },
        "& .primary-border-btn": {
          minWidth: "93px",
          marginRight: "19px",
          height: "40px",
          lineHeight: "40px",
          padding: "0 5px",
          "@media(max-width:767px)": {
            marginRight: "0",
            marginBottom: "15px",
          },
          "& em": {
            width: "14px",
            minWidth: "14px",
            marginRight: "5px",
            "& img": {
              transform: "rotate(90deg)",
              transition: "all 0.5s",
              "&.normal": {
                display: "block",
              },
              "&.hover": {
                display: "none",
              },
            },
          },
          "&:hover": {
            "& em": {
              "& img": {
                "&.normal": {
                  display: "none",
                },
                "&.hover": {
                  display: "block",
                },
              },
            },
          },
        },
        "& .MuiBreadcrumbs-separator": {
          "@media(max-width:767px)": {
            marginLeft: "4px",
            marginRight: "4px",
          },
        },
        "& .MuiBreadcrumbs-li": {
          "& a": {
            color: colors.black,
            textDecoration: "none",
            "&:hover": {
              color: colors.primary,
            },
            "@media(max-width:767px)": {
              fontSize: "14px",
            },
          },
          "& p": {
            color: colors.primary,
            "@media(max-width:767px)": {
              fontSize: "14px",
            },
          },
        },
      },
    },
  },
}));

export { productdetailStyle };
