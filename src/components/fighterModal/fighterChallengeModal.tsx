import { chakra, Box, Flex, Image, Text, VStack, HStack, Button, Tooltip, Wrap } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState, ChallengeState, FighterInfo } from '../../types';

export interface FighterChallengeModalProps {
  opponentData: FighterInfo;
}

export default function FighterChallengeModal({ opponentData }: FighterChallengeModalProps) {
  // redux hooks
  const { selectedFighter, fightingStyles } = useSelector((state: AppState) => state.organizationState);

  const [selectedStyle, setSelectedStyle] = useState<number>(-1);

  const handleChallenge = () => {
    if (selectedStyle) {
      console.log(
        // eslint-disable-next-line max-len
        `nft_id: ${selectedFighter?.fighterId}\nfighting_style: ${selectedStyle}\nopponent_id: ${opponentData.fighterId}`
      );
    }
  };

  return (
    <>
      {selectedFighter ? (
        <VStack>
          <HStack>
            <VStack marginBottom="1.5rem">
              <Box
                maxH="312px"
                minH="312px"
                minW="312px"
                justifySelf="center"
                alignSelf="center"
                pos="relative"
                pr="1rem"
                marginBottom="10px"
              >
                <Image boxSize="312px" src={selectedFighter.image} />
              </Box>

              <Flex flexDirection="column" textAlign="center" gap="11px" w="100%">
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
                  {selectedFighter.name}
                  {selectedFighter && selectedFighter.countryCode ? (
                    <chakra.span ml="10px" className={`fi fi-${selectedFighter.countryCode.toLowerCase()}`} />
                  ) : null}
                </Text>

                <Flex direction="row" justify={{ base: 'center', md: 'left' }} mb="10px">
                  <Text
                    fontFamily="Sora"
                    fontWeight="normal"
                    fontSize="24px"
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
                      {selectedFighter.wins}
                    </chakra.span>
                    {'-'}
                    <chakra.span display="inline" color="secondary.500">
                      {selectedFighter.loses}
                    </chakra.span>
                  </Text>
                </Flex>
              </Flex>
            </VStack>
            <VStack alignContent="center" gap="1.5rem">
              <Text>Proving Grounds</Text>
              <Text>Middleweight Category</Text>
              <Text>3 Rounds</Text>
              <Button
                w="9rem"
                h="2.2rem"
                bg="#DF2151"
                color="white"
                mx=".5rem"
                borderRadius="0"
                aria-label="Challenge"
                onClick={handleChallenge}
                display={ChallengeState.AVAILABLE === opponentData.challengeState ? 'flex' : 'none'}
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
                display={ChallengeState.CHALLENGING === opponentData.challengeState ? 'flex' : 'none'}
                disabled={selectedStyle < 0}
              >
                Accept
              </Button>
            </VStack>
            <VStack marginBottom="1.5rem">
              <Box
                maxH="312px"
                minH="312px"
                minW="312px"
                justifySelf="center"
                alignSelf="center"
                pos="relative"
                pr="1rem"
                marginBottom="10px"
              >
                <Image boxSize="312px" src={opponentData.image} />
              </Box>

              <Flex flexDirection="column" textAlign="center" gap="11px" w="100%">
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
                  {opponentData.name}
                  {opponentData && opponentData.countryCode ? (
                    <chakra.span ml="10px" className={`fi fi-${opponentData.countryCode.toLowerCase()}`} />
                  ) : null}
                </Text>

                <Flex direction="row" justify={{ base: 'center', md: 'left' }} mb="10px">
                  <Text
                    fontFamily="Sora"
                    fontWeight="normal"
                    fontSize="24px"
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
                      {opponentData.wins}
                    </chakra.span>
                    {'-'}
                    <chakra.span display="inline" color="secondary.500">
                      {opponentData.loses}
                    </chakra.span>
                  </Text>
                </Flex>
              </Flex>
            </VStack>
          </HStack>
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
                >
                  {fightingStyle.style}
                </Button>
              </Tooltip>
            ))}
          </Wrap>
        </VStack>
      ) : null}
    </>
  );
}
