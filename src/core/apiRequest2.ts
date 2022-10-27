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

// Тип Omit принимает два аргумента: первый — тип, второй — строка
// и удаляет из первого типа ключ, переданный вторым аргументом
type OptionsWithoutMethod = Omit<Options, 'method'>
// Этот тип эквивалентен следующему:
// type OptionsWithoutMethod = { data?: any };

export default class HTTPTransport {
	get(
		url: string,
		options: OptionsWithoutMethod = {}
	): Promise<XMLHttpRequest> {
		return this.request(url, {
			...options,
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

	request(url: string, options: Options): Promise<XMLHttpRequest> {
		const { method, data, title } = options

		//console.log(method, data)
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()
			xhr.open(method, url)

			xhr.onload = function () {
				resolve(xhr)
			}

			xhr.onabort = reject
			xhr.onerror = reject
			xhr.ontimeout = reject

			if (
				method ===
					(METHODS.GET || METHODS.POST || METHODS.DELETE || METHODS.PUT) ||
				!data
			) {
				xhr.send()
			} else {
				xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
				xhr.send(JSON.stringify(data))
				//console.log(JSON.stringify(data))
			}
		})
	}
}
