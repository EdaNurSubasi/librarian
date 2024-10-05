import React from 'react'
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {IconButton} from '@mui/material'
import RetryIcon from '@mui/icons-material/Replay'

import {MainPage, HomePage, UsersPage, BooksPage, UserPage, BookPage} from '../pages'
import {Dialog, Error} from '../components'

export default RouteStack => {
	const dispatch = useDispatch()
	const path = useLocation().pathname

	return (
		<div style={{display: 'flex', flex: 1, flexDirection: 'column', height: '100vh'}}>
			<Routes>
				<Route path="/" element={<MainPage />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/users" element={<UsersPage />} />
					<Route path="/users/:id" element={<UserPage />} />
					<Route path="/books" element={<BooksPage />} />
					<Route path="/books/:id" element={<BookPage />} />
				</Route>
			</Routes>
		</div>
	)
}
