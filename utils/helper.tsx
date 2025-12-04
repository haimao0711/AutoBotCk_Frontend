import {
	IBaseConfig,
	IPriorityBase,
	IStockBase,
	IVNIndexBase,
	IVNIndexBuyConfig,
	IVNIndexSellConfig,
	IVNIndexBuyPriorityConfig,
	IVNIndexSellPriorityConfig,
	IStockBuyConfig,
	IStockSellConfig,
	IStockBuyPriorityConfig,
	IStockSellPriorityConfig,
	IStockOtherConfig,
	IConfig,
} from '@components/FormConfig/interface';
import {
	IStockBuyConfigKeys,
	IStockBuyPriorityConfigKeys,
	IStockSellConfigKeys,
	IStockSellPriorityConfigKeys,
	IVNIndexBuyConfigKeys,
	IVNIndexBuyPriorityConfigKeys,
	IVNIndexSellConfigKeys,
	IVNIndexSellPriorityConfigKeys,
} from '@components/FormConfig/type';

export function getObjectKeys<T extends object>(obj: T): (keyof T)[] {
	return Object.keys(obj) as (keyof T)[];
}

export const transformConfig = <T,>(
	data: Record<string, number | boolean>,
	keys: (keyof T)[],
	removeKey: string,
): T => {
	const obj: Partial<T> = {};
	if (!data) {
		console.error('❌ transformConfig: data is undefined');
		return {} as T; // Trả về object rỗng nếu data bị undefined
	}

	for (const key of keys) {
		const resizeKey = key.toString().replace(removeKey, '') as keyof typeof data;

		if (resizeKey in data) {
			obj[key] = data[resizeKey] as T[typeof key];
		}
	}

	return obj as T;
};

export const transformVNIndexBuy = (data: Record<string, number | boolean>): IVNIndexBuyConfig => {
	const ivnIndexBuyConfigKeys: IVNIndexBuyConfigKeys = [
		'vnindex_config_min_vnindex_buy',
		'vnindex_config_max_vnindex_buy',
		'vnindex_config_use_min_vnindex_buy',
		'vnindex_config_use_max_vnindex_buy',
		'vnindex_config_use_rsi_to_buy',
		'vnindex_config_use_rsi_obl_to_buy',
		'vnindex_config_use_rsi_reversed_increase',
		'vnindex_config_value_rsi_to_buy',
		'vnindex_config_value_rsi_obl_to_buy',
		'vnindex_config_use_rsi_increase',
		'vnindex_config_use_stoch_rsi_to_buy',
		'vnindex_config_use_stoch_rsi_obl_to_buy',
		'vnindex_config_use_stoch_rsi_reversed_increase',
		'vnindex_config_value_stoch_rsi_to_buy',
		'vnindex_config_value_stoch_rsi_obl_to_buy',
		'vnindex_config_use_stoch_rsi_increase',
		'vnindex_config_use_macd_to_buy',
		'vnindex_config_use_histogram_to_buy',
		'vnindex_config_use_macd_obl_to_buy',
		'vnindex_config_use_histogram_obl_to_buy',
		'vnindex_config_use_macd_obl_increase',
		'vnindex_config_use_sma_obl_increase',
		'vnindex_config_use_macd_reversed_increase',
		'vnindex_config_value_macd_to_buy',
		'vnindex_config_value_histogram_to_buy',
		'vnindex_config_value_macd_obl_to_buy',
		'vnindex_config_value_histogram_obl_to_buy',
		'vnindex_config_use_macd_increase',
		'vnindex_config_use_sma_increase',
		'vnindex_config_use_histogram_reversed_increase',
		'vnindex_config_use_histogram_increase',
		'vnindex_config_use_volume_to_buy',
		'vnindex_config_use_bolinger_to_buy',
	];

	const obj: IVNIndexBuyConfig = transformConfig(data, ivnIndexBuyConfigKeys, 'vnindex_config_');

	return obj;
};

