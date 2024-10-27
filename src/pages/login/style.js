import { makeStyles } from "@mui/styles";
import { colors } from "@utils/constant";

const loginStyle = makeStyles((theme) => ({
  loginWrapper: {
    "& .login-page-wrapper" : {
      minHeight:"100vh",
      position:"relative",
      zIndex:"1",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      padding:"20px 0 80px",
      "@media(max-width:767px)" : {
        padding:"20px 0 110px"
      },
      "@media(max-width:479px)" : {
        padding:"20px 0 145px"
      },
      "& .login-bg" : {
        position:"absolute",
        left:"0",
        width:"100%",
        top:"0",
        height:"100%",
        objectFit:"cover",
        zIndex:"-1",
      },
      "& .login-block" : {
        maxWidth:"784px",
        margin:"0 auto",
        width:"100%",
        padding:"0 50px",
        "@media(max-width:1199px)" : {
          padding:"0 25px"
        },
        "@media(max-width:767px)" : {
          padding:"0 15px"
        },
        "& .logo-block" : {
          textAlign:"center",
          marginBottom:"30px",
          "@media(max-height:850px)" : {
            marginBottom:"15px",
          },
          "& img" : {
            maxWidth:"239px",
            "@media(max-height:991px)" : {
              maxWidth:"160px",
            },
            "@media(max-width:1199px)" : {
              maxWidth:"160px",
            },
            "@media(max-width:767px)" : {
              maxWidth:"120px",
            },
          }
        },
        " & .login-inner" : {
          boxShadow:"0 0 18px 0 rgba(0, 0, 0, 0.1)",
          borderRadius:"10px",
          background:colors.white,
          padding:"45px 50px 50px",
          "@media(max-height:991px)" : {
            padding:"30px 50px 35px"
          },
          "@media(max-height:850px)" : {
            padding:"20px 50px 20px"
          },
          "@media(max-width:1199px)" : {
            padding:"25px"
          },
          "@media(max-width:767px)" : {
            padding:"15px"
          },
          "& h1" : {
            fontSize:"38px",
            color:colors.primary,
            textAlign:"center",
            marginBottom:"46px",
            fontWeight:"700",
            "@media(max-height:991px)" : {
              marginBottom:"30px",
            },
            "@media(max-height:850px)" : {
              marginBottom:"20px",
            },
            "@media(max-width:1199px)" : {
              marginBottom:"30px",
              fontSize:"34px",
            },
            "@media(max-width:991px)" : {
              marginBottom:"20px",
              fontSize:"30px",
            },
            "@media(max-width:767px)" : {
              marginBottom:"15px",
              fontSize:"26px",
            },
          },
          "& .custom-radio-wrapper" : {
            marginBottom:"45px",
            "@media(max-height:991px)" : {
              marginBottom:"30px",
            },
            "@media(max-height:850px)" : {
              marginBottom:"20px",
            },
            "@media(max-width:1199px)" : {
              marginBottom:"30px",
            },
            "@media(max-width:991px)" : {
              marginBottom:"20px",
            },
            "@media(max-width:767px)" : {
              marginBottom:"15px",
            },
          },
          "& .form-wrapper" :{
            "& .form-group" : {
              "@media(max-height:850px) and (min-width:1199px)" : {
                marginBottom:"20px"
              },
            }
            
          },
          "& .btn-wrapper" : {
            marginBottom:"14px",
            marginTop:"22px",
            "@media(max-width:991px)" : {
              marginBottom:"12px",
              marginTop:"20px",
            },
            "@media(max-width:767px)" : {
              marginTop:"15px",
            },
            "& .primary-btn" : {
              width:"100%"
            }
          },
          "& .register-account-link" : {
            justifyContent:"center",
            color:"#666666",
            display:"flex",
            "@media(max-width:767px)" : {
              flexDirection:"column",
              alignItems:"center",
            },
            "& a":{
              marginLeft:"10px",
              color:colors.primary,
              "&:hover" : {
                textDecoration:"underline"
              },
              "@media(max-width:767px)" : {
                margin:"2px 0 0"
              },
            }
          }
        }
      },
      "& .site-footer": {
        borderTopColor: "rgba(255,255,255,0.2)",
        position: "absolute",
        left: "0px",
        right: "0px",
        bottom: "0px",
        "& .footer-content-wrapper": {
          "& p": {
            color: "rgba(255, 255, 255, 0.6)",
          },
          "& .footer-content-list": {
            "& li": {
              "& a": {
                color: "rgba(255, 255, 255, 0.6)",
                "&:hover": {
                  color: "rgba(255, 255, 255, 1)",
                }
              }
            }
          }
        }
      }
    }
  },
}));

export { loginStyle };
