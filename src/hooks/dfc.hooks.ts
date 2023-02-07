import _ from 'lodash';
import { useEthers } from '@usedapp/core';
import { useQuery } from 'react-query';
import { nftABI } from '../abi/dfcNft';
import { fetchJsonMetaData } from '../api/dfc.api';
import { ENV_CONFG } from '../config';
import { AccountNFTResult, FighterInfo, FighterNFT, MoralisNFT } from '../types';
import countryMap from '../utils/helpers/country-lookup';
import { ethers } from 'ethers';

const ENV = ENV_CONFG();

const getDFCFighters = async (totalSupply: number): Promise<FighterInfo[]> => {
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

  const fighters: FighterInfo[] | null = transformFighterMetadata(metadataList);
  return fighters;
};

//TODO: create Lambda function server side
const getUserDFCNFTs = async (address: string | undefined): Promise<AccountNFTResult> => {
  if (!address) {
    console.log('Wallet not connected!');
  }
  const options = {
    chain: ENV.NET_NAME,
    address: address,
    token_address: ENV.NFT_CONTRACT_ADDRESS,
  };

  //TODO: call Lambda which calls Moralis
  const polygonNFTs: AccountNFTResult = {
    cursor: 'null',
    status: 'success',
    page: 1,
    page_size: 100,
    total: 1,
    result: [
      {
        amount: '1',
        block_number: '26398604',
        block_number_minted: '21995587',
        contract_type: 'ERC721',
        metadata: {
          name: 'Bastian Bender',
          image: 'https://mainnet.api.digitalfightclub.io/renderedFighter/2.png',
          attributes: [
            {
              trait_type: 'Active/Retired',
              value: 'Active',
            },
            {
              display_type: 'number',
              trait_type: 'Generation',
              value: 0,
              max_value: 100,
            },
            {
              display_type: 'date',
              trait_type: 'Recruited',
              value: 1638320400,
            },
            {
              trait_type: 'BJJ',
              value: 56,
              max_value: 100,
            },
            {
              trait_type: 'judo',
              value: 63,
              max_value: 100,
            },
            {
              trait_type: 'karate',
              value: 72,
              max_value: 100,
            },
            {
              trait_type: 'kickboxing',
              value: 67,
              max_value: 100,
            },
            {
              trait_type: 'muayThai',
              value: 24,
              max_value: 100,
            },
            {
              trait_type: 'sambo',
              value: 35,
              max_value: 100,
            },
            {
              trait_type: 'taekwondo',
              value: 54,
              max_value: 100,
            },
            {
              trait_type: 'wrestling',
              value: 48,
              max_value: 100,
            },
            {
              display_type: 'boost_number',
              trait_type: 'Balance',
              value: 34,
              max_value: 100,
            },
            {
              display_type: 'boost_number',
              trait_type: 'Conditioning',
              value: 30,
              max_value: 100,
            },
            {
              display_type: 'boost_number',
              trait_type: 'Flexibility',
              value: 52,
              max_value: 100,
            },
            {
              display_type: 'boost_number',
              trait_type: 'Reflex',
              value: 66,
              max_value: 100,
            },
            {
              display_type: 'boost_number',
              trait_type: 'Footwork',
              value: 44,
              max_value: 100,
            },
            {
              trait_type: 'Gender',
              value: 'male',
            },
            {
              trait_type: 'Height',
              value: '5\'6"',
            },
            {
              trait_type: 'Origin',
              value: 'Germany',
            },
            {
              display_type: 'boost_number',
              trait_type: 'Power',
              value: 37,
              max_value: 100,
            },
            {
              display_type: 'boost_number',
              trait_type: 'Speed',
              value: 14,
              max_value: 100,
            },
            {
              display_type: 'boost_number',
              trait_type: 'Strength',
              value: 57,
              max_value: 100,
            },
            {
              trait_type: 'Weight',
              value: '136 lbs',
            },
            {
              trait_type: 'Eyes',
              value: 'Bloodshot',
            },
            {
              trait_type: 'Shoes',
              value: 'Blue Grappling Shoes',
            },
            {
              trait_type: 'Legs',
              value: 'Purple Briefs',
            },
            {
              trait_type: 'Chest',
              value: 'White Gi Top',
            },
            {
              trait_type: 'Hair',
              value: 'Blonde Buzz',
            },
            {
              trait_type: 'Gloves',
              value: 'Yellow Grappling Gloves',
            },
          ],
        },
        name: 'Digital Fight Club',
        owner_of: '0x29baceefd09390347dbdd75f36cb4018f4fbf00a',
        symbol: 'DFC',
        token_address: '0x62ea8080b2fc7dc4c7337920866afd242a1443cb',
        token_id: '2',
        token_uri: 'https://mainnet.api.digitalfightclub.io/metadata/2',
        synced_at: '',
        is_valid: 1,
        syncing: 0,
        frozen: 0,
      },
    ],
  };
  // const polygonNFTs: AccountNFTResult = await Web3Api.account.getNFTsForContract(options);
  console.log('plyNFTs', polygonNFTs);
  return polygonNFTs;
};