export const transformVNIndexSell = (
	data: Record<string, number | boolean>,
): IVNIndexSellConfig => {
	const ivnIndexSellConfigKeys: IVNIndexSellConfigKeys = [
		'vnindex_config_min_vnindex_sell',
		'vnindex_config_max_vnindex_sell',
		'vnindex_config_use_min_vnindex_sell',
		'vnindex_config_use_max_vnindex_sell',
		'vnindex_config_use_rsi_to_sell',
		'vnindex_config_use_rsi_reversed_decrease',
		'vnindex_config_value_rsi_to_sell',
		'vnindex_config_use_rsi_decrease',
		'vnindex_config_use_stoch_rsi_to_sell',
		'vnindex_config_use_stoch_rsi_reversed_decrease',
		'vnindex_config_value_stoch_rsi_to_sell',
		'vnindex_config_use_stoch_rsi_decrease',
		'vnindex_config_use_macd_to_sell',
		'vnindex_config_use_histogram_to_sell',
		'vnindex_config_use_macd_reversed_decrease',
		'vnindex_config_value_macd_to_sell',
		'vnindex_config_value_histogram_to_sell',
		'vnindex_config_use_macd_decrease',
		'vnindex_config_use_sma_decrease',
		'vnindex_config_use_histogram_reversed_decrease',
		'vnindex_config_use_histogram_decrease',
		'vnindex_config_use_bolinger_to_sell',
	];

	const obj: IVNIndexSellConfig = transformConfig(
		data,
		ivnIndexSellConfigKeys,
		'vnindex_config_',
	);

	return obj;
};

export const transformVNIndexBuyPriority = (
	data: Record<string, number | boolean>,
): IVNIndexBuyPriorityConfig => {
	const ivnIndexBuyPriorityConfigKeys: IVNIndexBuyPriorityConfigKeys = [
		'vnindex_config_min_vnindex_buy_necessary_condition',
		'vnindex_config_min_vnindex_buy_sufficient_condition',
		'vnindex_config_max_vnindex_buy_necessary_condition',
		'vnindex_config_max_vnindex_buy_sufficient_condition',
		'vnindex_config_rsi_to_buy_necessary_condition',
		'vnindex_config_rsi_to_buy_sufficient_condition',
		'vnindex_config_rsi_reversed_increase_necessary_condition',
		'vnindex_config_rsi_reversed_increase_sufficient_condition',
		'vnindex_config_rsi_increase_necessary_condition',
		'vnindex_config_rsi_increase_sufficient_condition',
		'vnindex_config_stoch_rsi_to_buy_necessary_condition',
		'vnindex_config_stoch_rsi_to_buy_sufficient_condition',
		'vnindex_config_stoch_rsi_reversed_increase_necessary_condition',
		'vnindex_config_stoch_rsi_reversed_increase_sufficient_condition',
		'vnindex_config_stoch_rsi_increase_necessary_condition',
		'vnindex_config_stoch_rsi_increase_sufficient_condition',
		'vnindex_config_macd_to_buy_necessary_condition',
		'vnindex_config_histogram_to_buy_necessary_condition',
		'vnindex_config_macd_to_buy_sufficient_condition',
		'vnindex_config_histogram_to_buy_sufficient_condition',
		'vnindex_config_macd_reversed_increase_necessary_condition',
		'vnindex_config_macd_reversed_increase_sufficient_condition',
		'vnindex_config_macd_increase_necessary_condition',
		'vnindex_config_sma_increase_necessary_condition',
		'vnindex_config_macd_increase_sufficient_condition',
		'vnindex_config_sma_increase_sufficient_condition',
		'vnindex_config_histogram_reversed_increase_necessary_condition',
		'vnindex_config_histogram_reversed_increase_sufficient_condition',
		'vnindex_config_histogram_increase_necessary_condition',
		'vnindex_config_histogram_increase_sufficient_condition',
		'vnindex_config_volume_to_buy_necessary_condition',
		'vnindex_config_volume_to_buy_sufficient_condition',
		'vnindex_config_bolinger_to_buy_necessary_condition',
		'vnindex_config_bolinger_to_buy_sufficient_condition',
	];

	const obj: IVNIndexBuyPriorityConfig = transformConfig(
		data,
		ivnIndexBuyPriorityConfigKeys,
		'vnindex_config_',
	);

	return obj;
};

