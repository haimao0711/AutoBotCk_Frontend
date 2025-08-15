export const dashboardPagesMenu = {
	overview: {
		id: 'overview',
		text: 'Overview',
		path: 'overview',
		icon: 'Dashboard',
		subMenu: null,
	},
	// feeAndRule: {
	// 	id: 'feeAndRule',
	// 	text: 'Cài đặt cấu hình',
	// 	path: 'create-config',
	// 	icon: 'Assignment',
	// 	subMenu: null,
	// },
	// bot: {
	// 	id: 'bot',
	// 	text: 'Quản lí bot',
	// 	path: 'manager-bot',
	// 	icon: 'DesktopMac',
	// 	subMenu: null,
	// },
	user: {
		id: 'user',
		text: 'Quản lí cấu hình',
		path: 'manager-config',
		icon: 'AccountBalanceWallet',
		subMenu: null,
	},
	// transactions: {
	// 	id: 'transactions',
	// 	text: 'Quản lí giao dịch',
	// 	path: 'transactions',
	// 	icon: 'MonetizationOn',
	// 	subMenu: null,
	// },

	// account: {
	// 	id: 'account',
	// 	text: 'Quản lí tài khoản',
	// 	path: 'account',
	// 	icon: 'Person',
	// 	subMenu: null,
	// },
	// templateMail: {
	// 	id: 'template-mail',
	// 	text: 'Quản lí Template mail',
	// 	path: 'template-mail',
	// 	icon: 'Email',
	// 	subMenu: null,
	// },
	// liquidity: {
	// 	id: 'liquidity',
	// 	text: 'Quản lí LP',
	// 	path: 'liquidity',
	// 	icon: 'AccountBalanceWallet',
	// 	subMenu: null,
	// },
};

export const authPagesMenu = {
	auth: {
		id: 'auth',
		text: 'Auth Pages',
		icon: 'Extension',
	},
	login: {
		id: 'login',
		text: 'Login',
		path: 'auth/login',
		icon: 'Login',
	},
	signUp: {
		id: 'signUp',
		text: 'Sign Up',
		path: 'auth/sign-up',
		icon: 'PersonAdd',
	},
	page404: {
		id: 'Page404',
		text: '404 Page',
		path: '404',
		icon: 'ReportGmailerrorred',
	},
};

export const pageLayoutTypesPagesMenu = {
	layoutTypes: {
		id: 'layoutTypes',
		text: 'Page Layout Types',
	},
	blank: {
		id: 'blank',
		text: 'Blank',
		path: 'page-layouts/blank',
		icon: 'check_box_outline_blank ',
	},
	pageLayout: {
		id: 'pageLayout',
		text: 'Page Layout',
		path: 'page-layouts',
		icon: 'BackupTable',
		subMenu: {
			headerAndSubheader: {
				id: 'headerAndSubheader',
				text: 'Header & Subheader',
				path: 'page-layouts/header-and-subheader',
				icon: 'ViewAgenda',
			},
			onlyHeader: {
				id: 'onlyHeader',
				text: 'Only Header',
				path: 'page-layouts/only-header',
				icon: 'ViewStream',
			},
			onlySubheader: {
				id: 'onlySubheader',
				text: 'Only Subheader',
				path: 'page-layouts/only-subheader',
				icon: 'ViewStream',
			},
			onlyContent: {
				id: 'onlyContent',
				text: 'Only Content',
				path: 'page-layouts/only-content',
				icon: 'WebAsset',
			},
		},
	},
	asideTypes: {
		id: 'asideTypes',
		text: 'Aside Types',
		path: 'aside-types',
		icon: 'Vertical Split',
		subMenu: {
			defaultAside: {
				id: 'defaultAside',
				text: 'Default Aside',
				path: 'aside-types/default-aside',
				icon: 'ViewQuilt',
			},
			minimizeAside: {
				id: 'minimizeAside',
				text: 'Minimize Aside',
				path: 'aside-types/minimize-aside',
				icon: 'View Compact',
			},
		},
	},
};
