import axios from 'axios'
import {getApiUrl} from './base.api'

//phone regex
const phoneRegex = /^(\+7|8)\d{10}$/
//login regex
const loginRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export const loginAPI = async (login: string) => {
	//check is phone(+7...) or login(@...)
	if (phoneRegex.test(login)) {
		return await axios.post(getApiUrl('verify'), {
			phone_number: login,
			type: 'login',
		})
	} else {
		return {status: 'error'}
	}
}

export const verifyAPI = async (user_id: number, code: string) => {
	return await axios.post(getApiUrl('verify_code'), {
		code: code,
		user_id: user_id,
	})
}
