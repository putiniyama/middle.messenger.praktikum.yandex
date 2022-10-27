import { withStore, withRouter } from 'utils'
import { CoreRouter, Store, Block } from 'core'

type OnboardingPageProps = {
	router: CoreRouter
	store: Store<AppState>
	isLoading?: boolean
	onNavigateNext?: () => void
}

export class OnboardingPage extends Block<OnboardingPageProps> {
	static componentName = 'OnboardingPage'

	constructor(props: OnboardingPageProps) {
		super(props)

		this.setProps({
			onNavigateNext: () => this.onNavigateNext(),
		})
	}

	onNavigateNext() {
		//if (store.getState().user) {
		//	console.log(store.getState().user)
		//	router.go('/profile')
		//} else {
		router.go('/login')
		//}
	}

	render() {
		const user = store.getState().user

		console.log(this.props)

		return `
    <div class="authorization">
      <div class="authorization__wrapper">
			<h1 class='authorization__title'>Авторизация</h1>		
			{{{Button class="sign-btn" text="Чат" onClick=onNavigateNext}}}
      </div>
    </div>
    `
	}
}

export default withRouter(withStore(OnboardingPage))