export const transformVNIndexSellPriority = (
	data: Record<string, number | boolean>,
): IVNIndexSellPriorityConfig => {
	const ivnIndexSellPriorityConfigKeys: IVNIndexSellPriorityConfigKeys = [
		'vnindex_config_min_vnindex_sell_necessary_condition',
		'vnindex_config_min_vnindex_sell_sufficient_condition',
		'vnindex_config_max_vnindex_sell_necessary_condition',
		'vnindex_config_max_vnindex_sell_sufficient_condition',
		'vnindex_config_rsi_to_sell_necessary_condition',
		'vnindex_config_rsi_to_sell_sufficient_condition',
		'vnindex_config_rsi_reversed_decrease_necessary_condition',
		'vnindex_config_rsi_reversed_decrease_sufficient_condition',
		'vnindex_config_rsi_decrease_necessary_condition',
		'vnindex_config_rsi_decrease_sufficient_condition',
		'vnindex_config_stoch_rsi_to_sell_necessary_condition',
		'vnindex_config_stoch_rsi_to_sell_sufficient_condition',
		'vnindex_config_stoch_rsi_reversed_decrease_necessary_condition',
		'vnindex_config_stoch_rsi_reversed_decrease_sufficient_condition',
		'vnindex_config_stoch_rsi_decrease_necessary_condition',
		'vnindex_config_stoch_rsi_decrease_sufficient_condition',
		'vnindex_config_macd_to_sell_necessary_condition',
		'vnindex_config_histogram_to_sell_necessary_condition',
		'vnindex_config_macd_to_sell_sufficient_condition',
		'vnindex_config_histogram_to_sell_sufficient_condition',
		'vnindex_config_macd_reversed_decrease_necessary_condition',
		'vnindex_config_macd_reversed_decrease_sufficient_condition',
		'vnindex_config_macd_decrease_necessary_condition',
		'vnindex_config_sma_decrease_necessary_condition',
		'vnindex_config_sma_decrease_sufficient_condition',
		'vnindex_config_macd_decrease_sufficient_condition',
		'vnindex_config_sma_decrease_sufficient_condition',
		'vnindex_config_histogram_reversed_decrease_necessary_condition',
		'vnindex_config_histogram_reversed_decrease_sufficient_condition',
		'vnindex_config_histogram_decrease_necessary_condition',
		'vnindex_config_histogram_decrease_sufficient_condition',
		'vnindex_config_bolinger_to_sell_necessary_condition',
		'vnindex_config_bolinger_to_sell_sufficient_condition',
	];

	const obj: IVNIndexSellPriorityConfig = transformConfig(
		data,
		ivnIndexSellPriorityConfigKeys,
		'vnindex_config_',
	);

	return obj;
};

export const transformStockBuy = (data: Record<string, number | boolean>): IStockBuyConfig => {
	const iStockBuyConfigKeys: IStockBuyConfigKeys = [
		'stock_config_use_rsi_to_buy',
		'stock_config_use_rsi_obl_to_buy',
		'stock_config_use_rsi_reversed_increase',
		'stock_config_value_rsi_to_buy',
		'stock_config_value_rsi_obl_to_buy',
		'stock_config_use_rsi_increase',
		'stock_config_use_stoch_rsi_to_buy',
		'stock_config_use_stoch_rsi_obl_to_buy',
		'stock_config_use_stoch_rsi_reversed_increase',
		'stock_config_value_stoch_rsi_to_buy',
		'stock_config_value_stoch_rsi_obl_to_buy',
		'stock_config_use_stoch_rsi_increase',
		'stock_config_use_macd_to_buy',
		'stock_config_use_histogram_to_buy',
		'stock_config_use_macd_obl_to_buy',
		'stock_config_use_histogram_obl_to_buy',
		'stock_config_use_macd_obl_increase',
		'stock_config_use_sma_obl_increase',
		'stock_config_use_buy_up_obl_to_buy',
		'stock_config_use_buy_foreign_obl_to_buy',
		'stock_config_use_volume_trade_obl_to_buy',
		'stock_config_use_macd_reversed_increase',
		'stock_config_value_macd_to_buy',
		'stock_config_value_histogram_to_buy',
		'stock_config_value_macd_obl_to_buy',
		'stock_config_value_histogram_obl_to_buy',
		'stock_config_value_buy_up_obl_to_buy',
		'stock_config_value_buy_foreign_obl_to_buy',
		'stock_config_value_volume_trade_obl_to_buy',
		'stock_config_use_macd_increase',
		'stock_config_use_sma_increase',
		'stock_config_use_histogram_reversed_increase',
		'stock_config_use_histogram_increase',
		'stock_config_use_volume_to_buy',
	];

	const obj: IStockBuyConfig = transformConfig(data, iStockBuyConfigKeys, 'stock_config_');

	return obj;
};

