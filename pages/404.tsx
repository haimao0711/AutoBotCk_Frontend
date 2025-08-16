import React from 'react';
import PageWrapper from '../layout/PageWrapper/PageWrapper';
import { authPagesMenu } from '../menu';
import Page from '../layout/Page/Page';
import Head from 'next/head';
import Button from '../components/bootstrap/Button';
import Humans from '../assets/img/scene4.png';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Page404 = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{authPagesMenu.page404.text}</title>
			</Head>
			<Page>
				<div className='row d-flex align-items-center h-100'>
					<div className='col-12 d-flex flex-wrap flex-column justify-content-center align-items-center'>
						<div
							className='text-primary fw-bold'
							style={{ fontSize: 'calc(3rem + 3vw)' }}>
							404
						</div>
						<div
							className='text-dark fw-bold'
							style={{ fontSize: 'calc(1.5rem + 1.5vw)' }}>
							Page not found
						</div>
					</div>
					<div className='col-12 d-flex flex-wrap align-items-baseline justify-content-center'>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={Humans} alt='Humans' style={{ height: '50vh' }} />
					</div>
					<div className='col-12 d-flex flex-wrap flex-column justify-content-center align-items-center'>
						<Button
							className='px-5 py-3'
							color='primary'
							isLight
							icon='HolidayVillage'
							tag='a'
							href='/overview'>
							Homepage
						</Button>
					</div>
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

export default Page404;
