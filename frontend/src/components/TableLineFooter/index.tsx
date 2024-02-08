import React from 'react'
import s from './index.module.scss'
import CheckBox from '../CheckBox/index'
import Row from '../Row'
import Button from '../Button'
import ButtonSVG from '../ButtonSVG'

interface ITableLineFooter {
	className: string
	companies?: string
	blogger?: boolean
	company_id?:number
}

const TableLineFooter: React.FC<ITableLineFooter> = ({
	className,
	companies,
	blogger = false,
	company_id,
}: ITableLineFooter) => {
	return (
		<div className={s.wrapper + ' ' + className}>
			<Row width="100%" className={s.TableLineContainer}>
				<CheckBox
					id="TablieLine"
					labelText={`${companies ? companies : '3'} компании`}
					className={s.checkboxLine}
				/>
				{blogger ? (
					<>
						<ButtonSVG width="179px" text="Удалить" className={s.ButtonSVG}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M6.47522 4.33787H5.44734V4.16349H6.47522V4.33787ZM9.5191 4.16349H6.47522V3.3842C6.47522 3.24614 6.52065 3.13533 6.61151 3.05177C6.70237 2.96821 6.82542 2.92643 6.98064 2.92643H9.01368C9.1689 2.92643 9.29195 2.96821 9.38281 3.05177C9.47367 3.13533 9.5191 3.24614 9.5191 3.3842V4.16349ZM10.5413 4.16349H13.0741C13.1914 4.16349 13.2918 4.20345 13.3751 4.28338C13.4584 4.36331 13.5 4.45958 13.5 4.57221C13.5 4.68483 13.4584 4.78202 13.3751 4.86376C13.2918 4.9455 13.1914 4.98638 13.0741 4.98638H12.2223L11.8588 12.9482C11.8437 13.2861 11.7348 13.5459 11.5323 13.7275C11.3297 13.9092 11.0524 14 10.7003 14H5.29969C4.95139 14 4.67596 13.9092 4.47341 13.7275C4.27087 13.5459 4.16202 13.2861 4.14688 12.9482L3.78343 4.98638H2.92592C2.81234 4.98638 2.71296 4.9455 2.62777 4.86376C2.54259 4.78202 2.5 4.68483 2.5 4.57221C2.5 4.46322 2.54259 4.36785 2.62777 4.2861C2.71296 4.20436 2.81234 4.16349 2.92592 4.16349H5.44734V3.3297C5.44734 2.91916 5.5789 2.59491 5.84202 2.35695C6.10515 2.11898 6.46386 2 6.91817 2H9.07047C9.52478 2 9.8835 2.11898 10.1466 2.35695C10.4097 2.59491 10.5413 2.91916 10.5413 3.3297V4.16349ZM10.5413 4.16349H9.5191V4.33787H10.5413V4.16349ZM6.20263 12.4414C6.10041 12.4414 6.01618 12.4124 5.94992 12.3542C5.88367 12.2961 5.85054 12.218 5.85054 12.1199L5.6745 6.18529C5.6745 6.09083 5.70668 6.01362 5.77104 5.95368C5.8354 5.89373 5.92247 5.86376 6.03227 5.86376C6.1307 5.86376 6.21304 5.89282 6.2793 5.95095C6.34555 6.00908 6.38057 6.08538 6.38436 6.17984L6.55472 12.1199C6.55851 12.2144 6.52822 12.2916 6.46386 12.3515C6.3995 12.4114 6.31242 12.4414 6.20263 12.4414ZM7.73593 12.3515C7.80408 12.4114 7.89305 12.4414 8.00284 12.4414C8.10885 12.4414 8.19592 12.4114 8.26407 12.3515C8.33221 12.2916 8.36629 12.2144 8.36629 12.1199V6.18529C8.36629 6.09083 8.33221 6.01362 8.26407 5.95368C8.19592 5.89373 8.10885 5.86376 8.00284 5.86376C7.89305 5.86376 7.80408 5.89373 7.73593 5.95368C7.66779 6.01362 7.63371 6.09083 7.63371 6.18529V12.1199C7.63371 12.2144 7.66779 12.2916 7.73593 12.3515ZM9.79737 12.4414C9.68758 12.4414 9.6005 12.4114 9.53614 12.3515C9.47178 12.2916 9.44149 12.2144 9.44528 12.1199L9.61564 6.18529C9.61943 6.08719 9.65445 6.00908 9.7207 5.95095C9.78696 5.89282 9.8693 5.86376 9.96773 5.86376C10.0775 5.86376 10.1646 5.89373 10.229 5.95368C10.2933 6.01362 10.3255 6.09083 10.3255 6.18529L10.1495 12.1199C10.1495 12.218 10.1163 12.2961 10.0501 12.3542C9.98382 12.4124 9.89959 12.4414 9.79737 12.4414Z"
									fill="#F2F2F2"
								/>
							</svg>
						</ButtonSVG>
					</>
				) : (
					<>
						<ButtonSVG width="135px" text="Остановить" className={s.ButtonSVG}>
							<svg
								style={{marginRight: '4px'}}
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<path
									d="M3 11.6442C3 12.0695 3.12175 12.4018 3.36525 12.6411C3.60876 12.8804 3.94537 13 4.37508 13H11.6249C12.0587 13 12.3964 12.8804 12.6378 12.6411C12.8793 12.4018 13 12.0695 13 11.6442V4.35583C13 3.92638 12.8793 3.59305 12.6378 3.35583C12.3964 3.11861 12.0587 3 11.6249 3H4.37508C3.94537 3 3.60876 3.11861 3.36525 3.35583C3.12175 3.59305 3 3.92638 3 4.35583V11.6442Z"
									fill="#F2F2F2"
								/>
							</svg>
						</ButtonSVG>
						<ButtonSVG width="142px" text="Возобновить" className={s.ButtonSVG}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<path
									d="M3.79365 14C3.92593 14 4.05159 13.9752 4.17063 13.9256C4.28968 13.876 4.41534 13.8086 4.54762 13.7236L12.2593 8.94625C12.537 8.77141 12.7299 8.61666 12.838 8.48198C12.946 8.34731 13 8.18547 13 7.99646C13 7.80744 12.946 7.6456 12.838 7.51093C12.7299 7.37626 12.537 7.22386 12.2593 7.05375L4.54762 2.26934C4.41534 2.18901 4.28968 2.12404 4.17063 2.07442C4.05159 2.02481 3.92593 2 3.79365 2C3.55115 2 3.35825 2.09214 3.21495 2.27643C3.07165 2.46072 3 2.70644 3 3.01359V12.9793C3 13.2865 3.07165 13.5334 3.21495 13.72C3.35825 13.9067 3.55115 14 3.79365 14Z"
									fill="#F2F2F2"
								/>
							</svg>
						</ButtonSVG>
						<ButtonSVG width="179px" text="Удалить" className={s.ButtonSVG}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M6.47522 4.33787H5.44734V4.16349H6.47522V4.33787ZM9.5191 4.16349H6.47522V3.3842C6.47522 3.24614 6.52065 3.13533 6.61151 3.05177C6.70237 2.96821 6.82542 2.92643 6.98064 2.92643H9.01368C9.1689 2.92643 9.29195 2.96821 9.38281 3.05177C9.47367 3.13533 9.5191 3.24614 9.5191 3.3842V4.16349ZM10.5413 4.16349H13.0741C13.1914 4.16349 13.2918 4.20345 13.3751 4.28338C13.4584 4.36331 13.5 4.45958 13.5 4.57221C13.5 4.68483 13.4584 4.78202 13.3751 4.86376C13.2918 4.9455 13.1914 4.98638 13.0741 4.98638H12.2223L11.8588 12.9482C11.8437 13.2861 11.7348 13.5459 11.5323 13.7275C11.3297 13.9092 11.0524 14 10.7003 14H5.29969C4.95139 14 4.67596 13.9092 4.47341 13.7275C4.27087 13.5459 4.16202 13.2861 4.14688 12.9482L3.78343 4.98638H2.92592C2.81234 4.98638 2.71296 4.9455 2.62777 4.86376C2.54259 4.78202 2.5 4.68483 2.5 4.57221C2.5 4.46322 2.54259 4.36785 2.62777 4.2861C2.71296 4.20436 2.81234 4.16349 2.92592 4.16349H5.44734V3.3297C5.44734 2.91916 5.5789 2.59491 5.84202 2.35695C6.10515 2.11898 6.46386 2 6.91817 2H9.07047C9.52478 2 9.8835 2.11898 10.1466 2.35695C10.4097 2.59491 10.5413 2.91916 10.5413 3.3297V4.16349ZM10.5413 4.16349H9.5191V4.33787H10.5413V4.16349ZM6.20263 12.4414C6.10041 12.4414 6.01618 12.4124 5.94992 12.3542C5.88367 12.2961 5.85054 12.218 5.85054 12.1199L5.6745 6.18529C5.6745 6.09083 5.70668 6.01362 5.77104 5.95368C5.8354 5.89373 5.92247 5.86376 6.03227 5.86376C6.1307 5.86376 6.21304 5.89282 6.2793 5.95095C6.34555 6.00908 6.38057 6.08538 6.38436 6.17984L6.55472 12.1199C6.55851 12.2144 6.52822 12.2916 6.46386 12.3515C6.3995 12.4114 6.31242 12.4414 6.20263 12.4414ZM7.73593 12.3515C7.80408 12.4114 7.89305 12.4414 8.00284 12.4414C8.10885 12.4414 8.19592 12.4114 8.26407 12.3515C8.33221 12.2916 8.36629 12.2144 8.36629 12.1199V6.18529C8.36629 6.09083 8.33221 6.01362 8.26407 5.95368C8.19592 5.89373 8.10885 5.86376 8.00284 5.86376C7.89305 5.86376 7.80408 5.89373 7.73593 5.95368C7.66779 6.01362 7.63371 6.09083 7.63371 6.18529V12.1199C7.63371 12.2144 7.66779 12.2916 7.73593 12.3515ZM9.79737 12.4414C9.68758 12.4414 9.6005 12.4114 9.53614 12.3515C9.47178 12.2916 9.44149 12.2144 9.44528 12.1199L9.61564 6.18529C9.61943 6.08719 9.65445 6.00908 9.7207 5.95095C9.78696 5.89282 9.8693 5.86376 9.96773 5.86376C10.0775 5.86376 10.1646 5.89373 10.229 5.95368C10.2933 6.01362 10.3255 6.09083 10.3255 6.18529L10.1495 12.1199C10.1495 12.218 10.1163 12.2961 10.0501 12.3542C9.98382 12.4124 9.89959 12.4414 9.79737 12.4414Z"
									fill="#F2F2F2"
								/>
							</svg>
						</ButtonSVG>
						{/* <ButtonSVG
					width="187px"
					text="История изменений"
					className={s.ButtonSVG}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M8.0646 14C8.87538 14 9.63864 13.8431 10.3544 13.5294C11.0701 13.2157 11.7015 12.7824 12.2485 12.2294C12.7955 11.6765 13.2241 11.0382 13.5345 10.3147C13.8448 9.59118 14 8.81961 14 8C14 7.18039 13.8448 6.40882 13.5345 5.68529C13.2241 4.96176 12.7955 4.32353 12.2485 3.77059C11.7015 3.21765 11.0701 2.78431 10.3544 2.47059C9.63864 2.15686 8.87538 2 8.0646 2C7.25381 2 6.49055 2.15686 5.77481 2.47059C5.05907 2.78431 4.42771 3.21667 3.88072 3.76765C3.33373 4.31863 2.90507 4.95588 2.59472 5.67941C2.43098 6.06114 2.31044 6.45624 2.23309 6.86471H1.41346C1.2738 6.86471 1.16906 6.89314 1.09923 6.95C1.0294 7.00686 0.996427 7.08235 1.00031 7.17647C1.00419 7.27059 1.04298 7.37255 1.11669 7.48235L2.42015 9.35294C2.51713 9.4902 2.62769 9.55784 2.75183 9.55588C2.87597 9.55392 2.98459 9.48627 3.0777 9.35294L4.38116 7.47647C4.45487 7.36667 4.49269 7.26569 4.49463 7.17353C4.49657 7.08137 4.46262 7.00686 4.3928 6.95C4.32297 6.89314 4.22016 6.86471 4.08439 6.86471H3.23923C3.30174 6.58354 3.38853 6.31099 3.49958 6.04706C3.75367 5.44314 4.10766 4.91373 4.56155 4.45882C5.01543 4.00392 5.54108 3.64804 6.1385 3.39118C6.73592 3.13431 7.37795 3.00588 8.0646 3.00588C8.75124 3.00588 9.39327 3.13431 9.99069 3.39118C10.5881 3.64804 11.1128 4.0049 11.5647 4.46176C12.0167 4.91863 12.3707 5.44902 12.6267 6.05294C12.8827 6.65686 13.0108 7.30588 13.0108 8C13.0108 8.69412 12.8827 9.34412 12.6267 9.95C12.3707 10.5559 12.0167 11.0873 11.5647 11.5441C11.1128 12.001 10.5881 12.3588 9.99069 12.6176C9.39327 12.8765 8.75124 13.0039 8.0646 13C7.50985 12.9961 6.9842 12.9088 6.48764 12.7382C5.99109 12.5676 5.53623 12.3275 5.12308 12.0176C4.70993 11.7078 4.35594 11.3451 4.06111 10.9294C3.97189 10.8078 3.86423 10.7304 3.73816 10.6971C3.61208 10.6637 3.48697 10.6843 3.36283 10.7588C3.24645 10.8333 3.17565 10.9412 3.15043 11.0824C3.12522 11.2235 3.16304 11.3588 3.26391 11.4882C3.63244 11.9863 4.06499 12.4245 4.56155 12.8029C5.0581 13.1814 5.60315 13.4755 6.19669 13.6853C6.79023 13.8951 7.41287 14 8.0646 14ZM3.23923 6.86471H2.23309C2.16383 7.23046 2.1292 7.60693 2.1292 7.99412H3.11843C3.11843 7.60335 3.1587 7.22688 3.23923 6.86471ZM7.84348 4.55294C7.71546 4.55294 7.60587 4.59804 7.5147 4.68824C7.42354 4.77843 7.37795 4.88824 7.37795 5.01765V8.3C7.37795 8.37059 7.38959 8.43627 7.41287 8.49706C7.43614 8.55784 7.47106 8.61961 7.51761 8.68235L8.95491 10.6C9.05189 10.7255 9.16342 10.799 9.2895 10.8206C9.41558 10.8422 9.53681 10.8118 9.65319 10.7294C9.76181 10.6549 9.82097 10.5539 9.83067 10.4265C9.84037 10.299 9.80061 10.1765 9.71138 10.0588L8.30318 8.13941V5.01765C8.30318 4.88824 8.25857 4.77843 8.16934 4.68824C8.08012 4.59804 7.97149 4.55294 7.84348 4.55294Z"
							fill="#F2F2F2"
						/>
					</svg>
				</ButtonSVG>
				<ButtonSVG width="130px" text="Статистика" className={s.ButtonSVG}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M1 13.4873C1 13.6431 1.04775 13.7674 1.14326 13.8605C1.23876 13.9535 1.36465 14 1.52093 14H14.4726C14.6158 14 14.7395 13.9502 14.8437 13.8507C14.9479 13.7512 15 13.6279 15 13.4808C15 13.338 14.9479 13.2158 14.8437 13.1141C14.7395 13.0124 14.6158 12.9616 14.4726 12.9616H2.2307C2.10915 12.9616 2.04837 12.901 2.04837 12.7799V9.24025L4.95604 7.56364C5.02858 7.6378 5.11099 7.70213 5.20326 7.75663C5.37907 7.86047 5.57333 7.91238 5.78605 7.91238C5.99876 7.91238 6.19302 7.86047 6.36884 7.75663C6.43629 7.71679 6.49846 7.6717 6.55537 7.62136L7.79402 8.67991C7.73165 8.82193 7.70047 8.97496 7.70047 9.13899C7.70047 9.351 7.75256 9.54462 7.85674 9.71985C7.96093 9.89508 8.10093 10.0346 8.27674 10.1385C8.45256 10.2423 8.64682 10.2942 8.85954 10.2942C9.07225 10.2942 9.26651 10.2423 9.44233 10.1385C9.61814 10.0346 9.75705 9.89508 9.85907 9.71985C9.96109 9.54462 10.0121 9.351 10.0121 9.13899C10.0121 9.07517 10.0075 9.01301 9.99822 8.95252L13.0866 7.11986C13.1185 7.14313 13.1518 7.16501 13.1865 7.18551C13.3623 7.28935 13.5566 7.34127 13.7693 7.34127C13.982 7.34127 14.1763 7.28935 14.3521 7.18551C14.5279 7.08167 14.6679 6.94213 14.7721 6.7669C14.8763 6.59167 14.9284 6.39805 14.9284 6.18605C14.9284 5.97404 14.8763 5.78042 14.7721 5.60519C14.6679 5.42996 14.5279 5.29043 14.3521 5.18659C14.1763 5.08275 13.982 5.03083 13.7693 5.03083C13.5566 5.03083 13.3623 5.08275 13.1865 5.18659C13.0107 5.29043 12.8707 5.42996 12.7665 5.60519C12.6623 5.78042 12.6102 5.97404 12.6102 6.18605C12.6102 6.28704 12.6221 6.38386 12.6457 6.47651L9.62297 8.2713C9.56784 8.22339 9.50763 8.18055 9.44233 8.14278C9.26651 8.0411 9.07225 7.99026 8.85954 7.99026C8.65503 7.99026 8.46758 8.03725 8.29718 8.13123L6.92795 6.96192C6.93939 6.89569 6.94512 6.82744 6.94512 6.75717C6.94512 6.54516 6.89302 6.35154 6.78884 6.17631C6.68465 6.00108 6.54465 5.86263 6.36884 5.76095C6.19302 5.65928 5.99876 5.60844 5.78605 5.60844C5.57333 5.60844 5.37907 5.65928 5.20326 5.76095C5.02744 5.86263 4.88744 6.00108 4.78326 6.17631C4.67907 6.35154 4.62698 6.54516 4.62698 6.75717C4.62698 6.79369 4.62852 6.82968 4.63162 6.86511L2.04837 8.35156V2.5192C2.04837 2.38075 1.99736 2.2596 1.89535 2.15576C1.79333 2.05192 1.6707 2 1.52744 2C1.37984 2 1.25504 2.05192 1.15302 2.15576C1.05101 2.2596 1 2.38075 1 2.5192V13.4873ZM4.63162 6.86511L5.93581 6.11466L6.92795 6.96192C6.90486 7.09551 6.85849 7.22087 6.78884 7.33802C6.72462 7.44603 6.6468 7.54047 6.55537 7.62136L5.8707 7.03624L4.95604 7.56364C4.89036 7.49649 4.83276 7.42129 4.78326 7.33802C4.69702 7.19298 4.64647 7.03535 4.63162 6.86511ZM8.29718 8.13123L8.27674 8.14278C8.10093 8.24446 7.96093 8.38291 7.85674 8.55814C7.83317 8.59779 7.81226 8.63838 7.79402 8.67991L8.88558 9.61276L9.99822 8.95252C9.97676 8.81207 9.93037 8.68062 9.85907 8.55814C9.79495 8.448 9.71625 8.35238 9.62297 8.2713L8.93767 8.6782L8.29718 8.13123ZM12.6457 6.47651C12.6717 6.57835 12.712 6.67515 12.7665 6.7669C12.8501 6.90755 12.9568 7.0252 13.0866 7.11986L14.2447 6.43267L13.8344 5.77069L12.6457 6.47651ZM2.04837 8.35156V9.24025L1.68372 9.45051V8.56138L2.04837 8.35156Z"
							fill="#F2F2F2"
						/>
					</svg>
				</ButtonSVG>
				<Button text="Другое" className={s.buttonOthers} /> */}
					</>
				)}
			</Row>
		</div>
	)
}

export default TableLineFooter
