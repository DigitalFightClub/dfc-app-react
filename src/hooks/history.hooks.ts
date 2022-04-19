import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { ENV_CONFG } from '../config';
import { FightHistoryBrief, MatchResult, Round } from '../types';

const ENV = ENV_CONFG();

const getFightHistory = async (fighterId: number): Promise<FightHistoryBrief[]> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`${ENV.FIGHTER_API_URL}/fightHistory`, {
      params: {
        nftId: fighterId,
      },
    });
    // console.log('history axios response', response.data);

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
              challengerScore: fighterId === historyRecord.nftId ? round.fighterOneScore : round.fighterTwoScore,
              opponentScore: fighterId === historyRecord.nftId ? round.fighterTwoScore : round.fighterOneScore,
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
          challengerId: fighterId === historyRecord.nftId ? historyRecord.nftId : historyRecord.opponentId,
          challengerName: fighterId === historyRecord.nftId ? historyRecord.nftName : historyRecord.opponentName,
          challengerStyle: fighterId === historyRecord.nftId ? historyRecord.nftStyle : historyRecord.opponentStyle,
          challengerImage:
            fighterId === historyRecord.nftId
              ? `${ENV.FIGHTER_IMAGE_URL}/${historyRecord.nftId}.png`
              : `${ENV.FIGHTER_IMAGE_URL}/${historyRecord.opponentId}.png`,
          opponentId: fighterId === historyRecord.nftId ? historyRecord.opponentId : historyRecord.nftId,
          opponentName: fighterId === historyRecord.nftId ? historyRecord.opponentName : historyRecord.nftName,
          opponentStyle: fighterId === historyRecord.nftId ? historyRecord.opponentStyle : historyRecord.nftStyle,
          opponentImage:
            fighterId === historyRecord.nftId
              ? `${ENV.FIGHTER_IMAGE_URL}/${historyRecord.opponentId}.png`
              : `${ENV.FIGHTER_IMAGE_URL}/${historyRecord.nftId}.png`,
          winnerId: historyRecord.winnerId,
          matchResult: fighterId === historyRecord.winnerId ? MatchResult.WIN : MatchResult.LOSS,
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

    // Sort history Desc order
    const orderedHistory: FightHistoryBrief[] = briefs.sort((a: FightHistoryBrief, b: FightHistoryBrief) => {
      return b.timestamp > a.timestamp ? 1 : -1;
    });

    // console.log('fighter history tranformed briefs', orderedHistory);
    return orderedHistory;
  } catch (error) {
    console.error('Failed request for fighter history', error);
  }
  return [];
};

export function useFightHistory(fighterId: number, options?: any) {
  return useQuery(['history', 'fighter', fighterId], () => getFightHistory(fighterId), options);
}
