import input from 'components/input'
import { validateForm, ValidateType } from 'helpers/validateForm'
import Block from 'core/Block'

import './controlledInput.css'

interface ControlledInputProps {
	onInput?: () => void
	onFocus?: () => void
	type?: 'text' | 'password' | 'email'
	placeholder?: string
	value?: string
	error?: string
	name?: string
	label?: string
	class?: string
	active?: boolean
}

export class ControlledInput extends Block {
	static componentName = 'ControlledInput'
	constructor(props: ControlledInputProps) {
		super({
			...props,
			onBlur: (e: FocusEvent) => {
				const inputEl = e.target as HTMLInputElement
				const inputName = inputEl.getAttribute('name')
				if (
					inputName === 'password' ||
					inputName === 'password_old' ||
					inputName === 'password_new' ||
					inputName === 'password_verynew'
				) {
					const error = validateForm([
						{ type: ValidateType.Password, value: inputEl.value },
					])
					this.refs.errorRef.setProps({ text: error })
				}

				if (inputName === 'login') {
					const error = validateForm([
						{ type: ValidateType.Login, value: inputEl.value },
					])
					this.refs.errorRef.setProps({ text: error })
				}
				if (inputName === 'first_name') {
					const error = validateForm([
						{ type: ValidateType.FirstName, value: inputEl.value },
					])
					this.refs.errorRef.setProps({ text: error })
				}
				if (inputName === 'second_name') {
					const error = validateForm([
						{ type: ValidateType.SecondName, value: inputEl.value },
					])
					this.refs.errorRef.setProps({ text: error })
				}
				if (inputName === 'email') {
					const error = validateForm([
						{ type: ValidateType.Email, value: inputEl.value },
					])
					this.refs.errorRef.setProps({ text: error })
				}
				if (inputName === 'phone') {
					const error = validateForm([
						{ type: ValidateType.Phone, value: inputEl.value },
					])
					this.refs.errorRef.setProps({ text: error })
				}
				if (inputName === 'name_view') {
					const error = validateForm([
						{ type: ValidateType.Login, value: inputEl.value },
					])
					this.refs.errorRef.setProps({ text: error })
				}
			},
		})
	}

	protected render(): string {
		// language=hbs
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
					value=""
					ref="valueRef"
				}}}
				{{{Error ref="errorRef" text=error}}}
      </div>
    `
	}
}
