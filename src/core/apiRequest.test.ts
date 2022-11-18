import HTTPTransport from './apiRequest';

describe('core/apiRequest', () => {
	test('должны вернуться невалидные пароль и логин', async () => {
		const http = new HTTPTransport();
		const res = await http.post('auth/signin',{ data: { login: 'asd', password: 'asdasd' }})
		expect(res).toEqual({reason: 'Login or password is incorrect'})
	})
})



