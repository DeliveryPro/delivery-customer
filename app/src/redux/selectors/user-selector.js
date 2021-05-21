import { createSelector } from 'reselect'

const userState = (state) => state.user

export const getAllUsersSelector = createSelector(userState, ({ users }) => users)

export const isUsersLoadingSelector = createSelector(userState, ({ loading }) => loading)

export const isNewCredentialSendingSelector = createSelector(
	userState,
	({ isCredentialSending }) => isCredentialSending,
)

export const userDataSelector = createSelector(userState, ({ user }) => user)
export const isUserDataLoadingSelector = createSelector(userState, ({ isUserLoading }) => isUserLoading)
