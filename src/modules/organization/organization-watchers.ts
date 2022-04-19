import { fork, ForkEffect, takeEvery } from 'redux-saga/effects';
import {
  SET_CHALLENGE_REQUEST,
} from '../../config/events';
import {
  setChallengeWorker,
} from './organization-workers';

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
function* setChallenge() {
  yield takeEvery(SET_CHALLENGE_REQUEST, setChallengeWorker);
}

export const organizationWatchers: ForkEffect[] = [
  fork(setChallenge),
];
