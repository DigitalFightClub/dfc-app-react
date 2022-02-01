/* eslint-disable @typescript-eslint/no-unused-vars */
import { Contract } from 'ethers';
import axios from 'axios';
import { nftABI } from '../../abi/dfcNft';
import { ENV_CONFG } from '../../config';
import fighterMetadata1 from './fighterMetaData1.json';
import fighterMetadata2 from './fighterMetaData2.json';
import fighterMetadata3 from './fighterMetaData3.json';

const ENV = ENV_CONFG();

export const getNFTContract = (provider) => {
  const nftContract = new Contract(ENV.NFT_CONTRACT_ADDRESS, nftABI, provider);
  return nftContract;
};

export const getNFTs = async (Web3Api, address) => {
  if (!address) {
    console.log('Wallet not connected!');
  }
  const options = {
    chain: ENV.NET_NAME,
    address: address ? address : ENV.MULTI_SIG,
  };
  const polygonNFTs = await Web3Api.account.getNFTs(options);
  // console.log(polygonNFTs);

  // eslint-disable-next-line max-len
  const filteredNFTs = polygonNFTs.result.filter(
    (nft) => nft.token_address === ENV.NFT_ADDY);
  console.log(filteredNFTs);

  if (filteredNFTs.length == 0) {
    console.log('Current wallet holds 0 DFC Fighters!');
    console.log('Loading DFC Team\'s Fighters!');
    return getNFTs(Web3Api, ENV.MULTI_SIG);
  }

  const sortedFilteredNFTs = filteredNFTs.sort((a, b) => {
    return parseInt(a.token_id) > parseInt(b.token_id) ? 1 : -1;
  });
  // console.log(sortedFilteredNFTs);

  const promises = [];
  let parsedMetadata = sortedFilteredNFTs.map((nft) => {
    if (!nft.metadata) {
      const metadata = fetchJsonMetaData(nft.token_uri);
      promises.push(metadata);
      return null;
    } else {
      return JSON.parse(nft.metadata);
    }
  });

  parsedMetadata = parsedMetadata.filter((nft) => nft != null);

  parsedMetadata = await Promise.allSettled(promises)
    .then((results) => results.forEach((result) => parsedMetadata.push(result.value)))
    .then(() => {
      return parsedMetadata;
    });

  return parsedMetadata;
};

export const getNFTsMetadata = async (nfts) => {
  nfts.forEach((nft) => {
    console.log(nft);
  });
};

const fetchJsonMetaData = async (uri) => {
  try {
    const response = await axios.get(uri);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const testMeta = () => {
  const apiResults = [fighterMetadata1, fighterMetadata2, fighterMetadata3];
  // console.log(apiResults);
  return transformFighterMetadata(apiResults);
};

// const activeFighterData = {
//   name: 'Guy Hawkins',
//   country: 'US',
//   wins: '37',
//   loses: '0',
//   age: '33',                             // skip
//   height: '193cm',
//   weight: '89kg',
//   org: 'Professional Fighting Circuit',  // skip
//   recruited: '19.10.2021',
//   status: 'Active',
//   image: '/assets/neon-fighter.svg',
// };

// attributes: Array(29)
// 0: { trait_type: 'Active/Retired', value: 'Active' }
// 1: { display_type: 'number', trait_type: 'Generation', value: 0, max_value: 100 }
// 2: { display_type: 'date', trait_type: 'Recruited', value: 1638320400 }
// 3: { trait_type: 'BJJ', value: 59, max_value: 100 }
// 4: { trait_type: 'judo', value: 59, max_value: 100 }
// 5: { trait_type: 'karate', value: 48, max_value: 100 }
// 6: { trait_type: 'kickboxing', value: 57, max_value: 100 }
// 7: { trait_type: 'muayThai', value: 41, max_value: 100 }
// 8: { trait_type: 'sambo', value: 33, max_value: 100 }
// 9: { trait_type: 'taekwondo', value: 59, max_value: 100 }
// 10: { trait_type: 'wrestling', value: 44, max_value: 100 }
// 11: { display_type: 'boost_number', trait_type: 'Balance', value: 43, max_value: 100 }
// 12: { display_type: 'boost_number', trait_type: 'Conditioning', value: 72, max_value: 100 }
// 13: { display_type: 'boost_number', trait_type: 'Flexibility', value: 70, max_value: 100 }
// 14: { display_type: 'boost_number', trait_type: 'Reflex', value: 48, max_value: 100 }
// 15: { display_type: 'boost_number', trait_type: 'Footwork', value: 56, max_value: 100 }
// 16: { trait_type: 'Gender', value: 'female' }
// 17: { trait_type: 'Height', value: `5'7"` }
// 18: { trait_type: 'Origin', value: 'France' }
// 19: { display_type: 'boost_number', trait_type: 'Power', value: 57, max_value: 100 }
// 20: { display_type: 'boost_number', trait_type: 'Speed', value: 36, max_value: 100 }
// 21: { display_type: 'boost_number', trait_type: 'Strength', value: 35, max_value: 100 }
// 22: { trait_type: 'Weight', value: '168 lbs' }
// 23: { trait_type: 'Eyes', value: 'Green' }
// 24: { trait_type: 'Shoes', value: 'Lime Sandals' }
// 25: { trait_type: 'Legs', value: 'Yellow Aqua Compression Shorts' }
// 26: { trait_type: 'Chest', value: 'Gold Sports Bra' }
// 27: { trait_type: 'Hair', value: 'Red Shag' }
// 28: { trait_type: 'Gloves', value: 'Yellow Hybrid Gloves' }

export const transformFighterMetadata = (fighters) => {
  const refinedFighters = fighters.map((fighter) => {
    const refinedFighter = {};

    // console.log(fighter.name);
    refinedFighter.name = fighter.name;
    refinedFighter.image = fighter.image;

    refinedFighter.wins = '0';
    refinedFighter.loses = '0';
    refinedFighter.status = fighter.attributes[0].value;
    refinedFighter.recruited = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(parseInt(fighter.attributes[2].value) * 1000);
    refinedFighter.gender = fighter.attributes[16].value;
    refinedFighter.height = fighter.attributes[17].value;
    refinedFighter.country = fighter.attributes[18].value;
    refinedFighter.weight = fighter.attributes[22].value;

    refinedFighter.stats = {};
    refinedFighter.stats.power = fighter.attributes[19].value;
    refinedFighter.stats.speed = fighter.attributes[20].value;
    refinedFighter.stats.strength = fighter.attributes[21].value;

    refinedFighter.stats.balance = fighter.attributes[11].value;
    refinedFighter.stats.conditioning = fighter.attributes[12].value;
    refinedFighter.stats.flexibility = fighter.attributes[13].value;
    refinedFighter.stats.reflex = fighter.attributes[14].value;
    refinedFighter.stats.footwork = fighter.attributes[15].value;

    refinedFighter.stats.bjj = fighter.attributes[3].value;
    refinedFighter.stats.judo = fighter.attributes[4].value;
    refinedFighter.stats.karate = fighter.attributes[5].value;
    refinedFighter.stats.kickboxing = fighter.attributes[6].value;
    refinedFighter.stats.mauiTahi = fighter.attributes[7].value;
    refinedFighter.stats.sambo = fighter.attributes[8].value;
    refinedFighter.stats.taekwondo = fighter.attributes[9].value;
    refinedFighter.stats.wrestling = fighter.attributes[10].value;
    return refinedFighter;
  });
  console.log(refinedFighters);
  return refinedFighters;
};
