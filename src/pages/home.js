import React from 'react'
import {makeStyles} from '@mui/styles'
import {useDispatch} from 'react-redux'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flex: 1,
		height: '100%',
		margin: 10,
	},
	content: {
		display: 'flex',
		flexDirection: 'row',
	},
	card: {
		width: 250,
		height: 100,
		margin: 5,
	},
}))

export const Page = () => {
	const classes = useStyles()

	const dispatch = useDispatch()

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<Card className={classes.card} variant="outlined">
					<CardActionArea href="/books">
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								Books
							</Typography>
							<Typography variant="body2" sx={{color: 'text.secondary'}}>
								List books of this library!
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>

				<Card className={classes.card} variant="outlined">
					<CardActionArea href="/users">
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								Users
							</Typography>
							<Typography variant="body2" sx={{color: 'text.secondary'}}>
								List users of this library!
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</div>
		</div>
	)
}
