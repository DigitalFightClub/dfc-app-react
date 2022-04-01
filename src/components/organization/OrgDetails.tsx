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
  Modal,
  ModalOverlay,
  ModalContent,
  useBreakpointValue,
  useDisclosure,
  useColorModeValue,
  Skeleton,
} from '@chakra-ui/react';
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
  PaginationSeparator,
} from '@ajna/pagination';
import Moralis from 'moralis/types';
import { ChangeEvent, useEffect, useState } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
// import { useDispatch, useSelector } from 'react-redux';
import { ChallengeState, FighterInfo, OrganizationInfo, TokenNFTResult } from '../../types';
import { getDFCNFTs } from '../../utils/web3/moralis';
import FighterModal from '../fighterModal/fighterModal';

export interface OrgHeaderProps {
  orgData: OrganizationInfo | null;
  selectedFighterId: number | undefined;
  selectedFighterName: string | undefined;
  selectedFighterCountryCode: string | undefined;
}

export default function OrgDetails({
  orgData,
  selectedFighterId,
  selectedFighterName,
  selectedFighterCountryCode,
}: OrgHeaderProps) {
  const activeStyle = {
    bg: useColorModeValue('#252A34', '#EEF0F1'),
    color: useColorModeValue('white', 'black'),
  };
  const greyColor = useColorModeValue('white', 'gray.800');

  // Web3 Hooks
  const { isInitialized, Moralis } = useMoralis();
  const Web3Api: Moralis.Web3API = useMoralisWeb3Api();

  // Redux Hooks
  // const { challengeMsg, errorMsg } = useSelector((state: AppState) => state.organizationState);
  // const dispatch = useDispatch();

  const [renderOrgFighters, setRenderOrgFighters] = useState<FighterInfo[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [totalDFCSupply, setTotalDFCSupply] = useState<number | undefined>(undefined);
  const [oppenentFighter, setOppenentFighter] = useState<FighterInfo | null>(null);

  // paging state
  const { currentPage, setCurrentPage, pagesCount, pages, setIsDisabled, isDisabled, pageSize, setPageSize, offset } =
    usePagination({
      total: totalDFCSupply,
      limits: {
        outer: 1,
        inner: 3,
      },
      initialState: { pageSize: 10, isDisabled: true, currentPage: 1 },
    });

  // Filter state
  const [selectAvailable, setSelectAvailable] = useState<boolean>(false);
  const [selectOnlineOnly, setSelectOnlineOnly] = useState<boolean>(false);
  const [selectChallengers, setSelectChallengers] = useState<boolean>(false);

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalSize = useBreakpointValue({ base: 'xs', md: '2xl', lg: '5xl' });
  const centered = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    console.log('isInitialized');
    if (isInitialized && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isInitialized]);

  // TODO: fetch org fighters through redux-saga
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
      if (isInitialized && isLoaded && selectedFighterId) {
        const web3Provider = await Moralis.enableWeb3();
        const signer = web3Provider.getSigner();
        const address: string = await signer.getAddress();

        console.log('Org Details Account:', address);
        if (address) {
          const nfts: TokenNFTResult = await getDFCNFTs(Web3Api, pageSize, offset, address, selectedFighterId);
          // console.log('response org nfts', nfts);
          setTotalDFCSupply(nfts.total);
          setRenderOrgFighters([...nfts.result]);
          setIsDisabled(false);
        }
      }
    })();
  }, [isLoaded, selectedFighterId, currentPage, pageSize, offset]);

  // paging handlers
  const handlePageChange = (nextPage: number): void => {
    // -> request new data using the page number
    setRenderOrgFighters([]);
    setIsDisabled(true);
    setCurrentPage(nextPage);
    console.log('request new data with ->', nextPage);
  };

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const pageSize = Number(event.target.value);

    setRenderOrgFighters([]);
    setIsDisabled(true);
    setPageSize(pageSize);
  };

  const handleOpponentClick = (fighterData: FighterInfo): void => {
    setOppenentFighter(fighterData);
    onOpen();
  };

  return (
    <>
      {isOpen && (
        <Modal size={modalSize} isCentered={centered} isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
          <ModalOverlay />
          <ModalContent>
            <FighterModal onClose={onClose} fighterData={oppenentFighter} />
          </ModalContent>
        </Modal>
      )}
      <Flex
        flexDirection="column"
        maxW="48.125rem"
        maxH="2054px"
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
            <Switch
              colorScheme="green"
              size="md"
              defaultChecked
              onChange={() => setSelectAvailable(!selectAvailable)}
            />
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
        {renderOrgFighters.length === 0 && isDisabled && selectedFighterName ? <Skeleton height="146px" /> : null}
        <VStack w="100%" maxH="102.1875rem" mt="1rem" overflow="hidden" overflowY="scroll">
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
                        disabled={fighter.isOwned}
                        onClick={() => handleOpponentClick(fighter)}
                      >
                        Challenge
                      </Button>
                    ) : null}
                    {fighter.challengeState === ChallengeState.CHALLENGING ? (
                      <Button
                        w="9rem"
                        h="2.8rem"
                        bg="primary.500"
                        color="white"
                        mx="1.5rem"
                        borderRadius="0"
                        disabled={fighter.isOwned}
                        onClick={() => handleOpponentClick(fighter)}
                      >
                        Accept
                      </Button>
                    ) : null}
                    {fighter.challengeState === ChallengeState.CHALLENGED ? (
                      <Button w="9rem" h="2.8rem" bg="gray.600" color="white" mx="1.5rem" borderRadius="0" disabled>
                        Challenged
                      </Button>
                    ) : null}
                  </Flex>
                );
              })
            : null}
        </VStack>
        {/* <Flex opacity="none" pt={15} pb={5} w="100%" alignItems="center" justifyContent="center"> */}
        <Pagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          isDisabled={isDisabled}
          onPageChange={handlePageChange}
        >
          <PaginationContainer align="center" justify="space-between" p={4} w="full">
            <chakra.span>
              {offset + 1}-{offset + pageSize} of {totalDFCSupply}
            </chakra.span>
            <PaginationPrevious _hover={activeStyle} bg={greyColor}>
              <ArrowBackIcon />
            </PaginationPrevious>
            <PaginationPageGroup
              isInline
              align="center"
              separator={<PaginationSeparator isDisabled bg="gray.800" fontSize="sm" w={7} jumpSize={11} />}
            >
              {pages.map((page: number) => (
                <PaginationPage
                  w={8}
                  key={`pagination_page_${page}`}
                  page={page}
                  fontSize="sm"
                  _hover={activeStyle}
                  bg={greyColor}
                  _current={activeStyle}
                />
              ))}
            </PaginationPageGroup>
            <PaginationNext _hover={activeStyle} bg={greyColor}>
              <ArrowForwardIcon />
            </PaginationNext>
            <chakra.span>
              Per Page:
              <Select w="60px" variant="unstyled" colorScheme="green" onChange={handlePageSizeChange}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </Select>
            </chakra.span>
          </PaginationContainer>
        </Pagination>
      </Flex>
    </>
  );
}
