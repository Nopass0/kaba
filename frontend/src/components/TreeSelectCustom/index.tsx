import React, {useState} from 'react'
import s from './index.module.scss'

export type Option = {
	value: string
	label: string
	subOptions?: Option[]
	expand?: boolean // Optional, if you want to control the initial expand state from the options data
}

export type TreeSelectCustomProps = {
	options: Option[]
	onChange: (selectedValues: string[]) => void
}

export const TreeSelectCustom: React.FC<TreeSelectCustomProps> = ({
	options,
	onChange,
}) => {
	const [selectedValues, setSelectedValues] = useState<string[]>(['', '', ''])
	const [checkedValues, setCheckedValues] = useState<{[key: string]: boolean}>(
		{},
	)
	const [expandedValues, setExpandedValues] = useState<{
		[key: string]: boolean
	}>({})

	const handleSelectChange = (value: string, index: number) => {
		const updatedValues = [...selectedValues]
		updatedValues[index] = value
		setSelectedValues(updatedValues)
		onChange(updatedValues)
	}

	const handleCheckboxChange = (option: Option, isChecked: boolean) => {
		const newCheckedValues = {...checkedValues}

		const setCheckedRecursively = (opt: Option, checked: boolean) => {
			newCheckedValues[opt.value] = checked

			if (opt.subOptions) {
				opt.subOptions.forEach((subOption) => {
					setCheckedRecursively(subOption, checked)
				})
			}
		}

		setCheckedRecursively(option, isChecked)

		setCheckedValues(newCheckedValues)
	}

	const toggleExpand = (option: Option) => {
		setExpandedValues({
			...expandedValues,
			[option.value]: !expandedValues[option.value],
		})
	}

	const handleRemoveChip = (value: string) => {
		handleCheckboxChange({value, label: '', subOptions: []}, false)
	}

	const renderOptions = (options: Option[], depth: number = 0) => (
		<ul style={{paddingLeft: depth * 20}}>
			{depth > 0 && <hr />}
			{options.map((option) => (
				<li key={option.value}>
					<div>
						{option.subOptions && (
							<button onClick={() => toggleExpand(option)}>
								{expandedValues[option.value] ? '-' : '+'}
							</button>
						)}
						<label>
							<input
								type="checkbox"
								checked={checkedValues[option.value] || false}
								onChange={(e) => handleCheckboxChange(option, e.target.checked)}
								ref={(el) => {
									if (el)
										el.indeterminate = checkedValues[option.value] === undefined
								}}
							/>
							{option.label}
						</label>
					</div>
					{option.subOptions &&
						expandedValues[option.value] &&
						renderOptions(option.subOptions, depth + 1)}
				</li>
			))}
		</ul>
	)

	return (
		<div>
			<div className={s.chipContainer}>
				{Object.entries(checkedValues)
					.filter(([_, checked]) => checked)
					.map(([value, _]) => (
						<div key={value} className={s.chip}>
							<span>{value}</span>
							<button onClick={() => handleRemoveChip(value)}>x</button>
						</div>
					))}
			</div>
			{renderOptions(options)}
		</div>
	)
}
