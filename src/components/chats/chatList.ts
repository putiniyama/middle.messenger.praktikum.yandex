import cloneDeep from 'utils/cloneDeep'
import { CoreRouter, Store, Block } from 'core'
import { withStore, withRouter, withChats } from 'utils'

interface ChatListProps {
	router: CoreRouter
	store: Store<AppState>
	title: string
	text: string
	id: number
	chatsList?: () => any
	onClick: () => any
}

export class ChatListN extends Block {
	static componentName = 'ChatList'

	constructor({ onClick, ...props }: ChatListProps) {
		super({
			...props,
			events: { click: onClick },
		})

		this.setProps({
			chatsList: () => cloneDeep(this.props.store.getState().chats!),
		})
	}

	protected render(): string {
		return `
      <ul class="general__items">
				{{#each chatsList}}
						{{{Chat id=id text="" title=title }}}
				{{/each}}
			</ul>
    `
	}
}
const ChatList = withStore(ChatListN)
export { ChatList }
