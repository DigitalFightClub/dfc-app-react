import { Box, Container, Flex, Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState, ChallengeState, FighterInfo, OrganizationInfo } from '../../types';
import getFighterStatistics from '../fighterStatistics/fighterStatistics';
import FighterStatList from '../fighterStats/fighterStats';
import { FighterDetails } from './FighterDetails';
import OrgHeader from './OrgHeader';

export default function Organization() {
  // Redux Hooks
  const { selectedFighter, selectedOrg } = useSelector((state: AppState) => state.organizationState);

  const [renderSelectedFighter, setRenderSelectedFighter] = useState<FighterInfo | null>(null);
  const [renderSelectedOrg, setRenderSelectedOrg] = useState<OrganizationInfo | null>(null);

  useEffect(() => {
    (async function () {
      console.log('Fetch org fighters');

      if (selectedFighter) {
        const newSelectedFighter: FighterInfo = {
          ...selectedFighter,
          fighterId: parseInt(selectedFighter.image.split('/')[4].split('.')[0]),
          challengeState: ChallengeState.CHALLENGED,
          isOwned: true,
        };
        setRenderSelectedFighter(newSelectedFighter);
      }

      const newSelectedOrg: OrganizationInfo = {
        orgIcon: '/assets/red-dragon-gym.svg',
        orgName: 'RED DRAGON',
        orgCategory: 'Middleweight Category',
        orgFighters: [
          {
            fighterId: 2,
            name: 'Bastian Bender',
            image: 'https://mainnet.api.digitalfightclub.io/renderedFighter/2.png',
            wins: '0',
            loses: '0',
            status: 'Active',
            recruited: '11/30/2021',
            gender: 'male',
            height: '5\'6"',
            country: 'Germany',
            weight: '136 lbs',
            stats: {
              power: 37,
              speed: 14,
              strength: 57,
              balance: 34,
              conditioning: 30,
              flexibility: 52,
              reflex: 66,
              footwork: 44,
              bjj: 56,
              judo: 63,
              karate: 72,
              kickboxing: 67,
              mauyThai: 24,
              sambo: 35,
              taekwondo: 54,
              wrestling: 48,
            },
            isOwned: true,
            challengeState: ChallengeState.CHALLENGING,
          },
          {
            fighterId: 4,
            name: 'Tu Nguoi',
            image: 'https://mainnet.api.digitalfightclub.io/renderedFighter/4.png',
            wins: '0',
            loses: '0',
            status: 'Active',
            recruited: '11/30/2021',
            gender: 'male',
            height: '5\'0"',
            country: 'Vietnam',
            weight: '114 lbs',
            stats: {
              power: 72,
              speed: 56,
              strength: 40,
              balance: 32,
              conditioning: 56,
              flexibility: 42,
              reflex: 44,
              footwork: 73,
              bjj: 63,
              judo: 94,
              karate: 51,
              kickboxing: 23,
              mauyThai: 40,
              sambo: 69,
              taekwondo: 17,
              wrestling: 83,
            },
            isOwned: true,
            challengeState: ChallengeState.AVAILABLE,
          },
          {
            fighterId: 5,
            name: 'Rubal Popova',
            image: 'https://mainnet.api.digitalfightclub.io/renderedFighter/5.png',
            wins: '0',
            loses: '0',
            status: 'Active',
            recruited: '11/30/2021',
            gender: 'male',
            height: '5\'9"',
            country: 'Ukraine',
            weight: '172 lbs',
            stats: {
              power: 59,
              speed: 37,
              strength: 56,
              balance: 60,
              conditioning: 63,
              flexibility: 29,
              reflex: 38,
              footwork: 40,
              bjj: 62,
              judo: 77,
              karate: 68,
              kickboxing: 60,
              mauyThai: 70,
              sambo: 19,
              taekwondo: 27,
              wrestling: 41,
            },
            isOwned: true,
            challengeState: ChallengeState.AVAILABLE,
          },
          {
            fighterId: 8,
            name: 'Awaiza Sarwar',
            image: 'https://mainnet.api.digitalfightclub.io/renderedFighter/8.png',
            wins: '0',
            loses: '0',
            status: 'Active',
            recruited: '11/30/2021',
            gender: 'female',
            height: '5\'7"',
            country: 'Pakistan',
            weight: '175 lbs',
            stats: {
              power: 20,
              speed: 24,
              strength: 62,
              balance: 48,
              conditioning: 78,
              flexibility: 35,
              reflex: 86,
              footwork: 64,
              bjj: 45,
              judo: 69,
              karate: 43,
              kickboxing: 69,
              mauyThai: 72,
              sambo: 68,
              taekwondo: 92,
              wrestling: 38,
            },
            isOwned: true,
            challengeState: ChallengeState.CHALLENGED,
          },
          {
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
            isOwned: true,
            challengeState: ChallengeState.AVAILABLE,
          },
        ],
      };
      setRenderSelectedOrg(newSelectedOrg);
    })();
  }, [selectedFighter, selectedOrg]);

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
              <FighterDetails fighterType={renderSelectedFighter.status} fighterData={renderSelectedFighter} />
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
          <OrgHeader
            orgIcon={renderSelectedOrg?.orgIcon}
            orgName={renderSelectedOrg?.orgName}
            orgCategory={renderSelectedOrg?.orgCategory}
            selectedFighterName={renderSelectedFighter?.name}
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
