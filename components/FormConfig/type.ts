import {
	IVNIndexBuyConfig,
	IVNIndexSellConfig,
	IVNIndexBuyPriorityConfig,
	IVNIndexSellPriorityConfig,
	IStockBuyConfig,
	IStockSellConfig,
	IStockBuyPriorityConfig,
	IStockSellPriorityConfig,
	IStockOtherConfig,
} from './interface';

type KeysOf<T> = (keyof T)[];

export type IVNIndexBuyConfigKeys = KeysOf<IVNIndexBuyConfig>;
export type IVNIndexSellConfigKeys = KeysOf<IVNIndexSellConfig>;
export type IVNIndexBuyPriorityConfigKeys = KeysOf<IVNIndexBuyPriorityConfig>;
export type IVNIndexSellPriorityConfigKeys = KeysOf<IVNIndexSellPriorityConfig>;
export type IStockBuyConfigKeys = KeysOf<IStockBuyConfig>;
export type IStockSellConfigKeys = KeysOf<IStockSellConfig>;
export type IStockBuyPriorityConfigKeys = KeysOf<IStockBuyPriorityConfig>;
export type IStockSellPriorityConfigKeys = KeysOf<IStockSellPriorityConfig>;
export type IStockOtherConfigKeys = KeysOf<IStockOtherConfig>;
