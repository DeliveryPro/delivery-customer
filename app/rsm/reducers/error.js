import { ERROR_START, ERROR_HIDE } from '../types'

import { useReducer } from 'react'

const initialState = {
    error: null,
    message: '',
}

const reducer = (state, action) => {
    switch (action.type) {
        case ERROR_START:
            return { ...state, ...action.payload }
        case ERROR_HIDE:
            return initialState
        default:
            return state
    }
}

const ErrorWorker = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log('errorWorker', state)
    return {
        ...state,
        onError: (data) => dispatch({ type: ERROR_START, payload: data }),
        hideError: () => dispatch({ type: ERROR_HIDE }),
    }
}

export default ErrorWorker
