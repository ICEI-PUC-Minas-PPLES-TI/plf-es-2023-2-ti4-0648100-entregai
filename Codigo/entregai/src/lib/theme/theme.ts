import { createTheme } from "@mui/material/styles";

// Augment the palette to include a violet color
declare module "@mui/material/styles" {
	interface Palette {
		darkred: Palette["primary"],
		yellow: Palette["primary"],
	}

	interface PaletteOptions {
		darkred?: PaletteOptions["primary"],
		yellow?: PaletteOptions["primary"],
	}
}

// Update the Button's color options to include a violet option
declare module "@mui/material/Button" {
	interface ButtonPropsColorOverrides {
		violet: true, darkred: true, yellow: true;
	}
}

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: "#F80C13",
			dark: "#C7000A",
		},
		secondary: {
			main: "#FCC500",
		},
		error: {
			main: "#D69094",
		},
		success: {
			main: "#A3C184",
		},
		text: {
			primary: "#333333",
			secondary: "#4D4D4D",
		},
		yellow: {
			main: "#FCC500",
			contrastText: "#111",
		},
		darkred: {
			main: "#b3090e",
			contrastText: "#fff",
		},
	},
});

export default theme;
