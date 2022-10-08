import input from 'components/input'
import { profilePage } from '../../index'
import Block from '../../core/Block'
import { validateForm, ValidateType } from '../../helpers/validateForm'

export class PasswordChangePage extends Block {
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
					this.element?.querySelector('input[name="password_old"]') === inputEl
				) {
					const errorMessage = validateForm([
						{ type: ValidateType.Password, value: inputEl.value },
						//{ type: ValidateType.Password, value: inputEl.value },
					])
					this.refs.passOldInputRef.refs.errorRef.setProps({
						text: errorMessage,
					})
				}

				if (
					this.element?.querySelector('input[name="password_new"]') === inputEl
				) {
					const errorMessage = validateForm([
						{ type: ValidateType.Password, value: inputEl.value },
						//{ type: ValidateType.Password, value: inputEl.value },
					])
					this.refs.passNewInputRef.refs.errorRef.setProps({
						text: errorMessage,
					})
				}

				if (
					this.element?.querySelector('input[name="password_verynew"]') ===
					inputEl
				) {
					const errorMessage = validateForm([
						{ type: ValidateType.Password, value: inputEl.value },
						//{ type: ValidateType.Password, value: inputEl.value },
					])
					this.refs.passveyNewInputRef.refs.errorRef.setProps({
						text: errorMessage,
					})
				}
			},
			onBlur: () => console.log('blur'),
			onFocus: () => {},
			onSubmit: () => {
				const passwordOldEl = this.element?.querySelector(
					'input[name="password_old"]'
				) as HTMLInputElement

				const passwordNewEl = this.element?.querySelector(
					'input[name="password_new"]'
				) as HTMLInputElement

				const passwordVeryNewEl = this.element?.querySelector(
					'input[name="password_verynew"]'
				) as HTMLInputElement

				const errorMessagePassOld = validateForm([
					{ type: ValidateType.Password, value: passwordOldEl.value },
				])

				const errorMessagePassNew = validateForm([
					{ type: ValidateType.Password, value: passwordNewEl.value },
				])

				const errorMessagePassVeryNew = validateForm([
					{ type: ValidateType.Password, value: passwordVeryNewEl.value },
				])

				if (
					errorMessagePassNew ||
					errorMessagePassOld ||
					errorMessagePassVeryNew
				) {
					this.refs.passOldInputRef.refs.errorRef.setProps({
						text: errorMessagePassOld,
					})
					this.refs.passNewInputRef.refs.errorRef.setProps({
						text: errorMessagePassNew,
					})
					this.refs.passveyNewInputRef.refs.errorRef.setProps({
						text: errorMessagePassVeryNew,
					})
				} else {
					console.log('все ок')
					console.log({
						oldPassword: passwordOldEl.value,
						newPassword: passwordNewEl.value,
						newVeryPassword: passwordVeryNewEl.value,
					})
					this.refs.passOldInputRef.refs.errorRef.setProps({
						text: '',
					})
					this.refs.passNewInputRef.refs.errorRef.setProps({
						text: '',
					})
					this.refs.passveyNewInputRef.refs.errorRef.setProps({
						text: '',
					})
					profilePage()
				}
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
									class="input"
									ref="passOldInputRef"
									onInput=onInput
									onFocus=onFocus
									type="password"
									name="password_old"
									placeholder="Старый пароль"
								}}}
								{{{ControlledInput 
									class-controled="controlled-input"
									class="input"
									ref="passNewInputRef"
									onInput=onInput
									onFocus=onFocus
									type="password"
									name="password_new"
									placeholder="Новый пароль"
								}}}
								{{{ControlledInput 
									class-controled="controlled-input"
									class="input"
									ref="passveyNewInputRef"
									onInput=onInput
									onFocus=onFocus
									type="password"
									name="password_verynew"
									placeholder="Новый пароль"
								}}}
								

            </div>
            <div class="profile__btns">
								{{{Button name="password_save" class="sign-btn" text="Сохранить пароль" onClick=onSubmit}}}
            </div>
        </div>

    </div>
</div>
    `
	}
}
