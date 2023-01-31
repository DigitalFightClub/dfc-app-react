import { useEthers } from '@usedapp/core';
import { useQuery } from 'react-query';
import { ENV_CONFG } from '../config';
import { BigNumber, ethers } from 'ethers';
import { TKO_ABI } from '../utils/web3/tko-abi';

const ENV = ENV_CONFG();

const getTKOBalance = async (address: string | undefined) => {
  const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
  if (provider && address) {
    // Create a new instance of the contract using the ABI and address
    const contract = new ethers.Contract(ENV.TKO_CONTRACT_ADDRESS, TKO_ABI, provider);

    // Call the balanceOf function
    try {
      console.log('Call tko');
      const balance: BigNumber = await contract.balanceOf(address);
      console.log('Call tko result: ', balance);

      // format from Wei to decimal string
      const tko: number = +ethers.utils.formatEther(balance);
      return tko;
    } catch (error: any) {
      console.error(`Failed fetching TKO balance for address ${address}: ${error.message}`);
    }
  }
};

export function useTKOBalance() {
  const { account: walletAddress, active } = useEthers();
  return useQuery(['tko', walletAddress], () => getTKOBalance(walletAddress), {
    enabled: !!active && !!walletAddress,
  });
}
