import React, { useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { authPagesMenu } from '../../menu';
import useDarkMode from '@hooks/useDarkMode';
import Collapse from '@components/bootstrap/Collapse';
import { NavigationLine } from '../Navigation/Navigation';
import Icon from '@components/icon/Icon';
import useNavigationItemHandle from '@hooks/useNavigationItemHandle';
import AuthContext from '../../context/authContext';

import { useRouter } from 'next/router';
import Popovers from '@components/bootstrap/Popovers';
import { authService } from '@services/index';
import Image from 'next/image';

const User = () => {
	const router = useRouter();

	const handleItem = useNavigationItemHandle();
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();
	const { setIsLogin } = useContext(AuthContext);
	const [collapseStatus, setCollapseStatus] = useState<boolean>(false);

	const { t } = useTranslation(['translation', 'menu']);

	return (
		<>
			<Collapse isOpen={true} className='user-menu'>
				<nav aria-label='aside-bottom-user-menu'>
					<div className='navigation'>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() => {
								setDarkModeStatus(!darkModeStatus);
								handleItem();
							}}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon
										icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
										color={darkModeStatus ? 'info' : 'warning'}
										className='navigation-icon'
									/>
									<span className='navigation-text'>
										{darkModeStatus ? t('DarkMode') : t('LightMode')}
									</span>
								</span>
							</span>
						</div>
					</div>
				</nav>
				<NavigationLine />
				<nav aria-label='aside-bottom-user-menu-2'>
					<div className='navigation'>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() => {
								authService.logout();
								setIsLogin('false');
								window.location.href = `/${authPagesMenu.login.path}`;
								return false;
							}}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon icon='Logout' className='navigation-icon' />
									<span className='navigation-text'>{t('Logout')}</span>
								</span>
							</span>
						</div>
					</div>
				</nav>
			</Collapse>
		</>
	);
};

export default User;
