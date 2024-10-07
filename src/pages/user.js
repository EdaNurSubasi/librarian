import React, {useState, useEffect} from 'react'
import {makeStyles} from '@mui/styles'
import {useDispatch, useSelector} from 'react-redux'

import Paper from '@mui/material/Paper'
import {Avatar, Grid, LinearProgress, Stack, Typography} from '@mui/material'
import {useNavigate, useParams} from 'react-router-dom'
import {UserBookCard} from '../components'
import {UserActions} from '../store/actions'
import {User} from '../models'

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
		margin: 100,
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
	const userSelector = useSelector(state => state.user.user)
	useEffect(() => {
		console.log('USER USE EFFECT WORKS... ID: ' + id)
		dispatch(UserActions.user(id))
	}, [id])

	const [user, setUser] = useState(null)

	useEffect(() => {
		console.log(userSelector.data)
		setUser(userSelector.data)
	}, [userSelector.data])

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				{user && !userSelector.waiting ? (
					<>
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
									{user.books &&
										user.books.present &&
										user.books.present.map(book => (
											<Grid item key={book.name} xs={12} sm={6} md={4} lg={3}>
												<UserBookCard book={book} showActions={true} showRating={false} />
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
									{user.books &&
										user.books.past &&
										user.books.past.map(book => (
											<Grid item key={book.name} xs={12} sm={6} md={4} lg={3}>
												<UserBookCard book={book} showActions={false} showRating={true} />
											</Grid>
										))}
								</Grid>
							</Stack>
						</Stack>
					</>
				) : (
					<>
						<LinearProgress />
					</>
				)}
			</div>
		</div>
	)
}
