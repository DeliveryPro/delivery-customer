import { createSelector } from 'reselect'

const supportState = (state) => state.support

export const getCreateSupportMessageCreationStatusSelector = createSelector(supportState, (data) => data)
