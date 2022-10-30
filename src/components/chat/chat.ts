import Block from '../../core/Block'
import './chat.css'

interface ChatProps {
	title: string
	text: string
	onClick: () => void
}

export class Chat extends Block {
	static componentName = 'Chat'
	constructor({ text, title, onClick }: ChatProps) {
		super({ title, text, events: { click: onClick } })
	}

	protected render(): string {
		return `
			<li class="general__item">
					<div class="general__item-photo">
							<img src="#" alt="gia" class="general__item-avatar">
					</div>
					<div class="general__item-info">
							<p class="general__item-title">{{title}}</p>
							<p class="general__item-text">{{text}}</p>
					</div>
			</li>
		`
	}
}
