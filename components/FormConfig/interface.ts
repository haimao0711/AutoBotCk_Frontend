import { FormikProps } from 'formik';

export type FormPropType = {
	formik: FormikProps<IBaseConfig>;
	setValues: (
		prefix: 'vnindex' | 'stock',
		side: 'buy' | 'sell',
		key: string,
		newValue: boolean,
	) => void;
	values: IBaseConfig;
};

export type ConditionMappingTypes = {
	[key: string]: {
		name: string;
	};
};

export interface IConfig {
	name?: string;
	config_id?: string;
	stock_id?: string;
	selectedStocks?: string[];
	stock_name?: string;
	chart?: string;
	chart_sell?: string;
	chart_type?: string;
	config_stock_id?: string;
	config_is_buy: boolean;
	config_is_sell: boolean;
	config_is_use_vnindex_config: boolean;
	config_is_use_stock_config: boolean;
}

export interface IErrorConfig extends Omit<IConfig, 'name' | 'config_id'> {}

export interface IVNIndexBuyConfig {
	vnindex_config_min_vnindex_buy: number;
	vnindex_config_max_vnindex_buy: number;
	vnindex_config_use_min_vnindex_buy: boolean;
	vnindex_config_use_max_vnindex_buy: boolean;

	vnindex_config_use_rsi_to_buy: boolean;
	vnindex_config_use_rsi_obl_to_buy: boolean;
	vnindex_config_use_rsi_reversed_increase: boolean;
	vnindex_config_value_rsi_to_buy: number;
	vnindex_config_value_rsi_obl_to_buy: number;
	vnindex_config_use_rsi_increase: boolean;

	vnindex_config_use_stoch_rsi_to_buy: boolean;
	vnindex_config_use_stoch_rsi_obl_to_buy: boolean;
	vnindex_config_use_stoch_rsi_reversed_increase: boolean;
	vnindex_config_value_stoch_rsi_to_buy: number;
	vnindex_config_value_stoch_rsi_obl_to_buy: number;
	vnindex_config_use_stoch_rsi_increase: boolean;

	vnindex_config_use_macd_to_buy: boolean;
	vnindex_config_use_histogram_to_buy: boolean;
	vnindex_config_use_macd_obl_to_buy: boolean;
	vnindex_config_use_histogram_obl_to_buy: boolean;
	vnindex_config_use_macd_obl_increase: boolean;
	vnindex_config_use_sma_obl_increase: boolean;
	vnindex_config_use_macd_reversed_increase: boolean;
	vnindex_config_value_macd_to_buy: number;
	vnindex_config_value_histogram_to_buy: number;
	vnindex_config_value_macd_obl_to_buy: number;
	vnindex_config_value_histogram_obl_to_buy: number;
	vnindex_config_use_macd_increase: boolean;
	vnindex_config_use_sma_increase: boolean;

	vnindex_config_use_histogram_reversed_increase: boolean;
	vnindex_config_use_histogram_increase: boolean;

	vnindex_config_use_volume_to_buy: boolean;
	vnindex_config_use_bolinger_to_buy: boolean;
}
export interface IVNIndexSellConfig {
	vnindex_config_min_vnindex_sell: number;
	vnindex_config_max_vnindex_sell: number;
	vnindex_config_use_min_vnindex_sell: boolean;
	vnindex_config_use_max_vnindex_sell: boolean;

	vnindex_config_use_rsi_to_sell: boolean;
	vnindex_config_use_rsi_reversed_decrease: boolean;
	vnindex_config_value_rsi_to_sell: number;
	vnindex_config_use_rsi_decrease: boolean;

	vnindex_config_use_stoch_rsi_to_sell: boolean;
	vnindex_config_use_stoch_rsi_reversed_decrease: boolean;
	vnindex_config_value_stoch_rsi_to_sell: number;
	vnindex_config_use_stoch_rsi_decrease: boolean;

	vnindex_config_use_macd_to_sell: boolean;
	vnindex_config_use_histogram_to_sell: boolean;
	vnindex_config_use_macd_reversed_decrease: boolean;
	vnindex_config_value_macd_to_sell: number;
	vnindex_config_value_histogram_to_sell: number;
	vnindex_config_use_macd_decrease: boolean;
	vnindex_config_use_sma_decrease: boolean;

