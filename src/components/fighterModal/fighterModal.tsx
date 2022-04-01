import { Flex, Button } from '@chakra-ui/react';
import { FighterModalProps, FighterModalState } from '../../types';
import { CloseIcon } from '@chakra-ui/icons';
import FighterDetailsModal from './fighterDetailsModal';
import { useState } from 'react';
import FighterChallengeModal from './fighterChallengeModal';

export default function FighterModal({ onClose, fighterData }: FighterModalProps) {
  const [fighterModalState, setFighterModalState] = useState<FighterModalState>(FighterModalState.DETAILS);

  const handleChallenge = () => {
    setFighterModalState(FighterModalState.CHALLENGE);
  };

  return (
    <Flex
      bgImage="/assets/background.svg"
      bgRepeat={{ base: 'repeat-y', lg: 'repeat-x' }}
      h={{ base: '1400px', md: '100%' }}
      w="100%"
    >
      <Button
        w="0px"
        justifySelf="end"
        bg="white"
        color="black"
        borderRadius="18px"
        _hover={{ color: 'white', bg: 'gray' }}
        transition="0.5s"
        position="absolute"
        top="-10px"
        right="-10px"
        size="sm"
        p="0px"
        onClick={onClose}
      >
        <CloseIcon />
      </Button>

      {FighterModalState.DETAILS === fighterModalState ? (
        <FighterDetailsModal fighterData={fighterData} handleChallenge={handleChallenge} />
      ) : fighterData ? (
        <FighterChallengeModal opponentData={fighterData} onClose={onClose} />
      ) : (
        <p>Missing Fighter selection...</p>
      )}
    </Flex>
  );
}
