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
				<Row width="248px" key={index} className={s.stepRow}>
					{step.isDone ? (
						<>
							<WhiteLabel
								size="14px"
								text={step.title}
								className={s.stepTitle}
							/>
							<svg
								className={s.stepDone}
								width="10"
								height="8"
								viewBox="0 0 10 8"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M8.5 1.5L3.6875 6.5L1.5 4.22727"
									stroke="#F2F2F2"
									strokeWidth="1.4"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</>
					) : (
						<>
							<Label text={step.title} className={s.stepTitle} />
						</>
					)}
				</Row>
			))}
		</Col>
	)
}

export default StepsInfo
