import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import useDarkMode from '../../hooks/useDarkMode';
import LiquidityList from './liquidity-list';
import TotalLP from './total-lp';

const Index: NextPage = () => {
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();

	return (
		<PageWrapper className='page-liquidity'>
			<Head>
				<title>Liquidity Management</title>
			</Head>
			<Page>
				<div className='wrap-total-lp'>
					<TotalLP />
				</div>

				<div className='wrap-liquidity-list'>
					<LiquidityList />
				</div>
			</Page>
		</PageWrapper>
	);
};
export default Index;
