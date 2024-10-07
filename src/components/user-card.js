import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@mui/material'
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
		flexDirection: 'row',
	},
	card: {
		display: 'flex',
		flex: 1,
	},
	image: {
		height: 120,
		maxWidth: '100%',
	},
	info: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
}))

const UserCard = ({user, handleClick}) => {
	const dispatch = useDispatch()

	const style = useStyles()
	const handleDetailClick = () => {
		handleClick(user.id)
	}
	return (
		<div className={style.container}>
			<Card className={style.card} elevation={4}>
				<CardActionArea onClick={handleDetailClick}>
					<CardMedia component="img" image={user?.image ? user.image : 'public/resources/images/profile.png'} />
					<CardContent>
						<Typography gutterBottom textAlign="center" variant="h6" component="div">
							{user.name}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</div>
	)
}

export default UserCard
