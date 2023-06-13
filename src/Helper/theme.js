import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

const base = createTheme({
  palette: {
    primary: {
      main: "#FFAF37",
      dark: "#FFFFF",
    },
    secondary: {
      main: green[500],
    },
    error: {
      main: "#d50000",
    },
    success: {
      main: "#1de9b6",
    },
    colorCustom: {
      coklat: "#a77777",
    },
  },
});

const theme = responsiveFontSizes(base);

export default theme;
