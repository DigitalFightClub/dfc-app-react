/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse } from 'axios';
import { ENV_CONFG } from '../../config';
import { TKO_ABI } from './tko-abi.js';
import { AccountNFTResult, Challenge, ChallengeState, FighterInfo, MoralisNFT, TokenNFTResult } from '../../types';
import Moralis from 'moralis/types';
import countryMap from '../helpers/country-lookup';

const ENV = ENV_CONFG();

export const getNFTs = async (Web3Api: any, address: string): Promise<AccountNFTResult> => {
  const polygonNFTs: AccountNFTResult = await getUserDFCNFTs(Web3Api, address);
  console.log(polygonNFTs);

  if (polygonNFTs.total === 0) {
    console.log('Current wallet holds 0 DFC Fighters!');
    // eslint-disable-next-line quotes
    console.log("Loading DFC Team's Fighters!");
    alert('You have no fighters, loading defaults...');
    return getNFTs(Web3Api, ENV.MULTI_SIG);
  }

  const sortedFlaggedNFTs: MoralisNFT[] = await fillMissingMetadata(polygonNFTs.result);
  return { ...polygonNFTs, result: [...sortedFlaggedNFTs] };
};

export const getTKOBalance = async (Moralis: Moralis, address: string): Promise<string> => {
  const ethers = Moralis.web3Library;
  const web3Provider = await Moralis.enableWeb3();
  const TKO_ADDRESS: string = ENV.TKO_CONTRACT_ADDRESS;
  const TKO_CONTRACT = new ethers.Contract(TKO_ADDRESS, TKO_ABI, web3Provider);

  const balance: string = await TKO_CONTRACT.balanceOf(address ? address : ENV.MULTI_SIG);
  // console.log(balance);
  return balance;
};

export const signMessage = async (Moralis: Moralis, message: string): Promise<string> => {
  const web3Provider = await Moralis.enableWeb3();
  const signer = web3Provider.getSigner();
  const rawSignature: string = await signer.signMessage(message);
  return rawSignature;
};

export const getDFCNFTs = async (
  Web3Api: any,
  limit: number,
  offset: number,
  address: string,
  fighterId: number
): Promise<TokenNFTResult> => {
  // Fetch a minted NFTs from DFC token contract through Moralis to find total supply
  const options = { address: ENV.NFT_CONTRACT_ADDRESS, chain: ENV.NET_NAME, limit: 1 };
  const NFTs: TokenNFTResult = await Web3Api.token.getAllTokenIds(options);
  console.log(`Fetched DFT total supply ${NFTs.total}`, JSON.stringify(NFTs));

  // Get paged metadata
  const pagedFighters: FighterInfo[] = await getMetadataByPage(NFTs.total, limit, offset, address);

  // Fetch user DFC NFT IDs
  const polygonNFTs: AccountNFTResult = await getUserDFCNFTs(Web3Api, address);
  const userNFTIDs = polygonNFTs.result.map((nft: MoralisNFT) => parseInt(nft.token_id));
  console.log('user DFC nFT IDs', userNFTIDs);

  // Get fighter challenges
  const challengeList: Challenge[] = await getFighterChallenges(fighterId);
  let challengers: number[] | null = null;
  let challenges: number[] | null = null;
  if (challengeList && challengeList.length > 0) {
    challengers = challengeList.map((challenge: Challenge): number =>
      fighterId === challenge.opponentId ? challenge.nftId : 0
    );

    challenges = challengeList.map((challenge: Challenge): number =>
      fighterId === challenge.nftId ? challenge.opponentId : 0
    );
  }

  // Flag user NFTs
  const flaggedNFTs: FighterInfo[] = pagedFighters.map((fighter: FighterInfo): FighterInfo => {
    // checked if fighter is owned by current user
    if (userNFTIDs.includes(fighter.fighterId)) {
      fighter.isOwned = true;
    }

    // check if fighter is a challenger
    if (challengers && challengers.includes(fighter.fighterId)) {
      fighter.challengeState = ChallengeState.CHALLENGING;
    }

    // check if fighter is being challenged
    if (challenges && challenges.includes(fighter.fighterId)) {
      fighter.challengeState = ChallengeState.CHALLENGED;
    }

    return fighter;
  });

  const sortedFlaggedNFTs: FighterInfo[] = flaggedNFTs.sort((a: FighterInfo, b: FighterInfo) => {
    return a.fighterId > b.fighterId ? 1 : -1;
  });
  console.log('org fighter paged list', sortedFlaggedNFTs);
  return { ...NFTs, result: [...sortedFlaggedNFTs] };
};

const getMetadataByPage = async (
  total: number,
  limit: number,
  offset: number,
  address: string
): Promise<FighterInfo[]> => {
  // loop to create promises to fetch NFT metadata
  const promises: Promise<FighterInfo | null>[] = [];
  let currentNFT: number = offset + 1;
  for (let i = 0; i < limit && currentNFT <= total; i++, currentNFT++) {
    const metadataPromise: Promise<FighterInfo | null> = fetchJsonMetaData(`${ENV.FIGHTER_METADATA_URL}/${currentNFT}`);
    promises.push(metadataPromise);
  }

  // wait for all requests to return and collect results
  const metadataList: any[] = [];
  await Promise.allSettled(promises).then((results) => {
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        metadataList.push({ metadata: (result as PromiseFulfilledResult<FighterInfo>).value });
      }
    });
  });
  console.log('Paged figher metadata results', metadataList);

  // refine the fighter metadata
  const fighters: FighterInfo[] = transformFighterMetadata(metadataList, address);
  // console.log('Paged fighers refined', fighters);

  return fighters;
};

