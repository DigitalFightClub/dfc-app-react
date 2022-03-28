import { fork, ForkEffect, takeEvery } from 'redux-saga/effects';
import {
  GET_FIGHTER_INFO_REQUEST,
  GET_FIGHTING_STYLES_REQUEST,
  GET_ORG_FIGHTERS_REQUEST,
  GET_ORG_INFO_REQUEST,
  SET_ACCEPT_CHALLENGE_REQUEST,
  SET_CHALLENGE_REQUEST,
} from '../../config/events';
import {
  getFighterInfoWorker,
  getFightingStylesWorker,
  getOrgInfoWorker,
  getOrgFightersWorker,
  setAcceptChallengeWorker,
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
function* getFighterInfo() {
  yield takeEvery(GET_FIGHTER_INFO_REQUEST, getFighterInfoWorker);
}

function* getOrgFighters() {
  yield takeEvery(GET_ORG_FIGHTERS_REQUEST, getOrgFightersWorker);
}

function* getFightingStyles() {
  yield takeEvery(GET_FIGHTING_STYLES_REQUEST, getFightingStylesWorker);
}

function* getOrgInfo() {
  yield takeEvery(GET_ORG_INFO_REQUEST, getOrgInfoWorker);
}

function* setChallenge() {
  yield takeEvery(SET_CHALLENGE_REQUEST, setChallengeWorker);
}

function* setAcceptChallenge() {
  yield takeEvery(SET_ACCEPT_CHALLENGE_REQUEST, setAcceptChallengeWorker);
}

export const organizationWatchers: ForkEffect[] = [
  fork(getFighterInfo),
  fork(getOrgFighters),
  fork(getFightingStyles),
  fork(getOrgInfo),
  fork(setChallenge),
  fork(setAcceptChallenge),
];
