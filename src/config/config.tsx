import { ChainId } from '@usedapp/core';
import { ethers } from 'ethers';

// Set net target here
export const MAINNET = ChainId.Polygon;
export const TESTNET = ChainId.Mumbai;
// export const TARGET_NET = MAINNET
export const TARGET_NET = TESTNET;

// Defaults
export const PRICE = ethers.BigNumber.from('0050000000000000000'); //mainnet

// Loading Messages
export const FIRST_MSG = '📝Awaiting User to Sign MetaTx via MetaMask...';
export const SECOND_MSG = '🔃Submitting Signed MetaTx for Processing...(1/3)';
export const THIRD_MSG = '⛓Awaiting MetaTx to Process...(2/3)';
export const FOURTH_MSG = '⛓Awaiting Mint to Process...(3/3)';
export const FINAL_MSG = '🚀Minting Complete. Drumroll...🥁';

// ABI Fragments
const NFT_TRANSFER_ABI = ['event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'];
const WETH_TRANSFER_ABI = ['event Transfer(address indexed from, address indexed to, uint256 value)'];

const DEFAULT_OBJ = {
    'FIRST_MSG': FIRST_MSG,
    'SECOND_MSG': SECOND_MSG,
    'THIRD_MSG': THIRD_MSG,
    'FOURTH_MSG': FOURTH_MSG,
    'FINAL_MSG': FINAL_MSG,
    'NFT_TRANSFER_ABI': NFT_TRANSFER_ABI,
    'WETH_TRANSFER_ABI': WETH_TRANSFER_ABI
};

// Mainnet
const FIGHTER_IMAGE_URL = 'https://mainnet.api.digitalfightclub.io/renderedFighter/';
// const WEBOOK_AUTOTASK_BACKUP_1 = 
// const WEBOOK_AUTOTASK_BACKUP_0 = 
// const WEBOOK_AUTOTASK_PRIMARY = 

const WETH = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';
const WETH_RECEIVER = '0x514477244dBE49632930155c405af3B4b7987bA8';
const NFT_CONTRACT_ADDRESS = '0x62Ea8080B2fc7dc4C7337920866AFd242a1443cB';

export const MINTER_ADDRESS_00 = '0x0699e0f441f520956a5dead1621370c8bf518955';
export const MINTER_ADDRESS_01 = '0x829651b94a6aaccb7f83bf9b5978689302ee50e8';
export const MINTER_ADDRESS_02 = '0x633f9c6a35bcc8b4915117b0c21f100272e24b00';

export const RELAYER_ADDRESS_00 = '0x306a0b7c51034ad1b97be28845d593b804e52a9c';
export const RELAYER_ADDRESS_01 = '0x4fbd4fa3d56b26453e1d7bef03ce2ac12d297f6c';
export const RELAYER_ADDRESS_02 = '0xd5798897a9f1205e7a78f6f38c54b17d08af1f78';

// export const MINT_EVENTS_DISCORD_WH = 
// export const WETH_EVENT_DISCORD_WH = 

const MAINNET_OBJ = {
    'WETH': WETH,
    'WETH_RECEIVER': WETH_RECEIVER,
    'NFT_CONTRACT_ADDRESS': NFT_CONTRACT_ADDRESS,
    // 'WEBOOK_AUTOTASK_PRIMARY': WEBOOK_AUTOTASK_PRIMARY,
    // 'WEBOOK_AUTOTASK_BACKUP_0': WEBOOK_AUTOTASK_BACKUP_0,
    // 'WEBOOK_AUTOTASK_BACKUP_1': WEBOOK_AUTOTASK_BACKUP_1
};

// Testnet
const TEST_FIGHTER_IMAGE_URL = 'https://testnet.api.digitalfightclub.io/renderedFighter/';
// const TEST_MUMBAI_WEBOOK_AUTOTASK_BACKUP_0 = 
// const TEST_MUMBAI_WEBOOK_AUTOTASK_BACKUP_1 = TEST_MUMBAI_WEBOOK_AUTOTASK_BACKUP_0
// const TEST_MUMBAI_WEBOOK_AUTOTASK_PRIMARY = 

const TEST_WETH = '0xa4Eb31aE3D5a907FAe13b579B83d2D281D6Bdd0C';
const TEST_WETH_RECEIVER = '0x514477244dBE49632930155c405af3B4b7987bA8';
const TEST_NFT_CONTRACT_ADDRESS = '0x4eCF5910a1eECf0B9716eFAe19AC2FdD77A1010a';

// export const TESTNET_EVENT_DISCORD_WH = 

const TESTNET_OBJ = {
    'WETH': TEST_WETH,
    'WETH_RECEIVER': TEST_WETH_RECEIVER,
    'NFT_CONTRACT_ADDRESS': TEST_NFT_CONTRACT_ADDRESS,
    // 'WEBOOK_AUTOTASK_PRIMARY': TEST_MUMBAI_WEBOOK_AUTOTASK_PRIMARY,
    // 'WEBOOK_AUTOTASK_BACKUP_0': TEST_MUMBAI_WEBOOK_AUTOTASK_BACKUP_0,
    // 'WEBOOK_AUTOTASK_BACKUP_1': TEST_MUMBAI_WEBOOK_AUTOTASK_BACKUP_1
};

export const ENV_CONFG = () => {
    switch (TARGET_NET.toString()) {
    case MAINNET.toString():
        return {
            'NET_NAME': 'polygon',
            'TARGET_NET': MAINNET,
            'FIGHTER_IMAGE_URL': FIGHTER_IMAGE_URL,
            ...DEFAULT_OBJ,
            ...MAINNET_OBJ
        };
    default:
        return {
            'NET_NAME': 'mumbai',
            'TARGET_NET': TESTNET,
            'FIGHTER_IMAGE_URL': TEST_FIGHTER_IMAGE_URL,
            ...DEFAULT_OBJ,
            ...TESTNET_OBJ
        };
    }
};