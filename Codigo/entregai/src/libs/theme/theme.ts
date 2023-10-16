import { createTheme } from '@mui/material/';

// Expandindo o objeto 'background'
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
			paper: '#e5e5e5',
			dark: '#1f2041'
		},
	}
});

export default theme