import { Flex, Button, Center } from '@chakra-ui/react';
import { AppState, FighterModalProps, FighterModalState } from '../../types';
import { CloseIcon } from '@chakra-ui/icons';
import FighterDetailsModal from './fighterDetailsModal';
import FighterChallengeModal from './fighterChallengeModal';
import FighterResultModal from './fighterResultModal';
import { useDispatch, useSelector } from 'react-redux';
import { dfcAction } from '../../types/actions';
import { SET_FIGHTER_DETAILS } from '../../config/events';

export default function FighterModal({ onClose, fighterData }: FighterModalProps) {
  const { fighterModalState } = useSelector((state: AppState) => state.fightHistoryState);
  console.log('Open modal', fighterModalState);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(dfcAction(SET_FIGHTER_DETAILS, {}));
    onClose();
  };

  let modalView: React.ReactElement | null = null;
  switch (fighterModalState) {
    case FighterModalState.DETAILS:
      modalView = <FighterDetailsModal fighterData={fighterData} />;
      break;
    case FighterModalState.CHALLENGE:
      if (fighterData) {
        modalView = <FighterChallengeModal opponentData={fighterData} onClose={handleClose} />;
      } else {
        modalView = (
          <Center>
            <p>Missing Fighter selection...</p>
          </Center>
        );
      }
      break;
    case FighterModalState.RESULTS:
      modalView = <FighterResultModal />;
  }

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
        zIndex="200"
        onClick={handleClose}
      >
        <CloseIcon />
      </Button>
      {modalView}
    </Flex>
  );
}
