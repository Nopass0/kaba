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
				<Row width="232px" className={s.RowCourse}>
					<CheckBox labelText="" />
					<Col width="200px">
						<NavLabel className={s.navLabel} text="курсы английского языка" />
						<Label isMini={true} text="ID 5748296013" />
					</Col>
				</Row>
				<Line width="280px" className={s.Line} />
				<Row width="232px" className={s.RowCourse}>
					<CheckBox labelText="" />
					<Col width="200px">
						<NavLabel className={s.navLabel} text="курсы английского языка" />
						<Label isMini={true} text="ID 5748296013" />
					</Col>
				</Row>
				<Line width="280px" className={s.Line} />
				<Row width="232px" className={s.RowCourse}>
					<CheckBox labelText="" />
					<Col width="200px">
						<NavLabel className={s.navLabel} text="курсы английского языка" />
						<Label isMini={true} text="ID 5748296013" />
					</Col>
				</Row>
				<Line width="280px" className={s.Line} />
				<Row width="232px" className={s.RowCourse}>
					<CheckBox labelText="" />
					<Col width="200px">
						<NavLabel className={s.navLabel} text="курсы английского языка" />
						<Label isMini={true} text="ID 5748296013" />
					</Col>
				</Row>
				<Line width="280px" className={s.Line} />
				<Row width="232px" className={s.RowCourse}>
					<CheckBox labelText="" />
					<Col width="200px">
						<NavLabel className={s.navLabel} text="курсы английского языка" />
						<Label isMini={true} text="ID 5748296013" />
					</Col>
				</Row>
			</Col>
		</div>
	)
}

export default StatisticAddCompanyPopUp