	vnindex_config_use_histogram_reversed_decrease: boolean;
	vnindex_config_use_histogram_decrease: boolean;

	vnindex_config_use_bolinger_to_sell: boolean;
}

export interface IVNIndexBuyPriorityConfig {
	vnindex_config_min_vnindex_buy_necessary_condition: boolean;
	vnindex_config_min_vnindex_buy_sufficient_condition: boolean;
	vnindex_config_max_vnindex_buy_necessary_condition: boolean;
	vnindex_config_max_vnindex_buy_sufficient_condition: boolean;

	vnindex_config_rsi_to_buy_necessary_condition: boolean;
	vnindex_config_rsi_to_buy_sufficient_condition: boolean;
	vnindex_config_rsi_reversed_increase_necessary_condition: boolean;
	vnindex_config_rsi_reversed_increase_sufficient_condition: boolean;
	vnindex_config_rsi_increase_necessary_condition: boolean;
	vnindex_config_rsi_increase_sufficient_condition: boolean;

	vnindex_config_stoch_rsi_to_buy_necessary_condition: boolean;
	vnindex_config_stoch_rsi_to_buy_sufficient_condition: boolean;
	vnindex_config_stoch_rsi_reversed_increase_necessary_condition: boolean;
	vnindex_config_stoch_rsi_reversed_increase_sufficient_condition: boolean;
	vnindex_config_stoch_rsi_increase_necessary_condition: boolean;
	vnindex_config_stoch_rsi_increase_sufficient_condition: boolean;

	vnindex_config_macd_to_buy_necessary_condition: boolean;
	vnindex_config_histogram_to_buy_necessary_condition: boolean;
	vnindex_config_macd_to_buy_sufficient_condition: boolean;
	vnindex_config_histogram_to_buy_sufficient_condition: boolean;
	vnindex_config_macd_reversed_increase_necessary_condition: boolean;
	vnindex_config_macd_reversed_increase_sufficient_condition: boolean;
	vnindex_config_macd_increase_necessary_condition: boolean;
	vnindex_config_sma_increase_necessary_condition: boolean;
	vnindex_config_macd_increase_sufficient_condition: boolean;
	vnindex_config_sma_increase_sufficient_condition: boolean;

	vnindex_config_histogram_reversed_increase_necessary_condition: boolean;
	vnindex_config_histogram_reversed_increase_sufficient_condition: boolean;
	vnindex_config_histogram_increase_necessary_condition: boolean;
	vnindex_config_histogram_increase_sufficient_condition: boolean;

	vnindex_config_volume_to_buy_necessary_condition: boolean;
	vnindex_config_volume_to_buy_sufficient_condition: boolean;

	vnindex_config_bolinger_to_buy_necessary_condition: boolean;
	vnindex_config_bolinger_to_buy_sufficient_condition: boolean;
}

export interface IVNIndexSellPriorityConfig {
	vnindex_config_min_vnindex_sell_necessary_condition: boolean;
	vnindex_config_min_vnindex_sell_sufficient_condition: boolean;
	vnindex_config_max_vnindex_sell_necessary_condition: boolean;
	vnindex_config_max_vnindex_sell_sufficient_condition: boolean;

	vnindex_config_rsi_to_sell_necessary_condition: boolean;
	vnindex_config_rsi_to_sell_sufficient_condition: boolean;
	vnindex_config_rsi_reversed_decrease_necessary_condition: boolean;
	vnindex_config_rsi_reversed_decrease_sufficient_condition: boolean;
	vnindex_config_rsi_decrease_necessary_condition: boolean;
	vnindex_config_rsi_decrease_sufficient_condition: boolean;

	vnindex_config_stoch_rsi_to_sell_necessary_condition: boolean;
	vnindex_config_stoch_rsi_to_sell_sufficient_condition: boolean;
	vnindex_config_stoch_rsi_reversed_decrease_necessary_condition: boolean;
	vnindex_config_stoch_rsi_reversed_decrease_sufficient_condition: boolean;
	vnindex_config_stoch_rsi_decrease_necessary_condition: boolean;
	vnindex_config_stoch_rsi_decrease_sufficient_condition: boolean;

