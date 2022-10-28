import { request } from 'core'
import { APIError, UserDTO } from './types'
import HTTPTransport from 'core/apiRequest'

type LoginRequestData = {
	login: string
	password: string
}

type LoginResponseData = {} | APIError

export const authAPI = {
	login: (data: LoginRequestData) =>
		request.post<LoginResponseData>('auth/signin', data),

	me: () => {
		const www = new HTTPTransport()
		return www.get<UserDTO | APIError>('auth/user')
	},

	logout: () => request.post('auth/logout'),
}
