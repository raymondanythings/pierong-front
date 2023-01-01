import { ReactNode } from 'react'
import { motion, Variants } from 'framer-motion'

const Wrapper = ({ children }: { children: ReactNode }) => {
	return <span className="word-wrapper">{children}</span>
}
const AnimatedText = ({ className, text }: { className?: string; text: string }) => {
	const item: Variants = {
		hidden: {
			y: '200%',
			transition: { duration: 0.5, type: 'spring', damping: 15 }
		},
		visible: {
			y: 0,
			transition: { duration: 0.5, type: 'spring', bounce: 0.5, stiffness: 85 }
		}
	}

	const splitWords = text.split(' ').map((text) => text + ' ')

	return (
		<p>
			{splitWords.map((word, index) => {
				const textArray = Array.from(word)
				return (
					<Wrapper key={index}>
						{textArray.map((element, index) => {
							return (
								<span
									style={{
										overflow: 'hidden',
										display: 'inline-block'
									}}
									key={index}
								>
									<motion.span className={'inline-block py-2 ' + className} variants={item}>
										{element}
									</motion.span>
								</span>
							)
						})}
					</Wrapper>
				)
			})}
		</p>
	)
}

export default AnimatedText
