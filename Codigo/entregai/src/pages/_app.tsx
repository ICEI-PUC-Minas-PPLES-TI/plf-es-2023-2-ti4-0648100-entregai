import ".././styles/globals.scss";
import { Suspense, type ReactElement, type ReactNode, useState } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import theme from "@/libs/theme/theme";
import { UserContextProvider } from "@/components/context/UserContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Router } from "next/router";
import CustomBackdrop from "@/components/misc/CustomBackdrop";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {

	const [loading, setLoading] = useState<boolean>(false);
	const getLayout = Component.getLayout ?? ((page) => page);

	Router.events.on('routeChangeStart', () => {
		setLoading(true)
	})

	Router.events.on('routeChangeComplete', () => {
		setLoading(false)
	})

	return (
		<ThemeProvider theme={theme}>

			<UserContextProvider>
				
				{/* {loading ? <CustomBackdrop /> : (getLayout(
						<Component {...pageProps} />
					)) 
				} */}

				{ getLayout(
					( loading ? <h1>Loading</h1> : <Component {...pageProps} /> )
				)}

				{/* { getLayout(
					<Component {...pageProps} />
				)} */}

			</UserContextProvider>

			<ToastContainer pauseOnFocusLoss={false} />
			
		</ThemeProvider>
	)
}
