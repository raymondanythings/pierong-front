import Pie_1 from './1.png'
import Pie_2 from './2.png'
import Pie_3 from './3.png'
import Pie_4 from './4.png'
import Pie_5 from './5.png'
import Pie_6 from './6.png'
import Pie_7 from './7.png'
import Pie_8 from './8.png'
import Dish from '../pie_s/plate.png'
import CROWN from '../crown.png'
const Pies: { src: string; width: number; top: number; left: number }[] = [
	{ src: Pie_1, width: 34, top: 4, left: 38.7 },
	{ src: Pie_2, width: 33, top: 5, left: 7 },
	{ src: Pie_3, width: 55, top: 15.7, left: -15 },
	{ src: Pie_4, width: 55, top: 11, left: 39 },
	{ src: Pie_5, width: 55, top: 39, left: 39 },
	{ src: Pie_6, width: 36, top: 43.5, left: 38.3 },
	{ src: Pie_7, width: 55, top: 43, left: -15 },
	{ src: Pie_8, width: 37, top: 43, left: 6 }
]
const PIES = {
	Pies,
	Dish,
	CROWN
}

export default PIES
