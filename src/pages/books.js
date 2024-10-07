import React, {useEffect, useState} from 'react'
import {makeStyles} from '@mui/styles'
import {useDispatch, useSelector} from 'react-redux'
import {BookCard} from '../components'
import {Grid} from '@mui/material'
import {BookActions} from '../store/actions'

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

	const bookSelector = useSelector(state => state.book.books)
	const [books, setBooks] = useState([])

	useEffect(() => {
		setBooks(bookSelector.data)
	}, [bookSelector.data])

	useEffect(() => {
		dispatch(BookActions.books())
	}, [])

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<Grid container className={classes.grid}>
					{books.map(book => (
						<Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
							<BookCard book={book} />
						</Grid>
					))}
				</Grid>
			</div>
		</div>
	)
}
