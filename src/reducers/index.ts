import { combineReducers } from 'redux';
import { FightHistoryReducer } from '../modules/fight-history';
import { organizationReducer } from '../modules/organization/organization-reducer';

/**
 * Aggregate Redux Reducers (state management)
 */
export const rootReducer = combineReducers({
  fightHistoryState: FightHistoryReducer,
  organizationState: organizationReducer,
});
