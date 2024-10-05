import {createReducer} from '@reduxjs/toolkit'

import {creators} from '../actions/user'

export const user = createReducer({}, builder => {
	builder.addDefaultCase((state, action) => {
		console.log('Default case', action.type)
	})
})

export default user
