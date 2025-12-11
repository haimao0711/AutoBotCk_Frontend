import { IBaseConfig, IConfig } from '@components/FormConfig/interface';
import { DEFAULT_INIT_LEVEL } from '@constants/default.value';
import { generateKeyV2 } from './helper';

export const removePrefix = (prefix: string, obj: Record<string, any>): Record<string, any> => {
	const result: Record<string, any> = {};
	for (const key in obj) {
		if (key.startsWith(prefix)) {
			result[key.substring(prefix.length)] = obj[key];
		} else {
			result[key] = obj[key];
		}
	}
	return result;
};

export const transformConfigData = (config: IBaseConfig): Record<string, any> => {
	const baseData: Record<string, any> = {
		is_buy: config.base.config_is_buy,
		is_sell: config.base.config_is_sell,
		is_use_vnindex_config: config.base.config_is_use_vnindex_config,
		is_use_stock_config: config.base.config_is_use_stock_config,
		is_use_candle_second: config.base.config_is_use_candle_second,
		level: DEFAULT_INIT_LEVEL,
	};

	const excludeKeys: Array<keyof IConfig> = [
		'config_is_buy',
		'config_is_sell',
		'config_is_use_vnindex_config',
		'config_is_use_stock_config',
	];

	(Object.keys(config.base) as Array<keyof IConfig>).forEach((key) => {
		if (!excludeKeys.includes(key) && config.base[key] !== undefined) {
			baseData[key] = config.base[key]; // This is now type-safe
		}
	});

	const vnindexConfig = {
		...removePrefix('vnindex_config_', config.vnindex.buy),
		...removePrefix('vnindex_config_', config.vnindex.sell),
		...removePrefix('vnindex_config_', config.priority.vnindex.buy),
		...removePrefix('vnindex_config_', config.priority.vnindex.sell),
	};

	Object.entries(vnindexConfig).forEach(([key, value]) => {
		if (key.endsWith('_condition') && key.startsWith('use_')) {
			const newKey = generateKeyV2(key);

			// Nếu newKey đã tồn tại trong vnindexConfig
			if (newKey in vnindexConfig) {
				if (!newKey) {
					// Nếu newKey là false, ghi đè giá trị mới
					vnindexConfig[newKey] = value;
				}
				// Nếu newKey là true, giữ nguyên giá trị hiện tại
			} else {
				// Nếu newKey chưa tồn tại, thêm vào
				vnindexConfig[newKey] = value;
			}

			// Xóa key cũ
			delete vnindexConfig[key];
		}
	});
	const stockConfig = {
		...removePrefix('stock_config_', config.stock.buy),
		...removePrefix('stock_config_', config.stock.sell),
		...removePrefix('stock_config_', config.stock.other),
		...removePrefix('stock_config_', config.priority.stock.buy),
		...removePrefix('stock_config_', config.priority.stock.sell),
	};
	Object.entries(stockConfig).map(([key, value]) => {
		if (key.endsWith('_condition') && key.startsWith('use_')) {
			const newKey = generateKeyV2(key);
			if (newKey in vnindexConfig) {
				if (!newKey) {
					// Nếu newKey là false, ghi đè giá trị mới
					stockConfig[newKey] = value;
				}
				// Nếu newKey là true, giữ nguyên giá trị hiện tại
			} else {
				// Nếu newKey chưa tồn tại, thêm vào
				stockConfig[newKey] = value;
			}
			delete stockConfig[key];
		}
	});

	return {
		...baseData,
		vnindex_config: vnindexConfig,
		stock_config: stockConfig,
	};
};
