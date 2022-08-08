import { Polygon, Mumbai } from '@usedapp/core';
import { ethers } from 'ethers';

// Set net target here
export const MAINNET = Polygon;
export const TESTNET = Mumbai;
// export const TARGET_NET = MAINNET
export const TARGET_NET = TESTNET;

// Defaults
export const PRICE = ethers.BigNumber.from('0050000000000000000'); //mainnet

const POLYGON_URL = 'https://polygonscan.com/token/0x62ea8080b2fc7dc4c7337920866afd242a1443cb';

// Loading Messages
export const FIRST_MSG = '📝Awaiting User to Sign MetaTx via MetaMask...';
export const SECOND_MSG = '🔃Submitting Signed MetaTx for Processing...(1/3)';
export const THIRD_MSG = '⛓Awaiting MetaTx to Process...(2/3)';
export const FOURTH_MSG = '⛓Awaiting Mint to Process...(3/3)';
// eslint-disable-next-line max-len
export const FINAL_MSG: string = '🚀Minting Complete. Drumroll...🥁 \n' 
  + 'Check your Gym, OpenSea.io, or Polygonscan.com'; 
  // + `<a href='${POLYGON_URL}'>Polygonscan.com</a>`;

// ABI Fragments
const NFT_TRANSFER_ABI = ['event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'];
const WETH_TRANSFER_ABI = ['event Transfer(address indexed from, address indexed to, uint256 value)'];

const DEFAULT_OBJ = {
  MULTI_SIG: '0x514477244dBE49632930155c405af3B4b7987bA8',
  FIRST_MSG: FIRST_MSG,
  SECOND_MSG: SECOND_MSG,
  THIRD_MSG: THIRD_MSG,
  FOURTH_MSG: FOURTH_MSG,
  FINAL_MSG: FINAL_MSG,
  NFT_TRANSFER_ABI: NFT_TRANSFER_ABI,
  WETH_TRANSFER_ABI: WETH_TRANSFER_ABI,
  INFURA_KEY: '454b1c54f86d4974b60feec0c680c133',
  POLYGON_URL: POLYGON_URL
};

// Mainnet
const FIGHTER_IMAGE_URL = 'https://mainnet.api.digitalfightclub.io/renderedFighter';
const FIGHTER_METADATA_URL = 'https://mainnet.api.digitalfightclub.io/metadata';
const FIGHTER_API_URL = 'https://api.digitalfightclub.io';
const WEBOOK_AUTOTASK_PRIMARY = 'https://api.defender.openzeppelin.com/autotasks/67dd7562-5c5f-4c31-a9cf-540d32504cf7/runs/webhook/4ac4f7c4-950e-4a12-85c4-256d007a905d/CwECvKZEyZFXkaKS6G1WUu';

const WETH = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';
const WETH_RECEIVER = '0x514477244dBE49632930155c405af3B4b7987bA8';
const NFT_CONTRACT_ADDRESS = '0x62Ea8080B2fc7dc4C7337920866AFd242a1443cB';
const TKO_CONTRACT_ADDRESS = '0x7A4CAb02fC6Ab5882f791F46f1a6E34E9837c70F';

export const MINTER_ADDRESS_00 = '0x0699e0f441f520956a5dead1621370c8bf518955';

export const RELAYER_ADDRESS_00 = '0x306a0b7c51034ad1b97be28845d593b804e52a9c';

// export const MINT_EVENTS_DISCORD_WH =
// export const WETH_EVENT_DISCORD_WH =

const MAINNET_OBJ = {
  ...DEFAULT_OBJ,
  WETH: WETH,
  WETH_RECEIVER: WETH_RECEIVER,
  NFT_CONTRACT_ADDRESS: NFT_CONTRACT_ADDRESS,
  TKO_CONTRACT_ADDRESS: TKO_CONTRACT_ADDRESS,
  'WEBOOK_AUTOTASK_PRIMARY': WEBOOK_AUTOTASK_PRIMARY,
  MORALIS_URL: 'https://61llnzpusajk.usemoralis.com:2053/server',
  MORALIS_APP_ID: 'Erauyvo8nCUx1yS6YIokvwe7uZadSS2eeaBoOvW1',
};

// Testnet
const TEST_FIGHTER_IMAGE_URL = 'https://testnet.api.digitalfightclub.io/renderedFighter';
const TEST_FIGHTER_METADATA_URL = 'https://testnet.api.digitalfightclub.io/metadata';
const TEST_FIGHTER_API_URL = 'https://testapi.digitalfightclub.io';
const TEST_MUMBAI_WEBOOK_AUTOTASK_PRIMARY = 'https://api.defender.openzeppelin.com/autotasks/b773331a-9df8-4f97-9c5b-cbf893305c41/runs/webhook/4ac4f7c4-950e-4a12-85c4-256d007a905d/39tEJJstZqeBHTLZuLneC3';

const TEST_WETH = '0xa4Eb31aE3D5a907FAe13b579B83d2D281D6Bdd0C';
const TEST_WETH_RECEIVER = '0x514477244dBE49632930155c405af3B4b7987bA8';
const TEST_NFT_CONTRACT_ADDRESS = '0x4eCF5910a1eECf0B9716eFAe19AC2FdD77A1010a';
const TEST_TKO_CONTRACT_ADDRESS = '';

// export const TESTNET_EVENT_DISCORD_WH =

const TESTNET_OBJ = {
  ...DEFAULT_OBJ,
  WETH: TEST_WETH,
  WETH_RECEIVER: TEST_WETH_RECEIVER,
  NFT_CONTRACT_ADDRESS: TEST_NFT_CONTRACT_ADDRESS,
  TKO_CONTRACT_ADDRESS: TEST_TKO_CONTRACT_ADDRESS,
  'WEBOOK_AUTOTASK_PRIMARY': TEST_MUMBAI_WEBOOK_AUTOTASK_PRIMARY,
  MORALIS_URL: 'https://tonivpkyl9dn.usemoralis.com:2053/server',
  MORALIS_APP_ID: '4uiN8tGxxZ2nA67JG5GxcjcwmqhFdk3Ki5rcJM7C',
};

export const ENV_CONFG = () => {
  switch (TARGET_NET) {
    case MAINNET:
      return {
        INFURA_NET_NAME: 'mainnet',
        NET_NAME: 'polygon',
        NFT_ADDY: '0x62ea8080b2fc7dc4c7337920866afd242a1443cb',
        TARGET_NET: MAINNET,
        FIGHTER_IMAGE_URL,
        FIGHTER_METADATA_URL,
        FIGHTER_API_URL,
        ...MAINNET_OBJ,
      };
    default:
      return {
        INFURA_NET_NAME: 'mumbai',
        NET_NAME: 'mumbai',
        NFT_ADDY: '0x4ecf5910a1eecf0b9716efae19ac2fdd77a1010a',
        TARGET_NET: TESTNET,
        FIGHTER_IMAGE_URL: TEST_FIGHTER_IMAGE_URL,
        FIGHTER_METADATA_URL: TEST_FIGHTER_METADATA_URL,
        FIGHTER_API_URL: TEST_FIGHTER_API_URL,
        ...TESTNET_OBJ,
      };
  }
};
