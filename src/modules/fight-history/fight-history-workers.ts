import { AppAction, FightHistoryBrief } from '../../types';
import { call, put } from 'redux-saga/effects';
import {
  GET_FIGHTER_HISTORY_IN_PROGRESS,
  GET_FIGHTER_HISTORY_FAILED,
  GET_FIGHTER_HISTORY_SUCCESS,
} from '../../config/events';
import { fightHistoryApi } from './fight-history-api';
import { ErrorResponse } from '../../types/Errors';
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
  } catch (error) {
    console.error('Failed fetching fighter history', JSON.stringify(error));

    let msg = '';
    if (error instanceof ErrorResponse) {
      msg = error.message;
    }

    yield put(
      dfcAction(GET_FIGHTER_HISTORY_FAILED, {
        msg,
      })
    );
  }
}
