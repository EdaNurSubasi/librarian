import React, {useState, useEffect} from 'react'

const Context = React.createContext(null)
Context.displayName = 'ConfigContext'

const config = {
	language: 'tr',
	direction: 'ltr',
	theme: {
		mode: 'dark',
	},
}

const language = () => {
	return (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage
}

const Provider = ({children}) => {
	const [configState, setConfigState] = useState(config)

	const setLanguage = language => {
		setConfigState(prevState => ({
			...prevState,
			language,
		}))
	}

	const setTextDirection = direction => {
		setConfigState(prevState => ({
			...prevState,
			direction,
		}))
	}

	const setThemeMode = mode => {
		setConfigState(prevState => ({
			...prevState,
			theme: {...prevState.theme, mode},
		}))
	}

	useEffect(() => {
		const browserLanguage = language()
		if (browserLanguage) {
			setConfigState(prevState => ({
				...prevState,
				language: browserLanguage.split(/[-_]/)[0], // language without region code
			}))
		}
	}, [])

	return <Context.Provider value={{...configState, setLanguage, setTextDirection, setThemeMode}}>{children}</Context.Provider>
}

export {Context, Provider, config}
