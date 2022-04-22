/* eslint-disable indent */
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
  Modal,
  ModalOverlay,
  ModalContent,
  useBreakpointValue,
  useDisclosure,
  Skeleton,
} from '@chakra-ui/react';
import { usePagination } from '@ajna/pagination';
import Moralis from 'moralis/types';
import { ChangeEvent, useEffect, useState } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { FighterInfo, OrganizationInfo, TokenNFTResult } from '../../types';
import { getDFCNFTs } from '../../utils/web3/moralis';
import FighterModal from '../fighterModal/fighterModal';
import DfcPagination from '../pagination/DfcPagination';
import { useFighterChallenges } from '../../hooks/fighter.hooks';
import { getChallengeState } from '../../utils/helpers/fighter.helpers';
import OrgFighterRow from './OrgFighterRow';

export interface OrgHeaderProps {
  orgData: OrganizationInfo;
  loadingOrg: boolean;
  selectedFighterId: number;
  selectedFighterName: string;
  selectedFighterCountryCode: string;
}

export default function OrgDetails({
  orgData,
  loadingOrg,
  selectedFighterId,
  selectedFighterName,
  selectedFighterCountryCode,
}: OrgHeaderProps) {
  // Web3 Hooks
  const { isInitialized, Moralis } = useMoralis();
  const Web3Api: Moralis.Web3API = useMoralisWeb3Api();

  const [renderOrgFighters, setRenderOrgFighters] = useState<FighterInfo[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [totalDFCSupply, setTotalDFCSupply] = useState<number | undefined>(undefined);
  const [opponentFighter, setOpponentFighter] = useState<FighterInfo | null>(null);

  const { data: fighterChallenges } = useFighterChallenges(selectedFighterId);

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
  }, [isInitialized, isLoaded]);

  useEffect(() => {
    (async function () {
      console.log('Load org fighters Async');
      if (isInitialized && isLoaded && selectedFighterId) {
        const web3Provider = await Moralis.enableWeb3();
        const signer = web3Provider.getSigner();
        const address: string = await signer.getAddress();

        console.log('Org Details Account:', address);
        console.log(`Load org fighters page=[${currentPage - 1}] <= pagesCount=[${pagesCount}]`);
        if (address && currentPage - 1 <= pagesCount) {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          const nfts: TokenNFTResult = await getDFCNFTs(Web3Api, pageSize, offset, address, selectedFighterId);
          // console.log('response org nfts', nfts);
          setTotalDFCSupply(nfts.total);
          setRenderOrgFighters([...nfts.result]);
          setIsDisabled(false);
        } else if (currentPage - 1 > pagesCount) {
          setCurrentPage(pagesCount);
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
    setOpponentFighter(fighterData);
    onOpen();
  };

  return (
    <>
      {isOpen && opponentFighter && (
        <Modal
          closeOnOverlayClick={false}
          size={modalSize}
          isCentered={centered}
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior="outside"
        >
          <ModalOverlay />
          <ModalContent>
            <FighterModal onClose={onClose} fighterData={opponentFighter} />
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
        <Skeleton isLoaded={!loadingOrg}>
          <VStack>
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
          </VStack>
        </Skeleton>

        {/* TODO: Dispatch filter state */}
        <Center flexWrap="wrap" gap="40px">
          <HStack>
            <Text color={selectAvailable ? 'grey' : 'white'}>All</Text>
            <Switch disabled colorScheme="green" size="md" onChange={() => setSelectAvailable(!selectAvailable)} />
            <Text color={!selectAvailable ? 'grey' : 'white'}>Available</Text>
          </HStack>
          <HStack>
            <Text color={selectOnlineOnly ? 'grey' : 'white'}>All</Text>
            <Switch disabled colorScheme="green" size="md" onChange={() => setSelectOnlineOnly(!selectOnlineOnly)} />
            <Text wordBreak="keep-all" color={!selectOnlineOnly ? 'grey' : 'white'}>
              Online Only
            </Text>
          </HStack>
          <HStack>
            <Text color={selectChallengers ? 'grey' : 'white'}>All</Text>
            <Switch disabled colorScheme="green" size="md" onChange={() => setSelectChallengers(!selectChallengers)} />
            <Text color={!selectChallengers ? 'grey' : 'white'}>Challengers</Text>
          </HStack>
          <Checkbox disabled colorScheme="green">
            Default All
          </Checkbox>
        </Center>
        <Divider />
        <DfcPagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          offset={offset}
          pageSize={pageSize}
          totalItems={totalDFCSupply ? totalDFCSupply : 0}
          pages={pages}
          isDisabled={isDisabled}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
        {renderOrgFighters.length === 0 && isDisabled && selectedFighterName ? <Skeleton height="146px" /> : null}
        <VStack
          w="100%"
          maxH="102.1875rem"
          mt="1rem"
          overflow="hidden"
          overflowY="scroll"
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#FFFFFF',
              borderRadius: '24px',
            },
          }}
        >
          {renderOrgFighters
            ? renderOrgFighters.map((fighter) => {
                return (
                  <OrgFighterRow
                    key={fighter.fighterId}
                    fighter={fighter}
                    fighterChallengeState={getChallengeState(fighter.fighterId, fighter.isOwned, fighterChallenges)}
                    handleOpponentClick={handleOpponentClick}
                  />
                );
              })
            : null}
        </VStack>
        <DfcPagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          offset={offset}
          pageSize={pageSize}
          totalItems={totalDFCSupply ? totalDFCSupply : 0}
          pages={pages}
          isDisabled={isDisabled}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      </Flex>
    </>
  );
}
