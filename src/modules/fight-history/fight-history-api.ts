import { FighterInfo, FightHistoryBrief, MatchResult } from '../../types';
import { ENV_CONFG } from './../../config';

const ENV = ENV_CONFG();

class FightHistoryApi {
  public constructor() {
    this.getFighterHistory = this.getFighterHistory.bind(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getFighterHistory(fighterData: FighterInfo): Promise<FightHistoryBrief[]> {
    const fighterId: number = parseInt(fighterData.image.split('/')[4].split('.')[0]);
    return [
      {
        matchId: '1',
        challengerName: fighterData.name,
        challengerImage: `${ENV.FIGHTER_IMAGE_URL}/${fighterId}.png`,
        opponentName: 'Rosangela Chumpitaz',
        opponentImage: `${ENV.FIGHTER_IMAGE_URL}/25.png`,
        matchResult: MatchResult.WIN,
        matchDetails: '2nd Round Stoppage',
      },
      {
        matchId: '2',
        challengerName: fighterData.name,
        challengerImage: `${ENV.FIGHTER_IMAGE_URL}/${fighterId}.png`,
        opponentName: 'Rosangela Chumpitaz',
        opponentImage: `${ENV.FIGHTER_IMAGE_URL}/25.png`,
        matchResult: MatchResult.WIN,
        matchDetails: '2nd Round Stoppage',
      },
      {
        matchId: '3',
        challengerName: fighterData.name,
        challengerImage: `${ENV.FIGHTER_IMAGE_URL}/${fighterId}.png`,
        opponentName: 'Rosangela Chumpitaz',
        opponentImage: `${ENV.FIGHTER_IMAGE_URL}/25.png`,
        matchResult: MatchResult.WIN,
        matchDetails: '2nd Round Stoppage',
      },
      {
        matchId: '4',
        challengerName: fighterData.name,
        challengerImage: `${ENV.FIGHTER_IMAGE_URL}/${fighterId}.png`,
        opponentName: 'Rosangela Chumpitaz',
        opponentImage: `${ENV.FIGHTER_IMAGE_URL}/25.png`,
        matchResult: MatchResult.LOSS,
        matchDetails: '2nd Round Stoppage',
      },
      {
        matchId: '5',
        challengerName: fighterData.name,
        challengerImage: `${ENV.FIGHTER_IMAGE_URL}/${fighterId}.png`,
        opponentName: 'Rosangela Chumpitaz',
        opponentImage: `${ENV.FIGHTER_IMAGE_URL}/25.png`,
        matchResult: MatchResult.WIN,
        matchDetails: '2nd Round Stoppage',
      },
      {
        matchId: '6',
        challengerName: fighterData.name,
        challengerImage: `${ENV.FIGHTER_IMAGE_URL}/${fighterId}.png`,
        opponentName: 'Rosangela Chumpitaz',
        opponentImage: `${ENV.FIGHTER_IMAGE_URL}/25.png`,
        matchResult: MatchResult.WIN,
        matchDetails: '2nd Round Stoppage',
      },
    ];
  }
}

export const fightHistoryApi = new FightHistoryApi();
