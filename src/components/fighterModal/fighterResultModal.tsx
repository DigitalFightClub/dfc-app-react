import { ArrowBackIcon } from '@chakra-ui/icons';
import { chakra, Box, Text, VStack, HStack, Wrap, Center, Flex, Image } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FIGHTER_DETAILS } from '../../config/events';
import { AppState, MatchResult, Round } from '../../types';
import { dfcAction } from '../../types/actions';
import FighterVerticalDetails from './fighterVerticalDetails';

// export interface FighterResultModalProps {
//   fightBrief: FightHistoryBrief;
// }

export default function FighterResultModal() {
  const { selectedFightHistoryBrief } = useSelector((state: AppState) => state.fightHistoryState);
  const dispatch = useDispatch();

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
  if (selectedFightHistoryBrief) {
    if (selectedFightHistoryBrief.winnerId === selectedFightHistoryBrief.challengerId) {
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
            {selectedFightHistoryBrief.challengerName}
          </chakra.span>
          {selectedFightHistoryBrief.challengerCountryCode ? (
            <chakra.span
              ml="10px"
              className={`fi fi-${selectedFightHistoryBrief.challengerCountryCode.toLowerCase()}`}
            />
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
            {selectedFightHistoryBrief.opponentName}
          </chakra.span>
          {selectedFightHistoryBrief.opponentCountryCode ? (
            <chakra.span ml="10px" className={`fi fi-${selectedFightHistoryBrief.opponentCountryCode.toLowerCase()}`} />
          ) : null}
        </Text>
      );
    }
  }

  // Build Rounds
  let roundElements: React.ReactElement[] | null = null;
  if (
    selectedFightHistoryBrief &&
    selectedFightHistoryBrief.fightResults &&
    selectedFightHistoryBrief.fightResults.rounds
  ) {
    roundElements = selectedFightHistoryBrief.fightResults.rounds.map((round: Round) => (
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
            buildRound(round, selectedFightHistoryBrief.challengerName, selectedFightHistoryBrief.opponentName)
          )}
        </VStack>
      </VStack>
    ));
  }

  return (
    <Box position="relative" overflow="hidden" w="1024px" h="733">
      {selectedFightHistoryBrief?.matchResult === MatchResult.WIN ? (
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
      <Center w="40px" h="40px" m="5px" bg="white" color="black" onClick={handleBack}>
        <ArrowBackIcon />
      </Center>
      {selectedFightHistoryBrief ? (
        <VStack>
          <HStack>
            <FighterVerticalDetails
              fighterImage={selectedFightHistoryBrief.challengerImage}
              fighterName={selectedFightHistoryBrief.challengerName}
              fighterCountryCode={
                selectedFightHistoryBrief.challengerCountryCode ? selectedFightHistoryBrief.challengerCountryCode : ''
              }
              fighterWins={
                selectedFightHistoryBrief.challengerWins ? `${selectedFightHistoryBrief.challengerWins}` : '0'
              }
              fighterLosses={
                selectedFightHistoryBrief.challengerLoses ? `${selectedFightHistoryBrief.challengerLoses}` : '0'
              }
              isCentered={true}
            />
            <VStack alignContent="center" gap="1rem" w="17rem">
              {winnerBanner}
              <Text fontFamily="Sora" fontWeight="semibold" fontSize="18px">
                Winner By {selectedFightHistoryBrief.fightResults.outcome}
              </Text>
              <Text fontFamily="Sora" fontWeight="normal" fontSize="16px">
                Style: {selectedFightHistoryBrief.fightResults.winner_style}
              </Text>
            </VStack>
            <FighterVerticalDetails
              fighterImage={selectedFightHistoryBrief.opponentImage}
              fighterName={selectedFightHistoryBrief.opponentName}
              fighterCountryCode={
                selectedFightHistoryBrief.opponentCountryCode ? selectedFightHistoryBrief.opponentCountryCode : ''
              }
              fighterWins={selectedFightHistoryBrief.opponentWins ? `${selectedFightHistoryBrief.opponentWins}` : '0'}
              fighterLosses={
                selectedFightHistoryBrief.opponentLoses ? `${selectedFightHistoryBrief.opponentLoses}` : '0'
              }
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
    </Box>
  );
}
