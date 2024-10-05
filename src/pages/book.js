import React from 'react'
import {makeStyles} from '@mui/styles'
import {useDispatch} from 'react-redux'

import {Avatar, Button, Grid, Paper, Rating, Skeleton, Stack, Typography} from '@mui/material'
import {useNavigate, useParams} from 'react-router-dom'

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
		padding: 10,
	},
	stackImage: {
		flex: 1,
		margin: 6,
		justifyContent: 'center',
		alignItems: 'center',
	},
	stackBook: {
		flex: 2,
		margin: 6,
	},
	stackBookInfo: {
		flex: 1,
		marginTop: 6,
		justifyContent: 'center',
		alignItems: 'center',
	},
}))

export const Page = () => {
	const navigate = useNavigate()

	const classes = useStyles()

	const dispatch = useDispatch()

	const {id} = useParams()

	const book = {
		id: 2,
		name: 'I, Robot',
		score: '5.33',
	}

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<Stack className={classes.stackImage} component={Paper} sx={{backgroundColor: 'aqua'}}>
					<img alt={book.name} loading="lazy" src={book.image ? book.image : 'public/resources/images/profile.png'} />
				</Stack>

				<Stack className={classes.stackBook}>
					<Paper elevation={5} sx={{backgroundColor: 'aqua'}}>
						<Typography gutterBottom textAlign="center" variant="h3" component="div" fontWeight="bold">
							{book.name}
						</Typography>
					</Paper>
					<Stack className={classes.stackBookInfo} component={Paper} sx={{backgroundColor: 'aqua'}}>
						<Skeleton width={500} />
						<Rating value={book.score} readOnly max={10} sx={{margin: 2}} />
						<Skeleton animation="wave" width={500} />
						<Skeleton animation={false} width={500} />
						<Button variant="contained">LEND TO USER</Button>
					</Stack>
				</Stack>
			</div>
		</div>
	)
}
