import axios from 'axios'
import {getApiUrl} from './base.api'

export const getCompaniesAPI = async (token: string) => {
	const formData = new FormData()
	formData.append('token', token)

	try {
		const response = await axios.post(getApiUrl('getCompanies'), formData)
		return response
	} catch (error) {
		console.error('Error during getCompanies:', error)
		return {status: 'error'}
	}
}
