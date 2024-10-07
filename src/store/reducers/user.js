import {createReducer} from '@reduxjs/toolkit'

import {creators} from '../actions/user'
import {User} from './../../models/user'

export const user = createReducer(
	{
		users: {
			data: [],
			waiting: false,
			error: null,
		},
		user: {
			data: null,
			waiting: false,
			error: null,
		},
		returnBook: {
			data: false,
			waiting: false,
			error: null,
		},
		borrowBook: {
			data: null,
			waiting: false,
			error: null,
		},
	},
	builder => {
		builder
			.addCase(creators.users.begin, (state, action) => {
				state.users.waiting = true
			})
			.addCase(creators.users.success, (state, action) => {
				console.log(action.payload)
				let data = action.payload.map(element => {
					const user = new User()
					user.decode(element)
					return user
				})
				state.users = {
					data: data,
					waiting: false,
					error: null,
				}
			})
			.addCase(creators.users.fail, (state, action) => {
				state.users = {
					data: state.users.data,
					waiting: false,
					error: action.error,
				}
			})

			.addCase(creators.user.begin, (state, action) => {
				state.user.waiting = true
			})
			.addCase(creators.user.success, (state, action) => {
				const user = new User()
				user.decode(action.payload)
				state.user = {
					data: user,
					waiting: false,
					error: null,
				}
			})
			.addCase(creators.user.fail, (state, action) => {
				state.user = {
					data: state.user.data,
					waiting: false,
					error: action.error,
				}
			})

			.addCase(creators.returnBook.begin, (state, action) => {
				state.returnBook.waiting = true
			})
			.addCase(creators.returnBook.success, (state, action) => {
				console.log(state.user.data)
				const booktoreturn = state.user.data.books.present.filter(element => element.id === action.metadata.bookId).at(0)
				booktoreturn.userscore = action.metadata.score
				state.user.data.books.present = state.user.data.books.present.filter(element => element.id !== action.metadata.bookId)
				state.user.data.books.past.push(booktoreturn)
				state.returnBook = {
					data: action.payload,
					waiting: false,
					error: null,
				}
			})
			.addCase(creators.returnBook.fail, (state, action) => {
				state.returnBook = {
					data: state.returnBook.data,
					waiting: false,
					error: action.error,
				}
			})

			.addCase(creators.borrowBook.begin, (state, action) => {
				state.borrowBook.waiting = true
			})
			.addCase(creators.borrowBook.success, (state, action) => {
				state.borrowBook = {
					data: action.payload,
					waiting: false,
					error: null,
				}
			})
			.addCase(creators.borrowBook.fail, (state, action) => {
				state.borrowBook = {
					data: state.borrowBook.data,
					waiting: false,
					error: action.error,
				}
			})
	}
)

export default user
