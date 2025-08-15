import React from 'react';
import { authPagesMenu, pageLayoutTypesPagesMenu } from '../menu';
import DefaultFooter from '../pages/_layout/_footers/DefaultFooter';

const footers = [
	{ path: pageLayoutTypesPagesMenu.blank.path, element: null, exact: true },
	{ path: authPagesMenu.login.path, element: null, exact: true },
	{ path: authPagesMenu.signUp.path, element: null, exact: true },
	{ path: authPagesMenu.page404.path, element: null, exact: true },
	{ path: '/*', element: <DefaultFooter />, exact: true },
];

export default footers;