export const transformStockSell = (data: Record<string, number | boolean>): IStockSellConfig => {
	const iStockSellConfigKeys: IStockSellConfigKeys = [
		'stock_config_use_rsi_to_sell',
		'stock_config_use_rsi_reversed_decrease',
		'stock_config_value_rsi_to_sell',
		'stock_config_use_rsi_decrease',
		'stock_config_use_stoch_rsi_to_sell',
		'stock_config_use_stoch_rsi_reversed_decrease',
		'stock_config_value_stoch_rsi_to_sell',
		'stock_config_use_stoch_rsi_decrease',
		'stock_config_use_macd_to_sell',
		'stock_config_use_histogram_to_sell',
		'stock_config_use_macd_reversed_decrease',
		'stock_config_value_macd_to_sell',
		'stock_config_value_histogram_to_sell',
		'stock_config_use_macd_decrease',
		'stock_config_use_sma_decrease',
		'stock_config_use_histogram_reversed_decrease',
		'stock_config_use_histogram_decrease',
	];

	const obj: IStockSellConfig = transformConfig(data, iStockSellConfigKeys, 'stock_config_');

	return obj;
};

export const transformStockBuyPriority = (
	data: Record<string, number | boolean>,
): IStockBuyPriorityConfig => {
	const iStockBuyPriorityConfigKeys: IStockBuyPriorityConfigKeys = [
		'stock_config_rsi_to_buy_necessary_condition',
		'stock_config_rsi_to_buy_sufficient_condition',
		'stock_config_rsi_reversed_increase_necessary_condition',
		'stock_config_rsi_reversed_increase_sufficient_condition',
		'stock_config_rsi_increase_necessary_condition',
		'stock_config_rsi_increase_sufficient_condition',
		'stock_config_stoch_rsi_to_buy_necessary_condition',
		'stock_config_stoch_rsi_to_buy_sufficient_condition',
		'stock_config_stoch_rsi_to_buy_obligatory_condition',
		'stock_config_stoch_rsi_reversed_increase_necessary_condition',
		'stock_config_stoch_rsi_reversed_increase_sufficient_condition',
		'stock_config_stoch_rsi_increase_necessary_condition',
		'stock_config_stoch_rsi_increase_sufficient_condition',
		'stock_config_macd_to_buy_necessary_condition',
		'stock_config_histogram_to_buy_necessary_condition',
		'stock_config_macd_to_buy_sufficient_condition',
		'stock_config_histogram_to_buy_sufficient_condition',
		'stock_config_macd_reversed_increase_necessary_condition',
		'stock_config_macd_reversed_increase_sufficient_condition',
		'stock_config_macd_increase_necessary_condition',
		'stock_config_sma_increase_necessary_condition',
		'stock_config_macd_increase_sufficient_condition',
		'stock_config_sma_increase_sufficient_condition',
		'stock_config_histogram_reversed_increase_necessary_condition',
		'stock_config_histogram_reversed_increase_sufficient_condition',
		'stock_config_histogram_increase_necessary_condition',
		'stock_config_histogram_increase_sufficient_condition',
		'stock_config_volume_to_buy_necessary_condition',
		'stock_config_volume_to_buy_sufficient_condition',
	];

	const obj: IStockBuyPriorityConfig = transformConfig(
		data,
		iStockBuyPriorityConfigKeys,
		'stock_config_',
	);

	return obj;
};

