import { handleActions } from 'redux-actions'

import { createNewMessageToSupportStart, createNewMessageToSupportSuccess } from '../actions/support-action'

const defaultState = {
	isLoading: false,
	success:false,
}

const supportReducer = handleActions(
	{
		[createNewMessageToSupportStart]: () => ({
			isLoading: true,
			success: false,
		}),
		[createNewMessageToSupportSuccess]: () => ({
			isLoading: false,
			success: true,
		}),
	},
	defaultState,
)

export default supportReducer
