import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

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
  // init Redux Saga middleware which will intercept dispatched events/actions from our React components
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const { run } = sagaMiddleware;

  // Return the Redux store which includes the Root Reducer(aggregates all state),
  // Initial State(sets all intial values for data driving the app), and
  // the Redux Saga middleware (will manage/handle all dispatched events/actions)
  // Include the method to run the Redux Saga middleware
  return {
    ...createStore(rootReducer, initialState, applyMiddleware(...middleware)),
    runSaga: run,
  };
}