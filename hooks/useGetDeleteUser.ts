import { API_BASE_URL } from '@constants/index';
import fetchWrapper from '@helpers/fetch-wrapper';
import { useCallback } from 'react';

export function useGetDeleteUser() {
	const getData = useCallback((payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper.delete(`${API_BASE_URL}/user/`, payload).then((data) => {
				if (data) {
					if (data?.statusCode === 200) {
						if (cbs) cbs(data);
					} else if (cbe) cbe(data);
				}
			});
		} catch (error) {
			console.error('useGetDeleteUser', error);
		}
	}, []);

	return getData;
}
