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
	}
)

export default user
