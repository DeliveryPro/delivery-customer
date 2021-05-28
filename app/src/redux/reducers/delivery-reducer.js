import {
    createNewDeliverySuccess,
    createNewDeliveryStart,
    getListOfUserDeliverySuccess,
    getListOfUserDeliveryStart,
    packageUpdatedSuccess,
} from '../actions/delivery-action'

import { handleActions } from 'redux-actions'

const defaultState = {
    deliveryCreation: {
        isLoading: false,
        success: false,
        message: '',
    },
    packages: {
        data: {},
        success: false,
        isLoading: false,
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
        [getListOfUserDeliverySuccess]: (state, { payload }) => ({
            ...state,
            packages: {
                isLoading: false,
                data: payload,
            },
        }),
        [getListOfUserDeliveryStart]: (state) => ({
            ...state,
            packages: {
                isLoading: true,
                queried: true,
            },
        }),
        [packageUpdatedSuccess]: (state, { payload }) => ({
            ...state,
            ...payload,
            packages: {
                isLoading: true,
                data: { ...state.packages.data, ...payload },
            },
        }),
    },
    defaultState,
)

export default errorReducer
