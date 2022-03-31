import Web3Api from 'moralis/types/generated/web3Api';
import { AccountNFTResult, FighterInfo, MoralisNFT } from '../../types';
import { getNFTs, transformFighterMetadata } from '../../utils/web3/moralis';

class GymApi {
  public constructor() {
    this.getGymFighterNFTs = this.getGymFighterNFTs.bind(this);
    this.transformFighterMetadata = this.transformFighterMetadata.bind(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getGymFighterNFTs(web3Api: Web3Api, address: string): Promise<AccountNFTResult> {
    return getNFTs(web3Api, address);
  }

  public async transformFighterMetadata(fighterNFTs: MoralisNFT[], address: string): Promise<FighterInfo[]> {
    console.log('gym api transform', fighterNFTs, address);
    return transformFighterMetadata(fighterNFTs, address);
  }
}

export const gymApi = new GymApi();
