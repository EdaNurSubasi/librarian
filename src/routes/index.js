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
				<Route path="/" element={<MainPage />}></Route>
				<Route path="/empty" element={<EmptyPage />}></Route>
			</Routes>
		</div>
	)
}
