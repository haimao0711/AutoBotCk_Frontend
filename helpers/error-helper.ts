import axios from 'axios';
import authService from '@services/auth.services';
import { StatusCode } from '@constants/index';

const errorMapper = (e: any) => {
	if (e?.errors && Array.isArray(e?.errors)) {
		switch (e.errors[0]) {
			case 'VERIFY.CODE_2FA_NOT_MATCH':
				e.message = 'Two FA code is wrong, please try again';
		}
	}

	return e;
};

const errorHelper = {
	errorMapper,
};

export default errorHelper;
