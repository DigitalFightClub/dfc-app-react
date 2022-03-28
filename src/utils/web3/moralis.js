/* eslint-disable @typescript-eslint/no-unused-vars */
import { Contract } from 'ethers';
import axios from 'axios';
import { nftABI } from '../../abi/dfcNft';
import { ENV_CONFG } from '../../config';
import { TKO_ABI } from './tko-abi.js';
import { countryMap } from '../helpers/country-lookup';

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

export const getDFCNFTs = async (Web3Api, limit, offset, address) => {
  // Fetch batch of minted NFTs from DFC token contract
  const options = { address: ENV.NFT_CONTRACT_ADDRESS, chain: ENV.NET_NAME, limit, offset };
  const NFTs = await Web3Api.token.getAllTokenIds(options);
  console.log(`Fetched DFT total supply ${NFTs.total}`, JSON.stringify(NFTs));

  // Fetch user DFC NFT IDs
  const polygonNFTs = await getUserDFCNFTs(Web3Api, address);
  const userNFTIDs = polygonNFTs.result.map((nft) => nft.token_id);
  console.log('user DFC nFT IDs', userNFTIDs);

  // Flag user NFTs
  const flaggedNFTs = NFTs.result.map((nft) => {
    if (userNFTIDs.includes(nft.token_id)) {
      return { ...nft, owner_of: address };
    }
    return nft;
  });

  const sortedFlaggedNFTs = await fillMissingMetadata(flaggedNFTs, false);
  return { ...NFTs, result: [...sortedFlaggedNFTs] };
};

const fillMissingMetadata = async (NFTs, asc=true) => {
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
  if (asc) {
    sortedFlaggedNFTs = filledNFTs.sort((a, b) => {
      return parseInt(a.token_id) > parseInt(b.token_id) ? 1 : -1;
    });
  } else {
    sortedFlaggedNFTs = filledNFTs.sort((a, b) => {
      return parseInt(b.token_id) > parseInt(a.token_id) ? 1 : -1;
    });
  }

  console.log('NFTs filled and sorted', sortedFlaggedNFTs);

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
    const response = await axios.get(nft.token_uri);
    console.log('appendJsonMetaData response.data', response.data);
    return { ...nft, metadata: response.data };
  } catch (error) {
    console.error(error);
  }
};

export const transformFighterMetadata = (fighters, address) => {
  console.log('Transforming fighter', fighters, address);
  const refinedFighters = fighters.map((fighter) => {
    const refinedFighter = {};

    // console.log(fighter.name);
    refinedFighter.fighterId = fighter.token_id;
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
    refinedFighter.isOwned = fighter.owner_of ? address.toLowerCase() === fighter.owner_of.toLowerCase() : false;
    refinedFighter.challengeState = 0;
    return refinedFighter;
  });
  // console.log(refinedFighters);
  return refinedFighters;
};
