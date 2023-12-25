import React from 'react'
import s from './index.module.scss'
import Input from '../../components/Input'
import NavLabel from '../../components/NavLabel'
import Label from '../../components/Label'
import Col from '../../components/Col'
import BlueButton from '../../components/BlueButton/index'
import Button from '../../components/Button/index'
import SocialButtons from '../../components/SocialButtons'

const MainPage: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<Col className={s.signin} width="360px">
				<NavLabel text="Вход в аккаунт" />
				<div className={s.input_container}>
					<Label text="Логин или телефон" />
					<Input
						placeholder="Ввести..."
						id="1"
						className={s.login}
						isSecure={false}
					/>
				</div>
				<div className={s.button_container}>
					<BlueButton text="Войти" />
					<Button className={s.createAccount} text="Создать аккаунт" />
				</div>
				<div className={s.socials}>
					<Label text="Или войти с помощью" />
					<SocialButtons className={s.socialButtons} />
				</div>
			</Col>
		</div>
	)
}

export default MainPage
