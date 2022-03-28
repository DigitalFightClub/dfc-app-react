import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_FIGHTER_HISTORY_REQUEST } from '../../config/events';
import { AppState, FighterInfo, FightHistoryBrief } from '../../types';
import { dfcAction } from '../../types/actions';
import PagButton from '../pageButton/pagebutton';
import FighterHistoryRow from './fighterHistoryRow';

export interface FighterHistoryProps {
  fighterData: FighterInfo;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FighterHistory({ fighterData }: FighterHistoryProps) {
  // Redux Hooks
  const { fighterHistory, loadingFighterHistory, getFighterHistoryError } = useSelector((state: AppState) => {
    console.log(state);
    return state.fightHistoryState;
  });
  const dispatch = useDispatch();

  // component state
  const [renderFighterHistory, setRenderFighterHistory] = useState<FightHistoryBrief[]>([]);

  useEffect(() => {
    (async function () {
      console.log('Fetch fighter history', fighterData);
      if (fighterData) {
        dispatch(
          dfcAction(GET_FIGHTER_HISTORY_REQUEST, {
            data: { fighterData },
          })
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (fighterHistory) {
      console.log('Got Fighter History', JSON.stringify(fighterHistory));
      const newFighterHsitory: FightHistoryBrief[] = [...fighterHistory];
      setRenderFighterHistory(newFighterHsitory);
    }
  }, [fighterHistory]);

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
