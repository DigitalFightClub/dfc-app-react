import { AppAction, FighterHistoryState, FighterModalState, FightHistoryBrief } from '../../types';
import { Reducer } from 'redux';
import _ from 'lodash';
import {
  GET_FIGHTER_HISTORY_SUCCESS,
  GET_FIGHTER_HISTORY_FAILED,
  GET_FIGHTER_HISTORY_IN_PROGRESS,
  SET_FIGHTER_CHALLENGE,
  SET_FIGHTER_DETAILS,
  SET_FIGHT_RESULTS_IN_PROGRESS,
  SET_FIGHT_RESULTS_SUCCESS,
} from '../../config/events';

export const initFighterHistoryState: FighterHistoryState = {
  fighterHistory: [],
  selectedFightHistoryBrief: null,
  loadingFightResult: false,
  getFighterHistoryError: null,
  loadingFighterHistory: false,
  fighterModalState: FighterModalState.DETAILS,
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

function setLoadingFighterHistory(state: FighterHistoryState): FighterHistoryState {
  return {
    ...state,
    loadingFighterHistory: true,
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
    loadingFightResult: false,
    getFighterHistoryError: msg ? msg : null,
  };
}


function setFighterDetails(state: FighterHistoryState): FighterHistoryState {
  return {
    ...state,
    fighterModalState: FighterModalState.DETAILS,
    selectedFightHistoryBrief: null,
  };
}

function setFighterChallenge(state: FighterHistoryState): FighterHistoryState {
  return {
    ...state,
    fighterModalState: FighterModalState.CHALLENGE,
    selectedFightHistoryBrief: null,
  };
}

function setFightResultsSuccess(state: FighterHistoryState, action: AppAction): FighterHistoryState {
  const { data } = action.payload;

  const copyData: FightHistoryBrief = _.cloneDeep(data);

  return {
    ...state,
    selectedFightHistoryBrief: copyData,
    fighterModalState: FighterModalState.RESULTS,
    loadingFightResult: false,
  };
}

function setFightResultsInProgress(state: FighterHistoryState): FighterHistoryState {
  return {
    ...state,
    loadingFightResult: true,
  };
}

export const FightHistoryReducer: Reducer<FighterHistoryState, AppAction> = (
  state: FighterHistoryState = initFighterHistoryState,
  action: AppAction
): FighterHistoryState => {
  switch (action.type) {
    case GET_FIGHTER_HISTORY_SUCCESS:
      return setFighterHistory(state, action);
    case GET_FIGHTER_HISTORY_FAILED:
      return setGetFighterHistoryFailed(state, action);
    case GET_FIGHTER_HISTORY_IN_PROGRESS:
      return setLoadingFighterHistory(state);
    case SET_FIGHTER_DETAILS:
      return setFighterDetails(state);
    case SET_FIGHTER_CHALLENGE:
      return setFighterChallenge(state);
    case SET_FIGHT_RESULTS_SUCCESS:
      return setFightResultsSuccess(state, action);
    case SET_FIGHT_RESULTS_IN_PROGRESS:
      return setFightResultsInProgress(state);
    default:
      return { ...state };
  }
};
