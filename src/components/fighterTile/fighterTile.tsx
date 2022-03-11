import {
  Box,
  useDisclosure,
  Image,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  useBreakpointValue,
  Center,
} from '@chakra-ui/react';
import { FighterType } from '../../types';
import { ChallengeIcon } from '../dfcIcons/ChallengeIcon';
import FighterData from '../fighterData';
import FighterModal from '../fighterModal/fighterModal';

export default function FighterTile({ fighterData, fighterType }: FighterType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalSize = useBreakpointValue({ base: 'xs', md: '2xl', lg: '5xl' });
  const centered = useBreakpointValue({ base: false, md: true });

  const activeHover = {
    cursor: 'pointer',
    boxShadow: 'inset 0 -48px 38px -48px  #2ABB75',
  };

  const retiredHover = {
    cursor: 'pointer',
    boxShadow: 'inset 0 -48px 38px -48px  #DF2151',
  };

  return (
    <>
      {isOpen && (
        <Modal size={modalSize} isCentered={centered} isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
          <ModalOverlay />
          <ModalContent>
            <FighterModal fighterType={fighterType} onClose={onClose} fighterData={fighterData} />
          </ModalContent>
        </Modal>
      )}

      <Box
        position="relative"
        boxSizing="border-box"
        bg="linear-gradient(95.1deg, rgba(204, 204, 204, 0.1) 0%, rgba(204, 204, 204, 0.05) 101.67%)"
        transition="ease-in-out 0.4s"
        _hover={fighterType === 'active' ? activeHover : retiredHover}
        h="max-content"
        w="fit-content"
        py="24px"
        px="32px"
        alignContent="center"
        onClick={onOpen}
      >
        <Center
          position="absolute"
          w="50px"
          h="50px"
          top="-20px"
          right="-20px"
          bg="#DF2151"
          color="white"
          boxShadow="-10px 10px 40px -5px #DF2151"
          pr="0"
          zIndex="10"
          display={fighterData.isChallenged ? 'flex' : 'none'}
        >
          <ChallengeIcon w="2.1rem" h="2.1rem" />
        </Center>

        <Grid
          templateColumns={{
            xl: '1fr 1fr',
            lg: '1.5fr 1fr',
            md: 'repeat(2, 1fr)',
            sm: '1fr',
            base: '1fr',
          }}
        >
          <Box
            maxH="250px"
            justifySelf="center"
            pos="relative"
            top={{
              '2xl': '-20px',
              xl: '-20px',
              lg: '-20px',
              md: '-20px',
              sm: '-20px',
              base: '-20px',
            }}
            left={{
              '2xl': '-50px',
              xl: '-50px',
              lg: '-50px',
              md: '-50px',
              sm: '0px',
              base: '0',
            }}
            transition="0.5s"
          >
            <Image boxSize="250px" src={fighterData.image} />
          </Box>

          <FighterData isTile fighterInfo={fighterData} fighterType={fighterType} />
        </Grid>
      </Box>
    </>
  );
}
