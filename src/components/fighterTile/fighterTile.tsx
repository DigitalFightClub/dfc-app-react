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
} from '@chakra-ui/react';
import { FighterType, FighterInfo } from '../../types';
import FighterModal from '../fighterModal/fighterModal';

const activeFighterData: FighterInfo = {
  name: 'Guy Hawkins',
  country: 'US',
  wins: '37',
  loses: '0',
  height: '193cm',
  weight: '89kg',
  gender: 'male',
  recruited: '19.10.2021',
  status: 'Active',
  image: '/assets/neon-fighter.svg',
};

const retiredFighterData: FighterInfo = {
  name: 'Theresa Webb',
  country: 'US',
  wins: '11',
  loses: '4',
  gender: 'female',
  height: '172cm',
  weight: '59kg',
  recruited: '19.10.2021',
  status: 'Retired',
  image: '/assets/theresa-webb.svg',
};

const FighterData = ({ fighterData, fighterType }: FighterType) => {
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

      <Heading
        variant="header4"
        textAlign={{
          xl: 'left',
          lg: 'left',
          md: 'left',
          sm: 'center',
          base: 'center',
        }}
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

      <Grid
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
          <chakra.span display="inline" variant="small">
            {fighterData.height}
          </chakra.span>
        </Text>

        <Text variant="micro">
          WEIGHT:&nbsp;&nbsp;
          <chakra.span display="inline" variant="small">
            {fighterData.weight}
          </chakra.span>
        </Text>

        <Text variant="micro">
          GENDER:&nbsp;&nbsp;
          <chakra.span display="inline" variant="small">
            {fighterData.gender}
          </chakra.span>
        </Text>

        <Text variant="micro">
          RECRUITED:&nbsp;&nbsp;
          <chakra.span display="inline" variant="small">
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).format(parseInt(fighterData.recruited) * 1000)}
          </chakra.span>
        </Text>

        <Text variant="micro">
          STATUS:&nbsp;&nbsp;
          <chakra.span
            display="inline"
            variant="small"
            fontWeight="400"
            color={fighterType === 'active' ? 'green' : 'red'}
          >
            {fighterData.status}
          </chakra.span>
        </Text>
      </Grid>
    </Grid>
  );
};

export default function FighterTile({ fighterData, fighterType }: FighterType) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Modal size="5xl" isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <FighterModal
              fighterType={fighterType}
              onClose={onClose}
              activeFighterData={activeFighterData}
              retiredFighterData={retiredFighterData}
            />
          </ModalContent>
        </Modal>
      )}

      <Box
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
              '2xl': '-50px',
              xl: '-50px',
              lg: '-50px',
              md: '-50px',
              sm: '-50px',
              base: '-100px',
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
