import { request } from 'core'
import { APIError, UserDTO } from './types'
import HTTPTransport from 'core/apiRequest'
import { title } from 'process'

type LoginRequestData = {
	login: string
	password: string
}

type PasswordRequestData = {
	oldPassword: string
	newPassword: string
}

type SignupRequestData = {
	first_name: string
	second_name: string
	login: string
	email: string
	password: string
	phone: string
}

type ChahgeProfileRequestData = {
	first_name: string
	second_name: string
	display_name: string
	login: string
	email: string
	phone: string
}

type LoginResponseData = {} | APIError
type SignupResponseData = {} | APIError
type ChahgeProfileResponseData = {} | APIError
type ChahgePasswordResponseData = {} | APIError

export const authAPI = {
	login: (data: LoginRequestData) =>
		new HTTPTransport().post<LoginResponseData>('auth/signin', { data }),

	me: () => new HTTPTransport().get<UserDTO | APIError>('auth/user'),

	logout: () => new HTTPTransport().post('auth/logout'),

	signup: (data: SignupRequestData) =>
		new HTTPTransport().post<SignupResponseData>('auth/signup', { data }),

	changeProfile: (data: ChahgeProfileRequestData) => {
		return new HTTPTransport().put<ChahgeProfileResponseData>('user/profile', {
			data,
		})
	},
	changeAvatar: (data: FormData) => {
		return new HTTPTransport().put('user/profile/avatar', { data })
	},

	changePassword: (data: PasswordRequestData) => {
		return new HTTPTransport().put<ChahgePasswordResponseData>(
			'user/password',
			{
				data,
			}
		)
	},
}
