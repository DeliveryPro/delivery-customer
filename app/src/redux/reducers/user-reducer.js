import { handleActions } from 'redux-actions'

import {
    sendNewCredentialsStart,
    sendNewCredentialsSuccess,
    getUserDataStart,
    getUserDataSuccess,
    updateUserStart,
    updateUserSuccess,
} from '../actions/user-action'

const defaultState = {
    loading: false,
    isUserLoading: false,
    isCredentialSending: false,
    data: {},
}

const notificationReducer = handleActions(
    {
        [sendNewCredentialsStart]: (state) => ({
            ...state,
            isCredentialSending: true,
        }),
        [sendNewCredentialsSuccess]: (state) => ({
            ...state,
            isCredentialSending: false,
        }),
        [getUserDataStart]: (state) => ({
            ...state,
            isUserLoading: true,
        }),
        [getUserDataSuccess]: (state, { payload }) => ({
            ...state,
            isUserLoading: false,
            data: payload || {},
        }),
        [updateUserStart]: (state) => ({
            ...state,
            isUserLoading: true,
        }),
        [updateUserSuccess]: (state, { payload }) => ({
            ...state,
            isUserLoading: false,
            data: payload || {},
        }),
    },
    defaultState,
)

export default notificationReducer
