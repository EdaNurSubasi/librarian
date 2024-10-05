import {createRequestActionCreators} from './utils'

import {REQUEST, METHOD} from '../middlewares/request'
import {createAction} from '@reduxjs/toolkit'

export const creators = {
	clear: {
		error: createAction(`user/error/clear`),
		data: {
			registered: createAction(`user/data/registered/clear`),
		},
	},
}

export const actions = {}
