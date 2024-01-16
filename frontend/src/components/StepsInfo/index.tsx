import React from 'react'
import s from './index.module.scss'
import Col from '../Col'
import Row from '../Row'
import Label from '../Label'
import WhiteLabel from '../WhiteLabel'

type Step = {
	title: string
	isDone?: boolean
}

interface IStepsInfo {
	steps: Step[]
}

/**
 * Renders a component that displays information about the steps.
 *
 * @param {IStepsInfo} steps - The steps object containing an array of step objects and a className string.
 * @param {string} className - The className string to be applied to the component.
 * @return {ReactElement} The rendered component.
 */
const StepsInfo: React.FC<IStepsInfo> = ({steps}: IStepsInfo) => {
	// const colClassName = `col ${className}`; // Combine className with "col" class using s[className]

	return (
		<Col width="246px" className={s.stepsInfo}>
			{steps.map((step, index) => (
				<Row width="246px" key={index} className={s.stepRow}>
					{step.isDone ? (
						<>
							<WhiteLabel
								size="14px"
								text={step.title}
								className={s.stepTitle}
							/>
							<svg
								className={s.stepDone}
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<path
									d="M11.5 5.5L6.6875 10.5L4.5 8.22727"
									stroke="#F2F2F2"
									stroke-width="1.4"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</>
					) : (
						<>
							<Label text={step.title} className={s.stepTitleGrey} />
						</>
					)}
				</Row>
			))}
		</Col>
	)
}

export default StepsInfo
