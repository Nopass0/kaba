import React from 'react'
import s from './index.module.scss'
import NavLabel from '../../NavLabel/index'
import Row from '../../Row'
import Col from '../../Col'
import CheckBox from '../../CheckBox'
import Label from '../../Label'
import Line from '../../Line'

interface ICompaniesTablePopUp {
	className?: string // Added className prop
}

const CompaniesTablePopUp: React.FC<ICompaniesTablePopUp> = ({
	className,
}: ICompaniesTablePopUp) => {
	return (
		<div className={s.wrapper + ' ' + className}>
			<Col width="280px" className={s.ColWrapper}>
				<div className={s.RowCourseWrapper}>
					<div className={s.RowCourse}>
						<Col width="200px" className=' whitespace-nowrap'>
							<NavLabel className={s.navLabel} text='курсы английского языка'/>
							<Label isMini={true} text="ID 5748296013" />
						</Col>
					</div>
				</div>
				<Line width="280px" className={s.Line} />
				<div className={s.RowCourseWrapper}>
					<div className={s.RowCourse}>
						<Col width="200px" className=' whitespace-nowrap'>
							<NavLabel className={s.navLabel} text='курсы английского языка'/>
							<Label isMini={true} text="ID 5748296013" />
						</Col>
					</div>
				</div>
				<Line width="280px" className={s.Line} />
				<div className={s.RowCourseWrapper}>
					<div className={s.RowCourse}>
						<Col width="200px" className=' whitespace-nowrap'>
							<NavLabel className={s.navLabel} text='курсы английского языка'/>
							<Label isMini={true} text="ID 5748296013" />
						</Col>
					</div>
				</div>
				<Line width="280px" className={s.Line} />
				<div className={s.RowCourseWrapper}>
					<div className={s.RowCourse}>
						<Col width="200px" className=' whitespace-nowrap'>
							<NavLabel className={s.navLabel} text='курсы английского языка'/>
							<Label isMini={true} text="ID 5748296013" />
						</Col>
					</div>
				</div>
				
			</Col>
		</div>
	)
}

export default CompaniesTablePopUp
