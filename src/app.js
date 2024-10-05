import React from 'react'
//import CssBaseline from "@material-ui/core/CssBaseline"
import ThemeProvider from './theme/provider'
import {BrowserRouter} from 'react-router-dom'

import {ConfigProvider} from './config'
import {LocalizationProvider} from './localization'

import RouteStack from './routes'

function App() {
	return (
		<ConfigProvider>
			<LocalizationProvider>
				<BrowserRouter>
					<ThemeProvider>
						<RouteStack />
					</ThemeProvider>
				</BrowserRouter>
			</LocalizationProvider>
		</ConfigProvider>
	)
}

export default App
