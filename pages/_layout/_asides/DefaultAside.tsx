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

				{asideStatus && doc && <div className='p-4'>Documentation</div>}
			</AsideBody>
			<AsideFoot>
				<User />
			</AsideFoot>
		</Aside>
	);
};
export default DefaultAside;
