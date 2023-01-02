const urlSafebtoa = (url: string): string => {
	return btoa(url).replace(/=/g, '')
}

export { urlSafebtoa }
