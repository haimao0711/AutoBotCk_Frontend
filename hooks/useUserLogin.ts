import AuthContext from '../context/authContext';

import { useContext } from 'react';

export default function useUserLogin() {
	const { userName, setUserName, email, setEmail } = useContext(AuthContext);

	return { userName, setUserName, email, setEmail };
}
