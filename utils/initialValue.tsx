import {
	IVNIndexBuyConfig,
	IBaseConfig,
	IVNIndexSellConfig,
	IStockBuyConfig,
	IStockSellConfig,
	IStockOtherConfig,
	IVNIndexBuyPriorityConfig,
	IVNIndexSellPriorityConfig,
	IStockBuyPriorityConfig,
	IStockSellPriorityConfig,
} from '../components/FormConfig/interface';

export const initialValueVNIndexBuy: IVNIndexBuyConfig = {
	vnindex_config_min_vnindex_buy: 0,
	vnindex_config_max_vnindex_buy: 0,
	vnindex_config_use_min_vnindex_buy: false,
	vnindex_config_use_max_vnindex_buy: false,

	vnindex_config_use_rsi_to_buy: false,
	vnindex_config_use_rsi_obl_to_buy: false,
	vnindex_config_use_rsi_reversed_increase: false,
	vnindex_config_value_rsi_to_buy: 0,
	vnindex_config_value_rsi_obl_to_buy: 0,
	vnindex_config_use_rsi_increase: false,

	vnindex_config_use_stoch_rsi_to_buy: false,
	vnindex_config_use_stoch_rsi_obl_to_buy: false,
	vnindex_config_use_stoch_rsi_reversed_increase: false,
	vnindex_config_value_stoch_rsi_to_buy: 0,
	vnindex_config_value_stoch_rsi_obl_to_buy: 0,
	vnindex_config_use_stoch_rsi_increase: false,

	vnindex_config_use_macd_to_buy: false,
	vnindex_config_use_histogram_to_buy: false,
	vnindex_config_use_macd_obl_to_buy: false,
	vnindex_config_use_histogram_obl_to_buy: false,
	vnindex_config_use_macd_obl_increase: false,
	vnindex_config_use_sma_obl_increase: false,
	vnindex_config_use_macd_reversed_increase: false,
	vnindex_config_value_macd_to_buy: 0,
	vnindex_config_value_histogram_to_buy: 0,
	vnindex_config_value_macd_obl_to_buy: 0,
	vnindex_config_value_histogram_obl_to_buy: 0,
	vnindex_config_use_macd_increase: false,
	vnindex_config_use_sma_increase: false,

	vnindex_config_use_histogram_reversed_increase: false,
	vnindex_config_use_histogram_increase: false,

	vnindex_config_use_volume_to_buy: false,
	vnindex_config_use_bolinger_to_buy: false,
};

export const initialValueVNIndexSell: IVNIndexSellConfig = {
	vnindex_config_min_vnindex_sell: 0,
	vnindex_config_max_vnindex_sell: 0,
	vnindex_config_use_min_vnindex_sell: false,
	vnindex_config_use_max_vnindex_sell: false,

	vnindex_config_use_rsi_to_sell: false,
	vnindex_config_use_rsi_reversed_decrease: false,
	vnindex_config_value_rsi_to_sell: 0,
	vnindex_config_use_rsi_decrease: false,

	vnindex_config_use_stoch_rsi_to_sell: false,
	vnindex_config_use_stoch_rsi_reversed_decrease: false,
	vnindex_config_value_stoch_rsi_to_sell: 0,
	vnindex_config_use_stoch_rsi_decrease: false,

	vnindex_config_use_macd_to_sell: false,
	vnindex_config_use_histogram_to_sell: false,
	vnindex_config_use_macd_reversed_decrease: false,
	vnindex_config_value_macd_to_sell: 0,
	vnindex_config_value_histogram_to_sell: 0,
	vnindex_config_use_macd_decrease: false,
	vnindex_config_use_sma_decrease: false,

	vnindex_config_use_histogram_reversed_decrease: false,
	vnindex_config_use_histogram_decrease: false,

	vnindex_config_use_bolinger_to_sell: false,
};

