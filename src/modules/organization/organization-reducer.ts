import { AppAction, OrganizationState } from '../../types';
import { Reducer } from 'redux';
import { GET_ORG_FIGHTERS_SUCCESS, GET_ORG_INFO_SUCCESS, SET_SELECTED_FIGHTER } from '../../config/events';

export const initOrganizationState: OrganizationState = {
  selectedFighter: null,
  selectedOrg: null,
  orgFighters: [],
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

function setOrgInfoSuccess(state: OrganizationState, action: AppAction): OrganizationState {
  const { data } = action.payload;

  return {
    ...state,
    selectedOrg: { ...data },
  };
}

function getOrgFightersSuccess(state: OrganizationState, action: AppAction): OrganizationState {
  const { data } = action.payload;

  return {
    ...state,
    orgFighters: [ ...data ],
  };
}

export const organizationReducer: Reducer<OrganizationState, AppAction> = (
  state: OrganizationState = initOrganizationState,
  action: AppAction
): OrganizationState => {
  switch (action.type) {
    case SET_SELECTED_FIGHTER:
      return setSelectedFighter(state, action);
    case GET_ORG_INFO_SUCCESS:
      return setOrgInfoSuccess(state, action);
    case GET_ORG_FIGHTERS_SUCCESS:
      return getOrgFightersSuccess(state, action);
    default:
      return { ...state };
  }
};
