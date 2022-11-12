import { authAPI } from '../api/auth'
import { UserDTO } from '../api/types'
import type { Dispatch } from '../core/index'
import { transformUser, apiHasError } from '../utils/index'

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

type DispatchStateHandler<TAction> = (dispatch: Dispatch<AppState>, state: AppState, action: TAction) => Promise<void>

export const chatGetToken: DispatchStateHandler<ChatId> = async (dispatch, state, action) => {
	dispatch({ isLoading: true })
	const response = await authAPI.chatGetToken(action)
	if (apiHasError(response)) {
		dispatch({ isLoading: false, loginFormError: response.reason })
		return
	}
	dispatch({ isLoading: false })
}

export const chatDeleteUser: DispatchStateHandler<ChatUser> = async (dispatch, state, action) => {
	dispatch({ isLoading: true })
	const response = await authAPI.chatDeleteUser(action)
	if (apiHasError(response)) {
		dispatch({ isLoading: false, loginFormError: response.reason })
		return
	}
	dispatch({ isLoading: false })
}

export const chatAddUser: DispatchStateHandler<ChatUser> = async (dispatch, state, action) => {
	dispatch({ isLoading: true })
	const response = await authAPI.chatAddUser(action)
	if (apiHasError(response)) {
		dispatch({ isLoading: false, loginFormError: response.reason })
		return
	}
	dispatch({ isLoading: false })
}

export const chatGetUser: DispatchStateHandler<ChatId> = async (dispatch, state, action) => {
	dispatch({ isLoading: true })
	const response = await authAPI.chatGetUser(action)
	if (apiHasError(response)) {
		dispatch({ isLoading: false, loginFormError: response.reason })
		return
	}
	dispatch({ isLoading: false })
}

export const chatDelete: DispatchStateHandler<ChatId> = async (dispatch, state, action) => {
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

export const chatAdd: DispatchStateHandler<ChatAdd> = async (dispatch, state, action) => {
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

export const changePassword: DispatchStateHandler<ChangePassword> = async (dispatch, state, action) => {
	dispatch({ isLoading: true })
	const response = await authAPI.changePassword(action)
	console.log(response)
	dataUpdate(response, dispatch)
}

export const changeAvatar: DispatchStateHandler<FormData> = async (dispatch, state, action) => {
	dispatch({ isLoading: true })
	const response = await authAPI.changeAvatar(action)
	dataUpdate(response, dispatch)
}

export const changeProfile: DispatchStateHandler<ChahgeProfile> = async (dispatch, state, action) => {
	dispatch({ isLoading: true })
	const response = await authAPI.changeProfile(action)
	dataUpdate(response, dispatch)
}

export const signup: DispatchStateHandler<SignUp> = async (dispatch, state, action) => {
	dispatch({ isLoading: true })
	const response = await authAPI.signup(action)
	dataUpdate(response, dispatch)
}

export const login: DispatchStateHandler<LoginPayload> = async (dispatch, state, action) => {
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
