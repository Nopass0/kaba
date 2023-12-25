import React, {ReactNode} from 'react'
import s from './index.module.scss'

interface PopUpWrapper {
	children?: ReactNode[] | ReactNode | null | undefined
	onExit?: () => void
}

const PopUpWrapper: React.FC<PopUpWrapper> = ({
	children,
	onExit,
}: PopUpWrapper) => {
	return (
		<>
			<div className={s.wrapper}>
				<div className={s.popUp}>
					{children}
				</div>
				<div onClick={onExit} className={s.Background}></div>
			</div>
		</>
	)
}

export default PopUpWrapper
