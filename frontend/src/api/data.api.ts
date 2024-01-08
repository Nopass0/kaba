import axios from 'axios'
import {getApiUrl} from './base.api'

/**
 * Retrieves account details.
 *
 * @param token - The authentication token.
 * @returns A promise that resolves to the server response.
 */
export const getAccount = async (token: string) => {
	return await axios.get(getApiUrl('accountModel'), {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Creates a new account.
 *
 * @param token - The authentication token.
 * @param data - The data for the new account.
 * @returns A promise that resolves to the server response.
 */
export const createAccount = async (token: string, data: any) => {
	return await axios.post(getApiUrl('accountModel'), data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Retrieves actions.
 *
 * @param token - The authentication token.
 * @returns A promise that resolves to the server response.
 */
export const getActions = async (token: string) => {
	return await axios.get(getApiUrl('actionModel'), {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Creates a new action.
 *
 * @param token - The authentication token.
 * @param data - The data for the new action.
 * @returns A promise that resolves to the server response.
 */
export const createAction = async (token: string, data: any) => {
	return await axios.post(getApiUrl('actionModel'), data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Retrieves social network details.
 *
 * @param token - The authentication token.
 * @returns A promise that resolves to the server response.
 */
export const getSocialNetwork = async (token: string) => {
	return await axios.get(getApiUrl('social_networkModel'), {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Creates a new social network.
 *
 * @param token - The authentication token.
 * @param data - The data for the new social network.
 * @returns A promise that resolves to the server response.
 */
export const createSocialNetwork = async (token: string, data: any) => {
	return await axios.post(getApiUrl('social_networkModel'), data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Retrieves ad company details.
 *
 * @param token - The authentication token.
 * @returns A promise that resolves to the server response.
 */
export const getAdCompany = async (token: string) => {
	return await axios.get(getApiUrl('ad_companyModel'), {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Creates a new ad company.
 *
 * @param token - The authentication token.
 * @param data - The data for the new ad company.
 * @returns A promise that resolves to the server response.
 */
export const createAdCompany = async (token: string, data: any) => {
	return await axios.post(getApiUrl('ad_companyModel'), data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Retrieves ad banner details.
 *
 * @param token - The authentication token.
 * @returns A promise that resolves to the server response.
 */
export const getAdBanner = async (token: string) => {
	return await axios.get(getApiUrl('ad_bannerModel'), {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Creates a new ad banner.
 *
 * @param token - The authentication token.
 * @param data - The data for the new ad banner.
 * @returns A promise that resolves to the server response.
 */
export const createAdBanner = async (token: string, data: any) => {
	return await axios.post(getApiUrl('ad_bannerModel'), data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Retrieves ad audience details.
 *
 * @param token - The authentication token.
 * @returns A promise that resolves to the server response.
 */
export const getAdAudience = async (token: string) => {
	return await axios.get(getApiUrl('ad_audienceModel'), {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Creates a new ad audience.
 *
 * @param token - The authentication token.
 * @param data - The data for the new ad audience.
 * @returns A promise that resolves to the server response.
 */
export const createAdAudience = async (token: string, data: any) => {
	return await axios.post(getApiUrl('ad_audienceModel'), data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Retrieves profile details.
 *
 * @param token - The authentication token.
 * @returns A promise that resolves to the server response.
 */
export const getProfile = async (token: string) => {
	return await axios.get(getApiUrl('profileModel'), {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Creates a new profile.
 *
 * @param token - The authentication token.
 * @param data - The data for the new profile.
 * @returns A promise that resolves to the server response.
 */
export const createProfile = async (token: string, data: any) => {
	return await axios.post(getApiUrl('profileModel'), data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Retrieves notification settings.
 *
 * @param token - The authentication token.
 * @returns A promise that resolves to the server response.
 */
export const getNotificationSettings = async (token: string) => {
	return await axios.get(getApiUrl('setting_notificationModel'), {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Updates notification settings.
 *
 * @param token - The authentication token.
 * @param data - The updated notification settings.
 * @returns A promise that resolves to the server response.
 */
export const updateNotificationSettings = async (token: string, data: any) => {
	return await axios.post(getApiUrl('setting_notificationModel'), data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Retrieves statistics.
 *
 * @param token - The authentication token.
 * @returns A promise that resolves to the server response.
 */
export const getStatistics = async (token: string) => {
	return await axios.get(getApiUrl('statisticsModel'), {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Creates new statistics.
 *
 * @param token - The authentication token.
 * @param data - The data for the new statistics.
 * @returns A promise that resolves to the server response.
 */
export const createStatistics = async (token: string, data: any) => {
	return await axios.post(getApiUrl('statisticsModel'), data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Retrieves notifications.
 *
 * @param token - The authentication token.
 * @returns A promise that resolves to the server response.
 */
export const getNotifications = async (token: string) => {
	return await axios.get(getApiUrl('notificationModel'), {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

/**
 * Creates a new notification.
 *
 * @param token - The authentication token.
 * @param data - The data for the new notification.
 * @returns A promise that resolves to the server response.
 */
export const createNotification = async (token: string, data: any) => {
	return await axios.post(getApiUrl('notificationModel'), data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}