	vnindex_config_macd_to_sell_necessary_condition: boolean;
	vnindex_config_histogram_to_sell_necessary_condition: boolean;
	vnindex_config_macd_to_sell_sufficient_condition: boolean;
	vnindex_config_histogram_to_sell_sufficient_condition: boolean;
	vnindex_config_macd_reversed_decrease_necessary_condition: boolean;
	vnindex_config_macd_reversed_decrease_sufficient_condition: boolean;
	vnindex_config_macd_decrease_necessary_condition: boolean;
	vnindex_config_sma_decrease_necessary_condition: boolean;
	vnindex_config_macd_decrease_sufficient_condition: boolean;
	vnindex_config_sma_decrease_sufficient_condition: boolean;

	vnindex_config_histogram_reversed_decrease_necessary_condition: boolean;
	vnindex_config_histogram_reversed_decrease_sufficient_condition: boolean;
	vnindex_config_histogram_decrease_necessary_condition: boolean;
	vnindex_config_histogram_decrease_sufficient_condition: boolean;

	vnindex_config_bolinger_to_sell_necessary_condition: boolean;
	vnindex_config_bolinger_to_sell_sufficient_condition: boolean;
}

export interface IStockBuyConfig {
	stock_config_use_rsi_to_buy: boolean;
	stock_config_use_rsi_obl_to_buy: boolean;
	stock_config_use_rsi_reversed_increase: boolean;
	stock_config_value_rsi_to_buy: number;
	stock_config_value_rsi_obl_to_buy: number;
	stock_config_use_rsi_increase: boolean;

	stock_config_use_stoch_rsi_to_buy: boolean;
	stock_config_use_stoch_rsi_obl_to_buy: boolean;
	stock_config_use_stoch_rsi_reversed_increase: boolean;
	stock_config_value_stoch_rsi_to_buy: number;
	stock_config_value_stoch_rsi_obl_to_buy: number;
	stock_config_use_stoch_rsi_increase: boolean;

	stock_config_use_macd_to_buy: boolean;
	stock_config_use_histogram_to_buy: boolean;
	stock_config_use_macd_obl_to_buy: boolean;
	stock_config_use_histogram_obl_to_buy: boolean;
	stock_config_use_macd_obl_increase: boolean;
	stock_config_use_sma_obl_increase: boolean;
	stock_config_use_buy_up_obl_to_buy: boolean;
	stock_config_use_buy_foreign_obl_to_buy: boolean;
	stock_config_use_volume_trade_obl_to_buy: boolean;
	stock_config_use_macd_reversed_increase: boolean;
	stock_config_value_macd_to_buy: number;
	stock_config_value_histogram_to_buy: number;
	stock_config_value_macd_obl_to_buy: number;
	stock_config_value_histogram_obl_to_buy: number;
	stock_config_value_buy_up_obl_to_buy: number;
	stock_config_value_buy_foreign_obl_to_buy: number;
	stock_config_value_volume_trade_obl_to_buy: number;
	stock_config_use_macd_increase: boolean;
	stock_config_use_sma_increase: boolean;

	stock_config_use_histogram_reversed_increase: boolean;
	stock_config_use_histogram_increase: boolean;

	stock_config_use_volume_to_buy: boolean;
}

export interface IStockSellConfig {
	stock_config_use_rsi_to_sell: boolean;
	stock_config_use_rsi_reversed_decrease: boolean;
	stock_config_value_rsi_to_sell: number;
	stock_config_use_rsi_decrease: boolean;

	stock_config_use_stoch_rsi_to_sell: boolean;
	stock_config_use_stoch_rsi_reversed_decrease: boolean;
	stock_config_value_stoch_rsi_to_sell: number;
	stock_config_use_stoch_rsi_decrease: boolean;

	stock_config_use_macd_to_sell: boolean;
	stock_config_use_histogram_to_sell: boolean;
	stock_config_use_macd_reversed_decrease: boolean;
	stock_config_value_macd_to_sell: number;
	stock_config_value_histogram_to_sell: number;
	stock_config_use_macd_decrease: boolean;
	stock_config_use_sma_decrease: boolean;

	stock_config_use_histogram_reversed_decrease: boolean;
	stock_config_use_histogram_decrease: boolean;
}

export interface IStockBuyPriorityConfig {
	stock_config_rsi_to_buy_necessary_condition: boolean;
	stock_config_rsi_to_buy_sufficient_condition: boolean;
	stock_config_rsi_reversed_increase_necessary_condition: boolean;
	stock_config_rsi_reversed_increase_sufficient_condition: boolean;
	stock_config_rsi_increase_necessary_condition: boolean;
	stock_config_rsi_increase_sufficient_condition: boolean;

