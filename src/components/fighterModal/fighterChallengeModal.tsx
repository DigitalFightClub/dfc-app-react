import { Box, Image, Text, VStack, HStack, Button, Tooltip, Wrap, Skeleton, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FIGHT_RESULTS } from '../../config/events';
import { useChallengeFighter, useFighterChallengeState } from '../../hooks/fighter.hooks';
import { AppState, ChallengeFighterResponse, ChallengeState, FighterInfo } from '../../types';
import { dfcAction } from '../../types/actions';
import FighterVerticalDetails from './fighterVerticalDetails';

export interface FighterChallengeModalProps {
  opponentData: FighterInfo;
  onClose: () => void;
}

export default function FighterChallengeModal({ opponentData, onClose }: FighterChallengeModalProps) {
  const dispatch = useDispatch();
  const toast = useToast();

  const [selectedStyle, setSelectedStyle] = useState<number>(-1);

  // redux hooks
  const { selectedFighter, fightingStyles } = useSelector((state: AppState) => state.organizationState);

  const selectedFighterId: number = selectedFighter ? selectedFighter.fighterId : 0;
  const challengeFighter = useChallengeFighter();
  const { data: challengeState = ChallengeState.UNAVAILABLE } = useFighterChallengeState(
    selectedFighterId,
    opponentData.fighterId
  );
  console.log('Challenge Modal challengeState', challengeState, selectedFighterId, opponentData);

  const handleChallenge = () => {
    if (selectedStyle >= 0) {
      console.log(
        // eslint-disable-next-line max-len
        `nft_id: ${selectedFighterId}\nfighting_style: ${selectedStyle}\nopponent_id: ${opponentData.fighterId}`
      );

      const inputVars = {
        fighterId: selectedFighterId,
        opponentId: opponentData.fighterId,
        fightingStyle: selectedStyle,
      };
      challengeFighter.mutate(inputVars, {
        onSuccess: async (data: ChallengeFighterResponse) => {
          console.log('Toast challenge feedback', data);
          if (data.status === 200) {
            toast({
              description: `${data.message}`,
              status: 'success',
              duration: 5000,
              isClosable: true,
            });

            if (data.matchId) {
              dispatch(
                dfcAction(SET_FIGHT_RESULTS, {
                  data: { challengerId: selectedFighterId, matchId: data.matchId },
                  msg: '',
                })
              );
            } else {
              onClose();
            }
          } else {
            toast({
              description: `${data.message}`,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        },
        onError: (error: Error) => {
          console.log('Toast challenge feedback', error);
          toast({
            description: `${error.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
      });
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
              <Skeleton isLoaded={!challengeFighter.isLoading}>
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
                  disabled={selectedStyle < 0 || !selectedFighter}
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
                  disabled={selectedStyle < 0 || !selectedFighter}
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
          <Skeleton isLoaded={!challengeFighter.isLoading}>
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
