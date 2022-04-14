/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import { ENV_CONFG } from '../../config';
import { AccountNFTResult, ChallengeState, FighterInfo, FightRecordResponse, MoralisNFT } from '../../types';
import { getNFTs, transformFighterMetadata } from '../../utils/web3/moralis';
import Moralis from 'moralis/types';

const ENV = ENV_CONFG();

class GymApi {
  public constructor() {
    this.getGymFighterNFTs = this.getGymFighterNFTs.bind(this);
    this.transformFighterMetadata = this.transformFighterMetadata.bind(this);
    this.getFigherChallenged = this.getFigherChallenged.bind(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getGymFighterNFTs(web3Api: Moralis.Web3API, address: string | null): Promise<FighterInfo[]> {
    if (null !== address) {
      try {
        const fighterNFTs: AccountNFTResult = await getNFTs(web3Api, address);

        let refinedFighters: FighterInfo[] | null = null;
        if (fighterNFTs && fighterNFTs.total > 0) {
          // create fighter info array
          console.log('transform fighter NFT metadata');
          refinedFighters = await this.transformFighterMetadata(fighterNFTs.result, address);
        }

        // Add challengeState
        const finalFighters: FighterInfo[] = [];
        if (refinedFighters && refinedFighters.length > 0) {
          console.log('Fill fighter challenge state');
          const fighterChallengedPromises: Promise<FighterInfo>[] = refinedFighters.map((fighter) =>
            this.getFigherChallenged(fighter)
          );

          await Promise.allSettled(fighterChallengedPromises).then((results) => {
            results.forEach((result) => {
              if (result.status === 'fulfilled') {
                finalFighters.push((result as PromiseFulfilledResult<FighterInfo>).value);
              }
            });
          });
          console.log('filled with challenge state', finalFighters);
          return finalFighters;
        }
      } catch (error: any) {
        console.error('Failed fetching gym fighters');
        console.error(error);
      }
    }

    return [];
  }

  public async transformFighterMetadata(fighterNFTs: MoralisNFT[], address: string): Promise<FighterInfo[]> {
    console.log('gym api transform', fighterNFTs, address);
    const refinedFighters: FighterInfo[] = transformFighterMetadata(fighterNFTs, address);
    for (let i = 0; i < refinedFighters.length; i++) {
      const fighter: FighterInfo = refinedFighters[i];
      try {
        const response: AxiosResponse<FightRecordResponse> = await axios.get(`${ENV.FIGHTER_API_URL}/fightRecord`, {
          params: {
            nftId: fighter.fighterId,
          },
        });
        fighter.wins = _.get(response, 'data.record.wins', 0);
        fighter.loses = _.get(response, 'data.record.losses', 0);
      } catch (error) {
        console.error('failed filling results data for gym fighter', fighter.fighterId, error);
      }
    }

    return refinedFighters;
  }

  public async getFigherChallenged(fighter: FighterInfo): Promise<FighterInfo> {
    console.log('gym api getfighterChallenges', fighter.fighterId);
    try {
      const response = await axios.get(`${ENV.FIGHTER_API_URL}/challenges`, { params: { nftId: fighter.fighterId } });
      console.log('getFigherChallenged response.data', response.data);

      if (response && response.data && response.data.length > 0) {
        // check if fighter is being challenged
        for (let i = 0; i < response.data.length; i++) {
          const challenge: any = response.data[i];
          if (fighter.fighterId === challenge.opponentId) {
            console.log(`fighter ${fighter.fighterId} is being challenged by ${challenge.nftId}`);
            fighter.challengeState = ChallengeState.CHALLENGED;
            break;
          }
        }
      }

      return fighter;
    } catch (error: any) {
      console.error(error);
    }
    return fighter;
  }
}

export const gymApi = new GymApi();