const fillMissingMetadata = async (NFTs: MoralisNFT[]): Promise<MoralisNFT[]> => {
  console.log('fillMissingMetadta', JSON.stringify(NFTs));

  // fetch missing metadata
  const filledNFTs: MoralisNFT[] = [];
  const promises: Promise<MoralisNFT>[] = [];
  NFTs.forEach((nft: MoralisNFT) => {
    promises.push(appendJsonMetaData(nft));
  });

  // wait for metadata to complete and add to filledResults array
  await Promise.allSettled(promises).then((results) => {
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        filledNFTs.push((result as PromiseFulfilledResult<MoralisNFT>).value);
      }
    });
  });
  // console.log('filled figher metadata results', filledNFTs);

  // sort NFTs
  let sortedFlaggedNFTs: MoralisNFT[] = [];
  sortedFlaggedNFTs = filledNFTs.sort((a: MoralisNFT, b: MoralisNFT) => {
    return parseInt(a.token_id) > parseInt(b.token_id) ? 1 : -1;
  });

  // console.log('NFTs filled and sorted', sortedFlaggedNFTs);

  return sortedFlaggedNFTs;
};

const getUserDFCNFTs = async (Web3Api: any, address: string): Promise<AccountNFTResult> => {
  if (!address) {
    console.log('Wallet not connected!');
  }
  const options = {
    chain: ENV.NET_NAME,
    address: address,
    token_address: ENV.NFT_CONTRACT_ADDRESS,
  };
  const polygonNFTs: AccountNFTResult = await Web3Api.account.getNFTsForContract(options);
  return polygonNFTs;
};

const appendJsonMetaData = async (nft: MoralisNFT): Promise<MoralisNFT> => {
  try {
    // console.log('appendJsonMetaData uri', nft.token_uri);
    const response: AxiosResponse = await axios.get(nft.token_uri);
    // console.log('appendJsonMetaData response.data', response.data);
    return { ...nft, metadata: response.data };
  } catch (error) {
    console.error(error);
  }
  return nft;
};

export const fetchJsonMetaData = async (uri: string): Promise<FighterInfo | null> => {
  try {
    // console.log('appendJsonMetaData uri', nft.token_uri);
    const response: AxiosResponse = await axios.get(uri);
    // console.log('appendJsonMetaData response.data', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

const getFighterChallenges = async (nftId: number): Promise<Challenge[]> => {
  try {
    // console.log('appendJsonMetaData uri', nft.token_uri);
    const response: AxiosResponse = await axios.get(`${ENV.FIGHTER_API_URL}/challenges`, { params: { nftId } });
    // console.log('appendJsonMetaData response.data', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const transformFighterMetadata = (fighters: any[], address: string): any => {
  try {
    console.log('Transforming fighter', fighters, address);
    const refinedFighters: FighterInfo[] = fighters.map((fighter: any) => {
      const refinedFighter: any = {};

      console.log(fighter.name);
      refinedFighter.fighterId = parseInt(fighter.metadata.image.split('/')[4].split('.')[0]);
      refinedFighter.name = fighter.metadata.name;
      refinedFighter.image = fighter.metadata.image;

      refinedFighter.wins = '0';
      refinedFighter.loses = '0';
      refinedFighter.status = fighter.metadata.attributes[0].value;
      refinedFighter.recruited = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(parseInt(fighter.metadata.attributes[2].value) * 1000);
      refinedFighter.gender = fighter.metadata.attributes[16].value;
      refinedFighter.height = fighter.metadata.attributes[17].value;
      refinedFighter.country = fighter.metadata.attributes[18].value;
      refinedFighter.countryCode = countryMap.get(refinedFighter.country);
      refinedFighter.weight = fighter.metadata.attributes[22].value;

      refinedFighter.stats = {};
      refinedFighter.stats.power = parseInt(fighter.metadata.attributes[19].value);
      refinedFighter.stats.speed = parseInt(fighter.metadata.attributes[20].value);
      refinedFighter.stats.strength = parseInt(fighter.metadata.attributes[21].value);

      refinedFighter.stats.balance = parseInt(fighter.metadata.attributes[11].value);
      refinedFighter.stats.conditioning = parseInt(fighter.metadata.attributes[12].value);
      refinedFighter.stats.flexibility = parseInt(fighter.metadata.attributes[13].value);
      refinedFighter.stats.reflex = parseInt(fighter.metadata.attributes[14].value);
      refinedFighter.stats.footwork = parseInt(fighter.metadata.attributes[15].value);

      refinedFighter.stats.bjj = parseInt(fighter.metadata.attributes[3].value);
      refinedFighter.stats.judo = parseInt(fighter.metadata.attributes[4].value);
      refinedFighter.stats.karate = parseInt(fighter.metadata.attributes[5].value);
      refinedFighter.stats.kickboxing = parseInt(fighter.metadata.attributes[6].value);
      refinedFighter.stats.mauyThai = parseInt(fighter.metadata.attributes[7].value);
      refinedFighter.stats.sambo = parseInt(fighter.metadata.attributes[8].value);
      refinedFighter.stats.taekwondo = parseInt(fighter.metadata.attributes[9].value);
      refinedFighter.stats.wrestling = parseInt(fighter.metadata.attributes[10].value);
      console.log('isOwned transform', address, fighter);
      if (fighter.owner_of) {
        refinedFighter.isOwned = address.toLowerCase() === fighter.owner_of.toLowerCase();
      } else {
        refinedFighter.isOwned = false;
      }
      refinedFighter.challengeState = ChallengeState.AVAILABLE;
      return refinedFighter;
    });
    // console.log(refinedFighters);
    return refinedFighters;
  }
  catch (error) {
    console.error(error);
  }
  return null;
};
