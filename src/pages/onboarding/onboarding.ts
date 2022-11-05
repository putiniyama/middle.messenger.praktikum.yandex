import { withStore, withRouter } from 'utils'
import { CoreRouter, Store, Block } from 'core'
import { logout } from 'services/auth'
import { authAPI } from 'api/auth'

type OnboardingPageProps = {
	router: CoreRouter
	store: Store<AppState>
	isLoading?: boolean
	onNavigateNext?: () => void
	onLogout?: () => void
	onNavigateProfile?: () => void
	onNavigateSignUp?: () => void
}

export class OnboardingPageN extends Block<OnboardingPageProps> {
	static componentName = 'OnboardingPage'

	constructor(props: OnboardingPageProps) {
		super(props)

		this.setProps({
			onNavigateNext: () => this.onNavigateNext(),
			onLogout: () => this.onLogout(),
			onNavigateProfile: () => this.onNavigateProfile(),
			onNavigateSignUp: () => this.onNavigateSignUp(),
		})
	}

	onNavigateNext() {
		if (this.props.store.getState().user) {
			this.props.router.go('/messenger')
		} else {
			this.props.router.go('/login')
		}
	}

	onNavigateProfile() {
		if (this.props.store.getState().user) {
			this.props.router.go('/profile')
		} else {
			this.props.router.go('/login')
		}
	}

	onNavigateSignUp() {
		this.props.router.go('/signup')
	}

	async onLogout() {
		this.props.store.dispatch(logout)
		this.onNavigateNext()
	}

	render() {
		const user = this.props.store.getState().user

		return `
    <div class="authorization">
      <div class="authorization__wrapper">
			<h1 class='authorization__title'>Чат</h1>	
			{{#if ${user != null}}}
				{{{Button class="sign-btn general__btn" text="Чат" onClick=onNavigateNext}}}
				{{{Button class="sign-btn general__btn" text="Профиль" onClick=onNavigateProfile}}} 		
				{{{Button class="sign-btn general__btn" text="Выйти" onClick=onLogout}}} 		 		
			{{else}}
				{{{Button class="sign-btn general__btn" text="Войти" onClick=onNavigateNext}}}
				{{{Button class="sign-btn general__btn" text="Зарегистрироваться" onClick=onNavigateSignUp}}}		
			{{/if}}
      </div>
    </div>
    `
	}
}

const OnboardingPage = withRouter(withStore(OnboardingPageN))
export { OnboardingPage }
