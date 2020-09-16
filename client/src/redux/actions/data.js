import {API_START} from './types';

export const getOrganizations = () => {
	return {
		type: API_START,
		payload: {
			verb: 'fetch',
			domain: 'organizations'
		}
	};
};
