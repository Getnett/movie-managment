"use client";

import { Montserrat } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
    h1: {
      fontSize: "5rem",
      fontWeight: "normal",
      color: "#fff",
    },
    h2: {
      fontSize: "3rem",
      fontWeight: "normal",
      color: "#fff",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: "normal",
      color: "#fff",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: "normal",
      color: "#fff",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: "normal",
      color: "#fff",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          // width: "300px",
          borderRadius: "8px",
          backgroundColor: "#224957",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },

          "& .MuiInputBase-input::placeholder": {
            color: "#ffffff",
            opacity: 1,
            fontSize: "14px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          width: "300px",
          textTransform: "none",
          borderRadius: 10,

          color: "#fff",
          fontWeight: 700,
        },
        outlined: {
          borderColor: "#fff",
          backgroundColor: "#093545",
          "&:hover": {
            borderColor: "#fff",
            backgroundColor: "#093545",
          },
        },
        contained: {
          backgroundColor: "#2BD17E",
          "&:hover": {
            backgroundColor: "#2BD17E",
          },
        },
      },
    },
  },
});

export default theme;
