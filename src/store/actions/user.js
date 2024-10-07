import {createRequestActionCreators} from './utils'

import {REQUEST, METHOD} from '../middlewares/request'

export const creators = {
	users: createRequestActionCreators('users'),
	user: createRequestActionCreators('users/:id'),
}

export const actions = {
	users: () => dispatch => {
		dispatch(creators.users.begin())
		dispatch({
			[REQUEST]: {
				types: [creators.users.success(), creators.users.fail()],
				endpoint: `users`,
				method: METHOD.get,
			},
		})
	},
	user: id => dispatch => {
		dispatch(creators.user.begin())

		dispatch({
			[REQUEST]: {
				types: [creators.user.success(), creators.user.fail()],
				endpoint: `users/${id}`,
				method: METHOD.get,
			},
		})
	},
}
