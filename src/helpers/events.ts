import { ValidateType, validateForm } from './validateForm'

export function onEvents(inputEl: HTMLInputElement, inputName: string) {
	if (
		inputName === 'password' ||
		inputName === 'password_old' ||
		inputName === 'password_new' ||
		inputName === 'password_verynew'
	) {
		const error = validateForm([
			{ type: ValidateType.Password, value: inputEl.value },
		])
		return error
	}

	if (inputName === 'login') {
		const error: string = validateForm([
			{ type: ValidateType.Login, value: inputEl.value },
		])
		return error
	}
	if (inputName === 'first_name') {
		const error = validateForm([
			{ type: ValidateType.FirstName, value: inputEl.value },
		])
		return error
	}
	if (inputName === 'second_name') {
		const error = validateForm([
			{ type: ValidateType.SecondName, value: inputEl.value },
		])
		return error
	}
	if (inputName === 'email') {
		const error = validateForm([
			{ type: ValidateType.Email, value: inputEl.value },
		])
		return error
	}
	if (inputName === 'phone') {
		const error = validateForm([
			{ type: ValidateType.Phone, value: inputEl.value },
		])
		return error
	}
	if (inputName === 'name_view') {
		const error = validateForm([
			{ type: ValidateType.Login, value: inputEl.value },
		])
		return error
	}

	if (inputName === 'message') {
		const error = validateForm([
			{ type: ValidateType.Messsage, value: inputEl.value },
		])
		return error
	}
}
