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
import Row from '../../components/Row/index'
import Gosuslugi from '../../assets/gosuslugiID_znak_L.svg'
import VkIcon from '../../assets/vk-svgrepo-com (1).svg'
import TGIcon from '../../assets/telegram-new-2019-seeklogo.com.svg'
import YandexIcon from '../../assets/Yandex_icon.svg'

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
				dispatch({type: 'setVerifyUserPhone', verify_user_phone: phoneNumber})
				navigate('/acceptCode')
			}
		}
	}

	return (
		<div className={s.wrapper}>
			<Col className={s.signin} width="360px">
				<NavLabel className={s.NavLabel} text="Вход в аккаунт" />

				<Row className={s.SocButtonRow} width="360px">
					<img src={Gosuslugi} alt="Gosuslugi" />
					<p className={s.SocText}>Продолжить с Госуслуги</p>
				</Row>
				<Row className={s.SocButtonRow} width="360px">
					<img src={VkIcon} alt="Vkontakte" />
					<p className={s.SocText}>Продолжить с Вконтакте</p>
				</Row>
				<Row className={s.SocButtonRow} width="360px">
					<img src={TGIcon} alt="Telegram" />
					<p className={s.SocText}>Продолжить с Telegram</p>
				</Row>
				<Row className={s.SocButtonRow} width="360px">
					<img src={YandexIcon} alt="Yandex" />
					<p className={s.SocText}>Продолжить с Yandex</p>
				</Row>

				<p className={s.CreateAccText}>
					Создавая учетную запись, я соглашаюсь с <a href="#!" className={s.BlueLink}>Условиями использования</a> и <a href="#!" className={s.BlueLink}>Политикой конфиденциальности</a>.
				</p>

				{/* Old Login In Account */}
				{/* <div className={s.input_container}>
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
				</div> */}
			</Col>
		</div>
	)
}

export default MainPage
