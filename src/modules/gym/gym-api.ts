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
      // console.log('appendJsonMetaData uri', nft.token_uri);
      // const response = await axios.get(ENV.FIGHTER_API_URL, { params: { nftId: fighter.fighterId } });
      // console.log('appendJsonMetaData response.data', response.data);

      const response = {
        data: [
          {
            nftId: 2,
            opponentId: 1,
          },
          {
            nftId: 2,
            opponentId: 3,
          },
          {
            nftId: 2,
            opponentId: 4,
          },
        ],
      };

      if (response && response.data && response.data.length > 0) {
        fighter.challengeState = ChallengeState.CHALLENGED;
      }

      return fighter;
    } catch (error: any) {
      console.error(error);
      throw new Error(`${error.message}`);
    }
  }
}

export const gymApi = new GymApi();