	stock_config_stoch_rsi_to_buy_necessary_condition: boolean;
	stock_config_stoch_rsi_to_buy_sufficient_condition: boolean;
	stock_config_stoch_rsi_to_buy_obligatory_condition: boolean;

	stock_config_stoch_rsi_reversed_increase_necessary_condition: boolean;
	stock_config_stoch_rsi_reversed_increase_sufficient_condition: boolean;
	stock_config_stoch_rsi_increase_necessary_condition: boolean;
	stock_config_stoch_rsi_increase_sufficient_condition: boolean;

	stock_config_macd_to_buy_necessary_condition: boolean;
	stock_config_histogram_to_buy_necessary_condition: boolean;
	stock_config_macd_to_buy_sufficient_condition: boolean;
	stock_config_histogram_to_buy_sufficient_condition: boolean;
	stock_config_macd_reversed_increase_necessary_condition: boolean;
	stock_config_macd_reversed_increase_sufficient_condition: boolean;
	stock_config_macd_increase_necessary_condition: boolean;
	stock_config_sma_increase_necessary_condition: boolean;
	stock_config_macd_increase_sufficient_condition: boolean;
	stock_config_sma_increase_sufficient_condition: boolean;

	stock_config_histogram_reversed_increase_necessary_condition: boolean;
	stock_config_histogram_reversed_increase_sufficient_condition: boolean;
	stock_config_histogram_increase_necessary_condition: boolean;
	stock_config_histogram_increase_sufficient_condition: boolean;

	stock_config_volume_to_buy_necessary_condition: boolean;
	stock_config_volume_to_buy_sufficient_condition: boolean;
}

export interface IStockSellPriorityConfig {
	stock_config_rsi_to_sell_necessary_condition: boolean;
	stock_config_rsi_to_sell_sufficient_condition: boolean;
	stock_config_rsi_reversed_decrease_necessary_condition: boolean;
	stock_config_rsi_reversed_decrease_sufficient_condition: boolean;
	stock_config_rsi_decrease_necessary_condition: boolean;
	stock_config_rsi_decrease_sufficient_condition: boolean;

	stock_config_stoch_rsi_to_sell_necessary_condition: boolean;
	stock_config_stoch_rsi_to_sell_sufficient_condition: boolean;
	stock_config_stoch_rsi_reversed_decrease_necessary_condition: boolean;
	stock_config_stoch_rsi_reversed_decrease_sufficient_condition: boolean;
	stock_config_stoch_rsi_decrease_necessary_condition: boolean;
	stock_config_stoch_rsi_decrease_sufficient_condition: boolean;

	stock_config_macd_to_sell_necessary_condition: boolean;
	stock_config_histogram_to_sell_necessary_condition: boolean;
	stock_config_macd_to_sell_sufficient_condition: boolean;
	stock_config_histogram_to_sell_sufficient_condition: boolean;
	stock_config_macd_reversed_decrease_necessary_condition: boolean;
	stock_config_macd_reversed_decrease_sufficient_condition: boolean;
	stock_config_macd_decrease_necessary_condition: boolean;
	stock_config_sma_decrease_necessary_condition: boolean;
	stock_config_macd_decrease_sufficient_condition: boolean;
	stock_config_sma_decrease_sufficient_condition: boolean;

	stock_config_histogram_reversed_decrease_necessary_condition: boolean;
	stock_config_histogram_reversed_decrease_sufficient_condition: boolean;
	stock_config_histogram_decrease_necessary_condition: boolean;
	stock_config_histogram_decrease_sufficient_condition: boolean;
}

export interface IStockOtherConfig {
	stock_config_num_player: number;

	stock_config_time_to_buy: number;
	stock_config_time_update_pid_buy: number;
	stock_config_is_mode_sensitive_buy: boolean;
	stock_config_percent_sensitive_buy: number;

	stock_config_time_to_sell: number;
	stock_config_time_update_pid_sell: number;
	stock_config_is_mode_sensitive_sell: boolean;
	stock_config_percent_sensitive_sell: number;

