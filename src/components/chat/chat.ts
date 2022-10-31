import Block from '../../core/Block'
import './chat.css'

interface ChatProps {
	title: string
	text: string
	onClick: string
	id: number
}

export class Chat extends Block {
	static componentName = 'Chat'
	constructor(props: ChatProps) {
		super({ ...props, events: { click: props.onClick } })
	}

	protected render(): string {
		return `
			<li class="general__item" id={{id}} >
					<div class="general__item-photo">
							<img src="#" alt="gia" class="general__item-avatar">
					</div>
					<div class="general__item-info">
							<p class="general__item-title">{{title}}</p>
							<p class="general__item-text">{{text}}</p>
							<img src="https://cdn-icons-png.flaticon.com/512/3156/3156999.png" class="general__item-wastebasket">
					</div>
			</li>
		`
	}
}