export const transformStockSellPriority = (
	data: Record<string, number | boolean>,
): IStockSellPriorityConfig => {
	const iStockSellPriorityConfigKeys: IStockSellPriorityConfigKeys = [
		'stock_config_rsi_to_sell_necessary_condition',
		'stock_config_rsi_to_sell_sufficient_condition',
		'stock_config_rsi_reversed_decrease_necessary_condition',
		'stock_config_rsi_reversed_decrease_sufficient_condition',
		'stock_config_rsi_decrease_necessary_condition',
		'stock_config_rsi_decrease_sufficient_condition',
		'stock_config_stoch_rsi_to_sell_necessary_condition',
		'stock_config_stoch_rsi_to_sell_sufficient_condition',
		'stock_config_stoch_rsi_reversed_decrease_necessary_condition',
		'stock_config_stoch_rsi_reversed_decrease_sufficient_condition',
		'stock_config_stoch_rsi_decrease_necessary_condition',
		'stock_config_stoch_rsi_decrease_sufficient_condition',
		'stock_config_macd_to_sell_necessary_condition',
		'stock_config_histogram_to_sell_necessary_condition',
		'stock_config_macd_to_sell_sufficient_condition',
		'stock_config_histogram_to_sell_sufficient_condition',
		'stock_config_macd_reversed_decrease_necessary_condition',
		'stock_config_macd_reversed_decrease_sufficient_condition',
		'stock_config_macd_decrease_necessary_condition',
		'stock_config_sma_decrease_necessary_condition',
		'stock_config_macd_decrease_sufficient_condition',
		'stock_config_sma_decrease_sufficient_condition',
		'stock_config_histogram_reversed_decrease_necessary_condition',
		'stock_config_histogram_reversed_decrease_sufficient_condition',
		'stock_config_histogram_decrease_necessary_condition',
		'stock_config_histogram_decrease_sufficient_condition',
	];

	const obj: IStockSellPriorityConfig = transformConfig(
		data,
		iStockSellPriorityConfigKeys,
		'stock_config_',
	);

	return obj;
};

export const transformStockOther = (data: Record<string, number | boolean>): IStockOtherConfig => {
	const iStockOtherConfigKeys: (keyof IStockOtherConfig)[] = [
		'stock_config_num_player',

		'stock_config_time_to_buy',
		'stock_config_time_update_pid_buy',
		'stock_config_is_mode_sensitive_buy',
		'stock_config_percent_sensitive_buy',

		'stock_config_time_to_sell',
		'stock_config_time_update_pid_sell',
		'stock_config_is_mode_sensitive_sell',
		'stock_config_percent_sensitive_sell',

		'stock_config_use_stop_loss_first_part',
		'stock_config_percent_stop_loss_sell_first',
		'stock_config_use_stop_loss_trigger',
		'stock_config_stop_loss_percent',
		'stock_config_use_stop_loss_second_part',
		'stock_config_percent_stop_loss_sell_second',

		'stock_config_use_take_profit_first_part',
		'stock_config_use_stoch_rsi_to_take_profit',
		'stock_config_use_rsi_decrease_to_take_profit',
		'stock_config_use_take_profit_first_part_two',
		'stock_config_percent_take_profit_sell_first',
		'stock_config_value_stoch_rsi_to_take_profit',
		'stock_config_percent_take_profit_sell_first_two',
		'stock_config_use_take_profit_trigger',
		'stock_config_take_profit_percent',
		'stock_config_use_take_profit_second_part',
		'stock_config_use_take_profit_second_part_two',
		'stock_config_percent_take_profit_sell_second',
		'stock_config_percent_stoch_rsi_to_take_profit',
		'stock_config_percent_rsi_decrease_to_take_profit',
		'stock_config_percent_take_profit_sell_second_two',
		'stock_config_use_bolinger_to_take_profit',
		'stock_config_use_bolinger_a_part_to_take_profit',
		'stock_config_percent_bolinger_a_part_to_take_profit',
		'stock_config_number_pid_buy_once_time',
		'stock_config_number_pid_sell_once_time',
		'stock_config_percent_stock_sell_once_time',
		'stock_config_slippage_volume_sell_per_pid',
		'stock_config_slippage_sell',
		'stock_config_add_price_sell',
		'stock_config_percent_stock_buy_once_time',
		'stock_config_slippage_volume_buy_per_pid',
		'stock_config_slippage_buy',
		'stock_config_add_price_buy',
		'stock_config_percent_first_buy',

		'stock_config_is_use_time_to_buy',
		'stock_config_time_start_buy',
		'stock_config_time_end_buy',
		'stock_config_days_buy',
		'stock_config_is_use_time_to_sell',
		'stock_config_time_start_sell',
		'stock_config_time_end_sell',
		'stock_config_days_sell',
	];

	const obj: IStockOtherConfig = transformConfig(data, iStockOtherConfigKeys, 'stock_config_');

	return obj;
};

