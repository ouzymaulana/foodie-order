import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { green, grey, purple } from "@mui/material/colors";

const base = createTheme({
  palette: {
    primary: {
      main: "#FAA41A",
      dark: "#FFFFF",
    },
    secondary: {
      main: grey[600],
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
