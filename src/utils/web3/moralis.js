/* eslint-disable @typescript-eslint/no-unused-vars */
import { Contract } from 'ethers';
import axios from 'axios';
import { nftABI } from '../../abi/dfcNft';
import { ENV_CONFG } from '../../config';
import { TKO_ABI } from './tko-abi.js';
import { countryMap } from '../helpers/country-lookup';
import { ChallengeState } from '../../types';

const ENV = ENV_CONFG();

export const getNFTContract = (provider) => {
  const nftContract = new Contract(ENV.NFT_CONTRACT_ADDRESS, nftABI, provider);
  return nftContract;
};

export const getNFTs = async (Web3Api, address) => {
  const polygonNFTs = await getUserDFCNFTs(Web3Api, address);
  console.log(polygonNFTs);

  if (polygonNFTs.total === 0) {
    console.log('Current wallet holds 0 DFC Fighters!');
    // eslint-disable-next-line quotes
    console.log("Loading DFC Team's Fighters!");
    alert('You have no fighters, loading defaults...');
    return getNFTs(Web3Api, ENV.MULTI_SIG);
  }

  const sortedFlaggedNFTs = await fillMissingMetadata(polygonNFTs.result);
  return { ...polygonNFTs, result: [...sortedFlaggedNFTs] };
};

export const getTKOBalance = async (Moralis, address) => {
  const ethers = Moralis.web3Library;
  const web3Provider = await Moralis.enableWeb3();
  const TKO_ADDRESS = ENV.TKO_CONTRACT_ADDRESS;
  const TKO_CONTRACT = new ethers.Contract(TKO_ADDRESS, TKO_ABI, web3Provider);

  const balance = await TKO_CONTRACT.balanceOf(address ? address : ENV.MULTI_SIG);
  // console.log(balance);
  return balance;
};

export const signMessage = async (Moralis, message) => {
  const web3Provider = await Moralis.enableWeb3();
  const signer = web3Provider.getSigner();
  const rawSignature = await signer.signMessage(message);
  return rawSignature;
};

export const getDFCNFTs = async (Web3Api, limit, offset, address, fighterId) => {
  // Fetch a minted NFTs from DFC token contract through Moralis to find total supply
  const options = { address: ENV.NFT_CONTRACT_ADDRESS, chain: ENV.NET_NAME, limit: 1 };
  const NFTs = await Web3Api.token.getAllTokenIds(options);
  console.log(`Fetched DFT total supply ${NFTs.total}`, JSON.stringify(NFTs));

  // Get paged metadata
  const pagedFighters = await getMetadataByPage(NFTs.total, limit, offset, address);

  // Fetch user DFC NFT IDs
  const polygonNFTs = await getUserDFCNFTs(Web3Api, address);
  const userNFTIDs = polygonNFTs.result.map((nft) => parseInt(nft.token_id));
  console.log('user DFC nFT IDs', userNFTIDs);

  // Get fighter challenges

  //TODO: const challenges = await getFighterChallenges(fighterId);
  const challenges = [
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
  ];
  const opponentIDs = challenges.map((challenge) => challenge.opponentId);

  // Flag user NFTs
  const flaggedNFTs = pagedFighters.map((fighter) => {
    // checked if fighter is owned by current user
    if (userNFTIDs.includes(fighter.fighterId)) {
      fighter.isOwned = true;
    }

    // check if fighter is a challenger
    if (opponentIDs.includes(fighter.fighterId)) {
      fighter.challengeState = ChallengeState.CHALLENGING;
    }

    return fighter;
  });

  const sortedFlaggedNFTs = flaggedNFTs.sort((a, b) => {
    return parseInt(a.fighterId) > parseInt(b.fighterId) ? 1 : -1;
  });
  console.log('org fighter paged list', sortedFlaggedNFTs);
  return { ...NFTs, result: [...sortedFlaggedNFTs] };
};

const getMetadataByPage = async (total, limit, offset, address) => {
  // loop to create promises to fetch NFT metadata
  const promises = [];
  let currentNFT = offset + 1;
  for (let i = 0; i < limit && currentNFT <= total; i++, currentNFT++) {
    const metadataPromise = appendJsonMetaData({ token_uri: `${ENV.FIGHTER_METADATA_URL}/${currentNFT}` });
    promises.push(metadataPromise);
  }

  // wait for all requests to return and collect results
  const metadataList = await Promise.allSettled(promises).then((results) => results.map((result) => result.value));
  // console.log('Paged figher metadata results', metadataList);

  // refine the fighter metadata
  const fighters = transformFighterMetadata(metadataList, address);
  // console.log('Paged fighers refined', fighters);

  return fighters;
};

const fillMissingMetadata = async (NFTs) => {
  console.log('fillMissingMetadta', JSON.stringify(NFTs));

  // fetch missing metadata
  const filledNFTs = [];
  const promises = [];
  NFTs.forEach((nft) => {
    if (nft.metadata) {
      filledNFTs.push({ ...nft, metadata: JSON.parse(nft.metadata) });
    } else {
      promises.push(appendJsonMetaData(nft));
    }
  });

  // wait for metadata to complete and add to filledResults array
  await Promise.allSettled(promises).then((results) => results.forEach((result) => filledNFTs.push(result.value)));

  // sort NFTs
  let sortedFlaggedNFTs = [];
  sortedFlaggedNFTs = filledNFTs.sort((a, b) => {
    return parseInt(a.token_id) > parseInt(b.token_id) ? 1 : -1;
  });

  // console.log('NFTs filled and sorted', sortedFlaggedNFTs);

  return sortedFlaggedNFTs;
};

const getUserDFCNFTs = async (Web3Api, address) => {
  if (!address) {
    console.log('Wallet not connected!');
  }
  const options = {
    chain: ENV.NET_NAME,
    address: address,
    token_address: ENV.NFT_CONTRACT_ADDRESS,
  };
  const polygonNFTs = await Web3Api.account.getNFTsForContract(options);
  return polygonNFTs;
};

const appendJsonMetaData = async (nft) => {
  try {
    // console.log('appendJsonMetaData uri', nft.token_uri);
    const response = await axios.get(nft.token_uri);
    // console.log('appendJsonMetaData response.data', response.data);
    return { ...nft, metadata: response.data };
  } catch (error) {
    console.error(error);
  }
};

const getFighterChallenges = async (nftId) => {
  try {
    // console.log('appendJsonMetaData uri', nft.token_uri);
    const response = await axios.get(`${ENV.FIGHTER_API_URL}/challenges`, { params: { nftId } });
    // console.log('appendJsonMetaData response.data', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const transformFighterMetadata = (fighters, address) => {
  console.log('Transforming fighter', fighters, address);
  const refinedFighters = fighters.map((fighter) => {
    const refinedFighter = {};

    // console.log(fighter.name);
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
    refinedFighter.countryCode = countryMap[refinedFighter.country];
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
};
