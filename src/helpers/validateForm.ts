export enum ValidateType {
	Login = 'login',
	Password = 'password',
	FirstName = 'first_name',
	SecondName = 'second_name',
	Email = 'email',
	Phone = 'phone',
	Messsage = 'message',
	NameView = 'name_view',
}

type ValidateRule = {
	type: ValidateType
	value: string
}

export function validateForm(rules: ValidateRule[]) {
	let errorMessage = ''

	for (let i = 0; i < rules.length; i++) {
		const { type, value } = rules[i]
		if (type === ValidateType.Login || type === ValidateType.NameView) {
			if (/^[A-z]([0-9A-z\-\_]){2,19}$/g.test(value) === false) {
				errorMessage =
					'3 - 20 символов. Латиница, цифры, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).'
				break
			} else {
				errorMessage = ''
			}
		} else if (type === ValidateType.Password) {
			if (!/(?=.*\d)(?=.*[A-Z]).{8,40}/g.test(value)) {
				errorMessage = `От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.`
				break
			} else {
				errorMessage = ''
			}
		} else if (
			type === ValidateType.FirstName ||
			type === ValidateType.SecondName
		) {
			if (!/(^[A-ZА-Я])+([A-zА-я\-])*$/g.test(value)) {
				errorMessage = `Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).`
				break
			} else {
				errorMessage = ''
			}
		} else if (type === ValidateType.Email) {
			if (!/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/g.test(value)) {
				errorMessage = `@ + домен`
				break
			} else {
				errorMessage = ''
			}
		} else if (type === ValidateType.Phone) {
			if (!/^[\0-9]\d{9,15}/g.test(value)) {
				errorMessage = `от 10 до 15 символов, состоит из цифр, может начинается с плюса`
				break
			} else {
				errorMessage = ''
			}
		} else if (type === ValidateType.Messsage) {
			if (value.length < 1) {
				errorMessage = `Поле не должно быть пустым`
				break
			} else {
				errorMessage = ''
			}
		}
	}
	return errorMessage
}
