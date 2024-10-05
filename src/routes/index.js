import React from 'react'
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {IconButton} from '@mui/material'
import RetryIcon from '@mui/icons-material/Replay'

import {MainPage, EmptyPage} from '../pages'
import {Dialog, Error} from '../components'

export default RouteStack => {
	const dispatch = useDispatch()
	const path = useLocation().pathname

	return (
		<div style={{display: 'flex', flex: 1, flexDirection: 'column', height: '100vh'}}>
			<Routes>
				<Route path="/" element={<MainPage />}>
					<Route path="/users" element={<EmptyPage />}></Route>
					<Route path="/books" element={<EmptyPage />}></Route>
				</Route>
			</Routes>
		</div>
	)
}
