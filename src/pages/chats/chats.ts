import input from 'components/input'
import chat from 'components/chat'
import { profilePage } from '../../index'
import Block from '../../core/Block'
import { validateForm, ValidateType } from '../../helpers/validateForm'

export class ChatsPage extends Block {
	constructor() {
		super()

		this.setProps({
			error: '',
			onInput: e => {},
			onBlur: () => console.log('blur'),
			onFocus: () => {},
			onSubmit: () => {
				const messageEl = this.element?.querySelector(
					'input[name="message"]'
				) as HTMLInputElement

				const errorMessage = validateForm([
					{ type: ValidateType.Messsage, value: messageEl.value },
				])

				if (errorMessage) {
					this.refs.valueRef.refs.errorRef.setProps({
						text: errorMessage,
					})
				} else {
					this.refs.valueRef.refs.errorRef.setProps({
						text: '',
					})
					console.log({
						message: messageEl.value,
					})
					messageEl.value = ''
				}
			},
			onRouter: () => {
				profilePage()
			},
		})
	}

	render() {
		// language=hbs
		return `
			<div class="general">
					<div class="general__chats">
							{{{Button 
								class="general__profile" 
								onClick=onRouter 
								text="Профиль"}}}
							<input type="text" class="general__search" placeholder="Поиск">
							<ul class="general__items">
								{{{Chat
									text="Он: привет"
									nick="Mark"
								}}}	
								{{{Chat
									text="Он: привет"
									nick="Lec"
								}}}	
								{{{Chat
									text="Он: привет"
									nick="Zver"
								}}}	
								{{{Chat
									text="Он: привет"
									nick="Holl"
								}}}	
							</ul>

					</div>
					<div class="general__active-chat">
							<div class="general__head">
									<div class="general__name">Mark</div>
									<div class="general__utils"></div>
							</div>
							<p class="general__date"></p>
							<div class="general__correspondence">
									<p class="general__message"></p>
									<p class="general__time"></p>
							</div>
							<div class="general__send">
							{{{ControlledInput 
								class-controled="controlled-input controlled-input-message"
								name="message"
								class="general__send-message"
								type="text"
								placeholder="Введите сообщение"
								onFocus=onFocus
								onInput=onInput
								onBlur=onBlur
								ref="valueRef"
							}}}
							{{#if error}}{{error}}{{/if}}
							{{{Button class="sign-btn sign-btn-message" text="Отправить" onClick=onSubmit}}}
							</div>
					</div>
			</div>
		`
	}
}
