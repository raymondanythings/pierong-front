import Pie_1 from './1.png'
import Pie_2 from './2.png'
import Pie_3 from './3.png'
import Pie_4 from './4.png'
import Pie_5 from './5.png'
import Pie_6 from './6.png'
import Pie_7 from './7.png'
import Pie_8 from './8.png'
import Plate from './plate.png'
import Piece from './piece.png'
import CROWN from '../crown.png'
import GREEN_PAPER from './green-paper.png'
import WhitePaper from './white-paper.png'
import Books from './book.png'
import HowTo from './howTo.png'
import Arrow from './arrow-fave.png'
import { Pie } from 'types'

const Pies: Pie[] = [
	{ id: 1, src: Pie_1, width: 31, top: -38, left: 41.7 },
	{ id: 2, src: Pie_2, width: 50, top: -29.8, left: 43 },
	{ id: 3, src: Pie_3, width: 48, top: 7, left: 43 },
	{ id: 4, src: Pie_4, width: 32.5, top: 10.5, left: 41.7 },
	{ id: 5, src: Pie_5, width: 34, top: 11, left: 13.5 },
	{ id: 6, src: Pie_6, width: 50, top: 10, left: -6, z: 3 },
	{ id: 7, src: Pie_7, width: 48, top: -24.5, left: -4.5, z: 2 },
	{ id: 8, src: Pie_8, width: 28, top: -37, left: 15, z: 1 }
]
const PIES = {
	Pies,
	Plate,
	CROWN,
	GREEN_PAPER,
	Piece,
	WhitePaper,
	Books,
	HowTo,
	Arrow
}

export default PIES
