import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import { useQuery } from 'react-query';
import { ENV_CONFG } from '../config';
import { Challenge, FighterInfo, FightRecord, FightRecordResponse, MoralisNFT } from '../types';
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

export function useFighterRecord(fighterId?: number) {
  return useQuery(['fighter', 'record', fighterId], () => getFighterRecord(fighterId));
}

export function useFighterChallenges(fighterId: number) {
  return useQuery(['fighter', 'challenges', fighterId], () => getFighterChallenges(fighterId));
}

export function useGymFighters() {
  const { data: accountFighters } = useAccountDFCFighters();
  return useDFCFighters((data: FighterInfo[]) =>
    _.filter(data, ({ fighterId }) => {
      const ownedNFTs: MoralisNFT[] = _.get(accountFighters, ['result'], []);
      return (
        _.findIndex(ownedNFTs, ({ token_id: ownedFighterId }) => {
          return fighterId === _.parseInt(ownedFighterId, 10);
        }) >= 0
      );
    }).map((gymFighter) => {
      return { ...gymFighter, isOwned: true };
    })
  );
}

export function useFighter(fighterId: number) {
  return useDFCFighter((data: FighterInfo[]) => data.find((fighter) => fighter.fighterId === fighterId));
}
