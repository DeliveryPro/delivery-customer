import { Support } from '../../api'
import { createAction } from 'redux-actions'
import logger from '../../utils/logger'

import { CREATE_NEW_MESSAGE_TO_SUPPORT_START, CREATE_NEW_MESSAGE_TO_SUPPORT_SUCCESS } from '../types'
import { errorHandler } from './error-action'

export const createNewMessageToSupportStart = createAction(CREATE_NEW_MESSAGE_TO_SUPPORT_START)
export const createNewMessageToSupportSuccess = createAction(CREATE_NEW_MESSAGE_TO_SUPPORT_SUCCESS)

const SUPPORT_PAGE = 'SUPPORT_PAGE'

export const createNewMessageToSupportAction = (data) => async (dispatch) => {
	logger('createNewMessageToSupportAction')
	dispatch(createNewMessageToSupportStart())
	try {
		const res = await Support.createNew(data)
		if (res) {
			dispatch(createNewMessageToSupportSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(SUPPORT_PAGE, e))
	}
}
