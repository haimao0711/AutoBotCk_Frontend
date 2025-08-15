import axios from 'axios';
import authService from '@services/auth.services';
import { AuthCache, StatusCode } from '@constants/index';
import errorHelper from './error-helper';
import Cookies from 'js-cookie';

const handleResponse = (response: any) => {
	return response?.data ?? null;
};

const handleError = (error: any) => {
	const errRep = error.response;
	if ([StatusCode.Unauthorized, StatusCode.Forbidden].includes(errRep?.status)) {
		return authService.logout();
	}
	throw errRep?.data ? errorHelper.errorMapper(errRep?.data) : console.log('System errors');
};

const authHeader = () => {
	const credetial = authService.authData;
	const token = Cookies.get(AuthCache.AUTH_TOKEN_CACHE);
	const isLoggedIn = Cookies.get(AuthCache.AUTH_TOKEN_CACHE) && token;
	if (isLoggedIn) {
		return { Authorization: `Bearer ${token}` };
	} else {
		return {};
	}
};

const get = (url: string) => {
	return axios
		.get(url, {
			headers: authHeader(),
		})
		.then(handleResponse)
		.catch(handleError);
};

function post(url: string, body: any) {
	return axios
		.post(url, body, {
			headers: {
				'Content-Type': 'application/json',
				...authHeader(),
			},
		})
		.then(handleResponse)
		.catch(handleError);
}

function put(url: string, body: any) {
	return axios
		.put(url, body, {
			headers: { 'Content-Type': 'application/json', ...authHeader() },
		})
		.then(handleResponse)
		.catch(handleError);
}

function del(url: string, body: any) {
	return axios
		.delete(url, {
			headers: authHeader(),
			data: body,
		})
		.then(handleResponse)
		.catch(handleError);
}

const fetchWrapper = {
	get,
	post,
	put,
	delete: del,
};

export default fetchWrapper;
