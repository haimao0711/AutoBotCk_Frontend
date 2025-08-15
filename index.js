const data = {
	use_min_vnindex_buy: false,
	use_max_vnindex_buy: false,
	min_vnindex_buy_necessary_condition: true,
	min_vnindex_buy_sufficient_condition: true,
	max_vnindex_buy_necessary_condition: true,
	max_vnindex_buy_sufficient_condition: true,
};

const convertDataToObject = (data) => {
	const resultObject = {};

	for (const param in data) {
		if (param.includes('_necessary_condition')) {
			const paramName = param.split('_necessary_condition')[0];
			resultObject[paramName] = {
				prerequisites: data[param],
				eligible: false,
			};
		}
		if (param.includes('_sufficient_condition')) {
			const paramName = param.split('_sufficient_condition')[0];
			resultObject[paramName] = {
				prerequisites: resultObject[paramName].prerequisites,
				eligible: data[param],
			};
		}
	}

	return resultObject;
};

const resultObject = convertDataToObject(data);
