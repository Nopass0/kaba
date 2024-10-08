import React, {useState} from 'react'
import s from './index.module.scss'
import Col from '../../components/Col'
import Row from '../../components/Row'
import BlueLabel from '../../components/BlueLabel/index'

//svg

import Select from '../../components/Select/index'
import ContentBanner from '../../components/ContentBanner/index'
import ProfilePopUp from '../../components/ProfilePopUp/index'
import VariantIMGSlider from '../../components/VariantIMGSlider/index'
import TableCols from '../../components/TableCols'
import StatusAcc from '../../components/StatusAcc'
import DepositePopUp from '../../components/DepositePopUp'
import AuditorNBanners from '../../components/AuditorNBanners/index'
import LineGraph from '../../components/LineGraph'
import moment from 'moment'

// import {Chips} from 'primereact/chips'
import MenuBannersWCourse from '../../components/MenuBannersWCourses/index'
import Image from '../../components/Image'
import Upload from '../../components/Upload'
import {FileType, TGenderNAge} from '../../types'
import FiltersBanners from '../../components/FiltersBanners/index'
import ContentBannerDetails from '../../components/ContentBannerDetails/index'
import {
	Chart as ChartJS,
	LinearScale,
	PointElement,
	Tooltip,
	Legend,
} from 'chart.js'
import {Bubble} from 'react-chartjs-2'
import TreeSelect from '../../components/TreeSelectCustom'
import TreeSelectCustom from '../../components/TreeSelectCustom'
import TableBanners from '../../components/TableBanners/index'
import TableCol from '../../components/popup/TableColsPopUp/index'
import StatusAccDropDown from '../../components/StatusAccDropDown/index'
import ProfilePopUpLeftSide from '../../components/popup/ProfilePopUpLeftSide/index'
import StatisticDropDownMenuGraphPopUp from '../../components/popup/StatisticDropDownMenuGraphPopUp/index'
import StatisticAddCompanyPopUp from '../../components/popup/StatisticAddCompanyPopUp/index'
import StatisticDropDownPopUp from '../../components/popup/StatisticDropDownPopUp/index'
import HeaderDownMenu from '../../components/HeaderDownMenu/index'
import StatusSitePopUp from '../../components/popup/StatusSitePopUP/index'
import CompaniesTablePopUp from '../../components/popup/CompaniesTablePopUp/index';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend)
ChartJS.defaults.borderColor = '#333333'

