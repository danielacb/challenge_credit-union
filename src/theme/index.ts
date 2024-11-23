import { createTheme } from "@mui/material/styles";
import ArrowDown from "../components/Icons/ArrowDown";

export const theme = createTheme({
  typography: {
    fontFamily: '"Albert Sans", sans-serif',
    h1: {
      fontSize: "2rem",
      fontWeight: "500",
      lineHeight: "2.4rem",
      letterSpacing: "-0.034rem",
    },
    body2: {
      fontSize: "0.75rem",
      lineHeight: "0.9rem",
    },
  },

  palette: {
    primary: {
      main: "#7146B5",
    },
    lorem: {
      primary: "#7146B5",
      gray: {
        "100": "#FFFFFF",
        "200": "#F7F7F7",
        "300": "#E7E7E7",
        "500": "#888888",
        "700": "#585858",
        "800": "#424242",
        "900": "#121212",
      },
      green: {
        "100": "#EBF5EB",
        "500": "#008000",
      },
    },
  },

  components: {
    MuiSelect: {
      styleOverrides: {
        icon: {
          fontSize: "15px",
          marginRight: "8px",
        },
        root: ({ theme }) => ({
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.lorem.gray["800"],
          },
        }),
      },
      defaultProps: {
        IconComponent: ArrowDown,
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.lorem.gray["800"],
            },
          },
        }),
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiInputLabel-root.Mui-focused": {
            color: theme.palette.lorem.gray["800"],
          },
        }),
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:hover, &:focus, &.Mui-selected, &.Mui-selected:hover": {
            backgroundColor: theme.palette.lorem.gray["200"],
          },
        }),
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          height: "57px",
          lineHeight: "1.05rem",
          fontWeight: "700",
          borderRadius: "8px",
          boxShadow: "none",
        },
      },
    },
  },
});
