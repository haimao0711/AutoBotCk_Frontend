/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-extraneous-dependencies */
import { BehaviorSubject } from 'rxjs';
import fetchWrapper from '../helpers/fetch-wrapper';
import Cookies from 'js-cookie';
import { API_BASE_URL, AuthCache } from '@constants/index';

interface ILoginProps {
	username: string;
	password: string;
}
interface IRegisterProps {
	username: string;
	password: string;
	account_name: string;
	account_num: string;
	account_password: string;
	role: string;
}

const apiBaseUrl: string = `${API_BASE_URL}`;
const storageUser =
	typeof window !== 'undefined' ? localStorage.getItem(AuthCache.AUTH_CACHE) : null;
const authSubject: any = new BehaviorSubject(
	process.browser && storageUser ? JSON.parse(storageUser) : undefined,
);

const register = async (body: IRegisterProps) => {
	return fetchWrapper
		.post(`${apiBaseUrl}/api/user/register`, body)
		.then(async (data) => {
			if (data?.data?.user?.id) {
				return { userName: data.data.user.username, accessToken: data.access_token };
			}
			throw new Error(data?.error?.message || 'Register failed, please try again.');
		})
		.catch((err) => {
			console.error('Registration Error:', err);
			throw err;
		});
};

const login = async (body: ILoginProps) => {
	return fetchWrapper
		.post(`${apiBaseUrl}/api/user/login`, body)
		.then(async (data) => {
			if (data) {
				Cookies.set(AuthCache.AUTH_TOKEN_CACHE, data.access_token);
				Cookies.set(AuthCache.AUTH_REFRESH_TOKEN_CACHE, data.refresh_token);
				Cookies.set(AuthCache.AUTH_API_KEY, data.api_key);

				authSubject.next(data.access_token);
				localStorage.setItem(AuthCache.AUTH_CACHE, JSON.stringify(data.username));

				return { userName: data.username, accessToken: data.access_token };
			}

			throw new Error('Login is failed, please try again.');
		})
		.catch((err) => console.log(err));
};

const updateOtp = async (body: any) => {
	const listOTP = await fetchWrapper
		.post(
			`${apiBaseUrl}/api/stock-exchange/vps
		`,
			body,
		)
		.then((data) => {
			if (data) {
				return data;
			}
		})
		.catch((err) =>
			err
				? err
				: {
						...err,
						status_code: 500,
				  },
		);
	return listOTP;
};
const getConfig = async () => {
	const stocks = await fetchWrapper.get(`${apiBaseUrl}/api/stock`).then((data) => {
		if (data) {
			return data?.data;
		}
	});

	const configs = await fetchWrapper.get(`${apiBaseUrl}/api/config/stock`).then((data) => {
		if (data) {
			return data;
		}
	});
	const userConfigs = configs;
	return {
		stocks,
		userConfigs,
	};
};

const getUserConfigs = async () => {
	const configs = await fetchWrapper.get(`${apiBaseUrl}/api/config/stock`);
	if (configs) {
		return configs;
	}
	return null;
};

const updateProfile = async (body: any) => {
	try {
		const data = await fetchWrapper.post(`${apiBaseUrl}/api/user/update-profile`, body);
		return data?.data;
	} catch (error: any) {
		console.error('Lỗi khi cập nhật profile:', error);
		throw error; // ném lỗi ra ngoài để xử lý trong try/catch
	}
};

const changePassBot = async (body: any) => {
	try {
		const data = await fetchWrapper.post(`${apiBaseUrl}/api/user/change-password`, body);
		console.log('check data changePassBot: ', data);
		return data?.data; // nếu thành công
	} catch (error: any) {
		console.error('Lỗi từ backend:', error);
		// Trả về toàn bộ lỗi để frontend xử lý hiển thị
		throw error;
	}
};

const getStockBalance = async () => {
	const stockBalance = await fetchWrapper.get(`${apiBaseUrl}/api/config/balance`).then((data) => {
		if (data) {
			return data;
		}
	});
	return stockBalance;
};
const getIsTrading = async () => {
	const respon = await fetchWrapper.get(`${apiBaseUrl}/api/trading/is_trading`).then((data) => {
		if (data) {
			return data;
		}
	});
	return respon;
};
const getIsBlockBuy = async () => {
	const respon = await fetchWrapper.get(`${apiBaseUrl}/api/account/status-trade`).then((res) => {
		if (res && res?.data) {
			// console.log('check data is buy: ', res?.data);
			return res?.data;
		}
	});
	return respon;
};

const openBlockTrading = async (body: any) => {
	const respon = await fetchWrapper
		.post(`${apiBaseUrl}/api/account/block-trade`, body)
		.then((res) => {
			if (res && res?.data) {
				// console.log('check data openBlockTrading: ', res?.data);
				return res?.data;
			}
		});
	return respon;
};

const logout = () => {
	Cookies.remove(AuthCache.AUTH_TOKEN_CACHE);
	Cookies.remove(AuthCache.AUTH_REFRESH_TOKEN_CACHE);
	Cookies.remove(AuthCache.AUTH_API_KEY);

	if (typeof window !== 'undefined') {
		localStorage.removeItem(AuthCache.AUTH_CACHE);
	}
	authSubject.next(null);
};

const createConfig = async (body: any) => {
	return fetchWrapper.post(`${apiBaseUrl}/api/config-stock/create`, body).then((data) => {
		if (data) {
			return data;
		}

		throw new Error('Login is failed, please try again.');
	});
};

const get2FACode = (body: any) => {
	return fetchWrapper.post(`${apiBaseUrl}/send-verify-code-unauthorize`, body);
};

const getAuthData = () => {
	return authSubject.value;
};

const getToken = () => {
	return Cookies.get(AuthCache.AUTH_TOKEN_CACHE) || '';
};

export default {
	token: getToken(),
	authData: getAuthData(),
	getConfig,
	getUserConfigs,
	getStockBalance,
	login,
	register,
	updateOtp,
	updateProfile,
	changePassBot,
	logout,
	get2FACode,
	createConfig,
	getIsTrading,
	getIsBlockBuy,
	openBlockTrading,
};
