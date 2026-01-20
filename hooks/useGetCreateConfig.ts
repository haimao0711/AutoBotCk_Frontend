import { API_BASE_URL } from '@constants/index';
import fetchWrapper from '@helpers/fetch-wrapper';
import { authService } from '@services/index';
import { useCallback, useState } from 'react';
import { AccountVPS } from '../type/accounts-type';

export function useGetCreateConfig() {
	const getData = useCallback(async (payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper.post(`${API_BASE_URL}/api/config-stock/create`, payload).then((data) => {
				if (data) {
					if (data) {
						if (cbs) cbs(data);
					} else if (cbe) cbe(data);
				}
			});
		} catch (error) {
			console.error('useGetCreateConfig', error);
		}
	}, []);

	return getData;
}

export function useGetCreateTemplateConfig() {
	const getData = useCallback(async (payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper
				.post(`${API_BASE_URL}/api/config/template`, payload)
				.then((data) => {
					if (data) {
						cbs(data);
					} else cbe(data);
				})
				.catch((err) => cbe(err));
		} catch (error) {
			console.error('useGetCreateConfig', error);
		}
	}, []);

	return getData;
}

export async function getTemplateConfigApi() {
	const getData = await fetchWrapper.get(`${API_BASE_URL}/api/config/template`).then((data) => {
		if (data) {
			return data;
		}
	});

	return getData;
}

export async function useGetConfigurationDetailsForStockAndTradeType(id: any, chart: any) {
	const getData = await fetchWrapper
		.get(
			`${API_BASE_URL}/api/config/stock-detail?stock_id=${id}&chart_type=${chart?.toLocaleLowerCase()}`,
		)
		.then((data) => {
			if (data) {
				return data;
			}
		});

	return getData;
}

export function useGetDeleteConfigTemplate() {
	const getData = useCallback(async (payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper
				.post(`${API_BASE_URL}/api/config/stock/delete`, payload)
				.then((data) => {
					cbs(data);
				})
				.catch((err) => {
					cbe(err);
				});
		} catch (error) {
			console.log('useGetDeleteConfigTemplate', error);
		}
	}, []);

	return getData;
}

export function useGetUpdateTemplate() {
	const getData = useCallback(async (payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper
				.post(`${API_BASE_URL}/api/config/template/update`, payload)
				.then((data) => {
					if (data) {
						if (data) {
							if (cbs) cbs(data);
						} else {
							cbe(data);
						}
					}
				})
				.catch((err) => {
					cbe(err);
				});
		} catch (error) {
			console.log('useGetUpdateTemplate', error);
		}
	}, []);

	return getData;
}

// Chưa fix api
export function useGetDeleteConfig() {
	const getData = useCallback(async (payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper
				.delete(`${API_BASE_URL}/api/config-stock/del`, payload)
				.then((data) => {
					cbs(data);
				})
				.catch((err) => {
					cbe(err);
				});
		} catch (error) {
			console.log('useGetDeleteAccountVps', error);
		}
	}, []);

	return getData;
}

export function useGetCreateConfigRun() {
	const getData = useCallback(async (payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper
				.post(`${API_BASE_URL}/api/config/stock`, payload)
				.then((data) => {
					if (data) {
						if (data) {
							if (cbs) cbs(data);
						} else {
							cbe(data);
						}
					}
				})
				.catch((err) => {
					cbe(err);
				});
		} catch (error) {
			console.log('useGetCreateConfigRun', error);
		}
	}, []);

	return getData;
}

export function useGetUpdateConfigRun() {
	const getData = useCallback(async (payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper
				.post(`${API_BASE_URL}/api/config/stock-detail`, payload)
				.then((data) => {
					if (data) {
						if (data) {
							if (cbs) cbs(data);
						} else {
							cbe(data);
						}
					}
				})
				.catch((err) => {
					cbe(err);
				});
		} catch (error) {
			console.log('useGetCreateConfigRun', error);
		}
	}, []);

	return getData;
}
export function useBatchUpdateConfigRun() {
	const batchUpdate = useCallback(
		async (payloadList: any[], batchSize: number = 10, cbs?: any, cbe?: any) => {
			for (let i = 0; i < payloadList.length; i += batchSize) {
				const batch = payloadList.slice(i, i + batchSize);
				console.log('check batch: ', batch);
				try {
					const results = await Promise.all(
						batch.map((payload) =>
							fetchWrapper.post(`${API_BASE_URL}/api/config/stock-detail`, payload),
						),
					);

					if (cbs) cbs(results);
				} catch (err) {
					console.error(`❌ Batch từ ${i} đến ${i + batch.length - 1} bị lỗi:`, err);
					if (cbe) cbe(err); // callback error
				}
			}
		},
		[],
	);

	return batchUpdate;
}
export function useGetUpdateAllConfigRun() {
	const getData = useCallback(async (payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper
				.post(`${API_BASE_URL}/api/config/all-stock-detail`, payload)
				.then((data) => {
					if (data) {
						if (data) {
							if (cbs) cbs(data);
						} else {
							cbe(data);
						}
					}
				})
				.catch((err) => {
					cbe(err);
				});
		} catch (error) {
			console.log('useGetCreateConfigRun', error);
		}
	}, []);

	return getData;
}

