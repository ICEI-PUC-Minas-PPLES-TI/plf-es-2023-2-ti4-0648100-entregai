'use client'

import { UserDataProvider } from "@/components/context/UserDataContext";
import MenuBar from "@/components/misc/MenuBar";
import theme from "@/lib/theme/theme";
import { ThemeProvider } from "@emotion/react";

export default function MainLayout({ children }) {
	return (
		<ThemeProvider theme={theme}>

			<UserDataProvider>

				<MenuBar />

				{children}

			</UserDataProvider>

		</ThemeProvider>
	);
}
