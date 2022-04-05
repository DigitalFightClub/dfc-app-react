import axios, { AxiosResponse } from 'axios';
import { FighterInfo, FightHistoryBrief, MatchResult, Round } from '../../types';
import { fetchJsonMetaData, transformFighterMetadata } from '../../utils/web3/moralis';
import { ENV_CONFG } from './../../config';

const ENV = ENV_CONFG();

class FightHistoryApi {
  public constructor() {
    this.getFighterHistory = this.getFighterHistory.bind(this);
    this.getFighterData = this.getFighterData.bind(this);
  }

  public async getFighterData(brief: FightHistoryBrief): Promise<FightHistoryBrief> {
    // get both fighters metadata
    let challengerMetadata: FighterInfo | null = await fetchJsonMetaData(
      `${ENV.FIGHTER_METADATA_URL}/${brief.challengerId}`
    );
    let opponentMetadata: FighterInfo | null = await fetchJsonMetaData(
      `${ENV.FIGHTER_METADATA_URL}/${brief.opponentId}`
    );
    if (challengerMetadata && opponentMetadata) {
      const challengerMetadataRefined: FighterInfo[] = transformFighterMetadata(
        [{ metadata: challengerMetadata }],
        'null'
      );
      challengerMetadata = challengerMetadataRefined[0];

      const opponentMetadataRefined: FighterInfo[] = transformFighterMetadata([{ metadata: opponentMetadata }], 'null');
      opponentMetadata = opponentMetadataRefined[0];

      // update brief
      brief.challengerCountryCode = challengerMetadata.countryCode;
      brief.opponentCountryCode = opponentMetadata.countryCode;

      // update brief with figher record
      const challengerResp: AxiosResponse<any> = await axios.get(`${ENV.FIGHTER_API_URL}/fightHistory`, {
        params: {
          nftId: brief.challengerId,
        },
      });
      if (challengerResp && challengerResp.data && challengerResp.data.record) {
        brief.challengerWins = challengerResp.data.record.wins;
        brief.challengerLoses = challengerResp.data.record.losses;
      }

      const opponentResp: AxiosResponse<any> = await axios.get(`${ENV.FIGHTER_API_URL}/fightHistory`, {
        params: {
          nftId: brief.opponentId,
        },
      });
      if (opponentResp && opponentResp.data && opponentResp.data.record) {
        brief.opponentWins = opponentResp.data.record.wins;
        brief.opponentLoses = opponentResp.data.record.losses;
      }

      return brief;
    }
    return brief;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getFighterHistory(fighterData: FighterInfo): Promise<FightHistoryBrief[]> {
    const response: AxiosResponse<any> = await axios.get(`${ENV.FIGHTER_API_URL}/fightHistory`, {
      params: {
        nftId: fighterData.fighterId,
      },
    });
    console.log('history axios response', response.data);

    // transform results into fighthistorybrief type
    const briefs = response.data.fightHistory.map((historyRecord: any) => {
      if (historyRecord.uuid) {
        // build Rounds
        const rounds: Round[] = [];
        let i = 1;
        let round: any | undefined | null = historyRecord.fight_results[`round${i}`];
        while (round || null === round) {
          // add round to array
          if (round) {
            rounds.push({
              roundNumber: i,
              afterStoppage: false,
              challengerScore:
                fighterData.fighterId === historyRecord.nftId ? round.fighterOneScore : round.fighterTwoScore,
              opponentScore:
                fighterData.fighterId === historyRecord.nftId ? round.fighterTwoScore : round.fighterOneScore,
              roundWinner: round.roundWinner,
              stoppage: round.stoppage,
            });
          } else {
            rounds.push({
              roundNumber: i,
              afterStoppage: true,
              challengerScore: 0,
              opponentScore: 0,
              roundWinner: '',
              stoppage: false,
            });
          }

          // increment and fetch next round
          i++;
          round = historyRecord.fight_results[`round${i}`];
        }

        // return fight History brief
        return {
          matchId: historyRecord.uuid,
          challengerId: fighterData.fighterId === historyRecord.nftId ? historyRecord.nftId : historyRecord.opponentId,
          challengerName:
            fighterData.fighterId === historyRecord.nftId ? historyRecord.nftName : historyRecord.opponentName,
          challengerImage:
            fighterData.fighterId === historyRecord.nftId
              ? `${ENV.FIGHTER_IMAGE_URL}/${historyRecord.nftId}.png`
              : `${ENV.FIGHTER_IMAGE_URL}/${historyRecord.opponentId}.png`,
          opponentId: fighterData.fighterId === historyRecord.nftId ? historyRecord.opponentId : historyRecord.nftId,
          opponentName:
            fighterData.fighterId === historyRecord.nftId ? historyRecord.opponentName : historyRecord.nftName,
          opponentImage:
            fighterData.fighterId === historyRecord.nftId
              ? `${ENV.FIGHTER_IMAGE_URL}/${historyRecord.opponentId}.png`
              : `${ENV.FIGHTER_IMAGE_URL}/${historyRecord.nftId}.png`,
          winnerId: historyRecord.winnerId,
          matchResult: fighterData.fighterId === historyRecord.winnerId ? MatchResult.WIN : MatchResult.LOSS,
          fightResults: {
            winner: historyRecord.fight_results.winner,
            winner_style: historyRecord.fight_results.winner_style,
            unanimous: historyRecord.fight_results.unanimous,
            outcome: historyRecord.fight_results.outcome,
            rounds,
          },
        };
      }
    });

    console.log('fighter history tranformed briefs');
    return briefs;
  }
}

export const fightHistoryApi = new FightHistoryApi();
