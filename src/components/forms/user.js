import {useForm, Controller} from 'react-hook-form'
import {makeStyles} from '@mui/styles'
import {TextField, Button, CircularProgress, Stack, Select, MenuItem, FormControl, InputLabel} from '@mui/material'
import Error from '../error'
import {translate} from '../../localization'
import {Roles} from '../../models/user'

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
	const {waiting, error, onClear, user} = props
	const classes = useStyles()

	const {
		control,
		handleSubmit,
		register,
		formState: {errors},
		watch,
	} = useForm({
		defaultValues: {
			id: user.id,
			name: user?.name,
			password: '',
			password_repeat: '',
			username: user?.username,
			email: user?.email,
			role: user.role ? user.role : Roles.user,
		},
	})
	const password = watch('password', '')
	const onSubmit = data => {
		const {onSubmit} = props
		user.decode(data)
		if (password) {
			user.password = password
		}
		onSubmit(user)
	}

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
					<Stack direction={'row'}>
						<Stack style={{margin: '30px', minWidth: '220px'}} direction={'column'} spacing={2}>
							<Controller
								render={({field: {onChange, value}}) => (
									<TextField
										label={`${translate.string('user.name')}`}
										value={value}
										onChange={onChange}
										{...register('name', {required: true})}
										fullWidth
									/>
								)}
								name={'name'}
								control={control}
								{...props}
							/>
							{errors.name?.type === 'required' && (
								<Error inline error={'required'} timeout={5000.0}>
									{translate.string('error.required')}
								</Error>
							)}
							<Controller
								render={({field: {onChange, value}}) => (
									<TextField
										{...register('email', {required: true})}
										label={translate.string('user.email')}
										value={value}
										onChange={onChange}
										fullWidth
										disabled={!!user.email}
									/>
								)}
								name={'email'}
								control={control}
								{...props}
							/>
							{errors.email?.type === 'required' && (
								<Error inline error={'required'} timeout={5000.0}>
									{translate.string('error.required')}
								</Error>
							)}
							<Controller
								render={({field: {onChange, value}}) => (
									<TextField
										{...register('username', {required: true})}
										label={translate.string('user.username')}
										value={value}
										onChange={onChange}
										disabled={!!user.username}
										fullWidth
									/>
								)}
								name={'username'}
								control={control}
								{...props}
							/>
							{errors.username?.type === 'required' && (
								<Error inline error={'required'} timeout={5000.0}>
									{translate.string('error.required')}
								</Error>
							)}
						</Stack>
						<Stack style={{margin: '30px', minWidth: '220px'}} direction={'column'} spacing={2}>
							<Controller
								render={({field: {onChange, value}}) => (
									<TextField
										{...register('password', {required: !user.id})}
										label={translate.string('user.password')}
										value={value}
										onChange={onChange}
										type="password"
										fullWidth
									/>
								)}
								name={'password'}
								control={control}
								{...props}
							/>
							{errors.password?.type === 'required' && (
								<Error inline error={'required'} timeout={5000.0}>
									{translate.string('error.required')}
								</Error>
							)}
							<Controller
								render={({field: {onChange, value}}) => (
									<TextField
										{...register('password_repeat', {
											validate: value => value === password || translate.string('error.password.match'),
										})}
										label={translate.string('user.password_repeat')}
										value={value}
										onChange={onChange}
										type="password"
										fullWidth
									/>
								)}
								name={'password_repeat'}
								control={control}
								{...props}
							/>

							{errors.password_repeat?.type === 'validate' && (
								<Error inline error={'required'} timeout={5000.0}>
									{errors.password_repeat.message}
								</Error>
							)}
							<FormControl fullWidth>
								<InputLabel>{translate.string('user.role')}</InputLabel>
								<Controller
									render={({field: {onChange, value}}) => (
										<Select
											{...register('role', {required: true})}
											value={value}
											label={translate.string('user.role')}
											onChange={onChange}>
											{Object.keys(Roles).map((k, i) => (
												<MenuItem key={i} value={k}>
													{translate.string(`user.roles.${k}`)}
												</MenuItem>
											))}
										</Select>
									)}
									name={'role'}
									control={control}
									{...props}
								/>
								{errors.role?.type === 'required' && (
									<Error inline error={'required'} timeout={5000.0}>
										{translate.string('error.required')}
									</Error>
								)}
							</FormControl>
						</Stack>
					</Stack>
					<Stack className={classes.container} direction={'row'} spacing={1}>
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
									{translate.string('generic.ok')}
								</Button>
							</Error>
						) : (
							<>
								{onClear && (
									<Button
										fullWidth
										disabled={waiting}
										variant={'outlined'}
										className={classes.submit}
										classes={{disabled: classes.disabled}}>
										{!waiting && <span>{translate.string('generic.close')}</span>}
										{waiting && <CircularProgress size={24} className={classes.progress} />}
									</Button>
								)}
								<Button
									type={'submit'}
									fullWidth
									disabled={waiting}
									variant={'contained'}
									className={classes.submit}
									classes={{disabled: classes.disabled}}>
									{!waiting && <span>{translate.string(`generic.${user.id ? 'update' : 'create'}`)}</span>}
									{waiting && <CircularProgress size={24} className={classes.progress} />}
								</Button>
							</>
						)}
					</Stack>
				</form>
			</div>
		</div>
	)
}

export default Form
