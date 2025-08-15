import { API_BASE_URL } from '@constants/index';
import fetchWrapper from '@helpers/fetch-wrapper';
import { useCallback } from 'react';

export function useGetListUser() {
	const getData = useCallback((payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper.post(`${API_BASE_URL}/user/list`, payload).then((data) => {
				if (data) {
					if (data?.statusCode === 200) {
						if (cbs) cbs(data?.data);
					} else if (cbe) cbe(data);
				}
			});
		} catch (error) {
			console.error('useGetListUser', error);
		}
	}, []);

	return getData;
}
