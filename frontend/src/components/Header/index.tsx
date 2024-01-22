import React, {Component, useEffect, useRef} from 'react'
import s from './index.module.scss'

// svg import
import AccountAvatar from '../AccountAvatar/index'
import logo from '../../assets/logo.svg'
import BetaLogo from '../../assets/icons/BetaLogo.svg'
import {useDispatch, useSelector} from 'react-redux'
import ProfilePopUp from '../popup/ProfilePopUp'
import NotificationMenu from '../NotificationMenu/index'
import StatusAcc from '../StatusAcc/index'
import PopUpWrapper from '../PopUpWrapper/index'
import HeaderDownMenu from '../HeaderDownMenu'
import {useLocation} from 'react-router-dom'
import RatePopUp from '../popup/RatePopUp'

const Header: React.FC = () => {
	const location = useLocation()
	const dispatch = useDispatch()

	const user = useSelector((state: any) => state.user)
	const CurrentURL = useSelector((state: any) => state.CurrentURL)

	const [isProfileOpen, setIsProfileOpen] = React.useState(false)
	const [isNotificationOpen, setIsNotificationOpen] = React.useState(false)
	const [isStatAcc, setIsStatAcc] = React.useState(false)
	const [isRateOpen, setisRateOpen] = React.useState(false)
	const [switchPage, setSwitchPage] = React.useState<number>(1)

	let switchPageSelector = useSelector((state: any) => state.SwitchCreatePage)

	const RateOpenRef = useRef()
	const RateOpenButtonRef = useRef()

	const profilePopUpRef = useRef()
	const profilePopUpButtonRef = useRef()

	const notificationPopUpRef = useRef()
	const notificationPopUpButtonRef = useRef()

	const statAccPopUpRef = useRef()
	const statAccPopUpButtonRef = useRef()
	// 	/company
	// /finance
	// /media
	// /mybanners
	// /sites
	const maxWidth = {}
	console.log(location.pathname.split('/')[1], 'LOCATION')

	useEffect(() => {}, [])
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				profilePopUpRef.current &&
				!profilePopUpRef.current.contains(event.target) &&
				!profilePopUpButtonRef.current.contains(event.target)
			) {
				setIsProfileOpen(false)
			}

			if (
				notificationPopUpRef.current &&
				!notificationPopUpRef.current.contains(event.target) &&
				!notificationPopUpButtonRef.current.contains(event.target)
			) {
				setIsNotificationOpen(false)
			}

			if (
				statAccPopUpRef.current &&
				!statAccPopUpRef.current.contains(event.target) &&
				!statAccPopUpButtonRef.current.contains(event.target)
			) {
				setIsStatAcc(false)
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
	}, [isProfileOpen, isNotificationOpen, isStatAcc, isRateOpen])

	const SwitcherPages = (page: number) => {
		setSwitchPage(page)
		dispatch({type: 'setSwitchCreatePage', SwitchCreatePage: page})

		console.log(
			switchPage,
			'SWITCHPAGE\n',
			page,
			'PAGE\n',
			switchPageSelector,
			'SWITCHPAGESELECTOR',
		)
	}

	return (
		<>
			{![
				'login',
				'register',
				'choose',
				'acceptCode',
				'',
				'mybanners',
				'sites',
				'media',
			].includes(location.pathname.split('/')[1]) ? (
				<>
					{['create'].includes(location.pathname.split('/')[1]) ? (
						<>
							<div style={maxWidth} className={s.header_company}>
								<div className={s.container}>
									{/* <div className={s.logo}>
								<img src={logo} alt="logo" />
								<img src={BetaLogo} alt="Beta" />
							</div> */}
								</div>
								<div className={s.down}>
									<button
										onClick={() => SwitcherPages(1)}
										className={`${s.companiesMenu} ${
											switchPage === 1 ? s.companiesMenuActive : ''
										}`}>
										<span className={s.companiesText}>Компании</span>
										{/* <span className={s.companiesNum}>0</span> */}
									</button>
									<button
										onClick={() => SwitcherPages(2)}
										className={`${s.companiesMenu} ${
											switchPage === 2 ? s.companiesMenuActive : ''
										}`}>
										<span className={s.companiesText}>Аудитория</span>
										{/* <span className={s.companiesNum}>0</span> */}
									</button>
									<button
										onClick={() => SwitcherPages(3)}
										className={`${s.companiesMenu} ${
											switchPage === 3 ? s.companiesMenuActive : ''
										}`}>
										<span className={s.companiesText}>Баннеры</span>
										{/* <span className={s.companiesNum}>33</span> */}
									</button>
								</div>
								<div className={s.container}>
									<div className={s.icons_header}>
										<svg
											ref={RateOpenButtonRef}
											onClick={() => setisRateOpen(!isRateOpen)}
											className="mr-4"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M6.74219 20.9849C6.51972 21.0273 6.32008 20.9806 6.14325 20.8449C5.96642 20.7149 5.85947 20.5396 5.82239 20.3191C5.78531 20.0985 5.82096 19.8356 5.92934 19.5303L7.7176 14.2548L3.14856 10.998C2.88047 10.8114 2.69508 10.6191 2.59241 10.4212C2.48973 10.2233 2.47262 10.0198 2.54107 9.81058C2.60952 9.60703 2.74357 9.45436 2.94321 9.35258C3.14286 9.25081 3.4081 9.20275 3.73894 9.2084L9.34329 9.24233L11.046 3.94144C11.1487 3.63045 11.2784 3.3958 11.4353 3.23748C11.5922 3.07916 11.779 3 11.9957 3C12.2182 3 12.4078 3.07916 12.5647 3.23748C12.7216 3.3958 12.8513 3.63045 12.954 3.94144L14.6567 9.24233L20.2611 9.2084C20.5919 9.20275 20.8571 9.25081 21.0568 9.35258C21.2564 9.45436 21.3905 9.60703 21.4589 9.81058C21.5274 10.0198 21.5103 10.2233 21.4076 10.4212C21.3049 10.6191 21.1195 10.8114 20.8514 10.998L16.2824 14.2548L18.0707 19.5303C18.179 19.8356 18.2147 20.0985 18.1776 20.3191C18.1405 20.5396 18.0336 20.7149 17.8568 20.8449C17.6799 20.9806 17.4803 21.0273 17.2578 20.9849C17.0354 20.9424 16.7929 20.8279 16.5305 20.6414L11.9957 17.3421L7.46947 20.6414C7.20708 20.8279 6.96465 20.9424 6.74219 20.9849ZM7.37535 19.0893C7.36394 19.1288 7.36394 19.1543 7.37535 19.1656C7.38676 19.1826 7.41243 19.1769 7.45236 19.1486L11.5679 16.0359C11.7048 15.9285 11.8488 15.8748 12 15.8748C12.1512 15.8748 12.2952 15.9285 12.4321 16.0359L16.5476 19.1486C16.5876 19.1769 16.6132 19.1826 16.6247 19.1656C16.6304 19.1543 16.6304 19.1288 16.6247 19.0893L14.922 14.2379C14.882 14.1305 14.8635 14.0287 14.8663 13.9326C14.8692 13.8364 14.8963 13.7474 14.9476 13.6654C14.999 13.5834 15.0731 13.5085 15.1701 13.4406L19.4311 10.523C19.471 10.5004 19.4853 10.4778 19.4739 10.4552C19.4682 10.4382 19.4425 10.4297 19.3969 10.4297L14.2203 10.523C14.0435 10.5287 13.8981 10.4933 13.784 10.417C13.6699 10.3407 13.5872 10.2149 13.5358 10.0396L12.0471 5.12884C12.0357 5.0836 12.0185 5.06099 11.9957 5.06099C11.9786 5.06099 11.9643 5.0836 11.9529 5.12884L10.4642 10.0396C10.4128 10.2149 10.3301 10.3407 10.216 10.417C10.1019 10.4933 9.95648 10.5287 9.77965 10.523L4.60313 10.4297C4.55749 10.4297 4.53182 10.4382 4.52612 10.4552C4.51471 10.4778 4.52897 10.5004 4.5689 10.523L8.82991 13.4406C8.92688 13.5085 9.00104 13.5834 9.05237 13.6654C9.10371 13.7474 9.13081 13.8364 9.13366 13.9326C9.13651 14.0287 9.11797 14.1305 9.07804 14.2379L7.37535 19.0893Z"
												fill="CurrentColor"
											/>
										</svg>
										<svg
											ref={notificationPopUpButtonRef}
											onClick={() => setIsNotificationOpen(!isNotificationOpen)}
											className={s.svgDinDon}
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M3 17.3243C3 17.6793 3.12719 17.9632 3.38156 18.1762C3.63593 18.3892 3.98887 18.4956 4.44038 18.4956H8.46582C8.49126 19.1217 8.65819 19.6993 8.96661 20.2285C9.27504 20.7577 9.68998 21.1852 10.2114 21.5111C10.7329 21.837 11.3275 22 11.9952 22C12.6693 22 13.2671 21.8387 13.7886 21.516C14.31 21.1933 14.725 20.7657 15.0334 20.2333C15.3418 19.7009 15.5087 19.1217 15.5342 18.4956H19.5596C20.0111 18.4956 20.3641 18.3892 20.6184 18.1762C20.8728 17.9632 21 17.6793 21 17.3243C21 17.0016 20.9078 16.6886 20.7234 16.3853C20.5389 16.082 20.3084 15.7851 20.0318 15.4947C19.7552 15.2043 19.4801 14.9138 19.2067 14.6234C18.9968 14.404 18.8331 14.1168 18.7154 13.7619C18.5978 13.4069 18.5103 13.0294 18.4531 12.6292C18.3959 12.2291 18.3545 11.8419 18.3291 11.4676C18.31 10.1962 18.1781 9.07809 17.9332 8.11326C17.6884 7.14843 17.3084 6.34334 16.7933 5.69797C16.2782 5.0526 15.5978 4.57502 14.752 4.26525C14.593 3.63278 14.2703 3.09713 13.7838 2.65828C13.2973 2.21943 12.7011 2 11.9952 2C11.2957 2 10.7027 2.21943 10.2162 2.65828C9.72973 3.09713 9.40699 3.63278 9.24801 4.26525C8.40223 4.57502 7.72019 5.0526 7.20191 5.69797C6.68362 6.34334 6.30366 7.14843 6.062 8.11326C5.82035 9.07809 5.68998 10.1962 5.67091 11.4676C5.64547 11.8419 5.60413 12.2291 5.5469 12.6292C5.48967 13.0294 5.40223 13.4069 5.28458 13.7619C5.16693 14.1168 5.00318 14.404 4.79332 14.6234C4.51987 14.9138 4.24483 15.2043 3.9682 15.4947C3.69157 15.7851 3.46105 16.082 3.27663 16.3853C3.09221 16.6886 3 17.0016 3 17.3243ZM4.85056 17.0339V16.9177C4.90779 16.8274 5.00318 16.7064 5.13672 16.5547C5.27027 16.403 5.4213 16.2369 5.58983 16.0561C5.75835 15.8754 5.92528 15.6915 6.09062 15.5044C6.26232 15.3107 6.41176 15.0865 6.53895 14.8316C6.66614 14.5766 6.77425 14.2878 6.86328 13.9651C6.95231 13.6425 7.02226 13.2843 7.07313 12.8906C7.12401 12.4969 7.16216 12.0645 7.1876 11.5934C7.21304 10.1865 7.35612 9.07002 7.61685 8.24395C7.87758 7.41788 8.22576 6.80316 8.66137 6.39981C9.09698 5.99645 9.58824 5.71733 10.1351 5.56244C10.256 5.53662 10.3482 5.48984 10.4118 5.42207C10.4754 5.35431 10.5103 5.25912 10.5167 5.1365C10.5358 4.63311 10.6773 4.22168 10.9412 3.90223C11.2051 3.58277 11.5564 3.42304 11.9952 3.42304C12.4404 3.42304 12.7949 3.58277 13.0588 3.90223C13.3227 4.22168 13.4642 4.63311 13.4833 5.1365C13.4833 5.25912 13.5167 5.35431 13.5835 5.42207C13.6502 5.48984 13.7409 5.53662 13.8553 5.56244C14.4022 5.71733 14.8935 5.99645 15.3291 6.39981C15.7647 6.80316 16.1145 7.41788 16.3784 8.24395C16.6423 9.07002 16.787 10.1865 16.8124 11.5934C16.8315 12.0645 16.868 12.4969 16.9221 12.8906C16.9762 13.2843 17.0461 13.6425 17.132 13.9651C17.2178 14.2878 17.3243 14.5766 17.4515 14.8316C17.5787 15.0865 17.7281 15.3107 17.8998 15.5044C18.0715 15.6915 18.2417 15.8754 18.4102 16.0561C18.5787 16.2369 18.7281 16.403 18.8585 16.5547C18.9889 16.7064 19.0827 16.8274 19.1399 16.9177V17.0339H4.85056ZM14.0461 18.4956H9.9539C9.98569 19.1539 10.1908 19.6751 10.5692 20.0591C10.9475 20.443 11.4229 20.635 11.9952 20.635C12.5739 20.635 13.0509 20.443 13.4261 20.0591C13.8013 19.6751 14.0079 19.1539 14.0461 18.4956Z"
												fill="CurrentColor"
											/>
										</svg>
										{/* <div
											ref={statAccPopUpButtonRef}
											onClick={() => {
												setIsStatAcc(!isStatAcc)
											}}
											className={s.touchBtn}>
											<div className={s.touchSVG}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 16 16"
													fill="none">
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M2 7.93232C2 8.67289 2.13235 9.37566 2.39706 10.0406C2.66176 10.7056 3.02647 11.2998 3.49118 11.8232C3.95588 12.3467 4.48431 12.7693 5.07647 13.0911C5.19804 13.157 5.31373 13.1842 5.42353 13.1725C5.53333 13.1609 5.62451 13.1202 5.69706 13.0504C5.76961 12.9806 5.81667 12.8973 5.83824 12.8003C5.8598 12.7034 5.84706 12.6035 5.8 12.5008C5.75294 12.398 5.66078 12.3079 5.52353 12.2303C5.02941 11.9589 4.59314 11.6061 4.21471 11.1718C3.83627 10.7376 3.5402 10.2442 3.32647 9.69166C3.11275 9.13914 3.00588 8.5527 3.00588 7.93232C3.00588 7.24603 3.13431 6.60434 3.39118 6.00723C3.64804 5.41012 4.00392 4.88474 4.45882 4.43109C4.91373 3.97744 5.44314 3.62363 6.04706 3.36967C6.65098 3.1157 7.3 2.98872 7.99412 2.98872C8.68824 2.98872 9.33824 3.1157 9.94412 3.36967C10.55 3.62363 11.0814 3.97744 11.5382 4.43109C11.9951 4.88474 12.3529 5.41012 12.6118 6.00723C12.8706 6.60434 13 7.24603 13 7.93232C13 8.1068 13.0559 8.23669 13.1676 8.322C13.2794 8.4073 13.4 8.44995 13.5294 8.44995C13.6471 8.44995 13.7549 8.40633 13.8529 8.31909C13.951 8.23185 14 8.10293 14 7.93232C14 7.12196 13.8431 6.35909 13.5294 5.64373C13.2157 4.92836 12.7824 4.29732 12.2294 3.75062C11.6765 3.20391 11.0373 2.77547 10.3118 2.46528C9.58627 2.15509 8.81373 2 7.99412 2C7.17451 2 6.40294 2.15509 5.67941 2.46528C4.95588 2.77547 4.31863 3.20391 3.76765 3.75062C3.21667 4.29732 2.78431 4.92836 2.47059 5.64373C2.15686 6.35909 2 7.12196 2 7.93232ZM4.37647 7.93232C4.37647 8.36271 4.44804 8.76595 4.59118 9.14205C4.73431 9.51815 4.92549 9.85354 5.16471 10.1482C5.40392 10.4429 5.66667 10.6814 5.95294 10.8636C6.10196 10.9605 6.2402 10.9954 6.36765 10.9683C6.4951 10.9411 6.5951 10.8772 6.66765 10.7763C6.7402 10.6755 6.77157 10.565 6.76176 10.4448C6.75196 10.3246 6.68431 10.2219 6.55882 10.1366C6.19412 9.90007 5.90098 9.58891 5.67941 9.20312C5.45784 8.81733 5.34706 8.39373 5.34706 7.93232C5.34706 7.56398 5.41471 7.2218 5.55 6.9058C5.68529 6.5898 5.87451 6.3116 6.11765 6.0712C6.36078 5.83081 6.64216 5.64276 6.96176 5.50705C7.28137 5.37134 7.62549 5.30349 7.99412 5.30349C8.36275 5.30349 8.70588 5.37134 9.02353 5.50705C9.34118 5.64276 9.61961 5.82984 9.85882 6.06829C10.098 6.30675 10.2873 6.58495 10.4265 6.90289C10.5657 7.22083 10.6412 7.56398 10.6529 7.93232C10.6608 8.06415 10.7098 8.1766 10.8 8.26965C10.8902 8.36271 11.0039 8.40924 11.1412 8.40924C11.2745 8.40924 11.3882 8.36271 11.4824 8.26965C11.5765 8.1766 11.6235 8.06415 11.6235 7.93232C11.6235 7.4399 11.5294 6.97753 11.3412 6.54521C11.1529 6.11288 10.8912 5.73194 10.5559 5.40236C10.2206 5.07279 9.83431 4.81398 9.39706 4.62593C8.9598 4.43787 8.49216 4.34385 7.99412 4.34385C7.5 4.34385 7.03431 4.43787 6.59706 4.62593C6.1598 4.81398 5.77451 5.07279 5.44118 5.40236C5.10784 5.73194 4.84706 6.11288 4.65882 6.54521C4.47059 6.97753 4.37647 7.4399 4.37647 7.93232ZM7.92353 12.3583C7.82157 12.3273 7.77255 12.2556 7.77647 12.1431L7.82941 7.50194C7.82941 7.39337 7.87353 7.32261 7.96176 7.28965C8.05 7.2567 8.13137 7.27705 8.20588 7.35072L11.4235 10.6193C11.502 10.7007 11.5206 10.7841 11.4794 10.8694C11.4382 10.9547 11.3627 10.9993 11.2529 11.0032L9.98235 11.0555L11.0412 13.475C11.0647 13.5293 11.0676 13.5835 11.05 13.6378C11.0324 13.6921 10.998 13.7309 10.9471 13.7541L10.3588 13.9868C10.3078 14.0062 10.2559 14.0042 10.2029 13.981C10.15 13.9577 10.1118 13.9189 10.0882 13.8646L9.08235 11.4103L8.18824 12.3001C8.11373 12.3699 8.02549 12.3893 7.92353 12.3583Z"
														fill="#57BD53"
													/>
												</svg>
											</div>
											<span>+245</span>
										</div> */}
										<div ref={profilePopUpButtonRef}>
											<AccountAvatar
												className="cursor-pointer"
												onClick={() => {
													setIsProfileOpen(!isProfileOpen)
												}}
												size={32}
												char={user?.name?.charAt(0)}
												img={user?.avatar}
											/>
										</div>
									</div>
								</div>
							</div>
						</>
					) : (
						<div style={maxWidth} className={s.header_company}>
							<div className={s.container}>
								{/* <div className={s.logo}>
								<img src={logo} alt="logo" />
								<img src={BetaLogo} alt="Beta" />
							</div> */}
							</div>
							<div className={s.container}>
								<div className={s.icons_header}>
									<svg
										ref={RateOpenButtonRef}
										onClick={() => setisRateOpen(!isRateOpen)}
										className="mr-4"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M6.74219 20.9849C6.51972 21.0273 6.32008 20.9806 6.14325 20.8449C5.96642 20.7149 5.85947 20.5396 5.82239 20.3191C5.78531 20.0985 5.82096 19.8356 5.92934 19.5303L7.7176 14.2548L3.14856 10.998C2.88047 10.8114 2.69508 10.6191 2.59241 10.4212C2.48973 10.2233 2.47262 10.0198 2.54107 9.81058C2.60952 9.60703 2.74357 9.45436 2.94321 9.35258C3.14286 9.25081 3.4081 9.20275 3.73894 9.2084L9.34329 9.24233L11.046 3.94144C11.1487 3.63045 11.2784 3.3958 11.4353 3.23748C11.5922 3.07916 11.779 3 11.9957 3C12.2182 3 12.4078 3.07916 12.5647 3.23748C12.7216 3.3958 12.8513 3.63045 12.954 3.94144L14.6567 9.24233L20.2611 9.2084C20.5919 9.20275 20.8571 9.25081 21.0568 9.35258C21.2564 9.45436 21.3905 9.60703 21.4589 9.81058C21.5274 10.0198 21.5103 10.2233 21.4076 10.4212C21.3049 10.6191 21.1195 10.8114 20.8514 10.998L16.2824 14.2548L18.0707 19.5303C18.179 19.8356 18.2147 20.0985 18.1776 20.3191C18.1405 20.5396 18.0336 20.7149 17.8568 20.8449C17.6799 20.9806 17.4803 21.0273 17.2578 20.9849C17.0354 20.9424 16.7929 20.8279 16.5305 20.6414L11.9957 17.3421L7.46947 20.6414C7.20708 20.8279 6.96465 20.9424 6.74219 20.9849ZM7.37535 19.0893C7.36394 19.1288 7.36394 19.1543 7.37535 19.1656C7.38676 19.1826 7.41243 19.1769 7.45236 19.1486L11.5679 16.0359C11.7048 15.9285 11.8488 15.8748 12 15.8748C12.1512 15.8748 12.2952 15.9285 12.4321 16.0359L16.5476 19.1486C16.5876 19.1769 16.6132 19.1826 16.6247 19.1656C16.6304 19.1543 16.6304 19.1288 16.6247 19.0893L14.922 14.2379C14.882 14.1305 14.8635 14.0287 14.8663 13.9326C14.8692 13.8364 14.8963 13.7474 14.9476 13.6654C14.999 13.5834 15.0731 13.5085 15.1701 13.4406L19.4311 10.523C19.471 10.5004 19.4853 10.4778 19.4739 10.4552C19.4682 10.4382 19.4425 10.4297 19.3969 10.4297L14.2203 10.523C14.0435 10.5287 13.8981 10.4933 13.784 10.417C13.6699 10.3407 13.5872 10.2149 13.5358 10.0396L12.0471 5.12884C12.0357 5.0836 12.0185 5.06099 11.9957 5.06099C11.9786 5.06099 11.9643 5.0836 11.9529 5.12884L10.4642 10.0396C10.4128 10.2149 10.3301 10.3407 10.216 10.417C10.1019 10.4933 9.95648 10.5287 9.77965 10.523L4.60313 10.4297C4.55749 10.4297 4.53182 10.4382 4.52612 10.4552C4.51471 10.4778 4.52897 10.5004 4.5689 10.523L8.82991 13.4406C8.92688 13.5085 9.00104 13.5834 9.05237 13.6654C9.10371 13.7474 9.13081 13.8364 9.13366 13.9326C9.13651 14.0287 9.11797 14.1305 9.07804 14.2379L7.37535 19.0893Z"
											fill="CurrentColor"
										/>
									</svg>
									{/* <svg
										ref={notificationPopUpButtonRef}
										onClick={() => setIsNotificationOpen(!isNotificationOpen)}
										className={s.svgDinDon}
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M3 17.3243C3 17.6793 3.12719 17.9632 3.38156 18.1762C3.63593 18.3892 3.98887 18.4956 4.44038 18.4956H8.46582C8.49126 19.1217 8.65819 19.6993 8.96661 20.2285C9.27504 20.7577 9.68998 21.1852 10.2114 21.5111C10.7329 21.837 11.3275 22 11.9952 22C12.6693 22 13.2671 21.8387 13.7886 21.516C14.31 21.1933 14.725 20.7657 15.0334 20.2333C15.3418 19.7009 15.5087 19.1217 15.5342 18.4956H19.5596C20.0111 18.4956 20.3641 18.3892 20.6184 18.1762C20.8728 17.9632 21 17.6793 21 17.3243C21 17.0016 20.9078 16.6886 20.7234 16.3853C20.5389 16.082 20.3084 15.7851 20.0318 15.4947C19.7552 15.2043 19.4801 14.9138 19.2067 14.6234C18.9968 14.404 18.8331 14.1168 18.7154 13.7619C18.5978 13.4069 18.5103 13.0294 18.4531 12.6292C18.3959 12.2291 18.3545 11.8419 18.3291 11.4676C18.31 10.1962 18.1781 9.07809 17.9332 8.11326C17.6884 7.14843 17.3084 6.34334 16.7933 5.69797C16.2782 5.0526 15.5978 4.57502 14.752 4.26525C14.593 3.63278 14.2703 3.09713 13.7838 2.65828C13.2973 2.21943 12.7011 2 11.9952 2C11.2957 2 10.7027 2.21943 10.2162 2.65828C9.72973 3.09713 9.40699 3.63278 9.24801 4.26525C8.40223 4.57502 7.72019 5.0526 7.20191 5.69797C6.68362 6.34334 6.30366 7.14843 6.062 8.11326C5.82035 9.07809 5.68998 10.1962 5.67091 11.4676C5.64547 11.8419 5.60413 12.2291 5.5469 12.6292C5.48967 13.0294 5.40223 13.4069 5.28458 13.7619C5.16693 14.1168 5.00318 14.404 4.79332 14.6234C4.51987 14.9138 4.24483 15.2043 3.9682 15.4947C3.69157 15.7851 3.46105 16.082 3.27663 16.3853C3.09221 16.6886 3 17.0016 3 17.3243ZM4.85056 17.0339V16.9177C4.90779 16.8274 5.00318 16.7064 5.13672 16.5547C5.27027 16.403 5.4213 16.2369 5.58983 16.0561C5.75835 15.8754 5.92528 15.6915 6.09062 15.5044C6.26232 15.3107 6.41176 15.0865 6.53895 14.8316C6.66614 14.5766 6.77425 14.2878 6.86328 13.9651C6.95231 13.6425 7.02226 13.2843 7.07313 12.8906C7.12401 12.4969 7.16216 12.0645 7.1876 11.5934C7.21304 10.1865 7.35612 9.07002 7.61685 8.24395C7.87758 7.41788 8.22576 6.80316 8.66137 6.39981C9.09698 5.99645 9.58824 5.71733 10.1351 5.56244C10.256 5.53662 10.3482 5.48984 10.4118 5.42207C10.4754 5.35431 10.5103 5.25912 10.5167 5.1365C10.5358 4.63311 10.6773 4.22168 10.9412 3.90223C11.2051 3.58277 11.5564 3.42304 11.9952 3.42304C12.4404 3.42304 12.7949 3.58277 13.0588 3.90223C13.3227 4.22168 13.4642 4.63311 13.4833 5.1365C13.4833 5.25912 13.5167 5.35431 13.5835 5.42207C13.6502 5.48984 13.7409 5.53662 13.8553 5.56244C14.4022 5.71733 14.8935 5.99645 15.3291 6.39981C15.7647 6.80316 16.1145 7.41788 16.3784 8.24395C16.6423 9.07002 16.787 10.1865 16.8124 11.5934C16.8315 12.0645 16.868 12.4969 16.9221 12.8906C16.9762 13.2843 17.0461 13.6425 17.132 13.9651C17.2178 14.2878 17.3243 14.5766 17.4515 14.8316C17.5787 15.0865 17.7281 15.3107 17.8998 15.5044C18.0715 15.6915 18.2417 15.8754 18.4102 16.0561C18.5787 16.2369 18.7281 16.403 18.8585 16.5547C18.9889 16.7064 19.0827 16.8274 19.1399 16.9177V17.0339H4.85056ZM14.0461 18.4956H9.9539C9.98569 19.1539 10.1908 19.6751 10.5692 20.0591C10.9475 20.443 11.4229 20.635 11.9952 20.635C12.5739 20.635 13.0509 20.443 13.4261 20.0591C13.8013 19.6751 14.0079 19.1539 14.0461 18.4956Z"
											fill="CurrentColor"
										/>
									</svg> */}
									{/* <div
										ref={statAccPopUpButtonRef}
										onClick={() => {
											setIsStatAcc(!isStatAcc)
										}}
										className={s.touchBtn}>
										<div className={s.touchSVG}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none">
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M2 7.93232C2 8.67289 2.13235 9.37566 2.39706 10.0406C2.66176 10.7056 3.02647 11.2998 3.49118 11.8232C3.95588 12.3467 4.48431 12.7693 5.07647 13.0911C5.19804 13.157 5.31373 13.1842 5.42353 13.1725C5.53333 13.1609 5.62451 13.1202 5.69706 13.0504C5.76961 12.9806 5.81667 12.8973 5.83824 12.8003C5.8598 12.7034 5.84706 12.6035 5.8 12.5008C5.75294 12.398 5.66078 12.3079 5.52353 12.2303C5.02941 11.9589 4.59314 11.6061 4.21471 11.1718C3.83627 10.7376 3.5402 10.2442 3.32647 9.69166C3.11275 9.13914 3.00588 8.5527 3.00588 7.93232C3.00588 7.24603 3.13431 6.60434 3.39118 6.00723C3.64804 5.41012 4.00392 4.88474 4.45882 4.43109C4.91373 3.97744 5.44314 3.62363 6.04706 3.36967C6.65098 3.1157 7.3 2.98872 7.99412 2.98872C8.68824 2.98872 9.33824 3.1157 9.94412 3.36967C10.55 3.62363 11.0814 3.97744 11.5382 4.43109C11.9951 4.88474 12.3529 5.41012 12.6118 6.00723C12.8706 6.60434 13 7.24603 13 7.93232C13 8.1068 13.0559 8.23669 13.1676 8.322C13.2794 8.4073 13.4 8.44995 13.5294 8.44995C13.6471 8.44995 13.7549 8.40633 13.8529 8.31909C13.951 8.23185 14 8.10293 14 7.93232C14 7.12196 13.8431 6.35909 13.5294 5.64373C13.2157 4.92836 12.7824 4.29732 12.2294 3.75062C11.6765 3.20391 11.0373 2.77547 10.3118 2.46528C9.58627 2.15509 8.81373 2 7.99412 2C7.17451 2 6.40294 2.15509 5.67941 2.46528C4.95588 2.77547 4.31863 3.20391 3.76765 3.75062C3.21667 4.29732 2.78431 4.92836 2.47059 5.64373C2.15686 6.35909 2 7.12196 2 7.93232ZM4.37647 7.93232C4.37647 8.36271 4.44804 8.76595 4.59118 9.14205C4.73431 9.51815 4.92549 9.85354 5.16471 10.1482C5.40392 10.4429 5.66667 10.6814 5.95294 10.8636C6.10196 10.9605 6.2402 10.9954 6.36765 10.9683C6.4951 10.9411 6.5951 10.8772 6.66765 10.7763C6.7402 10.6755 6.77157 10.565 6.76176 10.4448C6.75196 10.3246 6.68431 10.2219 6.55882 10.1366C6.19412 9.90007 5.90098 9.58891 5.67941 9.20312C5.45784 8.81733 5.34706 8.39373 5.34706 7.93232C5.34706 7.56398 5.41471 7.2218 5.55 6.9058C5.68529 6.5898 5.87451 6.3116 6.11765 6.0712C6.36078 5.83081 6.64216 5.64276 6.96176 5.50705C7.28137 5.37134 7.62549 5.30349 7.99412 5.30349C8.36275 5.30349 8.70588 5.37134 9.02353 5.50705C9.34118 5.64276 9.61961 5.82984 9.85882 6.06829C10.098 6.30675 10.2873 6.58495 10.4265 6.90289C10.5657 7.22083 10.6412 7.56398 10.6529 7.93232C10.6608 8.06415 10.7098 8.1766 10.8 8.26965C10.8902 8.36271 11.0039 8.40924 11.1412 8.40924C11.2745 8.40924 11.3882 8.36271 11.4824 8.26965C11.5765 8.1766 11.6235 8.06415 11.6235 7.93232C11.6235 7.4399 11.5294 6.97753 11.3412 6.54521C11.1529 6.11288 10.8912 5.73194 10.5559 5.40236C10.2206 5.07279 9.83431 4.81398 9.39706 4.62593C8.9598 4.43787 8.49216 4.34385 7.99412 4.34385C7.5 4.34385 7.03431 4.43787 6.59706 4.62593C6.1598 4.81398 5.77451 5.07279 5.44118 5.40236C5.10784 5.73194 4.84706 6.11288 4.65882 6.54521C4.47059 6.97753 4.37647 7.4399 4.37647 7.93232ZM7.92353 12.3583C7.82157 12.3273 7.77255 12.2556 7.77647 12.1431L7.82941 7.50194C7.82941 7.39337 7.87353 7.32261 7.96176 7.28965C8.05 7.2567 8.13137 7.27705 8.20588 7.35072L11.4235 10.6193C11.502 10.7007 11.5206 10.7841 11.4794 10.8694C11.4382 10.9547 11.3627 10.9993 11.2529 11.0032L9.98235 11.0555L11.0412 13.475C11.0647 13.5293 11.0676 13.5835 11.05 13.6378C11.0324 13.6921 10.998 13.7309 10.9471 13.7541L10.3588 13.9868C10.3078 14.0062 10.2559 14.0042 10.2029 13.981C10.15 13.9577 10.1118 13.9189 10.0882 13.8646L9.08235 11.4103L8.18824 12.3001C8.11373 12.3699 8.02549 12.3893 7.92353 12.3583Z"
													fill="#57BD53"
												/>
											</svg>
										</div>
										<span>+245</span>
									</div> */}
									<div ref={profilePopUpButtonRef}>
										<AccountAvatar
											className="cursor-pointer"
											onClick={() => {
												setIsProfileOpen(!isProfileOpen)
											}}
											size={32}
											char={user?.name?.charAt(0)}
											img={user?.avatar}
										/>
									</div>
								</div>
							</div>
						</div>
					)}
				</>
			) : ['', 'media', 'mybanners', 'sites'].includes(
					location.pathname.split('/')[1],
			  ) ? (
				<>
					<div
						style={maxWidth}
						className={`${s.header_company} ${s.table_header_company}`}>
						<div className={s.container}>
							<HeaderDownMenu className="pt-[14px]" />
						</div>
						<div className={s.container}>
							<div className={s.icons_header}>
								<svg
									ref={RateOpenButtonRef}
									onClick={() => setisRateOpen(!isRateOpen)}
									className="mr-4"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M6.74219 20.9849C6.51972 21.0273 6.32008 20.9806 6.14325 20.8449C5.96642 20.7149 5.85947 20.5396 5.82239 20.3191C5.78531 20.0985 5.82096 19.8356 5.92934 19.5303L7.7176 14.2548L3.14856 10.998C2.88047 10.8114 2.69508 10.6191 2.59241 10.4212C2.48973 10.2233 2.47262 10.0198 2.54107 9.81058C2.60952 9.60703 2.74357 9.45436 2.94321 9.35258C3.14286 9.25081 3.4081 9.20275 3.73894 9.2084L9.34329 9.24233L11.046 3.94144C11.1487 3.63045 11.2784 3.3958 11.4353 3.23748C11.5922 3.07916 11.779 3 11.9957 3C12.2182 3 12.4078 3.07916 12.5647 3.23748C12.7216 3.3958 12.8513 3.63045 12.954 3.94144L14.6567 9.24233L20.2611 9.2084C20.5919 9.20275 20.8571 9.25081 21.0568 9.35258C21.2564 9.45436 21.3905 9.60703 21.4589 9.81058C21.5274 10.0198 21.5103 10.2233 21.4076 10.4212C21.3049 10.6191 21.1195 10.8114 20.8514 10.998L16.2824 14.2548L18.0707 19.5303C18.179 19.8356 18.2147 20.0985 18.1776 20.3191C18.1405 20.5396 18.0336 20.7149 17.8568 20.8449C17.6799 20.9806 17.4803 21.0273 17.2578 20.9849C17.0354 20.9424 16.7929 20.8279 16.5305 20.6414L11.9957 17.3421L7.46947 20.6414C7.20708 20.8279 6.96465 20.9424 6.74219 20.9849ZM7.37535 19.0893C7.36394 19.1288 7.36394 19.1543 7.37535 19.1656C7.38676 19.1826 7.41243 19.1769 7.45236 19.1486L11.5679 16.0359C11.7048 15.9285 11.8488 15.8748 12 15.8748C12.1512 15.8748 12.2952 15.9285 12.4321 16.0359L16.5476 19.1486C16.5876 19.1769 16.6132 19.1826 16.6247 19.1656C16.6304 19.1543 16.6304 19.1288 16.6247 19.0893L14.922 14.2379C14.882 14.1305 14.8635 14.0287 14.8663 13.9326C14.8692 13.8364 14.8963 13.7474 14.9476 13.6654C14.999 13.5834 15.0731 13.5085 15.1701 13.4406L19.4311 10.523C19.471 10.5004 19.4853 10.4778 19.4739 10.4552C19.4682 10.4382 19.4425 10.4297 19.3969 10.4297L14.2203 10.523C14.0435 10.5287 13.8981 10.4933 13.784 10.417C13.6699 10.3407 13.5872 10.2149 13.5358 10.0396L12.0471 5.12884C12.0357 5.0836 12.0185 5.06099 11.9957 5.06099C11.9786 5.06099 11.9643 5.0836 11.9529 5.12884L10.4642 10.0396C10.4128 10.2149 10.3301 10.3407 10.216 10.417C10.1019 10.4933 9.95648 10.5287 9.77965 10.523L4.60313 10.4297C4.55749 10.4297 4.53182 10.4382 4.52612 10.4552C4.51471 10.4778 4.52897 10.5004 4.5689 10.523L8.82991 13.4406C8.92688 13.5085 9.00104 13.5834 9.05237 13.6654C9.10371 13.7474 9.13081 13.8364 9.13366 13.9326C9.13651 14.0287 9.11797 14.1305 9.07804 14.2379L7.37535 19.0893Z"
										fill="CurrentColor"
									/>
								</svg>
								{/* <svg
									ref={notificationPopUpButtonRef}
									onClick={() => setIsNotificationOpen(!isNotificationOpen)}
									className={s.svgDinDon}
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M3 17.3243C3 17.6793 3.12719 17.9632 3.38156 18.1762C3.63593 18.3892 3.98887 18.4956 4.44038 18.4956H8.46582C8.49126 19.1217 8.65819 19.6993 8.96661 20.2285C9.27504 20.7577 9.68998 21.1852 10.2114 21.5111C10.7329 21.837 11.3275 22 11.9952 22C12.6693 22 13.2671 21.8387 13.7886 21.516C14.31 21.1933 14.725 20.7657 15.0334 20.2333C15.3418 19.7009 15.5087 19.1217 15.5342 18.4956H19.5596C20.0111 18.4956 20.3641 18.3892 20.6184 18.1762C20.8728 17.9632 21 17.6793 21 17.3243C21 17.0016 20.9078 16.6886 20.7234 16.3853C20.5389 16.082 20.3084 15.7851 20.0318 15.4947C19.7552 15.2043 19.4801 14.9138 19.2067 14.6234C18.9968 14.404 18.8331 14.1168 18.7154 13.7619C18.5978 13.4069 18.5103 13.0294 18.4531 12.6292C18.3959 12.2291 18.3545 11.8419 18.3291 11.4676C18.31 10.1962 18.1781 9.07809 17.9332 8.11326C17.6884 7.14843 17.3084 6.34334 16.7933 5.69797C16.2782 5.0526 15.5978 4.57502 14.752 4.26525C14.593 3.63278 14.2703 3.09713 13.7838 2.65828C13.2973 2.21943 12.7011 2 11.9952 2C11.2957 2 10.7027 2.21943 10.2162 2.65828C9.72973 3.09713 9.40699 3.63278 9.24801 4.26525C8.40223 4.57502 7.72019 5.0526 7.20191 5.69797C6.68362 6.34334 6.30366 7.14843 6.062 8.11326C5.82035 9.07809 5.68998 10.1962 5.67091 11.4676C5.64547 11.8419 5.60413 12.2291 5.5469 12.6292C5.48967 13.0294 5.40223 13.4069 5.28458 13.7619C5.16693 14.1168 5.00318 14.404 4.79332 14.6234C4.51987 14.9138 4.24483 15.2043 3.9682 15.4947C3.69157 15.7851 3.46105 16.082 3.27663 16.3853C3.09221 16.6886 3 17.0016 3 17.3243ZM4.85056 17.0339V16.9177C4.90779 16.8274 5.00318 16.7064 5.13672 16.5547C5.27027 16.403 5.4213 16.2369 5.58983 16.0561C5.75835 15.8754 5.92528 15.6915 6.09062 15.5044C6.26232 15.3107 6.41176 15.0865 6.53895 14.8316C6.66614 14.5766 6.77425 14.2878 6.86328 13.9651C6.95231 13.6425 7.02226 13.2843 7.07313 12.8906C7.12401 12.4969 7.16216 12.0645 7.1876 11.5934C7.21304 10.1865 7.35612 9.07002 7.61685 8.24395C7.87758 7.41788 8.22576 6.80316 8.66137 6.39981C9.09698 5.99645 9.58824 5.71733 10.1351 5.56244C10.256 5.53662 10.3482 5.48984 10.4118 5.42207C10.4754 5.35431 10.5103 5.25912 10.5167 5.1365C10.5358 4.63311 10.6773 4.22168 10.9412 3.90223C11.2051 3.58277 11.5564 3.42304 11.9952 3.42304C12.4404 3.42304 12.7949 3.58277 13.0588 3.90223C13.3227 4.22168 13.4642 4.63311 13.4833 5.1365C13.4833 5.25912 13.5167 5.35431 13.5835 5.42207C13.6502 5.48984 13.7409 5.53662 13.8553 5.56244C14.4022 5.71733 14.8935 5.99645 15.3291 6.39981C15.7647 6.80316 16.1145 7.41788 16.3784 8.24395C16.6423 9.07002 16.787 10.1865 16.8124 11.5934C16.8315 12.0645 16.868 12.4969 16.9221 12.8906C16.9762 13.2843 17.0461 13.6425 17.132 13.9651C17.2178 14.2878 17.3243 14.5766 17.4515 14.8316C17.5787 15.0865 17.7281 15.3107 17.8998 15.5044C18.0715 15.6915 18.2417 15.8754 18.4102 16.0561C18.5787 16.2369 18.7281 16.403 18.8585 16.5547C18.9889 16.7064 19.0827 16.8274 19.1399 16.9177V17.0339H4.85056ZM14.0461 18.4956H9.9539C9.98569 19.1539 10.1908 19.6751 10.5692 20.0591C10.9475 20.443 11.4229 20.635 11.9952 20.635C12.5739 20.635 13.0509 20.443 13.4261 20.0591C13.8013 19.6751 14.0079 19.1539 14.0461 18.4956Z"
										fill="CurrentColor"
									/>
								</svg> */}
								{/* <div
									ref={statAccPopUpButtonRef}
									onClick={() => {
										setIsStatAcc(!isStatAcc)
									}}
									className={s.touchBtn}>
									<div className={s.touchSVG}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M2 7.93232C2 8.67289 2.13235 9.37566 2.39706 10.0406C2.66176 10.7056 3.02647 11.2998 3.49118 11.8232C3.95588 12.3467 4.48431 12.7693 5.07647 13.0911C5.19804 13.157 5.31373 13.1842 5.42353 13.1725C5.53333 13.1609 5.62451 13.1202 5.69706 13.0504C5.76961 12.9806 5.81667 12.8973 5.83824 12.8003C5.8598 12.7034 5.84706 12.6035 5.8 12.5008C5.75294 12.398 5.66078 12.3079 5.52353 12.2303C5.02941 11.9589 4.59314 11.6061 4.21471 11.1718C3.83627 10.7376 3.5402 10.2442 3.32647 9.69166C3.11275 9.13914 3.00588 8.5527 3.00588 7.93232C3.00588 7.24603 3.13431 6.60434 3.39118 6.00723C3.64804 5.41012 4.00392 4.88474 4.45882 4.43109C4.91373 3.97744 5.44314 3.62363 6.04706 3.36967C6.65098 3.1157 7.3 2.98872 7.99412 2.98872C8.68824 2.98872 9.33824 3.1157 9.94412 3.36967C10.55 3.62363 11.0814 3.97744 11.5382 4.43109C11.9951 4.88474 12.3529 5.41012 12.6118 6.00723C12.8706 6.60434 13 7.24603 13 7.93232C13 8.1068 13.0559 8.23669 13.1676 8.322C13.2794 8.4073 13.4 8.44995 13.5294 8.44995C13.6471 8.44995 13.7549 8.40633 13.8529 8.31909C13.951 8.23185 14 8.10293 14 7.93232C14 7.12196 13.8431 6.35909 13.5294 5.64373C13.2157 4.92836 12.7824 4.29732 12.2294 3.75062C11.6765 3.20391 11.0373 2.77547 10.3118 2.46528C9.58627 2.15509 8.81373 2 7.99412 2C7.17451 2 6.40294 2.15509 5.67941 2.46528C4.95588 2.77547 4.31863 3.20391 3.76765 3.75062C3.21667 4.29732 2.78431 4.92836 2.47059 5.64373C2.15686 6.35909 2 7.12196 2 7.93232ZM4.37647 7.93232C4.37647 8.36271 4.44804 8.76595 4.59118 9.14205C4.73431 9.51815 4.92549 9.85354 5.16471 10.1482C5.40392 10.4429 5.66667 10.6814 5.95294 10.8636C6.10196 10.9605 6.2402 10.9954 6.36765 10.9683C6.4951 10.9411 6.5951 10.8772 6.66765 10.7763C6.7402 10.6755 6.77157 10.565 6.76176 10.4448C6.75196 10.3246 6.68431 10.2219 6.55882 10.1366C6.19412 9.90007 5.90098 9.58891 5.67941 9.20312C5.45784 8.81733 5.34706 8.39373 5.34706 7.93232C5.34706 7.56398 5.41471 7.2218 5.55 6.9058C5.68529 6.5898 5.87451 6.3116 6.11765 6.0712C6.36078 5.83081 6.64216 5.64276 6.96176 5.50705C7.28137 5.37134 7.62549 5.30349 7.99412 5.30349C8.36275 5.30349 8.70588 5.37134 9.02353 5.50705C9.34118 5.64276 9.61961 5.82984 9.85882 6.06829C10.098 6.30675 10.2873 6.58495 10.4265 6.90289C10.5657 7.22083 10.6412 7.56398 10.6529 7.93232C10.6608 8.06415 10.7098 8.1766 10.8 8.26965C10.8902 8.36271 11.0039 8.40924 11.1412 8.40924C11.2745 8.40924 11.3882 8.36271 11.4824 8.26965C11.5765 8.1766 11.6235 8.06415 11.6235 7.93232C11.6235 7.4399 11.5294 6.97753 11.3412 6.54521C11.1529 6.11288 10.8912 5.73194 10.5559 5.40236C10.2206 5.07279 9.83431 4.81398 9.39706 4.62593C8.9598 4.43787 8.49216 4.34385 7.99412 4.34385C7.5 4.34385 7.03431 4.43787 6.59706 4.62593C6.1598 4.81398 5.77451 5.07279 5.44118 5.40236C5.10784 5.73194 4.84706 6.11288 4.65882 6.54521C4.47059 6.97753 4.37647 7.4399 4.37647 7.93232ZM7.92353 12.3583C7.82157 12.3273 7.77255 12.2556 7.77647 12.1431L7.82941 7.50194C7.82941 7.39337 7.87353 7.32261 7.96176 7.28965C8.05 7.2567 8.13137 7.27705 8.20588 7.35072L11.4235 10.6193C11.502 10.7007 11.5206 10.7841 11.4794 10.8694C11.4382 10.9547 11.3627 10.9993 11.2529 11.0032L9.98235 11.0555L11.0412 13.475C11.0647 13.5293 11.0676 13.5835 11.05 13.6378C11.0324 13.6921 10.998 13.7309 10.9471 13.7541L10.3588 13.9868C10.3078 14.0062 10.2559 14.0042 10.2029 13.981C10.15 13.9577 10.1118 13.9189 10.0882 13.8646L9.08235 11.4103L8.18824 12.3001C8.11373 12.3699 8.02549 12.3893 7.92353 12.3583Z"
												fill="#57BD53"
											/>
										</svg>
									</div>
									<span>+245</span>
								</div> */}
								<div ref={profilePopUpButtonRef}>
									<AccountAvatar
										className="cursor-pointer"
										onClick={() => {
											setIsProfileOpen(!isProfileOpen)
										}}
										size={32}
										char={user?.name?.charAt(0)}
										img={user?.avatar}
									/>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<div style={maxWidth} className={s.header}>
					<div className={s.logo}>
						<img src={logo} alt="logo" />
						<img src={BetaLogo} alt="Beta" />
					</div>
				</div>
			)}
			{isProfileOpen && (
				<div ref={profilePopUpRef} className="absolute right-4 z-10">
					{' '}
					{/* right-8 */} {/* right-[10px] */}
					<ProfilePopUp blogger={user?.isBlogger} />
				</div>
			)}

			{isNotificationOpen && (
				<div ref={notificationPopUpRef} className="absolute right-4 z-10">
					{' '}
					{/* right-8 */} {/* right-[150px] */}
					<NotificationMenu
						text_balance="Balance: $100"
						num_balance={`100`}
						text_notification="New notification"
						text_company="Company ABC"
						text_course_table="Course XYZ"
						text_id_table="ID: 123"
						date="2022-01-01"
					/>
				</div>
			)}
			{isStatAcc && (
				<div ref={statAccPopUpRef} className="absolute right-4 z-10">
					{' '}
					{/* right-8 */} {/* right-[70px] */}
					<StatusAcc />
				</div>
			)}
			{isRateOpen && (
				<div ref={RateOpenRef} className="absolute right-4 z-10">
					{' '}
					{/* right-8 */}
					<RatePopUp onExit={() => setisRateOpen(false)} />
				</div>
			)}
		</>
	)
}

export default Header
