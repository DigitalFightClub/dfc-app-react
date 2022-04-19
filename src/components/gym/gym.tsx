/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Grid, Container, Stack, VStack, Box, Skeleton } from '@chakra-ui/react';
import { useMoralisWeb3Api, useMoralis } from 'react-moralis';

import GymTile from '../gymTile';
import GymHeader from '../gymHeader';
import FighterSelection from '../fighterSelection';
import Moralis from 'moralis/types';
import { useTKOBalance } from '../../hooks/tko.hooks';
import { useGymFighters } from '../../hooks/fighter.hooks';

export default function Gym() {
  const { isInitializing, account: userAccount } = useMoralis();
  const Web3Api: Moralis.Web3API = useMoralisWeb3Api();

  const [retiredFighters, setRetiredFighters] = useState(0);
  const [activeFightRecord, setActiveFightRecord] = useState('0-0');
  const [overallFightRecord, setOverallFightRecord] = useState('0-0');
  const [championshipsHeld, setChampionshipsHeld] = useState(0);

  const { data: tko = 0, isLoading: isTKOLoading } = useTKOBalance();
  const { data: activeFighters, isLoading: isGymFightersLoading } = useGymFighters();
  console.log('React Query Fighters: ', activeFighters);

  return (
    <Box>
      <div style={{ display: isInitializing ? 'none' : 'block' }} className="loadingScreen">
        <Container maxW={{ xl: '100ch', lg: '80ch', md: '80ch', sm: '60ch' }} my="1rem">
          <Stack justifyContent="flex-start" my="40px">
            <GymHeader />
          </Stack>

          <VStack spacing="3rem" minW="100%">
            <Grid
              templateColumns={{
                xl: 'repeat(3, 370px)',
                lg: 'repeat(3, 1fr)',
                md: 'repeat(auto-fit, 3, 1fr)',
                sm: 'repeat(2, 1fr)',
                base: '1fr',
              }}
              gap="30px"
              justifyContent="center"
            >
              <Skeleton isLoaded={!isGymFightersLoading}>
                <GymTile datanumber={activeFighters ? activeFighters.length : 0} dataname="Active Fighters" />
              </Skeleton>
              <Skeleton isLoaded={!isGymFightersLoading}>
                <GymTile datanumber={activeFightRecord} dataname="Active Fight Record" />
              </Skeleton>
              <Skeleton isLoaded={!isTKOLoading}>
                <GymTile datanumber={tko} dataname="$TKO Tokens" />
              </Skeleton>
              <Skeleton isLoaded={!isGymFightersLoading}>
                <GymTile datanumber={retiredFighters} dataname="Retired Fighters" />
              </Skeleton>
              <Skeleton isLoaded={!isGymFightersLoading}>
                <GymTile datanumber={overallFightRecord} dataname="Overall Fight Record" />
              </Skeleton>
              <Skeleton isLoaded={!isGymFightersLoading}>
                <GymTile datanumber={championshipsHeld} dataname="Championships Held" />
              </Skeleton>
            </Grid>

            {/* Pass in refined fighter metadata */}
            <FighterSelection
              gymFighters={activeFighters ? activeFighters : []}
              loadingGymFitghers={isGymFightersLoading}
            />
          </VStack>
        </Container>
      </div>
    </Box>
  );
}
