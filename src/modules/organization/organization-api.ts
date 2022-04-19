/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse } from 'axios';
import { ENV_CONFG } from './../../config';
import Moralis from 'moralis/types';

const ENV = ENV_CONFG();

class OrganizationApi {
  public constructor() {
    this.challengeFighter = this.challengeFighter.bind(this);
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
}

export const organizationApi = new OrganizationApi();
