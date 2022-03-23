import { Box, Container, Flex, Grid, GridItem, Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState, FighterInfo, OrganizationInfo } from '../../types';
import getFighterStatistics from '../fighterStatistics/fighterStatistics';
import FighterStatList from '../fighterStats/fighterStats';
import { FighterHeader } from './fighterHeader';

export default function Organization() {
  // Redux Hooks
  const { selectedFighter, selectedOrg } = useSelector((state: AppState) => state.organizationState);

  const [renderSelectedFighter, setRenderSelectedFighter] = useState<FighterInfo | null>(null);
  const [renderSelectedOrg, setRenderSelectedOrg] = useState<OrganizationInfo | null>(null);

  useEffect(() => {
    (async function () {
      console.log('Fetch org fighters');

      //TODO: remove test data
      const newSelectedFighter: FighterInfo = {
        fighterId: 9,
        name: 'Dong Loh',
        image: 'https://mainnet.api.digitalfightclub.io/renderedFighter/9.png',
        wins: '0',
        loses: '0',
        status: 'Active',
        recruited: '11/30/2021',
        gender: 'male',
        height: '5\'0"',
        country: 'China',
        weight: '113 lbs',
        stats: {
          power: 55,
          speed: 63,
          strength: 52,
          balance: 43,
          conditioning: 66,
          flexibility: 69,
          reflex: 83,
          footwork: 44,
          bjj: 19,
          judo: 69,
          karate: 52,
          kickboxing: 28,
          mauyThai: 24,
          sambo: 54,
          taekwondo: 66,
          wrestling: 57,
        },
        isChallenged: true,
        isOwned: true,
      };
      setRenderSelectedFighter(newSelectedFighter);
    })();
  }, [selectedFighter]);

  return (
    <Box>
      <Container maxW={{ xl: '100ch', lg: '80ch', md: '80ch', sm: '60ch' }} my="1rem">
        <Flex gap="30px">
          {renderSelectedFighter ? (
            <VStack
              w="23.125rem"
              px="2rem"
              bgGradient="linear(to-r, rgba(204, 204, 204, 0.1), rgba(204, 204, 204, 0.05))"
            >
              <FighterHeader fighterType={renderSelectedFighter.status} fighterData={renderSelectedFighter} />
              <FighterStatList fighterStatistics={getFighterStatistics(renderSelectedFighter)} slim />
            </VStack>
          ) : (
            <Heading>Select a fighter to fight from Gym</Heading>
          )}
          <Flex
            flexDirection="column"
            w="48.125rem"
            h="2054px"
            px="1.5rem"
            bgGradient="linear(to-r, rgba(204, 204, 204, 0.1), rgba(204, 204, 204, 0.05))"
          ></Flex>
        </Flex>
        {/* <Grid h="600px" templateRows="repeat(1, 1fr)" templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem colSpan={1} bg="tomato"></GridItem>
          <GridItem colSpan={2} bg="papayawhip"></GridItem>
        </Grid> */}
      </Container>
    </Box>
  );
}
