export const METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
} as const

type Options = {
	method: typeof METHODS[keyof typeof METHODS]
	data?: any
	title?: string
}

/*
 Тип Omit принимает два аргумента: первый — тип, второй — строка
 и удаляет из первого типа ключ, переданный вторым аргументом*/
type OptionsWithoutMethod = Omit<Options, 'method'>
/*Этот тип эквивалентен следующему:
 type OptionsWithoutMethod = { data?: any };
*/

type HTTPMethod = <T extends any>(url: string, options?: OptionsWithoutMethod) => Promise<T>

const path = `${process.env.API_ENDPOINT}/`
export default class HTTPTransport {
	get: HTTPMethod = (url, options = {}) => (
    this.request(url, {...options, method: METHODS.GET})
  )

	put: HTTPMethod = (url, options = {}) => (
    this.request(url, {...options, method: METHODS.PUT})
  )

	post: HTTPMethod = (url, options = {}) => (
    this.request(url, {...options, method: METHODS.POST})
  )

	delete: HTTPMethod = (url, options = {}) => (
    this.request(url, {...options, method: METHODS.DELETE})
  )

	request(url: string, options: Options): any {
		const { method, data, title } = options
		return new Promise((resolve, reject): any => {
			console.log(data)
			const xhr = new XMLHttpRequest()
			url = path + url
			xhr.open(method, url)
			xhr.onload = function () {
				resolve(xhr.response)
				console.log(xhr.response)
			}

			xhr.onabort = reject
			xhr.onerror = reject
			xhr.ontimeout = reject

			xhr.responseType = 'json'
			xhr.withCredentials = true

			if (
				method ===
					(METHODS.GET ||
						METHODS.POST ||
						(!(data instanceof FormData) && METHODS.PUT)) ||
				!data
			) {
				xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
				xhr.send()
			} else if (data instanceof FormData && METHODS.PUT) {
				xhr.send(data)
			} else if (METHODS.DELETE) {
				xhr.setRequestHeader('Content-type', 'application/json')
				xhr.send(JSON.stringify(data))
			} else {
				xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
				xhr.send(JSON.stringify(data))
			}
		})
	}
}
