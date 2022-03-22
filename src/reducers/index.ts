import { combineReducers } from 'redux';
import { gymReducer } from '../modules';
import { FightHistoryReducer } from '../modules/fight-history';

/**
 * Aggregate Redux Reducers (state management)
 */
export const rootReducer = combineReducers({
  gymState: gymReducer,
  fightHistoryState: FightHistoryReducer,
});
