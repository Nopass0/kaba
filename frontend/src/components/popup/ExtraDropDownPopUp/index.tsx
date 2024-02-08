import React from 'react'
import s from './index.module.scss'
import Row from '../../Row'
import Col from '../../Col'
import Line from '../../Line'
import WhiteLabel from '../../WhiteLabel/index'
import {Collapse, ListItemButton} from '@mui/material'
import {ExpandLess, ExpandMore} from '@mui/icons-material'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'

interface IExtraDropDownPopUp {
	className?: string // Added className prop
}

const ExtraDropDownPopUp: React.FC<IExtraDropDownPopUp> = ({
	className,
}: IExtraDropDownPopUp) => {
	const dispatch = useDispatch()

	const setCurrentUrl = (url: string) => {
		dispatch({
			type: 'setUrl',
			CurrentURL: url,
		})
	}

	return (
		<div className={s.wrapper + ' ' + className}>
			<Col width="150px" className={s.ColWrapper}>
				<Link
					onClick={() => setCurrentUrl('/finance')}
					to={'/finance'}
					className={s.WhiteLabelBtn}>
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
					<WhiteLabel className={s.WhiteLabel} text="Финансы" />
				</Link>
				{/* <Line width="157px" className={s.Line} />
				<Link
					onClick={() => setCurrentUrl('/settings')}
					to={'/settings'}
					className={s.WhiteLabelBtn}>
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
					<WhiteLabel className={s.WhiteLabel} text="Настройка" />
				</Link> */}
			</Col>
		</div>
	)
}

export default ExtraDropDownPopUp
