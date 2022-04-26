import { chakra, Box, Flex, Text, VStack, Image, Spacer, Button } from '@chakra-ui/react';
import _ from 'lodash';
import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { ENV_CONFG } from '../../config';
import { useAddressDFCFighters } from '../../hooks/dfc.hooks';
import { useFighterChallengeState, useFighterRecord } from '../../hooks/fighter.hooks';
import { AppState, ChallengeState, FighterInfo, MoralisNFT } from '../../types';

const ENV = ENV_CONFG();

export interface OrgFighterRowProps {
  fighter: FighterInfo;
  handleOpponentClick: (fighterData: FighterInfo) => void;
  handleOpponentChallengeClick: (event: MouseEvent<HTMLButtonElement>, fighterData: FighterInfo) => void;
}

export default function OrgFighterRow({
  fighter,
  handleOpponentClick,
  handleOpponentChallengeClick,
}: OrgFighterRowProps) {
  const { selectedFighter } = useSelector((state: AppState) => state.organizationState);
  const selectedFighterId: number = selectedFighter ? selectedFighter.fighterId : 0;

  const { data: autoFighters } = useAddressDFCFighters(ENV.MULTI_SIG);
  const autoNFTs: MoralisNFT[] = _.get(autoFighters, ['result'], []);

  const { data: fighterRecord } = useFighterRecord(fighter.fighterId);
  const { data: challengeState = ChallengeState.UNAVAILABLE } = useFighterChallengeState(
    selectedFighterId,
    fighter.fighterId
  );

  return (
    <Flex
      key={fighter.fighterId}
      w="100%"
      h="146px"
      bgImage="/assets/background.svg"
      alignItems="center"
      onClick={() => handleOpponentClick(fighter)}
    >
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
        {_.findIndex(
          autoNFTs,
          ({ token_id: ownedFighterId }) => fighter.fighterId === _.parseInt(ownedFighterId, 10)
        ) >= 0 ? (
            <Text fontFamily="Sora" fontWeight="normal" fontSize="20px">
              AUTO
            </Text>
          ) : null}
      </VStack>
      <Spacer />
      {challengeState === ChallengeState.AVAILABLE ? (
        <Button
          w="9rem"
          h="2.8rem"
          bg="secondary.500"
          color="white"
          mx="1.5rem"
          borderRadius="0"
          disabled={fighter.isOwned}
          onClick={(event: MouseEvent<HTMLButtonElement>) => handleOpponentChallengeClick(event, fighter)}
        >
          Challenge
        </Button>
      ) : null}
      {challengeState === ChallengeState.CHALLENGING ? (
        <Button
          w="9rem"
          h="2.8rem"
          bg="primary.500"
          color="white"
          mx="1.5rem"
          borderRadius="0"
          disabled={fighter.isOwned}
          onClick={(event: MouseEvent<HTMLButtonElement>) => handleOpponentChallengeClick(event, fighter)}
        >
          Accept
        </Button>
      ) : null}
      {challengeState === ChallengeState.CHALLENGED ? (
        <Button
          w="9rem"
          h="2.8rem"
          bg="gray.600"
          color="white"
          mx="1.5rem"
          borderRadius="0"
          disabled
        >
          Challenged
        </Button>
      ) : null}
      {challengeState === ChallengeState.UNAVAILABLE ? (
        <Button w="9rem" h="2.8rem" bg="gray.600" color="white" mx="1.5rem" borderRadius="0" disabled>
          Owned
        </Button>
      ) : null}
    </Flex>
  );
}
