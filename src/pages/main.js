import {useState} from 'react'
import {useLocation, Outlet, useNavigate} from 'react-router-dom'

import {makeStyles, useTheme} from '@mui/styles'
import {CssBaseline, AppBar, Toolbar, IconButton, Divider, ListItemButton, List, ListItemText, Drawer, Typography} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItemIcon from '@mui/icons-material/ExitToApp'
import PeopleIcon from '@mui/icons-material/People'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import HomeIcon from '@mui/icons-material/Home'
import LanguageIcon from '@mui/icons-material/Language'

import {translate} from '../localization'
import {Config} from '../config'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flex: 1,
		overflow: 'auto',
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		flex: 0,
		justifyContent: 'flex-end',
	},
	content: {
		display: 'flex',
		flex: 1,
		marginTop: 64,
	},
	drawer: {
		minWidth: 250,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerHeader: {
		minWidth: 250,
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
}))

function Menu({theme, onLinkDidClick}) {
	const items = [
		{
			url: '/',
			key: 'home',
			icon: HomeIcon,
		},
		{
			type: 'divider',
		},
		{
			url: '/users',
			key: 'users',
			icon: PeopleIcon,
		},
		{
			type: 'divider',
		},
		{
			url: '/books',
			key: 'books',
			icon: MenuBookIcon,
		},
		{
			type: 'divider',
		},
	]
	const navigate = useNavigate()

	const path = useLocation().pathname

	const handleListItemClick = (e, path) => {
		navigate(path)
		onLinkDidClick()
	}

	return (
		<List>
			{items.map((i, index) => {
				if (i.type === 'divider') {
					return <Divider key={index} />
				}
				const current = i.url === path

				return (
					<ListItemButton key={i.key} selected={current} onClick={e => handleListItemClick(e, i.url)}>
						<ListItemIcon>
							<i.icon style={current ? {color: theme.palette.white.main} : {}} />
						</ListItemIcon>
						<ListItemText primary={translate.string(`menu.${i.key}`)} />
					</ListItemButton>
				)
			})}
		</List>
	)
}

export default function Page({children}) {
	const classes = useStyles()
	const navigate = useNavigate()

	const [open, setOpen] = useState(false)

	const theme = useTheme()

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const handleTitleClick = () => {
		navigate(`/`)
	}

	const handleLanguageClick = () => {
		const language = Config.language
		console.log('CONFIG WILL CHANGED... ' + language)
		const direction = Config.direction

		Config.language = language == 'tr' ? 'en' : 'tr'
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" sx={{paddingLeft: 2, cursor: 'pointer'}} onClick={handleDrawerOpen}>
						<MenuIcon />
					</IconButton>
					<Typography onClick={handleTitleClick} variant="h6" component="div" sx={{flexGrow: 1, paddingLeft: 2, cursor: 'pointer'}}>
						{translate.string('title').toUpperCase()}
					</Typography>
					<IconButton size="large" edge="start" color="inherit" sx={{mr: 2}} onClick={handleLanguageClick}>
						<LanguageIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer className={classes.drawer} variant="temporary" anchor={theme.direction === 'rtl' ? 'right' : 'left'} open={open}>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
				</div>
				<Divider />
				<Menu
					theme={theme}
					onLinkDidClick={() => {
						setOpen(false)
					}}
				/>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Outlet />
			</main>
		</div>
	)
}
