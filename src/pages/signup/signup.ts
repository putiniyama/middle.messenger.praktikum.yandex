import { withStore, withRouter } from '../../utils'
//import { chatsPage } from '../../index'
import { CoreRouter, Store, Block } from '../../core'
import { validAllForm } from '../../helpers/validAllForm'
import { signup } from '../../services/auth'
import "./signup.css"

type SignupPageProps = {
	router: CoreRouter
	store: Store<AppState>
	formError?: () => string | null
	onNavigateSignUp?: () => void
	onSubmit: () => any
}

export class SignUpPageN extends Block<SignupPageProps> {
	static componentName = 'SignupPage'
	constructor(props: SignupPageProps) {
		super(props)

		this.setProps({})
	}

	protected getStateFromProps() {
		this.state = {
			values: {
				first_name: '',
				second_name: '',
				login: '',
				email: '',
				password: '',
				phone: '',
			},
			onSubmit: () => this.onSubmit(),
		}
	}

	onSubmit() {
		event?.preventDefault()
		const signUpData = {
			first_name: '',
			second_name: '',
			login: '',
			email: '',
			password: '',
			phone: '',
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
				Object.assign(signUpData, res)
				Object.assign(this.state, res)
			})

			console.log(this.state)

			try {
				this.props.store.dispatch(signup, signUpData)		
			} catch (err) {
				console.log(err)
			}
		}
	}

	render() {
		return `
    <div class="registration">
      <form class="registration__wrapper" onsubmit=onSubmit>
				<h1 class='registration__title'>Регистрация</h1>
				{{{ControlledInput 
					class-controled="controlled-input"
					class="input"
					ref="firstNameInputRef"
					onInput=onInput
					onFocus=onFocus
					type="text"
					name="first_name"
					placeholder="Имя"
					error=error
				}}}
				{{{ControlledInput 
					class-controled="controlled-input"
					class="input"
					ref="secondNameInputRef"
					onInput=onInput
					onFocus=onFocus
					type="text"
					name="second_name"
					placeholder="Фамилия"
					error=error
				}}}
				{{{ControlledInput 
					class-controled="controlled-input"
					class="input"
					ref="loginInputRef"
					onInput=onInput
					onFocus=onFocus
					type="text"
					name="login"
					placeholder="Логин"
					error=error
				}}}
				{{{ControlledInput 
					class-controled="controlled-input"
					class="input"
					ref="emailInputRef"
					onInput=onInput
					onFocus=onFocus
					type="text"
					name="email"
					placeholder="Почта"
					error=error
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
					error=error
				}}}
				{{{ControlledInput 
					class-controled="controlled-input"
					class="input"
					ref="phoneInputRef"
					onInput=onInput
					onFocus=onFocus
					type="text"
					name="phone"
					placeholder="Телефон"
					error=error
				}}}
				{{{Button class="general__btn" text="Зарегистрироваться" onClick=onSubmit}}}
      </form>
    </div>
    `
	}
}

const SignUpPage = withRouter(withStore(SignUpPageN))
export { SignUpPage }
