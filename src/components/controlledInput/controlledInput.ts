import { Block } from '../../core/index'
import { onEvents } from '../../helpers/events'

import './controlledInput.css'

interface ControlledInputProps {
	type?: 'text' | 'password' | 'email'
	placeholder?: string
	value?: string
	error?: string
	name?: string
	label?: string
	class?: string[]
	active?: boolean
}

export class ControlledInput extends Block {
	static componentName = 'ControlledInput'

	constructor(props: ControlledInputProps) {
		super({
			...props,
			onBlur: (e: FocusEvent) => {
				const inputEl = <HTMLInputElement>e.target
				const inputName = <string>inputEl.getAttribute('name')
				const error = onEvents(inputEl, inputName)
				const errorText = <any>this.element!.querySelector('.error') 
				errorText.textContent = error;
			},

			onFocus: (e: FocusEvent) => {
				const inputEl = <HTMLInputElement>e.target
				const inputName = <string>inputEl.getAttribute('name')
				const error = onEvents(inputEl, inputName)
				const errorText = <any>this.element!.querySelector('.error') 
				errorText.textContent = error;
			},

			onInput: (e: InputEvent) => {
				const inputEl = <HTMLInputElement>e.target
				const inputName = <string>inputEl.getAttribute('name')
				const error = onEvents(inputEl, inputName)
				const errorText = <any>this.element!.querySelector('.error') 
				errorText.textContent = error;
			},
		})
	}

	protected render(): string {
		return `
      <div class="{{class-controled}}">
        {{{Input
					name="{{name}}"
					type="{{type}}"
					placeholder="{{placeholder}}"
					class="{{class}}"
					onFocus=onFocus
					onInput=onInput
					onBlur=onBlur
					value=value
					ref="valueRef"
				}}}
				{{{Error ref="errorRef" text=error}}}
      </div>
    `
	}
}
