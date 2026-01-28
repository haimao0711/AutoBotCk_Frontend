/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-extraneous-dependencies */
import '../styles/styles.scss';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { AuthContextProvider } from '../context/authContext';
import { ThemeContextProvider } from '../context/themeContext';
import useDarkMode from '../hooks/useDarkMode';
import COLORS from '../common/data/enumColors';
import { getOS } from '../helpers/helpers';
import { ThemeProvider } from 'react-jss';
import { ToastProvider } from 'react-toast-notifications';
import { Toast, ToastContainer } from '../components/bootstrap/Toasts';
import Portal from '../layout/Portal/Portal';
import { ReactNotifications } from 'react-notifications-component';
import Wrapper from '../layout/Wrapper/Wrapper';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config';
import App from '../layout/App/App';
import AsideRoutes from '../layout/Aside/AsideRoutes';
import { CookiesProvider } from 'react-cookie';
import Spinner from '../components/bootstrap/Spinner';
import useLoading from '../hooks/useLoading';
import { ConfigContextProvider } from '@context/configContext';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
	const { isLoading } = useLoading();
	getOS();

	/**
	 * Dark Mode
	 */
	const { themeStatus } = useDarkMode();
	const theme = {
		theme: themeStatus,
		primary: COLORS.PRIMARY.code,
		secondary: COLORS.SECONDARY.code,
		success: COLORS.SUCCESS.code,
		info: COLORS.INFO.code,
		warning: COLORS.WARNING.code,
		danger: COLORS.DANGER.code,
		dark: COLORS.DARK.code,
		light: COLORS.LIGHT.code,
	};

	return (
		<AuthContextProvider>
			<ThemeContextProvider>
				<ThemeProvider theme={theme}>
					<ConfigContextProvider>
						<ToastProvider components={{ ToastContainer, Toast }}>
							<CookiesProvider>
								<App>
									{isLoading && (
										<div className='position-fixed w-100 h-100 bg-white d-flex justify-content-center align-items-center z-index-spinner'>
											<Spinner isGrow color='primary' />
										</div>
									)}
									<AsideRoutes />
									<Wrapper>
										{/* eslint-disable-next-line react/jsx-props-no-spreading */}
										<Component {...pageProps} />
									</Wrapper>
								</App>
								<Portal id='portal-notification'>
									<ReactNotifications />
								</Portal>
							</CookiesProvider>
						</ToastProvider>
					</ConfigContextProvider>
				</ThemeProvider>
			</ThemeContextProvider>
		</AuthContextProvider>
	);
};

export default appWithTranslation(MyApp, nextI18NextConfig);
