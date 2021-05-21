// import {  } from "api";

import { createAction } from 'redux-actions'
// import { getAuth, setAuth } from "utils/localstorage-handler";

import { LOGIN_SUCCESS, LOGIN_START } from '../types'

import { errorHandler } from './error-action'
// import { notificationsShower } from "redux/actions/notification-action";
// import types from "constants";
import logger from '../../utils/logger'
import { ExternalApi } from '../../api'

export const loginSuccess = createAction(LOGIN_SUCCESS)
export const loginStart = createAction(LOGIN_START)

const LOGIN_PAGE = 'LOGIN_PAGE'

export const loginAction = (username, password) => async (dispatch) => {
    logger('loginAction')
    try {
        // const res = await auth.loginFunction(username, { data: { password } });
        // if (res) {
        //   dispatch(loginSuccess(res.message));
        //   setAuth({ user_id: res.message.user_id, username, password });
        // }
    } catch (e) {
        dispatch(errorHandler(LOGIN_PAGE, e))
    }
}

export const googleAuthAction = (data) => async (dispatch) => {
    logger('googleAuthAction')
    try {
        const res = await ExternalApi.loginUser(data)
        if (res) {
            dispatch(loginSuccess(res.message))
            // setAuth({ user_id: res.message.user_id, username, password })
        }
    } catch (e) {
        dispatch(errorHandler(LOGIN_PAGE, e))
    }
}
