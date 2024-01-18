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

export const addCompanyAPI = async (
	token: string,
	Company: object,
	Auditor: object,
	Banner: object,
) => {
	const formData = new FormData()
	formData.append('token', token)
	formData.append('Company', JSON.stringify(Company))
	formData.append('Auditor', JSON.stringify(Auditor))
	formData.append('Banner', JSON.stringify(Banner))

	try {
		const response = await axios.post(getApiUrl('addCompany'), formData)
		return response
	} catch (error) {
		console.error('Error during addCompany:', error)
		return {status: 'error'}
	}
}

// Function to get audience data
export const getAudienceAPI = async (token: string) => {
	const formData = new FormData()
	formData.append('token', token)

	try {
		const response = await axios.post(getApiUrl('getAudience'), formData)
		return response
	} catch (error) {
		console.error('Error during getAudience:', error)
		return {status: 'error'}
	}
}

// Function to get banners data
export const getBannersAPI = async (token: string) => {
	const formData = new FormData()
	formData.append('token', token)

	try {
		const response = await axios.post(getApiUrl('getBanners'), formData)
		return response
	} catch (error) {
		console.error('Error during getBanners:', error)
		return {status: 'error'}
	}
}

// Function to get sites data
export const getSitesAPI = async (token: string) => {
	const formData = new FormData()
	formData.append('token', token)

	try {
		const response = await axios.post(getApiUrl('getSites'), formData)
		return response
	} catch (error) {
		console.error('Error during getSites:', error)
		return {status: 'error'}
	}
}