export const transformConfigData = (data: Record<string, any>): IConfig => {
	const obj: Partial<IConfig> = {};

	if ('name' in data) {
		obj.name = data['name'] ? data['name'].toString() : undefined;
	}

	if ('id' in data) {
		obj.config_id = data['id'] ? data['id'].toString() : undefined;
	}

	if ('stock_id' in data) {
		obj.stock_id = data['stock_id'] ? data['stock_id'].toString() : undefined;
	}

	if ('stock_name' in data) {
		obj.stock_name = data['stock_name'] ? data['stock_name'].toString() : undefined;
	}
	if ('chart' in data) {
		obj.chart = data['chart'] ? data['chart'].toString() : undefined;
	}
	if ('chart_sell' in data) {
		obj.chart_sell = data['chart_sell'] ? data['chart_sell'].toString() : undefined;
	}
	if ('chart_type' in data) {
		obj.chart_type = data['chart_type'] ? data['chart_type'].toString() : undefined;
	}

	if ('config_stock_id' in data) {
		obj.config_stock_id = data['config_stock_id'].toString();
	}

	if ('is_buy' in data) {
		obj.config_is_buy = Boolean(data['is_buy']);
	}

	if ('is_sell' in data) {
		obj.config_is_sell = Boolean(data['is_sell']);
	}

	if ('is_use_stock_config' in data) {
		obj.config_is_use_stock_config = Boolean(data['is_use_stock_config']);
	}

	if ('is_use_vnindex_config' in data) {
		obj.config_is_use_vnindex_config = Boolean(data['is_use_vnindex_config']);
	}

	return obj as IConfig;
};

export const transformBaseConfig = (data: Record<string, any>): IBaseConfig => {
	const vnindex_data = data['vnindex_config'];
	const stock_data = data['stock_config'];

	const vnindexBase: IVNIndexBase = {
		buy: transformVNIndexBuy(vnindex_data),
		sell: transformVNIndexSell(vnindex_data),
	};

	const stockBase: IStockBase = {
		buy: transformStockBuy(stock_data),
		sell: transformStockSell(stock_data),
		other: transformStockOther(stock_data),
	};

	const priorityBase: IPriorityBase = {
		vnindex: {
			buy: transformVNIndexBuyPriority(vnindex_data),
			sell: transformVNIndexSellPriority(vnindex_data),
		},
		stock: {
			buy: transformStockBuyPriority(stock_data),
			sell: transformStockSellPriority(stock_data),
		},
	};

	return {
		base: transformConfigData(data),
		vnindex: vnindexBase,
		stock: stockBase,
		priority: priorityBase,
	};
};

export const convertPrefixNaming = (input: string): string => {
	if (input.includes('_use')) {
		return input;
	}

	const prefixes = ['vnindex_config', 'stock_config'];
	const matchedPrefix = prefixes.find((prefix) => input.startsWith(prefix));

	if (matchedPrefix) {
		const suffix = input.substring(matchedPrefix.length);
		return `${matchedPrefix}_use${suffix}`;
	}

	return input;
};

export const generateKey = (input: string): string => {
	const baseKey = input.replace('_use', '');
	return baseKey;
};

export const generateKeyV2 = (input: string): string => {
	const baseKey = input.replace('use_', '');
	return baseKey;
};
