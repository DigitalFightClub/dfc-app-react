import { fork, ForkEffect, takeEvery } from 'redux-saga/effects';
import { GET_FIGHTER_HISTORY_REQUEST } from '../../config/events';
import { getFighterHistoryWorker } from './fight-history-workers';

/**
 * Define Action watchers for Redux Saga
 *
 * atchers will determine how actions get processed
 * then pass then to the worker.
 *
 * Sagas uses Genereations behind the scenes to simulate
 * multithreaded behavior in js. 'yield' is used in that
 * framework.
 */
function* getFighterHistory() {
  yield takeEvery(GET_FIGHTER_HISTORY_REQUEST, getFighterHistoryWorker);
}

export const fightHistoryWatchers: ForkEffect[] = [
  fork(getFighterHistory),
];
