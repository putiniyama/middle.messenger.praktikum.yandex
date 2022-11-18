import Block from '../../core/Block'
import './chat.css'

interface ChatProps {
	title: string
	text: string
	id: number
	avatar: string
}

export class Chat extends Block<ChatProps> {
	static componentName = 'Chat'
	constructor(props: ChatProps) {
		super({ ...props })
	}


	protected render(): string {
		return `
			<li class="general__item" id={{id}} >
					<div class="general__item-info">
							<p class="general__item-title">{{title}}</p>
							<p class="general__item-text">Последнее сообщение</p>
							<img src="https://cdn-icons-png.flaticon.com/512/3156/3156999.png" alt="wastebasket" class="general__item-wastebasket">
					</div>
			</li>
		`
	}
}
