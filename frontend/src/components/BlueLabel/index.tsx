import React from 'react'
import s from './index.module.scss'

interface IBlueLabel {
	text?: string
	isMini?: boolean
	className?: string
	onClick?: () => void
	style?: React.CSSProperties
}

const BlueLabel: React.FC<IBlueLabel> = ({
	text,
	isMini,
	className,
	onClick,
	style,
}: IBlueLabel) => {
	return (
		<label
			style={style}
			className={
				s.blueLabel +
				(className ? ` ${className}` : '') +
				(isMini ? ` ${s.miniLabel}` : '')
			}
			onClick={onClick}>
			{text}
		</label>
	)
}

export default BlueLabel
