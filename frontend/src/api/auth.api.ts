import axios from 'axios'
import {getApiUrl} from './base.api'

type Token = {
	token: string
}

type Creditials = {
	login: string
	password: string
}

type AuthData = Token | Creditials

//TypeGuard
const isICreditials = (data: AuthData): data is Creditials => {
	return (data as Creditials).login !== undefined
}

/**
 * Authenticates the user with the provided data and returns user information or an error response.
 *
 * @param {AuthData} data - The data used for authentication. It can be either credentials or a token.
 * @return {Promise<any>} - A promise that resolves to the user information or an error response.
 */
export const auth = async (data: AuthData): Promise<any> => {
	//If data is Creditials
	if (isICreditials(data)) {
		//Send POST request with login and password and get token, then save it in localStorage and return it
		const response = await axios.post(getApiUrl('signin'), data)
		//If token is null
		if (response.data.token === null) {
			return response.data
		}
		localStorage.setItem('token', response.data.token)
		return await auth({token: response.data.token})
	} else {
		//If data is Token
		//Send GET request with token and return user data
		const response = await axios.get(getApiUrl('auth'), {
			headers: {
				Authorization: `Bearer ${data.token}`,
				token: data.token,
			},
		})
		//If user data is null
		if (response.data === null) {
			return response.data
		} else {
			localStorage.setItem('user', response.data)
		}
		return response.data
	}
}
