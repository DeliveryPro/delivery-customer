import { handleActions } from 'redux-actions'

import {
	getAllUsersSuccess,
	getAllUsersStart,
	createNewUserActionStart,
	createNewUserActionSuccess,
	sendNewCredentialsStart,
	sendNewCredentialsSuccess,
	getUserDataStart,
	getUserDataSuccess,
	updateUserStart,
	updateUserSuccess,
} from '../actions/user-action'

const defaultState = {
	users: {},
	loading: false,
	isUserLoading: false,
	isCredentialSending: false,
	user: {},
}

const notificationReducer = handleActions(
	{
		[getAllUsersSuccess]: (state, { payload }) => ({
			users: { ...state.users, ...payload },
			loading: false,
		}),
		[getAllUsersStart]: (state) => ({
			...state,
			loading: true,
		}),
		[createNewUserActionSuccess]: (state, { payload }) => ({
			...state,
			...payload,
			isUserLoading: false,
		}),
		[createNewUserActionStart]: (state) => ({
			...state,
			isUserLoading: true,
		}),
		[sendNewCredentialsStart]: (state) => ({
			...state,
			isCredentialSending: true,
		}),
		[sendNewCredentialsSuccess]: (state) => ({
			...state,
			isCredentialSending: false,
		}),
		[getUserDataStart]: (state) => ({
			...state,
			isUserLoading: true,
		}),
		[getUserDataSuccess]: (state, { payload }) => ({
			...state,
			isUserLoading: false,
			user: payload || {},
		}),
		[updateUserStart]: (state) => ({
			...state,
			isUserLoading: true,
		}),
		[updateUserSuccess]: (state, { payload }) => ({
			...state,
			isUserLoading: false,
			user: payload || {},
		}),
	},
	defaultState,
)

export default notificationReducer
