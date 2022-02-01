/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Grid, Container, Stack, VStack, Box } from '@chakra-ui/react';
import { useMoralisWeb3Api, useMoralis } from 'react-moralis';
import { useEthers } from '@usedapp/core';

import { getNFTs, transformFighterMetadata } from '../../utils/web3/moralis';

import GymTile from '../gymTile';
import GymHeader from '../gymHeader';
import FighterSelection from '../fighterSelection';

export default function Gym() {
  const { Moralis, isInitialized, isInitializing } = useMoralis();
  const { account } = useEthers();
  const Web3Api = useMoralisWeb3Api();

  const [nftUris, setNftUris] = useState({});
  const [rawFightersMeta, setRawFightersMeta] = useState([]);
  const [refinedFightersMeta, setRefinedFightersMeta] = useState([]);
  const [nftCount, setNftCount] = useState(0);
  const [activeFighters, setActiveFighters] = useState(0);
  const [retiredFighters, setRetiredFighters] = useState(0);
  const [activeFightRecord, setActiveFightRecord] = useState('0-0');
  const [overallFightRecord, setOverallFightRecord] = useState('0-0');
  const [tkoTotal, setTkoTotal] = useState(0);
  const [championshipsHeld, setChampionshipsHeld] = useState(0);

  useEffect(() => {
    (async function () {
      if (isInitialized && account) {
        const nfts = await getNFTs(Web3Api, account);
        setRawFightersMeta(nfts);
        // console.log(nfts);
        setNftCount(nfts.length);
        // setNftUris(nfts);
      }
    })();
  }, [isInitialized, account]);

  useEffect(() => {
    if (rawFightersMeta.length > 0) {
      // console.log(rawFightersMeta);
      const result = transformFighterMetadata(rawFightersMeta);
      setRefinedFightersMeta(result);
      // console.log(result);
    }
  }, [rawFightersMeta]);

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

          {/* Pass in refined fighter metadata */}
          {refinedFightersMeta.length > 0 ? <FighterSelection refinedFightersMeta={refinedFightersMeta} /> : null}
        </VStack>
      </Container>
    </Box>
  );
}
