import { useEffect, useState } from 'react';

const useLoading = () => {
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(() => isLoading);
	}, [isLoading]);

	return { isLoading, setLoading };
};

export default useLoading;
