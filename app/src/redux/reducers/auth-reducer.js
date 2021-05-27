import { handleActions } from 'redux-actions'

import { loginSuccess, registerUserSuccess } from '../actions/auth-action'

const defaultState = {
    isAuth: false,
}

const authReducer = handleActions(
    {
        [loginSuccess]: (state, { payload }) => ({
            ...state,
            isAuth: true,
        }),
        [registerUserSuccess]: (state) => ({
            ...state,
        }),
    },
    defaultState,
)

export default authReducer
