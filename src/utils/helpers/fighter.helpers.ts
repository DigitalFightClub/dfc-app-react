import _ from 'lodash';
import { Challenge, ChallengeState, FighterInfo } from '../../types';

export const getChallengeState = (
  fighterId: number,
  isOwned: boolean,
  gymFighters: FighterInfo[],
  fighterChallenges?: Challenge[]
): ChallengeState => {
  if (fighterChallenges && !isOwned) {
    if (_.findIndex(gymFighters, ({ fighterId: gymFighterId }) => gymFighterId === fighterId) >= 0) {
      return ChallengeState.COOLDOWN;
    }

    if (_.findIndex(fighterChallenges, ({ opponentId }) => fighterId === opponentId) >= 0) {
      return ChallengeState.CHALLENGED;
    }

    if (_.findIndex(fighterChallenges, ({ nftId }) => fighterId === nftId) >= 0) {
      return ChallengeState.CHALLENGING;
    }
  }
  return ChallengeState.AVAILABLE;
};
