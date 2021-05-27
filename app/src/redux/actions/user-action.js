import { ExternalApi, Users } from '../../api'
import { createAction } from 'redux-actions'
import logger from '../../utils/logger'

import {
    SEND_NEW_CREDENTIALS_START,
    SEND_NEW_CREDENTIALS_SUCCESS,
    GET_USER_DATA_START,
    GET_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_START,
    UPDATE_USER_DATA_SUCCESS,
} from '../types'
import { errorHandler } from './error-action'

const USERS_PAGE = 'USERS_PAGE'

export const getUserDataStart = createAction(GET_USER_DATA_START)
export const getUserDataSuccess = createAction(GET_USER_DATA_SUCCESS)

export const getUserDataAction = (userId) => async (dispatch) => {
    logger('getUserDataAction')
    dispatch(getUserDataStart())
    try {
        const res = await Users.getUser(userId)
        if (res) dispatch(getUserDataSuccess(res))
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
        if (res) dispatch(updateUserSuccess(res))
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
        if (res) dispatch(sendNewCredentialsSuccess(res))
    } catch (e) {
        dispatch(errorHandler(USERS_PAGE, e))
    }
}
