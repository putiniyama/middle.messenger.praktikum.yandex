import input from 'components/input'
import { passwordChangePage } from '../../index'
import Block from '../../core/Block'
import { validateForm, ValidateType } from '../../helpers/validateForm'
import login from 'pages/login'

export class ProfilePage extends Block {
	constructor() {
		super()

		this.setProps({
			error: '',
			loginValue: '',
			passwordValue: '',
			classItem: 'input',
			onInput: e => {
				const inputEl = e.target as HTMLInputElement
				if (
					this.element?.querySelector('input[name="name_view"]') === inputEl
				) {
					const errorMessage = validateForm([
						{ type: ValidateType.NameView, value: inputEl.value },
						//{ type: ValidateType.Password, value: inputEl.value },
					])
					this.refs.nameViewInputRef.refs.errorRef.setProps({
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
				if (this.element?.querySelector('input[name="login"]') === inputEl) {
					const errorMessage = validateForm([
						{ type: ValidateType.Login, value: inputEl.value },
						//{ type: ValidateType.Password, value: inputEl.value },
					])
					this.refs.loginInputRef.refs.errorRef.setProps({ text: errorMessage })
				}
			},
			// onBlur: () => console.log('blur'),
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
				const changePassBtn = this.element?.querySelector(
					'[name="password-change"]'
				) as HTMLInputElement
				const emailEl = this.element?.querySelector(
					'input[name="email"]'
				) as HTMLInputElement
				const phoneEl = this.element?.querySelector(
					'input[name="phone"]'
				) as HTMLInputElement
				const changeDataBtn = this.element?.querySelector(
					'[name="data-change"]'
				)
				const nameViewEl = this.element?.querySelector(
					'input[name="name_view"]'
				) as HTMLInputElement
				// const inputs = this.element?.querySelectorAll('.profile__items input')
				// inputs?.forEach(item => {
				// 	item.disabled = !item.disabled
				// })
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
				const errorMessageNameView = validateForm([
					{ type: ValidateType.NameView, value: nameViewEl.value },
				])

				if (changeDataBtn!.textContent === 'Изменить данные') {
					changeDataBtn!.textContent = 'Сохранить данные'
					changePassBtn.style.display = 'none'
				} else {
					if (
						errorMessageNameView ||
						errorMessageLogin ||
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
						this.refs.nameViewInputRef.refs.errorRef.setProps({
							text: errorMessageNameView,
						})
					} else {
						changeDataBtn!.textContent = 'Изменить данные'
						changePassBtn!.style!.display = 'block'
						console.log({
							first_name: firstNameEl.value,
							second_name: secondNameEl.value,
							email: emailEl.value,
							phone: phoneEl.value,
							login: loginEl.value,
							name_view: nameViewEl.value,
						})
					}
				}
			},
			onRouter: () => {
				passwordChangePage()
			},
		})
	}

	render() {
		// language=hbs
		return `
    <div class="profile">
    <div class="profile__wrapper">
        <div class="profile__avatar">
            <div class="profile__photo"></div>
            <div class="profile__name">Алексей</div>
        </div>
        <div class="profile__settings">
            <div class="profile__title">Данные</div>
            <div class="profile__items">
                {{{ControlledInput 
									class-controled="controlled-input"
									class=classItem
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
									ref="nameViewInputRef"
									onInput=onInput
									onFocus=onFocus
									type="text"
									name="name_view"
									placeholder="Отображающееся имя"
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

            </div>
            <div class="profile__btns">
                {{{Button name="data-change" class="sign-btn" text="Изменить данные" onClick=onSubmit}}}
								{{{Button name="password-change" class="sign-btn" text="Изменить пароль" onClick=onRouter}}}
            </div>
        </div>

    </div>
</div>
    `
	}
}
