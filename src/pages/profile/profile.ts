import { withStore, withRouter } from '../../utils/index'
import { CoreRouter, Store, Block } from '../../core/index'
import { validAllForm } from '../../helpers/validAllForm'
import { changeProfile, changeAvatar } from '../../services/auth'

import './profile.css'

type ProfilePageProps = {
	router: CoreRouter
	store: Store<AppState>
	onSubmit: () => any
	onSetAvatar: () => any
	onChangePassword: () => any
	onChat: () => any
}
export class ProfilePageN extends Block<ProfilePageProps> {
	static componentName = 'ProfilePage'
	constructor(props: ProfilePageProps) {
		super(props)

		this.setProps({
			onSubmit: () => {
				event?.preventDefault()
				const inputs = document.querySelectorAll('input')
				const profileData = {
					first_name: '',
					second_name: '',
					display_name: '',
					login: '',
					email: '',
					phone: '',
					avatar: '',
				}
				let res: {}
				let isValid = validAllForm(inputs, this)
				
				let changeDataBtn = <HTMLButtonElement>this.element?.querySelector('[name=data-change]')
				let changePassBtn =  <HTMLButtonElement>this.element?.querySelector('[name=password-change]')
				let chatBtn =  <HTMLButtonElement>this.element?.querySelector('[name=profile-chat]')
				if (changeDataBtn.textContent === 'Изменить данные') {
					changeDataBtn.textContent = 'Сохранить данные'
					changePassBtn.style.display = 'none'
					chatBtn.style.display = 'none'
				} else {
					if (isValid) {
						inputs.forEach(item => {
							let inputNameItem = <string>item.getAttribute('name')
							res = {
								[inputNameItem]: item.value,
							}
							Object.assign(profileData, res)
						})
						changePassBtn.style.display = 'block'
						chatBtn.style.display = 'block'
						try {
							this.props.store.dispatch(changeProfile, profileData)
						} catch (err) {
							console.log(err)
						}
					}
				}
			},
			onSetAvatar: () => {
				let avatar: HTMLInputElement = document.querySelector('#ava13')!

				if (avatar.files!.length > 0) {
					let formData = new FormData()
					formData.append('avatar', avatar.files![0])
					try {
						this.props.store.dispatch(changeAvatar, formData)
					} catch (err) {
						console.log(err)
					}
				} else {
					console.log('Файл не выбран!!')
				}
			},
			onChangePassword: () => {
				this.props.router.go('/password')
			},

			onChat: () => {
				this.props.router.go('/messenger')
			},
		})
	}

	render() {
		const user = this.props.store.getState().user
		const avatar = `https://ya-praktikum.tech/api/v2/resources/${user?.avatar}`
		return `
    <div class="profile">
    	<div class="profile__wrapper">
				<label class="profile__avatar">
					<input id="ava13" type="file">	 
					<img src="${avatar}" alt="avatar" class="profile__photo" ></img>
				</label>

				<div class="profile__name">${user?.firstName}</div>
				<form action='#' class="profile__settings">
					<div class="profile__title">Данные</div>
				<div  class='profile__items' >
				{{{ControlledInput 
					class-controled="controlled-input"
					class="input"
					ref="firstNameInputRef"
					onInput=onInput
					onFocus=onFocus
					type="text"
					name="first_name"
					placeholder="Имя"
					value="${user?.firstName}"
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
					value="${user?.secondName}"
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
					value="${user?.login}"
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
					value="${user?.email}"
				}}}
				{{{ControlledInput 
					class-controled="controlled-input"
					class="input"
					ref="nameViewInputRef"
					onInput=onInput
					onFocus=onFocus
					type="text"
					name="display_name"
					placeholder="Отображающееся имя"
					value="${user?.displayName ? user?.displayName : ''}"
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
					value="${user?.phone}"
				}}}
				
			</div>
			<div class="profile__btns">
					{{{Button ref="buttonRef" name="data-change" class="general__btn sign-btn" text="Изменить данные" onClick=onSubmit}}}
					{{{Button ref="buttonPassRef" name="password-change" class="general__btn sign-btn" text="Изменить пароль" onClick=onChangePassword}}}
					{{{Button ref="buttonAvaRef" name="avatar-change" class="general__btn  sign-btn" text="Сохранить аватар" onClick=onSetAvatar}}}
					{{{Button ref="buttonChatRef" name="profile-chat" class="general__btn  sign-btn" text="Чат" onClick=onChat}}}
				</div>
				</form>
    	</div>
		</div>
    `
	}
}

const ProfilePage = withRouter(withStore(ProfilePageN))
export { ProfilePage }
