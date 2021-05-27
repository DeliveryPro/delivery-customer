import { createNewDeliverySuccess, createNewDeliveryStart } from '../actions/delivery-action'

import { handleActions } from 'redux-actions'

const defaultState = {
    deliveryCreation: {
        isLoading: false,
        success: false,
        message: '',
    },
}

const errorReducer = handleActions(
    {
        [createNewDeliveryStart]: (state) => ({
            ...state,
            deliveryCreation: {
                ...state.deliveryCreation,
                isLoading: true,
            },
        }),
        [createNewDeliverySuccess]: (state, { payload }) => ({
            ...state,
            deliveryCreation: {
                ...state.deliveryCreation,
                isLoading: false,
                success: true,
            },
        }),
    },
    defaultState,
)

export default errorReducer
