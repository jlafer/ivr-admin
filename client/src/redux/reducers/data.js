import {API_START, API_SUCCESS, API_FAILURE} from '../actions/types';

const defaultDomain = {
	items: [],
	isLoading: false,
	errorMessage: ''
};

const defaultState = {
	organizations: defaultDomain
};

const newItems = (oldItems, actionPayload) => {
	const {verb, data} = actionPayload;
	switch (verb) {
		case 'fetch':
		case 'fetchOne':
			return data;
		case 'add':
			return [...oldItems, data];
		case 'patch':
		case 'update':
			const sid = data.sid;
			console.assert(sid, 'newItems: sid missing from payload.data');
			return oldItems.map(
				item => (item.sid === sid) ? data : item
			);
		default:
			console.error(`data.newItems: passed invalid verb ${verb}`);
			return oldItems;
	}
};

export default function reducer(state = defaultState, action) {
	if (! ['API_START', 'API_SUCCESS', 'API_FAILURE'].includes(action.type))
		return state;
	const domainName = action.payload.domain;
	switch (action.type) {
		case API_START:
			return {
				...state,
				[domainName]: {
					...state[domainName],
					isLoading: true,
					errorMessage: ''
				}
			};
		case API_SUCCESS:
			const newDomain = {
				...state[domainName],
				items: newItems(state[domainName].items, action.payload),
				isLoading: false,
				errorMessage: ''
			};
			const newState = {...state, [domainName]: newDomain};
			console.log(`API_SUCCESS: for ${action.payload.verb} of ${domainName}: `, newDomain);
			return newState;
		case API_FAILURE:
			console.error('API_FAILURE: ', action.payload.error);
			return state;
		default:
			return state;
		}
}
