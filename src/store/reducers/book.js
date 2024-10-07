import {createReducer} from '@reduxjs/toolkit'
import {Book} from '../../models'
import {creators} from '../actions/book'

export const book = createReducer(
	{
		books: {
			data: [],
			waiting: false,
			error: null,
		},
		book: {
			data: null,
			waiting: false,
			error: null,
		},
		isAvailable: {
			data: false,
			waiting: false,
			error: null,
		},
	},
	builder => {
		builder
			.addCase(creators.books.begin, (state, action) => {
				state.books.waiting = true
			})
			.addCase(creators.books.success, (state, action) => {
				let data = action.payload.map(element => {
					const book = new Book()
					book.decode(element)
					return book
				})
				state.books = {
					data: data,
					waiting: false,
					error: null,
				}
			})
			.addCase(creators.books.fail, (state, action) => {
				state.books = {
					data: state.books.data,
					waiting: false,
					error: action.error,
				}
			})

			.addCase(creators.book.begin, (state, action) => {
				state.book.waiting = true
			})
			.addCase(creators.book.success, (state, action) => {
				const book = new Book()
				book.decode(action.payload)
				state.book = {
					data: book,
					waiting: false,
					error: null,
				}
			})
			.addCase(creators.book.fail, (state, action) => {
				state.book = {
					data: state.book.data,
					waiting: false,
					error: action.error,
				}
			})

			.addCase(creators.isAvailable.begin, (state, action) => {
				state.isAvailable.waiting = true
			})
			.addCase(creators.isAvailable.success, (state, action) => {
				state.isAvailable = {
					data: action.payload,
					waiting: false,
					error: null,
				}
			})
			.addCase(creators.isAvailable.fail, (state, action) => {
				state.isAvailable = {
					data: state.isAvailable.data,
					waiting: false,
					error: action.error,
				}
			})
	}
)
export default book
