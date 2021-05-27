import { createSelector } from 'reselect'

const deliveryState = (state) => state.delivery

export const getDeliveryCreationStateSelector = createSelector(deliveryState, ({ deliveryCreation }) => deliveryCreation)
