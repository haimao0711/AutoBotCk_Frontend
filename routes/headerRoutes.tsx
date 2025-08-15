import React from 'react';
import { dashboardPagesMenu, authPagesMenu, pageLayoutTypesPagesMenu } from '../menu';
import DashboardHeader from '../pages/_layout/_headers/DashboardHeader';
import DefaultHeader from '../pages/_layout/_headers/DefaultHeader';

const headers = [
	{ path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlySubheader.path, element: null },
	{ path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlyContent.path, element: null },
	{ path: pageLayoutTypesPagesMenu.blank.path, element: null },
	{ path: authPagesMenu.login.path, element: null },
	{ path: authPagesMenu.signUp.path, element: null },
	{ path: authPagesMenu.page404.path, element: null },
	// { path: dashboardPagesMenu.dashboard.path, element: <DashboardHeader /> },
	{
		path: `/*`,
		element: <DashboardHeader />,
	},
];

export default headers;
