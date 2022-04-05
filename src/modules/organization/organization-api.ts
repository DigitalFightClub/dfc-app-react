/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse } from 'axios';
import { getDFCNFTs, transformFighterMetadata } from '../../utils/web3/moralis';
import { ChallengeState, FighterInfo, FighterNFT, OrganizationInfo, TokenNFTResult } from '../../types';
import { ENV_CONFG } from './../../config';
import Moralis from 'moralis/types';

const ENV = ENV_CONFG();

class OrganizationApi {
  public constructor() {
    this.getFighterInfo = this.getFighterInfo.bind(this);
    this.challengeFighter = this.challengeFighter.bind(this);
    this.getOrgFighters = this.getOrgFighters.bind(this);
    this.fetchJsonMetaData = this.fetchJsonMetaData.bind(this);
    this.transformFighterMetadata = this.transformFighterMetadata.bind(this);
  }

  public async challengeFighter(
    nftId: number,
    opponentId: number,
    fightingStyle: number,
    Moralis: Moralis
  ): Promise<{ status: number; message: string }> {
    console.log('OrganizationApi challengeFighter called');

    const web3Provider = await Moralis.enableWeb3();
    const signer = web3Provider.getSigner();
    const msg = `nft_id: ${nftId}\nfighting_style: ${fightingStyle}\nopponent_id: ${opponentId}`;
    const sig = await signer.signMessage(msg);
    console.log('Challenge sig', sig);
    if (sig) {
      // console.log('appendJsonMetaData uri', nft.token_uri);
      const signerAddress: string = await signer.getAddress();
      const response: AxiosResponse<string> = await axios.post(`${ENV.FIGHTER_API_URL}/challenges`, {
        nftId,
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
        return { status: response.status, message: response.data };
      }
    } else {
      console.log('signature was cancelled or failed');
    }
    return { status: 500, message: 'Something went wrong...' };
  }

  public async getOrgInfo(orgId: number): Promise<OrganizationInfo> {
    console.log('OrganizationApi getOrgInfo called');
    return {
      orgIcon: '/assets/red-dragon-gym.svg',
      orgName: 'RED DRAGON',
      orgCategory: 'Middleweight Category',
    };
  }

  public async getOrgFighters(
    web3Api: any,
    limit: number,
    offset: number,
    address: string,
    nftId: number
  ): Promise<FighterInfo[]> {
    const result: TokenNFTResult = await getDFCNFTs(web3Api, limit, offset, address, nftId);
    return result.result;
  }

  public async getFighterInfo(fighterData: FighterInfo): Promise<FighterInfo> {
    return {
      ...fighterData,
      isOwned: false,
      challengeState: ChallengeState.AVAILABLE,
    };
  }

  private async transformFighterMetadata(fighterNFTs: FighterNFT[], address: string): Promise<FighterInfo[]> {
    return transformFighterMetadata(fighterNFTs, address);
  }

  private async fetchJsonMetaData(uri: string) {
    try {
      const response = await axios.get(uri);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export const organizationApi = new OrganizationApi();
