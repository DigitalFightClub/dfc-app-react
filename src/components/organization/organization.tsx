import { chakra, Box, Container, Flex, HStack, Skeleton, VStack, Divider } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SELECTED_FIGHTER } from '../../config/events';
import { useGymFighters } from '../../hooks/fighter.hooks';
import { useDFCOrganization } from '../../hooks/org.hooks';
import { AppState, FighterInfo } from '../../types';
import { dfcAction } from '../../types/actions';
import FighterAvatar from '../fighterHistory/fighterAvatar';
import getFighterStatistics from '../fighterStatistics/fighterStatistics';
import FighterStatList from '../fighterStats/fighterStats';
import { FighterDetails } from './FighterDetails';
import OrgDetails from './OrgDetails';

export default function Organization() {
  // Redux Hooks
  const { selectedFighter } = useSelector((state: AppState) => state.organizationState);
  const dispatch = useDispatch();

  const { data: orgDetails, isLoading: loadingOrg } = useDFCOrganization(1);
  const { data: activeFighters, isLoading: isGymFightersLoading, isFetching } = useGymFighters();

  const handleFighterSelection = (fighter: FighterInfo) => {
    console.log('Selected Fighter', fighter);
    dispatch(
      dfcAction(SET_SELECTED_FIGHTER, {
        data: { fighterData: fighter },
      })
    );
  };

  return (
    <Box>
      <Container maxW={{ xl: '100ch', lg: '80ch', md: '80ch', sm: '60ch' }} my="1rem">
        <Flex gap="30px">
          <VStack
            w="23.125rem"
            h="106.75rem"
            px="2rem"
            bgGradient="linear(to-r, rgba(204, 204, 204, 0.1), rgba(204, 204, 204, 0.05))"
          >
            <Box
              minW="23.125rem"
              maxW="23.125rem"
              maxH="80px"
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
              <Skeleton isLoaded={!isGymFightersLoading && !isFetching}>
                <p>Select fighter:</p>
                <HStack gap="5px">
                  {activeFighters
                    ? activeFighters.map((fighter) => (
                      <chakra.div
                        key={fighter.fighterId}
                        _hover={{ cursor: 'pointer' }}
                        onClick={() => handleFighterSelection(fighter)}
                      >
                        <FighterAvatar
                          fighterImage={fighter.image}
                          hideResult={true}
                          color={
                            selectedFighter && fighter.fighterId === selectedFighter.fighterId ? '#2ABB75' : '#50545C'
                          }
                          isWinner={true}
                          isChallenger={true}
                        />
                      </chakra.div>
                    ))
                    : null}
                </HStack>
              </Skeleton>
            </Box>
            <Divider />
            {selectedFighter ? (
              <>
                <FighterDetails fighterData={selectedFighter} />
                <FighterStatList fighterStatistics={getFighterStatistics(selectedFighter).slim} slim />
              </>
            ) : null}
          </VStack>

          {/* Org Panel */}
          {orgDetails && selectedFighter ? (
            <OrgDetails
              orgData={orgDetails}
              loadingOrg={loadingOrg}
              selectedFighterId={selectedFighter.fighterId}
              selectedFighterName={selectedFighter.name}
              selectedFighterCountryCode={selectedFighter.countryCode}
            />
          ) : null}
        </Flex>
      </Container>
    </Box>
  );
}
