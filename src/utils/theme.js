import { createTheme } from "@mui/material/styles";
import { colors } from "@utils/constant";

const fontSize = 16; // px
const htmlFontSize = 16; // 16px is the default font-size used by browsers.
const coef = fontSize / 14;

export const theme = createTheme({
  palette: {
    primary: {
      light: "#a2d045",
      main: "#bf1e2e",
      dark: "#618910",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#6e7b86",
      main: "#f79239",
      dark: "#333e48",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#4c5b68",
    },
    primaryDarkGrey: {
      light: "#6f7b86",
      main: "#5b646b",
      dark: "#353f48",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    pxToRem: (size) => `${(size / htmlFontSize) * coef}rem`,
    h1: {
      fontSize: "28px",
      fontFamily: "'Poppins', sans-serif",
      textTransform: "none",
      lineHeight: "1.2",
      color: colors.black,
      fontWeight: "500",
      marginBottom: "22px",
      "@media(max-width:991px)": {
        fontSize: "24px",
        marginBottom: "18px",
      },
    },
    h2: {
      fontSize: "32px",
      lineHeight: "40px",
      fontWeight: "700",
      "@media(max-width:991px)": {
        fontSize: "28px",
      },
      "@media(max-width:767px)": {
        fontSize: "24px",
      },
    },
    h3: {
      fontSize: "22px",
      lineHeight: "1.2",
      fontWeight: "500",
      "@media(max-width:1199px)": {
        fontSize: "20px",
      },
    },
    h6: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: "normal",
    },
    subtitle1: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: "normal",
    },
    body1: { fontSize: 16, lineHeight: 1.25, fontWeight: "normal" },
    gutterBottom: { marginBottom: 16 },
  },
  shape: {
    borderRadius: 6,
  },
  props: {
    MuiTextField: {
      width: "100%",
      fullWidth: true,
      InputLabelProps: {
        shrink: true,
      },
    },
    MuiOutlinedInput: {
      notched: false,
    },
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: 6,
      },
    },
    MuiSelect: {
      select: {
        "&:focus": {
          borderRadius: "inherit",
          backgroundColor: "transparent",
        },
      },
    },
    MuiFormControl: {
      root: {
        width: "100%",
      },
    },
    MuiInput: {
      root: {
        width: "100%",
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          display: "flex",
        },
      },
      root: {
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      },
    },
    MuiInputBase: {
      input: {
        height: "50px",
        lineHeight: "50px",
        padding: "0 20px !important",
        borderRadius: "25px",
        border: "1px solid #e5e4e8",
        fontFamily: "'Poppins', sans-serif",
        color: colors.black,
        fontSize: "16px",
        transition: "all 0.3s",
        boxSizing: "border-box",
        "&::placeholder": {
          color: colors.black,
          fontSize: "16px",
          transition: "all 0.3s",
          opacity: "1 !important",
        },
        "@media(max-width:767px)": {
          height: "40px",
          lineHeight: "40px",
          borderRadius: "20px",
        },
        "& .Mui-focused": {
          "& .MuiInputBase-input": {
            borderColor: colors.primary,
            "&::placeholder": {
              opacity: "0",
            },
          },
        },
      },
      root: {
        "&.Mui-focused": {
          "& .MuiInputBase-input": {
            borderColor: colors.primary,
            "&::placeholder": {
              opacity: "0",
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline, &.Mui-focused:hover .MuiOutlinedInput-notchedOutline":
          {
            borderWidth: "1px",
            borderColor: colors.primary,
          },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.borderGray,
        },
        "& .MuiSelect-selectMenu": {
          border: "none",
        },
      },
      notchedOutline: {
        borderColor: colors.borderGray,
      },
    },
    MuiInputLabel: {
      outlined: {
        position: "relative",
        transform: "none !important",
        fontSize: "14px",
        fontWeight: "400",
        color: colors.lightText + "!important",
        marginBottom: "6px",
        display: "block",
      },
      root: {
        "&.Mui-focused": {
          color: colors.black,
        },
      },
    },
    MuiButton: {
      root: {
        letterSpacing: 0,
      },
    },
    MuiTypography: {
      root: {
        letterSpacing: 0,
      },
    },
  },
});
