import { ArrowBackIcon } from '@chakra-ui/icons';
import _ from 'lodash';

import { chakra, Box, Text, VStack, HStack, Wrap, Center, Flex, Image, Progress } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FIGHTER_DETAILS } from '../../config/events';
import { AppState, MatchResult, Round } from '../../types';
import { dfcAction } from '../../types/actions';
import FighterVerticalDetails from './fighterVerticalDetails';
import { useFighter } from '../../hooks/fighter.hooks';
import { useSingleFightResult } from '../../hooks/history.hooks';

export default function FighterResultModal() {
  const { selectedFightResult } = useSelector((state: AppState) => state.fightHistoryState);
  let fighterId = 0;
  let matchId: string | null = null;
  if (selectedFightResult) {
    // console.log('selectedFightResult', selectedFightResult);
    fighterId = selectedFightResult.fighterId;
    matchId = selectedFightResult.matchId;
  }
  const { data: fightResult, isLoading: singleFightResultLoading } = useSingleFightResult(fighterId, matchId);
  const dispatch = useDispatch();

  const { data: challengerFighter } = useFighter(_.get(fightResult, ['challengerId'], 0));
  const { data: opponentFighter } = useFighter(_.get(fightResult, ['opponentId'], 0));

  const handleBack = () => {
    dispatch(dfcAction(SET_FIGHTER_DETAILS, {}));
  };

  const buildRound = (round: Round, challengerName: string, opponentName: string): React.ReactElement => {
    return (
      <>
        <Text fontFamily="Sora" fontWeight="normal" fontSize="16px">
          {challengerName}:{' '}
          <chakra.span
            display="inline"
            color={round.challengerScore > round.opponentScore ? 'primary.500' : 'secondary.500'}
          >
            {round.challengerScore}
          </chakra.span>
        </Text>
        <Text fontFamily="Sora" fontWeight="normal" fontSize="16px">
          {opponentName}:{' '}
          <chakra.span
            display="inline"
            color={round.opponentScore > round.challengerScore ? 'primary.500' : 'secondary.500'}
          >
            {round.opponentScore}
          </chakra.span>
        </Text>
      </>
    );
  };

  let winnerBanner: React.ReactElement | null = null;
  if (fightResult) {
    if (fightResult.winnerId === fightResult.challengerId) {
      winnerBanner = (
        <Text
          textAlign={{
            xl: 'left',
            lg: 'left',
            md: 'left',
            sm: 'center',
            base: 'center',
          }}
          fontFamily="Sora"
          fontWeight="semibold"
          fontSize="24px"
        >
          <chakra.span display="inline" color="primary.500">
            {fightResult.challengerName}
          </chakra.span>
          {fightResult.challengerCountryCode ? (
            <chakra.span ml="10px" className={`fi fi-${fightResult.challengerCountryCode.toLowerCase()}`} />
          ) : null}
        </Text>
      );
    } else {
      winnerBanner = (
        <Text
          textAlign={{
            xl: 'left',
            lg: 'left',
            md: 'left',
            sm: 'center',
            base: 'center',
          }}
          fontFamily="Sora"
          fontWeight="semibold"
          fontSize="24px"
        >
          <chakra.span display="inline" color="primary.500">
            {fightResult.opponentName}
          </chakra.span>
          {fightResult.opponentCountryCode ? (
            <chakra.span ml="10px" className={`fi fi-${fightResult.opponentCountryCode.toLowerCase()}`} />
          ) : null}
        </Text>
      );
    }
  }

  // Build Rounds
  let roundElements: React.ReactElement[] | null = null;
  if (fightResult && fightResult.fightResults && fightResult.fightResults.rounds) {
    roundElements = fightResult.fightResults.rounds.map((round: Round) => (
      <VStack key={round.roundNumber} alignItems="flex-start">
        <Text fontFamily="Sora" fontWeight="semibold" fontSize="20px">
          Round {round.roundNumber} {round.stoppage ? '- Stoppage' : ''}
        </Text>
        <VStack
          w="19rem"
          h="6.5rem"
          p=".5rem"
          gap=".2rem"
          alignItems="flex-start"
          justifyContent="center"
          bg="linear-gradient(95.1deg, rgba(204, 204, 204, 0.1) 0%, rgba(204, 204, 204, 0.05) 101.67%)"
        >
          {round.afterStoppage ? (
            <Flex flexDir="column" alignSelf="center">
              <Text fontFamily="Sora" fontWeight="semibold" fontSize="20px">
                -
              </Text>
            </Flex>
          ) : (
            buildRound(round, fightResult.challengerName, fightResult.opponentName)
          )}
        </VStack>
      </VStack>
    ));
  }

  let formatted_fightDate: string | null = null;
  if (fightResult) {
    const fightDate: Date = new Date(fightResult.timestamp * 1000);
    formatted_fightDate = fightDate.toLocaleString('en-US', {
      timeZoneName: 'short',
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <Box position="relative" overflow="hidden" w="1024px" h="733">
      {singleFightResultLoading ? (
        <Center>
          <Progress w="300px" hasStripe size="xs" isIndeterminate colorScheme="green" />
        </Center>
      ) : (
        <>
          {fightResult?.matchResult === MatchResult.WIN ? (
            <>
              <Image zIndex="-25" position="absolute" top="130px" right="325px" w="375px" src="/assets/win.svg" />
              <Box
                position="absolute"
                h="550px"
                w="550px"
                left="-400px"
                top="203px"
                bg="#2ABB75"
                opacity="0.5"
                filter="blur(404px)"
              />
              <Box
                position="absolute"
                h="550px"
                w="550px"
                left="1000px"
                top="203px"
                bg="#DF2151"
                opacity="0.5"
                filter="blur(404px)"
              />
            </>
          ) : (
            <>
              <Image zIndex="-25" position="absolute" top="130px" right="310px" w="400px" src="/assets/lose.svg" />
              <Box
                position="absolute"
                h="550px"
                w="550px"
                left="-400px"
                top="203px"
                bg="#DF2151"
                opacity="0.5"
                filter="blur(404px)"
              />
              <Box
                position="absolute"
                h="550px"
                w="550px"
                left="1000px"
                top="203px"
                bg="#2ABB75"
                opacity="0.5"
                filter="blur(404px)"
              />
            </>
          )}
          <Center
            w="40px"
            h="40px"
            m="5px"
            bg="white"
            color="black"
            _hover={{ color: 'white', bg: 'gray', cursor: 'pointer' }}
            onClick={handleBack}
          >
            <ArrowBackIcon />
          </Center>
          {fightResult ? (
            <VStack>
              <HStack>
                <FighterVerticalDetails
                  fighterId={fightResult.challengerId}
                  fighterImage={fightResult.challengerImage}
                  fighterName={fightResult.challengerName}
                  fighterStyle={fightResult.challengerStyle}
                  fighterCountryCode={_.get(challengerFighter, ['countryCode'], '')}
                  isCentered={true}
                />
                <VStack alignContent="center" gap="1rem" w="17rem">
                  {winnerBanner}
                  <Text fontFamily="Sora" fontWeight="semibold" fontSize="18px">
                    Winner By {fightResult.fightResults.outcome}
                  </Text>
                  <Text fontFamily="Sora" fontWeight="semibold" fontSize="18px">
                    {formatted_fightDate}
                  </Text>
                </VStack>
                <FighterVerticalDetails
                  fighterId={fightResult.opponentId}
                  fighterImage={fightResult.opponentImage}
                  fighterName={fightResult.opponentName}
                  fighterStyle={fightResult.opponentStyle}
                  fighterCountryCode={_.get(opponentFighter, ['countryCode'], '')}
                  isCentered={true}
                />
              </HStack>
              <Wrap pb="1rem" spacing="1rem" justify="center">
                {roundElements}
              </Wrap>
            </VStack>
          ) : (
            <Center>
              <p>Missing fight data</p>
            </Center>
          )}
        </>
      )}
    </Box>
  );
}
