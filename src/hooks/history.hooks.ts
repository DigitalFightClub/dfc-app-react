import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import { useQuery, useQueryClient } from 'react-query';
import { ENV_CONFG } from '../config';
import { FightHistoryBrief, MatchResult, Round } from '../types';

const ENV = ENV_CONFG();
const MAX_RETRIES = 12;
const TIMEOUT_INTERVAL = 3;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const createFightHistoryBrief = (historyRecord: any, fighterId: number): FightHistoryBrief | undefined => {
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
};

const getSingleFightHistory = async (
  fighterId: number,
  matchId: string | null
): Promise<FightHistoryBrief | undefined> => {
  try {
    let fightHistory = [];
    let attempt = 0;
    while (fightHistory.length === 0 && attempt < MAX_RETRIES && !!matchId) {
      await delay(TIMEOUT_INTERVAL * 1000);
      console.log('call fighterhistory', fighterId, matchId);
      const response: AxiosResponse<any> = await axios.get(`${ENV.FIGHTER_API_URL}/fightHistory`, {
        params: {
          nftId: fighterId,
          uuid: matchId,
        },
      });
      console.log('single history axios response', response.data);

      // transform results into fighthistorybrief type
      fightHistory = _.get(response, ['data', 'fightHistory'], []);
      attempt++;
    }

    if (fightHistory.length > 0) {
      return createFightHistoryBrief(fightHistory[0], fighterId);
    }
  } catch (error) {
    console.error('Failed request for fighter history', error);
  }
  return undefined;
};

const getFightHistory = async (fighterId: number): Promise<FightHistoryBrief[]> => {
  try {
    console.log('call fighterhistory', fighterId);
    const response: AxiosResponse<any> = await axios.get(`${ENV.FIGHTER_API_URL}/fightHistory`, {
      params: {
        nftId: fighterId,
      },
    });
    console.log('history axios response', response.data);

    // transform results into fighthistorybrief type
    const fightHistory = _.get(response, ['data', 'fightHistory'], []);
    const briefs: FightHistoryBrief[] = fightHistory.map((historyRecord: any) =>
      createFightHistoryBrief(historyRecord, fighterId)
    );

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

export function useFightHistory(fighterId: number) {
  return useQuery<FightHistoryBrief[], Error>(['fighter', 'history', fighterId], () => getFightHistory(fighterId));
}

export function useFightResult(fighterId: number, matchId: string | null) {
  return useQuery<FightHistoryBrief[], Error, FightHistoryBrief | undefined>(
    ['fighter', 'history', fighterId],
    () => getFightHistory(fighterId),
    {
      select: (data: FightHistoryBrief[]) => {
        for (let i = 0; i < data.length; i++) {
          const brief: FightHistoryBrief = data[i];
          if (matchId === brief.matchId) {
            return brief;
          }
        }
        return data[0];
      },
    }
  );
}

export function useSingleFightResult(fighterId: number, matchId: string | null) {
  const queryClient = useQueryClient();

  return useQuery<FightHistoryBrief | undefined, Error>(
    ['fighter', 'history', fighterId, matchId],
    () => getSingleFightHistory(fighterId, matchId),
    {
      onSuccess: () => {
        console.log('INVALIDATE FIGHTER RECORDS');
        return queryClient.invalidateQueries(['fighter', 'record'], {
          refetchActive: true,
          refetchInactive: true,
        });
      },
    }
  );
}
