/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Grid, Container, Stack, VStack, Box } from '@chakra-ui/react';
import { useMoralisWeb3Api, useMoralis } from 'react-moralis';

import { getNFTs } from '../../utils/web3/moralis';

import GymTile from '../gymTile';
import GymHeader from '../gymHeader';
import FighterSelection from '../fighterSelection';

export default function Gym() {
  const { Moralis, isInitialized, isInitializing } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const [nftUris, setNftUris] = useState({});
  const [nftCount, setNftCount] = useState(0);
  const [activeFighters, setActiveFighters] = useState(0);
  const [retiredFighters, setRetiredFighters] = useState(0);
  const [activeFightRecord, setActiveFightRecord] = useState('0-0');
  const [overallFightRecord, setOverallFightRecord] = useState('0-0');
  const [tkoTotal, setTkoTotal] = useState(0);
  const [championshipsHeld, setChampionshipsHeld] = useState(0);

  useEffect(() => {
    (async function () {
      if (isInitialized) {
        const nfts = await getNFTs(Web3Api);
        setNftCount(nfts.length);
        setNftUris(nfts);
      }
    })();
  }, [isInitialized]);

  return (
    <Box>
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
            <GymTile datanumber={nftCount} dataname="Active Fighters" />
            <GymTile datanumber={activeFightRecord} dataname="Active Fight Record" />
            <GymTile datanumber={tkoTotal} dataname="$TKO Tokens" />
            <GymTile datanumber={retiredFighters} dataname="Retired Fighters" />
            <GymTile datanumber={overallFightRecord} dataname="Overall Fight Record" />
            <GymTile datanumber={championshipsHeld} dataname="Championships Held" />
          </Grid>

          {/* Pass in URLS to fetch */}
          {nftUris ? <FighterSelection nftUris={nftUris} /> : null}
        </VStack>
      </Container>
    </Box>
  );
}
