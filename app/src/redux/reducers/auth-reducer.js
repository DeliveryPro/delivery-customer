import { handleActions } from 'redux-actions'

import { loginSuccess, registerUserSuccess, logOutSuccess } from '../actions/auth-action'

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
        [registerUserSuccess]: (state) => ({
            ...state,
        }),
        [logOutSuccess]: () => ({
            ...defaultState,
        }),
    },
    defaultState,
)

export default authReducer
