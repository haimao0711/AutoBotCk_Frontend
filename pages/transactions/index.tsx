import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import useDarkMode from '../../hooks/useDarkMode';
import TableTransactions from './tableTransactions';

const Index: NextPage = () => {
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();

	return (
		<PageWrapper className='page-overview'>
			<Head>
				<title>Transactions</title>
			</Head>
			<Page>
				<div className='wrap-table_active_log'>
					<TableTransactions />
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Index;
