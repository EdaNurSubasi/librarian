import {METHOD, REQUEST} from '../middlewares/request'
import {createRequestActionCreators} from './utils'

export const creators = {
	books: createRequestActionCreators('books'),
	book: createRequestActionCreators('books/:id'),
	isAvailable: createRequestActionCreators('books/:id/available'),
}

export const actions = {
	books: () => dispatch => {
		dispatch(creators.books.begin())
		dispatch({
			[REQUEST]: {
				types: [creators.books.success(), creators.books.fail()],
				endpoint: `books`,
				method: METHOD.get,
			},
		})
	},
	book: id => dispatch => {
		dispatch(creators.book.begin())

		dispatch({
			[REQUEST]: {
				types: [creators.book.success(), creators.book.fail()],
				endpoint: `books/${id}`,
				method: METHOD.get,
			},
		})
	},
	isAvailable: id => dispatch => {
		dispatch(creators.isAvailable.begin())

		dispatch({
			[REQUEST]: {
				types: [creators.isAvailable.success(), creators.isAvailable.fail()],
				endpoint: `books/${id}/available`,
				method: METHOD.get,
			},
		})
	},
}
