import React, { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserDataWithUsername, IUserProps } from '../common/data/userDummyData';

export interface IAuthContextProps {
	userName: string;
	email: string;
	isLogin: string;
	totalEquity: string;
	totalMarketValue: string;
	cashAvailable: string;
	accountName: string;
	accountNum: string;
	limitNumberStocks: string;
	setUserName: (value: ((prevState: string) => string) | string) => void;
	setEmail: (value: ((prevState: string) => string) | string) => void;
	setIsLogin: (value: ((prevState: string) => string) | string) => void;
	setTotalEquity: (value: ((prevState: string) => string) | string) => void;
	setTotalMarketValue: (value: ((prevState: string) => string) | string) => void;
	setCashAvailable: (value: ((prevState: string) => string) | string) => void;
	setAccountName: (value: ((prevState: string) => string) | string) => void;
	setAccountNum: (value: ((prevState: string) => string) | string) => void;
	setLimitNumberStocks: (value: ((prevState: string) => string) | string) => void;
}

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthContextProviderProps {
	children: ReactNode;
}

export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
	const [userName, setUserName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [isLogin, setIsLogin] = useState<string>('');
	const [totalEquity, setTotalEquity] = useState<string>('');
	const [totalMarketValue, setTotalMarketValue] = useState<string>('');
	const [cashAvailable, setCashAvailable] = useState<string>('');
	const [accountName, setAccountName] = useState<string>('');
	const [accountNum, setAccountNum] = useState<string>('');
	const [limitNumberStocks, setLimitNumberStocks] = useState<string>('');
	const [userData, setUserData] = useState<Partial<IUserProps>>({});

	// Load từ localStorage sau khi render client
	useEffect(() => {
		if (typeof window === 'undefined') return;

		setUserName(localStorage.getItem('facit_authUsername') || '');
		setEmail(localStorage.getItem('facit_authEmail') || '');
		setIsLogin(localStorage.getItem('facit_isLogin') || '');
		setTotalEquity(localStorage.getItem('facit_totalEquity') || '');
		setTotalMarketValue(localStorage.getItem('facit_totalMarketValue') || '');
		setCashAvailable(localStorage.getItem('facit_cashAvailable') || '');
		setAccountName(localStorage.getItem('facit_accountName') || '');
		setAccountNum(localStorage.getItem('facit_accountNum') || '');
		setLimitNumberStocks(localStorage.getItem('facit_limitNumberStocks') || '');
	}, []);

	// Ghi lại localStorage khi các giá trị thay đổi
	useEffect(() => {
		localStorage.setItem('facit_authUsername', userName);
		localStorage.setItem('facit_authEmail', email);
		localStorage.setItem('facit_isLogin', isLogin);
		localStorage.setItem('facit_totalEquity', totalEquity);
		localStorage.setItem('facit_totalMarketValue', totalMarketValue);
		localStorage.setItem('facit_cashAvailable', cashAvailable);
		localStorage.setItem('facit_accountName', accountName);
		localStorage.setItem('facit_accountNum', accountNum);
		localStorage.setItem('facit_limitNumberStocks', limitNumberStocks);
	}, [
		userName,
		email,
		isLogin,
		totalEquity,
		totalMarketValue,
		cashAvailable,
		accountName,
		accountNum,
		limitNumberStocks,
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
			cashAvailable,
			accountName,
			accountNum,
			limitNumberStocks,
			setUserName,
			setEmail,
			setIsLogin,
			setTotalEquity,
			setCashAvailable,
			setTotalMarketValue,
			setAccountName,
			setAccountNum,
			setLimitNumberStocks,
		}),
		[
			userName,
			email,
			isLogin,
			totalEquity,
			totalMarketValue,
			cashAvailable,
			accountName,
			accountNum,
			limitNumberStocks,
		],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
