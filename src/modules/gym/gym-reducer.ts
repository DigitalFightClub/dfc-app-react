/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppAction, FighterInfo, GymState } from '../../types';
import { Reducer } from 'redux';
import {
  GET_GYM_FIGHTERS_IN_PROGRESS,
  GET_GYM_FIGHTERS_SUCCESS,
  GET_GYM_FIGHTERS_FAILED,
  GET_TOTAL_TKO_SUCCESS,
  GET_TOTAL_TKO_IN_PROGRESS,
  GET_TOTAL_TKO_FAILED,
} from '../../config/events';

export const initGymState: GymState = {
  gymFighters: [],
  loadingGymFighters: false,
  getGymFightersError: null,
  tkoTotal: '0',
  loadingTotalTko: false,
  getTotalTkoError: null,
};

/**
 * Reducer Handlers
 */

function setGymFighters(state: GymState, action: AppAction<string, FighterInfo[]>): GymState {
  const { data } = action.payload;

  return {
    ...state,
    gymFighters: data ? [...data] : state.gymFighters,
    loadingGymFighters: false,
    getGymFightersError: null,
  };
}

function setLoadingGymFighters(state: GymState, action: AppAction<string, boolean>): GymState {
  return {
    ...state,
    loadingGymFighters: true,
    getGymFightersError: null,
  };
}

function setGetGymFightersFailed(state: GymState, action: AppAction<string, string>): GymState {
  const { msg } = action.payload;

  return {
    ...state,
    loadingGymFighters: false,
    getGymFightersError: msg ? msg : null,
  };
}

function setTotalTko(state: GymState, action: AppAction<string, string>): GymState {
  const { data } = action.payload;

  return {
    ...state,
    tkoTotal: data ? data : state.tkoTotal,
    loadingTotalTko: false,
    getTotalTkoError: null,
  };
}

function setLoadingTotalTko(state: GymState, action: AppAction<string, boolean>): GymState {
  return {
    ...state,
    loadingTotalTko: true,
    getTotalTkoError: null,
  };
}

function setGetTotalTkoFailed(state: GymState, action: AppAction<string, string>): GymState {
  const { msg } = action.payload;

  return {
    ...state,
    loadingTotalTko: false,
    getTotalTkoError: msg ? msg : null,
  };
}

export const gymReducer: Reducer<GymState, AppAction> = (
  state: GymState = initGymState,
  action: AppAction
): GymState => {
  switch (action.type) {
    case GET_GYM_FIGHTERS_SUCCESS:
      return setGymFighters(state, action);
    case GET_GYM_FIGHTERS_FAILED:
      return setGetGymFightersFailed(state, action);
    case GET_GYM_FIGHTERS_IN_PROGRESS:
      return setLoadingGymFighters(state, action);
    case GET_TOTAL_TKO_SUCCESS:
      return setTotalTko(state, action);
    case GET_TOTAL_TKO_FAILED:
      return setGetTotalTkoFailed(state, action);
    case GET_TOTAL_TKO_IN_PROGRESS:
      return setLoadingTotalTko(state, action);
    default:
      return { ...state };
  }
};
