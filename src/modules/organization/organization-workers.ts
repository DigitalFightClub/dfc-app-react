import { AppAction, FighterInfo, FightingStyle, OrganizationInfo } from '../../types';
import { call, put } from 'redux-saga/effects';
import {
  GET_FIGHTER_INFO_IN_PROGRESS,
  GET_FIGHTER_INFO_FAILED,
  GET_FIGHTER_INFO_SUCCESS,
  GET_FIGHTING_STYLES_IN_PROGRESS,
  GET_FIGHTING_STYLES_SUCCESS,
  GET_FIGHTING_STYLES_FAILED,
  SET_CHALLENGE_IN_PROGRESS,
  SET_CHALLENGE_SUCCESS,
  SET_CHALLENGE_FAILED,
  SET_ACCEPT_CHALLENGE_IN_PROGRESS,
  SET_ACCEPT_CHALLENGE_SUCCESS,
  SET_ACCEPT_CHALLENGE_FAILED,
  GET_ORG_INFO_IN_PROGRESS,
  GET_ORG_INFO_SUCCESS,
  GET_ORG_INFO_FAILED,
  GET_ORG_FIGHTERS_IN_PROGRESS,
  GET_ORG_FIGHTERS_FAILED,
  GET_ORG_FIGHTERS_SUCCESS,
} from '../../config/events';
import { organizationApi } from './organization-api';
import { ErrorResponse } from '../../types/Errors';
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
  } catch (error) {
    console.error('Failed fetching fighter info', JSON.stringify(error));

    let msg = '';
    if (error instanceof ErrorResponse) {
      msg = error.message;
    }

    yield put(
      dfcAction(GET_FIGHTER_INFO_FAILED, {
        msg,
      })
    );
  }
}

export function* getFightingStylesWorker(action: AppAction) {
  try {
    const { data } = action.payload;
    console.log('Organization Worker getFightingStyles...');
    console.log(JSON.stringify(data));

    yield put(
      dfcAction(GET_FIGHTING_STYLES_IN_PROGRESS, {
        msg: '',
      })
    );

    // Get fighting styles
    console.log('Fetch fighting styles');
    const fightingStyles: FightingStyle[] = yield call(organizationApi.getFightingStyles);
    console.log('Filled fighting styles', JSON.stringify(fightingStyles));

    yield put(
      dfcAction(GET_FIGHTING_STYLES_SUCCESS, {
        data: fightingStyles,
        msg: 'Get fighting styles successful',
      })
    );
  } catch (error) {
    console.error('Failed fetching fighting styles', JSON.stringify(error));

    let msg = '';
    if (error instanceof ErrorResponse) {
      msg = error.message;
    }

    yield put(
      dfcAction(GET_FIGHTING_STYLES_FAILED, {
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
  } catch (error) {
    console.error('Failed fetching org info', JSON.stringify(error));

    let msg = '';
    if (error instanceof ErrorResponse) {
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
    yield call(organizationApi.challengeFighter, data.fighterId, data.opponentId, data.styleId, data.web3Api);

    yield put(
      dfcAction(SET_CHALLENGE_SUCCESS, {
        data,
        msg: 'Set Challenge successful',
      })
    );
  } catch (error) {
    console.error('Failed set challenge', JSON.stringify(error));

    let msg = '';
    if (error instanceof ErrorResponse) {
      msg = error.message;
    }

    yield put(
      dfcAction(SET_CHALLENGE_FAILED, {
        msg,
      })
    );
  }
}

export function* setAcceptChallengeWorker(action: AppAction) {
  try {
    const { data } = action.payload;
    console.log('Organization Worker setAcceptChallenge...');
    console.log(JSON.stringify(data));

    yield put(
      dfcAction(SET_ACCEPT_CHALLENGE_IN_PROGRESS, {
        msg: '',
      })
    );

    // Set challenge
    console.log('set Accept Challenge');
    yield call(organizationApi.acceptChallenge, data.fighterId, data.challengerId, data.styleId, data.web3Api);

    yield put(
      dfcAction(SET_ACCEPT_CHALLENGE_SUCCESS, {
        data,
        msg: 'Set Accept Challenge successful',
      })
    );
  } catch (error) {
    console.error('Failed set accept challenge', JSON.stringify(error));

    let msg = '';
    if (error instanceof ErrorResponse) {
      msg = error.message;
    }

    yield put(
      dfcAction(SET_ACCEPT_CHALLENGE_FAILED, {
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
        data.total,
        data.page,
        data.limit,
        data.address
      );
      console.log(JSON.stringify(orgFighters));

      yield put(
        dfcAction(GET_ORG_FIGHTERS_SUCCESS, {
          data: orgFighters,
          msg: 'Get org fighters successful',
        })
      );
    }
  } catch (error) {
    console.error('Failed fetching org fighters', JSON.stringify(error));

    let msg = '';
    if (error instanceof ErrorResponse) {
      msg = error.message;
    }

    yield put(
      dfcAction(GET_ORG_FIGHTERS_FAILED, {
        msg,
      })
    );
  }
}
