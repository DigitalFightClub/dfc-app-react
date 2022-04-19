import { chakra, Box, Flex, Text, VStack, Image, Spacer, Button } from '@chakra-ui/react';
import { useFighterRecord } from '../../hooks/fighter.hooks';
import { ChallengeState, FighterInfo } from '../../types';

export interface OrgFighterRowProps {
  fighter: FighterInfo;
  fighterChallengeState: ChallengeState;
  handleOpponentClick: (fighterData: FighterInfo) => void;
}

export default function OrgFighterRow({ fighter, fighterChallengeState, handleOpponentClick }: OrgFighterRowProps) {
  const { data: fighterRecord } = useFighterRecord(fighter.fighterId);

  return (
    <Flex key={fighter.fighterId} w="100%" h="146px" bgImage="/assets/background.svg" alignItems="center">
      <Box
        maxH="145px"
        minH="145px"
        minW="145px"
        justifySelf="center"
        alignSelf="center"
        pos="relative"
        pr="1rem"
        marginBottom="10px"
      >
        <Image boxSize="145px" src={fighter.image} />
      </Box>
      <VStack my="37px" alignItems="flex-start">
        <Text fontFamily="Sora" fontWeight="normal" fontSize="20px">
          {fighter.name}
          {fighter && fighter.countryCode ? (
            <chakra.span ml="10px" className={`fi fi-${fighter.countryCode.toLowerCase()}`} />
          ) : null}
        </Text>
        <Flex direction="row" mb="10px">
          <Text fontFamily="Sora" fontWeight="normal" fontSize="20px" mr=".5rem" whiteSpace="nowrap">
            Record:
            <chakra.span display="inline" color="primary.500">
              &nbsp;
              {fighterRecord ? fighterRecord.wins : 0}
            </chakra.span>
            {'-'}
            <chakra.span display="inline" color="secondary.500">
              {fighterRecord ? fighterRecord.losses : 0}
            </chakra.span>
          </Text>
        </Flex>
      </VStack>
      <Spacer />
      {fighterChallengeState === ChallengeState.AVAILABLE ? (
        <Button
          w="9rem"
          h="2.8rem"
          bg="secondary.500"
          color="white"
          mx="1.5rem"
          borderRadius="0"
          disabled={fighter.isOwned}
          onClick={() => handleOpponentClick(fighter)}
        >
          Challenge
        </Button>
      ) : null}
      {fighterChallengeState === ChallengeState.CHALLENGING ? (
        <Button
          w="9rem"
          h="2.8rem"
          bg="primary.500"
          color="white"
          mx="1.5rem"
          borderRadius="0"
          disabled={fighter.isOwned}
          onClick={() => handleOpponentClick(fighter)}
        >
          Accept
        </Button>
      ) : null}
      {fighterChallengeState === ChallengeState.CHALLENGED ? (
        <Button w="9rem" h="2.8rem" bg="gray.600" color="white" mx="1.5rem" borderRadius="0" disabled>
          Challenged
        </Button>
      ) : null}
    </Flex>
  );
}
