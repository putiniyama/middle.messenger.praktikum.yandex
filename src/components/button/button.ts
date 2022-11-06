import Block from '../../core/Block'
// import template from 'bundle-text:./template.hbs';

import './button.css'

interface ButtonProps {
	text: string
	class: string[]
	onClick: () => void
}

export class Button extends Block {
	static componentName = 'Button'
	constructor({ onClick, ...props }: ButtonProps) {
		super({ ...props, events: { click: onClick } })
	}

	protected render(): string {
		return `
				<button name="{{name}}" class="{{class}}">{{text}}</button>
		`
	}
}
