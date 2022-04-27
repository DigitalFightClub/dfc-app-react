import { Divider, Flex, Box, Text, Center, Spacer } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { SET_FIGHT_RESULTS } from '../../config/events';
import { FightHistoryBrief, MatchResult } from '../../types';
import { dfcAction } from '../../types/actions';
import FighterAvatar from './fighterAvatar';

export interface FighterHistoryRowProps {
  fightHistoryBrief: FightHistoryBrief;
}

export default function FighterHistoryRow({ fightHistoryBrief }: FighterHistoryRowProps) {
  const dispatch = useDispatch();

  const handleResults = () => {
    dispatch(
      dfcAction(SET_FIGHT_RESULTS, {
        data: fightHistoryBrief,
        msg: '',
      })
    );
  };

  // console.log('Fight timestamp', fightHistoryBrief.timestamp);
  const fightDate: Date = new Date(fightHistoryBrief.timestamp * 1000);
  const formatted_fightDate: string = fightDate.toLocaleString('en-US', {
    // timeZoneName: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
  // console.log('Fight Date', formatted_fightDate);

  return (
    <Flex maxWidth="350px" minWidth="350px" flexDir="column" _hover={{ cursor: 'pointer' }}>
      <div
        style={{
          width: '100%',
          backgroundImage: '/assets/background.svg',
          background:
            MatchResult.WIN === fightHistoryBrief.matchResult ? 'rgba(42, 187,117, .07)' : 'rgba(223, 33, 81, .07)',
          borderRadius: '5px',
          // boxShadow: '0px 0px 40px -5px #2ABB75',
          borderWidth: '0px',
        }}
        onClick={handleResults}
      >
        <Flex w="100%">
          <Box py="1" pl="1" pr="1">
            <FighterAvatar
              fighterImage={fightHistoryBrief.challengerImage}
              isWinner={MatchResult.WIN === fightHistoryBrief.matchResult}
              isChallenger={true}
            />
          </Box>
          <Center py="1" pl="1" maxWidth="74px">
            <Text size="xs" fontFamily="Sora" fontWeight="regular" fontSize="14px">
              {fightHistoryBrief.challengerName}
            </Text>
          </Center>
          <Spacer />
          <Center>
            <Text size="sm" fontFamily="Sora" fontWeight="regular">
              VS
            </Text>
          </Center>
          <Spacer />
          <Center py="1" pr="1" textAlign="right" maxWidth="74px">
            <Text size="xs" fontFamily="Sora" fontWeight="regular" fontSize="14px">
              {fightHistoryBrief.opponentName}
            </Text>
          </Center>
          <Box py="1" pl="1" pr="1">
            <FighterAvatar
              fighterImage={fightHistoryBrief.opponentImage}
              isWinner={MatchResult.LOSS === fightHistoryBrief.matchResult}
              isChallenger={false}
            />
          </Box>
        </Flex>
        <Flex w="100%">
          <Center p="1">
            <Text size="sm" fontFamily="Sora" fontWeight="light" fontSize="14px">
              {formatted_fightDate}
            </Text>
          </Center>
          <Spacer />
          <Center p="1">
            <Text size="sm" fontFamily="Sora" fontWeight="light" fontSize="14px">
              DETAILS:{' '}
              {fightHistoryBrief && fightHistoryBrief.fightResults ? fightHistoryBrief.fightResults.outcome : ''}
            </Text>
          </Center>
        </Flex>
      </div>
      <Divider pt="2px" />
    </Flex>
  );
}
