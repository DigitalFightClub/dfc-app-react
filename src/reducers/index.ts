import { combineReducers } from 'redux';
import { gymReducer } from '../modules';

/**
 * Aggregate Redux Reducers (state management)
 */
export const rootReducer = combineReducers({
  gymState: gymReducer,
});
