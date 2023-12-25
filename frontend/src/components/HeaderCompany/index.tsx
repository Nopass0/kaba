import React, {ReactNode, useEffect, useRef} from 'react'
import s from './index.module.scss'
import NavLabel from '../NavLabel/index'
import InfoCompany from '../infoCompany/index';
import RatePopUp from '../popup/RatePopUp';

interface IHeaderCompany {
	children?: ReactNode[] | ReactNode
	width?: string
	className?: string // Added className prop
	needDownMenu?: boolean
	textHeader: string,
	top_rate?:string,
	bottom_rate?: string,
	left_rate?: string,
	right_rate?: string,
	top_info?:string,
	bottom_info?: string,
	left_info?: string,
	right_info?: string,
}

const HeaderCompany: React.FC<IHeaderCompany> = ({
	className,
	needDownMenu,
	textHeader,
	top_rate,
	bottom_rate,
	left_rate,
	right_rate,
	top_info,
	bottom_info,
	left_info,
	right_info,
}: IHeaderCompany) => {

	const [isInfoOpen, setisInfoOpen] = React.useState(false)
	const [isRateOpen, setisRateOpen] = React.useState(false)

	const InfoOpenRef = useRef()
	const InfoOpenButtonRef = useRef()

	const RateOpenRef = useRef()
	const RateOpenButtonRef = useRef()

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				InfoOpenRef.current &&
				!InfoOpenRef.current.contains(event.target) &&
				!InfoOpenButtonRef.current.contains(event.target)
			) {
				setisInfoOpen(false)
			}

			if (
				RateOpenRef.current &&
				!RateOpenRef.current.contains(event.target) &&
				!RateOpenButtonRef.current.contains(event.target)
			) {
				setisRateOpen(false)
			}

			
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [isRateOpen, isInfoOpen])

	return (
		<div className={s.wrapper + ' ' + className}>
			<div className={s.up}>
				<NavLabel text={`${textHeader}`} />
				<svg ref={InfoOpenButtonRef} onClick={() => setisInfoOpen(!isInfoOpen)}
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M15.4721 20.2941C14.3868 20.7647 13.2294 21 12 21C10.7706 21 9.61324 20.7647 8.52794 20.2941C7.44265 19.8235 6.48529 19.1735 5.65588 18.3441C4.82647 17.5147 4.17647 16.5574 3.70588 15.4721C3.23529 14.3868 3 13.2294 3 12C3 10.7706 3.23529 9.61324 3.70588 8.52794C4.17647 7.44265 4.825 6.48529 5.65147 5.65588C6.47794 4.82647 7.43382 4.17647 8.51912 3.70588C9.60441 3.23529 10.7618 3 11.9912 3C13.2206 3 14.3794 3.23529 15.4676 3.70588C16.5559 4.17647 17.5147 4.82647 18.3441 5.65588C19.1735 6.48529 19.8235 7.44265 20.2941 8.52794C20.7647 9.61324 21 10.7706 21 12C21 13.2294 20.7647 14.3868 20.2941 15.4721C19.8235 16.5574 19.1735 17.5147 18.3441 18.3441C17.5147 19.1735 16.5574 19.8235 15.4721 20.2941ZM9.07941 18.9176C9.98529 19.3059 10.9588 19.5 12 19.5C13.0412 19.5 14.0162 19.3059 14.925 18.9176C15.8338 18.5294 16.6309 17.9926 17.3162 17.3074C18.0015 16.6221 18.5368 15.8265 18.9221 14.9206C19.3074 14.0147 19.5 13.0412 19.5 12C19.5 10.9588 19.3059 9.98529 18.9176 9.07941C18.5294 8.17353 17.9912 7.37647 17.3029 6.68824C16.6147 6 15.8176 5.46324 14.9118 5.07794C14.0059 4.69265 13.0324 4.5 11.9912 4.5C10.95 4.5 9.97647 4.69265 9.07059 5.07794C8.16471 5.46324 7.37059 6 6.68824 6.68824C6.00588 7.37647 5.47206 8.17353 5.08676 9.07941C4.70147 9.98529 4.50882 10.9588 4.50882 12C4.50882 13.0412 4.70147 14.0147 5.08676 14.9206C5.47206 15.8265 6.00735 16.6221 6.69265 17.3074C7.37794 17.9926 8.17353 18.5294 9.07941 18.9176ZM11.8235 13.8265C12.0412 13.8265 12.2132 13.7647 12.3397 13.6412C12.4662 13.5176 12.5294 13.3706 12.5294 13.2V13.1426V13.0941C12.5294 12.8471 12.6029 12.6338 12.75 12.4544C12.8971 12.275 13.1265 12.0824 13.4382 11.8765C13.8618 11.5941 14.2118 11.3 14.4882 10.9941C14.7647 10.6882 14.9029 10.2706 14.9029 9.74118C14.9029 9.25294 14.7721 8.84118 14.5103 8.50588C14.2485 8.17059 13.9059 7.91618 13.4824 7.74265C13.0588 7.56912 12.5971 7.48235 12.0971 7.48235C11.3382 7.48235 10.7191 7.63676 10.2397 7.94559C9.76029 8.25441 9.45882 8.61176 9.33529 9.01765C9.31176 9.08824 9.29412 9.15882 9.28235 9.22941C9.27059 9.3 9.26471 9.37353 9.26471 9.45C9.26471 9.65 9.32941 9.80147 9.45882 9.90441C9.58823 10.0074 9.72647 10.0588 9.87353 10.0588C10.0206 10.0588 10.1456 10.0265 10.2485 9.96176C10.3515 9.89706 10.4412 9.81176 10.5176 9.70588L10.6765 9.49412C10.7824 9.32353 10.9029 9.17794 11.0382 9.05735C11.1735 8.93676 11.325 8.84412 11.4926 8.77941C11.6603 8.71471 11.8412 8.68235 12.0353 8.68235C12.4412 8.68235 12.7647 8.78676 13.0059 8.99559C13.2471 9.20441 13.3676 9.47647 13.3676 9.81176C13.3676 10.1118 13.2735 10.3574 13.0853 10.5485C12.8971 10.7397 12.6088 10.9706 12.2206 11.2412C11.9029 11.4588 11.6397 11.7 11.4309 11.9647C11.2221 12.2294 11.1176 12.5794 11.1176 13.0147V13.0721V13.1294C11.1176 13.5941 11.3529 13.8265 11.8235 13.8265ZM12.4676 16.1912C12.2794 16.3676 12.0559 16.4559 11.7971 16.4559C11.5441 16.4559 11.3235 16.3662 11.1353 16.1868C10.9471 16.0074 10.8529 15.7912 10.8529 15.5382C10.8529 15.2853 10.9456 15.0691 11.1309 14.8897C11.3162 14.7103 11.5382 14.6206 11.7971 14.6206C12.0559 14.6206 12.2794 14.7088 12.4676 14.8853C12.6559 15.0618 12.75 15.2794 12.75 15.5382C12.75 15.7971 12.6559 16.0147 12.4676 16.1912Z"
						fill="#808080"
					/>
				</svg>
				<svg ref={RateOpenButtonRef} onClick={() => setisRateOpen(!isRateOpen)}
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M6.74219 20.9849C6.51972 21.0273 6.32008 20.9806 6.14325 20.8449C5.96642 20.7149 5.85947 20.5396 5.82239 20.3191C5.78531 20.0985 5.82096 19.8356 5.92934 19.5303L7.7176 14.2548L3.14856 10.998C2.88047 10.8114 2.69508 10.6191 2.59241 10.4212C2.48973 10.2233 2.47262 10.0198 2.54107 9.81058C2.60952 9.60703 2.74357 9.45436 2.94321 9.35258C3.14286 9.25081 3.4081 9.20275 3.73894 9.2084L9.34329 9.24233L11.046 3.94144C11.1487 3.63045 11.2784 3.3958 11.4353 3.23748C11.5922 3.07916 11.779 3 11.9957 3C12.2182 3 12.4078 3.07916 12.5647 3.23748C12.7216 3.3958 12.8513 3.63045 12.954 3.94144L14.6567 9.24233L20.2611 9.2084C20.5919 9.20275 20.8571 9.25081 21.0568 9.35258C21.2564 9.45436 21.3905 9.60703 21.4589 9.81058C21.5274 10.0198 21.5103 10.2233 21.4076 10.4212C21.3049 10.6191 21.1195 10.8114 20.8514 10.998L16.2824 14.2548L18.0707 19.5303C18.179 19.8356 18.2147 20.0985 18.1776 20.3191C18.1405 20.5396 18.0336 20.7149 17.8568 20.8449C17.6799 20.9806 17.4803 21.0273 17.2578 20.9849C17.0354 20.9424 16.7929 20.8279 16.5305 20.6414L11.9957 17.3421L7.46947 20.6414C7.20708 20.8279 6.96465 20.9424 6.74219 20.9849ZM7.37535 19.0893C7.36394 19.1288 7.36394 19.1543 7.37535 19.1656C7.38676 19.1826 7.41243 19.1769 7.45236 19.1486L11.5679 16.0359C11.7048 15.9285 11.8488 15.8748 12 15.8748C12.1512 15.8748 12.2952 15.9285 12.4321 16.0359L16.5476 19.1486C16.5876 19.1769 16.6132 19.1826 16.6247 19.1656C16.6304 19.1543 16.6304 19.1288 16.6247 19.0893L14.922 14.2379C14.882 14.1305 14.8635 14.0287 14.8663 13.9326C14.8692 13.8364 14.8963 13.7474 14.9476 13.6654C14.999 13.5834 15.0731 13.5085 15.1701 13.4406L19.4311 10.523C19.471 10.5004 19.4853 10.4778 19.4739 10.4552C19.4682 10.4382 19.4425 10.4297 19.3969 10.4297L14.2203 10.523C14.0435 10.5287 13.8981 10.4933 13.784 10.417C13.6699 10.3407 13.5872 10.2149 13.5358 10.0396L12.0471 5.12884C12.0357 5.0836 12.0185 5.06099 11.9957 5.06099C11.9786 5.06099 11.9643 5.0836 11.9529 5.12884L10.4642 10.0396C10.4128 10.2149 10.3301 10.3407 10.216 10.417C10.1019 10.4933 9.95648 10.5287 9.77965 10.523L4.60313 10.4297C4.55749 10.4297 4.53182 10.4382 4.52612 10.4552C4.51471 10.4778 4.52897 10.5004 4.5689 10.523L8.82991 13.4406C8.92688 13.5085 9.00104 13.5834 9.05237 13.6654C9.10371 13.7474 9.13081 13.8364 9.13366 13.9326C9.13651 14.0287 9.11797 14.1305 9.07804 14.2379L7.37535 19.0893Z"
						fill="#808080"
					/>
				</svg>
			</div>
			{needDownMenu ? (
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
			) : (
				''
			)}
			{isInfoOpen && (
				<div ref={InfoOpenRef} className={`absolute z-10 ${top_info ? `top-[${top_info}]` : `top-[11%]` } ${left_info ? `left-[${left_info}]` : `left-[350px]`} bottom-[${bottom_info}] right-[${right_info}]  `}>
					<InfoCompany />
				</div>
			)}
			{isRateOpen && (
				<div ref={RateOpenRef} className={`absolute z-10 ${top_rate ? `top-[${top_rate}]` : `top-[11%]` } ${left_rate ? `left-[${left_rate}]` : `left-[350px]`} bottom-[${bottom_rate}] right-[${right_rate}]}`}>
					<RatePopUp onExit={() => setisRateOpen(false)} />
				</div>
			)}
		</div>
	)
}

export default HeaderCompany
