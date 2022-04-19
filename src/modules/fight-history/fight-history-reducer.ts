import { AppAction, FighterHistoryState, FighterModalState, FightHistoryBrief } from '../../types';
import { Reducer } from 'redux';
import _ from 'lodash';
import {
  SET_FIGHTER_CHALLENGE,
  SET_FIGHTER_DETAILS,
  SET_FIGHT_RESULTS,
} from '../../config/events';

export const initFighterHistoryState: FighterHistoryState = {
  selectedFightHistoryBrief: null,
  fighterModalState: FighterModalState.DETAILS,
};

/**
 * Reducer Handlers
 */
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

function setFightResults(state: FighterHistoryState, action: AppAction): FighterHistoryState {
  const { data } = action.payload;

  const copyData: FightHistoryBrief = _.cloneDeep(data);

  return {
    ...state,
    selectedFightHistoryBrief: copyData,
    fighterModalState: FighterModalState.RESULTS,
  };
}

export const FightHistoryReducer: Reducer<FighterHistoryState, AppAction> = (
  state: FighterHistoryState = initFighterHistoryState,
  action: AppAction
): FighterHistoryState => {
  switch (action.type) {
    case SET_FIGHTER_DETAILS:
      return setFighterDetails(state);
    case SET_FIGHTER_CHALLENGE:
      return setFighterChallenge(state);
    case SET_FIGHT_RESULTS:
      return setFightResults(state, action);
    default:
      return { ...state };
  }
};
