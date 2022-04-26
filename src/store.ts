import { createStore } from 'redux';

import { rootReducer } from './reducers';
import { AppState } from './types';
import { initFighterHistoryState } from './modules/fight-history/fight-history-reducer';
import { initOrganizationState } from './modules/organization/organization-reducer';

// Create initial state form the app from each feature module
const init: AppState = {
  fightHistoryState: initFighterHistoryState,
  organizationState: initOrganizationState,
};

export function store(initialState: AppState = init) {
  // Return the Redux store which includes the Root Reducer(aggregates all state),
  // Initial State(sets all intial values for data driving the app), and
  // the Redux Saga middleware (will manage/handle all dispatched events/actions)
  // Include the method to run the Redux Saga middleware
  return {
    ...createStore(rootReducer, initialState),
  };
}
