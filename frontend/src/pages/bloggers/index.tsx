import React, {useEffect} from 'react'
import s from './index.module.scss'
import LeftCompanyMenu from '../../components/LeftCompanyMenu'
import MenuBannersWCourse from '../../components/MenuBannersWCourses'
import Row from '../../components/Row'
import PopUpWrapper from '../../components/PopUpWrapper'
import HeaderCompany from '../../components/HeaderCompany/index'
import {getAllActiveCompaniesAPI} from '../../api/data.api'
import ContentBanner, {
	IContentBanner,
} from '../../components/ContentBanner/index'
import ContentBannerDetails, {
	IContentBannerDetails,
} from '../../components/ContentBannerDetails'
import moment from 'moment'

enum CurrentPopup {
	None,
	Content,
}

const Bloggers: React.FC = () => {
	const [currentPopup, setCurrentPopup] = React.useState<CurrentPopup>(
		CurrentPopup.None,
	)

	const [info, setInfo] = React.useState([])

	useEffect(() => {
		const getInfo = async () => {
			let res = await getAllActiveCompaniesAPI()
			console.log(res.data.companies)

			setInfo(res.data.companies)
		}
		getInfo()
	}, [])

	const bannerContent: IContentBannerDetails = {
		className: 'banner-class',

		// Course
		course_svg: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="feather feather-book">
				<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
			</svg>
		),
		course_title: 'Course Title',
		course_id: '12345',
		course_ooo: 'OOO',
		course_link: 'https://example.com',

		// Statistics
		stat_toEnd: 'To End',
		stat_budget: '$1000',
		stat_income: '$500',
		stat_targetAct: '100',
		stat_maxPrice: '$200',
		stat_Price: '$150',
		stat_incomeUndo: '$300',
		stat_AbPay: '$100',

		// Target
		target_1_title: 'Target 1',
		target_1_value: 'Value 1',
		target_1_id: '1',
		target_2_title: 'Target 2',
		target_2_value: 'Value 2',
		target_2_id: '2',

		// ForBidden
		forBidden_1: 'Forbidden 1',
		forBidden_2: 'Forbidden 2',
		forBidden_3: 'Forbidden 3',

		// MainData Second Grid
		sg_clicks: '100',
		sg_conversion: '10%',
		sg_expenses: '$200',
		sg_ads: '50',
		sg_income_all: '$500',

		// Array
		arrayCategory: ['Category 1', 'Category 2'],
		arrayGeo: ['Geo 1', 'Geo 2'],
		arrayGender: [
			{Gender: 'Male', AgeFrom: 18, AgeTo: 24},
			{Gender: 'Female', AgeFrom: 25, AgeTo: 30},
		],
		arrayDevice: ['Device 1', 'Device 2'],
		arrayInteres: ['Interest 1', 'Interest 2'],

		// Exit
		onExit: () => {
			// Exit logic here
			setCurrentPopup(CurrentPopup.None)
		},
	}

	function translateToRussian(date: string): string {
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		]

		const monthNamesInRussian = [
			'Января',
			'Февраля',
			'Марта',
			'Апреля',
			'Мая',
			'Июня',
			'Июля',
			'Августа',
			'Сентября',
			'Октября',
			'Ноября',
			'Декабря',
		]

		const monthIndex = monthNames.indexOf(date.split(' ')[1])
		const translatedDate = date.replace(
			monthNames[monthIndex],
			monthNamesInRussian[monthIndex],
		)

		return translatedDate
	}

	const getEndDate = (endDate: string) => {
		const now = moment()
		const end = moment(endDate, 'YYYY-MM-DD')

		//get the difference in days
		const difference = end.diff(now, 'days')

		const translateDate = difference
		return translateDate
	}

	return (
		<div className={s.wrapper}>
			<div className={s.leftMenu}>
				<LeftCompanyMenu />
			</div>
			<div className={s.rightMenu}>
				<HeaderCompany
					positionPopUp="top-[30px]"
					textHeader="Формирование баннера"
				/>
				<div className={s.headerTable}>
					<label htmlFor="search" className={s.LabelSearch}>
						<input
							className={s.InputSearch}
							id="search"
							type="text"
							placeholder="Найти..."
						/>
						<svg
							className={s.iconSearch}
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M1.44422 8.85859C1.14807 8.17503 1 7.44298 1 6.66244C1 5.88191 1.14807 5.14986 1.44422 4.4663C1.74036 3.78273 2.15114 3.18077 2.67656 2.66042C3.20198 2.14006 3.80979 1.73323 4.5 1.43994C5.19021 1.14665 5.92938 1 6.7175 1C7.50563 1 8.2448 1.14665 8.93501 1.43994C9.62521 1.73323 10.233 2.14006 10.7584 2.66042C11.2839 3.18077 11.6946 3.78273 11.9908 4.4663C12.2869 5.14986 12.435 5.88191 12.435 6.66244C12.435 7.31053 12.3311 7.92549 12.1233 8.50735C11.9156 9.0892 11.6278 9.61666 11.26 10.0897L14.7636 13.5808C14.84 13.6565 14.8985 13.744 14.9391 13.8434C14.9797 13.9427 15 14.0492 15 14.1627C15 14.3188 14.9654 14.4607 14.8961 14.5884C14.8269 14.7162 14.7301 14.8167 14.6059 14.89C14.4817 14.9633 14.3385 15 14.176 15C14.0614 15 13.9527 14.9799 13.8501 14.9397C13.7474 14.8995 13.653 14.8392 13.567 14.7587L10.042 11.2605C9.57387 11.5917 9.058 11.8518 8.49437 12.0411C7.93074 12.2303 7.33845 12.3249 6.7175 12.3249C5.92938 12.3249 5.19021 12.1782 4.5 11.8849C3.80979 11.5917 3.20198 11.1848 2.67656 10.6645C2.15114 10.1441 1.74036 9.54215 1.44422 8.85859ZM2.57267 4.93462C2.34101 5.47153 2.22518 6.04747 2.22518 6.66244C2.22518 7.27741 2.34101 7.85335 2.57267 8.39027C2.80433 8.92718 3.12675 9.39905 3.53992 9.80588C3.95309 10.2127 4.43074 10.532 4.97288 10.7638C5.51501 10.9956 6.09655 11.1115 6.7175 11.1115C7.33845 11.1115 7.91999 10.9956 8.46213 10.7638C9.00426 10.532 9.48072 10.2127 9.8915 9.80588C10.3023 9.39905 10.6247 8.92718 10.8588 8.39027C11.0928 7.85335 11.2098 7.27741 11.2098 6.66244C11.2098 6.04747 11.0928 5.47153 10.8588 4.93462C10.6247 4.3977 10.3023 3.92465 9.8915 3.51546C9.48072 3.10627 9.00426 2.78696 8.46213 2.55753C7.91999 2.3281 7.33845 2.21338 6.7175 2.21338C6.09655 2.21338 5.51501 2.3281 4.97288 2.55753C4.43074 2.78696 3.95309 3.10627 3.53992 3.51546C3.12675 3.92465 2.80433 4.3977 2.57267 4.93462Z"
								fill="#808080"
							/>
						</svg>
					</label>
					<div className={s.sortTableButtons}>
						<button className={s.sortTableButton}>
							<div className={s.sortTableButtonWrapper}>
								<p className={s.sortTableButtonTextGray}>Сортировать:</p>
								<p>Все</p>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="12"
									height="7"
									viewBox="0 0 12 7"
									fill="none">
									<path
										d="M1 1L6 6L11 1"
										stroke="#808080"
										strokeWidth="1.4"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</button>
					</div>
				</div>

				<Row width="1200px" className={s.BloggersBannersWCourse}>
					{info.map((item) => (
						<MenuBannersWCourse
							svg={
								<svg
									className="mr-4"
									xmlns="http://www.w3.org/2000/svg"
									width="36"
									height="36"
									viewBox="0 0 36 36"
									fill="none">
									<path
										d="M36 18C36 27.9417 27.9417 36 18 36C8.05826 36 0 27.9417 0 18C0 8.05828 8.05829 0 18 0C27.9395 0 36 8.05828 36 18Z"
										fill="#E42313"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M22.9445 16.8519C23.1879 16.8143 23.9758 16.7214 23.947 17.0511C23.9046 17.5399 23.7332 17.5753 23.167 17.6921C23.1128 17.7033 23.0549 17.7152 22.9931 17.7284C22.9462 17.7384 22.8988 17.7486 22.8506 17.7591L22.8505 17.7591L22.8501 17.7592C22.7596 17.7787 22.6663 17.7989 22.5682 17.8191C22.5571 17.8546 22.5461 17.8745 22.5372 17.8767C22.3343 18.8193 22.2737 19.3183 22.1936 19.9777L22.1936 19.9778C22.168 20.1885 22.1405 20.4155 22.1056 20.6786C22.0936 20.7679 22.0871 20.8585 22.0807 20.9473V20.9473C22.0531 21.3312 22.028 21.6807 21.5678 21.7454C21.0013 21.8251 20.8065 21.243 20.8087 20.745C20.8087 19.907 21.2133 18.3058 21.2546 18.1425L21.258 18.129C20.6803 18.2751 20.0629 18.4433 19.4454 18.6358C18.715 19.8774 17.3783 22.8697 17.2123 23.6178C17.0772 24.2175 16.8072 24.4012 16.4067 24.2264C16.0083 24.0516 15.7847 23.6532 15.922 23.2039C16.2488 22.1165 17.3758 19.9125 17.6574 19.3618C17.6962 19.286 17.7189 19.2415 17.7213 19.2356C17.2012 19.4436 16.7143 19.6694 16.296 19.9084C16.0349 20.0567 15.7029 19.915 15.6365 19.603L15.6336 19.5892C15.586 19.3639 15.4963 18.9388 15.9928 18.7133C16.8072 18.3436 17.6903 18.0338 18.5734 17.7793C20.4502 14.6277 22.7785 11.3942 23.4491 11.4539C23.6237 11.4685 23.6773 11.5867 23.7471 11.7404C23.794 11.8438 23.8482 11.9632 23.9515 12.0781C24.206 12.3591 24.2414 12.534 23.9382 13.2843C23.816 13.5883 23.7199 13.8184 23.6398 14.0104L23.6396 14.0108L23.6396 14.0109C23.3132 14.7923 23.2511 14.9412 22.7696 16.8741C22.8279 16.8699 22.8803 16.8618 22.9342 16.8535L22.9445 16.8519ZM23.8408 21.2208C24.3056 21.1743 25.6601 20.8778 25.6733 19.3883C25.676 19.0369 25.4716 18.7878 25.2812 18.556C25.1599 18.4081 25.0442 18.2672 24.9917 18.1113C24.9076 17.8634 24.9275 17.3521 25.3192 17.1994C25.7351 17.0361 25.8675 17.2459 26.0015 17.4584C26.0237 17.4935 26.0459 17.5288 26.0695 17.5624C26.1403 17.6598 26.3616 17.6376 26.4369 17.558C26.5431 17.4495 26.698 17.2835 26.7622 17.0069C26.822 16.7524 26.5497 16.323 25.7619 16.3496C25.4852 16.3562 25.0979 16.4027 24.5468 16.9272C24.2901 17.1707 23.4823 18.2751 24.0798 19.2223C24.1183 19.2834 24.1698 19.348 24.2226 19.414C24.3914 19.6255 24.5731 19.853 24.3808 20.0368C23.9913 20.413 23.3185 19.8309 23.1924 19.6561C23.1348 19.5742 22.9688 19.4791 22.8604 19.6406C22.7984 19.7336 22.4974 20.267 22.5439 20.4662C22.6789 21.0858 23.4778 21.2584 23.8408 21.2208ZM20.1558 17.3765C20.9769 15.9667 21.8865 14.5546 22.732 13.4458C22.3115 14.444 21.8865 15.7808 21.5302 17.091C21.0986 17.1729 20.6361 17.2658 20.1558 17.3765ZM28.9113 15.2297C29.3185 15.1566 29.6726 14.7914 29.7036 14.413C29.7346 14.0368 29.4314 13.7911 29.0242 13.8641C28.6169 13.9372 28.2606 14.3023 28.2318 14.6808C28.1986 15.0548 28.5062 15.3027 28.9113 15.2297ZM33.6519 17.7417C33.756 17.4717 33.3642 17.3765 33.1783 17.6686C32.999 17.9519 32.8352 18.1932 32.6006 18.4455C32.3904 18.6646 32.2221 18.7509 32.1336 18.7199C31.8946 18.6358 32.0296 18.3061 32.2775 17.8192C32.3926 17.5912 32.5564 17.2968 32.7046 17.0423C32.9149 16.7126 32.9592 16.6196 32.9724 16.5001C32.9946 16.3296 32.8862 16.2212 32.5586 16.0884C32.3506 15.9999 32.3328 15.9844 32.2487 15.7498C32.1292 15.4665 31.8769 15.3249 31.5693 15.3669C31.0979 15.4266 30.3631 15.9755 29.7124 16.7501C29.4734 17.0091 28.6656 18.0604 28.5638 18.1932L28.4376 18.3547C28.0857 18.8195 27.9861 18.9301 27.8268 19.0961C27.6741 19.2444 27.5457 19.3285 27.4616 19.3396C27.3996 19.3485 27.3731 19.3042 27.3841 19.2245C27.3996 19.105 27.4527 18.9434 27.5656 18.7332C27.7471 18.3791 28.0348 17.8545 28.2605 17.5026C28.3823 17.2946 28.5925 16.9117 28.6102 16.8697L28.7297 16.6705C29.0374 16.1393 28.5682 15.8848 28.2141 15.9113C28.0768 15.9224 27.8444 16.0198 27.7294 16.1017C27.6386 16.1615 27.6254 16.1836 27.5988 16.3031C27.57 16.4514 27.3598 16.8918 27.1407 17.2813C26.8684 17.7549 26.5719 18.3392 26.3815 18.7619C26.2001 19.1847 26.0916 19.5211 26.054 19.8088C25.9699 20.4396 26.2333 20.7959 26.7312 20.7295C27.103 20.683 27.5036 20.3378 27.9905 19.7955C28.1477 19.6229 28.3225 19.3861 28.4885 19.1382C28.4 19.8464 28.7629 20.3311 29.3893 20.2492C29.8053 20.1917 30.1528 19.8973 30.6043 19.4193C30.6641 19.3617 30.6884 19.3396 30.7216 19.3352C30.7526 19.3308 30.7814 19.3551 30.7836 19.4149L30.8057 19.479C30.8677 19.8022 31.12 19.9527 31.4808 19.904C31.9256 19.8442 32.4192 19.5233 32.9548 18.8682C33.3885 18.3525 33.5612 17.9741 33.6519 17.7417ZM30.6287 18.534C31.0536 18.0139 31.7132 16.8143 31.7552 16.4868C31.7751 16.3363 31.7309 16.2765 31.6113 16.292C31.4631 16.3097 31.1355 16.5797 30.8234 16.9604C30.3653 17.507 29.75 18.6114 29.7013 18.9788C29.6836 19.1271 29.7412 19.2245 29.8496 19.2134C30.0201 19.1891 30.3122 18.9368 30.6287 18.534ZM16.5107 16.8497C16.8537 16.4491 16.1366 16.0176 15.8201 16.0751L15.8201 16.0751C15.6519 16.1039 15.457 16.1372 14.698 16.9892C14.8862 16.6616 14.9437 16.3938 14.7179 16.2455C14.4789 16.0906 14.065 16.2101 13.8349 16.3562C13.6953 16.4434 13.689 16.4877 13.6655 16.6521L13.6645 16.6594C13.6423 16.7745 13.5361 17.0246 13.463 17.164L13.2329 17.6354C12.499 18.8678 12.0393 19.344 11.8271 19.5638C11.7878 19.6045 11.757 19.6364 11.7345 19.6627C11.584 19.8177 11.4623 19.9062 11.3782 19.9217C11.3162 19.9328 11.2875 19.8885 11.2963 19.811C11.3052 19.6915 11.3494 19.5277 11.4512 19.3131C11.6128 18.9479 11.8784 18.41 12.0842 18.0515C12.1949 17.8346 12.4848 17.3278 12.4848 17.3278C12.7593 16.7391 12.2414 16.5333 11.9382 16.5775C11.9217 16.58 11.8752 16.5856 11.8033 16.5943C11.4895 16.6323 10.6925 16.7286 9.80464 16.8763C10.2844 14.9396 10.3445 14.7962 10.6751 14.0077C10.7548 13.8177 10.8502 13.5901 10.971 13.2909C11.272 12.5407 11.2388 12.368 10.9843 12.0847C10.8807 11.9695 10.8264 11.85 10.7796 11.7466C10.7103 11.5938 10.657 11.4764 10.4841 11.4606C9.81128 11.4009 7.47635 14.6499 5.59512 17.8081C4.70984 18.0648 3.82456 18.368 3.00567 18.7243C2.47018 18.9573 2.56413 19.3829 2.6137 19.6074L2.61614 19.6185C2.68254 19.9305 3.03444 20.07 3.31331 19.9195C3.73824 19.6871 4.22291 19.4702 4.74525 19.2666C4.72976 19.2998 4.72312 19.3175 4.72976 19.3153C4.0171 20.6078 3.21592 22.4093 2.95477 23.2105C2.80869 23.6576 3.04108 24.0582 3.43946 24.233C3.84003 24.4056 4.11004 24.2197 4.24504 23.6221C4.41325 22.8741 5.42247 20.5613 6.44497 18.6911C6.44497 18.6911 6.45161 18.6845 6.46046 18.6712C7.07795 18.4831 7.69986 18.3105 8.28857 18.16C7.92782 19.634 7.83486 20.2448 7.8415 20.7494C7.84374 21.2496 8.03186 21.8294 8.60063 21.7498C9.06288 21.6848 9.08761 21.3325 9.1147 20.9466L9.1147 20.9466L9.1147 20.9466C9.12081 20.8595 9.12705 20.7706 9.13847 20.683C9.1724 20.4272 9.19956 20.2055 9.22477 19.9997L9.22477 19.9997C9.30643 19.3332 9.36762 18.8337 9.57223 17.8833C9.57887 17.8833 9.58551 17.87 9.59436 17.8501C10.2229 17.7085 10.7585 17.5978 11.1348 17.5248C11.0817 17.6354 11.0219 17.7572 10.9577 17.8833C10.7098 18.3702 10.442 18.9656 10.2716 19.3993C10.1101 19.8287 10.0215 20.1673 9.99719 20.4573C9.94405 21.0947 10.2251 21.4377 10.7209 21.347C11.0927 21.2806 11.6593 20.7981 12.2967 19.8398C12.2259 20.0677 12.1816 20.2559 12.1772 20.3732C12.1573 20.8689 12.4118 21.2784 13.244 20.7361C13.328 20.6808 13.3391 20.6011 13.3413 20.4418C13.3834 19.9062 13.6091 19.1957 14.1071 18.4676C14.4966 17.9077 14.7711 17.5889 15.1252 17.4407C15.3529 17.3464 15.5505 17.2968 15.7269 17.2526C16.0391 17.1743 16.2844 17.1128 16.5107 16.8497ZM8.56524 17.0976C8.91936 15.7874 9.34429 14.4462 9.76702 13.4458C8.91717 14.5591 8.00309 15.9777 7.18199 17.3942C7.66002 17.2813 8.12479 17.1839 8.56524 17.0976ZM13.6313 14.9486C13.6623 14.5723 13.359 14.3245 12.9518 14.3997C12.5446 14.4728 12.1905 14.8357 12.1573 15.2119C12.1263 15.5904 12.4317 15.8383 12.8367 15.7652C13.244 15.6922 13.6003 15.3248 13.6313 14.9486Z"
										fill="white"
									/>
								</svg>
							}
							title={item.name}
							id={item.id}
							link={item.site.domain}
							// count="245"
							categories="Статус. комп, Аудитории и Баннеры, Реклам. сайт, Стат… "
							to_end={getEndDate(item.date_finish)}
							budget={item.budget_week}
							income="19.07"
							// mark="29"
							// error_link="file:///private/tmp/main%253Ap…  "
							// error={true}
							ButtonAdd={true}
							fav_active={true}
							className={`${s.MenuBannersWCourse}`}
							onDetails={() => {
								setCurrentPopup(CurrentPopup.Content)
							}}
						/>
					))}
				</Row>
				<Row width="1164px" className={s.LoadMore}>
					<span className={s.SpanLoadMore}>Загрузить ещё</span>
				</Row>
			</div>
			{currentPopup === CurrentPopup.Content && (
				<PopUpWrapper onExit={bannerContent.onExit}>
					<ContentBannerDetails
						className={bannerContent.className}
						course_svg={bannerContent.course_svg}
						course_title={bannerContent.course_title}
						course_id={bannerContent.course_id}
						course_ooo={bannerContent.course_ooo}
						course_link={bannerContent.course_link}
						stat_toEnd={bannerContent.stat_toEnd}
						stat_budget={bannerContent.stat_budget}
						stat_income={bannerContent.stat_income}
						stat_targetAct={bannerContent.stat_targetAct}
						stat_maxPrice={bannerContent.stat_maxPrice}
						stat_Price={bannerContent.stat_Price}
						stat_incomeUndo={bannerContent.stat_incomeUndo}
						stat_AbPay={bannerContent.stat_AbPay}
						target_1_title={bannerContent.target_1_title}
						target_1_value={bannerContent.target_1_value}
						target_1_id={bannerContent.target_1_id}
						target_2_title={bannerContent.target_2_title}
						target_2_value={bannerContent.target_2_value}
						target_2_id={bannerContent.target_2_id}
						forBidden_1={bannerContent.forBidden_1}
						forBidden_2={bannerContent.forBidden_2}
						forBidden_3={bannerContent.forBidden_3}
						sg_clicks={bannerContent.sg_clicks}
						sg_conversion={bannerContent.sg_conversion}
						sg_expenses={bannerContent.sg_expenses}
						sg_ads={bannerContent.sg_ads}
						sg_income_all={bannerContent.sg_income_all}
						arrayCategory={bannerContent.arrayCategory}
						arrayGeo={bannerContent.arrayGeo}
						arrayGender={bannerContent.arrayGender}
						arrayDevice={bannerContent.arrayDevice}
						arrayInteres={bannerContent.arrayInteres}
						onExit={bannerContent.onExit}
					/>
				</PopUpWrapper>
			)}
		</div>
	)
}

export default Bloggers
