import React from 'react'
import {makeStyles} from '@mui/styles'
import {useDispatch} from 'react-redux'

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
		flexDirection: 'column',
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: theme.spacing(2),
	},
}))

export const Page = () => {
	const classes = useStyles()

	const dispatch = useDispatch()

	return (
		<div className={classes.container}>
			<div className={classes.content}>Users</div>
		</div>
	)
}
