import React, {ReactNode} from 'react'
import s from './index.module.scss'

interface IButtonSVG {
	children?: ReactNode[] | ReactNode
	text?: string
	className?: string
	width?: string
	onClick?: () => void
}

const ButtonSVG: React.FC<IButtonSVG> = ({
	text,
	children,
	className,
	width,
	onClick,
}: IButtonSVG) => {
	return (
		<div className={s.wrapper}>
			<button
				onClick={onClick}
				style={{width: `${width}`}}
				className={s.button + ' ' + className}>
				{children}
				{text}
			</button>
		</div>
	)
}

export default ButtonSVG