export const initialValueStockBuy: IStockBuyConfig = {
	stock_config_use_rsi_to_buy: false,
	stock_config_use_rsi_obl_to_buy: false,
	stock_config_use_rsi_reversed_increase: false,
	stock_config_value_rsi_to_buy: 0,
	stock_config_value_rsi_obl_to_buy: 0,
	stock_config_use_rsi_increase: false,

	stock_config_use_stoch_rsi_to_buy: false,
	stock_config_use_stoch_rsi_obl_to_buy: false,
	stock_config_use_stoch_rsi_reversed_increase: false,
	stock_config_value_stoch_rsi_to_buy: 0,
	stock_config_value_stoch_rsi_obl_to_buy: 0,
	stock_config_use_stoch_rsi_increase: false,

	stock_config_use_macd_to_buy: false,
	stock_config_use_histogram_to_buy: false,
	stock_config_use_macd_obl_to_buy: false,
	stock_config_use_histogram_obl_to_buy: false,
	stock_config_use_macd_obl_increase: false,
	stock_config_use_sma_obl_increase: false,
	stock_config_use_buy_up_obl_to_buy: false,
	stock_config_use_buy_foreign_obl_to_buy: false,
	stock_config_use_volume_trade_obl_to_buy: false,
	stock_config_use_macd_reversed_increase: false,
	stock_config_value_macd_to_buy: 0,
	stock_config_value_histogram_to_buy: 0,
	stock_config_value_macd_obl_to_buy: 0,
	stock_config_value_histogram_obl_to_buy: 0,
	stock_config_value_buy_up_obl_to_buy: 0,
	stock_config_value_buy_foreign_obl_to_buy: 0,
	stock_config_value_volume_trade_obl_to_buy: 0,
	stock_config_use_macd_increase: false,
	stock_config_use_sma_increase: false,

	stock_config_use_histogram_reversed_increase: false,
	stock_config_use_histogram_increase: false,

	stock_config_use_volume_to_buy: false,
};

export const initialValueStockSell: IStockSellConfig = {
	stock_config_use_rsi_to_sell: false,
	stock_config_use_rsi_reversed_decrease: false,
	stock_config_value_rsi_to_sell: 0,
	stock_config_use_rsi_decrease: false,

	stock_config_use_stoch_rsi_to_sell: false,
	stock_config_use_stoch_rsi_reversed_decrease: false,
	stock_config_value_stoch_rsi_to_sell: 0,
	stock_config_use_stoch_rsi_decrease: false,

	stock_config_use_macd_to_sell: false,
	stock_config_use_histogram_to_sell: false,
	stock_config_use_macd_reversed_decrease: false,
	stock_config_value_macd_to_sell: 0,
	stock_config_value_histogram_to_sell: 0,
	stock_config_use_macd_decrease: false,
	stock_config_use_sma_decrease: false,

	stock_config_use_histogram_reversed_decrease: false,
	stock_config_use_histogram_decrease: false,
};

export const initialValueStockOther: IStockOtherConfig = {
	stock_config_num_player: 0,

	stock_config_time_to_buy: 0,
	stock_config_time_update_pid_buy: 0,
	stock_config_is_mode_sensitive_buy: false,
	stock_config_percent_sensitive_buy: 0,

	stock_config_time_to_sell: 0,
	stock_config_time_update_pid_sell: 0,
	stock_config_is_mode_sensitive_sell: false,
	stock_config_percent_sensitive_sell: 0,

	stock_config_use_stop_loss_first_part: false,
	stock_config_percent_stop_loss_sell_first: 0,
	stock_config_use_stop_loss_trigger: false,
	stock_config_stop_loss_percent: 0,
	stock_config_use_stop_loss_second_part: false,
	stock_config_percent_stop_loss_sell_second: 0,

	stock_config_use_take_profit_first_part: false,
	stock_config_use_stoch_rsi_to_take_profit: false,
	stock_config_use_take_profit_first_part_two: false,
	stock_config_percent_take_profit_sell_first: 0,
	stock_config_value_stoch_rsi_to_take_profit: 0,
	stock_config_percent_take_profit_sell_first_two: 0,
	stock_config_use_take_profit_trigger: false,
	stock_config_take_profit_percent: 0,
	stock_config_use_take_profit_second_part: false,
	stock_config_use_take_profit_second_part_two: false,
	stock_config_percent_take_profit_sell_second: 0,
	stock_config_percent_stoch_rsi_to_take_profit: 0,
	stock_config_percent_take_profit_sell_second_two: 0,
	stock_config_use_bolinger_to_take_profit: false,
	stock_config_use_bolinger_a_part_to_take_profit: false,
	stock_config_percent_bolinger_a_part_to_take_profit: 0,

	stock_config_number_pid_buy_once_time: 0,
	stock_config_number_pid_sell_once_time: 0,
	stock_config_percent_stock_sell_once_time: 0,
	stock_config_slippage_volume_sell_per_pid: 0,
	stock_config_slippage_sell: 0,
	stock_config_add_price_sell: 0,
	stock_config_percent_stock_buy_once_time: 0,
	stock_config_slippage_volume_buy_per_pid: 0,
	stock_config_slippage_buy: 0,
	stock_config_add_price_buy: 0,
	stock_config_percent_first_buy: 0,

	stock_config_is_use_time_to_buy: false,
	stock_config_time_start_buy: '',
	stock_config_time_end_buy: '',
	stock_config_days_buy: '',
	stock_config_is_use_time_to_sell: false,
	stock_config_time_start_sell: '',
	stock_config_time_end_sell: '',
	stock_config_days_sell: '',
};

