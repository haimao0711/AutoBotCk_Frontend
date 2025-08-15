import { ConditionMappingTypes } from './interface';

export const MAPING_NAME_ATTR: ConditionMappingTypes = {
	vnindex_config_use_min_vnindex_buy: {
		name: 'MUA - CHỈ SỐ VNINDEX <= (VNI)',
	},

	vnindex_config_use_max_vnindex_buy: {
		name: 'MUA - CHỈ SỐ VNINDEX >= (VNI)',
	},
	vnindex_config_use_macd_to_buy: {
		name: 'MUA - MACD<= (VNI)',
	},
	vnindex_config_use_macd_reversed_increase: {
		name: 'MUA - MACD ĐẢO CHIỀU TĂNG (VNI)',
	},
	vnindex_config_use_macd_increase: {
		name: 'MUA - MACD TĂNG (VNI)',
	},
	vnindex_config_use_histogram_reversed_increase: {
		name: 'MUA - HISTOGRAM ĐẢO CHIỀU TĂNG (VNI)',
	},
	vnindex_config_use_histogram_increase: {
		name: 'MUA - HISTOGRAM TĂNG (VNI)',
	},
	vnindex_config_use_rsi_to_buy: {
		name: 'MUA - STOCH RSI <= (VNI)',
	},
	vnindex_config_use_rsi_reversed_increase: {
		name: 'MUA - RSI ĐẢO CHIỀU TĂNG (VNI)',
	},
	vnindex_config_use_rsi_increase: {
		name: 'MUA - RSI TĂNG (VNI)',
	},
	vnindex_config_use_volume_to_buy: {
		name: 'MUA - VOLUME>VOLUME MA (VNI)',
	},
	vnindex_config_use_stoch_rsi_to_buy: {
		name: 'MUA - STOCH RSI<= (VNI)',
	},
	vnindex_config_use_stoch_rsi_reversed_increase: {
		name: 'MUA - STOCH RSI ĐẢO CHIỀU TĂNG (VNI)',
	},
	vnindex_config_use_stoch_rsi_increase: {
		name: 'MUA - STOCH RSI TĂNG (VNI)',
	},
	vnindex_config_use_rsi_to_sell: {
		name: 'BÁN - RSI >= (VNI)',
	},
	vnindex_config_use_rsi_reversed_decrease: {
		name: 'BÁN - RSI ĐẢO CHIỀU GIẢM (VNI)',
	},
	vnindex_config_use_rsi_decrease: {
		name: 'BÁN - RSI GIẢM (VNI)',
	},
	vnindex_config_use_stoch_rsi_to_sell: {
		name: 'BÁN - STOCH RSI>= (VNI)',
	},
	vnindex_config_use_macd_to_sell: {
		name: 'BÁN - MACD>= (VNI)',
	},
	vnindex_config_use_macd_reversed_decrease: {
		name: 'BÁN - MACD ĐẢO CHIỀU GIẢM  (VNI)',
	},
	vnindex_config_use_macd_decrease: {
		name: 'BÁN - MACD GIẢM  (VNI)',
	},
	vnindex_config_use_histogram_reversed_decrease: {
		name: 'BÁN - HISTOGRAM ĐẢO CHIỀU GIẢM (VNI)',
	},
	vnindex_config_use_histogram_decrease: {
		name: 'BÁN - HISTOGRAM GIẢM (VNI)',
	},
	// VNINDEX sell

	vnindex_config_use_min_vnindex_sell: {
		name: 'BÁN - CHỈ SỐ VNINDEX >= (VNI)',
	},

	vnindex_config_use_bolinger_to_sell: {
		name: 'BÁN - CHẠM CẠNH TRÊN BOLINGER (VNI)',
	},

	vnindex_config_use_max_vnindex_sell: {
		name: 'BÁN - CHỈ SỐ VNINDEX <= (VNI)',
	},
	vnindex_config_use_bolinger_to_buy: {
		name: 'MUA - CHẠM CẠNH DƯỚI BOLINGER  (VNI)',
	},
	vnindex_config_use_stoch_rsi_reversed_decrease: {
		name: 'BÁN - STOCH RSI ĐẢO CHIỀU GIẢM (VNI)',
	},
	vnindex_config_use_stoch_rsi_decrease: {
		name: 'BÁN - STOCH RSI GIẢM (VNI)',
	},
	// stock
	stock_config_use_macd_to_buy: {
		name: 'MUA - MACD<= (CP)',
	},
	stock_config_use_macd_reversed_increase: {
		name: 'MUA - MACD ĐẢO CHIỀU TĂNG(CP)',
	},
	stock_config_use_macd_increase: {
		name: 'MUA - MACD TĂNG(CP)',
	},
	stock_config_use_histogram_reversed_increase: {
		name: 'MUA - HISTOGRAM ĐẢO CHIỀU TĂNG(CP)',
	},
	stock_config_use_histogram_increase: {
		name: 'MUA - HISTOGRAM TĂNG(CP)',
	},
	stock_config_use_rsi_to_buy: {
		name: 'MUA - RSI<=(CP)',
	},
	stock_config_use_rsi_reversed_increase: {
		name: 'MUA - RSI ĐẢO CHIỀU TĂNG(CP)',
	},
	stock_config_use_rsi_increase: {
		name: 'MUA - RSI TĂNG(CP)',
	},
	stock_config_use_stoch_rsi_to_buy: {
		name: 'MUA - STOCH RSI <=(CP)',
	},
	stock_config_use_stoch_rsi_reversed_increase: {
		name: 'MUA - STOCH RSI ĐẢO CHIỀU TĂNG(CP)',
	},
	stock_config_use_stoch_rsi_increase: {
		name: 'MUA - STOCH RSI TĂNG(CP)',
	},
	stock_config_use_volume_to_buy: {
		name: 'MUA - VOLUME>VOLUME MA(CP)',
	},
	stock_config_use_rsi_to_sell: {
		name: 'BÁN - RSI>=(CP)',
	},
	stock_config_use_rsi_reversed_decrease: {
		name: 'BÁN - RSI ĐẢO CHIỀU GIẢM (CP)',
	},
	stock_config_use_rsi_decrease: {
		name: 'BÁN - RSI GIẢM (CP)',
	},
	stock_config_use_stoch_rsi_to_sell: {
		name: 'BÁN - STOCH RSI >=(CP)',
	},
	stock_config_use_stoch_rsi_reversed_decrease: {
		name: 'BÁN - STOCH RSI ĐẢO CHIỀU GIẢM(CP)',
	},
	stock_config_use_stoch_rsi_decrease: {
		name: 'BÁN - STOCH RSI GIẢM(CP)',
	},
	stock_config_use_macd_to_sell: {
		name: 'BÁN - MACD >=(CP)',
	},
	stock_config_use_macd_reversed_decrease: {
		name: 'BÁN - MACD ĐẢO CHIỀU GIẢM(CP)',
	},
	stock_config_use_macd_decrease: {
		name: 'BÁN - MACD GIẢM(CP)',
	},
	stock_config_use_histogram_reversed_decrease: {
		name: 'BÁN - HISTOGRAM ĐẢO CHIỀU GIẢM (CP)',
	},
	stock_config_use_histogram_decrease: {
		name: 'BÁN - HISTOGRAM GIẢM (CP)',
	},
};

