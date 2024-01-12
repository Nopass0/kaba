//auth.api.ts
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

export const registerAPI = async (
	login: string,
	name: string,
	phone: string,
) => {
	//check is phone(+7...) or login(@...)
	if (phoneRegex.test(phone)) {
		return await axios.post(getApiUrl('verify'), {
			phone_number: phone,
			login: login,
			firstname: name,
			type: 'register',
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
