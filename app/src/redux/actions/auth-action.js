import { createAction } from 'redux-actions'

import { LOGIN_SUCCESS, LOGIN_START, REGISTER_USER_SUCCESS, REGISTER_USER_START, LOG_OUT_SUCCESS } from '../types'

import { errorHandler } from './error-action'
import logger from '../../utils/logger'
import { ExternalApi } from '../../api'

export const loginSuccess = createAction(LOGIN_SUCCESS)
export const loginStart = createAction(LOGIN_START)

const LOGIN_PAGE = 'LOGIN_PAGE'

export const loginWithEmailAction = (data) => async (dispatch) => {
    logger('loginWithEmailAction')
    dispatch(loginStart())
    try {
        const res = await ExternalApi.loginWithEmail(data)
        if (res) {
            dispatch(loginSuccess(res.uid))
            // setAuth({ user_id: res.message.user_id, username, password })
        }
    } catch (e) {
        dispatch(errorHandler(LOGIN_PAGE, e))
    }
}

export const googleAuthAction = (data) => async (dispatch) => {
    logger('googleAuthAction')
    try {
        const res = await ExternalApi.loginUser(data)
        if (res) {
            dispatch(loginSuccess(res.uid))
            // setAuth({ user_id: res.message.user_id, username, password })
        }
    } catch (e) {
        dispatch(errorHandler(LOGIN_PAGE, e))
    }
}

export const registerUserSuccess = createAction(REGISTER_USER_SUCCESS)
export const registerUserStart = createAction(REGISTER_USER_START)

export const registerUserWithEmailAction = (data) => async (dispatch) => {
    logger('registerUserWithEmailAction')
    dispatch(registerUserStart())
    try {
        const res = await ExternalApi.registerUser(data)
        if (res) {
            dispatch(registerUserSuccess())
        }
    } catch (e) {
        dispatch(errorHandler(LOGIN_PAGE, e))
    }
}

export const logOutSuccess = createAction(LOG_OUT_SUCCESS)

export const logOutUserAction = (data) => (dispatch) => {
    logger('logOutUserAction')
    dispatch(logOutSuccess())
}
