import input from 'components/input'
import chat from 'components/chat'
import { validateForm, ValidateType } from '../../helpers/validateForm'
import { refErrors } from 'helpers/refErrors'
import { onEvents } from 'helpers/events'
import { withStore, withRouter, withChats } from 'utils'
import { CoreRouter, Store, Block } from 'core'
import {
	chatAdd,
	chatAddUser,
	chatDelete,
	chatDeleteUser,
	chatGetUser,
	chatGetToken,
	chats,
} from 'services/auth'
import { diffObjectsDeep } from 'utils'
import cloneDeep from 'utils/cloneDeep'
import { mergeDeep } from 'utils'
import EventBus from 'core/EventBus'
import { authAPI } from 'api/auth'
import { WebSocketConnect } from 'api/webSocket'

type ChatsPageProps = {
	router: CoreRouter
	store: Store<AppState>
	// onProfile?: () => void
	onCreate?: () => any
	chatsList?: () => any
	onClickChat?: (e: Event) => void
	onAddUserChat: () => any
	onDeleteUserFromChat: () => any
	getToken: () => any
	messageList: () => any
	onSend: () => any
}

export class ChatsPageN extends Block<ChatsPageProps> {
	static componentName = 'ChatsPage'
	constructor(props: ChatsPageProps) {
		super(props)
		this.setProps({
			chatsList: () => cloneDeep(this.props.store.getState().chats!),
			messageList: () => cloneDeep(this.state.messages),
			onClickChat: async e => {
				const elemChat = e.target as HTMLElement
				const elemIdChat = parseInt(elemChat.closest('li')!.id)
				if (elemChat.className === 'general__item-wastebasket') {
					this.props.store.dispatch(chatDelete, {
						chatId: elemIdChat,
					})
				} else if (elemChat.className != 'general__item-wastebasket') {
					console.log(elemIdChat)
					this.state.chatActiveId = elemIdChat
					//делаем запрос на пользователей в чате
					this.props.store.dispatch(chatGetUser, elemIdChat)
					//делаем запрос на токен
					this.state.token = await authAPI.chatGetToken(elemIdChat)
					//работаем  вебсокетами
					this.state.webObj = {
						userId: this.props.store.getState().user?.id!,
						chatId: elemIdChat,
						token: this.state.token.token,
					}
					this.state.socket = new WebSocket(
						`wss://ya-praktikum.tech/ws/chats/${this.state.webObj.userId}/${this.state.webObj.chatId}/${this.state.webObj.token}`
					)
					this.state.socket.addEventListener('open', () => {
						console.log('Соединение установлено')
						this.state.socket.send(
							JSON.stringify({
								content: '0',
								type: 'get old',
							})
						)
						this.props.store.dispatch({ isLoading: true })
					})

					this.state.socket.addEventListener('message', event => {
						this.state.messages = JSON.parse(event.data)
						console.log(this.state.messages)
						this.props.store.dispatch({ isLoading: false })
					})
				}
			},

			onAddUserChat: () => {
				const inputAddUser = this.element!.querySelector(
					'.general__input-add'
				) as HTMLInputElement
				const requestObjAddUser = {
					users: [parseInt(inputAddUser.value)],
					chatId: this.state.chatActiveId,
				}
				this.props.store.dispatch(chatAddUser, requestObjAddUser)
			},

			onDeleteUserFromChat: () => {
				const inputDeleteUser = this.element!.querySelector(
					'.general__input-delete'
				) as HTMLInputElement
				const requestObjAddUser = {
					users: [parseInt(inputDeleteUser.value)],
					chatId: this.state.chatActiveId,
				}
				this.props.store.dispatch(chatDeleteUser, requestObjAddUser)
			},

			onSend: () => {
				event?.preventDefault()
				let errors: null[] = []
				const inputMessage = <HTMLInputElement>(
					this.element?.querySelector('.general__send-message')
				)
				const inputName = inputMessage.getAttribute('name') as string
				const error = onEvents(inputMessage, inputName)
				refErrors(inputName, this, error)
				if (!error) {
					errors.push(null)
					this.state.socket.send(
						JSON.stringify({
							content: inputMessage.value,
							type: 'message',
						})
					)

					this.state.socket.send(
						JSON.stringify({
							content: '0',
							type: 'get old',
						})
					)
				}
			},
		})
	}

	protected getStateFromProps() {
		this.state = {
			chats: {},
			chatActiveId: '',
			token: '',
			messages: '',
			webObj: '',
			socket: '',
			onCreate: () => {
				const inputChatTitle = this.element!.querySelector(
					'.general__input'
				) as HTMLInputElement
				if (inputChatTitle.value) {
					this.props.store.dispatch(chatAdd, {
						title: inputChatTitle.value,
					})
					const chatList = this.props.store.getState().chats
					const nextState = {
						chats: { ...chatList },
					}
					this.setState(nextState)
					this.state.errorChatTitle = ''
				} else {
					this.state.errorChatTitle = 'ВВедите имя чата'
				}
			},
			onProfile: () => {
				this.props.router.go('/profile')
			},
		}
	}

	render(): string {
		return `
			<div class="general">
					<div class="general__chats" >
						<div class="general__buttons">
							<div class="general__create-chat">
								{{{Button 
										class="general__profile" onClick=onCreate text="Создать чат"}}}
								{{{ControlledInput 
									class-controled="controlled-input general__chat-input"
									name="chat_title"
									class="general__input"
									type="text"
									placeholder="Имя чата"
									onFocus=onFocus
									onInput=onInput
									onBlur=onBlur
									ref="messageInputRefTitle"
									error=errorChatTitle
								}}}
							</div>
							{{{Button	class="general__profile" onClick=onProfile text="Профиль"}}}
						</div>
						<input type="text" class="general__search" placeholder="Поиск">

					{{{ChatList onClick=onClickChat}}}

					</div>
					<div class="general__active-chat">
							<div class="general__head">
									<div class="general__name"></div>
									{{{Button class="sign-btn" text="Добавить пользователя в чат ID" onClick=onAddUserChat}}}
							{{{ControlledInput 
									class-controled="controlled-input general__chat-input"
									name="chat_add-user"
									class="general__input-add"
									type="text"
									placeholder="ID пользователя"
									onFocus=onFocus
									onInput=onInput
									onBlur=onBlur
									ref="refIdUserAdd"
								}}}
							{{{Button class="sign-btn" text="Удалить пользователя из чата ID" onClick=onDeleteUserFromChat}}}		
							{{{ControlledInput 
									class-controled="controlled-input general__chat-input"
									name="chat_delete-user"
									class="general__input-delete"
									type="text"
									placeholder="ID пользователя"
									onFocus=onFocus
									onInput=onInput
									onBlur=onBlur
									ref="redIdUserDelete"
								}}}
									<div class="general__utils"></div>
							</div>
							<p class="general__date"></p>

							
								<div class="general__correspondence">
								{{#if messageList}}
									{{#each messageList}}
										<p class="general__message">{{content}}</p>
										<p class="general__time"></p>
									{{/each}}
								{{/if}}
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
