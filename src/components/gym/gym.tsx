/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Grid, Container, Stack, VStack, Box, Alert, AlertIcon, Skeleton } from '@chakra-ui/react';
import { useMoralisWeb3Api, useMoralis } from 'react-moralis';
import { useEthers } from '@usedapp/core';

import { getTKOBalance } from '../../utils/web3/moralis';

import GymTile from '../gymTile';
import GymHeader from '../gymHeader';
import FighterSelection from '../fighterSelection';
import { RouteComponentProps } from 'react-router';
import { AppState, FighterInfo } from '../../types';
import { GET_GYM_FIGHTERS_REQUEST } from '../../config/events';
import { dfcAction } from '../../types/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Gym() {
  const { isInitialized, isInitializing, Moralis } = useMoralis();
  const [isLoaded, setIsLoaded] = useState(false);
  const { account } = useEthers();
  const Web3Api = useMoralisWeb3Api();

  // Redux Hooks
  const { gymFighters, loadingGymFighters, getGymFightersError } = useSelector((state: AppState) => state.gymState);
  const dispatch = useDispatch();

  const [renderGymFighters, setRenderGymFighters] = useState<FighterInfo[]>([]);
  const [nftCount, setNftCount] = useState(0);
  const [activeFighters, setActiveFighters] = useState(0);
  const [retiredFighters, setRetiredFighters] = useState(0);
  const [activeFightRecord, setActiveFightRecord] = useState('0-0');
  const [overallFightRecord, setOverallFightRecord] = useState('0-0');
  const [tkoTotal, setTkoTotal] = useState('0');
  const [championshipsHeld, setChampionshipsHeld] = useState(0);

  useEffect(() => {
    (async function () {
      if (isInitialized && account && !isLoaded) {
        dispatch(
          dfcAction(GET_GYM_FIGHTERS_REQUEST, {
            data: { web3Api: Web3Api, address: account },
          })
        );

        const tko = await getTKOBalance(Moralis, account);
        const tkoWei: number = +Moralis.Units.FromWei(tko.toString());
        setTkoTotal(Intl.NumberFormat('en-US').format(tkoWei));
        setIsLoaded(true);
      }
    })();
  }, [isInitialized, account]);

  useEffect(() => {
    if (gymFighters) {
      console.log('Got Gym Fighters', JSON.stringify(gymFighters));
      const newGymFighters: FighterInfo[] = [...gymFighters];
      setRenderGymFighters(newGymFighters);
      setNftCount(newGymFighters.length);
    }
  }, [gymFighters]);

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
              <Skeleton isLoaded={!loadingGymFighters}>
                <GymTile datanumber={nftCount} dataname="Active Fighters" />
              </Skeleton>
              <Skeleton isLoaded={!loadingGymFighters}>
                <GymTile datanumber={activeFightRecord} dataname="Active Fight Record" />
              </Skeleton>
              <Skeleton isLoaded={!loadingGymFighters}>
                <GymTile datanumber={tkoTotal} dataname="$TKO Tokens" />
              </Skeleton>
              <Skeleton isLoaded={!loadingGymFighters}>
                <GymTile datanumber={retiredFighters} dataname="Retired Fighters" />
              </Skeleton>
              <Skeleton isLoaded={!loadingGymFighters}>
                <GymTile datanumber={overallFightRecord} dataname="Overall Fight Record" />
              </Skeleton>
              <Skeleton isLoaded={!loadingGymFighters}>
                <GymTile datanumber={championshipsHeld} dataname="Championships Held" />
              </Skeleton>
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
            {/* {renderGymFighters.length > 0 ? ( */}
            <FighterSelection gymFighters={renderGymFighters} loadingGymFitghers={loadingGymFighters} />
            {/* ) : null} */}
          </VStack>
        </Container>
      </div>
    </Box>
  );
}
