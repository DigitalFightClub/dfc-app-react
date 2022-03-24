import { AppAction, OrganizationState } from '../../types';
import { Reducer } from 'redux';
import { SET_SELECTED_FIGHTER } from '../../config/events';

export const initOrganizationState: OrganizationState = {
  selectedFighter: null,
  selectedOrg: null,
};

/**
 * Reducer Handlers
 */
function setSelectedFighter(state: OrganizationState, action: AppAction): OrganizationState {
  const { data } = action.payload;

  return {
    ...state,
    selectedFighter: { ...data.fighterData },
  };
}

export const OrganizationReducer: Reducer<OrganizationState, AppAction> = (
  state: OrganizationState = initOrganizationState,
  action: AppAction
): OrganizationState => {
  switch (action.type) {
    case SET_SELECTED_FIGHTER:
      return setSelectedFighter(state, action);
    default:
      return { ...state };
  }
};
