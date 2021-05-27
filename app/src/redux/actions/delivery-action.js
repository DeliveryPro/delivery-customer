import { createAction } from 'redux-actions'

import { CREATE_NEW_DELIVERY_SUCCESS, CREATE_NEW_DELIVERY_START } from '../types'

import { errorHandler } from './error-action'
import logger from '../../utils/logger'
import { Delivery } from '../../api'

export const createNewDeliverySuccess = createAction(CREATE_NEW_DELIVERY_SUCCESS)
export const createNewDeliveryStart = createAction(CREATE_NEW_DELIVERY_START)

const CREATE_NEW_DELIVERY = 'CREATE_NEW_DELIVERY'

export const createNewDeliveryAction = (data) => async (dispatch) => {
    logger('createNewDeliveryAction')
    try {
        const res = await Delivery.addAnswer('testId', data)
        if (res) {
            dispatch(createNewDeliverySuccess())
        }
    } catch (e) {
        logger('createNewDeliveryAction', e)
        // dispatch(errorHandler(CREATE_NEW_DELIVERY, e))
    }
}
