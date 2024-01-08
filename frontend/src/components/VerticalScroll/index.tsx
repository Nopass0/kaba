import React, {ReactNode, useEffect} from 'react'
import s from './index.module.scss'

interface IVerticalScroll {
	//ref
	obj: string
}

const VerticalScroll: React.FC<IVerticalScroll> = ({obj}: IVerticalScroll) => {
	const [height, setHeight] = React.useState(0)
	const [thumbHeight, setThumbHeight] = React.useState(0)

	useEffect(() => {
		const object = document.getElementById(obj)
		console.log('obj', object)
	}, [])

	return <div className="w-10 h-10 bg-red-700"></div>
}

export default VerticalScroll
