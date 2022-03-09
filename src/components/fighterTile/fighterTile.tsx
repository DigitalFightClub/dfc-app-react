import {
  Box,
  chakra,
  useDisclosure,
  Image,
  Grid,
  Text,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  useBreakpointValue,
  Flex,
  Tooltip,
  IconButton,
  Center,
} from '@chakra-ui/react';
import { FighterType } from '../../types';
import { PunchIcon } from '../dfcIcons/PunchIcon';
import { FlexIcon } from '../dfcIcons/FlexIcon';
import { ChallengeIcon } from '../dfcIcons/ChallengeIcon';
import FighterModal from '../fighterModal/fighterModal';
import { useHistory } from 'react-router';

const FighterData = ({ fighterData, fighterType }: FighterType) => {
  const history = useHistory();

  const orgPage = () => {
    history.push('/orgs');
  };

  return (
    <Grid templateRows="repeat(3, 30px)" textAlign="left" minH="180px" gap="11px">
      <Heading
        textAlign={{
          xl: 'left',
          lg: 'left',
          md: 'left',
          sm: 'center',
          base: 'center',
        }}
        variant="header3"
      >
        {fighterData.name}
      </Heading>

      <Flex direction="row" justify={{ base: 'center', md: 'left' }}>
        <Heading
          variant="header4"
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
          <Text display="inline" color="primary.500">
            &nbsp;
            {fighterData.wins}
          </Text>
          {'-'}
          <chakra.span display="inline" color="secondary.500">
            {fighterData.loses}
          </chakra.span>
        </Heading>

        <Flex justify="left">
          <Tooltip hasArrow label="Fight" bg="gray.300" color="black">
            <IconButton
              as="button"
              w="38px"
              h="38px"
              bg="#2ABB75"
              color="white"
              mx=".5rem"
              borderRadius="0"
              aria-label="Fight"
              onClick={orgPage}
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
      </Flex>

      <Grid
        mt="1rem"
        templateColumns={{
          xl: '1',
          lg: '1fr',
          md: '1fr',
          sm: 'repeat(2, 1fr)',
          base: 'repeat(2, 1fr)',
        }}
        gap="11px"
      >
        <Text variant="micro">
          HEIGHT:&nbsp;&nbsp;
          <chakra.span display="inline">{fighterData.height}</chakra.span>
        </Text>

        <Text variant="micro">
          WEIGHT:&nbsp;&nbsp;
          <chakra.span display="inline">{fighterData.weight}</chakra.span>
        </Text>

        <Text variant="micro">
          GENDER:&nbsp;&nbsp;
          <chakra.span display="inline">{fighterData.gender}</chakra.span>
        </Text>

        <Text variant="micro">
          RECRUITED:&nbsp;&nbsp;
          <chakra.span display="inline">{fighterData.recruited}</chakra.span>
        </Text>

        <Text variant="micro">
          STATUS:&nbsp;&nbsp;
          <chakra.span display="inline" fontWeight="400" color={fighterType === 'active' ? 'green' : 'red'}>
            {fighterData.status}
          </chakra.span>
        </Text>
      </Grid>
    </Grid>
  );
};

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

          <FighterData fighterData={fighterData} fighterType={fighterType} />
        </Grid>
      </Box>
    </>
  );
}
