import { AppAction, FighterInfo, OrganizationInfo } from '../../types';
import { call, put } from 'redux-saga/effects';
import {
  GET_FIGHTER_INFO_IN_PROGRESS,
  GET_FIGHTER_INFO_FAILED,
  GET_FIGHTER_INFO_SUCCESS,
  SET_CHALLENGE_IN_PROGRESS,
  SET_CHALLENGE_SUCCESS,
  SET_CHALLENGE_FAILED,
  GET_ORG_INFO_IN_PROGRESS,
  GET_ORG_INFO_SUCCESS,
  GET_ORG_INFO_FAILED,
  GET_ORG_FIGHTERS_IN_PROGRESS,
  GET_ORG_FIGHTERS_FAILED,
  GET_ORG_FIGHTERS_SUCCESS,
} from '../../config/events';
import { organizationApi } from './organization-api';
import { dfcAction } from '../../types/actions';

export function* getFighterInfoWorker(action: AppAction) {
  try {
    const { data } = action.payload;
    console.log('Organization Worker GetFighterInfo...');
    console.log(JSON.stringify(data));

    yield put(
      dfcAction(GET_FIGHTER_INFO_IN_PROGRESS, {
        msg: '',
      })
    );

    if (!data.fighterData) {
      yield put(
        dfcAction(GET_FIGHTER_INFO_FAILED, {
          msg: 'Missing fighter ID!',
        })
      );
    } else {
      // Get fighter info
      console.log('Fetch fighter info');
      const fighterInfo: FighterInfo = yield call(organizationApi.getFighterInfo, data.fighterData);
      console.log('Filled fighter info', JSON.stringify(fighterInfo));

      yield put(
        dfcAction(GET_FIGHTER_INFO_SUCCESS, {
          data: fighterInfo,
          msg: 'Get fighter info successful',
        })
      );
    }
  } catch (error: any) {
    console.error('Failed fetching fighter info', JSON.stringify(error));

    let msg = '';
    if (error && error.message) {
      msg = error.message;
    }

    yield put(
      dfcAction(GET_FIGHTER_INFO_FAILED, {
        msg,
      })
    );
  }
}

export function* getOrgInfoWorker(action: AppAction) {
  try {
    const { data } = action.payload;
    console.log('Organization Worker getOrgInfo...');
    console.log(JSON.stringify(data));

    yield put(
      dfcAction(GET_ORG_INFO_IN_PROGRESS, {
        msg: '',
      })
    );

    // Get org info
    console.log('Fetch org info');
    const orgInfo: OrganizationInfo = yield call(organizationApi.getOrgInfo, data.orgId);
    console.log('Filled org info', JSON.stringify(orgInfo));

    yield put(
      dfcAction(GET_ORG_INFO_SUCCESS, {
        data: orgInfo,
        msg: 'Get org info successful',
      })
    );
  } catch (error: any) {
    console.error('Failed fetching org info', JSON.stringify(error));

    let msg = '';
    if (error && error.message) {
      msg = error.message;
    }

    yield put(
      dfcAction(GET_ORG_INFO_FAILED, {
        msg,
      })
    );
  }
}

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

export function* getOrgFightersWorker(action: AppAction) {
  try {
    const { data } = action.payload;
    console.log('Org Worker GetOrgFighters...');
    console.log(JSON.stringify(data));

    yield put(
      dfcAction(GET_ORG_FIGHTERS_IN_PROGRESS, {
        msg: 'Wallet not connected!',
      })
    );

    if (!data.address) {
      console.log('Wallet not connected!');
      yield put(
        dfcAction(GET_ORG_FIGHTERS_FAILED, {
          msg: 'Wallet not connected!',
        })
      );
    } else {
      // Get fighter NFTs
      console.log('Fetch fighter NFTs');
      const orgFighters: FighterInfo[] = yield call(
        organizationApi.getOrgFighters,
        data.web3Api,
        data.limit,
        data.offset,
        data.address,
        data.nftId
      );
      console.log(JSON.stringify(orgFighters));

      yield put(
        dfcAction(GET_ORG_FIGHTERS_SUCCESS, {
          data: orgFighters,
          msg: 'Get org fighters successful',
        })
      );
    }
  } catch (error: any) {
    console.error('Failed fetching org fighters', JSON.stringify(error));

    let msg = '';
    if (error && error.message) {
      msg = error.message;
    }

    yield put(
      dfcAction(GET_ORG_FIGHTERS_FAILED, {
        msg,
      })
    );
  }
}
