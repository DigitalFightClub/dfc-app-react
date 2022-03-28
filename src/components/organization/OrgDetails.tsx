/* eslint-disable indent */
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
  chakra,
  Center,
  Checkbox,
  Divider,
  Flex,
  HStack,
  Image,
  Switch,
  Text,
  VStack,
  Box,
  Spacer,
  Select,
  Button,
} from '@chakra-ui/react';
import Moralis from 'moralis/types';
import { useEffect, useState } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
// import { useDispatch, useSelector } from 'react-redux';
import { AppState, ChallengeState, FighterInfo, OrganizationInfo, TokenNFTResult } from '../../types';
import { getDFCNFTs, transformFighterMetadata } from '../../utils/web3/moralis';
import { EllipseIcon } from '../dfcIcons/EllipseIcon';
import PagButton from '../pageButton/pagebutton';

export interface OrgHeaderProps {
  orgData: OrganizationInfo | null;
  selectedFighterName: string | undefined;
  selectedFighterCountryCode: string | undefined;
}

export default function OrgDetails({ orgData, selectedFighterName, selectedFighterCountryCode }: OrgHeaderProps) {
  // Web3 Hooks
  const { isInitialized, Moralis } = useMoralis();
  const Web3Api: Moralis.Web3API = useMoralisWeb3Api();

  // Redux Hooks
  // const { orgFighters } = useSelector((state: AppState) => state.organizationState);
  // const dispatch = useDispatch();

  const [renderOrgFighters, setRenderOrgFighters] = useState<FighterInfo[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [totalDFCSupply, setTotalDFCSupply] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Filter state
  const [selectAvailable, setSelectAvailable] = useState<boolean>(false);
  const [selectOnlineOnly, setSelectOnlineOnly] = useState<boolean>(false);
  const [selectChallengers, setSelectChallengers] = useState<boolean>(false);

  useEffect(() => {
    console.log('isInitialized');
    if (isInitialized && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isInitialized]);

  // useEffect(() => {
  //   if (orgFighters) {
  //     console.log('Got Org Fighters', JSON.stringify(orgFighters));
  //     const newOrgFighters: FighterInfo[] = [...orgFighters];
  //     setRenderOrgFighters(newOrgFighters);
  //   }
  // }, [orgFighters]);

  useEffect(() => {
    (async function () {
      console.log('Load org fighters Async');
      if (isInitialized && isLoaded && selectedFighterName) {
        const web3Provider = await Moralis.enableWeb3();
        const signer = web3Provider.getSigner();
        const address: string = await signer.getAddress();
        console.log('Org Details Account:', address);
        if (address) {
          const nfts: TokenNFTResult = await getDFCNFTs(Web3Api, pageSize, pageSize * (page - 1), address);
          // console.log('response org nfts', nfts);
          setTotalDFCSupply(nfts.total);

          const refinedFighterNFTs: FighterInfo[] = transformFighterMetadata(nfts.result, address);
          console.log('refined org nfts', refinedFighterNFTs);
          setRenderOrgFighters([...refinedFighterNFTs]);
        }
      }
    })();
  }, [isLoaded, selectedFighterName, page, pageSize]);

  return (
    <Flex
      flexDirection="column"
      maxW="48.125rem"
      h="2054px"
      px="1.5rem"
      py="2rem"
      gap="1rem"
      bgGradient="linear(to-r, rgba(204, 204, 204, 0.1), rgba(204, 204, 204, 0.05))"
    >
      <Center>
        {orgData && orgData.orgIcon ? (
          <Image h="3.375rem" w="3.375rem" display="inline" src={orgData.orgIcon} mr="1rem" />
        ) : null}
        <Text fontSize="42px" fontWeight="semibold">
          {orgData && orgData.orgName ? orgData.orgName : ''}
        </Text>
      </Center>
      <Center>
        <Text fontSize="24px" fontWeight="normal">
          {orgData && orgData.orgCategory ? orgData.orgCategory : ''}
        </Text>
      </Center>

      <Center>
        {selectedFighterName ? (
          <Text fontSize="24px" fontWeight="normal">
            {selectedFighterName}
            {selectedFighterCountryCode ? (
              <chakra.span ml="10px" className={`fi fi-${selectedFighterCountryCode.toLowerCase()}`} />
            ) : null}
          </Text>
        ) : (
          <Text fontSize="16px" fontWeight="normal" fontStyle="italic">
            No Fighter Selected
          </Text>
        )}
      </Center>

      {/* TODO: Dispatch filter state */}
      <Center flexWrap="wrap" gap="40px">
        <HStack>
          <Text color={selectAvailable ? 'grey' : 'white'}>All</Text>
          <Switch colorScheme="green" size="md" defaultChecked onChange={() => setSelectAvailable(!selectAvailable)} />
          <Text color={!selectAvailable ? 'grey' : 'white'}>Available</Text>
        </HStack>
        <HStack>
          <Text color={selectOnlineOnly ? 'grey' : 'white'}>All</Text>
          <Switch colorScheme="green" size="md" onChange={() => setSelectOnlineOnly(!selectOnlineOnly)} />
          <Text wordBreak="keep-all" color={!selectOnlineOnly ? 'grey' : 'white'}>
            Online Only
          </Text>
        </HStack>
        <HStack>
          <Text color={selectChallengers ? 'grey' : 'white'}>All</Text>
          <Switch colorScheme="green" size="md" onChange={() => setSelectChallengers(!selectChallengers)} />
          <Text color={!selectChallengers ? 'grey' : 'white'}>Challengers</Text>
        </HStack>
        <Checkbox colorScheme="green">Default All</Checkbox>
      </Center>
      <Divider />
      <VStack w="100%" mt="1rem">
        {renderOrgFighters
          ? renderOrgFighters.map((fighter) => {
              return (
                <Flex key={fighter.fighterId} w="100%" h="146px" bgImage="/assets/background.svg" alignItems="center">
                  <Box
                    maxH="145px"
                    minH="145px"
                    minW="145px"
                    justifySelf="center"
                    alignSelf="center"
                    pos="relative"
                    pr="1rem"
                    marginBottom="10px"
                  >
                    <Image boxSize="145px" src={fighter.image} />
                  </Box>
                  <VStack my="37px" alignItems="flex-start">
                    <Text fontFamily="Sora" fontWeight="normal" fontSize="20px">
                      {fighter.name}
                      {fighter && fighter.countryCode ? (
                        <chakra.span ml="10px" className={`fi fi-${fighter.countryCode.toLowerCase()}`} />
                      ) : null}
                    </Text>
                    <Flex direction="row" mb="10px">
                      <Text fontFamily="Sora" fontWeight="normal" fontSize="20px" mr=".5rem" whiteSpace="nowrap">
                        Record:
                        <chakra.span display="inline" color="primary.500">
                          &nbsp;
                          {fighter.wins}
                        </chakra.span>
                        {'-'}
                        <chakra.span display="inline" color="secondary.500">
                          {fighter.loses}
                        </chakra.span>
                      </Text>
                    </Flex>
                  </VStack>
                  <Spacer />
                  {fighter.challengeState === ChallengeState.AVAILABLE ? (
                    <Button
                      w="9rem"
                      h="2.8rem"
                      bg="secondary.500"
                      color="white"
                      mx="1.5rem"
                      borderRadius="0"
                      // onClick={selectFighter}
                    >
                      Challenge
                    </Button>
                  ) : (
                    <Button
                      w="9rem"
                      h="2.8rem"
                      bg="primary.500"
                      color="white"
                      mx="1.5rem"
                      borderRadius="0"
                      // onClick={selectFighter}
                    >
                      Accept
                    </Button>
                  )}
                </Flex>
              );
            })
          : null}
        <Flex opacity="none" pt={15} pb={5} w="100%" alignItems="center" justifyContent="center">
          <Flex w="100%" alignItems="center">
            <chakra.span>
              {page * pageSize + 1}-{page * pageSize + pageSize} of {totalDFCSupply}
            </chakra.span>
            <Spacer />
            <PagButton>
              <ArrowBackIcon />
            </PagButton>
            <PagButton active>1</PagButton>
            <PagButton>2</PagButton>
            <PagButton>3</PagButton>
            <PagButton>4</PagButton>
            <PagButton>5</PagButton>
            <EllipseIcon mx="5px" />
            <PagButton>{Math.ceil(totalDFCSupply / pageSize)}</PagButton>
            <PagButton>
              <ArrowForwardIcon />
            </PagButton>
            <Spacer />
            <chakra.span>
              Per Page:
              <Select w="60px" variant="unstyled" colorScheme="green">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </Select>
            </chakra.span>
          </Flex>
        </Flex>
      </VStack>
    </Flex>
  );
}
