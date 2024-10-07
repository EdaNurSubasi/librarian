import {createRequestActionCreators} from './utils'

import {REQUEST, METHOD} from '../middlewares/request'

export const creators = {
	users: createRequestActionCreators('users'),
	user: createRequestActionCreators('users/:id'),
	returnBook: createRequestActionCreators('users/:userId/return/:bookId'),
	borrowBook: createRequestActionCreators('users/:userId/borrow/:bookId'),
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
	returnBook: (userId, bookId, score) => dispatch => {
		dispatch(creators.returnBook.begin())

		dispatch({
			[REQUEST]: {
				types: [creators.returnBook.success(), creators.returnBook.fail()],
				endpoint: `users/${userId}/return/${bookId}`,
				method: METHOD.post,
				data: score,
				metadata: {bookId: bookId, score: score.score},
			},
		})
	},
	borrowBook: (userId, bookId) => dispatch => {
		dispatch(creators.borrowBook.begin())

		dispatch({
			[REQUEST]: {
				types: [creators.borrowBook.success(), creators.borrowBook.fail()],
				endpoint: `users/${userId}/borrow/${bookId}`,
				method: METHOD.post,
			},
		})
	},
}
