import Moralis from 'moralis/types';
import { useMoralis } from 'react-moralis';
import { useQuery } from 'react-query';
import { ENV_CONFG } from '../config';
import { TKO_ABI } from '../utils/web3/tko-abi';

const ENV = ENV_CONFG();

const getTKOBalance = async (Moralis: Moralis, address: string | null): Promise<number> => {
  const ethers = Moralis.web3Library;
  const web3Provider = await Moralis.enableWeb3();
  const TKO_CONTRACT = new ethers.Contract(ENV.TKO_CONTRACT_ADDRESS, TKO_ABI, web3Provider);

  const tko: string = await TKO_CONTRACT.balanceOf(address ? address : ENV.MULTI_SIG);
  const tkoWei: number = +Moralis.Units.FromWei(tko.toString());
  return tkoWei;
};

export function useTKOBalance() {
  const { Moralis, account: walletAddress } = useMoralis();
  return useQuery(['tko', walletAddress], () => getTKOBalance(Moralis, walletAddress));
}
