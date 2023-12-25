import React from 'react'
import s from './index.module.scss'

interface IBlueLabel {
	text?: string
	isMini?: boolean
	className?: string
}

const BlueLabel: React.FC<IBlueLabel> = ({
	text,
	isMini,
	className,
}: IBlueLabel) => {
	return (
		<label
			className={
				s.blueLabel +
				(className ? ` ${className}` : '') +
				(isMini ? ` ${s.miniLabel}` : '')
			}>
			{text}
		</label>
	)
}

export default BlueLabel
