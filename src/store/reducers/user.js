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
					data: action.payload,
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
	}
)

export default user