export const convertPreDataRequestToMappingType = (object: ConditionMappingTypes, data: any) => {
	const resultObject: any = {};
	const vnindex = data?.vnindex_config;
	const stock = data?.stock_config;
	for (const param in vnindex) {
		if (vnindex[param]) {
			if (param.includes('_necessary_condition')) {
				const paramName = 'vnindex_config_use_' + param.split('_necessary_condition')[0];

				resultObject[paramName] = {
					name: object[paramName]?.name,
					prerequisites: vnindex[param],
					eligible: false,
				};
			}
			if (param.includes('_sufficient_condition')) {
				const paramName = 'vnindex_config_use_' + param.split('_sufficient_condition')[0];
				resultObject[paramName] = {
					name: object[paramName]?.name,
					prerequisites: resultObject[paramName]?.prerequisites,
					eligible: vnindex[param],
				};
			}
		}
	}
	for (const param in stock) {
		if (stock[param]) {
			if (param.includes('_necessary_condition')) {
				const paramName = 'stock_config_use_' + param.split('_necessary_condition')[0];

				resultObject[paramName] = {
					name: object[paramName]?.name,
					prerequisites: stock[param],
					eligible: false,
				};
			}
			if (param.includes('_sufficient_condition')) {
				const paramName = 'stock_config_use_' + param.split('_sufficient_condition')[0];

				resultObject[paramName] = {
					name: object[paramName]?.name,
					prerequisites: resultObject[paramName]?.prerequisites,
					eligible: stock[param],
				};
			}
		}
	}
	return resultObject;
};
