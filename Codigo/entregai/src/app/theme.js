import { ThemeOptions } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#C7000A',
    },
    secondary: {
      main: '#FCC500',
    },
    error: {
      main: '#D69094',
      hover: 'E7BDBF',
    },
    success: {
      main: '#A3C184',
      hover: '#7F9F5E',
    },
    text: {
      primary: '#333333',
      secondary: '#4D4D4D',
    },
  },

  typography: {
    fontFamily: [
        'Montserrat',
    ].join(','),
  },
})
