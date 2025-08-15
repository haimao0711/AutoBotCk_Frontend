import React, { createContext, useEffect, useState, useMemo, FC, ReactNode } from 'react';
import PropTypes from 'prop-types';

export interface IConfigContextProps {
	arrConfig: any;
	arrStocks: any;
	arrTransaction: any;
	setArrayConfig: (value: ((prevState: any) => any) | any) => void;
	setArrayStocks: (value: ((prevState: any) => any) | any) => void;
	setArrayTransaction: (value: ((prevState: any) => any) | any) => void;
}
const ConfigContext = createContext<IConfigContextProps>({} as IConfigContextProps);

interface IConfigContextProviderProps {
	children: ReactNode;
}
export const ConfigContextProvider: FC<IConfigContextProviderProps> = ({ children }) => {
	// @ts-ignore

	const [arrConfig, setArrayConfig] = useState([]);
	const [arrStocks, setArrayStocks] = useState([]);
	const [arrTransaction, setArrayTransaction] = useState([]);
	const values: IConfigContextProps = useMemo(
		() => ({
			arrConfig,
			arrStocks,
			arrTransaction,
			setArrayConfig,
			setArrayStocks,
			setArrayTransaction,
		}),
		[arrStocks, arrConfig, arrTransaction],
	);

	return <ConfigContext.Provider value={values}>{children}</ConfigContext.Provider>;
};
ConfigContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ConfigContext;
