import { useReducer } from 'react'
import { LOGIN_ACTION, LOGOUT_ACTION } from '../types'

const initialState = {
    isAuth: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN_ACTION:
            return { ...state, isAuth: true }
        case LOGOUT_ACTION:
            return initialState
        default:
            return state
    }
}

const AuthReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return {
        isAuth: state.isAuth,
        setIsAuth: () => dispatch({ type: LOGIN_ACTION }),
        setLogout: () => dispatch({ type: LOGOUT_ACTION }),
    }
}

export default AuthReducer
