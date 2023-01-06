const urlSafebtoa = (url: string): string => {
	return btoa(url).replace(/=/g, '')
}
const numberToKr = ['한', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉']
const ordinalKrTen = ['열', '스물', '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔']
const ordinalKrHonnit = ['일백', '이백', '삼백', '사백', '오백', '육백', '칠백', '팔백', '구백']

const ordinalList = [numberToKr, ordinalKrTen, ordinalKrHonnit]

function getIndex(num: number) {
	const targetString = (num + '').split('').reverse()
	const parsedString = targetString.map((item, index) => {
		return ordinalList[index][+item - 1]
	})

	return parsedString.reverse().join('') + '번째'
}

const formatOrdianl = (num: number) => {
	if (num === 1) {
		return '첫번째'
	}
	return getIndex(num)
}
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

export { urlSafebtoa, numberToKr, formatDate, formatOrdianl }
