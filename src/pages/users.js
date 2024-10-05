import React from 'react'
import {makeStyles} from '@mui/styles'
import {useDispatch} from 'react-redux'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {Button, Grid} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {UserCard} from '../components'

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
	const navigate = useNavigate()
	const users = [
		{
			id: 2,
			name: 'Enes Faruk Meniz',
		},
		{
			id: 1,
			name: 'Eray Aslan',
		},
		{
			id: 4,
			name: 'Kadir Mutlu',
		},
		{
			id: 3,
			name: 'Sefa Eren Şahin',
		},
		{
			id: 5,
			name: 'Eda Nur Subasi',
		},
	]

	const columns = [
		{field: 'id', headerName: 'ID', flex: 1},
		{field: 'name', headerName: 'Name', flex: 1},
		{field: 'detail', headerName: 'Detail', flex: 1},
	]
	const classes = useStyles()

	const dispatch = useDispatch()
	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<Grid container className={classes.grid}>
					{users.map(user => (
						<Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
							<UserCard user={user} />
						</Grid>
					))}
				</Grid>
			</div>
		</div>
	)
}
