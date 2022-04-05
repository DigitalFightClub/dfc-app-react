/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppAction, FightHistoryBrief } from '../../types';
import { call, put } from 'redux-saga/effects';
import {
  GET_FIGHTER_HISTORY_IN_PROGRESS,
  GET_FIGHTER_HISTORY_FAILED,
  GET_FIGHTER_HISTORY_SUCCESS,
  SET_FIGHT_RESULTS_IN_PROGRESS,
  SET_FIGHT_RESULTS_SUCCESS,
} from '../../config/events';
import { fightHistoryApi } from './fight-history-api';
import { dfcAction } from '../../types/actions';

export function* getFighterHistoryWorker(action: AppAction) {
  try {
    const { data } = action.payload;
    console.log('Fight History Worker GetFighterHistory...');
    console.log(JSON.stringify(data));

    yield put(
      dfcAction(GET_FIGHTER_HISTORY_IN_PROGRESS, {
        msg: '',
      })
    );

    if (!data.fighterData) {
      yield put(
        dfcAction(GET_FIGHTER_HISTORY_FAILED, {
          msg: 'Missing fighter ID!',
        })
      );
    } else {
      // Get fighter history
      console.log('Fetch fighter history');
      const fighterHistory: FightHistoryBrief[] = yield call(fightHistoryApi.getFighterHistory, data.fighterData);
      console.log('Filled fighter history', JSON.stringify(fighterHistory));

      yield put(
        dfcAction(GET_FIGHTER_HISTORY_SUCCESS, {
          data: fighterHistory,
          msg: 'Get fighter history successful',
        })
      );
    }
  } catch (error: any) {
    console.error('Failed fetching fighter history', JSON.stringify(error));
    console.log(error);

    let msg = '';
    if (error && error.message) {
      msg = error.message;
    }

    yield put(
      dfcAction(GET_FIGHTER_HISTORY_FAILED, {
        msg,
      })
    );
  }
}

export function* setFightResultsWorker(action: AppAction) {
  try {
    const { data } = action.payload;
    console.log('Fight Result Worker setFightResultsWorker...');
    console.log(JSON.stringify(data));

    yield put(
      dfcAction(SET_FIGHT_RESULTS_IN_PROGRESS, {
        msg: '',
      })
    );

    if (!data) {
      yield put(
        dfcAction(GET_FIGHTER_HISTORY_FAILED, {
          msg: 'Missing fighter history data!',
        })
      );
    } else {
      // Get fighter history
      console.log('Fetch fighter data');
      const fightResult: FightHistoryBrief = yield call(fightHistoryApi.getFighterData, data);
      console.log('Filled fighter data', JSON.stringify(fightResult));

      yield put(
        dfcAction(SET_FIGHT_RESULTS_SUCCESS, {
          data: fightResult,
          msg: 'Get fighter result successful',
        })
      );
    }
  } catch (error: any) {
    console.error('Failed fetching fighter result', JSON.stringify(error));
    console.log(error);

    let msg = '';
    if (error && error.message) {
      msg = error.message;
    }

    yield put(
      dfcAction(GET_FIGHTER_HISTORY_FAILED, {
        msg,
      })
    );
  }
}
