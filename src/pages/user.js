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
import {Avatar, Button, Grid, Stack, Typography} from '@mui/material'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {BookCard, UserCard} from '../components'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flex: 1,
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	content: {
		display: 'flex',
		flexDirection: 'row',
		flex: 1,
		height: '100%',
		margin: 6,
	},
	stackUser: {
		flex: 1,
		margin: 6,
		justifyContent: 'center',
		alignItems: 'center',
	},
	stackBook: {
		flex: 2,
		margin: 6,
	},
	present: {
		flex: 1,
		marginTop: 6,
		marginBottom: 6,
		overflow: 'auto',
	},
	past: {
		flex: 1,
		marginTop: 6,
		overflow: 'auto',
	},
}))

export const Page = () => {
	const navigate = useNavigate()

	const classes = useStyles()

	const dispatch = useDispatch()

	const {id} = useParams()

	const user = {
		id: 2,
		name: 'Enes Faruk Meniz',
		books: {
			past: [
				{
					name: 'I, Robot',
					score: 5,
				},
				{
					name: "The Hitchhiker's Guide to the Galaxy",
					score: 10,
				},
			],
			present: [
				{
					name: 'Brave New World',
				},
			],
		},
	}

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<Stack className={classes.stackUser} component={Paper} sx={{backgroundColor: 'aqua'}}>
					<Avatar alt={user.name} src={user.image ? user.image : 'public/resources/images/profile.png'} />

					<Typography gutterBottom textAlign="center" variant="h5" component="div" fontWeight="bold">
						{user.name}
					</Typography>
				</Stack>

				<Stack className={classes.stackBook}>
					<Paper elevation={5} sx={{backgroundColor: 'aqua'}}>
						<Typography gutterBottom textAlign="center" variant="h5" component="div" fontWeight="bold">
							Present
						</Typography>
					</Paper>
					<Stack className={classes.present} component={Paper}>
						<Grid container className={classes.grid}>
							{user.books.present.map(book => (
								<Grid item key={book.name} xs={12} sm={6} md={4} lg={3}>
									<BookCard book={book} showActions={true} showRating={false} />
								</Grid>
							))}
						</Grid>
					</Stack>
					<Paper elevation={5} sx={{backgroundColor: 'aqua'}}>
						<Typography gutterBottom textAlign="center" variant="h5" component="div" fontWeight="bold">
							Past
						</Typography>
					</Paper>
					<Stack className={classes.past} component={Paper}>
						<Grid container className={classes.grid}>
							{user.books.past.map(book => (
								<Grid item key={book.name} xs={12} sm={6} md={4} lg={3}>
									<BookCard book={book} showActions={false} showRating={true} />
								</Grid>
							))}
						</Grid>
					</Stack>
				</Stack>
			</div>
		</div>
	)
}
