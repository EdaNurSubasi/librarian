import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Rating, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'

import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {translate} from '../localization'
import {CartActions} from '../store/actions'

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

const BookCard = ({book}) => {
	const dispatch = useDispatch()

	const style = useStyles()
	const navigate = useNavigate()

	const handleDetailClick = () => {
		navigate(`${book.id}`)
	}

	return (
		<div className={style.container}>
			<Card className={style.card} elevation={4}>
				<CardActionArea onClick={handleDetailClick}>
					<CardMedia component="img" image={book?.image ? book.image : 'public/resources/images/profile.png'} />
					<CardContent>
						<Typography gutterBottom textAlign="center" variant="body1" component="div" noWrap textOverflow="ellipsis">
							{book.name}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</div>
	)
}

export default BookCard
