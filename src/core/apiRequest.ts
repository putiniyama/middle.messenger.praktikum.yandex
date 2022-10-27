const sleep = (ms: number = 300) => new Promise(res => setTimeout(res, ms))

/**
 * @warning В работе нужно использовать классовый подход и самописный HttpTransport
 * @see https://practicum.yandex.ru/learn/middle-frontend/courses/d0b6060f-550a-4fe8-bc01-3496013f7260/sprints/18176/topics/b8f31bf4-5dc3-4b69-8689-9e50e8a70921/lessons/83244899-b95f-409c-a634-2e0bc8f944e7/
 */
export function request<T extends any>({
	method,
	path,
	data,
}: any): Promise<T> {
	return sleep().then(() =>
		fetch(`${process.env.API_ENDPOINT}/${path}`, {
			method,
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: data ? JSON.stringify(data) : null,
		})
			.then(response => {
				const isJson = response.headers
					.get('content-type')
					?.includes('application/json')
				//console.log(response.json())
				return isJson ? response.json() : null
			})
			.then(data => {
				return data as unknown as T
			})
	)
}

request.post = <T>(path: string, data?: any) =>
	request<T>({ method: 'POST', path, data })
request.get = <T>(path: string) => request<T>({ method: 'GET', path })

// export const METHODS = {
// 	GET: 'GET',
// 	POST: 'POST',
// 	PUT: 'PUT',
// 	PATCH: 'PATCH',
// 	DELETE: 'DELETE',
// } as const

// type Options = {
// 	method: typeof METHODS[keyof typeof METHODS]
// 	data?: any
// 	title?: string[]
// }

// // Тип Omit принимает два аргумента: первый — тип, второй — строка
// // и удаляет из первого типа ключ, переданный вторым аргументом
// type OptionsWithoutMethod = Omit<Options, 'method'>
// // Этот тип эквивалентен следующему:
// // type OptionsWithoutMethod = { data?: any };

// export default class HTTPTransport {
// 	get(
// 		url: string,
// 		options: OptionsWithoutMethod = {}
// 	): Promise<XMLHttpRequest> {
// 		return this.request(url, {
// 			...options,
// 			method: METHODS.GET,
// 		})
// 	}

// 	put(
// 		url: string,
// 		options: OptionsWithoutMethod = {}
// 	): Promise<XMLHttpRequest> {
// 		return this.request(url, { ...options, method: METHODS.PUT })
// 	}

// 	post(
// 		url: string,
// 		options: OptionsWithoutMethod = {}
// 	): Promise<XMLHttpRequest> {
// 		return this.request(url, { ...options, method: METHODS.POST })
// 	}

// 	delete(
// 		url: string,
// 		options: OptionsWithoutMethod = {}
// 	): Promise<XMLHttpRequest> {
// 		return this.request(url, { ...options, method: METHODS.DELETE })
// 	}

// 	request(url: string, options: Options): Promise<XMLHttpRequest> {
// 		const { method, data, title } = options

// 		//console.log(method, data)
// 		return new Promise((resolve, reject) => {
// 			const xhr = new XMLHttpRequest()
// 			xhr.open(method, url)

// 			xhr.onload = function () {
// 				resolve(xhr)
// 			}

// 			xhr.onabort = reject
// 			xhr.onerror = reject
// 			xhr.ontimeout = reject

// 			if (
// 				method ===
// 					(METHODS.GET || METHODS.POST || METHODS.DELETE || METHODS.PUT) ||
// 				!data
// 			) {
// 				xhr.send()
// 			} else {
// 				xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
// 				xhr.send(JSON.stringify(data))
// 				//console.log(JSON.stringify(data))
// 			}
// 		})
// 	}
// }
