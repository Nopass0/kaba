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
import TreeSelect from '../../components/TreeSelect'
import TreeSelectCustom from '../../components/TreeSelect'
import TableBanners from '../../components/TableBanners/index';
import TableCol from '../../components/popup/TableColsPopUp/index';
import StatusAccDropDown from '../../components/StatusAccDropDown/index';
import ProfilePopUpLeftSide from '../../components/popup/ProfilePopUpLeftSide/index';
import StatisticDropDownMenuGraphPopUp from '../../components/popup/StatisticDropDownMenuGraphPopUp/index';
import StatisticAddCompanyPopUp from '../../components/popup/StatisticAddCompanyPopUp/index';
import StatisticDropDownPopUp from '../../components/popup/StatisticDropDownPopUp/index';
import HeaderDownMenu from '../../components/HeaderDownMenu/index';

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
			<StatusAcc/>
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
