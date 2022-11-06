import { withStore, withRouter } from 'utils'
import { login } from 'services/auth'
import { CoreRouter, Store, Block } from 'core'
import { validAllForm } from 'helpers/validAllForm'
import { authAPI } from 'api/auth'

type LoginPageProps = {
	router: CoreRouter
	store: Store<AppState>
	formError?: () => string | null
	onNavigateSignUp?: () => void
}
export class LoginPageN extends Block<LoginPageProps> {
	static componentName = 'LoginPage'

	constructor(props: LoginPageProps) {
		super(props)
		this.setProps({
			formError: () => this.formError(),
			onNavigateSignUp: () => this.onNavigateSignUp(),
		})
	}

	protected getStateFromProps() {
		this.state = {
			values: {
				login: '',
				password: '',
			},
			onLogin: () => this.onLogin(),
		}
	}

	formError() {
		return this.props.store.getState().loginFormError
	}

	onLogin() {
		event?.preventDefault()
		const loginData = {
			login: '',
			password: '',
		}

		const inputs = document.querySelectorAll('input')
		let res: {}
		let isValid = validAllForm(inputs, this)

		if (isValid) {
			inputs.forEach(item => {
				let inputNameItem = <string>item.getAttribute('name')
				res = {
					[inputNameItem]: item.value,
				}
				Object.assign(loginData, res)
			})

			try {
				this.props.store.dispatch(login, loginData)
			} catch (error) {
				console.log(error)
			}
		}
	}

	onNavigateSignUp() {
		this.props.router.go('/signup')
	}

	render() {
		const err = this.formError()

		return `
    <div class="authorization">
      <div class="authorization__wrapper">
			<h1 class='authorization__title'>Авторизация</h1>
			<form action='#' class='authorization__form' onsubmit=onLogin>
				{{{ControlledInput 
					class-controled="controlled-input"
					class="input"
					ref="loginInputRef"
					onInput=onInput
					onFocus=onFocus
					type="text"
					name="login"
					placeholder="Логин"
					error="${err ? err : ''}"
				}}}
				{{{ControlledInput 
					class-controled="controlled-input"
					class="input"
					ref="passwordInputRef"
					onInput=onInput
					onFocus=onFocus
					type="password"
					name="password"
					placeholder="Пароль"
					error="${err ? err : ''}"
				}}}
				{{{Button class="general__btn sign-btn" text="Войти" onClick=onLogin}}}
			</form>
			{{{Button class="general__btn sign-btn" text="Зарегистрироваться" onClick=onNavigateSignUp}}}
      </div>
    </div>
    `
	}
}

const LoginPage = withRouter(withStore(LoginPageN))
export { LoginPage }
