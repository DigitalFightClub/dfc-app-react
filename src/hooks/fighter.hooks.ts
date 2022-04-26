import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import Moralis from 'moralis/types';
import { useMoralis } from 'react-moralis';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ENV_CONFG } from '../config';
import {
  Challenge,
  ChallengeFighterResponse,
  ChallengeState,
  FighterInfo,
  FightRecord,
  FightRecordResponse,
  MoralisNFT,
} from '../types';
import { useAccountDFCFighters, useDFCFighter, useDFCFighters } from './dfc.hooks';

const ENV = ENV_CONFG();

const getFighterChallenges = async (fighterId?: number): Promise<Challenge[]> => {
  if (fighterId) {
    try {
      // console.log('appendJsonMetaData uri', nft.token_uri);
      const response: AxiosResponse = await axios.get(`${ENV.FIGHTER_API_URL}/challenges`, {
        params: { nftId: fighterId },
      });
      // console.log('appendJsonMetaData response.data', response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  return [];
};

const getFighterRecord = async (fighterId?: number): Promise<FightRecord> => {
  if (fighterId) {
    try {
      const response: AxiosResponse<FightRecordResponse> = await axios.get(`${ENV.FIGHTER_API_URL}/fightRecord`, {
        params: {
          nftId: fighterId,
        },
      });
      return _.get(response, 'data.record');
    } catch (error) {
      console.error('Failed filling results data for gym fighter', fighterId, error);
    }
  }
  return { wins: 0, losses: 0 };
};

const challengeFighter = async (
  fighterId: number,
  opponentId: number,
  fightingStyle: number,
  Moralis: Moralis
): Promise<ChallengeFighterResponse> => {
  const web3Provider = await Moralis.enableWeb3();
  const signer = web3Provider.getSigner();
  const msg = `nft_id: ${fighterId}\nfighting_style: ${fightingStyle}\nopponent_id: ${opponentId}`;
  const sig = await signer.signMessage(msg);
  console.log('Challenge sig', sig);
  if (sig) {
    // console.log('appendJsonMetaData uri', nft.token_uri);
    const signerAddress: string = await signer.getAddress();
    // const response: AxiosResponse<{ message: string; uuid: string }> = await axios.post(
    const response: AxiosResponse<string> = await axios.post(`${ENV.FIGHTER_API_URL}/challenges`, {
      nftId: fighterId,
      fightingStyle,
      opponentId,
      signedMessage: {
        address: signerAddress,
        msg,
        sig,
        version: '3',
        signer: 'MEW',
      },
    });
    console.log('challengeFighter response', response);
    if (response) {
      const uuid: string | null = _.get(response.data.split(' '), [2], null);
      // return { status: response.status, message: response.data.message, matchId: response.data.uuid };
      return { status: response.status, message: response.data, matchId: uuid };
    }
  } else {
    console.log('signature was cancelled or failed');
  }
  return { status: 500, message: 'Something went wrong...', matchId: null };
};

export function useChallengeFighter() {
  const { Moralis } = useMoralis();
  const queryClient = useQueryClient();

  return useMutation<ChallengeFighterResponse, Error, { fighterId: number; opponentId: number; fightingStyle: number }>(
    ({ fighterId, opponentId, fightingStyle }) => challengeFighter(fighterId, opponentId, fightingStyle, Moralis),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries('fighter', {
          refetchInactive: true,
        });
      },
    }
  );
}

export function useFighterRecord(fighterId?: number) {
  return useQuery(['fighter', 'record', fighterId], () => getFighterRecord(fighterId));
}

export function useFighterChallenges(fighterId: number) {
  return useQuery(['fighter', 'challenges', fighterId], () => getFighterChallenges(fighterId));
}

/**
 *
 * @param fighterId - owned fighter ID
 * @param opponentNftId - other fighter ID
 * @returns Challenge state between fighter and the opponent
 */
export function useFighterChallengeState(fighterId: number, opponentNftId: number) {
  const { data: accountFighters } = useAccountDFCFighters();
  return useQuery<Challenge[], Error, ChallengeState>(
    ['fighter', 'challenges', fighterId],
    () => getFighterChallenges(fighterId),
    {
      enabled: !!accountFighters,
      select: (data: Challenge[]) => {
        const ownedNFTs: MoralisNFT[] = _.get(accountFighters, ['result'], []);
        if (
          _.findIndex(ownedNFTs, ({ token_id: ownedFighterId }) => opponentNftId === _.parseInt(ownedFighterId, 10)) >=
          0
        ) {
          // opponent is owned by the user
          return ChallengeState.UNAVAILABLE;
        }

        if (data) {
          // opponent is being challenged
          if (_.findIndex(data, ({ opponentId }) => opponentNftId === opponentId) >= 0) {
            return ChallengeState.CHALLENGED;
          }

          // opponent is challenging
          if (_.findIndex(data, ({ nftId }) => opponentNftId === nftId) >= 0) {
            return ChallengeState.CHALLENGING;
          }
        }
        return ChallengeState.AVAILABLE;
      },
    }
  );
}

/**
 *
 * @param fighterId - owned fighter ID
 * @returns true if the fighter is being challenged
 */
export function useFighterChallenged(fighterId: number) {
  return useQuery<Challenge[], Error, boolean>(
    ['fighter', 'challenges', fighterId],
    () => getFighterChallenges(fighterId),
    {
      select: (data: Challenge[]) => {
        if (data) {
          return _.findIndex(data, ({ opponentId }) => fighterId === opponentId) >= 0;
        }
        return false;
      },
    }
  );
}

export function useGymFighters() {
  const { data: accountFighters } = useAccountDFCFighters();
  return useDFCFighters(
    (data: FighterInfo[]) =>
      _.filter(data, ({ fighterId }) => {
        const ownedNFTs: MoralisNFT[] = _.get(accountFighters, ['result'], []);
        return (
          _.findIndex(ownedNFTs, ({ token_id: ownedFighterId }) => {
            return fighterId === _.parseInt(ownedFighterId, 10);
          }) >= 0
        );
      }).map((gymFighter) => {
        return { ...gymFighter, isOwned: true };
      }),
    !!accountFighters
  );
}

export function useFighter(fighterId: number) {
  return useDFCFighter((data: FighterInfo[]) => data.find((fighter) => fighter.fighterId === fighterId));
}
