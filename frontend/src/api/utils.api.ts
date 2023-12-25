import axios from 'axios'
import {getApiUrl} from './base.api'

export const checkAPI = async () => {
	console.log(getApiUrl('check'))

	const response = await axios.get(getApiUrl('check'), {
		'Content-Type': 'application/json',
	})
	return response // Shoould be 200 and return status: ok
}
