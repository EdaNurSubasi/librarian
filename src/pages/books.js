import React from 'react'
import {makeStyles} from '@mui/styles'
import {useDispatch} from 'react-redux'
import {BookCard} from '../components'
import {Grid} from '@mui/material'

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
	const books = [
		{
			id: 4,
			name: '1984',
		},
		{
			id: 5,
			name: 'Brave New World',
		},
		{
			id: 3,
			name: 'Dune',
		},
		{
			id: 2,
			name: 'I, Robot',
		},
		{
			id: 1,
			name: "The Hitchhiker's Guide to the Galaxy",
		},
	]

	const classes = useStyles()

	const dispatch = useDispatch()

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
