export interface AccountType {
	id: number;
	name: string;
	amount: number;
	balance: number;
	type: 'margin' | 'normal';
	main_account: string;
}

export interface MarginAccount {
	id: number;
	name: string;
	amount: number;
	balance: number;
}

export interface NormalAccount {
	id: number;
	name: string;
	amount: number;
	balance: number;
}

export interface AccountVPS {
	id: number;
	name: string;
	password: string;
	is_need_otp: boolean;
	exchange: string;
	margin_account?: MarginAccount;
	normal_account?: NormalAccount;
	status: string;
	login_status: string;
	alias: string;
}
