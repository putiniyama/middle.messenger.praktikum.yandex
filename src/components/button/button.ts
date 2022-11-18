import Block from '../../core/Block'
// import template from 'bundle-text:./template.hbs';

// import './button.css'

interface ButtonProps {
	text: string
	class?: string[]
	onClick?: () => void
	events?: Indexed;
}

export class Button extends Block<ButtonProps> {
	static componentName = 'Button'
	constructor({ onClick, ...props }: ButtonProps) {
		super(props)

		this.setProps({
			events: {click: onClick}
		})
	}

	protected render(): string {
		return `
				<button name="{{name}}" class="{{class}}">{{text}}</button>
		`
	}
}
