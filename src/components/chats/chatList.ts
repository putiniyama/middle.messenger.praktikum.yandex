import cloneDeep from '../../utils/cloneDeep'
import { CoreRouter, Store, Block } from '../../core/index'
import { withStore } from '../../utils/index'

interface ChatListProps {
	router: CoreRouter
	store: Store<AppState>
	title: string
	text: string			
	id: number
	avatar: string
	chatsList?: () => any
	onClick?: () => any
	events: Indexed;
}

export class ChatListN extends Block<ChatListProps> {
	static componentName = 'ChatList'

	constructor({ onClick, ...props }: ChatListProps) {
		super(props)

		this.setProps({
			chatsList: () => cloneDeep(this.props.store.getState().chats!),
			events: { click: onClick },
		})
	}

	protected render(): string {
		return `
      <ul class="general__items">
				{{#each chatsList}}
						{{{Chat id=id text="" title=title src=avatar}}}
				{{/each}}
			</ul>
    `
	}
}
const ChatList = withStore(ChatListN)
export { ChatList }
