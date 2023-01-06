const urlSafebtoa = (url: string): string => {
	return btoa(url).replace(/=/g, '')
}
const numberToKr = ['첫번째', '두번째', '세번째', '네번째', '다섯번째']

const formatDate = (date: string) => {
	const koDtf = new Intl.DateTimeFormat('ko')
	const result = koDtf
		.format(new Date(date))
		.split(' ')
		.map((item) => {
			if (item.length === 2) {
				return '0' + item
			}
			return item
		})
		.join('')
	return result
}

export { urlSafebtoa, numberToKr, formatDate }
