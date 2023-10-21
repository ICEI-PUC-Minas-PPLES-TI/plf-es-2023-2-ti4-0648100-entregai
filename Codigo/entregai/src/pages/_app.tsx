import ".././styles/globals.scss";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import theme from "@/libs/theme/theme";
import { UserContextProvider } from "@/components/context/UserContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<ThemeProvider theme={theme}>
			<UserContextProvider>

				{getLayout(
					<div>
						<Component {...pageProps} />
					</div>
				)}

			</UserContextProvider>

			<ToastContainer pauseOnFocusLoss={false} />
		</ThemeProvider>
	)
}
