import { profilePage } from '../../index'
import Block from '../../core/Block'
import { validAllForm } from 'helpers/validAllForm'

export class PasswordChangePage extends Block {
	constructor() {
		super()
		this.setProps({
			classItem: 'input',
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
					profilePage()
				}
			},
		})
	}

	render() {
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
									ref="passVeryNewInputRef"
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
