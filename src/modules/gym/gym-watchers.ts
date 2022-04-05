import { fork, ForkEffect, takeEvery } from 'redux-saga/effects';
import { GET_GYM_FIGHTERS_REQUEST, GET_TOTAL_TKO_REQUEST } from '../../config/events';
import { getGymFightersWorker, getTotalTkoWorker } from './gym-workers';

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
function* getGymFighters() {
  yield takeEvery(GET_GYM_FIGHTERS_REQUEST, getGymFightersWorker);
}

function* getTotalTko() {
  yield takeEvery(GET_TOTAL_TKO_REQUEST, getTotalTkoWorker);
}

export const gymWatchers: ForkEffect[] = [
  fork(getGymFighters),
  fork(getTotalTko),
];
