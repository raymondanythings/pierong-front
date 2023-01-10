import Pie_1 from './1.png'
import Pie_2 from './2.png'
import Pie_3 from './3.png'
import Pie_4 from './4.png'
import Pie_5 from './5.png'
import Pie_6 from './6.png'
import Pie_7 from './7.png'
import Pie_8 from './8.png'
import Pie_SIX_1 from './six1.png'
import Pie_SIX_2 from './six2.png'
import Pie_SIX_3 from './six3.png'
import Pie_SIX_4 from './six4.png'
import Pie_SIX_5 from './six5.png'
import Pie_SIX_6 from './six6.png'

import Plate from './plate.png'
import Plate_Small from './plate_small.png'
import Piece from './piece.png'
import CROWN from '../crown.png'
import GREEN_PAPER from './green-paper.png'
import WhitePaper from './white-paper.png'
import Books from './book.png'
import HowTo from './howTo.png'
import Arrow from './arrow-fave.png'
import { Pie } from 'types'

const Pies: { '8': Pie[]; '6': Pie[] } = {
	'8': [
		{ id: 0, src: Pie_1, width: 31, top: -29, left: 41.7 },
		{ id: 1, src: Pie_2, width: 50, top: -20.8, left: 43 },
		{ id: 2, src: Pie_3, width: 48, top: 16, left: 43 },
		{ id: 3, src: Pie_4, width: 32.5, top: 19.5, left: 41.7 },
		{ id: 4, src: Pie_5, width: 34, top: 20, left: 13.5 },
		{ id: 5, src: Pie_6, width: 50, top: 19, left: -6, z: 3 },
		{ id: 6, src: Pie_7, width: 48, top: -15.5, left: -4.5, z: 2 },
		{ id: 7, src: Pie_8, width: 28, top: -28, left: 15, z: 1 }
	],
	'6': [
		{ id: 0, src: Pie_SIX_1, width: 38, top: -18.8, left: 36, z: 2 },
		{ id: 1, src: Pie_SIX_2, width: 47.8, top: -8.1, left: 43.5 },
		{ id: 2, src: Pie_SIX_3, width: 43.5, top: 25.7, left: 42.7 },
		{ id: 3, src: Pie_SIX_4, width: 41, top: 25.5, left: 10 },
		{ id: 4, src: Pie_SIX_5, width: 47, top: 7.6, left: -4, z: 3 },
		{ id: 5, src: Pie_SIX_6, width: 42, top: -16.5, left: 1, z: 2 }
	]
}
const PIES = {
	Pies,
	Plate,
	CROWN,
	GREEN_PAPER,
	Piece,
	WhitePaper,
	Books,
	HowTo,
	Arrow,
	Plate_Small
}

export default PIES
