import { AppAction, FighterHistoryState, FighterModalState } from '../../types';
import { Reducer } from 'redux';
import { SET_FIGHTER_CHALLENGE, SET_FIGHTER_DETAILS, SET_FIGHT_RESULTS } from '../../config/events';

export const initFighterHistoryState: FighterHistoryState = {
  selectedFightResult: null,
  fighterModalState: FighterModalState.DETAILS,
};

/**
 * Reducer Handlers
 */
function setFighterDetails(state: FighterHistoryState): FighterHistoryState {
  console.log('Set fighter details MODAL STATE');
  return {
    ...state,
    fighterModalState: FighterModalState.DETAILS,
    selectedFightResult: null,
  };
}

function setFighterChallenge(state: FighterHistoryState): FighterHistoryState {
  console.log('Set fighter challenge MODAL STATE');
  return {
    ...state,
    fighterModalState: FighterModalState.CHALLENGE,
    selectedFightResult: null,
  };
}

function setFightResults(state: FighterHistoryState, action: AppAction): FighterHistoryState {
  const { data } = action.payload;
  console.log('Set fighter results MODAL STATE', data);
  return {
    ...state,
    selectedFightResult: { fighterId: data.challengerId, opponentId: data.opponentId, matchId: data.matchId },
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
