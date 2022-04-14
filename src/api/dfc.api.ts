import axios, { AxiosResponse } from 'axios';
import { FighterNFT } from '../types';

export const fetchJsonMetaData = async (uri: string): Promise<FighterNFT> => {
  try {
    // console.log('appendJsonMetaData uri', nft.token_uri);
    const response: AxiosResponse<FighterNFT> = await axios.get(uri);
    // console.log('appendJsonMetaData response.data', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  throw new Error(`Failed fetching fighter metadata: ${uri}`);
};
