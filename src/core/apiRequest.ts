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
	title?: string[]
}

/*
 Тип Omit принимает два аргумента: первый — тип, второй — строка
 и удаляет из первого типа ключ, переданный вторым аргументом*/
type OptionsWithoutMethod = Omit<Options, 'method'>
/*Этот тип эквивалентен следующему:
 type OptionsWithoutMethod = { data?: any };
*/

const path = `${process.env.API_ENDPOINT}/`
export default class HTTPTransport {
	get<T extends any>(
		url: string
		//options: OptionsWithoutMethod = {}
	): Promise<T> {
		return this.request(url, {
			//...options,
			method: METHODS.GET,
		})
	}

	put(
		url: string,
		options: OptionsWithoutMethod = {}
	): Promise<XMLHttpRequest> {
		return this.request(url, { ...options, method: METHODS.PUT })
	}

	post(
		url: string,
		options: OptionsWithoutMethod = {}
	): Promise<XMLHttpRequest> {
		return this.request(url, { ...options, method: METHODS.POST })
	}

	delete(
		url: string,
		options: OptionsWithoutMethod = {}
	): Promise<XMLHttpRequest> {
		return this.request(url, { ...options, method: METHODS.DELETE })
	}

	request(url: string, options: Options): any {
		const { method, data, title } = options
		console.log(method, data)
		return new Promise((resolve, reject): any => {
			const xhr = new XMLHttpRequest()
			url = path + url
			xhr.open(method, url)

			xhr.onload = function () {
				resolve(xhr.response)
			}

			xhr.onabort = reject
			xhr.onerror = reject
			xhr.ontimeout = reject

			xhr.responseType = 'json'
			xhr.withCredentials = true
			xhr.setRequestHeader('Content-Type', 'application/json;')

			if (
				method ===
					(METHODS.GET || METHODS.POST || METHODS.DELETE || METHODS.PUT) ||
				!data
			) {
				xhr.send()
			} else {
				xhr.send(JSON.stringify(data))
			}
		})
	}
}
