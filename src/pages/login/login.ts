import input from 'components/input'
import Block from '../../core/Block'
import { validateForm, ValidateType } from '../../helpers/validateForm'
import { signUpPage } from '../../index'

export class LoginPage extends Block {
	constructor() {
		super()

		this.setProps({
			error: '',
			loginValue: '',
			passwordValue: '',
			onInput: e => {
				this.refs.loginInputRef.refs.errorRef.setProps({ text: '' })
				const inputEl = e.target as HTMLInputElement
				if (this.element?.querySelector('input[name="login"]') === inputEl) {
					const errorMessage = validateForm([
						{ type: ValidateType.Login, value: inputEl.value },
						//{ type: ValidateType.Password, value: inputEl.value },
					])
					this.refs.loginInputRef.refs.errorRef.setProps({
						text: errorMessage,
					})
				}
				if (this.element?.querySelector('input[name="password"]') === inputEl) {
					const errorMessagePass = validateForm([
						{ type: ValidateType.Password, value: inputEl.value },
						//{ type: ValidateType.Password, value: inputEl.value },
					])
					this.refs.passwordInputRef.refs.errorRef.setProps({
						text: errorMessagePass,
					})
				}
			},
			onBlur: () => console.log('blur'),
			onFocus: () => {},
			onSubmit: () => {
				const btnSignIn = this.element?.querySelector('form .sign-btn')
				event?.preventDefault()
				//btnSignIn.preventDefault()
				const loginEl = this.element?.querySelector(
					'input[name="login"]'
				) as HTMLInputElement
				const passwordEl = this.element?.querySelector(
					'input[name="password"]'
				) as HTMLInputElement

				const errorMessageLogin = validateForm([
					{ type: ValidateType.Login, value: loginEl.value },
				])

				const errorMessagePass = validateForm([
					{ type: ValidateType.Password, value: passwordEl.value },
				])

				if (errorMessageLogin || errorMessagePass) {
					this.refs.loginInputRef.refs.errorRef.setProps({
						text: errorMessageLogin,
					})
					this.refs.passwordInputRef.refs.errorRef.setProps({
						text: errorMessagePass,
					})
				} else {
					console.log('все ок')
					console.log({
						login: loginEl.value,
						password: passwordEl.value,
					})
				}
			},
			onRouter: () => {
				signUpPage()
			},
		})
	}

	render() {
		// language=hbs
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
			
			{{#if error}}{{error}}{{/if}}
			{{{Button class="sign-btn" text="Зарегистрироваться" onClick=onRouter}}}
      </div>
    </div>
    `
	}
}

/*
<div class='authorization'>
	<div class='authorization__wrapper'>
		<h1 class='authorization__title'>Авторизация</h1>
		<form action='#' class='authorization__form'>
			{{!-- {{> "inputs/input" placeholder="Логин"}}
            {{> "inputs/input" placeholder="Пароль"}}           
            {{> "button/button" href="#" text="Войти"}} --}}
		</form>
		{{!-- {{> "button/button" href="sign-up.hbs" text="Зарегистрироваться"}} --}}
	</div>
</div>

*/
