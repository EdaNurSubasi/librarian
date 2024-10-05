import axios from 'axios'

import Security from '../../utils/security'
import {GenericError} from '../../models'

const config = {
	host: process.env.REACT_APP_API_URL,
	path: process.env.REACT_APP_SERVICE_PATH ? `${process.env.REACT_APP_SERVICE_PATH}/` : '',
	development: process.env.REACT_APP_DEVELOPMENT === 'true',
}

const client = axios.create({
	baseURL: config.host,
	responseType: 'json',
})

export const REQUEST = 'Request'
export const METHOD = {
	post: 'post',
	get: 'get',
	put: 'put',
	delete: 'delete',
	options: 'options',
}

const request = (endpoint, method, data, metadata, headers) => {
	let ch = {}

	return client
		.request({
			method: method,
			url: `${config.path}${endpoint}`,
			withCredentials: true,
			responseType: 'json',
			data: data,
			headers: {
				...ch,
				...headers,
			},
			timeout: 30000,
		})
		.then(response => {
			const payload = response.data

			if (config.development) {
				return new Promise(resolve =>
					setTimeout(() => {
						console.log(
							`${method.toUpperCase()} request to ${response.request.responseURL} with data ${JSON.stringify(
								data
							)} has been completed with ${response.status}`
						)

						resolve({
							payload: payload,
							headers: response.headers,
							metadata: metadata,
						})
					}, 2000)
				)
			}

			return {payload: payload, headers: response.headers, metadata: metadata}
		})
		.catch(error => {
			console.warn(`${method.toUpperCase()} request to ${endpoint} with data ${JSON.stringify(data)} failed with error ${error}`)
			if (config.development) {
				return new Promise(resolve =>
					setTimeout(() => {
						resolve(
							Promise.reject({
								error: GenericError.http(error),
								metadata: metadata,
							})
						)
					}, 2000)
				)
			}

			return Promise.reject({
				error: GenericError.http(error),
				metadata: metadata,
			})
		})
}

export default store => next => async action => {
	const ra = action[REQUEST]
	if (typeof ra === 'undefined') {
		return next(action)
	}

	const {types} = ra

	let {endpoint} = ra
	let {method} = ra
	let {data} = ra
	let {model} = ra
	let {metadata} = ra
	let {headers} = ra

	console.log(`Requesting ${method} ${config.host}/${endpoint} with data ${JSON.stringify(data)}`)

	if (!METHOD.hasOwnProperty(method)) {
		throw new Error(`Method ${method} is not supported.`)
	}

	if (typeof endpoint === 'function') {
		endpoint = endpoint(store.getState())
	}

	if (typeof endpoint !== 'string') {
		throw new Error('Specify a string endpoint URL.')
	}

	const actionWith = data => {
		const fa = Object.assign({}, action, data)
		delete fa[REQUEST]
		return fa
	}

	const [st, ft] = types //Request Type, Success Type, Failure Type

	return request(endpoint, method, data, metadata, headers).then(
		response =>
			next(
				actionWith({
					type: st.type,
					model: model,
					payload: response.payload,
					metadata: response.metadata,
					headers: response.headers,
				})
			),
		error =>
			next(
				actionWith({
					type: ft.type,
					...error,
				})
			)
	)
}
