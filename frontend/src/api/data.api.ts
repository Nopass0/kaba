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
	Company: Object,
	Auditor: Object,
	Banner: Object,
	bannerImageFiles: Object[], // Expect an array of File objects for the banner images
) => {
	// Create an instance of FormData
	const formData = new FormData()

	// Append the textual data
	formData.append('token', token)
	formData.append('Company', JSON.stringify(Company))
	formData.append('Auditor', JSON.stringify(Auditor))
	formData.append('Banner', JSON.stringify(Banner))

	// Append each image file to the formData
	bannerImageFiles.forEach((item: Object, index: number) => {
		console.log(item, index)

		formData.append(`bImages`, item.file, item.file.name) // 'bImages' corresponds to the key expected on the server side
	})
	console.log(formData)

	try {
		// Make a POST request with the formData
		const response = await axios.post(getApiUrl('addCompany'), formData, {
			headers: {
				// The browser will automatically set the correct Content-Type for multipart/form-data
				'Content-Type': 'multipart/form-data',
			},
		})

		// Return the response from the server
		return response.data // or just return response to get the full response object
	} catch (error) {
		console.error('Error during addCompany:', error)
		// Handle the error as appropriate for your application
		return {status: 'error', message: error.message}
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
	try {
		const response = await axios.get(getApiUrl('getSites'), {
			params: {
				token,
			},
		})
		return response
	} catch (error) {
		console.error('Error during getSites:', error)
		return {status: 'error'}
	}
}

//get balance
export const getBalanceAPI = async (token: string) => {
	const formData = new FormData()
	formData.append('token', token)

	try {
		const response = await axios.post(getApiUrl('getBalance'), formData)
		return response
	} catch (error) {
		console.error('Error during getBalance:', error)
		return {status: 'error'}
	}
}

export const getAllActiveCompaniesAPI = async (token: string) => {
	try {
		const response = await axios.get(getApiUrl('getAllActiveCompanies'), {
			params: {
				token,
			},
		})
		return response
	} catch (error) {
		console.error('Error during getAllActiveCompanies:', error)
		return {status: 'error'}
	}
}

export const addCompanyToBloggerAPI = async (
	token: string,
	company_id: number,
) => {
	const formData = new FormData()
	formData.append('token', token)
	formData.append('company_id', company_id.toString())

	try {
		const response = await axios.post(
			getApiUrl('addCompanyToBlogger'),
			formData,
		)
		return response
	} catch (error) {
		console.error('Error during addCompanyToBlogger:', error)
		return {status: 'error'}
	}
}

export const getCompanyBloggersAPI = async (token: string) => {
	const formData = new FormData()
	formData.append('token', token)

	try {
		const response = await axios.post(getApiUrl('getCompanyBloggers'), formData)
		return response
	} catch (error) {
		console.error('Error during getCompanyBloggers:', error)
		return {status: 'error'}
	}
}

export const transitAPI = async (domain: string) => {
	const formData = new FormData()
	formData.append('masked_domain', domain)
	try {
		const response = await axios.post(getApiUrl('checkTransition'), formData)
		return response
	} catch (error) {
		console.error('Error during transit:', error)
		return {status: 'error'}
	}
}

// Function to get statistics data
export const getStatisticsAPI = async (
	token: string,
	companyIds: string[],
	step: string,
) => {
	// Создание экземпляра FormData
	const formData = new FormData()
	formData.append('token', token)
	formData.append('companies_ids', JSON.stringify(companyIds)) // Преобразование массива ID компаний в строку JSON
	formData.append('step', step)

	try {
		// Отправка POST-запроса
		const response = await axios.post(getApiUrl('getStatistics'), formData, {
			headers: {
				// Браузер автоматически установит правильный Content-Type
				'Content-Type': 'multipart/form-data',
			},
		})

		// Возвращение данных от сервера
		return response.data // или просто return response, чтобы получить полный объект ответа
	} catch (error: any) {
		console.error('Error during getStatistics:', error)
		// Обработка ошибки в соответствии с вашим приложением
		return {status: 'error', message: error.message}
	}
}
