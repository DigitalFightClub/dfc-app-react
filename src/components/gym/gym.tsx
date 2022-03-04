/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Grid, Container, Stack, VStack, Box, Alert, AlertIcon } from '@chakra-ui/react';
import { useMoralisWeb3Api, useMoralis, useERC20Balances } from 'react-moralis';
import { useEthers } from '@usedapp/core';

import LoadingScreen from 'react-loading-screen';

import { getNFTs, transformFighterMetadata, getTKOBalance } from '../../utils/web3/moralis';

import GymTile from '../gymTile';
import GymHeader from '../gymHeader';
import FighterSelection from '../fighterSelection';
import Moralis from 'moralis/types';

export default function Gym() {
  const { isInitialized, isInitializing, Moralis } = useMoralis();
  const [ isLoaded, setIsLoaded ] = useState(false);
  const { account } = useEthers();
  const Web3Api = useMoralisWeb3Api();

  const [rawFightersMeta, setRawFightersMeta] = useState([]);
  const [refinedFightersMeta, setRefinedFightersMeta] = useState([]);
  const [nftCount, setNftCount] = useState(0);
  const [activeFighters, setActiveFighters] = useState(0);
  const [retiredFighters, setRetiredFighters] = useState(0);
  const [activeFightRecord, setActiveFightRecord] = useState('0-0');
  const [overallFightRecord, setOverallFightRecord] = useState('0-0');
  const [tkoTotal, setTkoTotal] = useState('0');
  const [championshipsHeld, setChampionshipsHeld] = useState(0);

  const { fetchERC20Balances, data, isLoading, isFetching, error } = useERC20Balances();

  useEffect(() => {
    (async function () {
      if (isInitialized && account && !isLoaded) {
        const nfts = await getNFTs(Web3Api, account);
        const tko = await getTKOBalance(Moralis, account);
        const tkoWei: number = +Moralis.Units.FromWei(tko.toString());
        setTkoTotal(Intl.NumberFormat('en-US').format(tkoWei));
        setRawFightersMeta(nfts);
        // console.log(nfts);
        setNftCount(nfts.length);
        setIsLoaded(true);
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
      {/* <div style={{ display: !isInitializing ? 'none' : 'block' }} className='loadingScreen'>
        <VStack spacing="3rem" minW="100%">
          <LoadingScreen
            loading={true}
            bgColor='#000000'
            spinnerColor='#FF0000'
            textColor='#676767'
            logoSrc='images/webclip.png'
            text={'👊👊👊 Loading DFC NFTs 👊👊👊'}
          />
        </VStack>
      </div> */}
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
              <GymTile datanumber={nftCount} dataname="Active Fighters" />
              <GymTile datanumber={activeFightRecord} dataname="Active Fight Record" />
              <GymTile datanumber={tkoTotal} dataname="$TKO Tokens" />
              <GymTile datanumber={retiredFighters} dataname="Retired Fighters" />
              <GymTile datanumber={overallFightRecord} dataname="Overall Fight Record" />
              <GymTile datanumber={championshipsHeld} dataname="Championships Held" />
            </Grid>

            {/* <Stack spacing={3}>
              <Alert status='error'>
                <AlertIcon />
                There was an error processing your request
              </Alert>

              <Alert status='success'>
                <AlertIcon />
                Data uploaded to the server. Fire on!
              </Alert>

              <Alert status='warning'>
                <AlertIcon />
                Seems your account is about expire, upgrade now
              </Alert>

              <Alert status='info'>
                <AlertIcon />
                Chakra is going live on August 30th. Get ready!
              </Alert>
            </Stack> */}

            {/* Pass in refined fighter metadata */}
            {refinedFightersMeta.length > 0 ? <FighterSelection refinedFightersMeta={refinedFightersMeta} /> : null}
          </VStack>
        </Container>
      </div>
    </Box>
  );
}
