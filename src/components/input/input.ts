import Block from '../../core/Block'

import './input.css'

interface InputProps {
	onInput?: () => void
	onBlur?: () => void
	onFocus?: () => void
	type?: 'text' | 'password' | 'email'
	placeholder?: string
	name?: string
	value?: string
	class?: string
	active?: boolean
}

export class Input extends Block {
	static componentName = 'Input'
	constructor({ onBlur, onInput, onFocus, ...props }: InputProps) {
		super({
			...props,
			events: { input: onInput, focus: onFocus, blur: onBlur },
		})
	}

	protected render(): string {
		// language=hbs
		return `
			<input name="{{name}}" class="{{class}}" type="{{type}}" placeholder="{{placeholder}}" value="" ref="inRef" />
		`
	}
}