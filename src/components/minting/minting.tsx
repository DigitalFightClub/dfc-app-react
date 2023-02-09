import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Stack,
  // Input,
  // InputGroup,
  // InputLeftAddon,
  // Stat,
  // StatLabel,
  // StatNumber,
  // StatGroup,
  Image,
  Box,
  Center,
  Text,
} from '@chakra-ui/react';
// import { SetStateAction, useEffect, useState } from 'react';
// import LoadingScreen from 'react-loading-screen';
// import { useEthers, useTokenBalance } from '@usedapp/core';
// import { ethers } from 'ethers';
// import { formatUnits } from '@ethersproject/units';
// import { PRICE, ENV_CONFG } from '../../config';
// import { wethABI } from '../../utils/web3/weth-abi';
// import { verifyNetwork } from '../../utils/web3/connect';
// import axios from 'axios';

// const ENV = ENV_CONFG();

export default function Minting() {
  // const { account, chainId, library } = useEthers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [content, setContent] = useState('');
  // const [open, setOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [amount, setAmount] = useState(1);
  // const [isSigning, setIsSigning] = useState(false);
  // const [waitingMsg, setWaitingMsg] = useState(ENV.FIRST_MSG);
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [txHash, setTxHash] = useState(null);
  // const [nftSc, setNftSc] = useState<ethers.Contract | null>();
  // const [wethSc, setWethSc] = useState<ethers.Contract>();
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [nftFilter, setNftFilter] = useState({});
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [wethFilter, setWethFilter] = useState({});
  // const [wethSingle, setWethSingle] = useState(0);
  // const [nftSingle, setNftSingle] = useState(0);
  // const [tokenIds, setTokenIds] = useState<string[]>([]);

  // useEffect(() => {
  //   if (library && waitingMsg === ENV.THIRD_MSG) {
  //     const weth_sc = new ethers.Contract(ENV.WETH, ENV.WETH_TRANSFER_ABI, library);
  //     setWethSc(weth_sc);
  //     const weth_filter = weth_sc.filters.Transfer(account, ENV.WETH_RECEIVER);
  //     setWethFilter(weth_filter);

  //     if (Object.keys(weth_sc).length != 0) {
  //       if (wethSingle == 0) {
  //         setWethSingle(1);
  //         console.log('WETH SC: ', weth_sc);
  //         console.log('Listening...WETH');
  //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //         weth_sc.on(weth_filter, (from, to, value, event) => {
  //           setWaitingMsg(ENV.FOURTH_MSG);
  //           // console.log(`from: ${from}`);
  //           // console.log(`to: ${to}`);
  //           // console.log(`value: ${value.toString()}`)
  //           // console.log(event.blockNumber);
  //         });
  //       }
  //     }
  //   }
  //   return () => {
  //     if (wethSc) {
  //       if (Object.keys(wethSc).length != 0) {
  //         // console.log('weth event listeners removed')
  //         wethSc.removeAllListeners();
  //       }
  //     }
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [library, waitingMsg]);

  // useEffect(() => {
  //   if (library && waitingMsg === ENV.THIRD_MSG) {
  //     const nft_sc = new ethers.Contract(ENV.NFT_CONTRACT_ADDRESS, ENV.NFT_TRANSFER_ABI, library);
  //     setNftSc(nft_sc);
  //     const nft_filter = nft_sc.filters.Transfer(null, account);
  //     setNftFilter(nft_filter);

  //     if (Object.keys(nft_sc).length != 0) {
  //       if (nftSingle == 0) {
  //         setNftSingle(1);
  //         console.log('NFT SC: ', nft_sc);
  //         console.log('Listening...NFT');
  //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //         nft_sc.on(nft_filter, (from: string, to: string, tokenId: string, event: ethers.Event) => {
  //           // console.log(`from: ${from}`);
  //           // console.log(`to: ${to}`);

  //           if (tokenId) {
  //             let tokenIds_existing: string[] = [];
  //             tokenIds_existing = tokenIds;
  //             tokenIds_existing.push(tokenId.toString());
  //             setTokenIds(tokenIds_existing);
  //           }

  //           if (amount == tokenIds.length) {
  //             setWaitingMsg(ENV.FINAL_MSG);
  //             setTimeout(() => {
  //               recordMintedFighters();
  //             }, 7000);
  //           }

  //           // console.log(`tokenId: ${tokenId}`)
  //           // console.log('included in block #: ', event.blockNumber);
  //         });
  //       }
  //     }
  //   }

  //   const recordMintedFighters = async () => {
  //     await window.localStorage.setItem('fighter_ids', JSON.stringify(tokenIds));
  //     console.log('fighter ids: ', tokenIds);
  //     console.log('localized fighter count: ', tokenIds.length);
  //     // console.log('metatx hash: ', txHash)
  //     // routeChange(txHash ? txHash : 'Error-0x3');
  //     resetState();
  //   };

  //   return () => {
  //     if (nftSc) {
  //       if (Object.keys(nftSc).length != 0) {
  //         // console.log('nft event listeners removed')
  //         nftSc.removeAllListeners();
  //       }
  //     }
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [library, waitingMsg]);

  // const resetState = () => {
  //   onClose();
  //   setNftSingle(0);
  //   setIsLoading(false);
  //   setWaitingMsg(ENV.FIRST_MSG);
  //   setNftSc(null);
  //   setNftFilter({});
  // };

  // const closeModal = () => setOpen(false);

  // // const tokenBalance = ethers.BigNumber.from('0250000000000000000');
  // const tokenBalance = useTokenBalance(ENV.WETH, account);

  // const txCost = () => {
  //   return PRICE.mul(amount).toString();
  // };

  // const calcCanAfford = () => {
  //   if (tokenBalance) {
  //     const isTrue = tokenBalance.gte(txCost());
  //     // console.log(isTrue)
  //     if (isTrue) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  //   return false;
  // };

  // const decrement = () => {
  //   if (amount - 1 >= 1) {
  //     setAmount(amount - 1);
  //   }
  // };

  // const increment = () => {
  //   if (amount + 1 <= 10) {
  //     setAmount(amount + 1);
  //   }
  // };

  // const triggerPopup = (content: SetStateAction<string>) => {
  //   setContent(content);
  //   setOpen(true);
  // };

  // const AlertPopup = () => (
  //   <Modal isOpen={open} onClose={closeModal} isCentered>
  //     <ModalOverlay />
  //     <ModalContent>
  //       <Center>{content}</Center>
  //     </ModalContent>
  //   </Modal>
  // );

  // const getSignatureParameters = (signature: any) => {
  //   if (!ethers.utils.isHexString(signature)) {
  //     throw new Error('Given value "'.concat(signature, '" is not a valid hex string.'));
  //   }

  //   const r = signature.slice(0, 66);
  //   const s = '0x'.concat(signature.slice(66, 130));
  //   let v: any = '0x'.concat(signature.slice(130, 132));

  //   // console.log(`length: ${signature.length}`)
  //   v = ethers.BigNumber.from(v).toNumber();

  //   if (![27, 28].includes(v)) v += 27;

  //   return {
  //     r: r,
  //     s: s,
  //     v: v,
  //   };
  // };

  // const generageMMSign = async () => {
  //   // eslint-disable-next-line no-constant-condition
  //   if (true) {
  //     // mintFighter(txCost())
  //     // library.getSigner(account).signMessage('test')

  //     const contract = new ethers.Contract(ENV.WETH, wethABI, library);
  //     const functionSignature = contract.interface.encodeFunctionData('transfer', [ENV.WETH_RECEIVER, txCost()]);
  //     const accountNonce = await contract.getNonce(account);
  //     // console.log('account nonce: ', accountNonce.toString())
  //     // console.log(`functionSignature: ${functionSignature}`)

  //     const salt = ethers.utils.hexZeroPad(ethers.BigNumber.from(chainId).toHexString(), 32);
  //     // console.log(`salt: ${salt}`)

  //     const typedData = {
  //       types: {
  //         EIP712Domain: [
  //           { name: 'name', type: 'string' },
  //           { name: 'version', type: 'string' },
  //           { name: 'verifyingContract', type: 'address' },
  //           { name: 'salt', type: 'bytes32' },
  //         ],
  //         MetaTransaction: [
  //           { name: 'nonce', type: 'uint256' },
  //           { name: 'from', type: 'address' },
  //           { name: 'functionSignature', type: 'bytes' },
  //         ],
  //       },
  //       primaryType: 'MetaTransaction',
  //       // struct EIP712Domain {
  //       //  string name;
  //       //  string version;
  //       //  address verifyingContract;
  //       //  bytes32 salt;
  //       // }
  //       domain: {
  //         name: 'Wrapped Ether',
  //         version: '1',
  //         verifyingContract: ENV.WETH,
  //         salt: salt,
  //       },
  //       // "MetaTransaction(uint256 nonce,address from,bytes functionSignature)"
  //       message: {
  //         nonce: accountNonce.toNumber(),
  //         from: account,
  //         functionSignature: functionSignature,
  //       },
  //     };

  //     const request = await (window as any).ethereum
  //       .request({
  //         method: 'eth_signTypedData_v3',
  //         params: [account, JSON.stringify(typedData)],
  //       })
  //       .then(async (result: any) => {
  //         // console.log('result: ', result)

  //         const { r, s, v } = getSignatureParameters(result);
  //         const request = {
  //           signature: result,
  //           request: {
  //             to: ENV.WETH,
  //             from: account,
  //             data: functionSignature,
  //             r: r,
  //             s: s,
  //             v: v,
  //           },
  //         };

  //         return request;
  //       })
  //       .catch((error: any) => {
  //         console.log('error: ', error); // catches cancelling the sign step of the metatx
  //         setIsSigning(false);
  //         setIsLoading(false);
  //       });

  //     // console.log(request);
  //     return request;
  //   } else {
  //     // addNetwork();
  //     setIsLoading(false);
  //   }
  //   return null;
  // };

  // const submitMetaTx = (request: any, webhookURL: any, counter: any) => {
  //   axios
  //     .post(webhookURL, request)
  //     .then(function (response) {
  //       // console.log('response: ', response.data)
  //       // if (!response.data.status == 'error') {
  //       //   console.log('txHash: ', JSON.parse(response.data.result));
  //       // }

  //       if (response.data.status == 'throttled') {
  //         console.log('throttled', counter);
  //         triggerPopup(
  // eslint-disable-next-line max-len
  //           'Apologies. Our services are currently being rate limited because of a DFC mint storm. Please try again in 30 minutes. Error 0x1'
  //         );
  //       }

  //       if (response.data.status == 'success' && response.data.result.includes('Invalid amount')) {
  //         triggerPopup('Price mismatch. Please alert the team in Discord');
  //         setIsSigning(false);
  //         setIsLoading(false);
  //         return;
  //       }

  //       if (response.data.status == 'success' && response.data.result.includes('error')) {
  //         triggerPopup(
  // eslint-disable-next-line max-len
  //           'Apologies. Our services are currently being rate limited because of a DFC mint storm. Please try again in 30 minutes. Error 0x2'
  //         );
  //       }

  //       if (response.data.status == 'success' && !response.data.result.includes('error')) {
  //         const txHash = JSON.parse(response.data.result).txHash;
  //         setTxHash(txHash);
  //         console.log('tx hash: ', txHash);
  //         setWaitingMsg(ENV.THIRD_MSG);
  //         // routeChange(JSON.parse(response.data.result).txHash)
  //         // window.open(`/fighterReveal?txHash=${JSON.parse(response.data.result).txHash}`)
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log('error: ', error);
  //     });
  // };

  // const submit = async () => {
  //   // console.log(calcCanAfford());
  //   // console.log(txCost().toString());

  //   if (!calcCanAfford()) {
  //     triggerPopup('You cannot afford this!');
  //     setIsSigning(false);
  //     return;
  //   }

  //   setIsLoading(true);

  //   if (isSigning) {
  // eslint-disable-next-line max-len
  //     triggerPopup('MetaMask Signing awaiting your confirmation. \nEither "Sign" or "Cancel" via the MetaMask pop-up.');
  //     return;
  //   } else {
  //     setIsSigning(true);
  //   }

  //   // generate message to sign, create request to send to API
  //   const request = await generageMMSign();
  //   console.log('generate await completed');

  //   if (request) {
  //     // console.log(JSON.stringify(request, null, 2))
  //     setWaitingMsg(ENV.SECOND_MSG);
  //     // submit signed request to the API
  //     await submitMetaTx(request, ENV.WEBOOK_AUTOTASK_PRIMARY, 1);
  //     setIsSigning(false);
  //   }

  //   setIsSigning(false);
  // };

  // const truncateUnits = (bigNumber: any) => {
  //   let result = formatUnits(bigNumber, 18).toString();
  //   result = result.split('.')[0] + '.' + result.split('.')[1].substring(0, 3);
  //   return result;
  // };

  return (
    <>
      <Center>
        <Box>
          <Image src="/images/steep-pyramid.png" height="700px" />
        </Box>
      </Center>

      <Box hidden>
        <Image src="/images/fight-stage-1600.png" />
      </Box>
      <Box hidden>
        <Image src="/images/spotlight-1600.png" />
      </Box>
      <Box hidden>
        <Image src="/images/reveal.gif" />
      </Box>

      <Button onClick={onOpen}>Mint Fighters</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mint Your Fighters</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack align="cneter">
              <Text fontFamily="Sora" fontWeight="semibold" fontSize="26px">Coming Soon...</Text>
              {/* <StatGroup>
                <Stat>
                  <StatLabel>Cost per Fighter</StatLabel>
                  <StatNumber>0.05 wETH</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Current Balance</StatLabel>
                  <StatNumber>{(tokenBalance ? truncateUnits(tokenBalance): '0.00')} wETH</StatNumber>
                </Stat>
              </StatGroup> */}
            </Stack>

            <Stack align="center">
              <Image src="/images/fighter_silhouette_guys.png" width="200px" alt="silhouette fighter" />
            </Stack>

            {/* <Stack align='center'>
              <Stat>
                <StatLabel>Total Cost</StatLabel>
                <StatNumber>{formatUnits(txCost(), 18).toString()} wETH</StatNumber>
              </Stat>
            </Stack>

            <Stack direction='row' spacing={4} align='center'>
              <Button colorScheme='red' variant='solid' onClick={decrement}>
                -
              </Button>

              <InputGroup size='lg'>
                <InputLeftAddon># of Fighters:</InputLeftAddon>
                <Input readOnly={true} placeholder='0' type="number" value={amount}/>
              </InputGroup>

              <Button colorScheme='red' variant='solid' onClick={increment}>
                +
              </Button>
            </Stack> */}
          </ModalBody>

          <ModalFooter>
            {/* <Button onClick={submit} colorScheme='green' mr={3}>
              Submit & Sign TX
            </Button> */}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* <AlertPopup /> */}

      {/* <div style={{ display: !isLoading ? 'none' : 'block' }} className="loadingScreen">
        <LoadingScreen
          loading={true}
          bgColor="#000000"
          spinnerColor="#FF0000"
          textColor="#676767"
          logoSrc="images/logo.png"
          text={waitingMsg}
        >
          &nbsp;
        </LoadingScreen>
      </div> */}
    </>
  );
}
