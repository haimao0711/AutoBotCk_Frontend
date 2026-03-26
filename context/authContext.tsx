import React, { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserDataWithUsername, IUserProps } from '../common/data/userDummyData';

export interface IAuthContextProps {
	userName: string;
	email: string;
	isLogin: string;
	totalEquity: string;
	totalMarketValue: string;
	gainLossValue: string;
	gainLossOneDayValue: string;
	cashAvailable: string;
	accountName: string;
	accountNum: string;
	limitNumberStocks: string;
	limitTotalMarketValue: string;
	setUserName: (value: ((prevState: string) => string) | string) => void;
	setEmail: (value: ((prevState: string) => string) | string) => void;
	setIsLogin: (value: ((prevState: string) => string) | string) => void;
	setTotalEquity: (value: ((prevState: string) => string) | string) => void;
	setTotalMarketValue: (value: ((prevState: string) => string) | string) => void;
	setGainLossValue: (value: ((prevState: string) => string) | string) => void;
	setGainLossOneDayValue: (value: ((prevState: string) => string) | string) => void;
	setCashAvailable: (value: ((prevState: string) => string) | string) => void;
	setAccountName: (value: ((prevState: string) => string) | string) => void;
	setAccountNum: (value: ((prevState: string) => string) | string) => void;
	setLimitNumberStocks: (value: ((prevState: string) => string) | string) => void;
	setLimitTotalMarketValue: (value: ((prevState: string) => string) | string) => void;
}

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthContextProviderProps {
	children: ReactNode;
}

export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
	const getLocalStorageItem = (key: string, defaultValue: string = ''): string => {
		if (typeof window === 'undefined') return defaultValue;
		return localStorage.getItem(key) || defaultValue;
	};

	const [userName, setUserName] = useState<string>(
		() => getLocalStorageItem('facit_authUsername') || '',
	);
	const [email, setEmail] = useState<string>(() => getLocalStorageItem('facit_authEmail') || '');
	const [isLogin, setIsLogin] = useState<string>(
		() => getLocalStorageItem('facit_isLogin') || '',
	);
	const [totalEquity, setTotalEquity] = useState<string>(
		() => getLocalStorageItem('facit_totalEquity') || '',
	);
	const [totalMarketValue, setTotalMarketValue] = useState<string>(
		() => getLocalStorageItem('facit_totalMarketValue') || '',
	);
	const [gainLossValue, setGainLossValue] = useState<string>(
		() => getLocalStorageItem('facit_gainLossValue') || '',
	);
	const [gainLossOneDayValue, setGainLossOneDayValue] = useState<string>(
		() => getLocalStorageItem('facit_gainLossOneDayValue') || '',
	);
	const [cashAvailable, setCashAvailable] = useState<string>(
		() => getLocalStorageItem('facit_cashAvailable') || '',
	);
	const [accountName, setAccountName] = useState<string>(
		() => getLocalStorageItem('facit_accountName') || '',
	);
	const [accountNum, setAccountNum] = useState<string>(
		() => getLocalStorageItem('facit_accountNum') || '',
	);
	const [limitNumberStocks, setLimitNumberStocks] = useState<string>(
		() => getLocalStorageItem('facit_limitNumberStocks') || '',
	);
	const [limitTotalMarketValue, setLimitTotalMarketValue] = useState<string>(
		() => getLocalStorageItem('facit_limitTotalMarketValue') || '500000000',
	);

	const [userData, setUserData] = useState<Partial<IUserProps>>({});

	// Load từ localStorage sau khi render client
	useEffect(() => {
		if (typeof window === 'undefined') return;

		setUserName(localStorage.getItem('facit_authUsername') || '');
		setEmail(localStorage.getItem('facit_authEmail') || '');
		setIsLogin(localStorage.getItem('facit_isLogin') || '');
		setTotalEquity(localStorage.getItem('facit_totalEquity') || '');
		setTotalMarketValue(localStorage.getItem('facit_totalMarketValue') || '');
		setGainLossValue(localStorage.getItem('facit_gainLossValue') || '');
		setGainLossOneDayValue(localStorage.getItem('facit_gainLossOneDayValue') || '');
		setCashAvailable(localStorage.getItem('facit_cashAvailable') || '');
		setAccountName(localStorage.getItem('facit_accountName') || '');
		setAccountNum(localStorage.getItem('facit_accountNum') || '');
		setLimitNumberStocks(localStorage.getItem('facit_limitNumberStocks') || '');
		setLimitTotalMarketValue(localStorage.getItem('facit_limitTotalMarketValue') || '500000000');
	}, []);

	// Ghi lại localStorage khi các giá trị thay đổi
	useEffect(() => {
		localStorage.setItem('facit_authUsername', userName);
		localStorage.setItem('facit_authEmail', email);
		localStorage.setItem('facit_isLogin', isLogin);
		localStorage.setItem('facit_totalEquity', totalEquity);
		localStorage.setItem('facit_totalMarketValue', totalMarketValue);
		localStorage.setItem('facit_gainLossValue', gainLossValue);
		localStorage.setItem('facit_gainLossOneDayValue', gainLossOneDayValue);
		localStorage.setItem('facit_cashAvailable', cashAvailable);
		localStorage.setItem('facit_accountName', accountName);
		localStorage.setItem('facit_accountNum', accountNum);
		localStorage.setItem('facit_limitNumberStocks', limitNumberStocks);
		localStorage.setItem('facit_limitTotalMarketValue', limitTotalMarketValue);
	}, [
		userName,
		email,
		isLogin,
		totalEquity,
		totalMarketValue,
		gainLossValue,
		gainLossOneDayValue,
		cashAvailable,
		accountName,
		accountNum,
		limitNumberStocks,
		limitTotalMarketValue,
	]);

	// Load user data mock khi userName thay đổi
	useEffect(() => {
		if (userName) {
			setUserData(getUserDataWithUsername(userName));
		} else {
			setUserData({});
		}
	}, [userName]);

	const value = useMemo(
		() => ({
			userName,
			email,
			isLogin,
			totalEquity,
			totalMarketValue,
			gainLossValue,
			gainLossOneDayValue,
			cashAvailable,
			accountName,
			accountNum,
			limitNumberStocks,
			limitTotalMarketValue,
			setUserName,
			setEmail,
			setIsLogin,
			setTotalEquity,
			setCashAvailable,
			setTotalMarketValue,
			setGainLossValue,
			setGainLossOneDayValue,
			setAccountName,
			setAccountNum,
			setLimitNumberStocks,
			setLimitTotalMarketValue,
		}),
		[
			userName,
			email,
			isLogin,
			totalEquity,
			totalMarketValue,
			gainLossValue,
			gainLossOneDayValue,
			cashAvailable,
			accountName,
			accountNum,
			limitNumberStocks,
			limitTotalMarketValue,
		],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
