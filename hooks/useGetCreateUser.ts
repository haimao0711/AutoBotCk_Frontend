import { API_BASE_URL } from '@constants/index';
import fetchWrapper from '@helpers/fetch-wrapper';
import { useCallback } from 'react';

export function useGetCreateUser() {
	const getData = useCallback(async (payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper.post(`${API_BASE_URL}/user`, payload).then((data) => {
				if (data) {
					if (data.statusCode === 200) {
						if (cbs) cbs(data);
					} else if (cbe) cbe(data);
				}
			});
		} catch (error) {
			console.error('useGetCreateUser', error);
		}
	}, []);

	return getData;
}
