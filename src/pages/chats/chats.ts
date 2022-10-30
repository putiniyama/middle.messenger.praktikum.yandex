import input from 'components/input'
import chat from 'components/chat'
import { validateForm, ValidateType } from '../../helpers/validateForm'
import { refErrors } from 'helpers/refErrors'
import { onEvents } from 'helpers/events'
import { withStore, withRouter } from 'utils'
import { CoreRouter, Store, Block } from 'core'
import { chats } from 'services/auth'
import { diffObjectsDeep } from 'utils'
import cloneDeep from 'utils/cloneDeep'
import { mergeDeep } from 'utils'

type ChatsPageProps = {
	router: CoreRouter
	store: Store<AppState>
	onProfile?: () => void
	onCreate?: () => any
}

export class ChatsPageN extends Block<ChatsPageProps> {
	static componentName = 'ChatsPage'
	constructor(props: ChatsPageProps) {
		super(props)

		this.setProps({
			//error: '',
			// onSubmit: () => {
			// 	event?.preventDefault()
			// 	const inputs = document.querySelectorAll('input')
			// 	let errors: null[] = []
			// 	let values = {}
			// 	let res: {}
			// 	for (let i = 0; i < inputs.length; i++) {
			// 		const inputEl = <HTMLInputElement>inputs[i]
			// 		const inputName = inputEl.getAttribute('name') as string
			// 		const error = onEvents(inputEl, inputName)
			// 		refErrors(inputName, this, error)
			// 		if (!error) {
			// 			errors.push(null)
			// 		}
			// 	}
			// 	if (errors.length == inputs.length) {
			// 		inputs.forEach(item => {
			// 			let inputNameItem = <string>item.getAttribute('name')
			// 			res = {
			// 				[inputNameItem]: item.value,
			// 			}
			// 			Object.assign(values, res)
			// 		})
			// 		console.log(values)
			// 	}
			// },
			//},
		})
	}

	protected getStateFromProps() {
		this.state = {
			chats: {},
			onCreate: () => {
				const chatList = cloneDeep(this.props.store.getState().chats!)
				const nextState = {
					chats: { ...chatList },
				}
				this.setState(nextState)
			},
			onProfile: () => {
				this.props.router.go('/profile')
			},
		}
	}

	render() {
		return `
			<div class="general">
					<div class="general__chats">
					<div class="general__buttons">
					{{{Button 
							class="general__profile" onClick=onCreate text="Создать чат"}}}
						{{{Button	class="general__profile" onClick=onProfile text="Профиль"}}}
					</div>
					<input type="text" class="general__search" placeholder="Поиск">
					<ul class="general__items">

						{{#each chats}}
								{{{Chat text="asd" title="{{title}}" }}}
						{{/each}}
						
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
							{{{Button class="sign-btn sign-btn-message" text="Отправить" onClick=onSend}}}
							</div>
					</div>
			</div>
		`
	}
}

const ChatsPage = withRouter(withStore(ChatsPageN))
export { ChatsPage }
