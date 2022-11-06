import { withStore, withRouter } from 'utils'
import { CoreRouter, Store, Block } from 'core'
import { validAllForm } from 'helpers/validAllForm'
import { changePassword } from 'services/auth'

type PasswordPageProps = {
	router: CoreRouter
	store: Store<AppState>
	formError?: () => string | null
	onBack?: () => void
}
export class PasswordPageN extends Block<PasswordPageProps> {
	static componentName = 'PasswordPage'
	constructor(props: PasswordPageProps) {
		super(props)
		this.setProps({
			formError: () => this.formError(),
			onBack: () => this.onBack(),
		})
	}

	protected getStateFromProps() {
		this.state = {
			error: '',
			onSavePass: () => this.onSavePass(),
		}
	}

	formError() {
		return this.props.store.getState().loginFormError
	}

	onBack() {
		this.props.router.back()
	}
	onSavePass() {
		event?.preventDefault()
		const inputs = document.querySelectorAll('input')
		let passwords = {
			oldPassword: '',
			newPassword: '',
		}
		let isValid = validAllForm(inputs, this)
		if (isValid) {
			inputs.forEach(item => {
				let inputNameItem = <string>item.getAttribute('name')
				if (inputNameItem === 'oldPassword') {
					passwords.oldPassword = item.value
				} else if (inputNameItem === 'newPassword') {
					passwords.newPassword = item.value
				} else if (
					inputNameItem === 'newPasswordNew' &&
					passwords.newPassword === item.value
				) {
					console.log('Пароль успешно изменен')
					this.props.store.dispatch(changePassword, passwords)
				} else {
					this.state.error = 'Пароли не совпадают!'
				}
			})
		}
	}

	render() {
		const error = this.state.error
		const user = this.props.store.getState().user
		const avatar = `https://ya-praktikum.tech/api/v2/resources/${user?.avatar}`
		const err = this.formError()
		return `
    <div class="profile">
    <div class="profile__wrapper">
        <label class="profile__avatar">
						<img src="${avatar}" alt="avatar" class="profile__photo" ></img>
				</label>
				<div class="profile__name">Алексей</div>
        
        <form action="#" class="profile__settings">
            <div class="profile__title">Данные</div>
            <div class="profile__items">
               {{{ControlledInput 
									class-controled="controlled-input"
									class="input"
									ref="passOldInputRef"
									onInput=onInput
									onFocus=onFocus
									type="password"
									name="oldPassword"
									placeholder="Старый пароль"
									error="${err ? err : ''}"
								}}}
								{{{ControlledInput 
									class-controled="controlled-input"
									class="input"
									ref="passNewInputRef"
									onInput=onInput
									onFocus=onFocus
									type="password"
									name="newPassword"
									placeholder="Новый пароль"
									error="${error ? error : ''}"
								}}}
								{{{ControlledInput 
									class-controled="controlled-input"
									class="input"
									ref="passVeryNewInputRef"
									onInput=onInput
									onFocus=onFocus
									type="password"
									name="newPasswordNew"
									placeholder="Новый пароль"
									error="${error ? error : ''}"
								}}}

            </div>
            <div class="profile__btns">
								{{{Button name="password_save" class="general__btn sign-btn" text="Сохранить пароль" onClick=onSavePass}}}
								{{{Button name="password_back" class="general__btn sign-btn" text="Назад" onClick=onBack}}}
            </div>
        </form>

    </div>
</div>
    `
	}
}

const PasswordPage = withRouter(withStore(PasswordPageN))
export { PasswordPage }
