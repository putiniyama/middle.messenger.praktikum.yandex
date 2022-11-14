/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-undef */
import { validateForm } from '../helpers/validateForm'

test('Проверка невалидированного ввода пароля', () => {
	expect(validateForm([{type: 'password', value: 'asdasd'}])).toMatch(/От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра./);
})

test('Проверка валидированного ввода пароля', () => {
	expect(validateForm([{type: 'password', value: 'asdsdKJKJ234'}])).toMatch("");
})

test('Проверка невалидированного ввода логина', () => {
	expect(validateForm([{type: 'login', value: '12'}])).toMatch(/3 - 20 символов. Латиница, цифры, без пробелов, без спецсимволов/);
})

test('Проверка валидированного ввода логина', () => {
	expect(validateForm([{type: 'login', value: 'Aasd'}])).toMatch("");
})
