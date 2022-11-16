import { PathRouter } from '../../core'
import { Store} from '../../core'

describe('core/PathRouter', () => {
	const rout = new PathRouter()
		const mock = jest.fn();
		rout.use('/login', mock).use('/onboarding', mock).use('/signin', mock)
		rout.go('/signin') //+1
		rout.go('/login') //+2
		rout.back() //+3
	test('должна совпасть длина истории', () => {
		expect(window.history.length).toBe(3)
	})

	test ('должна вернуть корректность url', () => {
		expect(window.location.pathname).toEqual('/login')
	})
})
