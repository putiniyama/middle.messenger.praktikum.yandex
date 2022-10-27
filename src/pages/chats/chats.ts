import input from 'components/input'
import chat from 'components/chat'
import { profilePage } from '../../index'
import Block from '../../core/Block'
import { validateForm, ValidateType } from '../../helpers/validateForm'
import { refErrors } from 'helpers/refErrors'
import { onEvents } from 'helpers/events'

export class ChatsPage extends Block {
	constructor() {
		super()

		this.setProps({
			error: '',
			onSubmit: () => {
				event?.preventDefault()
				const inputs = document.querySelectorAll('input')
				let errors: null[] = []
				let values = {}
				let res: {}

				for (let i = 0; i < inputs.length; i++) {
					const inputEl = <HTMLInputElement>inputs[i]
					const inputName = inputEl.getAttribute('name') as string
					const error = onEvents(inputEl, inputName)
					refErrors(inputName, this, error)
					if (!error) {
						errors.push(null)
					}
				}

				if (errors.length == inputs.length) {
					inputs.forEach(item => {
						let inputNameItem = <string>item.getAttribute('name')
						res = {
							[inputNameItem]: item.value,
						}
						Object.assign(values, res)
					})
					console.log(values)
				}
			},
			onRouter: () => {
				profilePage()
			},
		})
	}

	render() {
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
								ref="messageInputRef"
							}}}
							{{#if error}}{{error}}{{/if}}
							{{{Button class="sign-btn sign-btn-message" text="Отправить" onClick=onSubmit}}}
							</div>
					</div>
			</div>
		`
	}
}
