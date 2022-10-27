import { chatsPage } from '../../index'
import Block from '../../core/Block'
import { validAllForm } from 'helpers/validAllForm'

export class SignUpPage extends Block {
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
					chatsPage()
				}
			},
		})
	}

	render() {
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
			{{{Button class="sign-btn" text="Зарегистрироваться" onClick=onSubmit}}}
      </div>
    </div>
    `
	}
}