export function useGetUpdateApiStock() {
	const getData = useCallback(async (payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper
				.post(`${API_BASE_URL}/api/config/stock/update`, payload)
				.then((data) => {
					if (data) {
						if (cbs) cbs(data);
					} else {
						if (cbe) cbe(data);
					}
				})
				.catch((err) => {
					cbe(err);
				});
		} catch (error) {
			console.log('useGetCreateConfigRun', error);
		}
	}, []);

	return getData;
}

export function useGetStopTrade() {
	const getData = useCallback(async (payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper
				.post(`${API_BASE_URL}/api/config/stock/request-stoptrade`, payload)
				.then((data) => {
					if (data) {
						if (cbs) cbs(data);
					} else {
						if (cbe) cbe(data);
					}
				})
				.catch((err) => {
					cbe(err);
				});
		} catch (error) {
			console.log('useGetStopTrade', error);
		}
	}, []);
	return getData;
}

export function useGetBuy() {
	const getData = useCallback(async (payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper
				.post(`${API_BASE_URL}/api/config/stock/request-buy`, payload)
				.then((data) => {
					if (data) {
						if (cbs) cbs(data);
					} else {
						if (cbe) cbe(data);
					}
				})
				.catch((err) => {
					cbe(err);
				});
		} catch (error) {
			console.log('useGetBuy', error);
		}
	}, []);
	return getData;
}
export function useGetSell() {
	const getData = useCallback(async (payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper
				.post(`${API_BASE_URL}/api/config/stock/request-sell`, payload)
				.then((data) => {
					if (data) {
						if (cbs) cbs(data);
					} else {
						if (cbe) cbe(data);
					}
				})
				.catch((err) => {
					cbe(err);
				});
		} catch (error) {
			console.log('useGetSell', error);
		}
	}, []);

	return getData;
}

export async function useGetConfigRunning() {
	const getData = await fetchWrapper.get(`${API_BASE_URL}/api/account/vps`).then((data) => {
		if (data) {
			return data;
		}
	});

	return getData;
}

// Account vps

export function useGetCreateAccountVps() {
	const getData = useCallback(async (payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper
				.post(`${API_BASE_URL}/api/account/vps`, payload)
				.then((data) => {
					if (data) {
						if (data) {
							if (cbs) cbs(data);
						} else {
							cbe(data);
						}
					}
				})
				.catch((err) => {
					cbe(err);
				});
		} catch (error) {
			console.log('useGetCreateAccountVps', error);
		}
	}, []);

	return getData;
}

export function useGetUpdateAccountVps() {
	const getData = useCallback(async (payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper.put(`${API_BASE_URL}/api/account/vps`, payload).then((data) => {
				if (data) {
					if (data) {
						if (cbs) cbs(data);
					} else if (cbe) cbe(data);
				}
			});
		} catch (error) {
			console.log('useGetUpdateAccountVps', error);
		}
	}, []);

	return getData;
}
export async function getAccountVpsApi(): Promise<AccountVPS[]> {
	const accounts = await fetchWrapper.get(`${API_BASE_URL}/api/account/vps`).then((data) => {
		if (data) {
			return data;
		}
	});
	return accounts?.data;
}

export function useGetAccountVpsDetails() {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<any>(null);

	const getData = useCallback(
		async (payload: { id: number }, cbs?: (data: any) => void, cbe?: (error: any) => void) => {
			setLoading(true);
			setError(null);
			setData(null);

			try {
				const response = await fetchWrapper.get(
					`${API_BASE_URL}/api/account/vps/?id=${payload.id}`,
				);

				if (response) {
					setData(response.data);
					if (cbs) cbs(response.data);
				} else {
					const errorMsg = response.message || 'Error fetching data';
					setError(errorMsg);
					if (cbe) cbe(errorMsg);
				}
			} catch (err) {
				const errorMsg = 'Network error';
				setError(errorMsg);
				if (cbe) cbe(errorMsg);
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	return { getData, data, error, loading };
}

// chua fix xong
export function useGetDeleteAccountVps() {
	const getData = useCallback(async (payload: any, cbs?: any, cbe?: any) => {
		try {
			fetchWrapper
				.delete(`${API_BASE_URL}/api/account/vps`, payload)
				.then((data) => {
					cbs(data);
				})
				.catch((err) => {
					cbe(err);
				});
		} catch (error) {
			console.log('useGetDeleteAccountVps', error);
		}
	}, []);

	return getData;
}

export async function useGetTransactions() {
	const accounts = await fetchWrapper.get(`${API_BASE_URL}/api/transaction`).then((data) => {
		if (data) {
			return data;
		}
	});
	return accounts;
}

export async function getDataRender() {
	console.log('co chay vao day');
	const accounts = await getAccountVpsApi();
	const configRunning = await useGetConfigRunning();
	const { userConfigs } = await authService.getConfig();

	return { accounts, configRunning, userConfigs };
}
