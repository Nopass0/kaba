import React, {ReactNode, useState} from 'react'
import s from './index.module.scss'
import {Calendar} from 'primereact/calendar'
import {Slider} from 'primereact/slider'
import 'primereact/resources/themes/saga-blue/theme.css' // Тема
import 'primereact/resources/primereact.min.css' // основные стили
import 'primeicons/primeicons.css' // иконки
import './index.css'

interface ICalendar {}

const Calendar: React.FC<ICalendar> = ({}: ICalendar) => {
	const [date, setDate] = useState(null)
	return (
		<div>
			<Calendar
				value={date}
				onChange={(e) => setDate(e.value)}
				numberOfMonths={2}
			/>
		</div>
	)
}

export default Calendar
