/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Grid, Container, Stack, VStack, Box, Alert, AlertIcon, Skeleton } from '@chakra-ui/react';
import { useMoralisWeb3Api, useMoralis } from 'react-moralis';
import { useEthers } from '@usedapp/core';

import { getTKOBalance } from '../../utils/web3/moralis';

import GymTile from '../gymTile';
import GymHeader from '../gymHeader';
import FighterSelection from '../fighterSelection';
import { FighterInfo } from '../../types';
import { useQuery } from 'react-query';
import { gymApi } from '../../modules/gym/gym-api';
import Moralis from 'moralis/types';

export default function Gym() {
  const { isInitialized, isInitializing, Moralis, account: userAccount } = useMoralis();
  const [isLoaded, setIsLoaded] = useState(false);
  const { account } = useEthers();
  const Web3Api: Moralis.Web3API = useMoralisWeb3Api();

  const [retiredFighters, setRetiredFighters] = useState(0);
  const [activeFightRecord, setActiveFightRecord] = useState('0-0');
  const [overallFightRecord, setOverallFightRecord] = useState('0-0');
  const [tkoTotal, setTkoTotal] = useState('0');
  const [championshipsHeld, setChampionshipsHeld] = useState(0);

  const { data: activeFighters, isLoading } = useQuery<FighterInfo[], Error>(
    ['gymFighters', userAccount, { filter: 'active' }],
    async () => {
      const fighters: FighterInfo[] = await gymApi.getGymFighterNFTs(Web3Api, userAccount);
      return fighters;
    }
  );
  console.log('React Query Fighters: ', activeFighters);

  useEffect(() => {
    (async function () {
      if (isInitialized && account && !isLoaded) {

        const tko = await getTKOBalance(Moralis, account);
        const tkoWei: number = +Moralis.Units.FromWei(tko.toString());
        setTkoTotal(Intl.NumberFormat('en-US').format(tkoWei));
        setIsLoaded(true);
      }
    })();
  }, [isInitialized, account]);

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
              <Skeleton isLoaded={!isLoading}>
                <GymTile datanumber={activeFighters ? activeFighters.length : 0} dataname="Active Fighters" />
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <GymTile datanumber={activeFightRecord} dataname="Active Fight Record" />
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <GymTile datanumber={tkoTotal} dataname="$TKO Tokens" />
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <GymTile datanumber={retiredFighters} dataname="Retired Fighters" />
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <GymTile datanumber={overallFightRecord} dataname="Overall Fight Record" />
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <GymTile datanumber={championshipsHeld} dataname="Championships Held" />
              </Skeleton>
            </Grid>

            {/* Pass in refined fighter metadata */}
            <FighterSelection
              gymFighters={activeFighters ? activeFighters : []}
              loadingGymFitghers={isLoading}
            />
          </VStack>
        </Container>
      </div>
    </Box>
  );
}
