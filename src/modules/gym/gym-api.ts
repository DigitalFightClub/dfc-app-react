import Web3Api from 'moralis/types/generated/web3Api';
import { FighterInfo, FighterNFT } from '../../types';
import { getNFTs, transformFighterMetadata } from '../../utils/web3/moralis';

class GymApi {
  public constructor() {
    this.getGymFighterNFTs = this.getGymFighterNFTs.bind(this);
    this.transformFighterMetadata = this.transformFighterMetadata.bind(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getGymFighterNFTs(web3Api: Web3Api, address: string): Promise<FighterNFT[]> {
    return getNFTs(web3Api, address);
  }

  public async transformFighterMetadata(fighterNFTs: FighterNFT[]): Promise<FighterInfo> {
    return transformFighterMetadata(fighterNFTs);
  }
}

export const gymApi = new GymApi();
