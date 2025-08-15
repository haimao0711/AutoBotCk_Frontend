import React from 'react';
import Footer from '@layout/Footer/Footer';
import classNames from 'classnames';
import useDarkMode from '@hooks/useDarkMode';
import Popovers from '@components/bootstrap/Popovers';

const DefaultFooter = () => {
	const { darkModeStatus } = useDarkMode();

	return (
		<Footer>
			<div className='container-fluid'>
				<div className='row'></div>
			</div>
		</Footer>
	);
};

export default DefaultFooter;
