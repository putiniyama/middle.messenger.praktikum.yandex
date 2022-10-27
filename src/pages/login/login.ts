import { withStore, withRouter } from 'utils'
import { login } from 'services/auth'
import { CoreRouter, Store, Block } from 'core'
import { validAllForm } from 'helpers/validAllForm'

type LoginPageProps = {
	router: CoreRouter
	store: Store<AppState>
}
export class LoginPage extends Block<LoginPageProps> {
	static componentName = 'LoginPage'

	constructor(props: LoginPageProps) {
		super(props)
		this.setProps({})
	}

	protected getStateFromProps() {
		this.state = {
			values: {
				login: '',
				password: '',
			},
			errors: {
				login: '',
				password: '',
			},
			onLogin: () => {
				//console.log(www)
				// TODO: вынести в отдельный метод

				let hasError = false
				const loginData = {
					login: 'asdasd32',
					password: 'fghlkjJHJKH436',
				}

				const nextState = {
					errors: {
						login: '',
						password: '',
					},
					values: { ...loginData },
				}

				event?.preventDefault()
				const inputs = document.querySelectorAll('input')
				let values = {}
				let res: {}
				let isValid = validAllForm(inputs, this)

				//if (isValid) {
				inputs.forEach(item => {
					let inputNameItem = <string>item.getAttribute('name')
					res = {
						[inputNameItem]: item.value,
					}
					Object.assign(values, res)
				})
				//console.log(values)
				store.dispatch(login, loginData)
				
				//}
			},
		}
	}

	render() {
		//const { values } = this.state
		//console.log(values)

		return `
    <div class="authorization">
      <div class="authorization__wrapper">
			<h1 class='authorization__title'>Авторизация</h1>
			<form action='#' class='authorization__form'>
				{{{ControlledInput 
					class-controled="controlled-input"
					class="input"
					ref="loginInputRef"
					onInput=onInput
					onFocus=onFocus
					type="text"
					name="login"
					placeholder="Логин"
					
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
					
				}}}
				{{{Button class="sign-btn" text="Войти" onClick=onLogin}}}
			</form>
			
			{{{Button class="sign-btn" text="Зарегистрироваться" onClick=onRouter}}}
      </div>
    </div>
    `
	}
}

export default withRouter(withStore(LoginPage))