	stock_config_use_stop_loss_first_part: boolean;
	stock_config_percent_stop_loss_sell_first: number;
	stock_config_use_stop_loss_trigger: boolean;
	stock_config_stop_loss_percent: number;
	stock_config_use_stop_loss_second_part: boolean;
	stock_config_percent_stop_loss_sell_second: number;

	stock_config_use_take_profit_first_part: boolean;
	stock_config_use_stoch_rsi_to_take_profit: boolean;
	stock_config_use_take_profit_first_part_two: boolean;
	stock_config_percent_take_profit_sell_first: number;
	stock_config_value_stoch_rsi_to_take_profit: number;
	stock_config_percent_take_profit_sell_first_two: number;
	stock_config_use_take_profit_trigger: boolean;
	stock_config_take_profit_percent: number;
	stock_config_use_take_profit_second_part: boolean;
	stock_config_use_take_profit_second_part_two: boolean;
	stock_config_percent_take_profit_sell_second: number;
	stock_config_percent_stoch_rsi_to_take_profit: number;
	stock_config_percent_take_profit_sell_second_two: number;
	stock_config_use_bolinger_to_take_profit: boolean;
	stock_config_use_bolinger_a_part_to_take_profit: boolean;
	stock_config_percent_bolinger_a_part_to_take_profit: number;

	stock_config_number_pid_buy_once_time: number;
	stock_config_number_pid_sell_once_time: number;
	stock_config_percent_stock_sell_once_time: number;
	stock_config_slippage_volume_sell_per_pid: number;
	stock_config_slippage_sell: number;
	stock_config_add_price_sell: number;
	stock_config_percent_stock_buy_once_time: number;
	stock_config_slippage_volume_buy_per_pid: number;
	stock_config_slippage_buy: number;
	stock_config_add_price_buy: number;
	stock_config_percent_first_buy: number;

	stock_config_is_use_time_to_buy: boolean;
	stock_config_time_start_buy: string;
	stock_config_time_end_buy: string;
	stock_config_days_buy: string;
	stock_config_is_use_time_to_sell: boolean;
	stock_config_time_start_sell: string;
	stock_config_time_end_sell: string;
	stock_config_days_sell: string;
}

export interface IVNIndexBase {
	buy: IVNIndexBuyConfig;
	sell: IVNIndexSellConfig;
}

export interface IStockBase {
	buy: IStockBuyConfig;
	sell: IStockSellConfig;
	other: IStockOtherConfig;
}

export interface IPriorityBase {
	vnindex: {
		buy: IVNIndexBuyPriorityConfig;
		sell: IVNIndexSellPriorityConfig;
	};
	stock: {
		buy: IStockBuyPriorityConfig;
		sell: IStockSellPriorityConfig;
	};
}

export interface IBaseConfig {
	base: IConfig;
	vnindex: IVNIndexBase;
	stock: IStockBase;
	priority: IPriorityBase;
}

export interface IErrorBaseConfig {
	base: IErrorConfig;
	vnindex: IVNIndexBase;
	stock: IStockBase;
}

export interface ModuleProps {
	type: 'Buy' | 'Sell' | 'BuyObl';
	label: string;
	formik: FormikProps<IBaseConfig>;
	setValues: (
		prefix: 'vnindex' | 'stock',
		side: 'buy' | 'sell',
		key: string,
		newValue: boolean,
	) => void;
	slug: string | string[] | undefined;
}

export interface SwitchItemsRenderProps {
	key: string;
	label: string;
	name: string;
	isRender: boolean;
}

export interface TypeItemsRenderProps {
	keyRender: string;
	key: string;
	label: string;
	isRender?: boolean;
}

export interface SwitchItemProps {
	className: string;
	formik: FormikProps<IBaseConfig>;
	label: string;
	id: string;
	name: string;
	checked: boolean;
	side: 'Buy' | 'Sell' | 'BuyObl';
	setValues: (
		prefix: 'vnindex' | 'stock',
		side: 'buy' | 'sell',
		key: string,
		newValue: boolean,
	) => void;
}

export interface TypeItemProps {
	className: string;
	formik: FormikProps<IBaseConfig>;
	label: string;
	id: string;
	useMinValue: boolean;
	minValue?: number;
}

export type IVNIndexSharing = IVNIndexBuyConfig | IVNIndexSellConfig;
export type IStockSharing = IStockBuyConfig | IStockSellConfig;
