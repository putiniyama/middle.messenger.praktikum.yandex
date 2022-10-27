import Block from '../../core/Block'
import { validAllForm } from 'helpers/validAllForm'

export class ProfilePage extends Block {
	constructor() {
		super()

		this.setProps({
			error: '',
			loginValue: '',
			passwordValue: '',
			classItem: 'input',
			onSubmit: () => {
				event?.preventDefault()
				const inputs = document.querySelectorAll('input')
				let values = {}
				let res: {}
				let isValid = validAllForm(inputs, this)

				if (this.refs.buttonRef.props.text === 'Изменить данные') {
					this.refs.buttonRef.setProps({ text: 'Сохранить данные' })
					this.refs.buttonPassRef.element.style.display = 'none'
				} else {
					if (isValid) {
						inputs.forEach(item => {
							let inputNameItem = <string>item.getAttribute('name')
							res = {
								[inputNameItem]: item.value,
							}
							Object.assign(values, res)
						})
						console.log(values)
						this.refs.buttonPassRef.element.style.display = 'block'
					}
				}
			},
			onRouter: () => {
				passwordChangePage()
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
                {{{Button ref="buttonRef" name="data-change" class="sign-btn" text="Изменить данные" onClick=onSubmit}}}
								{{{Button ref="buttonPassRef" name="password-change" class="sign-btn" text="Изменить пароль" onClick=onRouter}}}
            </div>
        </div>

    </div>
</div>
    `
	}
}
