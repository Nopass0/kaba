import React from 'react'
import s from './index.module.scss'
import Col from '../../Col/index'
import Row from '../../Row'
import NavLabel from '../../NavLabel/index'
import Label from '../../Label/index'
import AccountAvatar from '../../AccountAvatar/index'
import BlueButton from '../../BlueButton/index'
import Line from '../../Line'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import ProfilePopUpLeftSide from '../ProfilePopUpLeftSide/index'

interface IProfilePopUp {
	className?: string // Added className prop
	blogger: boolean
}

const ProfilePopUp: React.FC<IProfilePopUp> = ({blogger}: IProfilePopUp) => {
	const user = useSelector((state: any) => state.user)
	const [leftSideOpen, setLeftSideOpen] = React.useState(false)
	return (
		<div className={`${blogger ? s.wrapperBlogger : s.wrapper}`}>
			<Col width="248px">
				<Row
					onClick={() => setLeftSideOpen(!leftSideOpen)}
					className={`${s.AccountLine}`}
					width="248px">
					<AccountAvatar img={user?.avatar} char={user?.name[0]} />
					<Col className={s.AccountText} width="128px">
						<NavLabel className={s.AccountName} text={user?.name} />
						<Row width="128px">
							<Label isMini={true} text={user?.nick} />
							{/* <svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<rect
									x="6.7998"
									y="6.7998"
									width="5.2"
									height="5.2"
									rx="0.8"
									stroke="#808080"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M5.2 9.2H4.8C4.35817 9.2 4 8.84183 4 8.4V4.8C4 4.35817 4.35817 4 4.8 4H8.4C8.84183 4 9.2 4.35817 9.2 4.8V5.2"
									stroke="#808080"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg> */}
						</Row>
					</Col>
					{/* <svg
						className={s.AccountSvg}
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none">
						<path
							d="M3 11L8 6L13 11"
							stroke="#808080"
							strokeWidth="1.4"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg> */}
				</Row>
				<BlueButton
					onClick={() => {
						setLeftSideOpen(!leftSideOpen)
						// window.localStorage.clear()
						let OldLocal = JSON.parse(localStorage.getItem('kaba_data'))
						OldLocal.user = undefined
						localStorage.setItem('kaba_data', JSON.stringify(OldLocal))
						window.location.reload()
					}}
					className={s.AccountBlueButton}
					width="248px"
					text="Выйти"
				/>
				{/* <Link to="/finance"> */}
				{/* <Row className={s.AccountPages} width="248px">
					<Link to="/finance" className={s.AccountPages}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M14.5719 6.19315C14.8161 6.19315 15.0061 6.12161 15.1421 5.97854C15.278 5.83547 15.346 5.63461 15.346 5.37598V4.50929C15.346 4.25065 15.278 4.0498 15.1421 3.90673C15.0061 3.76365 14.8161 3.69212 14.5719 3.69212H13.8062C13.7784 3.22438 13.5912 2.82542 13.2444 2.49525C12.8975 2.16508 12.4828 2 12 2C11.5172 2 11.1025 2.16508 10.7556 2.49525C10.4088 2.82542 10.2216 3.22438 10.1938 3.69212H9.42806C9.18391 3.69212 8.99386 3.76365 8.85791 3.90673C8.72196 4.0498 8.65398 4.25065 8.65398 4.50929V5.37598C8.65398 5.63461 8.72196 5.83547 8.85791 5.97854C8.99386 6.12161 9.18391 6.19315 9.42806 6.19315H14.5719ZM7.58026 22C6.72017 22 6.07511 21.784 5.64507 21.352C5.21502 20.9201 5 20.2721 5 19.4082V6.89476C5 6.04732 5.2067 5.40349 5.6201 4.96327C6.03349 4.52304 6.65636 4.30293 7.4887 4.30293H7.68847C7.68292 4.33595 7.68014 4.37034 7.68014 4.40611V4.50929V5.25217C7.68014 5.40625 7.69124 5.53281 7.71344 5.63186H7.51367C7.12525 5.63186 6.83254 5.74742 6.63555 5.97854C6.43857 6.20966 6.34007 6.52057 6.34007 6.91127V19.3917C6.34007 19.8044 6.44966 20.1208 6.66885 20.3409C6.88803 20.561 7.21403 20.6711 7.64685 20.6711H16.3532C16.786 20.6711 17.112 20.561 17.3312 20.3409C17.5503 20.1208 17.6599 19.8044 17.6599 19.3917V6.91127C17.6599 6.52057 17.5614 6.20966 17.3644 5.97854C17.1675 5.74742 16.8748 5.63186 16.4863 5.63186H16.2866C16.3088 5.53281 16.3199 5.40625 16.3199 5.25217V4.50929V4.40611C16.3199 4.37034 16.3171 4.33595 16.3115 4.30293H16.5113C17.3436 4.30293 17.9665 4.52304 18.3799 4.96327C18.7933 5.40349 19 6.04732 19 6.89476V19.4082C19 20.2721 18.785 20.9201 18.3549 21.352C17.9249 21.784 17.2798 22 16.4197 22H7.58026ZM8.48751 10.9889C8.68173 10.9889 8.8482 10.9201 8.98692 10.7825C9.12564 10.6449 9.19501 10.4798 9.19501 10.2872C9.19501 10.0891 9.12564 9.92269 8.98692 9.78787C8.8482 9.65305 8.68173 9.58564 8.48751 9.58564C8.29885 9.58564 8.13377 9.65442 7.99227 9.79199C7.85077 9.92956 7.78002 10.0946 7.78002 10.2872C7.78002 10.4743 7.85077 10.6381 7.99227 10.7784C8.13377 10.9187 8.29885 10.9889 8.48751 10.9889ZM8.48751 13.9109C8.68173 13.9109 8.8482 13.8434 8.98692 13.7086C9.12564 13.5738 9.19501 13.4073 9.19501 13.2092C9.19501 13.0166 9.12564 12.8529 8.98692 12.7181C8.8482 12.5833 8.68173 12.5159 8.48751 12.5159C8.2933 12.5159 8.12683 12.5847 7.98811 12.7222C7.84939 12.8598 7.78002 13.0221 7.78002 13.2092C7.78002 13.4073 7.84939 13.5738 7.98811 13.7086C8.12683 13.8434 8.2933 13.9109 8.48751 13.9109ZM8.98692 16.7998C8.8482 16.9374 8.68173 17.0062 8.48751 17.0062C8.29885 17.0062 8.13377 16.936 7.99227 16.7957C7.85077 16.6554 7.78002 16.4917 7.78002 16.3046C7.78002 16.112 7.85077 15.9469 7.99227 15.8093C8.13377 15.6718 8.29885 15.603 8.48751 15.603C8.68173 15.603 8.8482 15.6704 8.98692 15.8052C9.12564 15.94 9.19501 16.1065 9.19501 16.3046C9.19501 16.4972 9.12564 16.6623 8.98692 16.7998ZM10.7099 10.799H15.7039C15.8426 10.799 15.9633 10.7481 16.066 10.6463C16.1686 10.5445 16.22 10.4248 16.22 10.2872C16.22 10.1442 16.1686 10.0217 16.066 9.91993C15.9633 9.81813 15.8426 9.76723 15.7039 9.76723H10.7099C10.5656 9.76723 10.4421 9.81813 10.3395 9.91993C10.2368 10.0217 10.1855 10.1442 10.1855 10.2872C10.1855 10.4248 10.2368 10.5445 10.3395 10.6463C10.4421 10.7481 10.5656 10.799 10.7099 10.799ZM15.7039 13.7293H10.7099C10.56 13.7293 10.4352 13.6784 10.3353 13.5766C10.2354 13.4748 10.1855 13.3523 10.1855 13.2092C10.1855 13.0717 10.2354 12.9534 10.3353 12.8543C10.4352 12.7553 10.56 12.7057 10.7099 12.7057H15.7039C15.8482 12.7057 15.9703 12.7553 16.0702 12.8543C16.17 12.9534 16.22 13.0717 16.22 13.2092C16.22 13.3523 16.17 13.4748 16.0702 13.5766C15.9703 13.6784 15.8482 13.7293 15.7039 13.7293ZM10.7099 16.8163H15.7039C15.8426 16.8163 15.9633 16.7654 16.066 16.6636C16.1686 16.5618 16.22 16.4422 16.22 16.3046C16.22 16.1615 16.17 16.0404 16.0702 15.9414C15.9703 15.8423 15.8482 15.7928 15.7039 15.7928H10.7099C10.56 15.7928 10.4352 15.8423 10.3353 15.9414C10.2354 16.0404 10.1855 16.1615 10.1855 16.3046C10.1855 16.4422 10.2368 16.5618 10.3395 16.6636C10.4421 16.7654 10.5656 16.8163 10.7099 16.8163ZM11.4881 4.26166C11.6296 4.40473 11.8002 4.47627 12 4.47627C12.1998 4.47627 12.3704 4.40473 12.5119 4.26166C12.6534 4.11859 12.7241 3.95075 12.7241 3.75815C12.7241 3.55455 12.6534 3.38258 12.5119 3.24226C12.3704 3.10194 12.1998 3.03178 12 3.03178C11.8002 3.03178 11.6296 3.10194 11.4881 3.24226C11.3466 3.38258 11.2759 3.55455 11.2759 3.75815C11.2759 3.95075 11.3466 4.11859 11.4881 4.26166Z"
								fill="#F2F2F2"
							/>
						</svg>
						<span className={s.AccountSpan}>Финансы</span>
					</Link>
				</Row> */}
				{/* </Link> */}
				{/* <Line className={s.AccountLineComponent} width="280px" />
				<Row className={s.AccountPages} width="248px">
					<Link to="/settings" className={s.AccountPages}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M11.1505 21C10.8252 21 10.5463 20.9088 10.3136 20.7264C10.0808 20.544 9.92804 20.2956 9.85514 19.9813L9.48505 18.4069L9.21589 18.3143L7.85327 19.1562C7.5785 19.3302 7.29252 19.3976 6.99533 19.3583C6.69813 19.319 6.43458 19.1843 6.20467 18.9542L5.03551 17.7839C4.8 17.5538 4.66402 17.29 4.62757 16.9925C4.59112 16.695 4.65981 16.4116 4.83364 16.1422L5.68318 14.7783L5.59065 14.5257L4.01776 14.1553C3.70935 14.0823 3.46262 13.928 3.27757 13.6922C3.09252 13.4565 3 13.1787 3 12.8587V11.1918C3 10.8718 3.09112 10.594 3.27336 10.3583C3.45561 10.1225 3.70374 9.96819 4.01776 9.89523L5.57383 9.51637L5.67477 9.24696L4.82523 7.88307C4.6514 7.61366 4.58271 7.33162 4.61916 7.03695C4.65561 6.74228 4.79159 6.47708 5.0271 6.24135L6.19626 5.06268C6.42617 4.83817 6.68832 4.70627 6.98271 4.66698C7.2771 4.62769 7.56168 4.69224 7.83645 4.86062L9.19907 5.70253L9.48505 5.59308L9.85514 4.01871C9.92804 3.71001 10.0808 3.46305 10.3136 3.27783C10.5463 3.09261 10.8252 3 11.1505 3H12.8495C13.1748 3 13.4537 3.09261 13.6864 3.27783C13.9192 3.46305 14.072 3.71001 14.1449 4.01871L14.5065 5.59308L14.7925 5.70253L16.1636 4.86062C16.4327 4.69224 16.7159 4.62769 17.0131 4.66698C17.3103 4.70627 17.571 4.83817 17.7953 5.06268L18.9729 6.24135C19.2028 6.47708 19.3374 6.74228 19.3766 7.03695C19.4159 7.33162 19.3486 7.61366 19.1748 7.88307L18.3168 9.24696L18.4262 9.51637L19.9822 9.89523C20.2907 9.96819 20.5374 10.1225 20.7224 10.3583C20.9075 10.594 21 10.8718 21 11.1918V12.8587C21 13.1787 20.9075 13.4565 20.7224 13.6922C20.5374 13.928 20.2907 14.0823 19.9822 14.1553L18.4093 14.5257L18.3084 14.7783L19.1664 16.1422C19.3402 16.4116 19.4075 16.695 19.3682 16.9925C19.329 17.29 19.1944 17.5538 18.9645 17.7839L17.7869 18.9542C17.557 19.1843 17.2935 19.319 16.9963 19.3583C16.6991 19.3976 16.4159 19.3302 16.1467 19.1562L14.7757 18.3143L14.5065 18.4069L14.1449 19.9813C14.072 20.2956 13.9192 20.544 13.6864 20.7264C13.4537 20.9088 13.1748 21 12.8495 21H11.1505ZM11.0411 19.493C11.0636 19.6221 11.1449 19.6866 11.285 19.6866H12.715C12.8551 19.6866 12.9336 19.6221 12.9505 19.493L13.4636 17.4051C13.7215 17.3433 13.9654 17.2633 14.1953 17.1651C14.4252 17.0669 14.6299 16.9616 14.8093 16.8494L16.643 17.9775C16.7495 18.0505 16.8561 18.0365 16.9626 17.9355L17.9467 16.942C18.0421 16.8578 18.0533 16.754 17.9804 16.6305L16.8533 14.812C16.9542 14.6324 17.0537 14.4275 17.1519 14.1974C17.25 13.9673 17.3327 13.7231 17.4 13.4649L19.4944 12.9682C19.6234 12.9457 19.6879 12.8644 19.6879 12.724V11.3181C19.6879 11.1833 19.6234 11.102 19.4944 11.0739L17.4084 10.5688C17.3411 10.2937 17.2542 10.0384 17.1477 9.80262C17.0411 9.56688 16.9486 9.37044 16.8701 9.21328L17.9888 7.39476C18.0673 7.27128 18.0589 7.16183 17.9636 7.06642L16.971 6.0898C16.8701 6 16.7607 5.98597 16.643 6.04771L14.8178 7.15903C14.6327 7.058 14.4266 6.95837 14.1995 6.86015C13.9724 6.76193 13.7271 6.67914 13.4636 6.61179L12.9505 4.50702C12.9336 4.37792 12.8551 4.31338 12.715 4.31338H11.285C11.1449 4.31338 11.0636 4.37792 11.0411 4.50702L10.5449 6.59495C10.2925 6.6623 10.0444 6.74649 9.80047 6.84752C9.55654 6.94855 9.34486 7.04958 9.16542 7.15061L7.3486 6.04771C7.23645 5.98597 7.12991 6 7.02897 6.0898L6.02804 7.06642C5.93832 7.16183 5.92991 7.27128 6.0028 7.39476L7.1215 9.21328L6.84813 9.80262C6.73879 10.0384 6.65047 10.2937 6.58318 10.5688L4.50561 11.0739C4.37664 11.102 4.31215 11.1833 4.31215 11.3181V12.724C4.31215 12.8644 4.37664 12.9457 4.50561 12.9682L6.59159 13.4649C6.65888 13.7231 6.74299 13.9673 6.84393 14.1974C6.94486 14.4275 7.04299 14.6324 7.13832 14.812L6.01121 16.6305C5.94393 16.754 5.95514 16.8578 6.04486 16.942L7.03738 17.9355C7.14393 18.0365 7.24766 18.0505 7.3486 17.9775L9.18224 16.8494C9.36168 16.9616 9.56776 17.0669 9.80047 17.1651C10.0332 17.2633 10.2785 17.3433 10.5364 17.4051L11.0411 19.493ZM12 15.2161C12.5888 15.2161 13.1257 15.0716 13.6107 14.7825C14.0958 14.4935 14.4827 14.1048 14.7715 13.6165C15.0603 13.1282 15.2047 12.5893 15.2047 12C15.2047 11.4163 15.0603 10.8817 14.7715 10.3962C14.4827 9.91066 14.0958 9.52339 13.6107 9.23433C13.1257 8.94528 12.5888 8.80075 12 8.80075C11.4112 8.80075 10.8743 8.94528 10.3893 9.23433C9.90421 9.52339 9.51589 9.91066 9.2243 10.3962C8.93271 10.8817 8.78692 11.4163 8.78692 12C8.78692 12.5893 8.93271 13.1268 9.2243 13.6123C9.51589 14.0978 9.90421 14.4864 10.3893 14.7783C10.8743 15.0702 11.4112 15.2161 12 15.2161ZM11.0453 13.6544C11.3341 13.8255 11.6523 13.9111 12 13.9111C12.3421 13.9111 12.6561 13.8241 12.9421 13.6501C13.228 13.4761 13.4565 13.2446 13.6276 12.9556C13.7986 12.6665 13.8841 12.348 13.8841 12C13.8841 11.652 13.7986 11.3349 13.6276 11.0486C13.4565 10.7624 13.228 10.5337 12.9421 10.3625C12.6561 10.1913 12.3421 10.1057 12 10.1057C11.6523 10.1057 11.3341 10.1913 11.0453 10.3625C10.7565 10.5337 10.5266 10.7624 10.3556 11.0486C10.1846 11.3349 10.0991 11.652 10.0991 12C10.0991 12.3536 10.1846 12.6749 10.3556 12.964C10.5266 13.253 10.7565 13.4832 11.0453 13.6544Z"
							fill="#F2F2F2"
						/>
					</svg>
					<span className={s.AccountSpan}>Настройки</span>
					</Link>
					
				</Row> */}
				{blogger ? (
					<>
						<Line className={s.AccountLineComponent} width="280px" />
						<Row className={s.AccountPages} width="248px">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M11.3375 8.3656L9.83174 7.46314C9.71702 7.39728 9.62954 7.31796 9.56931 7.22516C9.50908 7.13237 9.47897 6.99617 9.47897 6.81657V4.78705C9.47897 4.60745 9.50765 4.47424 9.56501 4.38743C9.62237 4.30063 9.70554 4.22729 9.81453 4.16742L11.5526 3.1347C11.8509 2.9551 12.152 2.9551 12.456 3.1347L14.1941 4.16742C14.3031 4.23327 14.3848 4.30811 14.4393 4.39192C14.4938 4.47574 14.521 4.60745 14.521 4.78705V6.81657C14.521 6.99617 14.4938 7.13087 14.4393 7.22067C14.3848 7.31048 14.2973 7.3913 14.1769 7.46314L12.7228 8.33466V5.92753H11.3375V8.3656ZM7.62623 15.4489L11.3375 13.5068V8.3656L11.5698 8.50484C11.8623 8.67845 12.152 8.67845 12.4388 8.50484L12.7228 8.33466V13.5068L16.4014 15.4346C16.1861 15.6094 16.0784 15.8468 16.0784 16.147L16.0814 16.8713L12.0258 14.746L7.91847 16.8985L7.92161 16.138C7.92161 15.851 7.82315 15.6213 7.62623 15.4489ZM7.62623 15.4489L5.19407 16.7217L5.89101 17.9609L7.91847 16.8985L7.913 18.2214C7.91874 18.371 7.89866 18.4908 7.85277 18.5806C7.80688 18.6704 7.7065 18.7602 7.55163 18.85L5.87381 19.8647C5.72467 19.9545 5.60134 19.9964 5.50382 19.9905C5.40631 19.9845 5.30306 19.9456 5.19407 19.8737L3.47323 18.823C3.16922 18.6434 3.01721 18.371 3.01721 18.0058L3 15.9224C3 15.7967 3.01864 15.686 3.05593 15.5902C3.09321 15.4944 3.18642 15.4046 3.33556 15.3208L5.0392 14.2881C5.1826 14.2042 5.3088 14.1668 5.41778 14.1758C5.52677 14.1848 5.63576 14.2222 5.74474 14.2881L7.47419 15.3387C7.53011 15.3724 7.58079 15.4091 7.62623 15.4489ZM16.0814 16.8713L18.1606 17.9609L18.8576 16.7217L16.4014 15.4346C16.4395 15.4037 16.481 15.3747 16.5258 15.3477L18.2553 14.297C18.3642 14.2312 18.4732 14.1938 18.5822 14.1848C18.6912 14.1758 18.8174 14.2132 18.9608 14.297L20.6644 15.3298C20.8136 15.4136 20.9068 15.5034 20.9441 15.5992C20.9814 15.695 21 15.8057 21 15.9314L20.9828 18.0148C20.9828 18.38 20.8308 18.6524 20.5268 18.832L18.8059 19.8827C18.6969 19.9545 18.5937 19.9935 18.4962 19.9994C18.3987 20.0054 18.2753 19.9635 18.1262 19.8737L16.4484 18.859C16.2935 18.7692 16.1931 18.6794 16.1472 18.5896C16.1013 18.4998 16.0813 18.38 16.087 18.2303L16.0814 16.8713Z"
									fill="#F2F2F2"
								/>
							</svg>
							<span className={s.AccountSpan}>Реферальная программа</span>
						</Row>

						<Line className={s.AccountLineComponent} width="280px" />
						<Row className={s.AccountPages_last} width="248px">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M7.55529 21H18.3341C18.5172 21 18.674 20.9342 18.8044 20.8026C18.9348 20.671 19 20.5128 19 20.328C19 20.1825 18.9556 20.0495 18.8668 19.9291C18.778 19.8087 18.6671 19.7261 18.5339 19.6813C18.1843 19.5413 17.9332 19.3131 17.7806 18.9967C17.628 18.6804 17.5906 18.3304 17.6683 17.9468C17.7459 17.5632 17.9568 17.1951 18.3008 16.8423C18.4562 16.6855 18.6116 16.4895 18.7669 16.2543C18.9223 16.0191 19 15.6916 19 15.2716V5.63742C19 4.76388 18.785 4.10593 18.3549 3.66356C17.9249 3.22119 17.2798 3 16.4197 3H7.58026C6.72017 3 6.07511 3.21979 5.64507 3.65936C5.21502 4.09893 5 4.75828 5 5.63742V18.4046C5 19.2669 5.21363 19.9151 5.6409 20.349C6.06817 20.783 6.7063 21 7.55529 21ZM16.1451 8.38404H9.9025C9.75268 8.38404 9.62505 8.32944 9.51962 8.22025C9.41419 8.11106 9.36147 7.98087 9.36147 7.82968C9.36147 7.67849 9.41419 7.5497 9.51962 7.4433C9.62505 7.33691 9.75268 7.28371 9.9025 7.28371H16.1451C16.2949 7.28371 16.4225 7.33691 16.5279 7.4433C16.6334 7.5497 16.6861 7.67849 16.6861 7.82968C16.6861 7.98087 16.6334 8.11106 16.5279 8.22025C16.4225 8.32944 16.2949 8.38404 16.1451 8.38404ZM14.6385 10.6939H9.9025C9.75268 10.6939 9.62505 10.6393 9.51962 10.5301C9.41419 10.4209 9.36147 10.2907 9.36147 10.1395C9.36147 9.98833 9.41419 9.85954 9.51962 9.75315C9.62505 9.64676 9.75268 9.59356 9.9025 9.59356H14.6385C14.7883 9.59356 14.916 9.64676 15.0214 9.75315C15.1268 9.85954 15.1795 9.98833 15.1795 10.1395C15.1795 10.2907 15.1268 10.4209 15.0214 10.5301C14.916 10.6393 14.7883 10.6939 14.6385 10.6939ZM6.34007 5.66262V16.1451C6.52319 16.0331 6.72711 15.9477 6.95184 15.8889C7.06891 15.8583 7.19237 15.8357 7.32224 15.821V16.5231H8.4126V15.8007H16.9358C17.4185 15.8007 17.6599 15.5628 17.6599 15.0868V5.66262C17.6599 5.24265 17.5503 4.91927 17.3312 4.69249C17.112 4.4657 16.786 4.35231 16.3532 4.35231H8.4126V4.02473H7.32224V4.37596C7.04803 4.41999 6.83023 4.5255 6.66885 4.69249C6.44966 4.91927 6.34007 5.24265 6.34007 5.66262ZM7.32224 4.37596V15.821C7.44167 15.8075 7.56653 15.8007 7.69679 15.8007H8.4126V4.35231H7.63853C7.52586 4.35231 7.42043 4.36019 7.32224 4.37596ZM7.6302 19.6477C7.20848 19.6477 6.88803 19.5385 6.66885 19.3201C6.44966 19.1017 6.34007 18.7937 6.34007 18.3962C6.34007 18.021 6.46354 17.72 6.71046 17.4932C6.95739 17.2664 7.28894 17.1531 7.70511 17.1531H16.2449C16.3504 17.1531 16.4475 17.1447 16.5363 17.1279C16.3421 17.5646 16.2574 18.0028 16.2824 18.4424C16.3074 18.8819 16.4308 19.2837 16.6528 19.6477H7.6302Z"
									fill="#F2F2F2"
								/>
							</svg>
							<span className={s.AccountSpan}>Справка. База знаний</span>
						</Row>

						<Row className={s.AccountPages_last} width="248px">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M3 12.3586C3 13.219 3.08251 14.095 3.24754 14.9867C3.41257 15.8784 3.6498 16.7488 3.95923 17.5977C4.26866 18.4467 4.63851 19.2387 5.06876 19.9737C5.17485 20.156 5.32367 20.2714 5.51523 20.3198C5.67451 20.3601 5.83685 20.3462 6.00224 20.2782C6.15101 20.5065 6.34525 20.6843 6.58497 20.8113C6.98281 21.0221 7.43811 21.0563 7.95088 20.9138C8.46365 20.7714 8.82908 20.505 9.04715 20.1147C9.26523 19.7244 9.29764 19.2843 9.1444 18.7943L7.88016 14.6235C7.73281 14.1335 7.46022 13.7845 7.06238 13.5765C6.66454 13.3685 6.20923 13.3329 5.69646 13.4697C5.21226 13.6042 4.85944 13.8492 4.63801 14.2047C4.54797 13.5834 4.50295 12.968 4.50295 12.3586C4.50295 11.1735 4.68124 10.0966 5.03782 9.12797C5.3944 8.15935 5.90275 7.32605 6.56287 6.62807C7.22299 5.93009 8.01277 5.39307 8.93222 5.01702C9.85167 4.64096 10.8743 4.45294 12 4.45294C13.1198 4.45294 14.1395 4.64096 15.0589 5.01702C15.9784 5.39307 16.7696 5.93009 17.4327 6.62807C18.0958 7.32605 18.6056 8.15935 18.9622 9.12797C19.3188 10.0966 19.4971 11.1735 19.4971 12.3586C19.4971 12.9702 19.4513 13.5879 19.3597 14.2115C19.1388 13.8528 18.7837 13.6055 18.2947 13.4697C17.7819 13.3329 17.3266 13.3685 16.9288 13.5765C16.5309 13.7845 16.2584 14.1335 16.111 14.6235L14.8468 18.7943C14.6935 19.29 14.7274 19.7316 14.9484 20.119C15.1694 20.5065 15.5334 20.7714 16.0403 20.9138C16.553 21.0563 17.0084 21.0221 17.4062 20.8113C17.6459 20.6843 17.8401 20.5065 17.9889 20.2782C18.1543 20.3462 18.3167 20.3601 18.4759 20.3198C18.6675 20.2714 18.8163 20.156 18.9224 19.9737C19.3527 19.2387 19.724 18.4467 20.0363 17.5977C20.3487 16.7488 20.5874 15.8784 20.7525 14.9867C20.9175 14.095 21 13.219 21 12.3586C21 10.9513 20.7863 9.67353 20.359 8.52543C19.9317 7.37733 19.3217 6.39161 18.529 5.56828C17.7362 4.74495 16.7873 4.11107 15.6822 3.66664C14.5771 3.22221 13.3497 3 12 3C10.6444 3 9.41405 3.22221 8.30894 3.66664C7.20383 4.11107 6.25639 4.74495 5.4666 5.56828C4.67682 6.39161 4.06827 7.37733 3.64096 8.52543C3.21365 9.67353 3 10.9513 3 12.3586ZM17.9889 20.2782C18.0871 20.1275 18.1654 19.9548 18.224 19.76L19.4882 15.5978C19.6415 15.0964 19.609 14.652 19.391 14.2645C19.3809 14.2466 19.3705 14.2289 19.3597 14.2115C19.279 14.7615 19.1627 15.3162 19.0108 15.8756C18.6866 17.0693 18.2299 18.1875 17.6405 19.2301C17.5285 19.4296 17.4946 19.6219 17.5388 19.807C17.583 19.9922 17.6994 20.1332 17.888 20.2301C17.9218 20.2483 17.9554 20.2644 17.9889 20.2782ZM4.63801 14.2047C4.62495 14.2257 4.61235 14.2471 4.6002 14.2688C4.38212 14.6591 4.34971 15.1021 4.50295 15.5978L5.76719 19.76C5.82575 19.9548 5.90411 20.1275 6.00224 20.2782C6.03575 20.2644 6.06938 20.2483 6.10314 20.2301C6.29175 20.1332 6.40815 19.9922 6.45236 19.807C6.49656 19.6219 6.46267 19.4296 6.35069 19.2301C5.7613 18.1875 5.30599 17.0693 4.98477 15.8756C4.83363 15.3139 4.71804 14.7569 4.63801 14.2047Z"
									fill="#F2F2F2"
								/>
							</svg>
							<span className={s.AccountSpan}>Поддержка</span>
						</Row>

						<Row className={s.AccountPages_last} width="248px">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M7.01891 20.9849C6.80816 21.0273 6.61902 20.9806 6.4515 20.8449C6.28398 20.7149 6.18265 20.5396 6.14753 20.3191C6.1124 20.0985 6.14618 19.8356 6.24885 19.5303L7.94299 14.2548L3.61443 10.998C3.36044 10.8114 3.18481 10.6191 3.08754 10.4212C2.99027 10.2233 2.97406 10.0198 3.03891 9.81058C3.10376 9.60703 3.23075 9.45436 3.41989 9.35258C3.60902 9.25081 3.86031 9.20275 4.17374 9.2084L9.48311 9.24233L11.0962 3.94144C11.1935 3.63045 11.3164 3.3958 11.465 3.23748C11.6136 3.07916 11.7906 3 11.9959 3C12.2067 3 12.3864 3.07916 12.535 3.23748C12.6836 3.3958 12.8065 3.63045 12.9038 3.94144L14.5169 9.24233L19.8263 9.2084C20.1397 9.20275 20.391 9.25081 20.5801 9.35258C20.7693 9.45436 20.8962 9.60703 20.9611 9.81058C21.0259 10.0198 21.0097 10.2233 20.9125 10.4212C20.8152 10.6191 20.6396 10.8114 20.3856 10.998L16.057 14.2548L17.7511 19.5303C17.8538 19.8356 17.8876 20.0985 17.8525 20.3191C17.8173 20.5396 17.716 20.7149 17.5485 20.8449C17.381 20.9806 17.1918 21.0273 16.9811 20.9849C16.7703 20.9424 16.5407 20.8279 16.2921 20.6414L11.9959 17.3421L7.70792 20.6414C7.45934 20.8279 7.22967 20.9424 7.01891 20.9849ZM7.61875 19.0893C7.60794 19.1288 7.60794 19.1543 7.61875 19.1656C7.62956 19.1826 7.65388 19.1769 7.6917 19.1486L11.5907 16.0359C11.7203 15.9285 11.8568 15.8748 12 15.8748C12.1432 15.8748 12.2797 15.9285 12.4093 16.0359L16.3083 19.1486C16.3461 19.1769 16.3704 19.1826 16.3812 19.1656C16.3867 19.1543 16.3867 19.1288 16.3812 19.0893L14.7682 14.2379C14.7303 14.1305 14.7128 14.0287 14.7155 13.9326C14.7182 13.8364 14.7439 13.7474 14.7925 13.6654C14.8411 13.5834 14.9114 13.5085 15.0032 13.4406L19.04 10.523C19.0778 10.5004 19.0913 10.4778 19.0805 10.4552C19.0751 10.4382 19.0508 10.4297 19.0076 10.4297L14.1035 10.523C13.936 10.5287 13.7982 10.4933 13.6901 10.417C13.582 10.3407 13.5036 10.2149 13.455 10.0396L12.0446 5.12884C12.0338 5.0836 12.0176 5.06099 11.9959 5.06099C11.9797 5.06099 11.9662 5.0836 11.9554 5.12884L10.545 10.0396C10.4964 10.2149 10.418 10.3407 10.3099 10.417C10.2018 10.4933 10.064 10.5287 9.89651 10.523L4.99243 10.4297C4.9492 10.4297 4.92489 10.4382 4.91948 10.4552C4.90867 10.4778 4.92218 10.5004 4.96001 10.523L8.99676 13.4406C9.08862 13.5085 9.15888 13.5834 9.20751 13.6654C9.25615 13.7474 9.28182 13.8364 9.28452 13.9326C9.28722 14.0287 9.26966 14.1305 9.23183 14.2379L7.61875 19.0893Z"
									fill="#F2F2F2"
								/>
							</svg>
							<span className={s.AccountSpan}>Предложить улучшение</span>
						</Row>
					</>
				) : (
					<></>
				)}
				{/* {leftSideOpen ? (
					<div className={s.leftsideOpen}>
						<ProfilePopUpLeftSide />
					</div>
				) : (
					<></>
				)} */}
			</Col>
		</div>
	)
}

export default ProfilePopUp
