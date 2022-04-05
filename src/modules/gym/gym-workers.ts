/* eslint-disable @typescript-eslint/no-explicit-any */
import { AccountNFTResult, AppAction, FighterInfo } from '../../types';
import { all, call, CallEffect, delay, put } from 'redux-saga/effects';
import {
  GET_GYM_FIGHTERS_SUCCESS,
  GET_GYM_FIGHTERS_FAILED,
  GET_TOTAL_TKO_SUCCESS,
  GET_GYM_FIGHTERS_IN_PROGRESS,
} from '../../config/events';
import { gymApi } from './gym-api';
import { dfcAction } from '../../types/actions';

export function* getGymFightersWorker(action: AppAction) {
  try {
    const { data } = action.payload;
    console.log('Gym Worker GetGymFighters...');
    console.log(JSON.stringify(data));

    yield put(
      dfcAction(GET_GYM_FIGHTERS_IN_PROGRESS, {
        msg: 'Wallet not connected!',
      })
    );

    if (!data.address) {
      console.log('Wallet not connected!');
      yield put(
        dfcAction(GET_GYM_FIGHTERS_FAILED, {
          msg: 'Wallet not connected!',
        })
      );
    } else {
      // Get fighter NFTs
      console.log('Fetch fighter NFTs');
      const fighterNFTs: AccountNFTResult = yield call(gymApi.getGymFighterNFTs, data.web3Api, data.address);
      console.log(fighterNFTs);

      let refinedFighters: FighterInfo[] | null = null;
      if (fighterNFTs && fighterNFTs.total > 0) {
        // create fighter info array
        console.log('transform fighter NFT metadata');
        refinedFighters = yield call(gymApi.transformFighterMetadata, fighterNFTs.result, data.address);
      }

      // Add challengeState
      let finalFighters: FighterInfo[] | null = null;
      if (refinedFighters && refinedFighters.length > 0) {
        console.log('Fill fighter challenge state');
        const fighterChallengedCalls: CallEffect<FighterInfo>[] = refinedFighters.map((fighter) =>
          call(gymApi.getFigherChallenged, fighter)
        );
        finalFighters = yield all(fighterChallengedCalls);
        console.log('filled with challenge state', finalFighters);
      }

      yield put(
        dfcAction(GET_GYM_FIGHTERS_SUCCESS, {
          data: finalFighters ? finalFighters : refinedFighters,
          msg: 'Get gym fighters successful',
        })
      );
    }
  } catch (error:any) {
    console.error('Failed fetching gym fighters', JSON.stringify(error));

    let msg = '';
    if (error && error.message) {
      msg = error.message;
    }

    yield put(
      dfcAction(GET_GYM_FIGHTERS_FAILED, {
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
    dfcAction(GET_TOTAL_TKO_SUCCESS, {
      data: '0',
      msg: 'Get gym fighters successful',
    })
  );
}
