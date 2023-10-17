import { createTheme, ThemeProvider } from '@mui/material/';

// Expandindo o objeto 'typeBackground' para adicionar propriedade 'dark'
declare module "@mui/material/styles" {
	interface TypeBackground {
		dark?: string;
	}
}

const theme = createTheme({
	palette: {
		mode: 'light',

		primary: {
			main: '#0082d9',
			dark: '#400084',
			contrastText: '#ffffff'
		},

		secondary: {
			main: '#f3ec6b',
			dark: '#eeba0f',
			contrastText: '#1f2041'
		},

		background: {
			default: '#ffffff',
			paper: '#e1e1e1',
			dark: '#1f2041'
		},
	},

	typography: {
		fontFamily: 'Raleway, Arial',
		fontWeightBold: 900,
		fontWeightMedium: 700,
		fontWeightRegular: 400,
		fontWeightLight: 300,
	},

	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
		}
	},
});

export default theme