import { combineReducers } from 'redux';
import { gymReducer } from '../modules';
import { FightHistoryReducer } from '../modules/fight-history';
import { organizationReducer } from '../modules/organization/organization-reducer';

/**
 * Aggregate Redux Reducers (state management)
 */
export const rootReducer = combineReducers({
  gymState: gymReducer,
  fightHistoryState: FightHistoryReducer,
  organizationState: organizationReducer,
});
