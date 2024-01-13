import React from 'react'
import s from './index.module.scss'
import NavLabel from '../NavLabel/index'
import Col from '../Col'
import Label from '../Label'
import Line from '../Line/index'
import BlueButton from '../BlueButton/index'
import Row from '../Row/index'
import {Link} from 'react-router-dom'

interface INotificationMenu {
	text_balance?: string
	text_notification?: string
	text_company?: string
	text_course_table?: string
	text_id_table?: string
	num_balance?: string
	date?: string
}

const NotificationMenu: React.FC<INotificationMenu> = ({
	text_balance,
	num_balance,
	text_notification,
	text_company,
	text_course_table,
	text_id_table,
	date,
}: INotificationMenu) => {
	return (
		<div className={s.wrapper}>
			<div className={s.header_notice}>
				<NavLabel className={s.NavLabel} text="Уведомления" />
				<button>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M15.2025 8.73664C15.5955 8.73664 15.9543 8.64122 16.2789 8.45038C16.6035 8.25954 16.8625 8.00411 17.0561 7.68409C17.1237 7.57224 17.1795 7.45627 17.2236 7.33617H20.3122C20.4968 7.33617 20.6576 7.26718 20.7945 7.12918C20.9315 6.99119 21 6.82237 21 6.62272C21 6.42895 20.9315 6.26307 20.7945 6.12507C20.6576 5.98708 20.4968 5.91809 20.3122 5.91809H17.2268C17.1823 5.79485 17.1254 5.67594 17.0561 5.56136C16.8625 5.24134 16.6035 4.98444 16.2789 4.79066C15.9543 4.59689 15.5955 4.5 15.2025 4.5C14.8094 4.5 14.4506 4.59689 14.1261 4.79066C13.8015 4.98444 13.5409 5.24134 13.3444 5.56136C13.2741 5.67594 13.2163 5.79485 13.1711 5.91809H3.71464C3.51811 5.91809 3.34988 5.98708 3.20993 6.12507C3.06998 6.26307 3 6.42895 3 6.62272C3 6.82237 3.06998 6.99119 3.20993 7.12918C3.34988 7.26718 3.51811 7.33617 3.71464 7.33617H13.1744C13.219 7.45627 13.2757 7.57224 13.3444 7.68409C13.5409 8.00411 13.8015 8.25954 14.1261 8.45038C14.4506 8.64122 14.8094 8.73664 15.2025 8.73664ZM13.1744 7.33617H13.8268V5.91809H13.1711C13.0901 6.13905 13.0496 6.37393 13.0496 6.62272C13.0496 6.87483 13.0912 7.11264 13.1744 7.33617ZM17.2268 5.91809H16.6318V7.33617H17.2236C17.3055 7.11264 17.3464 6.87483 17.3464 6.62272C17.3464 6.37393 17.3065 6.13905 17.2268 5.91809ZM8.89578 14.1271C9.28883 14.1271 9.64764 14.0302 9.97221 13.8365C10.2968 13.6427 10.5558 13.3858 10.7494 13.0658C10.8187 12.9512 10.8756 12.8323 10.9201 12.709H20.2764C20.4789 12.709 20.6501 12.6415 20.7901 12.5065C20.93 12.3714 21 12.2041 21 12.0044C21 11.8048 20.93 11.6359 20.7901 11.4979C20.6501 11.36 20.4789 11.291 20.2764 11.291H10.9169C10.8728 11.1709 10.817 11.0549 10.7494 10.943C10.5558 10.623 10.2968 10.3676 9.97221 10.1767C9.64764 9.98591 9.28883 9.89049 8.89578 9.89049C8.50273 9.89049 8.14392 9.98591 7.81936 10.1767C7.49479 10.3676 7.23573 10.623 7.04218 10.943C6.97454 11.0549 6.91872 11.1709 6.87471 11.291H3.67891C3.50025 11.291 3.34243 11.36 3.20546 11.4979C3.06849 11.6359 3 11.8048 3 12.0044C3 12.2041 3.06849 12.3714 3.20546 12.5065C3.34243 12.6415 3.50025 12.709 3.67891 12.709H6.87151C6.91599 12.8323 6.97289 12.9512 7.04218 13.0658C7.23573 13.3858 7.49479 13.6427 7.81936 13.8365C8.14392 14.0302 8.50273 14.1271 8.89578 14.1271ZM6.87151 12.709H7.35931V11.291H6.87471C6.79281 11.5145 6.75186 11.7523 6.75186 12.0044C6.75186 12.2532 6.79174 12.4881 6.87151 12.709ZM10.9169 11.291H10.3161V12.709H10.9201C10.9998 12.4881 11.0397 12.2532 11.0397 12.0044C11.0397 11.7523 10.9988 11.5145 10.9169 11.291ZM16.2789 19.2137C15.9543 19.4046 15.5955 19.5 15.2025 19.5C14.8094 19.5 14.4506 19.4046 14.1261 19.2137C13.8015 19.0229 13.5409 18.7675 13.3444 18.4474C13.2741 18.3329 13.2163 18.214 13.1711 18.0907H13.7821V16.6726H13.1744C13.219 16.5525 13.2757 16.4366 13.3444 16.3247C13.5409 16.0047 13.8015 15.7493 14.1261 15.5584C14.4506 15.3676 14.8094 15.2722 15.2025 15.2722C15.5955 15.2722 15.9543 15.3676 16.2789 15.5584C16.6035 15.7493 16.8625 16.0047 17.0561 16.3247C17.1237 16.4366 17.1795 16.5525 17.2236 16.6726H16.7568V18.0907H17.2268C17.1823 18.214 17.1254 18.3329 17.0561 18.4474C16.8625 18.7675 16.6035 19.0229 16.2789 19.2137ZM17.2268 18.0907H20.3122C20.4968 18.0907 20.6576 18.0217 20.7945 17.8837C20.9315 17.7457 21 17.5799 21 17.3861C21 17.1864 20.9315 17.0176 20.7945 16.8796C20.6576 16.7416 20.4968 16.6726 20.3122 16.6726H17.2236C17.3055 16.8962 17.3464 17.134 17.3464 17.3861C17.3464 17.6349 17.3065 17.8698 17.2268 18.0907ZM13.1744 16.6726H3.71464C3.51811 16.6726 3.34988 16.7416 3.20993 16.8796C3.06998 17.0176 3 17.1864 3 17.3861C3 17.5799 3.06998 17.7457 3.20993 17.8837C3.34988 18.0217 3.51811 18.0907 3.71464 18.0907H13.1711C13.0901 17.8698 13.0496 17.6349 13.0496 17.3861C13.0496 17.134 13.0912 16.8962 13.1744 16.6726ZM14.461 18.1171C14.6635 18.3168 14.9107 18.4166 15.2025 18.4166C15.4943 18.4166 15.7414 18.3168 15.9439 18.1171C16.1464 17.9175 16.2476 17.6738 16.2476 17.3861C16.2476 17.0925 16.1464 16.8473 15.9439 16.6506C15.7414 16.4539 15.4943 16.3555 15.2025 16.3555C14.9107 16.3555 14.6635 16.4539 14.461 16.6506C14.2586 16.8473 14.1573 17.0925 14.1573 17.3861C14.1573 17.6738 14.2586 17.9175 14.461 18.1171ZM8.15434 12.7355C8.35682 12.9351 8.60397 13.0349 8.89578 13.0349C9.19355 13.0349 9.44218 12.9351 9.64169 12.7355C9.84119 12.5358 9.94094 12.2921 9.94094 12.0044C9.94094 11.7108 9.84119 11.4656 9.64169 11.2689C9.44218 11.0722 9.19355 10.9739 8.89578 10.9739C8.60397 10.9739 8.35682 11.0722 8.15434 11.2689C7.95186 11.4656 7.85062 11.7108 7.85062 12.0044C7.85062 12.2921 7.95186 12.5358 8.15434 12.7355ZM14.461 7.34938C14.6635 7.55197 14.9107 7.65326 15.2025 7.65326C15.4943 7.65326 15.7414 7.55197 15.9439 7.34938C16.1464 7.1468 16.2476 6.90164 16.2476 6.61392C16.2476 6.32619 16.1464 6.0825 15.9439 5.88285C15.7414 5.68321 15.4943 5.58338 15.2025 5.58338C14.9107 5.58338 14.6635 5.68321 14.461 5.88285C14.2586 6.0825 14.1573 6.32619 14.1573 6.61392C14.1573 6.90164 14.2586 7.1468 14.461 7.34938Z"
							fill="#808080"
						/>
					</svg>
				</button>
			</div>
			<Line width="280px" className={s.LineHeader} />
			<Col width="280px">
				<div className={s.btnAllRead}>
					<button className={s.blueLink}>Отметить все прочитанным</button>
				</div>

				{/* Balance */}
				<Col width="280px" className={s.colBalance}>
					<div className={s.balance}>
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M10.3147 13.5294C9.59118 13.8431 8.81961 14 8 14C7.18039 14 6.40882 13.8431 5.68529 13.5294C4.96176 13.2157 4.32353 12.7824 3.77059 12.2294C3.21765 11.6765 2.78431 11.0382 2.47059 10.3147C2.15686 9.59118 2 8.81961 2 8C2 7.18039 2.15686 6.40882 2.47059 5.68529C2.78431 4.96176 3.21667 4.32353 3.76765 3.77059C4.31863 3.21765 4.95588 2.78431 5.67941 2.47059C6.40294 2.15686 7.17451 2 7.99412 2C8.81373 2 9.58627 2.15686 10.3118 2.47059C11.0373 2.78431 11.6765 3.21765 12.2294 3.77059C12.7824 4.32353 13.2157 4.96176 13.5294 5.68529C13.8431 6.40882 14 7.18039 14 8C14 8.81961 13.8431 9.59118 13.5294 10.3147C13.2157 11.0382 12.7824 11.6765 12.2294 12.2294C11.6765 12.7824 11.0382 13.2157 10.3147 13.5294ZM6.05294 12.6118C6.65686 12.8706 7.30588 13 8 13C8.69412 13 9.34412 12.8706 9.95 12.6118C10.5559 12.3529 11.0873 11.9951 11.5441 11.5382C12.001 11.0814 12.3578 10.551 12.6147 9.94706C12.8716 9.34314 13 8.69412 13 8C13 7.30588 12.8706 6.65686 12.6118 6.05294C12.3529 5.44902 11.9941 4.91765 11.5353 4.45882C11.0765 4 10.5451 3.64216 9.94118 3.38529C9.33726 3.12843 8.68824 3 7.99412 3C7.3 3 6.65098 3.12843 6.04706 3.38529C5.44314 3.64216 4.91373 4 4.45882 4.45882C4.00392 4.91765 3.64804 5.44902 3.39118 6.05294C3.13431 6.65686 3.00588 7.30588 3.00588 8C3.00588 8.69412 3.13431 9.34314 3.39118 9.94706C3.64804 10.551 4.0049 11.0814 4.46176 11.5382C4.91863 11.9951 5.44902 12.3529 6.05294 12.6118ZM7.99412 9.05882C8.28824 9.05882 8.43725 8.90392 8.44118 8.59412L8.52941 5.48824C8.53333 5.33922 8.48333 5.21471 8.37941 5.11471C8.27549 5.01471 8.1451 4.96471 7.98824 4.96471C7.82745 4.96471 7.69706 5.01373 7.59706 5.11176C7.49706 5.2098 7.44902 5.33333 7.45294 5.48235L7.52941 8.59412C7.53725 8.90392 7.69216 9.05882 7.99412 9.05882ZM8.43824 10.7941C8.31078 10.9118 8.16274 10.9706 7.99412 10.9706C7.82157 10.9706 7.67255 10.9108 7.54706 10.7912C7.42157 10.6716 7.35882 10.5275 7.35882 10.3588C7.35882 10.1902 7.42157 10.0461 7.54706 9.92647C7.67255 9.80686 7.82157 9.74706 7.99412 9.74706C8.16667 9.74706 8.31569 9.80588 8.44118 9.92353C8.56667 10.0412 8.62941 10.1863 8.62941 10.3588C8.62941 10.5314 8.56569 10.6765 8.43824 10.7941Z"
									fill="#F3553E"
								/>
							</svg>
						</div>
						<div className={s.balanceText}>
							<p>
								{text_balance == ''
									? `Ваши деньги на счете заончились и теперь компания не будет рабоать. Ваш текущий баланс: ${num_balance}₽`
									: text_balance}
							</p>
							<Label isMini={true} text={date == '' ? '22.12.2024' : date} />
						</div>
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<rect x="4" y="4" width="8" height="8" rx="4" fill="#4169E1" />
							</svg>
						</div>
					</div>
					<BlueButton
						className={s.blueButtonHeader}
						text="Пополнить"
						width="248px"
					/>
					<Line width="264px" className={s.LineMenu} />
				</Col>

				{/* Notification menu */}
				<Col width="280px">
					<Row width="280px" className={s.notiMenu}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M2 11.5497C2 11.7863 2.08479 11.9756 2.25437 12.1176C2.42395 12.2596 2.65925 12.3306 2.96025 12.3306H5.64388C5.66084 12.7479 5.77213 13.133 5.97774 13.4858C6.18336 13.8386 6.45999 14.1236 6.80763 14.3409C7.15527 14.5582 7.55167 14.6668 7.99682 14.6668C8.44621 14.6668 8.84473 14.5593 9.19237 14.3441C9.54001 14.129 9.81664 13.844 10.0223 13.489C10.2279 13.1341 10.3392 12.7479 10.3561 12.3306H13.0397C13.3408 12.3306 13.576 12.2596 13.7456 12.1176C13.9152 11.9756 14 11.7863 14 11.5497C14 11.3346 13.9385 11.1259 13.8156 10.9237C13.6926 10.7215 13.539 10.5236 13.3545 10.3299C13.1701 10.1363 12.9868 9.94273 12.8045 9.74911C12.6645 9.60283 12.5554 9.41137 12.4769 9.17474C12.3985 8.9381 12.3402 8.68641 12.3021 8.41965C12.2639 8.1529 12.2364 7.89475 12.2194 7.64521C12.2067 6.79762 12.1187 6.05222 11.9555 5.409C11.7923 4.76579 11.5389 4.22905 11.1955 3.79881C10.8521 3.36856 10.3985 3.05018 9.83466 2.84366C9.72867 2.42202 9.51351 2.06491 9.18919 1.77235C8.86486 1.47978 8.46741 1.3335 7.99682 1.3335C7.53047 1.3335 7.13514 1.47978 6.81081 1.77235C6.48649 2.06491 6.27133 2.42202 6.16534 2.84366C5.60148 3.05018 5.14679 3.36856 4.80127 3.79881C4.45575 4.22905 4.20244 4.76579 4.04134 5.409C3.88023 6.05222 3.79332 6.79762 3.7806 7.64521C3.76365 7.89475 3.73609 8.1529 3.69793 8.41965C3.65978 8.68641 3.60148 8.9381 3.52305 9.17474C3.44462 9.41137 3.33545 9.60283 3.19555 9.74911C3.01325 9.94273 2.82989 10.1363 2.64547 10.3299C2.46105 10.5236 2.30737 10.7215 2.18442 10.9237C2.06147 11.1259 2 11.3346 2 11.5497ZM3.2337 11.3561V11.2786C3.27186 11.2184 3.33545 11.1377 3.42448 11.0366C3.51351 10.9355 3.6142 10.8247 3.72655 10.7043C3.8389 10.5838 3.95019 10.4612 4.06041 10.3364C4.17488 10.2073 4.27451 10.0578 4.3593 9.88787C4.44409 9.71792 4.51616 9.52539 4.57552 9.31026C4.63487 9.09514 4.6815 8.85635 4.71542 8.5939C4.74934 8.33145 4.77477 8.04319 4.79173 7.72911C4.80869 6.79117 4.90408 6.04684 5.0779 5.49613C5.25172 4.94541 5.48384 4.5356 5.77424 4.2667C6.06465 3.9978 6.39216 3.81171 6.75676 3.70846C6.83731 3.69125 6.89878 3.66005 6.94118 3.61488C6.98357 3.5697 7.00689 3.50624 7.01113 3.42449C7.02385 3.0889 7.11818 2.81462 7.29412 2.60165C7.47006 2.38868 7.70429 2.28219 7.99682 2.28219C8.29359 2.28219 8.52994 2.38868 8.70588 2.60165C8.88182 2.81462 8.97615 3.0889 8.98887 3.42449C8.98887 3.50624 9.01113 3.5697 9.05564 3.61488C9.10016 3.66005 9.16057 3.69125 9.23688 3.70846C9.60148 3.81171 9.92899 3.9978 10.2194 4.2667C10.5098 4.5356 10.743 4.94541 10.9189 5.49613C11.0949 6.04684 11.1913 6.79117 11.2083 7.72911C11.221 8.04319 11.2454 8.33145 11.2814 8.5939C11.3174 8.85635 11.3641 9.09514 11.4213 9.31026C11.4785 9.52539 11.5495 9.71792 11.6343 9.88787C11.7191 10.0578 11.8188 10.2073 11.9332 10.3364C12.0477 10.4612 12.1611 10.5838 12.2734 10.7043C12.3858 10.8247 12.4854 10.9355 12.5723 11.0366C12.6592 11.1377 12.7218 11.2184 12.7599 11.2786V11.3561H3.2337ZM9.36407 12.3306H6.63593C6.65713 12.7694 6.79385 13.1169 7.0461 13.3729C7.29836 13.6289 7.61526 13.7569 7.99682 13.7569C8.38262 13.7569 8.70058 13.6289 8.95072 13.3729C9.20085 13.1169 9.33863 12.7694 9.36407 12.3306Z"
								fill="white"
							/>
						</svg>
						<Col width="200px" className={s.notiText}>
							<p>
								{text_notification == ''
									? 'На вашем аккаунте заканчиваются средства'
									: text_notification}
							</p>
							<Label isMini={true} text={date == '' ? '22.12.2024' : date} />
						</Col>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none">
							<rect x="4" y="4" width="8" height="8" rx="4" fill="#4169E1" />
						</svg>
					</Row>
					<Line width="264px" className={s.LineMenu} />
				</Col>

				{/* Company Menu*/}
				<Col width="280px">
					<Row width="280px" className={s.companyMenu}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M2 11.5497C2 11.7863 2.08479 11.9756 2.25437 12.1176C2.42395 12.2596 2.65925 12.3306 2.96025 12.3306H5.64388C5.66084 12.7479 5.77213 13.133 5.97774 13.4858C6.18336 13.8386 6.45999 14.1236 6.80763 14.3409C7.15527 14.5582 7.55167 14.6668 7.99682 14.6668C8.44621 14.6668 8.84473 14.5593 9.19237 14.3441C9.54001 14.129 9.81664 13.844 10.0223 13.489C10.2279 13.1341 10.3392 12.7479 10.3561 12.3306H13.0397C13.3408 12.3306 13.576 12.2596 13.7456 12.1176C13.9152 11.9756 14 11.7863 14 11.5497C14 11.3346 13.9385 11.1259 13.8156 10.9237C13.6926 10.7215 13.539 10.5236 13.3545 10.3299C13.1701 10.1363 12.9868 9.94273 12.8045 9.74911C12.6645 9.60283 12.5554 9.41137 12.4769 9.17474C12.3985 8.9381 12.3402 8.68641 12.3021 8.41965C12.2639 8.1529 12.2364 7.89475 12.2194 7.64521C12.2067 6.79762 12.1187 6.05222 11.9555 5.409C11.7923 4.76579 11.5389 4.22905 11.1955 3.79881C10.8521 3.36856 10.3985 3.05018 9.83466 2.84366C9.72867 2.42202 9.51351 2.06491 9.18919 1.77235C8.86486 1.47978 8.46741 1.3335 7.99682 1.3335C7.53047 1.3335 7.13514 1.47978 6.81081 1.77235C6.48649 2.06491 6.27133 2.42202 6.16534 2.84366C5.60148 3.05018 5.14679 3.36856 4.80127 3.79881C4.45575 4.22905 4.20244 4.76579 4.04134 5.409C3.88023 6.05222 3.79332 6.79762 3.7806 7.64521C3.76365 7.89475 3.73609 8.1529 3.69793 8.41965C3.65978 8.68641 3.60148 8.9381 3.52305 9.17474C3.44462 9.41137 3.33545 9.60283 3.19555 9.74911C3.01325 9.94273 2.82989 10.1363 2.64547 10.3299C2.46105 10.5236 2.30737 10.7215 2.18442 10.9237C2.06147 11.1259 2 11.3346 2 11.5497ZM3.2337 11.3561V11.2786C3.27186 11.2184 3.33545 11.1377 3.42448 11.0366C3.51351 10.9355 3.6142 10.8247 3.72655 10.7043C3.8389 10.5838 3.95019 10.4612 4.06041 10.3364C4.17488 10.2073 4.27451 10.0578 4.3593 9.88787C4.44409 9.71792 4.51616 9.52539 4.57552 9.31026C4.63487 9.09514 4.6815 8.85635 4.71542 8.5939C4.74934 8.33145 4.77477 8.04319 4.79173 7.72911C4.80869 6.79117 4.90408 6.04684 5.0779 5.49613C5.25172 4.94541 5.48384 4.5356 5.77424 4.2667C6.06465 3.9978 6.39216 3.81171 6.75676 3.70846C6.83731 3.69125 6.89878 3.66005 6.94118 3.61488C6.98357 3.5697 7.00689 3.50624 7.01113 3.42449C7.02385 3.0889 7.11818 2.81462 7.29412 2.60165C7.47006 2.38868 7.70429 2.28219 7.99682 2.28219C8.29359 2.28219 8.52994 2.38868 8.70588 2.60165C8.88182 2.81462 8.97615 3.0889 8.98887 3.42449C8.98887 3.50624 9.01113 3.5697 9.05564 3.61488C9.10016 3.66005 9.16057 3.69125 9.23688 3.70846C9.60148 3.81171 9.92899 3.9978 10.2194 4.2667C10.5098 4.5356 10.743 4.94541 10.9189 5.49613C11.0949 6.04684 11.1913 6.79117 11.2083 7.72911C11.221 8.04319 11.2454 8.33145 11.2814 8.5939C11.3174 8.85635 11.3641 9.09514 11.4213 9.31026C11.4785 9.52539 11.5495 9.71792 11.6343 9.88787C11.7191 10.0578 11.8188 10.2073 11.9332 10.3364C12.0477 10.4612 12.1611 10.5838 12.2734 10.7043C12.3858 10.8247 12.4854 10.9355 12.5723 11.0366C12.6592 11.1377 12.7218 11.2184 12.7599 11.2786V11.3561H3.2337ZM9.36407 12.3306H6.63593C6.65713 12.7694 6.79385 13.1169 7.0461 13.3729C7.29836 13.6289 7.61526 13.7569 7.99682 13.7569C8.38262 13.7569 8.70058 13.6289 8.95072 13.3729C9.20085 13.1169 9.33863 12.7694 9.36407 12.3306Z"
								fill="#808080"
							/>
						</svg>
						<Col width="200px" className={s.companyText}>
							<p>
								{text_company == '' ? 'Компания заблокирована' : text_company}
							</p>
							<Label isMini={true} text={date == '' ? '22.12.2024' : date} />
						</Col>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none">
							<g opacity="0.01">
								<rect x="4" y="4" width="8" height="8" rx="4" fill="#4169E1" />
							</g>
						</svg>
					</Row>
				</Col>

				{/* Table Menu */}
				<div className={s.TableContainer}>
					<Row width="248px" className={s.TableMenu}>
						<Col width="200px" className={s.TableText}>
							<p>
								{text_course_table == ''
									? 'курсы английского языка'
									: text_course_table}
							</p>
							<Label
								isMini={true}
								text={
									text_id_table == '' ? 'ID 9876543210' : `ID ${text_id_table}`
								}
							/>
						</Col>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none">
							<path
								d="M5.5 13L10.5 8L5.5 3"
								stroke="#808080"
								strokeWidth="1.4"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Row>
				</div>
			</Col>
		</div>
	)
}

export default NotificationMenu
