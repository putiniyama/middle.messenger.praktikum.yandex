import { authAPI } from 'api/auth'
import { UserDTO } from 'api/types'
import type { Dispatch } from 'core'
import { transformUser, apiHasError } from 'utils'

export async function initApp(dispatch: Dispatch<AppState>) {
	// Ручкая задержка для демонстрации загрузочного экрана
	await new Promise(r => setTimeout(r, 700))

	try {
		const response = await authAPI.me()
		const chatsResponse = await authAPI.chats()

		if (apiHasError(response)) {
			return
		}

		dispatch({ user: transformUser(response as UserDTO), chats: chatsResponse })
	} catch (err) {
		console.error(err)
	} finally {
		dispatch({ appIsInited: true })
	}
}