export const initialValuePriorityVNIndexBuy: IVNIndexBuyPriorityConfig = {
	vnindex_config_min_vnindex_buy_necessary_condition: false,
	vnindex_config_min_vnindex_buy_sufficient_condition: false,
	vnindex_config_max_vnindex_buy_necessary_condition: false,
	vnindex_config_max_vnindex_buy_sufficient_condition: false,

	vnindex_config_rsi_to_buy_necessary_condition: false,
	vnindex_config_rsi_to_buy_sufficient_condition: false,
	vnindex_config_rsi_reversed_increase_necessary_condition: false,
	vnindex_config_rsi_reversed_increase_sufficient_condition: false,
	vnindex_config_rsi_increase_necessary_condition: false,
	vnindex_config_rsi_increase_sufficient_condition: false,

	vnindex_config_stoch_rsi_to_buy_necessary_condition: false,
	vnindex_config_stoch_rsi_to_buy_sufficient_condition: false,
	vnindex_config_stoch_rsi_reversed_increase_necessary_condition: false,
	vnindex_config_stoch_rsi_reversed_increase_sufficient_condition: false,
	vnindex_config_stoch_rsi_increase_necessary_condition: false,
	vnindex_config_stoch_rsi_increase_sufficient_condition: false,

	vnindex_config_macd_to_buy_necessary_condition: false,
	vnindex_config_histogram_to_buy_necessary_condition: false,
	vnindex_config_macd_to_buy_sufficient_condition: false,
	vnindex_config_histogram_to_buy_sufficient_condition: false,
	vnindex_config_macd_reversed_increase_necessary_condition: false,
	vnindex_config_macd_reversed_increase_sufficient_condition: false,
	vnindex_config_macd_increase_necessary_condition: false,
	vnindex_config_sma_increase_necessary_condition: false,
	vnindex_config_macd_increase_sufficient_condition: false,
	vnindex_config_sma_increase_sufficient_condition: false,

	vnindex_config_histogram_reversed_increase_necessary_condition: false,
	vnindex_config_histogram_reversed_increase_sufficient_condition: false,
	vnindex_config_histogram_increase_necessary_condition: false,
	vnindex_config_histogram_increase_sufficient_condition: false,

	vnindex_config_volume_to_buy_necessary_condition: false,
	vnindex_config_volume_to_buy_sufficient_condition: false,

	vnindex_config_bolinger_to_buy_necessary_condition: false,
	vnindex_config_bolinger_to_buy_sufficient_condition: false,
};

export const initialValuePriorityVNIndexSell: IVNIndexSellPriorityConfig = {
	vnindex_config_min_vnindex_sell_necessary_condition: false,
	vnindex_config_min_vnindex_sell_sufficient_condition: false,
	vnindex_config_max_vnindex_sell_necessary_condition: false,
	vnindex_config_max_vnindex_sell_sufficient_condition: false,

	vnindex_config_rsi_to_sell_necessary_condition: false,
	vnindex_config_rsi_to_sell_sufficient_condition: false,
	vnindex_config_rsi_reversed_decrease_necessary_condition: false,
	vnindex_config_rsi_reversed_decrease_sufficient_condition: false,
	vnindex_config_rsi_decrease_necessary_condition: false,
	vnindex_config_rsi_decrease_sufficient_condition: false,

	vnindex_config_stoch_rsi_to_sell_necessary_condition: false,
	vnindex_config_stoch_rsi_to_sell_sufficient_condition: false,
	vnindex_config_stoch_rsi_reversed_decrease_necessary_condition: false,
	vnindex_config_stoch_rsi_reversed_decrease_sufficient_condition: false,
	vnindex_config_stoch_rsi_decrease_necessary_condition: false,
	vnindex_config_stoch_rsi_decrease_sufficient_condition: false,

	vnindex_config_macd_to_sell_necessary_condition: false,
	vnindex_config_histogram_to_sell_necessary_condition: false,
	vnindex_config_macd_to_sell_sufficient_condition: false,
	vnindex_config_histogram_to_sell_sufficient_condition: false,
	vnindex_config_macd_reversed_decrease_necessary_condition: false,
	vnindex_config_macd_reversed_decrease_sufficient_condition: false,
	vnindex_config_macd_decrease_necessary_condition: false,
	vnindex_config_sma_decrease_necessary_condition: false,
	vnindex_config_macd_decrease_sufficient_condition: false,
	vnindex_config_sma_decrease_sufficient_condition: false,

	vnindex_config_histogram_reversed_decrease_necessary_condition: false,
	vnindex_config_histogram_reversed_decrease_sufficient_condition: false,
	vnindex_config_histogram_decrease_necessary_condition: false,
	vnindex_config_histogram_decrease_sufficient_condition: false,

	vnindex_config_bolinger_to_sell_necessary_condition: false,
	vnindex_config_bolinger_to_sell_sufficient_condition: false,
};

