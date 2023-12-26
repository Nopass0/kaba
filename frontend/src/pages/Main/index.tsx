import React, {useEffect} from 'react'
import s from './index.module.scss'
import Input from '../../components/Input'
import NavLabel from '../../components/NavLabel'
import Label from '../../components/Label'
import Col from '../../components/Col'
import BlueButton from '../../components/BlueButton/index'
import Button from '../../components/Button/index'
import SocialButtons from '../../components/SocialButtons'
import {useNavigate} from 'react-router-dom'
import {loginAPI} from '../../api/auth.api'
import {useDispatch} from 'react-redux'

const MainPage: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const phoneRegex = /^(\+7|8)\d{10}$/

	const [phoneNumber, setPhoneNumber] = React.useState<string>('')

	const isPhone: boolean = phoneRegex.test(phoneNumber)

	const login = async () => {
		if (isPhone) {
			const res = await loginAPI(phoneNumber)

			if (res.data.status === 'success') {
				let uid = await res.data.user_id

				dispatch({type: 'setVerifyUser', verify_user: uid})
				navigate('/acceptCode')
			}
		}
	}

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
						onChange={(e) => setPhoneNumber(e.target.value)}
						errorMsg={
							!isPhone && phoneNumber.length > 0 ? 'Неверный формат' : ''
						}
					/>
				</div>
				<div className={s.button_container}>
					<BlueButton onClick={login} text="Войти" />
					<Button
						onClick={() => navigate('/register')}
						className={s.createAccount}
						text="Создать аккаунт"
					/>
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
