import input from 'components/input'
import { chatsPage } from '../../index'
import Block from '../../core/Block'
import { validateForm, ValidateType } from '../../helpers/validateForm'

export class SignUpPage extends Block {
	constructor() {
		super()

		this.setProps({
			error: '',
			loginValue: '',
			passwordValue: '',
			onInput: e => {
				const inputEl = e.target as HTMLInputElement
				if (this.element?.querySelector('input[name="login"]') === inputEl) {
					const errorMessage = validateForm([
						{ type: ValidateType.Login, value: inputEl.value },
						//{ type: ValidateType.Password, value: inputEl.value },
					])
					this.refs.loginInputRef.refs.errorRef.setProps({ text: errorMessage })
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
				if (
					this.element?.querySelector('input[name="first_name"]') === inputEl
				) {
					const errorMessageFirstName = validateForm([
						{ type: ValidateType.FirstName, value: inputEl.value },
						//{ type: ValidateType.Password, value: inputEl.value },
					])
					this.refs.firstNameInputRef.refs.errorRef.setProps({
						text: errorMessageFirstName,
					})
				}
				if (
					this.element?.querySelector('input[name="second_name"]') === inputEl
				) {
					const errorMessageSecondName = validateForm([
						{ type: ValidateType.SecondName, value: inputEl.value },
						//{ type: ValidateType.Password, value: inputEl.value },
					])
					this.refs.secondNameInputRef.refs.errorRef.setProps({
						text: errorMessageSecondName,
					})
				}
				if (this.element?.querySelector('input[name="email"]') === inputEl) {
					const errorMessageEmail = validateForm([
						{ type: ValidateType.Email, value: inputEl.value },
						//{ type: ValidateType.Password, value: inputEl.value },
					])
					this.refs.emailInputRef.refs.errorRef.setProps({
						text: errorMessageEmail,
					})
				}
				if (this.element?.querySelector('input[name="phone"]') === inputEl) {
					const errorMessagePhone = validateForm([
						{ type: ValidateType.Phone, value: inputEl.value },
						//{ type: ValidateType.Password, value: inputEl.value },
					])
					this.refs.phoneInputRef.refs.errorRef.setProps({
						text: errorMessagePhone,
					})
				}
			},
			onBlur: () => console.log('blur'),
			onFocus: () => {},
			onSubmit: () => {
				const firstNameEl = this.element?.querySelector(
					'input[name="first_name"]'
				) as HTMLInputElement
				const secondNameEl = this.element?.querySelector(
					'input[name="second_name"]'
				) as HTMLInputElement
				const loginEl = this.element?.querySelector(
					'input[name="login"]'
				) as HTMLInputElement
				const passwordEl = this.element?.querySelector(
					'input[name="password"]'
				) as HTMLInputElement
				const emailEl = this.element?.querySelector(
					'input[name="email"]'
				) as HTMLInputElement
				const phoneEl = this.element?.querySelector(
					'input[name="phone"]'
				) as HTMLInputElement

				const errorMessageFirstName = validateForm([
					{ type: ValidateType.FirstName, value: firstNameEl.value },
				])
				const errorMessageSecondName = validateForm([
					{ type: ValidateType.SecondName, value: secondNameEl.value },
				])
				const errorMessageEmail = validateForm([
					{ type: ValidateType.Email, value: emailEl.value },
				])
				const errorMessagePhone = validateForm([
					{ type: ValidateType.Phone, value: phoneEl.value },
				])
				const errorMessageLogin = validateForm([
					{ type: ValidateType.Login, value: loginEl.value },
				])
				const errorMessagePass = validateForm([
					{ type: ValidateType.Password, value: passwordEl.value },
				])

				if (
					errorMessageLogin ||
					errorMessagePass ||
					errorMessageFirstName ||
					errorMessageSecondName ||
					errorMessageEmail ||
					errorMessagePhone
				) {
					this.refs.firstNameInputRef.refs.errorRef.setProps({
						text: errorMessageFirstName,
					})
					this.refs.secondNameInputRef.refs.errorRef.setProps({
						text: errorMessageSecondName,
					})
					this.refs.loginInputRef.refs.errorRef.setProps({
						text: errorMessageLogin,
					})
					this.refs.emailInputRef.refs.errorRef.setProps({
						text: errorMessageEmail,
					})
					this.refs.phoneInputRef.refs.errorRef.setProps({
						text: errorMessagePhone,
					})
					this.refs.passwordInputRef.refs.errorRef.setProps({
						text: errorMessagePass,
					})
				} else {
					console.log('все ок')
					console.log({
						first_name: firstNameEl.value,
						second_name: secondNameEl.value,
						login: loginEl.value,
						email: emailEl.value,
						password: passwordEl.value,
						phone: phoneEl.value,
					})
					chatsPage()
				}
			},
		})
	}

	render() {
		// language=hbs
		return `
    <div class="registration">
      <div class="registration__wrapper">
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
			{{{ControlledInput 
				class-controled="controlled-input"
				class="input"
				ref="phoneInputRef"
				onInput=onInput
				onFocus=onFocus
				type="text"
				name="phone"
				placeholder="Телефон"
			}}}
			{{#if error}}{{error}}{{/if}}
			{{{Button class="sign-btn" text="Зарегистрироваться" onClick=onSubmit}}}
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
