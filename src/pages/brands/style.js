import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const brandsStyle = makeStyles((theme) => ({
  brandsWrapper: {
    "& .brand-list-wrapper": {
      padding: "50px 0 80px",
      "@media(max-width:991px)": {
        padding: "40px 0 80px",
      },
      "@media(max-width:767px)": {
        padding: "40px 0",
      },
      "& .no-data": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      },
      '& .flexEnd':{
        justifyContent: "flex-end !important",
      },
      "& .filter-category-wrapper": {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "30px",
        "@media(max-width:250px)": {
          display: "block",
          maxWidth: "232px",
          marginLeft: "auto",
        },
        "& .MuiFormControl-root": {
          margin: "0px",
          "& .MuiInputBase-root": {
            "@media(max-width:500px)": {
              width:'78px',
            },
            
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
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
          "@media(max-width:500px)": {
            justifyContent:"flex-end",
            "& label":{
              display: "none"
            }
          },
          "& label":{
            marginLeft:"10px"
          }
        },
        "& .btn-wrapper": {
          display: "flex",
          margin: "0 -5px",
          "@media(max-width:630px)": {
            flexWrap: "wrap",
          },
          "& .form-wrapper": {
            margin: "0 5px 5px",
            "@media(max-width:479px)": {
              width: "100%",
            },
          },
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
            margin: "0 5px 5px",
            minWidth: "inherit",
            "@media(max-width:479px)": {
              width: "100%",
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
      "& .brand-list": {
        padding: "0px",
        display: "flex",
        flexWrap: "wrap",
        margin: "0 -15px -30px",
        "@media (max-width:991px)": {
          margin: "0 -10px -20px",
        },
        "& .brand-list-item": {
          flex: "0 0 33.33%",
          maxWidth: "33.33%",
          padding: "0 15px",
          marginBottom: "60px",
          display: "inline-block",
          "@media (max-width:991px)": {
            padding: "0 10px",
            marginBottom: "50px",
          },
          "@media (max-width:679px)": {
            flex: "0 0 50%",
            maxWidth: "50%",
          },
          "& h3": {
            fontSize: "20px",
            fontWeight: "500",
            color: "#000",
            textAlign: "center",
            marginTop: "5px",
            "@media(max-width:991px)": {
              fontSize: "18px",
            },
          },
          "& .logo-wrapper": {
            width: "100%",
            height: "100%",
            border: "3px solid transparent",
            transition: "border 0.5s",
            "& .card-info-links": {
              position: "absolute",
              top: "2px",
              left: "17px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "229px",
              right: "17px",
              opacity: "0",
              visibility: "hidden",
              backgroundColor: "rgba(255,255,255,0.5)",
              transition: "all 0.5s",
              borderRadius: "20px",
              zIndex: "1",
              "@media(max-width:991px)": {
                left: "12px",
                right: "12px",
                minHeight: "197px",
              },
              "@media (max-width:479px)": {
                minHeight: "152px",
              },
              "@media (max-width:374px)": {
                minHeight: "144px",
              },
              "@media (max-width:251px)": {
                minHeight: "167px",
              },
              "& a": {
                width: "35px",
                "&+a": {
                  marginLeft: "10px",
                },
              },
            },
            "&:hover": {
              borderColor: colors.primary,
              "& .card-info-links": {
                opacity: "1",
                visibility: "visible",
              },
            },

            "& .MuiCardContent-root": {
              width: "100%",
              height: "100%",
              padding: "0px",
              minHeight: "200px",
              "@media (max-width:991px)": {
                minHeight: "175px",
              },
              "@media (max-width:479px)": {
                minHeight: "130px",
              },
              "@media (max-width:374px)": {
                minHeight: "100px",
              },
              "& .cardImgContainer": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                padding: "0",
                position: "relative",
                "&:hover .overlay": {
                  opacity: 1,
                },
                "& .overlay": {
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  // height: "100%",
                  // width: "100%",
                  opacity: 0,
                  transition: ".2s ease",
                  backgroundColor: "rgba(0,0,0,0.7)",
                },
                "& .buttonContainer": {
                  color: "white",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  flexDirection: "column",
                },
                "& img": {
                  maxHeight: "200px",
                  width: "auto",
                  "@media (max-width:991px)": {
                    maxHeight: "175px",
                  },
                  "@media (max-width:479px)": {
                    maxHeight: "130px",
                  },
                  "@media (max-width:374px)": {
                    maxHeight: "100px",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}));

export { brandsStyle };
