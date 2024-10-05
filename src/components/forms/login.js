import * as React from 'react'
import {useForm, Controller} from 'react-hook-form'
import {makeStyles} from '@mui/styles'
import PropTypes from 'prop-types'
import {TextField, Button, Box, CircularProgress} from '@mui/material'

import Error from '../error'
import {translate} from '../../localization'

const useStyles = makeStyles(theme => ({
	container: {},
	content: {
		display: 'flex',
		flexDirection: 'column',

		padding: theme.spacing(2),
	},
	form: {
		flex: 1,
	},
	submit: {
		flex: 1,
		height: 40,
	},
	progress: {
		color: theme.palette.primary.main,
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	bottom: {
		display: 'flex',
		flex: 0,
		marginTop: theme.spacing(2),
	},
}))

function Form(props) {
	const {control, handleSubmit} = useForm()
	const {waiting, error, onClear} = props

	const classes = useStyles()

	const onSubmit = data => {
		const {onSubmit} = props
		onSubmit(data)
	}

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
					<Box mb={2}>
						<Controller
							render={({field: {onChange, value}}) => (
								<TextField
									defaultValue=""
									label={`${translate.string('generic.username')} / ${translate.string('generic.email')}`}
									value={value}
									onChange={onChange}
									fullWidth={true}
								/>
							)}
							name={'token'}
							control={control}
							{...props}
						/>
						{/*<Controller*/}
						{/*    name={"token"}*/}
						{/*    control={control}*/}
						{/*    defaultValue=""*/}
						{/*    render={(props) => (*/}
						{/*        <PhoneInput onChange={(value)=> {*/}
						{/*            props.onChange(value)*/}
						{/*        }}/>*/}
						{/*    )}*/}
						{/*    label={`${translate.string("generic.phone")}`}*/}
						{/*    fullWidth={true}*/}
						{/*    {...props}*/}
						{/*/>*/}
					</Box>

					<Controller
						render={({field: {onChange, value}}) => (
							<TextField
								defaultValue=""
								label={translate.string('generic.password')}
								value={value}
								onChange={onChange}
								fullWidth={true}
								type={'password'}
							/>
						)}
						name={'password'}
						control={control}
						{...props}
					/>

					<div className={classes.bottom}>
						{error ? (
							<Error
								inline
								error={error}
								style={{container: {justifyContent: 'space-between'}}}
								timeout={5000.0}
								onHide={() => {
									onClear && onClear()
								}}>
								<Button
									onClick={() => {
										onClear && onClear()
									}}>
									OK
								</Button>
							</Error>
						) : (
							<Button
								type={'submit'}
								fullWidth
								disabled={waiting}
								color={'primary'}
								className={classes.submit}
								classes={{disabled: classes.disabled}}>
								{!waiting && <span>{translate.string('generic.sign-in')}</span>}
								{waiting && <CircularProgress size={24} className={classes.progress} />}
							</Button>
						)}
					</div>
				</form>
			</div>
		</div>
	)
}

Form.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	waiting: PropTypes.bool.isRequired,
	error: PropTypes.object.isRequired,
}

export default Form
