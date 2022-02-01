/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useMoralisWeb3Api, useMoralisWeb3ApiCall, useMoralis, useNFTBalances } from 'react-moralis';
import { Contract } from 'ethers';
import { nftABI} from '../../abi/dfcNft';
import ENV_CONFG from '../../config';


const ENV = ENV_CONFG();

export const getNFTContract = (provider) => {
  const nftContract = new Contract(ENV.NFT_CONTRACT_ADDRESS, nftABI, provider);
  return nftContract;
};

export const getNFTs = async (address) => {
  //const { authenticate, isAuthenticated, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const options = { chain: 'matic', address: address };
  const polygonNFTs = await Web3Api.account.getNFTs(options);
  console.log(polygonNFTs);
  return polygonNFTs;
};