import "@/styles/globals.scss";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material";
import theme from "@/libs/theme/theme";
import { UserContextProvider } from "@/components/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<ThemeProvider theme={theme}>

			<UserContextProvider>

				{ getLayout(
					
					<div className={inter.className}>

						<Component {...pageProps} />

					</div>
				
				)}
			
			</UserContextProvider>

		</ThemeProvider>
    
	)

}
