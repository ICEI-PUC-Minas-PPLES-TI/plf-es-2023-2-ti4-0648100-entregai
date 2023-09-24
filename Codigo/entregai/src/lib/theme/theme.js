import { createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
        main: '#F80C13',
        dark: '#C7000A',
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
    yellow: {
        main: '#FCC500',
        contrastText: '#111',
    },
    darkred: {
        main: '#b3090e',
        contrastText: '#fff',
    },
  },    
};

const theme = createTheme(themeOptions);

export default theme;