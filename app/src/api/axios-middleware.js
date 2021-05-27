import { POST } from './axios-config'

export const loginUser = (data) => POST(`login`, data)

export const loginWithEmail = (data) => POST('loginWithEmail', data)

export const registerUser = (data) => POST('registerUser', data)
