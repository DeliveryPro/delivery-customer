import axios from 'axios'
import qs from 'qs'
import logger from '../utils/logger.js'
import { REACT_APP_API_URL } from '@env'

const apiUrl = REACT_APP_API_URL

const config = {
    baseURL: apiUrl,
    maxContentLength: 36700160,
}

const axiosInstance = axios.create(config)

axiosInstance.interceptors.request.use((req) => {
    console.log('req', apiUrl)
    req.url = apiUrl + req.url
    return req
})

export const getRequestWithFilters = (filters) =>
    Object.keys(filters).reduce((prev, key) => {
        if (typeof filters[key] !== 'undefined') {
            if (typeof filters[key] === 'number') {
                prev += `${key}=${filters[key]}&`
                return prev
            }
            if (filters[key].length > 0) {
                prev += `${key}=${filters[key]}&`
            }
        }
        return prev
    }, '')

export const GET = async (link, filters = {}) => {
    try {
        const res = await axiosInstance.get(`${link}?${getRequestWithFilters(filters)}`)
        if (res?.status === 200) {
            console.log('res.data', res.data.data)
            return res.data
        }
    } catch (error) {
        logger(`error in GET  link = ${link}, ${error}`)

        if (error.response) {
            if (error.response.status === 404) {
                throw error
            }
        }
    }
}

export const POST = async (link, data = {}) => {
    try {
        const res = await axiosInstance.post(link, qs.stringify(data))

        if (res?.status === 200) {
            return res
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 409) {
                throw error
            }
        }
        logger(`error in POST link = ${link}`, error)
    }
}