const Test: React.FC = () => {
	// generate random data with "Клики (цифрай)", "Конверсия: Все цели (%)", "Расходы (Рубли знак валюты)", "Доля рекламных расходов(%)", "Доходы: Все цели (Рубли знак валюты)" an time like 2019-01-01 whoole year by days
	// function randomData() {
	//   return {
	//     "Клики (цифрай)": Math.floor(Math.random() * 100),
	//     "Конверсия: Все цели (%)": Math.floor(Math.random() * 100),
	//     "Расходы (Рубли знак валюты)": Math.floor(Math.random() * 100),
	//     "Доля рекламных расходов(%)": Math.floor(Math.random() * 100),
	//     "Доходы: Все цели (Рубли знак валюты)": Math.floor(Math.random() * 100),
	//   };
	// }

	//generate array of random numbers. argument - length
	function randomArray(length: number) {
		const arr = []
		let prev = 0
		for (let i = 0; i < length; i++) {
			//generate random numbers but prev number should be +- 50
			const num = Math.floor(Math.random() * 100) + prev - 50
			prev = num
			arr.push(num)
		}
		return arr
	}

	// //generate array of dates from start date to end date like ["1 January", "2 January", "3 January",..., "1 December","2 December", ..., "31 December"]

	function generateArrayOfDates(startDate: string, endDate: string): string[] {
		const start = moment(startDate, 'YYYY-MM-DD')
		const end = moment(endDate, 'YYYY-MM-DD')
		const dates = []

		while (start.isSameOrBefore(end)) {
			dates.push(start.format('D MMMM'))
			start.add(1, 'day')
		}

		return dates
	}

	// // Example usage
	const startDate = '2022-01-01'
	const endDate = '2022-12-31'
	const arrayOfDates = generateArrayOfDates(startDate, endDate)
	console.log(arrayOfDates)

	const data = {
		labels: generateArrayOfDates('2022-01-01', '2022-03-30'),
		datasets: [
			{
				label: 'Клики (цифрай)',
				data: randomArray(120),
				borderWidth: 1,
				backgroundColor: '#4169E1',
				borderColor: '#4169E1',
				pointRadius: 0,
			},
			{
				label: 'Конверсия: Все цели (%))',
				data: randomArray(120),
				borderWidth: 1,
				backgroundColor: '#F3A63B',
				borderColor: '#F3A63B',
				pointRadius: 0,
			},
			{
				label: 'Расходы (Рубли знак валюты)',
				data: randomArray(120),
				borderWidth: 1,
				backgroundColor: '#6049B4',
				borderColor: '#6049B4',
				pointRadius: 0,
			},
			{
				label: 'Доля рекламных расходов(%)',
				data: randomArray(120),
				borderWidth: 1,
				backgroundColor: '#57BD53',
				borderColor: '#57BD53',
				pointRadius: 0,
			},
			{
				label: 'Доходы: Все цели (Рубли знак валюты)',
				data: randomArray(120),
				borderWidth: 1,
				backgroundColor: '#F3553E',
				borderColor: '#F3553E',
				pointRadius: 0,
			},
		],
	}

	const [value, setValue] = useState()
	const [images, setImages] = useState<string[]>([])

	const handleAddImage = (file: File) => {
		//add path to image
		setImages([...images, URL.createObjectURL(file)])
	}

	const arrayCategory = [
		'Челябинск',
		'Москва',
		'Санкт-Петербург',
		'Казань',
		'Новосибирск',
		'Красноярск',
		'Мурманск',
		'Ростов-на-Дону',
		'Екатеринбург',
		'Владивосток',
	]

	const arrayGender: TGenderNAge[] = [
		{Gender: 'Мужчина', AgeTo: 25, AgeFrom: 18},
		{Gender: 'Мужчина', AgeTo: 25, AgeFrom: 18},
		{Gender: 'Мужчина', AgeTo: 25, AgeFrom: 18},
		{Gender: 'Мужчина', AgeTo: 25, AgeFrom: 18},
		{Gender: 'Мужчина', AgeTo: 25, AgeFrom: 18},
		{Gender: 'Мужчина', AgeTo: 25, AgeFrom: 18},
		{Gender: 'Мужчина', AgeTo: 25, AgeFrom: 18},
		{Gender: 'Мужчина', AgeTo: 25, AgeFrom: 18},
		{Gender: 'Мужчина', AgeTo: 25, AgeFrom: 18},
		{Gender: 'Мужчина', AgeTo: 25, AgeFrom: 18},
	]
	// console.log(typeof(arrayGender));
	const arrayDevice = [
		'Челябинск',
		'Москва',
		'Санкт-Петербург',
		'Казань',
		'Новосибирск',
		'Красноярск',
		'Мурманск',
		'Ростов-на-Дону',
		'Екатеринбург',
		'Владивосток',
	]
	const arrayInteres = [
		'Челябинск',
		'Москва',
		'Санкт-Петербург',
		'Казань',
		'Новосибирск',
		'Красноярск',
		'Мурманск',
		'Ростов-на-Дону',
		'Екатеринбург',
		'Владивосток',
	]
	const arrayGeo = [
		'Челябинск',
		'Москва',
		'Санкт-Петербург',
		'Казань',
		'Новосибирск',
		'Красноярск',
		'Мурманск',
		'Ростов-на-Дону',
		'Екатеринбург',
		'Владивосток',
	]

	const dataBubble = {
		//Generate random data for bubble chart from chart.js 2 react
		datasets: [
			{
				label: 'Red dataset',
				data: Array.from({length: 50}, () => ({
					x: Math.random() * 100 - 50,
					y: Math.random() * 100 - 50,
					r: Math.random() * 100 - 50,
				})),
				borderColor: '#57BD53',
				backgroundColor: '#57BD53',
			},
			{
				label: 'Blue dataset',
				data: Array.from({length: 50}, () => ({
					x: Math.random() * 100 - 50,
					y: Math.random() * 100 - 50,
					r: Math.random() * 100 - 50,
				})),
				borderColor: '#4169E1',
				backgroundColor: '#4169E1',
			},
		],
	}

	const optionsBubble = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: 'Chart.js Bubble Chart',
			},
		},
		scales: {
			x: {
				gridLines: {
					borderDash: [8, 10],
					dashOffset: 2,
					color: '#333',
				},
				border: {dash: [4, 4]},
				grid: {
					BorderDash: [33, 40],
					BorderDashOffset: 2,
					tickLength: 10,
				},
				ticks: {
					callback: function (val, index) {
						// Hide every 10nd tick label
						return index % 10 === 0 ? this.getLabelForValue(val) : ''
					},
					align: 'center',
					maxRotation: 0,
				},
			},
			y: {
				gridLines: {
					borderDash: [10, 10],
					color: '#333',
				},
				//don't display the y values, but dispaly the grid
				ticks: {
					display: false,
				},
			},
		},
	}

	return (
		<div className="flex w-full h-screen items-center justify-center ">
			{/* <LineGraph data={data}/> */}
			{/* <ClickCounter count={234}/> */}
			{/* <Table/> */}
			{/* <NotificationMenu
      text_balance=""
      text_notification=""
      text_company=""
      text_course_table=""
      text_id_table=""
      num_balance="0.32"
      date=""
      /> */}
			{/* <DeleteCompany
      text_course_table="курсы английского…"
      text_id_table=""
      /> */}
			{/* <InfoCompany/> */}
			{/* <RatePopUp/> */}
			{/* <DeleteCompany/> */}
			{/* <StatusAcc/> */}

			{/* <StatusAccDropDown
						svg_icon_title={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<path
									d="M14.6666 7.99967C14.6666 11.6818 11.682 14.6663 7.99991 14.6663C4.31779 14.6663 1.33325 11.6818 1.33325 7.99967C1.33325 4.31756 4.3178 1.33301 7.99992 1.33301C11.6812 1.33301 14.6666 4.31756 14.6666 7.99967Z"
									fill="#E42313"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M9.83115 7.57476C9.92132 7.56082 10.2131 7.5264 10.2025 7.64853C10.1868 7.82956 10.1233 7.84265 9.91358 7.88592L9.84918 7.89936L9.79637 7.91073L9.79631 7.91075C9.76276 7.918 9.72815 7.92549 9.6918 7.93298C9.6877 7.94609 9.6836 7.95347 9.68033 7.95429C9.60516 8.30341 9.58272 8.48823 9.55307 8.73244V8.73244L9.55307 8.73245L9.55307 8.73246C9.54359 8.81049 9.53338 8.89459 9.52048 8.99204C9.51602 9.02513 9.51361 9.05867 9.51125 9.09154L9.51125 9.09156C9.50103 9.23375 9.49173 9.36318 9.32129 9.38714C9.11145 9.41665 9.03931 9.20106 9.04013 9.01663C9.04013 8.70627 9.18998 8.11329 9.20528 8.05275L9.20653 8.04775C8.99259 8.10185 8.76389 8.16414 8.5352 8.23545C8.26469 8.69531 7.7696 9.80355 7.70812 10.0806C7.65811 10.3028 7.55811 10.3708 7.40975 10.306C7.2622 10.2413 7.17941 10.0937 7.23024 9.92733C7.35128 9.52459 7.76868 8.70832 7.87298 8.50435L7.87298 8.50433C7.88734 8.47625 7.89577 8.45978 7.89666 8.4576C7.70403 8.53464 7.52369 8.61826 7.36877 8.70678C7.27204 8.7617 7.14909 8.70924 7.1245 8.59366L7.12342 8.58857C7.10581 8.50513 7.07257 8.34766 7.25647 8.26414C7.55811 8.12724 7.88517 8.01248 8.21223 7.91822C8.90734 6.75096 9.76967 5.55337 10.018 5.5755C10.0827 5.58089 10.1026 5.62466 10.1284 5.68159C10.1458 5.71988 10.1659 5.76413 10.2041 5.80665C10.2984 5.91076 10.3115 5.97551 10.1992 6.25339C10.154 6.36601 10.1184 6.45124 10.0887 6.52233L10.0886 6.52248L10.0886 6.52251C9.96773 6.81192 9.94471 6.86706 9.76639 7.58296C9.78797 7.58141 9.80738 7.57842 9.82735 7.57534L9.83115 7.57476ZM10.1631 9.19286C10.3353 9.17565 10.8369 9.0658 10.8418 8.51414C10.8429 8.384 10.7671 8.29176 10.6966 8.20587C10.6517 8.15111 10.6088 8.09894 10.5894 8.04117C10.5582 7.94937 10.5656 7.76001 10.7107 7.70346C10.8647 7.64297 10.9137 7.72067 10.9634 7.79936C10.9716 7.81238 10.9798 7.82543 10.9886 7.83789C11.0148 7.87395 11.0968 7.86576 11.1246 7.83625C11.164 7.79609 11.2214 7.73461 11.2451 7.63215C11.2673 7.53788 11.1664 7.37886 10.8746 7.38869C10.7722 7.39115 10.6287 7.40837 10.4246 7.60264C10.3295 7.69281 10.0303 8.10184 10.2517 8.45267C10.2659 8.47531 10.285 8.49921 10.3045 8.52368L10.3045 8.52368C10.3671 8.602 10.4343 8.68625 10.3631 8.75432C10.2189 8.89367 9.96968 8.67809 9.92297 8.61334C9.90165 8.58301 9.84017 8.54777 9.80001 8.60761C9.77705 8.64203 9.66558 8.83958 9.68278 8.91336C9.73279 9.14286 10.0287 9.20679 10.1631 9.19286ZM8.79832 7.76903C9.10243 7.24688 9.43933 6.72391 9.75245 6.31323C9.59671 6.68292 9.43933 7.17802 9.30736 7.66329C9.14752 7.69362 8.97619 7.72804 8.79832 7.76903ZM12.0411 6.97392C12.1919 6.94686 12.3231 6.81161 12.3345 6.67144C12.346 6.53209 12.2337 6.44111 12.0829 6.46816C11.9321 6.49521 11.8001 6.63046 11.7894 6.77062C11.7771 6.90916 11.8911 7.00097 12.0411 6.97392ZM13.7969 7.90429C13.8354 7.80429 13.6903 7.76904 13.6215 7.87723C13.5551 7.98215 13.4944 8.0715 13.4075 8.16496C13.3296 8.24611 13.2673 8.27808 13.2345 8.2666C13.146 8.23545 13.196 8.11332 13.2878 7.93299C13.3305 7.84855 13.3911 7.73953 13.446 7.64526C13.5239 7.52313 13.5403 7.4887 13.5452 7.44443C13.5534 7.38131 13.5133 7.34115 13.3919 7.29197C13.3149 7.25918 13.3083 7.25344 13.2772 7.16655C13.2329 7.06162 13.1395 7.00917 13.0255 7.02474C12.8509 7.04687 12.5788 7.25016 12.3378 7.53705C12.2493 7.63296 11.9501 8.02232 11.9124 8.0715L11.8657 8.13134C11.7353 8.30348 11.6984 8.34446 11.6394 8.40594C11.5829 8.46086 11.5353 8.49201 11.5042 8.49611C11.4812 8.4994 11.4714 8.483 11.4755 8.45349C11.4812 8.40923 11.5009 8.34939 11.5427 8.27152C11.6099 8.14036 11.7165 7.94609 11.8001 7.81575C11.8452 7.7387 11.923 7.59689 11.9296 7.58132L11.9738 7.50754C12.0878 7.31081 11.914 7.21655 11.7829 7.22638C11.732 7.23048 11.646 7.26655 11.6033 7.29688C11.5697 7.31902 11.5648 7.32722 11.555 7.37148C11.5443 7.42639 11.4665 7.58951 11.3853 7.73378C11.2845 7.9092 11.1746 8.1256 11.1041 8.28217C11.0369 8.43873 10.9968 8.56332 10.9828 8.66989C10.9517 8.9035 11.0492 9.03548 11.2337 9.01089C11.3714 8.99368 11.5197 8.8658 11.7001 8.66498C11.7583 8.60104 11.823 8.51333 11.8845 8.42152C11.8517 8.68383 11.9861 8.86335 12.2181 8.83302C12.3722 8.8117 12.5009 8.70268 12.6681 8.52563C12.6903 8.50431 12.6993 8.49611 12.7116 8.49448C12.7231 8.49284 12.7337 8.50186 12.7345 8.52399L12.7427 8.54776C12.7657 8.66743 12.8591 8.72317 12.9928 8.70513C13.1575 8.68301 13.3403 8.56415 13.5387 8.32151C13.6993 8.13053 13.7633 7.99036 13.7969 7.90429ZM12.6772 8.19774C12.8345 8.00511 13.0788 7.56082 13.0944 7.43951C13.1018 7.38377 13.0854 7.36164 13.0411 7.36737C12.9862 7.37393 12.8649 7.47394 12.7493 7.61492C12.5796 7.81738 12.3517 8.22643 12.3337 8.36249C12.3271 8.41741 12.3485 8.45348 12.3886 8.44939C12.4518 8.44037 12.5599 8.34692 12.6772 8.19774ZM7.44827 7.57394C7.57532 7.42557 7.30973 7.26573 7.19252 7.28704L7.19249 7.28705C7.1302 7.2977 7.05804 7.31005 6.77693 7.62559C6.8466 7.50427 6.8679 7.40508 6.78429 7.35016C6.69577 7.29278 6.54248 7.33705 6.45724 7.39115C6.40554 7.42346 6.4032 7.43985 6.39451 7.50074L6.39412 7.50345C6.38593 7.54607 6.34658 7.6387 6.31951 7.69034L6.23427 7.86494C5.96248 8.32138 5.79221 8.49775 5.71363 8.57915C5.69907 8.59423 5.68766 8.60606 5.67933 8.61579C5.62359 8.67317 5.57851 8.70596 5.54736 8.7117C5.5244 8.7158 5.51375 8.6994 5.51703 8.67071C5.5203 8.62645 5.53669 8.56578 5.57441 8.48628C5.63425 8.35103 5.73261 8.15183 5.80884 8.01905C5.84983 7.93871 5.95721 7.751 5.95721 7.751C6.05886 7.53296 5.86704 7.45673 5.75475 7.47312C5.74864 7.47404 5.73142 7.47613 5.70481 7.47934L5.70481 7.47934L5.70481 7.47934C5.58857 7.4934 5.29339 7.52909 4.96456 7.58378C5.14223 6.86648 5.16449 6.81339 5.28695 6.52134C5.31646 6.45095 5.3518 6.36667 5.39654 6.25586C5.50802 5.97799 5.49572 5.91404 5.40146 5.80912C5.36308 5.76645 5.343 5.72217 5.32564 5.68389C5.29997 5.62732 5.28025 5.58383 5.2162 5.57796C4.96701 5.55584 4.10222 6.75917 3.40547 7.92889C3.07759 8.02397 2.74971 8.13627 2.44642 8.26824C2.24809 8.3545 2.28289 8.51213 2.30124 8.59529L2.30215 8.5994C2.32674 8.71498 2.45707 8.76662 2.56036 8.71088C2.71774 8.62481 2.89725 8.54448 3.09071 8.46907C3.08497 8.48136 3.08251 8.48792 3.08497 8.4871C2.82102 8.96581 2.52429 9.63305 2.42756 9.92978C2.37346 10.0954 2.45953 10.2437 2.60708 10.3085C2.75544 10.3724 2.85544 10.3036 2.90544 10.0822C2.96774 9.80518 3.34153 8.94859 3.72023 8.25594C3.72023 8.25594 3.72269 8.25348 3.72597 8.24857C3.95467 8.17889 4.18501 8.11495 4.40305 8.05921C4.26944 8.60514 4.23501 8.83137 4.23747 9.01826C4.2383 9.20352 4.30797 9.41828 4.51863 9.38877C4.68983 9.3647 4.69899 9.23424 4.70902 9.0913C4.71129 9.05903 4.71359 9.02613 4.71782 8.99367C4.73039 8.89893 4.74045 8.81683 4.74979 8.74063L4.74979 8.7406V8.7406C4.78003 8.49373 4.8027 8.30875 4.87848 7.95674C4.88094 7.95674 4.8834 7.95182 4.88667 7.94445C5.11948 7.89199 5.31784 7.85101 5.45719 7.82395C5.43753 7.86494 5.41539 7.91002 5.39161 7.95674C5.29982 8.13708 5.20062 8.35758 5.13751 8.51824C5.07767 8.67727 5.04489 8.80268 5.03587 8.91006C5.01619 9.14614 5.1203 9.2732 5.30391 9.23958C5.44162 9.21499 5.65147 9.0363 5.88754 8.68136C5.86131 8.76579 5.84492 8.83547 5.84328 8.87891C5.83589 9.06253 5.93016 9.21417 6.23838 9.01334C6.26952 8.99285 6.27362 8.96333 6.27444 8.90432C6.29002 8.70595 6.37363 8.44282 6.55806 8.17315C6.70233 7.96577 6.80398 7.84772 6.93513 7.7928C7.01945 7.75789 7.09266 7.73953 7.15797 7.72316C7.2736 7.69416 7.36445 7.67138 7.44827 7.57394ZM4.50552 7.66575C4.63667 7.18048 4.79406 6.68374 4.95062 6.31323C4.63586 6.72554 4.29731 7.25098 3.9932 7.77559C4.17025 7.73378 4.34239 7.69772 4.50552 7.66575ZM6.38183 6.86981C6.3933 6.73046 6.281 6.63866 6.13018 6.66653C5.97935 6.69358 5.8482 6.82801 5.8359 6.96735C5.82443 7.10753 5.93755 7.19933 6.08755 7.17228C6.23838 7.14523 6.37035 7.00916 6.38183 6.86981Z"
									fill="white"
								/>
							</svg>
						}
						text_title="google"
						clicks_counter="31"
						clicks_color={true}
						text_link="https://www.google.com/se…"
						circle_color_dw_1={false}
						text_dw_1="Эффективность целевых действия на 12% ниже среднего по рынку"
						circle_color_dw_2={false}
						text_dw_2="Частые сбои с сайтом"
						circle_color_dw_3={true}
						text_dw_3="Более 100 дней активных рекламных компаний"
						circle_color_dw_4={true}
						text_dw_4="Эффективность целевых действия на 12% выше среднего"
					/> */}
			{/* <StatusSitePopUp

				circle_color_dw_1={false}
				text_dw_1="Эффективность целевых действия на 12% ниже среднего по рынку"
				circle_color_dw_2={false}
				text_dw_2="Частые сбои с сайтом"
				circle_color_dw_3={true}
				text_dw_3="Более 100 дней активных рекламных компаний"
				circle_color_dw_4={true}
				text_dw_4="Эффективность целевых действия на 12% выше среднего"
			/> */}
			{/* <Select/> */}
			{/* <StepsInfo
        steps={[
          { title: "Hello world. This is step 1, 2, 3 and this is test", isDone: true },
          { title: "sfsdfsd", isDone: false },
          { title: "efefef", isDone: true },
        ]}
      /> */}
			{/* <ContentBanner
      text_course_table=""
      text_id_table=""
      bloger={true}
      /> */}
			{/* <ProfilePopUp/> */}
			{/* <ProfilePopUpLeftSide/> */}
			{/* <VariantIMGSlider/> */}
			{/* <TableCols/> */}
			{/* <DepositePopUp/> */}
			{/* <AuditorNBanners/> */}
			{/* <Chips value={value} onChange={(e) => setValue(e.value)} /> */}
			{/* <StatisticAddCompanyPopUp/> */}
			{/* <CompaniesTablePopUp/> */}
			{/* <StatisticDropDownMenuGraphPopUp/> */}
			{/* <BubbleGraph data={data}/> */}
			{/* <Row width="auto">
        {images.map((image) => (
          <Image src={image} />
        ))}
        <Upload propFunction={handleAddImage}/>
      </Row> */}
			{/* <ContentBannerDetails
      arrayCategory={arrayCategory}
      arrayGender={arrayGender}
      arrayDevice={arrayDevice}
      arrayGeo={arrayGeo}
      arrayInteres={arrayInteres}
      /> */}
			{/* <FiltersBanners/> */}
			{/* <Bubble data={dataBubble} options={optionsBubble} /> */}
			{/* <TreeSelectCustom/> */}
			{/* <TableCol/> */}
			{/* <StatusAccDropDown/> */}
			{/* <ProfilePopUpLeftSide/> */}
			{/* <StatisticDropDownPopUp/> */}
			{/* <HeaderDownMenu/> */}
		</div>
	)
}

export default Test
