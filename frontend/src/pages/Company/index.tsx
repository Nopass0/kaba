import React, {useEffect} from 'react'
import s from './index.module.scss'
import LeftCompanyMenu from '../../components/LeftCompanyMenu/index'
import HeaderCompany from '../../components/HeaderCompany/index'
import Table from '../../components/Table/index'
import TableLineFooter from '../../components/TableLineFooter'
import StatisticPageMini from '../../components/popup/StatisticPageMini/index'
import PopUpWrapper from '../../components/PopUpWrapper/index'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import AuditorNBanners from '../../components/AuditorNBanners/index';
import { Calendar } from 'primereact/calendar';

const Company: React.FC = () => {
	const user = useSelector((state: any) => state.user)
	const navigate = useNavigate()

	useEffect(() => {
		console.log(user)

		if (user == null) {
			navigate('/login')
		}
	}, [])

	return (
		<div className={s.wrapper}>
			<div className={s.leftMenu}>
				<LeftCompanyMenu />
			</div>
			<div className={s.rightMenu}>
				<Calendar/>
				{/* COMPANY */}
				{/* <HeaderCompany textHeader="Компании" needDownMenu={true} /> */}
				{/* <Table /> */}
				{/* <PopUpWrapper>
					<StatisticPageMini/>
				</PopUpWrapper> */}
				{/* <TableLineFooter className={s.TableLineFooter} /> */}

				{/* NO COMPANY CONTENT */}
				{/* <Col width='360px' className={s.noCompany}>
              <NavLabel className={s.noCompanyTitle} text='Нет кампаний'/>
              <Label className={s.noCompanyLabel} width='360px' isMini={true} text='У вас нет ни одной кампании соответствующей заданным параметрам'/>
              <BlueButton width='180px' text='Создать'/>
            </Col> */}

				{/* FINANCY */}
				{/* <HeaderFinancy connect={true}/> */}

				{/* No Trans FINANCY */}
				{/* <Col width='360px' className={s.noTransFinancy}>
              <NavLabel className={s.noTransFinancyTitle} text='Нет операций'/>
              <Label className={s.noTransFinancyLabel} width='360px' isMini={true} text='История отобразится после того, как будет совершена хотя бы одна транзакция'/>
            </Col> */}
				{/* <TableFinancy/> */}

				{/* SITES */}
				{/* <HeaderCompany textHeader='Компании'/>
            <TableSites/> */}

				{/* Statistic */}
				{/* <HeaderCompany textHeader='Статистика'/>  */}
				{/* <StatisticPage/> */}
				{/* <Col width='360px' className={s.noCompany}>
              <NavLabel className={s.noCompanyTitle} text='Нет кампаний'/>
              <Label className={s.noCompanyLabel} width='360px' isMini={true} text='У вас нет ни одной кампании соответствующей заданным параметрам'/>
              <BlueButton width='180px' text='Создать'/>
            </Col> */}
			</div>
		</div>
	)
}

export default Company
