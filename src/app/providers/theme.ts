import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data",
  },

  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#1976d2",
        },
        secondary: {
          main: "#9c27b0",
        },
        background: {
          default: "#ffffff",
          paper: "#ffffff",
        },
      },
    },

    dark: {
      palette: {
        primary: {
          main: "#90caf9",
        },
        secondary: {
          main: "#ce93d8",
        },
        background: {
          default: "#121212",
          paper: "#1e1e1e",
        },
      },
    },
  },

  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;
