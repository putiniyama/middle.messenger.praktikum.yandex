import { authAPI } from 'api/auth'
import { UserDTO } from 'api/types'
import type { Dispatch } from 'core'
import { transformUser, apiHasError } from 'utils'

type LoginPayload = {
	login: string
	password: string
}

type ChangePassword = {
	oldPassword: string
	newPassword: string
}

type SignUp = {
	first_name: string
	second_name: string
	login: string
	email: string
	password: string
	phone: string
}

type ChahgeProfile = {
	first_name: string
	second_name: string
	display_name: string
	login: string
	email: string
	phone: string
}
type ChatAdd = {
	title: string
}

type ChatId = {
	chatId: number
}

type ChatUser = {
	users: number[]
	chatId: number
}

export const chatGetToken = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: ChatId
) => {
	dispatch({ isLoading: true })
	const response = await authAPI.chatGetToken(action)
	if (apiHasError(response)) {
		dispatch({ isLoading: false, loginFormError: response.reason })
		return
	}
	dispatch({ isLoading: false })
}

export const chatDeleteUser = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: ChatUser
) => {
	dispatch({ isLoading: true })
	const response = await authAPI.chatDeleteUser(action)
	if (apiHasError(response)) {
		dispatch({ isLoading: false, loginFormError: response.reason })
		return
	}
	dispatch({ isLoading: false })
}

export const chatAddUser = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: ChatUser
) => {
	dispatch({ isLoading: true })
	const response = await authAPI.chatAddUser(action)
	if (apiHasError(response)) {
		dispatch({ isLoading: false, loginFormError: response.reason })
		return
	}
	dispatch({ isLoading: false })
}

export const chatGetUser = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: ChatId
) => {
	dispatch({ isLoading: true })
	const response = await authAPI.chatGetUser(action)
	if (apiHasError(response)) {
		dispatch({ isLoading: false, loginFormError: response.reason })
		return
	}
	dispatch({ isLoading: false })
}

export const chatDelete = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: ChatId
) => {
	dispatch({ isLoading: true })
	const response = await authAPI.chatDelete(action)
	if (apiHasError(response)) {
		dispatch({ isLoading: false, loginFormError: response.reason })
		return
	}
	const responseChats = await authAPI.chats()
	if (apiHasError(responseChats)) {
		dispatch({ isLoading: false, loginFormError: responseChats.reason })
		return
	}
	dispatch({ isLoading: false, loginFormError: null, chats: responseChats })
}

export const chatAdd = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: ChatAdd
) => {
	dispatch({ isLoading: true })
	const response = await authAPI.chatAdd(action)
	if (apiHasError(response)) {
		dispatch({ isLoading: false, loginFormError: response.reason })
		return
	}
	const responseChats = await authAPI.chats()
	if (apiHasError(responseChats)) {
		dispatch({ isLoading: false, loginFormError: responseChats.reason })
		return
	}
	dispatch({ isLoading: false, loginFormError: null, chats: responseChats })
}

export const chats = async (dispatch: Dispatch<AppState>) => {
	dispatch({ isLoading: true })
	const responseChats = await authAPI.chats()
	if (apiHasError(responseChats)) {
		dispatch({ isLoading: false, loginFormError: responseChats.reason })
		return
	}

	dispatch({ isLoading: false, loginFormError: null })

	if (apiHasError(responseChats)) {
		dispatch(logout)
		return
	}

	dispatch({ chats: responseChats })
}

export const changePassword = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: ChangePassword
) => {
	dispatch({ isLoading: true })
	const response = await authAPI.changePassword(action)
	console.log(response)
	dataUpdate(response, dispatch)
}

export const changeAvatar = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: FormData
) => {
	dispatch({ isLoading: true })
	const response = await authAPI.changeAvatar(action)
	dataUpdate(response, dispatch)
}

export const changeProfile = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: ChahgeProfile
) => {
	dispatch({ isLoading: true })
	const response = await authAPI.changeProfile(action)
	dataUpdate(response, dispatch)
}

export const signup = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: SignUp
) => {
	dispatch({ isLoading: true })
	const response = await authAPI.signup(action)
	dataUpdate(response, dispatch)
}

export const login = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: LoginPayload
) => {
	dispatch({ isLoading: true })

	const response = await authAPI.login(action)

	dataUpdate(response, dispatch)
}

export const logout = async (dispatch: Dispatch<AppState>) => {
	dispatch({ isLoading: true })

	await authAPI.logout()

	dispatch({ isLoading: false, user: null })

	window.router.go('/onboarding')
}

const dataUpdate = async (response: any, dispatch: any) => {
	if (apiHasError(response)) {
		dispatch({ isLoading: false, loginFormError: response.reason })
		return
	}

	const responseUser = await authAPI.me()

	dispatch({ isLoading: false, loginFormError: null })

	if (apiHasError(response)) {
		dispatch(logout)
		return
	}

	dispatch({ user: transformUser(responseUser as UserDTO) })

	window.router.go('/profile')
}
