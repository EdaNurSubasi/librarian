import {Grid} from '@mui/material'
import UserCard from './user-card'

const UserList = ({users, classes, handleClick}) => {
	return (
		<Grid container className={classes.grid}>
			{users.map(user => (
				<Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
					<UserCard user={user} handleClick={handleClick} />
				</Grid>
			))}
		</Grid>
	)
}

export default UserList
