function cloneDeep<T extends object = object>(obj: T) {
	if (isArrayOrObject(obj)) {
		if (isArray(obj)) {
			const clObj: any = []
			obj.forEach(value => {
				if (!isArrayOrObject(value)) {
					clObj.push(value)
				} else {
					clObj.push(cloneDeep(value))
				}
			})
			return clObj
		}

		if (isPlainObject(obj)) {
			const clObj: any = {}
			for (const [key, value] of (<any>Object).entries(obj)) {
				if (isPlainObject(value)) {
					clObj[key] = cloneDeep(value)
					continue
				}
				clObj[key as keyof object] = value
			}
			return clObj
		}
	} else {
		console.log(obj)
	}
}

export default cloneDeep


export function isArray(value: unknown): value is [] {
	return Array.isArray(value)
}

type PlainObject<T = unknown> = {
	[k in string]: T
}

export function isPlainObject(value: unknown): value is PlainObject {
	return (
		typeof value === 'object' &&
		value !== null &&
		value.constructor === Object &&
		Object.prototype.toString.call(value) === '[object Object]'
	)
}

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
	return isPlainObject(value) || isArray(value)
}
