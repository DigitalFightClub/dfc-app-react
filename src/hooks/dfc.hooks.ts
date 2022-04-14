import axios, { AxiosResponse } from 'axios';
import Moralis from 'moralis/types';
import { useMoralis } from 'react-moralis';
import { useQuery } from 'react-query';
import { nftABI } from '../abi/dfcNft';
import { fetchJsonMetaData } from '../api/dfc.api';
import { ENV_CONFG } from '../config';
import { FighterNFT } from '../types';

const ENV = ENV_CONFG();

const getTotalDFCSupply = async (Moralis: Moralis): Promise<number> => {
  const ethers = Moralis.web3Library;
  const web3Provider = await Moralis.enableWeb3();
  const DFC_CONTRACT = new ethers.Contract(ENV.NFT_CONTRACT_ADDRESS, nftABI, web3Provider);

  const totalSupply: string = await DFC_CONTRACT.totalSupply();

  return parseInt(totalSupply);
};

const getDFCFighters = async (totalSupply: number): Promise<FighterNFT[]> => {
  const promises: Promise<FighterNFT>[] = [];
  for (let i = 1; i <= totalSupply; i++) {
    const metadataPromise: Promise<FighterNFT> = fetchJsonMetaData(`${ENV.FIGHTER_METADATA_URL}/${i}`);
    promises.push(metadataPromise);
  }

  // wait for all requests to return and collect results
  const metadataList: FighterNFT[] = [];
  await Promise.allSettled(promises).then((results) => {
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        metadataList.push((result as PromiseFulfilledResult<FighterNFT>).value);
      }
    });
  });
  // console.log('DFC figher metadata results', metadataList);
  return metadataList;
};

export function useTotalDFCSupply() {
  const { Moralis: Moralis } = useMoralis();
  return useQuery(['dfc', 'totalSupply'], () => getTotalDFCSupply(Moralis));
}

export function useDFCFighters() {
  const { data: totalSupply } = useTotalDFCSupply();
  return useQuery(['dfc', 'fighters'], () => getDFCFighters(totalSupply ? totalSupply : 0), {
    enabled: !!totalSupply,
  });
}
