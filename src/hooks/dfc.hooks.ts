import Moralis from 'moralis/types';
import _ from 'lodash';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { useQuery } from 'react-query';
import { nftABI } from '../abi/dfcNft';
import { fetchJsonMetaData } from '../api/dfc.api';
import { ENV_CONFG } from '../config';
import { AccountNFTResult, FighterInfo, FighterNFT, MoralisNFT } from '../types';
import countryMap from '../utils/helpers/country-lookup';

const ENV = ENV_CONFG();

const getTotalDFCSupply = async (Moralis: Moralis): Promise<number> => {
  const ethers = Moralis.web3Library;
  const web3Provider = await Moralis.enableWeb3();
  const DFC_CONTRACT = new ethers.Contract(ENV.NFT_CONTRACT_ADDRESS, nftABI, web3Provider);

  const totalSupply: string = await DFC_CONTRACT.totalSupply();

  return parseInt(totalSupply);
};

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

const getUserDFCNFTs = async (Web3Api: any, address: string | null): Promise<AccountNFTResult> => {
  if (!address) {
    console.log('Wallet not connected!');
  }
  const options = {
    chain: ENV.NET_NAME,
    address: address,
    token_address: ENV.NFT_CONTRACT_ADDRESS,
  };
  const polygonNFTs: AccountNFTResult = await Web3Api.account.getNFTsForContract(options);
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

/**
 * Hooks
 *
 */

export function useTotalDFCSupply() {
  const { isInitialized, Moralis } = useMoralis();
  return useQuery(['dfc', 'totalSupply'], () => getTotalDFCSupply(Moralis), {
    enabled: !!isInitialized,
  });
}

export function useAccountDFCFighters() {
  const { isInitialized, account: walletAddress } = useMoralis();
  const Web3Api: Moralis.Web3API = useMoralisWeb3Api();

  return useQuery(['dfc', walletAddress], () => getUserDFCNFTs(Web3Api, walletAddress), {
    enabled: !!isInitialized && !!walletAddress,
  });
}

export function useAddressDFCFighters(address: string) {
  const { isInitialized } = useMoralis();
  const Web3Api: Moralis.Web3API = useMoralisWeb3Api();

  return useQuery(['dfc', address], () => getUserDFCNFTs(Web3Api, address), {
    enabled: !!isInitialized && !!address,
  });
}

export function useOwnedFighter(fighterId: number) {
  const { isInitialized, account: walletAddress } = useMoralis();
  const Web3Api: Moralis.Web3API = useMoralisWeb3Api();

  return useQuery<AccountNFTResult, Error, boolean>(
    ['dfc', walletAddress],
    () => getUserDFCNFTs(Web3Api, walletAddress),
    {
      enabled: !!isInitialized && !!walletAddress,
      select: (data: AccountNFTResult) => {
        const ownedNFTs: MoralisNFT[] = _.get(data, ['result'], []);
        return (
          _.findIndex(ownedNFTs, ({ token_id: ownedFighterId }) => fighterId === _.parseInt(ownedFighterId, 10)) >= 0
        );
      },
    }
  );
}

export function useDFCFighters(select: any, enabledConstraint: boolean) {
  const { data: totalSupply } = useTotalDFCSupply();
  return useQuery<FighterInfo[], Error, FighterInfo[]>(
    ['dfc', 'fighters'],
    () => getDFCFighters(totalSupply ? totalSupply : 0),
    {
      enabled: !!totalSupply && enabledConstraint,
      staleTime: Infinity,
      select,
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
    }
  );
}
