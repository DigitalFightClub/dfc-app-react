import { all } from 'redux-saga/effects';
import { FightHistoryReducer, fightHistoryWatchers } from './fight-history';
import { gymReducer, gymWatchers } from './gym';

/**
 * This index is aggregating and exposing all feature components,
 * as well as combining all feature React Saga action/event handlers
 */
function* rootSagas() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const watchers: any = [...gymWatchers, ...fightHistoryWatchers];

  yield all(watchers);
}

export { gymReducer, FightHistoryReducer, rootSagas };
