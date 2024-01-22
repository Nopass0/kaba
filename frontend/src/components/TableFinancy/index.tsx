import React, {useEffect, useState} from 'react'
import s from './index.module.scss'

import {useTheme} from '@table-library/react-table-library/theme'
import {
	SelectClickTypes,
	useRowSelect,
} from '@table-library/react-table-library/select'
import {useSort} from '@table-library/react-table-library/sort'

import * as tl from '@table-library/react-table-library/table'

//svg
import Button from '../Button'

import DatePicker from 'react-multi-date-picker'
import InputIcon from 'react-multi-date-picker/components/input_icon'
import Col from '../Col'
import {format, parseISO} from 'date-fns'
import {ru} from 'date-fns/locale'

import {getUserWalletOperationsAPI} from '../../api/payment.api'
import {useSelector} from 'react-redux'

// import './index.css'

const list = [
	{
		id: '1',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},

	{
		id: '2',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},

	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
]

const THEME = {
	Table: `
  --data-table-library_grid-template-columns: 25% 25% 25% repeat(1, minmax(0, 1fr)) ;
  width: 100%;
  max-height: 500px;

  
  // scrollbar-gutter: stable;
  overflow: auto;

  &::-webkit-scrollbar {
    // position:absolute;
    // width: 10px;
  }
    ::-webkit-scrollbar-track {
      // background: none;
  }
  ::-webkit-scrollbar-thumb {
    // background: red;
    // border-radius: 10px;
  }

`,
	Header: `
    font-size: 14px;

    height: 36px;
    min-height: 36px;
  `,
	HeaderRow: `
    color: #808080;
    border-radius: 10px;
    border: 1px solid #333333;


    .th {
      padding-top: 10px;
      padding-bottom: 10px;
      background-color: #262626;
      height: 36px;
      min-height: 36px;
      display: flex;
      align-items: center;
    }

	.th:not(:nth-child(3)) {
		padding-left: 8px;
	}
	.th:first-child {
		border-radius: 0 0 0 10px;
	}

	.th:last-child {
		border-radius: 0 0 10px 0
	}

  `,
	HeaderCell: `
    &:not(:last-child) {
      border-right: 1px solid #333333;
    }

    // div {
    //   div {
    //     padding-top: 4px;
    //     padding-bottom: 4px;
    //     background-color: #474747;
    //   }
    // }
  `,
	Row: `
	&:hover {
		transition: all .2s;
		background-color: #262626;
	}
    &.row-select-selected {
      background-color: #262626;
      font-size: 14px;
      font-weight: 400;
    }
    background-color: #1A1A1A;
    color: #F2F2F2;
    
  `,
	Cell: `
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 8px;
    font-size: 14px;
    display: flex;
    align-items: center;

    div {
      display: flex;

      #green {
        color: #57BD53;
      }
      #red {
        color: #F3553E;
      }
      #gray {
        color: #808080;
      }
      #yellow {
        color: #F3A63B;
      }
    }

    &:not(:last-child)  {
      border-right: 1px solid #333333;
    }
    &:not(:last-child) {
		border-top: 1px solid #333333;
	  }
  
	  &:last-child {
		border-top: 1px solid #333333;
	  }

  `,
	Body: `
    background-color: #1A1A1A;
    border-radius: 10px;
    border: 1px solid #333333;
  `,
}

interface ITableFinancy {
	width?: string
	count?: number
}

