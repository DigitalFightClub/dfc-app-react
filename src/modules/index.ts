import { all } from 'redux-saga/effects';
import { FightHistoryReducer, fightHistoryWatchers } from './fight-history';
import { gymReducer, gymWatchers } from './gym';
import { organizationReducer, organizationWatchers } from './organization';

/**
 * This index is aggregating and exposing all feature components,
 * as well as combining all feature React Saga action/event handlers
 */
function* rootSagas() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const watchers: any = [...gymWatchers, ...fightHistoryWatchers, ...organizationWatchers];

  yield all(watchers);
}

export { gymReducer, FightHistoryReducer, organizationReducer, rootSagas };
