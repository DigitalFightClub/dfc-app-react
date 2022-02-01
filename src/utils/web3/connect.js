import ENV_CONFG from '../../config';

const ENV = ENV_CONFG();

export const addMainnet = () => {
  const params = [
    {
      chainId: '0x89',
      chainName: 'Polygon Mainnet',
      nativeCurrency: {
        name: 'MATIC Token',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://polygon-rpc.com/'],
      blockExplorerUrls: ['https://polygonscan.com/'],
    },
  ];

  window.ethereum
    .request({ method: 'wallet_addEthereumChain', params })
    .then(() => console.log('Success'))
    .catch((error) => console.log('Error', error.message));
};

export const addTestnet = () => {
  const params = [
    {
      chainId: '0x13881',
      chainName: 'Polygon Mumbai',
      nativeCurrency: {
        name: 'MATIC Token',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    },
  ];

  window.ethereum
    .request({ method: 'wallet_addEthereumChain', params })
    .then(() => console.log('Success'))
    .catch((error) => console.log('Error', error.message));
};

export const isRightNetwork = (chainId) => {
  if (ENV.TARGET_NET === chainId) {
    // setActivateError('')
    return true;
  }
  //setActivateError('Wrong Network!')
  return false;
};

export const addNetwork = () => {
  switch (ENV.TARGET_NET) {
    case ENV.MAINNET:
      console.log('attempting to add mainnet');
      addMainnet();
      break;
    default:
      console.log('attempting to add testnet');
      addTestnet();
      break;
  }
};

export const verifyNetwork = (chainId) => {
  if (chainId != undefined || !isRightNetwork(chainId)) {
    // alert('Connect MetaMask to the Polygon mainnet network!')
    addNetwork();
    //setActivateError('Wrong Network! Switch to Polygon!');
    return false;
  }
  return true;
};
