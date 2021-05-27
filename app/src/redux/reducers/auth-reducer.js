import { handleActions } from 'redux-actions'

import { loginSuccess, registerUserSuccess } from '../actions/auth-action'

const defaultState = {
    isAuth: false,
    uid: null,
}

const authReducer = handleActions(
    {
        [loginSuccess]: (state, { payload }) => ({
            ...state,
            isAuth: true,
            uid: payload,
        }),
        [registerUserSuccess]: (state, { payload }) => ({
            ...state,
        }),
    },
    defaultState,
)

export default authReducer
