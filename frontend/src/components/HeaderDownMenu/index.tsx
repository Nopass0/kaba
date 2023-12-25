import React, {ReactNode, useEffect, useRef} from 'react'
import s from './index.module.scss'
import NavLabel from '../NavLabel/index'
import InfoCompany from '../infoCompany/index'
import RatePopUp from '../popup/RatePopUp'

interface IHeaderDownMenu {
	children?: ReactNode[] | ReactNode
	className?: string // Added className prop
}

const HeaderDownMenu: React.FC<IHeaderDownMenu> = ({
	className,
}: IHeaderDownMenu) => {
	return (
		<div className={s.wrapper + ' ' + className}>
			<div className={s.down}>
				<div className={`${s.companiesMenu} ${s.active}`}>
					<span className={s.companiesText}>Компании</span>
					<span className={s.companiesNum}>332</span>
				</div>
				<div className={s.companiesMenu}>
					<span className={s.companiesText}>Аудитории</span>
					<span className={s.companiesNum}>0</span>
				</div>
				<div className={s.companiesMenu}>
					<span className={s.companiesText}>Баннеры</span>
					<span className={s.companiesNum}>33</span>
				</div>
			</div>
		</div>
	)
}

export default HeaderDownMenu
