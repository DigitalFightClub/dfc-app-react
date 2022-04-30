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
import _ from 'lodash';
import { usePagination } from '@ajna/pagination';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { FighterInfo, OrganizationInfo } from '../../types';
import FighterModal from '../fighterModal/fighterModal';
import DfcPagination from '../pagination/DfcPagination';
import { useFighterChallenges, useGymFighters } from '../../hooks/fighter.hooks';
import OrgFighterRow from './OrgFighterRow';
import { useDFCFighters, useTotalDFCSupply } from '../../hooks/dfc.hooks';
import { useDispatch } from 'react-redux';
import { dfcAction } from '../../types/actions';
import { SET_FIGHTER_CHALLENGE, SET_FIGHTER_DETAILS } from '../../config/events';

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
  // Filter state
  const [selectAvailable, setSelectAvailable] = useState<boolean>(false);
  const [selectOnlineOnly, setSelectOnlineOnly] = useState<boolean>(false);
  const [selectChallengers, setSelectChallengers] = useState<boolean>(false);

  const { data: totalDFCSupply = 0 } = useTotalDFCSupply();
  const { data: gymFighters = [] } = useGymFighters();
  const { data: fighterChallenges } = useFighterChallenges(selectedFighterId);

  const filterFunc = (data: FighterInfo[]): FighterInfo[] => {
    return _.filter(data, ({ fighterId }) => {
      if (selectChallengers) {
        return (
          _.findIndex(gymFighters, ({ fighterId: gymFighterId }) => gymFighterId === fighterId) === -1 &&
          _.findIndex(fighterChallenges, ({ nftId }) => fighterId === nftId) >= 0
        );
      } else {
        return true;
      }
    });
  };
  const { data: dfcFighters = [] } = useDFCFighters(filterFunc, true);

  const [renderOrgFighters, setRenderOrgFighters] = useState<FighterInfo[]>([]);
  const [opponentFighter, setOpponentFighter] = useState<FighterInfo | null>(null);

  // paging state
  const { currentPage, setCurrentPage, pagesCount, pages, setIsDisabled, isDisabled, pageSize, setPageSize, offset } =
    usePagination({
      total: dfcFighters.length,
      limits: {
        outer: 1,
        inner: 3,
      },
      initialState: { pageSize: 10, isDisabled: true, currentPage: 1 },
    });

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalSize = useBreakpointValue({ base: 'xs', md: '2xl', lg: '5xl' });
  const centered = useBreakpointValue({ base: false, md: true });

  const dispatch = useDispatch();

  useEffect(() => {
    if (dfcFighters) {
      // console.log('Got Org Fighters', dfcFighters, fighterChallenges);
      pageFighters();
      setIsDisabled(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dfcFighters, currentPage, pageSize]);

  // paging handlers
  const handlePageChange = (nextPage: number): void => {
    // -> request new data using the page number
    // setRenderOrgFighters([]);
    // setIsDisabled(true);
    setCurrentPage(nextPage);
    console.log('request new data with ->', nextPage);
  };

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const pageSize = Number(event.target.value);

    setRenderOrgFighters([]);
    setIsDisabled(true);
    setCurrentPage(1);
    setPageSize(pageSize);
  };

  const pageFighters = () => {
    const newFighterList: FighterInfo[] = [];
    console.log(`page orgfighters ${offset} < ${currentPage} * ${pageSize}`);
    for (let i = offset; i < currentPage * pageSize; i++) {
      if (dfcFighters[i]) {
        newFighterList.push({ ...dfcFighters[i] });
      }
    }
    setRenderOrgFighters(newFighterList);
  };

  const handleOpponentClick = (fighterData: FighterInfo): void => {
    dispatch(dfcAction(SET_FIGHTER_DETAILS, {}));
    setOpponentFighter(fighterData);
    onOpen();
  };

  const handleOpponentChallengeClick = (event: MouseEvent<HTMLButtonElement>, fighterData: FighterInfo): void => {
    event.stopPropagation();
    dispatch(dfcAction(SET_FIGHTER_CHALLENGE, {}));
    setOpponentFighter(fighterData);
    onOpen();
  };

  const handleSelectChallenged = () => {
    setCurrentPage(1);
    setSelectChallengers(!selectChallengers);
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
              <Text fontSize="16px" fontWeight="normal">
                Org Members: {totalDFCSupply}
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
            <Switch colorScheme="green" size="md" onChange={handleSelectChallenged} />
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
          totalItems={dfcFighters.length}
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
          overflowY="auto"
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
                    handleOpponentClick={handleOpponentClick}
                    handleOpponentChallengeClick={handleOpponentChallengeClick}
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
          totalItems={dfcFighters.length}
          pages={pages}
          isDisabled={isDisabled}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      </Flex>
    </>
  );
}
