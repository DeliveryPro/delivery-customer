import { ExternalApi, Users } from '../../api'
import { createAction } from 'redux-actions'
import logger from '../../utils/logger'

import {
	GET_ALL_USER_START,
	GET_ALL_USER_SUCCESS,
	CREATE_NEW_USER_START,
	CREATE_NEW_USER_SUCCESS,
	SEND_NEW_CREDENTIALS_START,
	SEND_NEW_CREDENTIALS_SUCCESS,
	GET_USER_DATA_START,
	GET_USER_DATA_SUCCESS,
	UPDATE_USER_DATA_START,
	UPDATE_USER_DATA_SUCCESS,
} from '../types'
import { errorHandler } from './error-action'

export const getAllUsersStart = createAction(GET_ALL_USER_START)
export const getAllUsersSuccess = createAction(GET_ALL_USER_SUCCESS)

const USERS_PAGE = 'USERS_PAGE'

export const getAllUsersAction = (userId) => async (dispatch) => {
	logger('getAllUsers')
	try {
		const res = await Users.getUsers(userId)
		console.log('res => ', res)
		if (res) {
			dispatch(getAllUsersSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(USERS_PAGE, e))
	}
}

export const createNewUserActionStart = createAction(CREATE_NEW_USER_START)
export const createNewUserActionSuccess = createAction(CREATE_NEW_USER_SUCCESS)

const NEW_USER_PAGE = 'NEW_USER_PAGE'

export const createNewUserAction = (data) => async (dispatch) => {
	logger('createNewUserAction')
	dispatch(createNewUserActionStart())
	try {
		const res = await Users.addNew(data)
		console.log('res => ', res)
		if (res) {
			dispatch(createNewUserActionSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(NEW_USER_PAGE, e))
	}
}

export const getUserDataStart = createAction(GET_USER_DATA_START)
export const getUserDataSuccess = createAction(GET_USER_DATA_SUCCESS)

export const getUserDataAction = (userId) => async (dispatch) => {
	logger('getUserDataAction')
	dispatch(getUserDataStart())
	try {
		const res = await Users.getUser(userId)
		console.log('res => ', res)
		if (res) {
			dispatch(getUserDataSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(USERS_PAGE, e))
	}
}

export const updateUserStart = createAction(UPDATE_USER_DATA_START)
export const updateUserSuccess = createAction(UPDATE_USER_DATA_SUCCESS)

export const updateUserAction = (userId, data) => async (dispatch) => {
	logger('updateUserAction')
	dispatch(updateUserStart())
	try {
		const res = await Users.updateUser(userId, data)
		if (res) {
			dispatch(updateUserSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(USERS_PAGE, e))
	}
}


export const sendNewCredentialsStart = createAction(SEND_NEW_CREDENTIALS_START)
export const sendNewCredentialsSuccess = createAction(SEND_NEW_CREDENTIALS_SUCCESS)

export const sendNewCredentialsAction = (data) => async (dispatch) => {
	logger('sendNewCredentialsAction')
	dispatch(sendNewCredentialsStart())
	try {
		const res = await ExternalApi.passwordRestore(data)
		console.log('res => ', res)
		if (res) {
			dispatch(sendNewCredentialsSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(USERS_PAGE, e))
	}
}

