/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppAction, FighterInfo } from '../../types';
import { call, put } from 'redux-saga/effects';
import {
  SET_CHALLENGE_IN_PROGRESS,
  SET_CHALLENGE_SUCCESS,
  SET_CHALLENGE_FAILED,
} from '../../config/events';
import { organizationApi } from './organization-api';
import { dfcAction } from '../../types/actions';

export function* setChallengeWorker(action: AppAction) {
  try {
    const { data } = action.payload;
    console.log('Organization Worker setChallenge...');
    console.log(JSON.stringify(data));

    yield put(
      dfcAction(SET_CHALLENGE_IN_PROGRESS, {
        msg: '',
      })
    );

    // Set challenge
    console.log('set Challenge');
    console.log('Got Moralis from saga context', data.Moralis);
    const response: { status: number; message: string } = yield call(
      organizationApi.challengeFighter,
      data.fighterId,
      data.opponentId,
      data.fightingStyle,
      data.Moralis,
    );

    if (200 === response.status) {
      yield put(
        dfcAction(SET_CHALLENGE_SUCCESS, {
          data: response,
          msg: response.message,
        })
      );
    } else {
      yield put(
        dfcAction(SET_CHALLENGE_FAILED, {
          data: response,
          msg: response.message,
        })
      );
    }
  } catch (error: any) {
    console.error('Failed set challenge', JSON.stringify(error));
    console.log(error);

    let msg = '';
    if (error && error.message) {
      msg = error.message;
    }

    yield put(
      dfcAction(SET_CHALLENGE_FAILED, {
        msg,
      })
    );
  }
}
