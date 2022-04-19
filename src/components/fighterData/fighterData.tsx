import { chakra, Grid, Text, Heading, Flex, } from '@chakra-ui/react';
import { FighterInfo, FighterStatus } from '../../types';
import { useHistory } from 'react-router';
import { dfcAction } from '../../types/actions';
import { SET_SELECTED_FIGHTER } from '../../config/events';
import { useDispatch } from 'react-redux';
import FighterDataButtons from './fighterDataButtons';
import { useFighterRecord } from '../../hooks/fighter.hooks';

export interface FighterDataProps {
  isTile?: boolean;
  fighterInfo: FighterInfo;
  handleChallenge?: () => void;
}

export default function FighterData({ isTile = false, fighterInfo: fighterData, handleChallenge }: FighterDataProps) {
  const history = useHistory();
  const { data: fighterRecord } = useFighterRecord(fighterData.fighterId);

  // connect redux saga
  const dispatch = useDispatch();

  const handleFight = () => {
    dispatch(
      dfcAction(SET_SELECTED_FIGHTER, {
        data: { fighterData },
      })
    );
    history.push('/orgs');
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
            {fighterRecord ? fighterRecord.wins : 0}
          </chakra.span>
          {'-'}
          <chakra.span display="inline" color="secondary.500">
            {fighterRecord ? fighterRecord.losses : 0}
          </chakra.span>
        </Heading>

        
        <FighterDataButtons
          isTile={isTile}
          isOwned={fighterData.isOwned}
          fighterId={fighterData.fighterId}
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
