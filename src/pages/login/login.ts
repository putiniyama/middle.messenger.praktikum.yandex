import Block from '../../core/Block'
import { signUpPage } from '../../index'
import { validAllForm } from 'helpers/validAllForm'
export class LoginPage extends Block {
	constructor() {
		super()
		this.setProps({
			onSubmit: () => {
				event?.preventDefault()
				const inputs = document.querySelectorAll('input')
				let values = {}
				let res: {}
				let isValid = validAllForm(inputs, this)

				if (isValid) {
					inputs.forEach(item => {
						let inputNameItem = <string>item.getAttribute('name')
						res = {
							[inputNameItem]: item.value,
						}
						Object.assign(values, res)
					})
					console.log(values)
				}
			},
			onRouter: () => {
				signUpPage()
			},
		})
	}

	render() {
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
				{{{Button class="sign-btn" text="Войти" onClick=onSubmit}}}
			</form>
			
			{{{Button class="sign-btn" text="Зарегистрироваться" onClick=onRouter}}}
      </div>
    </div>
    `
	}
}
