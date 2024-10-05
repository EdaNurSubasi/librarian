import React, {useContext} from 'react'

import {createTheme, ThemeProvider as MuiThemeProvider} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import colors from './colors'
import {ConfigContext} from '../config'

const ThemeProvider = ({children}) => {
	const {direction, theme} = useContext(ConfigContext)
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	let mode = 'light'

	if (theme && theme.mode) {
		mode = theme.mode
	}

	if (prefersDarkMode) {
		mode = 'light'
	}

	const override = createTheme({
		direction: direction,
		palette: {
			...colors,
			type: mode,
		},
		props: {
			MuiTextField: {
				variant: 'outlined',
			},
			MuiButton: {
				variant: 'contained',
				disableElevation: true,
			},
			MuiCard: {
				variant: 'outlined',
			},
			MuiPaper: {
				variant: 'outlined',
			},
		},
		overrides: {
			MuiInput: {
				input: {
					'&::placeholder': {
						textOverflow: 'ellipsis !important',
						color: colors.grey2.main,
						fontSize: 15,
					},
					color: colors.primary.main, // if you also want to change the color of the input, this is the prop you'd use
					fontSize: 15,
				},
			},
			MuiButton: {
				root: {
					fontWeight: 'bold',
					fontSize: '1em',
					textTransform: 'none',
				},
			},
		},
	})

	return <MuiThemeProvider theme={override}>{children}</MuiThemeProvider>
}

export default ThemeProvider
