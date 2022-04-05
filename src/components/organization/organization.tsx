import { Box, Container, Flex, Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GET_ORG_INFO_REQUEST } from '../../config/events';
import { AppState, FighterInfo, OrganizationInfo } from '../../types';
import { dfcAction } from '../../types/actions';
import getFighterStatistics from '../fighterStatistics/fighterStatistics';
import FighterStatList from '../fighterStats/fighterStats';
import { FighterDetails } from './FighterDetails';
import OrgDetails from './OrgDetails';

export default function Organization() {
  // Redux Hooks
  const { selectedFighter, selectedOrg, loadingOrg } = useSelector((state: AppState) => state.organizationState);
  const dispatch = useDispatch();

  const [renderSelectedFighter, setRenderSelectedFighter] = useState<FighterInfo | null>(null);
  const [renderSelectedOrg, setRenderSelectedOrg] = useState<OrganizationInfo | null>(null);

  useEffect(() => {
    (async function () {
      console.log('Fetch org fighters');

      if (selectedFighter) {
        const newSelectedFighter: FighterInfo = {
          ...selectedFighter,
        };
        setRenderSelectedFighter(newSelectedFighter);

        console.log('Fetch org info', selectedFighter.fighterId);
        dispatch(
          dfcAction(GET_ORG_INFO_REQUEST, {
            data: { orgId: 1, fighterId: selectedFighter.fighterId },
          })
        );
      }

      if (selectedOrg) {
        const newSelectedOrg: OrganizationInfo = { ...selectedOrg };
        setRenderSelectedOrg(newSelectedOrg);
      }
    })();
  }, [selectedFighter]);

  useEffect(() => {
    (async function () {
      console.log('Fetch org info');

      if (selectedOrg) {
        const newSelectedOrg: OrganizationInfo = { ...selectedOrg };
        setRenderSelectedOrg(newSelectedOrg);
      }
    })();
  }, [selectedOrg]);

  return (
    <Box>
      <Container maxW={{ xl: '100ch', lg: '80ch', md: '80ch', sm: '60ch' }} my="1rem">
        <Flex gap="30px">
          {renderSelectedFighter ? (
            <VStack
              w="23.125rem"
              h="106.75rem"
              px="2rem"
              bgGradient="linear(to-r, rgba(204, 204, 204, 0.1), rgba(204, 204, 204, 0.05))"
            >
              <FighterDetails fighterData={renderSelectedFighter} />
              <FighterStatList fighterStatistics={getFighterStatistics(renderSelectedFighter)} slim />
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
          <OrgDetails
            orgData={renderSelectedOrg}
            loadingOrg={loadingOrg}
            selectedFighterId={renderSelectedFighter?.fighterId}
            selectedFighterName={renderSelectedFighter?.name}
            selectedFighterCountryCode={renderSelectedFighter?.countryCode}
          />
        </Flex>
        {/* <Grid h="600px" templateRows="repeat(1, 1fr)" templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem colSpan={1} bg="tomato"></GridItem>
          <GridItem colSpan={2} bg="papayawhip"></GridItem>
        </Grid> */}
      </Container>
    </Box>
  );
}
