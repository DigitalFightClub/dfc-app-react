import { Box, Container, Flex, Heading, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDFCOrganization } from '../../hooks/org.hooks';
import { AppState } from '../../types';
import getFighterStatistics from '../fighterStatistics/fighterStatistics';
import FighterStatList from '../fighterStats/fighterStats';
import { FighterDetails } from './FighterDetails';
import OrgDetails from './OrgDetails';

export default function Organization() {
  // Redux Hooks
  const { selectedFighter } = useSelector((state: AppState) => state.organizationState);

  const { data: orgDetails, isLoading: loadingOrg } = useDFCOrganization(1);

  return (
    <Box>
      <Container maxW={{ xl: '100ch', lg: '80ch', md: '80ch', sm: '60ch' }} my="1rem">
        <Flex gap="30px">
          {selectedFighter ? (
            <VStack
              w="23.125rem"
              h="106.75rem"
              px="2rem"
              bgGradient="linear(to-r, rgba(204, 204, 204, 0.1), rgba(204, 204, 204, 0.05))"
            >
              <FighterDetails fighterData={selectedFighter} />
              <FighterStatList fighterStatistics={getFighterStatistics(selectedFighter)} slim />
            </VStack>
          ) : (
            <Heading>
              Select a fighter from the{' '}
              <Link to="/gym" style={{ color: '#F26322', textDecoration: 'underline' }}>
                Gym
              </Link>
            </Heading>
          )}

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
