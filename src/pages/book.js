import React, {useEffect, useState} from 'react'
import {makeStyles} from '@mui/styles'
import {useDispatch, useSelector} from 'react-redux'

import {Avatar, Button, Grid, LinearProgress, Paper, Rating, Skeleton, Stack, Typography} from '@mui/material'
import {useNavigate, useParams} from 'react-router-dom'
import {BookActions, UserActions} from '../store/actions'
import {Dialog, UserList} from '../components'
import {UsersPage} from '.'
import {translate} from '../localization'

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
	const classes = useStyles()
	const dispatch = useDispatch()
	const {id} = useParams()

	const usersSelector = useSelector(state => state.user.users)
	const borrowBookSelector = useSelector(state => state.user.borrowBook)
	const bookSelector = useSelector(state => state.book.book)
	const bookIsAvailableSelector = useSelector(state => state.book.isAvailable)

	const [book, setBook] = useState(null)
	const [isAvailable, setIsAvailable] = useState(false)
	const [open, setOpen] = React.useState(false)

	const handleOnClick = () => {
		setOpen(true)
	}
	const handleOnClose = () => {
		setOpen(false)
	}

	const handleClick = userId => {
		dispatch(UserActions.borrowBook(userId, book.id))
		setOpen(false)
	}

	useEffect(() => {
		if (borrowBookSelector.data) {
			setIsAvailable(!borrowBookSelector.data.stillpresent)
		}
	}, [borrowBookSelector.data])

	useEffect(() => {
		dispatch(BookActions.book(id))
		dispatch(BookActions.isAvailable(id))
		dispatch(UserActions.users())
	}, [id])

	useEffect(() => {
		setBook(bookSelector.data)
	}, [bookSelector.data])

	useEffect(() => {
		console.log(bookIsAvailableSelector.data)
		setIsAvailable(bookIsAvailableSelector.data)
	}, [bookIsAvailableSelector.data])

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				{!bookSelector.waiting ? (
					book ? (
						<>
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
									<Typography gutterBottom textAlign="center" variant="h6" component="div" fontWeight="bold">
										{book.writername}
									</Typography>
									<Typography gutterBottom textAlign="center" variant="h6" component="div" fontWeight="bold">
										{book.publisheddate.toLocaleDateString()}
									</Typography>

									<Rating value={book.score} readOnly max={10} sx={{margin: 2}} />
									<Button variant="contained" disabled={!isAvailable} onClick={handleOnClick}>
										{translate.string('book.lend')}
									</Button>
									{!isAvailable && (
										<Typography gutterBottom textAlign="center" variant="subtitle2" component="div" fontWeight="bold">
											{translate.string('book.not.available')}
										</Typography>
									)}
								</Stack>
							</Stack>
							<Dialog
								open={open}
								content={<UserList users={usersSelector.data} classes={classes} handleClick={handleClick} />}
								title={'User Selection'}
								onClose={handleOnClose}></Dialog>
						</>
					) : (
						<Typography gutterBottom textAlign="center" variant="h5" component="div" fontWeight="bold">
							{translate.string('generic.not.found')}
						</Typography>
					)
				) : (
					<LinearProgress />
				)}
			</div>
		</div>
	)
}
