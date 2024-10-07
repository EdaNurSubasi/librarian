import React, {useEffect, useState} from 'react'
import {makeStyles} from '@mui/styles'
import {useDispatch, useSelector} from 'react-redux'

import {Grid, LinearProgress} from '@mui/material'
import {UserCard} from '../components'
import {UserActions} from '../store/actions'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flex: 1,
		height: '100%',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	content: {
		display: 'flex',
		flex: 1,
	},
	grid: {
		margin: 5,
	},
}))

export const Page = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const usersSelector = useSelector(state => state.user.users)
	const [users, setUsers] = useState([])

	useEffect(() => {
		setUsers(usersSelector.data)
	}, [usersSelector.data])

	useEffect(() => {
		dispatch(UserActions.users())
	}, [])

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				{!usersSelector.waiting ? (
					<Grid container className={classes.grid}>
						{users.map(user => (
							<Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
								<UserCard user={user} />
							</Grid>
						))}
					</Grid>
				) : (
					<LinearProgress />
				)}
			</div>
		</div>
	)
}
