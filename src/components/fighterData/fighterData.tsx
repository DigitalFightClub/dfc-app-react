import { chakra, Grid, Text, Heading, Flex, Tooltip, IconButton, Button } from '@chakra-ui/react';
import { AppState, FighterInfo, FighterStatus } from '../../types';
import { PunchIcon } from '../dfcIcons/PunchIcon';
import { FlexIcon } from '../dfcIcons/FlexIcon';
import { useHistory } from 'react-router';
import { dfcAction } from '../../types/actions';
import { SET_SELECTED_FIGHTER } from '../../config/events';
import { useDispatch, useSelector } from 'react-redux';
import FighterDataButtons from './fighterDataButtons';

export interface FighterDataProps {
  isTile?: boolean;
  fighterInfo: FighterInfo | null;
}

export default function FighterData({ isTile = false, fighterInfo: fighterData }: FighterDataProps) {
  const history = useHistory();

  // connect redux saga
  const { selectedFighter } = useSelector((state: AppState) => state.organizationState);
  const dispatch = useDispatch();

  const handleFight = () => {
    dispatch(
      dfcAction(SET_SELECTED_FIGHTER, {
        data: { fighterData },
      })
    );
    history.push('/orgs');
  };

  const handleChallenge = () => {
    console.log('challenged, time to show challenge modal');
  };

  return (
    <Grid templateRows="repeat(3, 30px)" textAlign="left" minH="180px" gap="11px">
      <Heading
        textAlign={{
          xl: 'left',
          lg: 'left',
          md: 'left',
          sm: 'center',
          base: 'center',
        }}
        variant="header3"
      >
        {fighterData ? fighterData.name : ''}
        {fighterData && fighterData.countryCode ? (
          <chakra.span ml="10px" className={`fi fi-${fighterData.countryCode.toLowerCase()}`} />
        ) : null}
      </Heading>

      <Flex direction="row" justify={{ base: 'center', md: 'left' }}>
        <Heading
          variant="header4"
          mr=".5rem"
          textAlign={{
            xl: 'left',
            lg: 'left',
            md: 'left',
            sm: 'center',
            base: 'center',
          }}
          whiteSpace="nowrap"
        >
          Record:
          <chakra.span display="inline" color="primary.500">
            &nbsp;
            {fighterData ? fighterData.wins : 0}
          </chakra.span>
          {'-'}
          <chakra.span display="inline" color="secondary.500">
            {fighterData ? fighterData.loses : 0}
          </chakra.span>
        </Heading>

        <FighterDataButtons
          isTile={isTile}
          isOwned={fighterData ? fighterData.isOwned : false}
          challengeState={fighterData ? fighterData.challengeState : null}
          handleFight={handleFight}
          handleChallenge={handleChallenge}
        />
      </Flex>

      <Grid
        mt="1rem"
        templateColumns={{
          xl: '1',
          lg: '1fr',
          md: '1fr',
          sm: 'repeat(2, 1fr)',
          base: 'repeat(2, 1fr)',
        }}
        gap="11px"
      >
        <Text variant="micro">
          HEIGHT:&nbsp;&nbsp;
          <chakra.span display="inline">{fighterData ? fighterData.height : ''}</chakra.span>
        </Text>

        <Text variant="micro">
          WEIGHT:&nbsp;&nbsp;
          <chakra.span display="inline">{fighterData ? fighterData.weight : ''}</chakra.span>
        </Text>

        <Text variant="micro">
          GENDER:&nbsp;&nbsp;
          <chakra.span display="inline">{fighterData ? fighterData.gender : ''}</chakra.span>
        </Text>

        <Text variant="micro">
          RECRUITED:&nbsp;&nbsp;
          <chakra.span display="inline">{fighterData ? fighterData.recruited : ''}</chakra.span>
        </Text>

        <Text variant="micro">
          STATUS:&nbsp;&nbsp;
          <chakra.span
            display="inline"
            fontWeight="400"
            color={fighterData && fighterData.status === FighterStatus.ACTIVE ? 'green' : 'red'}
          >
            {fighterData ? fighterData.status : FighterStatus.RETIRED}
          </chakra.span>
        </Text>
      </Grid>
    </Grid>
  );
}
