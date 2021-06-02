import { createSelector } from 'reselect'

const deliveryState = (state) => state.delivery

export const getDeliveryCreationStateSelector = createSelector(
	deliveryState,
	({ deliveryCreation }) => deliveryCreation,
)

export const getPackagesStateSelector = createSelector(deliveryState, ({ packages }) => packages)

export const getPackageDataStateSelector = createSelector(deliveryState, ({ packageData }) => packageData)