const transformFighterMetadata = (fighters: FighterNFT[]): FighterInfo[] => {
  try {
    // console.log('Transforming fighter', fighters);
    const refinedFighters: FighterInfo[] = fighters.map((fighter: FighterNFT) => {
      const refinedFighter: any = {};

      // console.log(fighter.name);
      const fighterImageURI: string = _.get(fighter, ['image'], '');
      refinedFighter.fighterId = parseInt(fighterImageURI ? fighterImageURI.split('/')[4].split('.')[0] : '0');
      refinedFighter.name = fighter.name;
      refinedFighter.image = fighter.image;

      refinedFighter.wins = '0';
      refinedFighter.loses = '0';
      refinedFighter.status = _.get(fighter, ['attributes', '0', 'value']);
      refinedFighter.recruited = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(parseInt(_.get(fighter, ['attributes', '2', 'value'])) * 1000);
      refinedFighter.gender = _.get(fighter, ['attributes', '16', 'value']);
      refinedFighter.height = _.get(fighter, ['attributes', '17', 'value']);
      refinedFighter.country = _.get(fighter, ['attributes', '18', 'value']);
      // console.log(refinedFighter.name, refinedFighter.country);
      refinedFighter.countryCode = countryMap.get(refinedFighter.country);
      refinedFighter.weight = _.get(fighter, ['attributes', '22', 'value']);

      refinedFighter.stats = {};
      refinedFighter.stats.power = parseInt(_.get(fighter, ['attributes', '19', 'value']));
      refinedFighter.stats.speed = parseInt(_.get(fighter, ['attributes', '20', 'value']));
      refinedFighter.stats.strength = parseInt(_.get(fighter, ['attributes', '21', 'value']));

      refinedFighter.stats.balance = parseInt(_.get(fighter, ['attributes', '11', 'value']));
      refinedFighter.stats.conditioning = parseInt(_.get(fighter, ['attributes', '12', 'value']));
      refinedFighter.stats.flexibility = parseInt(_.get(fighter, ['attributes', '13', 'value']));
      refinedFighter.stats.reflex = parseInt(_.get(fighter, ['attributes', '14', 'value']));
      refinedFighter.stats.footwork = parseInt(_.get(fighter, ['attributes', '15', 'value']));

      refinedFighter.stats.bjj = parseInt(_.get(fighter, ['attributes', '3', 'value']));
      refinedFighter.stats.judo = parseInt(_.get(fighter, ['attributes', '4', 'value']));
      refinedFighter.stats.karate = parseInt(_.get(fighter, ['attributes', '5', 'value']));
      refinedFighter.stats.kickboxing = parseInt(_.get(fighter, ['attributes', '6', 'value']));
      refinedFighter.stats.mauyThai = parseInt(_.get(fighter, ['attributes', '7', 'value']));
      refinedFighter.stats.sambo = parseInt(_.get(fighter, ['attributes', '8', 'value']));
      refinedFighter.stats.taekwondo = parseInt(_.get(fighter, ['attributes', '9', 'value']));
      refinedFighter.stats.wrestling = parseInt(_.get(fighter, ['attributes', '10', 'value']));

      // console.log('isOwned transform', fighter);
      return refinedFighter;
    });
    // console.log('Transformed fighters', refinedFighters);
    return refinedFighters;
  } catch (error) {
    console.error(error);
  }
  return [];
};

const getDFCTotalSupply = async () => {
  const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
  console.log(provider);
  if (provider) {
    // Create a new instance of the contract using the ABI and address
    const contract = new ethers.Contract(ENV.NFT_CONTRACT_ADDRESS, nftABI, provider);

    // Call the balanceOf function
    try {
      console.log('Call dfc total supply');
      const totalSupply: string = await contract.totalSupply();
      console.log('Call dfc total supply result: ', totalSupply);

      // format from Wei to decimal string
      return parseInt(totalSupply);
    } catch (error: any) {
      console.error(`Failed fetching DFC total supply: ${error.message}`);
    }
  }
};

/**
 * Hooks
 *
 */

export function useTotalDFCSupply() {
  return useQuery(['dfc', 'totalSupply'], () => getDFCTotalSupply(), {
    retry: 6,
  });
}

export function useAccountDFCFighters() {
  const { account: walletAddress } = useEthers();

  return useQuery(['dfc', walletAddress], () => getUserDFCNFTs(walletAddress), {
    enabled: !!walletAddress,
    retry: 6,
  });
}

export function useAddressDFCFighters(address: string) {
  return useQuery(['dfc', address], () => getUserDFCNFTs(address), {
    enabled: !!address,
    retry: 6,
  });
}

export function useOwnedFighter(fighterId: number) {
  const { account: walletAddress } = useEthers();

  return useQuery<AccountNFTResult, Error, boolean>(['dfc', walletAddress], () => getUserDFCNFTs(walletAddress), {
    enabled: !!walletAddress,
    select: (data: AccountNFTResult) => {
      const ownedNFTs: MoralisNFT[] = _.get(data, ['result'], []);
      return (
        _.findIndex(ownedNFTs, ({ token_id: ownedFighterId }) => fighterId === _.parseInt(ownedFighterId, 10)) >= 0
      );
    },
    retry: 6,
  });
}

export function useDFCFighters(select: any, enabledConstraint: boolean) {
  const { data: totalSupply } = useTotalDFCSupply();
  console.log('useDFCFighters: got total DFC supply', totalSupply);
  return useQuery<FighterInfo[], Error, FighterInfo[]>(
    ['dfc', 'fighters'],
    () => getDFCFighters(totalSupply ? totalSupply : 0),
    {
      enabled: !!totalSupply && enabledConstraint,
      staleTime: Infinity,
      select,
      retry: 6,
    }
  );
}

export function useDFCFighter(select: any) {
  const { data: totalSupply } = useTotalDFCSupply();
  return useQuery<FighterInfo[], Error, FighterInfo>(
    ['dfc', 'fighters'],
    () => getDFCFighters(totalSupply ? totalSupply : 0),
    {
      enabled: !!totalSupply,
      staleTime: Infinity,
      select,
      retry: 6,
    }
  );
}
