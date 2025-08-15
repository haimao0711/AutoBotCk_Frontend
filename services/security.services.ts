/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-extraneous-dependencies */
import fetchWrapper from '../helpers/fetch-wrapper';
import { API_BASE_URL } from '@constants/index';

const apiBaseUrl: string = `${API_BASE_URL}/auth`;

const switch2FA = (body: any) => {
	return fetchWrapper.post(`${apiBaseUrl}/security/2fa/switch`, body);
};

const get2FACode = (body: any) => {
	return fetchWrapper.post(`${apiBaseUrl}/security/2fa/generate`, body);
};

export default { get2FACode, switch2FA };
