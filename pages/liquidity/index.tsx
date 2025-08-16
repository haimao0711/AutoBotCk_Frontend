import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const lng = locale || 'en-US'; // fallback nếu locale undefined

	return {
		props: {
			...(await serverSideTranslations(lng, ['common', 'menu'])),
		},
	};
};

export default Index;
