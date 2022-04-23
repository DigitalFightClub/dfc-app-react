import { Tooltip, IconButton, Button, Flex } from '@chakra-ui/react';
import { PunchIcon } from '../dfcIcons/PunchIcon';
import { FlexIcon } from '../dfcIcons/FlexIcon';
import { ChallengeState } from '../../types';
import { useFighterChallenges, useGymFighters } from '../../hooks/fighter.hooks';
import { getChallengeState } from '../../utils/helpers/fighter.helpers';

export interface FighterDataButtonProps {
  isTile: boolean;
  isOwned: boolean;
  fighterId: number;
  handleFight: () => void;
  handleChallenge?: () => void;
}

export default function FighterDataButtons({
  isTile,
  isOwned,
  fighterId,
  handleFight,
  handleChallenge,
}: FighterDataButtonProps) {
  const { data: gymFighters = [] } = useGymFighters();
  const { data: fighterChallenges, isLoading } = useFighterChallenges(fighterId);

  const challengeButtons = (
    <>
      <Button
        w="9rem"
        h="2.2rem"
        bg="#DF2151"
        color="white"
        mx=".5rem"
        borderRadius="0"
        aria-label="Challenge"
        onClick={handleChallenge}
        display={
          !isOwned && ChallengeState.AVAILABLE === getChallengeState(fighterId, isOwned, gymFighters, fighterChallenges)
            ? 'flex'
            : 'none'
        }
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
        display={
          !isOwned &&
          ChallengeState.CHALLENGING === getChallengeState(fighterId, isOwned, gymFighters, fighterChallenges)
            ? 'flex'
            : 'none'
        }
      >
        Accept
      </Button>
    </>
  );

  return (
    <>
      {/* Tablet and up buttons */}
      <Flex justify="left" display={isTile ? 'none' : { base: 'none', md: 'flex' }}>
        <Button
          w="6rem"
          h="2.375rem"
          bg="#2ABB75"
          color="white"
          mx=".5rem"
          borderRadius="0"
          aria-label="Fight"
          onClick={handleFight}
          display={isOwned ? 'flex' : 'none'}
        >
          Fight
        </Button>
        <Button
          w="6rem"
          h="2.375rem"
          bg="#F26322"
          color="white"
          mx=".5rem"
          aria-label="Improve"
          borderRadius="0"
          isDisabled
          display={isOwned ? 'flex' : 'none'}
        >
          Improve
        </Button>
        {isLoading ? null : challengeButtons}
      </Flex>

      {/* Mobile and Tile layout */}
      <Flex justify="left" display={isTile ? 'flex' : { base: 'flex', md: 'none' }}>
        <Tooltip hasArrow label="Fight" bg="gray.300" color="black">
          <IconButton
            w="38px"
            h="38px"
            bg="#2ABB75"
            color="white"
            mx=".5rem"
            borderRadius="0"
            aria-label="Fight"
            onClick={handleFight}
          >
            <PunchIcon w="1.5rem" h="1.5rem" />
          </IconButton>
        </Tooltip>
        <Tooltip hasArrow label="Improve" bg="gray.300" color="black">
          <IconButton
            w="38px"
            h="38px"
            bg="#F26322"
            color="white"
            mx=".5rem"
            aria-label="Improve"
            borderRadius="0"
            isDisabled
          >
            <FlexIcon w="1.5rem" h="1.5rem" />
          </IconButton>
        </Tooltip>
      </Flex>
    </>
  );
}
