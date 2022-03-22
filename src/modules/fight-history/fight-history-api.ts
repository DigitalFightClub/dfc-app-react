import { FightHistoryBrief, MatchResult } from '../../types';

class FightHistoryApi {
  public constructor() {
    this.getFighterHistory = this.getFighterHistory.bind(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getFighterHistory(fighterId: string): Promise<FightHistoryBrief[]> {
    return [
      {
        matchId: '1',
        challengerName: 'Bastian Bender',
        challengerImage: `https://mainnet.api.digitalfightclub.io/renderedFighter/${fighterId}.png`,
        opponentName: 'Awaiza Sarwar',
        opponentImage:
          'https://lh3.googleusercontent.com/DxpdvS00hmj9yaUUG0u-Bs1cGD1ZZ6offUZIieMD5ePI0WtxOuXNZa4W2muSeTHqOzxKfMfE7svsXM8_4cLD_ZKhylgHkQf8BcqHzw=w600',
        matchResult: MatchResult.WIN,
        matchDetails: '2nd Round Stoppage',
      },
      {
        matchId: '2',
        challengerName: 'Bastian Bender',
        challengerImage: `https://mainnet.api.digitalfightclub.io/renderedFighter/${fighterId}.png`,
        opponentName: 'Awaiza Sarwar',
        opponentImage:
          'https://lh3.googleusercontent.com/DxpdvS00hmj9yaUUG0u-Bs1cGD1ZZ6offUZIieMD5ePI0WtxOuXNZa4W2muSeTHqOzxKfMfE7svsXM8_4cLD_ZKhylgHkQf8BcqHzw=w600',
        matchResult: MatchResult.WIN,
        matchDetails: '2nd Round Stoppage',
      },
      {
        matchId: '3',
        challengerName: 'Bastian Bender',
        challengerImage: `https://mainnet.api.digitalfightclub.io/renderedFighter/${fighterId}.png`,
        opponentName: 'Awaiza Sarwar',
        opponentImage:
          'https://lh3.googleusercontent.com/DxpdvS00hmj9yaUUG0u-Bs1cGD1ZZ6offUZIieMD5ePI0WtxOuXNZa4W2muSeTHqOzxKfMfE7svsXM8_4cLD_ZKhylgHkQf8BcqHzw=w600',
        matchResult: MatchResult.WIN,
        matchDetails: '2nd Round Stoppage',
      },
      {
        matchId: '4',
        challengerName: 'Bastian Bender',
        challengerImage: `https://mainnet.api.digitalfightclub.io/renderedFighter/${fighterId}.png`,
        opponentName: 'Awaiza Sarwar',
        opponentImage:
          'https://lh3.googleusercontent.com/DxpdvS00hmj9yaUUG0u-Bs1cGD1ZZ6offUZIieMD5ePI0WtxOuXNZa4W2muSeTHqOzxKfMfE7svsXM8_4cLD_ZKhylgHkQf8BcqHzw=w600',
        matchResult: MatchResult.LOSS,
        matchDetails: '2nd Round Stoppage',
      },
      {
        matchId: '5',
        challengerName: 'Bastian Bender',
        challengerImage: `https://mainnet.api.digitalfightclub.io/renderedFighter/${fighterId}.png`,
        opponentName: 'Awaiza Sarwar',
        opponentImage:
          'https://lh3.googleusercontent.com/DxpdvS00hmj9yaUUG0u-Bs1cGD1ZZ6offUZIieMD5ePI0WtxOuXNZa4W2muSeTHqOzxKfMfE7svsXM8_4cLD_ZKhylgHkQf8BcqHzw=w600',
        matchResult: MatchResult.WIN,
        matchDetails: '2nd Round Stoppage',
      },
      {
        matchId: '6',
        challengerName: 'Bastian Bender',
        challengerImage: `https://mainnet.api.digitalfightclub.io/renderedFighter/${fighterId}.png`,
        opponentName: 'Awaiza Sarwar',
        opponentImage:
          'https://lh3.googleusercontent.com/DxpdvS00hmj9yaUUG0u-Bs1cGD1ZZ6offUZIieMD5ePI0WtxOuXNZa4W2muSeTHqOzxKfMfE7svsXM8_4cLD_ZKhylgHkQf8BcqHzw=w600',
        matchResult: MatchResult.WIN,
        matchDetails: '2nd Round Stoppage',
      },
    ];
  }

}

export const fightHistoryApi = new FightHistoryApi();
