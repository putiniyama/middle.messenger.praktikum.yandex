import Block from '../../core/Block'
import './chat.css'

interface ChatProps {
	title: string
	text: string
	id: number
}

export class Chat extends Block {
	static componentName = 'Chat'
	constructor(props: ChatProps) {
		super({ ...props })
	}

	protected render(): string {
		return `
			<li class="general__item" id={{id}} >
					<img src="https://klike.net/uploads/posts/2019-03/1551511801_1.jpg" alt="photo" class="general__item-avatar">
					<div class="general__item-info">
							<p class="general__item-title">{{title}}</p>
							<p class="general__item-text">Последнее сообщение</p>
							<img src="https://cdn-icons-png.flaticon.com/512/3156/3156999.png" alt="wastebasket" class="general__item-wastebasket">
					</div>
			</li>
		`
	}
}
