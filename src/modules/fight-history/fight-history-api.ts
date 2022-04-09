/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import { FighterInfo, FightHistoryBrief, FightRecordResponse, MatchResult, Round } from '../../types';
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
      try {
        const challengerResp: AxiosResponse<FightRecordResponse> = await axios.get(
          `${ENV.FIGHTER_API_URL}/fightRecord`,
          {
            params: {
              nftId: brief.challengerId,
            },
          }
        );
        brief.challengerWins = _.get(challengerResp, 'data.record.wins', 0);
        brief.challengerLoses = _.get(challengerResp, 'data.record.losses', 0);
      } catch (error) {
        console.error('Failed updating challenger historic data', error);
      }

      try {
        const opponentResp: AxiosResponse<FightRecordResponse> = await axios.get(`${ENV.FIGHTER_API_URL}/fightRecord`, {
          params: {
            nftId: brief.opponentId,
          },
        });
        brief.opponentWins = _.get(opponentResp, 'data.record.wins', 0);
        brief.opponentLoses = _.get(opponentResp, 'data.record.losses', 0);
      } catch (error) {
        console.error('Failed updating opponent historic data', error);
      }

      return brief;
    }
    return brief;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getFighterHistory(fighterData: FighterInfo): Promise<FightHistoryBrief[]> {
    try {
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
            challengerId:
              fighterData.fighterId === historyRecord.nftId ? historyRecord.nftId : historyRecord.opponentId,
            challengerName:
              fighterData.fighterId === historyRecord.nftId ? historyRecord.nftName : historyRecord.opponentName,
            challengerStyle:
              fighterData.fighterId === historyRecord.nftId ? historyRecord.nftStyle : historyRecord.opponentStyle,
            challengerImage:
              fighterData.fighterId === historyRecord.nftId
                ? `${ENV.FIGHTER_IMAGE_URL}/${historyRecord.nftId}.png`
                : `${ENV.FIGHTER_IMAGE_URL}/${historyRecord.opponentId}.png`,
            opponentId: fighterData.fighterId === historyRecord.nftId ? historyRecord.opponentId : historyRecord.nftId,
            opponentName:
              fighterData.fighterId === historyRecord.nftId ? historyRecord.opponentName : historyRecord.nftName,
            opponentStyle:
              fighterData.fighterId === historyRecord.nftId ? historyRecord.opponentStyle : historyRecord.nftStyle,
            opponentImage:
              fighterData.fighterId === historyRecord.nftId
                ? `${ENV.FIGHTER_IMAGE_URL}/${historyRecord.opponentId}.png`
                : `${ENV.FIGHTER_IMAGE_URL}/${historyRecord.nftId}.png`,
            winnerId: historyRecord.winnerId,
            matchResult: fighterData.fighterId === historyRecord.winnerId ? MatchResult.WIN : MatchResult.LOSS,
            timestamp: historyRecord.timestamp,
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
    } catch (error) {
      console.error('Failed request for fighter history', error);
    }
    return [];
  }
}

export const fightHistoryApi = new FightHistoryApi();
