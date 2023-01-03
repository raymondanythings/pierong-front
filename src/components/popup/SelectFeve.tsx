import { PieApi } from 'api'
import { useQuery } from 'react-query'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { FC, useState } from 'react'
import { Feve } from 'types/Response'

interface SelectFeveProps {
	onSelect: (data?: any) => void
}

const SelectFeve: FC<SelectFeveProps> = ({ onSelect }) => {
	const { data: { data = [] } = {} } = useQuery(['feve', 'list'], PieApi.getFeveList, {
		staleTime: Infinity,
		cacheTime: Infinity
	})
	const [selected, setSelected] = useState<Feve | null>(null)

	return (
		<div className="px-4 flex flex-col relative">
			<div className="flex flex-col space-y-3">
				<h1 className="font-bold text-center">파이에 넣을 페브를 선택해주세요.</h1>
				<section className="grid grid-cols-4 gap-4 border border-dashed rounded-lg p-4">
					{data.map((item) => (
						<motion.div key={item.feveId} onClick={() => setSelected(item)} layoutId={item.feveId} className="min-w-[50px]">
							<img className="aspect-square" src={`/image/feve/${item.feveId}.png`} />
						</motion.div>
					))}
				</section>
			</div>
			<AnimatePresence>
				{selected ? (
					<motion.div
						layout
						className="fixed flex flex-col bg-transparent top-0 left-0 w-full h-full mt-0 justify-center items-center p-8"
					>
						<div className="w-full h-full -z-[1] absolute top-0 left-0" onClick={() => setSelected(null)} />
						<motion.div className="flex-col w-4/5 min-h-[150px] rounded-2xl bg-mainTeal p-2 flex justify-center items-stretch border-black border border-solid relative">
							<div className="absolute w-12 h-12 bg-mainTeal -top-6 rounded-full border-black border border-solid p-1 flex items-stretch left-1/2 -translate-x-1/2">
								<div className="bg-mainBeige border-black border border-solid flex justify-center items-center grow rounded-full">
									<img src="/image/icon/info.png" className="w-3/4 max-w-[23px] max-h-[23px]" />
								</div>
							</div>
							<div className="grow rounded-2xl flex  flex-col items-center bg-mainBeige border-black border border-solid py-5 overflow-y-scroll max-h-[calc(var(--vh,1vh)_*_80)] p-4 space-y-4">
								<h1 className="font-bold text-lg">{selected.feveName}</h1>
								<div className="border border-dashed p-3 rounded-lg">
									<motion.div layoutId={selected.feveId} className="">
										<motion.img
											className="drop-shadow-2xl"
											whileTap={{
												rotateY: 180
											}}
											style={{
												perspective: '1000px',
												transformStyle: 'preserve-3d'
											}}
											src={`/image/feve/${selected.feveId}.png`}
										/>
									</motion.div>
								</div>
								<h3 className="font-bold text-sm">{selected.feveDescription}</h3>
								<div className="space-x-2">
									<button className="modal-btn" onClick={() => onSelect(selected.feveId)}>
										선택
									</button>
									<button className="modal-btn" onClick={() => setSelected(null)}>
										취소
									</button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	)
}

export default SelectFeve