const TableFinancy: React.FC<ITableFinancy> = ({}: ITableFinancy) => {
	const [data, setData] = useState({nodes: []}) // Изменено с list на useState
	const [isLoading, setIsLoading] = useState(true) // Состояние загрузки
	const user = useSelector((state: any) => state.user)
	const token = user?.token

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const response = await getUserWalletOperationsAPI(token)
				if (response.status === 200) {
					const formattedData = response.data.map((item) => ({
						...item,
						date_creation: format(
							parseISO(item.date_creation),
							'd MMM yyyy, HH:mm',
							{locale: ru},
						),
					}))
					setData({nodes: formattedData}) // Предполагается, что API возвращает массив операций
				} else {
					console.error('Error fetching data:', response.status)
				}
			} catch (error) {
				console.error('Error fetching data:', error)
			}
			setIsLoading(false)
		}

		fetchData()
		console.log(data, 'data')
	}, []) // Пустой массив зависимостей гарантирует, что данные загружаются только при монтировании компонента

	const [search, setSearch] = useState('')
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}
	// const sort = useSort(data);

	const theme = useTheme(THEME)
	const select = useRowSelect(
		data,
		{
			onChange: onSelectChange,
		},
		{
			clickType: SelectClickTypes.ButtonClick,
		},
	)

	const sort = useSort(
		data,
		{
			onChange: onSortChange,
		},
		{
			sortFns: {
				TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
				DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
				TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
				COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
				TASKS: (array) =>
					array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
			},
		},
	)

	tl.useCustom('search', data, {
		state: {search},
		onChange: onSearchChange,
	})

	function onSearchChange(action: any, state: any) {
		console.log(action, state)
	}

	function onSortChange(action: any, state: any) {
		console.log(action, state)
	}

	function onSelectChange(action: any, state: any) {
		console.log(action, state)
	}

	// Calendar
	const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
	const months = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	]

	return (
		<>
			<Col width="100%" className={s.Table}>
				<div className={s.extendedBlock}>
					<div className={s.extendedLink}>
						<Button width="84px" className={s.extendedButton} text="Неделя" />
						<Button width="78px" className={s.extendedButton} text="Месяц" />
						<Button width="89px" className={s.extendedButton} text="Квартал" />
						<Button width="58px" className={s.extendedButton} text="Год" />
					</div>
					<div className={s.DatePicker}>
						<DatePicker
							range
							weekDays={weekDays}
							months={months}
							numberOfMonths={2}
							fixMainPosition={true}
							arrow={false}
							highlightToday={false}
							// animations={[
							//     opacity({ from: 0.1, to: 1, duration: 400 })

							// ]}
							render={<InputIcon />}
						/>
					</div>
				</div>

				<div className={s.headerTable}>
					<label htmlFor="search" className={s.LabelSearch}>
						<input
							className={s.InputSearch}
							id="search"
							type="text"
							value={search}
							onChange={handleSearch}
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
								<p className={s.sortTableButtonTextGray}>Операции:</p>
								<p>Все</p>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none">
									<path
										d="M3 6L8 11L13 6"
										stroke="#808080"
										stroke-width="1.4"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						</button>
						<button className={s.sortTableButton}>
							<div className={s.sortTableButtonWrapper}>
								<p className={s.sortTableButtonTextGray}>Компании:</p>
								<p>Все</p>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none">
									<path
										d="M3 6L8 11L13 6"
										stroke="#808080"
										stroke-width="1.4"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						</button>
						<button className={s.sortTableButton}>
							<div className={s.sortTableButtonWrapper}>
								<p className={s.sortTableButtonTextGrayExtra}>Дополнительно</p>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M7 4C7 3.44772 7.44772 3 8 3C8.55228 3 9 3.44772 9 4C9 4.55228 8.55228 5 8 5C7.44772 5 7 4.55228 7 4ZM7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12ZM8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7Z"
										fill="#808080"
									/>
								</svg>
							</div>
						</button>
					</div>
				</div>

				<tl.Table
					id="mainTableScrollWrapper"
					data={data}
					select={select}
					theme={theme}
					sort={sort}
					layout={{custom: true}}
					className=" border-[#333333] border rounded-[10px] h-auto w-[1164px]">
					{(tableList: any) => (
						<>
							<tl.Header height={36}>
								<tl.HeaderRow className="bg-[#262626] color-[#808080] h-[36px] rounded-[10px]">
									<tl.HeaderCell style={{fontWeight: '400', fill: '#808080'}}>
										Дата
									</tl.HeaderCell>

									<tl.HeaderCell
										style={{fontWeight: '400', fill: '#808080'}}
										className={s.headerCellSort_Sort}
										sortKey="Status">
										<p className={s.sortText}>Операция</p>
									</tl.HeaderCell>

									<tl.HeaderCell
										style={{fontWeight: '400', fill: '#808080'}}
										className={s.headerCellSort_Sort}
										sortKey="Status">
										<button
											className={s.headerCellSort_Sort}
											style={{fontWeight: '400', fill: '#808080'}}
											onClick={() =>
												sort.fns.onToggleSort({
													sortKey: 'Status',
												})
											}>
											<p className={s.sortText}>Сумма</p>
											<div>
												<svg
													id="svg-icon-chevron-single-up-down"
													data-name="svg-icon-chevron-single-up-down"
													data-testid="svg-icon-chevron-single-up-down"
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 16 16"
													fill="none">
													<path
														d="M5 10L8 13L11 10"
														stroke="CurrentColor"
														strokeWidth="1.2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M5 6L8 3L11 6"
														stroke="CurrentColor"
														strokeWidth="1.2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</div>
										</button>
									</tl.HeaderCell>
									<tl.HeaderCell
										style={{fontWeight: '400', fill: '#808080'}}
										className={s.headerCellSort_Sort}
										sortKey="Status">
										<p className={s.sortText}>Детали</p>
									</tl.HeaderCell>
								</tl.HeaderRow>
							</tl.Header>

							<tl.Body id="mainTable" style={{overflow: 'overlay'}}>
								{tableList.map((item: any) => (
									<tl.Row key={item.id} item={item}>
										<tl.Cell>
											<p>{item.date_creation}</p>
										</tl.Cell>
										<tl.Cell>
											{item.operation === '' ? (
												<p className={`text-[#808080]`}>Ожидание платежа</p>
											) : (
												<p>{item.operation}</p>
											)}
										</tl.Cell>
										<tl.Cell>
											<p
												id={
													item.operationType.charAt(0) === '+' ? 'green' : ''
												}>
												{item.operationType}
												{item.balance}
												{item.currency_sign}
											</p>
										</tl.Cell>
										<tl.Cell>
											<p className={s._DetailsCell}>
												Инвойс №{item.invoice_id}
											</p>
										</tl.Cell>
									</tl.Row>
								))}
							</tl.Body>
						</>
					)}
				</tl.Table>
				<div id="scrollbarForTable"></div>
			</Col>
		</>
	)
}

export default TableFinancy
