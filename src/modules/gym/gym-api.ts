import axios from 'axios';
import Web3Api from 'moralis/types/generated/web3Api';
import { ENV_CONFG } from '../../config';
import { AccountNFTResult, ChallengeState, FighterInfo, MoralisNFT } from '../../types';
import { getNFTs, transformFighterMetadata } from '../../utils/web3/moralis';

const ENV = ENV_CONFG();

class GymApi {
  public constructor() {
    this.getGymFighterNFTs = this.getGymFighterNFTs.bind(this);
    this.transformFighterMetadata = this.transformFighterMetadata.bind(this);
    this.getFigherChallenged = this.getFigherChallenged.bind(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getGymFighterNFTs(web3Api: Web3Api, address: string): Promise<AccountNFTResult> {
    return getNFTs(web3Api, address);
  }

  public async transformFighterMetadata(fighterNFTs: MoralisNFT[], address: string): Promise<FighterInfo[]> {
    console.log('gym api transform', fighterNFTs, address);
    return transformFighterMetadata(fighterNFTs, address);
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
      throw new Error(`${error.message}`);
    }
  }
}

export const gymApi = new GymApi();
