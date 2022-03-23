import { AppAction, OrganizationState } from '../../types';
import { Reducer } from 'redux';

export const initOrganizationState: OrganizationState = {
  selectedFighter: null,
  selectedOrg: null,
};

/**
 * Reducer Handlers
 */

export const OrganizationReducer: Reducer<OrganizationState, AppAction> = (
  state: OrganizationState = initOrganizationState,
  action: AppAction
): OrganizationState => {
  switch (action.type) {
    default:
      return { ...state };
  }
};
