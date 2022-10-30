declare global {
	export type Nullable<T> = T | null

	export type Keys<T extends Record<string, unknown>> = keyof T
	export type Values<T extends Record<string, unknown>> = T[Keys<T>]

	export type Indexed = { [key: string]: any }

	export type AppState = {
		appIsInited: boolean
		screen: Screens | null
		isLoading: boolean
		loginFormError: string | null
		user: User | null
		chats: Chats | null
	}

	export type Chats = [
		{
			id: number
			title: string
			avatar: string
			created_by: number
			unread_count: number
			last_message: {
				user: User | null
				time: string | null
				content: string | null
			} | null
		}
	]

	export type User = {
		id: number
		login: string
		firstName: string
		secondName: string
		displayName: string
		avatar: string
		phone: string
		email: string
	}
}

export {}
