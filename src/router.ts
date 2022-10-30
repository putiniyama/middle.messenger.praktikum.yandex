import { Store, renderDOM, CoreRouter } from 'core'
import { getScreenComponent, Pages } from './utils'

const routes = [
	{
		path: '/onboarding',
		block: Pages.Onboarding,
		shouldAuthorized: false,
	},
	{
		path: '/login',
		block: Pages.Login,
		shouldAuthorized: false,
	},
	{
		path: '/signup',
		block: Pages.Signup,
		shouldAuthorized: false,
	},
	{
		path: '/profile',
		block: Pages.Profile,
		shouldAuthorized: true,
	},
	{
		path: '/password',
		block: Pages.Password,
		shouldAuthorized: true,
	},
	{
		path: '/messenger',
		block: Pages.Chats,
		shouldAuthorized: true,
	},
	{
		path: '*',
		block: Pages.Onboarding,
		shouldAuthorized: false,
	},
]

export function initRouter(router: CoreRouter, store: Store<AppState>) {
	routes.forEach(route => {
		router.use(route.path, () => {
			//console.log(route)
			const isAuthorized = Boolean(store.getState().user)
			const currentScreen = Boolean(store.getState().screen)

			if (isAuthorized || !route.shouldAuthorized) {
				store.dispatch({ screen: route.block })
				return
			}

			if (!currentScreen) {
				store.dispatch({ screen: Pages.Onboarding })
			}
		})
	})

	/**
	 * Глобальный слушатель изменений в сторе
	 * для переключения активного экрана
	 */
	store.on('changed', (prevState, nextState) => {
		if (!prevState.appIsInited && nextState.appIsInited) {
			router.start()
		}

		if (prevState.screen !== nextState.screen) {
			//console.log(nextState.screen)
			const Page = getScreenComponent(nextState.screen)
			//console.log(Page.name)
			renderDOM(new Page({}))
			document.title = `App / ${Page.componentName}`
		}
	})
}
