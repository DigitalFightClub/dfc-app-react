import _ from 'lodash';
import { Challenge, ChallengeState } from '../../types';

export const getChallengeState = (
  fighterId: number,
  isOwned: boolean,
  fighterChallenges?: Challenge[]
): ChallengeState => {
  if (fighterChallenges && !isOwned) {
    if (_.findIndex(fighterChallenges, ({ opponentId }) => fighterId === opponentId) >= 0) {
      return ChallengeState.CHALLENGED;
    }

    if (_.findIndex(fighterChallenges, ({ nftId }) => fighterId === nftId) >= 0) {
      return ChallengeState.CHALLENGING;
    }
  }
  return ChallengeState.AVAILABLE;
};
