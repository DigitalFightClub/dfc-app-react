import { AppAction, FighterHistoryState, FightHistoryBrief } from '../../types';
import { Reducer } from 'redux';
import {
  GET_FIGHTER_HISTORY_SUCCESS,
  GET_FIGHTER_HISTORY_FAILED,
  GET_FIGHTER_HISTORY_IN_PROGRESS,
} from '../../config/events';

export const initFighterHistoryState: FighterHistoryState = {
  fighterHistory: [],
  getFighterHistoryError: null,
  loadingFighterHistory: false,
};

/**
 * Reducer Handlers
 */

function setFighterHistory(
  state: FighterHistoryState,
  action: AppAction<string, FightHistoryBrief[]>
): FighterHistoryState {
  const { data } = action.payload;

  return {
    ...state,
    fighterHistory: data ? [...data] : state.fighterHistory,
    loadingFighterHistory: false,
    getFighterHistoryError: null,
  };
}

function setLoadingFighterHistory(state: FighterHistoryState, action: AppAction<string, boolean>): FighterHistoryState {
  const { data = true } = action.payload;
  console.log('loading fight history in progress', data);

  return {
    ...state,
    loadingFighterHistory: data,
    getFighterHistoryError: null,
  };
}

function setGetFighterHistoryFailed(
  state: FighterHistoryState,
  action: AppAction<string, string>
): FighterHistoryState {
  const { msg } = action.payload;

  return {
    ...state,
    loadingFighterHistory: false,
    getFighterHistoryError: msg ? msg : null,
  };
}

export const fighterHistoryReducer: Reducer<FighterHistoryState, AppAction> = (
  state: FighterHistoryState = initFighterHistoryState,
  action: AppAction
): FighterHistoryState => {
  switch (action.type) {
    case GET_FIGHTER_HISTORY_SUCCESS:
      return setFighterHistory(state, action);
    case GET_FIGHTER_HISTORY_FAILED:
      return setGetFighterHistoryFailed(state, action);
    case GET_FIGHTER_HISTORY_IN_PROGRESS:
      return setLoadingFighterHistory(state, action);
    default:
      return { ...state };
  }
};
