/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			dropShadow: {
				bottom: '5px 8px 6px rgba(0, 0, 0, 0.8)'
			},
			transitionProperty: {
				width: 'max-width'
			},
			backgroundImage: {
				main: 'url("https://wallpaperaccess.com/full/57166.jpg")'
			},
			screens: {
				default: '480px'
			},
			colors: {
				mainTeal: '#57765E',
				mainBeige: '#eae6da'
			},
			fontFamily: {
				main: ['cookie', 'kreon', 'kyobo', 'sans-serif']
			},
			height: {
				screen: 'calc(var(--vh, 1vh) * 100)'
			}
		}
	},
	plugins: []
}
