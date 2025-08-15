import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Brand from '@layout/Brand/Brand';
import Navigation, { NavigationLine } from '@layout/Navigation/Navigation';
import User from '@layout/User/User';
import { dashboardPagesMenu, authPagesMenu, pageLayoutTypesPagesMenu } from '../../../menu';
import ThemeContext from '../../../context/themeContext';
import Icon from '@components/icon/Icon';
import useDarkMode from '@hooks/useDarkMode';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Aside, { AsideBody, AsideFoot, AsideHead } from '@layout/Aside/Aside';
import Popovers from '@components/bootstrap/Popovers';

const DefaultAside = () => {
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);

	const [doc, setDoc] = useState(
		(typeof window !== 'undefined' &&
			localStorage.getItem('facit_asideDocStatus') === 'true') ||
			false,
	);

	const { t } = useTranslation(['common', 'menu']);

	const { darkModeStatus } = useDarkMode();

	return (
		<Aside>
			<AsideHead>
				<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
			</AsideHead>
			<AsideBody>
				<Navigation menu={dashboardPagesMenu} id='aside-dashboard' />
				{/* <NavigationLine />
				{!doc && (
					<>
						<Navigation menu={authPagesMenu} id='aside-demo-pages' />
						<NavigationLine />
						<Navigation menu={pageLayoutTypesPagesMenu} id='aside-menu' />
						<NavigationLine />
						<nav>
							<div className='navigation'>
								<div className='navigation-item'>
									<span className='navigation-link navigation-link-pill'>
										<span className='navigation-link-info'>
											<span className='navigation-text'>
												<Popovers
													title='DefaultAside.tsx'
													desc={
														<code>
															pages/_layout/_asides/DefaultAside.tsx
														</code>
													}>
													Aside
												</Popovers>
												<code className='ps-3'>DefaultAside.tsx</code>
											</span>
										</span>
									</span>
								</div>
							</div>
						</nav>
					</>
				)} */}

				{asideStatus && doc && <div className='p-4'>Documentation</div>}
			</AsideBody>
			<AsideFoot>
				<User />
			</AsideFoot>
		</Aside>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default DefaultAside;
