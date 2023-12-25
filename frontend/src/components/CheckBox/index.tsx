import React, {ReactNode, useRef} from 'react'
import s from './index.module.scss'

interface ICheckBox {
	children?: ReactNode[]
	labelText?: string
	className?: string // Added className prop
	id?: string
	onChange?: (checked: boolean) => void
	isChangeOnActive?: boolean
}

const CheckBox: React.FC<ICheckBox> = ({
	labelText,
	className,
	id,
	onChange,
	isChangeOnActive,
}: ICheckBox) => {
	const handleRef = useRef();
	let [isChecked, setIsChecked] = React.useState<boolean>(false);
	return (
		<div
			className={`${s.CheckBox} ${className}`}
			onClick={() => {
				let check = handleRef.current.checked;
				setIsChecked(check);
				// console.log(check, 'check');
			}}>
			<input
				type={'checkbox'}
				id={id}
				className={`${s.checkbox} ${className}`}
				ref={handleRef}
			/>
			<label className={`${className} ${(isChangeOnActive && isChecked) ? s.activeLabel : ''}`} htmlFor={id}>
				{labelText}
			</label>
		</div>
	)
}

export default CheckBox
