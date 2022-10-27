import { refErrors } from './refErrors'
import { onEvents } from './events'

export function validAllForm(inputs: any, context: any) {
	let errors: null[] = []

	for (let i = 0; i < inputs.length; i++) {
		const inputEl = <HTMLInputElement>inputs[i]
		const inputName = <string>inputEl.getAttribute('name')
		const error = onEvents(inputEl, inputName)
		refErrors(inputName, context, error)
		if (!error) {
			errors.push(null)
		}
	}

	if (errors.length == inputs.length) {
		return true
	} else {
		return false
	}
}
