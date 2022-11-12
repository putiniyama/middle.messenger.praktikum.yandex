import input from 'components/input'
import chat from 'components/chat'
import { validateForm, ValidateType } from '../../helpers/validateForm'
import { refErrors } from '../../helpers/refErrors'
import { onEvents } from '../../helpers/events'
import { withStore, withRouter, withChats } from '../../utils/'
import { CoreRouter, Store, Block } from '../../core'
import {
	chatAdd,
	chatAddUser,
	chatDelete,
	chatDeleteUser,
	chatGetUser,
	chatGetToken,
	chats,
} from '../../services/auth'
import cloneDeep from '../../utils/cloneDeep'
import { authAPI } from '../../api/auth'

import "./chats.css"

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
	onAddChat: () => any
	onCancel: () => void
	onDots: () => void
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
					try {
						this.props.store.dispatch(chatDelete, {
						chatId: elemIdChat,
					})
					} catch (error) {
						console.log(error)
					}
				} else if (elemChat.className != 'general__item-wastebasket') {
					this.state.chatActiveId = elemIdChat
					//делаем запрос на пользователей в чате
					try {
						this.props.store.dispatch(chatGetUser, elemIdChat)
					} catch (error) {
						console.log(error)
					}
					//делаем запрос на токен
					try {
						this.state.token = await authAPI.chatGetToken(elemIdChat)
					} catch (error) {
						console.log(error)
					}
					//работаем  вебсокетами
					this.state.webObj = {
						userId: this.props.store.getState().user?.id!,
						chatId: elemIdChat,
						token: this.state.token.token,
					}
					
					this.state.socket = new WebSocket(
						`wss://ya-praktikum.tech/ws/chats/${this.state.webObj.userId}/${this.state.webObj.chatId}/${this.state.webObj.token}`
					)

					if (this.state.socket.onerror) {
						console.log("error websocket")
					}
					else {
						this.state.socket.addEventListener('open', () => {
						console.log('Соединение установлено')
						try {
							this.state.socket.send(
							JSON.stringify({
								content: '0',
								type: 'get old',
							})
						)
						} catch (error) {
							console.log(error)
						}
						this.props.store.dispatch({ isLoading: true })
					})

					this.state.socket.addEventListener('message', (event: { data: string }) => {
						try {
							this.state.messages = JSON.parse(event.data)
						} catch (error) {
							console.log(this.state.messages = JSON.parse(event.data))
						}
						this.props.store.dispatch({ isLoading: false })
					})
					}

					
					
				}
			},

			onAddChat: () => {
				const btnAddChat = <HTMLButtonElement>this.element!.querySelector('.general__addchat-btn')
				const addChatModal = <HTMLFormElement>this.element!.querySelector('.general__addchat')

				btnAddChat!.addEventListener('click', () => {
					addChatModal!.style.display = 'flex'
				})

			},

			onCancel: () => {
				const addChatModal = <HTMLFormElement>this.element!.querySelector('.general__addchat')
				const dotsModal = <HTMLDivElement>this.element!.querySelector('.general__chatdots')
					addChatModal!.style.display = 'none'
					dotsModal!.style.display = 'none'
			},

			onDots: () => {
				const dotsModal = <HTMLDivElement>this.element!.querySelector('.general__chatdots')
				dotsModal!.style.display = 'flex'
			},



			onAddUserChat: () => {
				const inputAddUser = this.element!.querySelector(
					'.general__input-user'
				) as HTMLInputElement
				const requestObjAddUser = {
					users: [parseInt(inputAddUser.value)],
					chatId: this.state.chatActiveId,
				}
				try {
					this.props.store.dispatch(chatAddUser, requestObjAddUser)
				} catch (error) {
					console.log(error)
				}
			},

			onDeleteUserFromChat: () => {
				const inputDeleteUser = this.element!.querySelector(
					'.general__input-user'
				) as HTMLInputElement
				const requestObjAddUser = {
					users: [parseInt(inputDeleteUser.value)],
					chatId: this.state.chatActiveId,
				}
				try {
					this.props.store.dispatch(chatDeleteUser, requestObjAddUser)
				} catch (error) {
					console.log(error)
				}
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
				if (!error && this.state.chatActiveId) {
					errors.push(null)
					try {
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
					} catch (error) {
						console.log(error)
					}
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
				if (inputChatTitle.value.length > 0) {
					try {
						this.props.store.dispatch(chatAdd, {
						title: inputChatTitle.value,
					})
					} catch (error) {
						console.log(error)
					}
					const chatList = this.props.store.getState().chats
					const nextState = {
						chats: { ...chatList },
					}
					this.setState(nextState)
					this.state.errorChatTitle = ''
					const addChatModal = <HTMLFormElement>this.element!.querySelector('.general__addchat')
					addChatModal!.style.display = 'none'
				} else {
					this.state.errorChatTitle = 'ВВедите имя чата'
					const addChatModal = <HTMLFormElement>this.element!.querySelector('.general__addchat')
					addChatModal!.style.display = 'flex'
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
					<div class="general__head-chat">
						{{{Button class="general__btn general__addchat-btn" onClick=onAddChat text="Создать чат"}}}
						{{{Button	class="general__profile" onClick=onProfile text="Профиль"}}}
					</div>
					<input type="text" class="general__search" placeholder="Поиск">
					<div class="general__line"></div>
					{{{ChatList onClick=onClickChat}}}
				</div>
				<div class="general__active-chat">
					<div class="general__head">
						{{{Button	class="general__dots" onClick=onDots}}}
						<div class="general__name"></div>
					</div>	
					<div class="general__chat-window">
						<p class="general__date"></p>
						<div class="general__utils"></div>
						<div class="general__correspondence">
						{{#if messageList}}
							{{#each messageList}}
								<p class="general__message">{{content}}</p>
								<p class="general__time"></p>
							{{/each}}
						{{/if}}
						</div>
					</div>
					<form class="general__send">
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
						{{{Button class="general__btn" text="Отправить" onClick=onSend}}}
					</form>
				</div>
				
				<form class="general__addchat">
					<p class="general__addchat-title">Название чата</p>
					{{{ControlledInput 
						class-controled="general__chat-input"
						name="chat_title"
						class="general__input"
						type="text"
						placeholder="Имя чата"
						onFocus=onFocus
						onInput=onInput
						onBlur=onBlur
					}}}
					{{{Button class="general__btn" onClick=onCreate text="ОК"}}}
					{{{Button class="general__btn" onClick=onCancel text="Отмена"}}}
				</form>
				

				<div class="general__chatdots">
					<p class="general__chatdots-title">Добавить/удалить пользователя</p>
					{{{ControlledInput 
							class-controled="controlled-input general__chat-input"
							name="chat_add-user"
							class="general__input general__input-user"
							type="text"
							placeholder="ID пользователя"
							onFocus=onFocus
							onInput=onInput
							onBlur=onBlur
							ref="refIdUserAdd"
						}}}
						{{{Button class="general__btn" text="Добавить пользователя" onClick=onAddUserChat}}}
						{{{Button class="general__btn" text="Удалить пользователя" onClick=onDeleteUserFromChat}}}	
						{{{Button class="general__btn" onClick=onCancel text="Отмена"}}}
				</div>
			</div>
		`
	}
}

const ChatsPage = withRouter(withStore(ChatsPageN))
export { ChatsPage }
