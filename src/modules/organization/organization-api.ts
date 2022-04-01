import Web3Api from 'moralis/types/generated/web3Api';
import axios from 'axios';
import { getDFCNFTs, transformFighterMetadata } from '../../utils/web3/moralis';
import { ChallengeState, FighterInfo, FighterNFT, OrganizationInfo } from '../../types';
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
      const response = await axios.post(ENV.FIGHTER_API_URL, {
        nftId,
        fightingStyle,
        opponentId,
        signedMessage: {
          address: signer.getAddress(),
          msg,
          sig,
          version: '3',
          signer: 'MEW',
        },
      });
      // console.log('appendJsonMetaData response.data', response.data);
      const message = response && response.data && response.data.message ? response.data.message : '';
      return message;
    } else {
      console.log('signature was cancelled or failed');
    }
    return { status: 500, message: 'Something went wrong...'};
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
    web3Api: Web3Api,
    limit: number,
    offset: number,
    address: string,
    nftId: number
  ): Promise<FighterInfo[]> {
    return await getDFCNFTs(web3Api, limit, offset, address, nftId);
  }

  public async getFighterInfo(fighterData: FighterInfo): Promise<FighterInfo> {
    return {
      ...fighterData,
      isOwned: false,
      challengeState: ChallengeState.AVAILABLE,
    };
  }

  private async transformFighterMetadata(fighterNFTs: FighterNFT[], address: string): Promise<FighterInfo> {
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
