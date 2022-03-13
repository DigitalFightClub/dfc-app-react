import { AppAction, FighterInfo, FighterNFT } from '../../types';
import { call, delay, put } from 'redux-saga/effects';
import {
  GET_GYM_FIGHTERS_SUCCESS,
  GET_GYM_FIGHTERS_FAILED,
  GET_TOTAL_TKO_SUCCESS,
  GET_GYM_FIGHTERS_IN_PROGRESS,
} from '../../config/events';
import { gymAction } from './gym-actions';
import { gymApi } from './gym-api';
import { ErrorResponse } from '../../types/Errors';

export function* getGymFightersWorker(action: AppAction) {
  try {
    const { data } = action.payload;
    console.log('Gym Worker GetGymFighters...');
    console.log(JSON.stringify(data));

    yield put(
      gymAction(GET_GYM_FIGHTERS_IN_PROGRESS, {
        msg: 'Wallet not connected!',
      })
    );

    if (!data.address) {
      console.log('Wallet not connected!');
      yield put(
        gymAction(GET_GYM_FIGHTERS_FAILED, {
          msg: 'Wallet not connected!',
        })
      );
    } else {
      // Get fighter NFTs
      console.log('Fetch fighter NFTs');
      const fighterNFTs: FighterNFT[] = yield call(gymApi.getGymFighterNFTs, data.web3Api, data.address);
      console.log(JSON.stringify(fighterNFTs));

      let refinedFighters: FighterInfo[] | null = null;
      if (fighterNFTs.length > 0) {
        // create fighter info array
        console.log('transform fighter NFT metadata');
        refinedFighters = yield call(gymApi.transformFighterMetadata, fighterNFTs);
      }

      yield put(
        gymAction(GET_GYM_FIGHTERS_SUCCESS, {
          data: refinedFighters,
          msg: 'Get gym fighters successful',
        })
      );
    }
  } catch (error) {
    console.error('Failed fetching gym fighters', JSON.stringify(error));

    let msg = '';
    if (error instanceof ErrorResponse) {
      msg = error.message;
    }

    yield put(
      gymAction(GET_GYM_FIGHTERS_FAILED, {
        msg,
      })
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function* getTotalTkoWorker(action: AppAction<string, string>) {
  //TODO: call get TKO
  yield delay(1000);
  yield put(
    gymAction(GET_TOTAL_TKO_SUCCESS, {
      data: '0',
      msg: 'Get gym fighters successful',
    })
  );
}