export const initialValuePriorityStockBuy: IStockBuyPriorityConfig = {
	stock_config_rsi_to_buy_necessary_condition: false,
	stock_config_rsi_to_buy_sufficient_condition: false,
	stock_config_rsi_reversed_increase_necessary_condition: false,
	stock_config_rsi_reversed_increase_sufficient_condition: false,
	stock_config_rsi_increase_necessary_condition: false,
	stock_config_rsi_increase_sufficient_condition: false,

	stock_config_stoch_rsi_to_buy_necessary_condition: false,
	stock_config_stoch_rsi_to_buy_sufficient_condition: false,
	stock_config_stoch_rsi_to_buy_obligatory_condition: false,
	stock_config_stoch_rsi_reversed_increase_necessary_condition: false,
	stock_config_stoch_rsi_reversed_increase_sufficient_condition: false,
	stock_config_stoch_rsi_increase_necessary_condition: false,
	stock_config_stoch_rsi_increase_sufficient_condition: false,

	stock_config_macd_to_buy_necessary_condition: false,
	stock_config_histogram_to_buy_necessary_condition: false,
	stock_config_macd_to_buy_sufficient_condition: false,
	stock_config_histogram_to_buy_sufficient_condition: false,
	stock_config_macd_reversed_increase_necessary_condition: false,
	stock_config_macd_reversed_increase_sufficient_condition: false,
	stock_config_macd_increase_necessary_condition: false,
	stock_config_sma_increase_necessary_condition: false,
	stock_config_macd_increase_sufficient_condition: false,
	stock_config_sma_increase_sufficient_condition: false,

	stock_config_histogram_reversed_increase_necessary_condition: false,
	stock_config_histogram_reversed_increase_sufficient_condition: false,
	stock_config_histogram_increase_necessary_condition: false,
	stock_config_histogram_increase_sufficient_condition: false,

	stock_config_volume_to_buy_necessary_condition: false,
	stock_config_volume_to_buy_sufficient_condition: false,
};

export const initialValuePriorityStockSell: IStockSellPriorityConfig = {
	stock_config_rsi_to_sell_necessary_condition: false,
	stock_config_rsi_to_sell_sufficient_condition: false,
	stock_config_rsi_reversed_decrease_necessary_condition: false,
	stock_config_rsi_reversed_decrease_sufficient_condition: false,
	stock_config_rsi_decrease_necessary_condition: false,
	stock_config_rsi_decrease_sufficient_condition: false,

	stock_config_stoch_rsi_to_sell_necessary_condition: false,
	stock_config_stoch_rsi_to_sell_sufficient_condition: false,
	stock_config_stoch_rsi_reversed_decrease_necessary_condition: false,
	stock_config_stoch_rsi_reversed_decrease_sufficient_condition: false,
	stock_config_stoch_rsi_decrease_necessary_condition: false,
	stock_config_stoch_rsi_decrease_sufficient_condition: false,

	stock_config_macd_to_sell_necessary_condition: false,
	stock_config_histogram_to_sell_necessary_condition: false,
	stock_config_macd_to_sell_sufficient_condition: false,
	stock_config_histogram_to_sell_sufficient_condition: false,
	stock_config_macd_reversed_decrease_necessary_condition: false,
	stock_config_macd_reversed_decrease_sufficient_condition: false,
	stock_config_macd_decrease_necessary_condition: false,
	stock_config_sma_decrease_necessary_condition: false,
	stock_config_macd_decrease_sufficient_condition: false,
	stock_config_sma_decrease_sufficient_condition: false,

	stock_config_histogram_reversed_decrease_necessary_condition: false,
	stock_config_histogram_reversed_decrease_sufficient_condition: false,
	stock_config_histogram_decrease_necessary_condition: false,
	stock_config_histogram_decrease_sufficient_condition: false,
};

export const initialValuesBaseConfig: IBaseConfig = {
	base: {
		name: '',
		config_id: '',
		config_stock_id: '',
		config_is_buy: false,
		config_is_sell: false,
		config_is_use_vnindex_config: false,
		config_is_use_stock_config: false,
	},
	vnindex: {
		buy: initialValueVNIndexBuy,
		sell: initialValueVNIndexSell,
	},
	stock: {
		buy: initialValueStockBuy,
		sell: initialValueStockSell,
		other: initialValueStockOther,
	},
	priority: {
		vnindex: {
			buy: initialValuePriorityVNIndexBuy,
			sell: initialValuePriorityVNIndexSell,
		},
		stock: {
			buy: initialValuePriorityStockBuy,
			sell: initialValuePriorityStockSell,
		},
	},
};
