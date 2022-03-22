import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, useColorModeValue, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_FIGHTER_HISTORY_REQUEST } from '../../config/events';
import { AppState, FightHistoryBrief } from '../../types';
import { dfcAction } from '../../types/actions';
import FighterHistoryRow from './fighterHistoryRow';

export interface FighterHistoryProps {
  fighterId: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FighterHistory({ fighterId }: FighterHistoryProps) {
  // Redux Hooks
  const { fighterHistory, loadingFighterHistory, getFighterHistoryError } = useSelector(
    (state: AppState) => {
      console.log(state);
      return state.fightHistoryState;
    }
  );
  const dispatch = useDispatch();

  // component state
  const [renderFighterHistory, setRenderFighterHistory] = useState<FightHistoryBrief[]>([]);

  useEffect(() => {
    (async function () {
      console.log('Fetch fighter history', fighterId);
      if (fighterId) {
        dispatch(
          dfcAction(GET_FIGHTER_HISTORY_REQUEST, {
            data: { fighterId },
          })
        );
      }
    })();
  }, [fighterId]);

  useEffect(() => {
    if (fighterHistory) {
      console.log('Got Fighter History', JSON.stringify(fighterHistory));
      const newFighterHsitory: FightHistoryBrief[] = [...fighterHistory];
      setRenderFighterHistory(newFighterHsitory);
    }
  }, [fighterHistory]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PagButton = (props: any) => {
    const activeStyle = {
      bg: useColorModeValue('#252A34', '#EEF0F1'),
      color: useColorModeValue('white', 'black'),
    };

    return (
      <Button
        mx={1}
        px={1}
        py={1}
        rounded="md"
        border="1px solid #4C5058"
        color="#4C5058"
        bg={useColorModeValue('white', 'gray.800')}
        opacity={props.disabled && 0.6}
        _hover={!props.disabled && activeStyle}
        cursor={props.disabled && 'not-allowed'}
        {...(props.active && activeStyle)}
      >
        {props.children}
      </Button>
    );
  };

  return (
    <Box bg="rgba(0, 0, 0, 0.3)" py="24px" px={{ base: '0px', md: '40px' }} minH={{ base: '835px', md: '472px' }}>
      <Heading textAlign="center" variant="header3" fontWeight="semibold">
        Fight History
      </Heading>

      <VStack w="100%">
        {renderFighterHistory.map((match) => (
          <FighterHistoryRow key={match.matchId} fightHistoryBrief={match}></FighterHistoryRow>
        ))}
      </VStack>

      <Flex
        opacity="none"
        pt={15}
        pb={5}
        px={{ base: 10, md: 50 }}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Flex>
          <PagButton>
            <ArrowBackIcon />
          </PagButton>
          <PagButton active>1</PagButton>
          <PagButton>2</PagButton>
          <PagButton>3</PagButton>
          <PagButton>
            <ArrowForwardIcon />
          </PagButton>
        </Flex>
      </Flex>
    </Box>
  );
}
