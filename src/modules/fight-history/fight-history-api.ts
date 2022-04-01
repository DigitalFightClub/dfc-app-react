import { FighterInfo, FightHistoryBrief, MatchResult } from '../../types';
import { ENV_CONFG } from './../../config';

const ENV = ENV_CONFG();

class FightHistoryApi {
  public constructor() {
    this.getFighterHistory = this.getFighterHistory.bind(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getFighterHistory(fighterData: FighterInfo): Promise<FightHistoryBrief[]> {
    // const response = await axios.get(`${ENV.FIGHTER_API_URL}/fightHistory`, {
    //   params: {
    //     nftId: fighterData.fighterId,
    //   },
    // });

    const response = {
      data: [
        {
          uuid: '09a19bfb-3810-4776-8bce-741e39c43d3b',
          nftId: 2,
          opponentId: 1,
          rounds: [
            {
              2: 9,
              1: 10,
            },
            {
              2: 10,
              1: 9,
            },
            {
              2: 10,
              1: 9,
            },
          ],
          outcome: '3rd Round Stoppage',
        },
      ],
    };

    //TODO: tansform into this the following FightHistoryBrief structure

    return [
      {
        matchId: response.data[0].uuid,
        challengerName: fighterData.name,
        challengerImage: `${ENV.FIGHTER_IMAGE_URL}/${response.data[0].nftId}.png`,
        opponentName: 'Opponent', // fill name here
        opponentImage: `${ENV.FIGHTER_IMAGE_URL}/${response.data[0].opponentId}.png`,
        matchResult: MatchResult.WIN, // if nftId is winner/loser
        matchDetails: response.data[0].outcome,
      },
    ];
    //TODO: fill opponent names, need metadata cache... selectors in saga workers
  }
}

export const fightHistoryApi = new FightHistoryApi();
