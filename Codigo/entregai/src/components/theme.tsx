import {createTheme} from '@mui/material/styles';

const themeCustom = createTheme({
    palette: {
        primary: {
            main: '#ef3028',
            light: '#ef3028',
            dark: '#c2000a',
            contrastText: '#FFF'
        },

        secondary: {
            main: '#d9890e',
            light: '#e0a32d',
            dark: '#c25700',
            contrastText: '#000'
        }
    }
})

export default themeCustom;