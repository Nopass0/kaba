import React from 'react'
import s from './index.module.scss'
import NavLabel from '../../NavLabel/index'
import Row from '../../Row'
import Col from '../../Col'
import CheckBox from '../../CheckBox'
import Label from '../../Label'
import Line from '../../Line'

interface IStatisticAddCompanyPopUp {
	className?: string // Added className prop
}

const StatisticAddCompanyPopUp: React.FC<IStatisticAddCompanyPopUp> = ({
	className,
}: IStatisticAddCompanyPopUp) => {
	return (
		<div className={s.wrapper + ' ' + className}>
			<Col width="280px" className={s.ColWrapper}>
				<label htmlFor='1' className={s.RowCourseWrapper}>
					<div className={s.RowCourse}>
						<CheckBox id="1" />
						<Col width="200px" className='ml-[8px] whitespace-nowrap cursor-pointer'>
							<label className={s.navLabel} htmlFor='1'>курсы английского языка</label>
							<Label htmlFor='1' isMini={true} className='cursor-pointer' text="ID 5748296013" />
						</Col>
					</div>
				</label>
				<Line width="280px" className={s.Line} />
				<label htmlFor='2' className={s.RowCourseWrapper}>
					<div className={s.RowCourse}>
						<CheckBox id="2" />
						<Col width="200px" className='ml-[8px] whitespace-nowrap cursor-pointer'>
							<label className={s.navLabel} htmlFor='2'>курсы английского языка</label>
							<Label htmlFor='2' isMini={true} className='cursor-pointer' text="ID 5748296013" />
						</Col>
					</div>
				</label>
				<Line width="280px" className={s.Line} />
				<label htmlFor='3' className={s.RowCourseWrapper}>
					<div className={s.RowCourse}>
						<CheckBox id="3" />
						<Col width="200px" className='ml-[8px] whitespace-nowrap cursor-pointer'>
							<label className={s.navLabel} htmlFor='3'>курсы английского языка</label>
							<Label htmlFor='3' isMini={true} className='cursor-pointer' text="ID 5748296013" />
						</Col>
					</div>
				</label>
				<Line width="280px" className={s.Line} />
				<label htmlFor='4' className={s.RowCourseWrapper}>
					<div className={s.RowCourse}>
						<CheckBox id="4" />
						<Col width="200px" className='ml-[8px] whitespace-nowrap cursor-pointer'>
							<label className={s.navLabel} htmlFor='4'>курсы английского языка</label>
							<Label htmlFor='4' isMini={true} className='cursor-pointer' text="ID 5748296013" />
						</Col>
					</div>
				</label>
			</Col>
		</div>
	)
}

export default StatisticAddCompanyPopUp
