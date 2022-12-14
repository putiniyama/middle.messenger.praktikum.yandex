import {APIError } from './types'
import {UserDTO} from './types'
import HTTPTransport from '../core/apiRequest'

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
type ChatAddRequestData = {
	title: string
}

type ChatIdRequestData = {
	chatId: number
}

type ChatUserRequestData = {
	users: number[]
	chatId: number
}

type LoginResponseData = {} | APIError
type SignupResponseData = {} | APIError
type ChahgeProfileResponseData = {} | APIError
type ChahgePasswordResponseData = [] | APIError
type ChatIdResponseData = [{}] | APIError

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
	//добавить типы
	chats: () => new HTTPTransport().get<Chats>('chats'),

	chatAdd: (data: ChatAddRequestData) => {
		new HTTPTransport().post<Chats>('chats', { data })
	},

	chatDelete: (data: ChatIdRequestData) =>
		new HTTPTransport().delete<ChatIdResponseData>('chats', { data }),

	chatGetUser: (data: ChatIdRequestData) =>
		new HTTPTransport().get<ChatIdResponseData>(`chats/${data}/users`),

	chatAddUser: (data: ChatUserRequestData) => {
		new HTTPTransport().put('chats/users', { data })
	},

	chatDeleteUser: (data: ChatUserRequestData) => {
		new HTTPTransport().delete('chats/users', { data })
	},

	chatGetToken: (data: ChatIdRequestData | number) =>
		new HTTPTransport().post(`chats/token/${data}`),
}
