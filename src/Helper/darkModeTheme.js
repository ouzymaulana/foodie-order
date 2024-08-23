import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const base = createTheme({
  palette: {
    primary: {
      main: '#FAA41A',
      dark: '#FFFFF',
    },
    secondary: {
      main: grey[600],
    },
    error: {
      main: '#F31559',
      // main: grey[400],
    },
    success: {
      main: '#1de9b6',
    },
    colorCustom: {
      coklat: '#a77777',
    },
  },
});

const theme = responsiveFontSizes(base);

export default theme;
