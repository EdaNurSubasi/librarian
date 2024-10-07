import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Rating, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'

import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {translate} from '../localization'
import {CartActions, UserActions} from '../store/actions'
import {useEffect, useState} from 'react'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		margin: 5,
	},
	card: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		height: 120,
		maxWidth: '100%',
	},
}))

const UserBookCard = ({user, book, showActions, showRating, handleReturnBookClick}) => {
	const dispatch = useDispatch()

	const style = useStyles()
	const navigate = useNavigate()

	const [score, setScore] = useState(0)

	const handleRatingOnChange = (e, v) => {
		setScore(v)
	}

	const handleReturnClick = () => {
		handleReturnBookClick(user.id, book.id, {score: score})
	}

	return (
		<div className={style.container}>
			<Card className={style.card} elevation={4}>
				<CardMedia component="img" image={book?.image ? book.image : 'public/resources/images/profile.png'} />
				<CardContent>
					<Typography gutterBottom textAlign="center" variant="body1" component="div" noWrap textOverflow="ellipsis">
						{book.name}
					</Typography>
				</CardContent>
				{!showRating && <Rating onChange={handleRatingOnChange} value={score} max={10} />}

				{showActions && (
					<CardActions>
						<Button onClick={handleReturnClick}>Geri Ver</Button>
					</CardActions>
				)}

				{showRating && <Rating value={book.userscore} readOnly max={10} sx={{margin: 2}} />}
			</Card>
		</div>
	)
}

export default UserBookCard
