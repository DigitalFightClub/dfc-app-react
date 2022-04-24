import { Box, Image, Text, VStack, HStack, Button, Tooltip, Wrap, useToast, Skeleton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_CHALLENGE_MSG, CLEAR_ERROR_MSG, SET_CHALLENGE_REQUEST } from '../../config/events';
import { useFighterChallengeState } from '../../hooks/fighter.hooks';
import { AppState, ChallengeState, FighterInfo } from '../../types';
import { dfcAction } from '../../types/actions';
import FighterVerticalDetails from './fighterVerticalDetails';

export interface FighterChallengeModalProps {
  opponentData: FighterInfo;
  onClose: () => void;
}

export default function FighterChallengeModal({ opponentData, onClose }: FighterChallengeModalProps) {
  const { Moralis } = useMoralis();

  // redux hooks
  const { selectedFighter, fightingStyles, challengeInProgress, challengeMsg, errorMsg } = useSelector(
    (state: AppState) => state.organizationState
  );
  const dispatch = useDispatch();

  const selectedFighterId: number = selectedFighter ? selectedFighter.fighterId : 0;
  const { data: challengeState = ChallengeState.UNAVAILABLE } = useFighterChallengeState(
    selectedFighterId,
    opponentData.fighterId
  );
  console.log('Challenge Modal challengeState', challengeState, selectedFighterId, opponentData);

  const [selectedStyle, setSelectedStyle] = useState<number>(-1);

  // Chakra hooks
  const toast = useToast();

  // handle challenge feedback
  useEffect(() => {
    if (challengeMsg) {
      console.log('Toast challenge feedback', challengeMsg);
      toast({
        description: `${challengeMsg}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        onCloseComplete(): void {
          dispatch(dfcAction(CLEAR_CHALLENGE_MSG, {}));
          onClose();
        },
      });
    }
  }, [challengeMsg, dispatch, onClose, toast]);

  // handle challenge error
  useEffect(() => {
    if (errorMsg) {
      console.log('Toast challenge feedback', errorMsg);
      toast({
        description: `${errorMsg}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        onCloseComplete(): void {
          dispatch(dfcAction(CLEAR_ERROR_MSG, {}));
        },
      });
    }
  }, [errorMsg, dispatch, toast]);

  const handleChallenge = () => {
    if (selectedStyle >= 0) {
      console.log(
        // eslint-disable-next-line max-len
        `nft_id: ${selectedFighter?.fighterId}\nfighting_style: ${selectedStyle}\nopponent_id: ${opponentData.fighterId}`
      );

      dispatch(
        dfcAction(SET_CHALLENGE_REQUEST, {
          data: {
            fighterId: selectedFighter?.fighterId,
            opponentId: opponentData.fighterId,
            fightingStyle: selectedStyle,
            Moralis,
          },
        })
      );
    }
  };

  return (
    <Box position="relative" overflow="hidden" w="1024px" h="733">
      <Image zIndex="-25" position="absolute" top="55px" right="350px" w="325px" src="/assets/vs.svg" />
      {selectedFighter ? (
        <VStack>
          <HStack>
            <FighterVerticalDetails
              fighterId={selectedFighter.fighterId}
              fighterImage={selectedFighter.image}
              fighterName={selectedFighter.name}
              fighterStyle={''}
              fighterCountryCode={selectedFighter.countryCode}
              isCentered={true}
            />
            <VStack alignContent="center" gap="1.5rem" w="17rem">
              <Text>Proving Grounds</Text>
              <Text>Middleweight Category</Text>
              <Text>3 Rounds</Text>
              <Skeleton isLoaded={!challengeInProgress}>
                <Button
                  w="9rem"
                  h="2.2rem"
                  bg="#DF2151"
                  color="white"
                  mx=".5rem"
                  borderRadius="0"
                  aria-label="Challenge"
                  onClick={handleChallenge}
                  display={ChallengeState.AVAILABLE === challengeState ? 'flex' : 'none'}
                  disabled={selectedStyle < 0}
                >
                  Challenge
                </Button>
                <Button
                  w="9rem"
                  h="2.2rem"
                  bg="#2ABB75"
                  color="white"
                  mx=".5rem"
                  borderRadius="0"
                  aria-label="Accept"
                  onClick={handleChallenge}
                  display={ChallengeState.CHALLENGING === challengeState ? 'flex' : 'none'}
                  disabled={selectedStyle < 0}
                >
                  Accept
                </Button>
              </Skeleton>
            </VStack>
            <FighterVerticalDetails
              fighterId={opponentData.fighterId}
              fighterImage={opponentData.image}
              fighterName={opponentData.name}
              fighterStyle={''}
              fighterCountryCode={opponentData.countryCode}
              isCentered={true}
            />
          </HStack>
          <Skeleton isLoaded={!challengeInProgress}>
            <Wrap pb="1rem" spacing="1rem" justify="center">
              {fightingStyles.map((fightingStyle) => (
                <Tooltip
                  key={fightingStyle.styleId}
                  hasArrow
                  label={fightingStyle.description}
                  bg="gray.300"
                  color="black"
                >
                  <Button
                    w="13rem"
                    h="2.8rem"
                    bg="gray.600"
                    color="white"
                    mx="1.5rem"
                    borderRadius="0"
                    _hover={{ bg: '#F26322' }}
                    _active={{ bg: '#F26322' }}
                    isActive={selectedStyle === fightingStyle.styleId}
                    onClick={() => setSelectedStyle(fightingStyle.styleId)}
                  >
                    {fightingStyle.style}
                  </Button>
                </Tooltip>
              ))}
            </Wrap>
          </Skeleton>
        </VStack>
      ) : null}
    </Box>
  );
}
