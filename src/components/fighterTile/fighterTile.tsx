import {
  Box,
  useDisclosure,
  Image,
  Grid,
  Text,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';

import FighterModal from '../fighterModal/fighterModal';

type FighterInfo = {
  name: string;
  country: string;
  wins: string;
  loses: string;
  age: string;
  height: string;
  weight: string;
  org: string;
  recruited: string;
  status: string;
  image: string;
};

type FighterType = {
  fighterType: string;
};

export default function FighterTile({ fighterType }: FighterType) {
  const activeFighterData: FighterInfo = {
    name: 'Guy Hawkins',
    country: 'US',
    wins: '37',
    loses: '0',
    age: '33',
    height: '193cm',
    weight: '89kg',
    org: 'Professional Fighting Circuit',
    recruited: '19.10.2021',
    status: 'Active',
    image: '/assets/neon-fighter.svg',
  };

  const retiredFighterData: FighterInfo = {
    name: 'Theresa Webb',
    country: 'US',
    wins: '11',
    loses: '4',
    age: '18',
    height: '172cm',
    weight: '59kg',
    org: 'Professional Fighting Circuit',
    recruited: '19.10.2021',
    status: 'Retired',
    image: '/assets/theresa-webb.svg',
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const FighterData = ({ fighterType }: FighterType) => {
    return (
      <Grid
        templateRows="repeat(3, 30px)"
        textAlign="left"
        minH="180px"
        gap="11px"
      >
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
          {fighterType === 'active'
            ? activeFighterData.name
            : retiredFighterData.name}
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
            {fighterType === 'active'
              ? activeFighterData.wins
              : retiredFighterData.wins}
          </Text>
          {'-'}
          <Text display="inline" color="secondary.500">
            {fighterType === 'active'
              ? activeFighterData.loses
              : retiredFighterData.loses}
          </Text>
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
            AGE:&nbsp;&nbsp;
            <Text display="inline" variant="small">
              {fighterType === 'active'
                ? activeFighterData.age
                : retiredFighterData.age}
            </Text>
          </Text>

          <Text variant="micro">
            HEIGHT:&nbsp;&nbsp;
            <Text display="inline" variant="small">
              {fighterType === 'active'
                ? activeFighterData.height
                : retiredFighterData.height}
            </Text>
          </Text>

          <Text variant="micro">
            WEIGHT:&nbsp;&nbsp;
            <Text display="inline" variant="small">
              {fighterType === 'active'
                ? activeFighterData.weight
                : retiredFighterData.weight}
            </Text>
          </Text>

          <Text variant="micro">
            ORG:&nbsp;&nbsp;
            <Text display="inline" variant="small">
              {fighterType === 'active'
                ? activeFighterData.org
                : retiredFighterData.org}
            </Text>
          </Text>

          <Text variant="micro">
            RECRUITER:&nbsp;&nbsp;
            <Text display="inline" variant="small">
              {fighterType === 'active'
                ? activeFighterData.recruited
                : retiredFighterData.recruited}
            </Text>
          </Text>

          <Text variant="micro">
            STATUS:&nbsp;&nbsp;
            <Text
              display="inline"
              variant="small"
              fontWeight="400"
              color={fighterType === 'active' ? 'green' : 'red'}
            >
              {fighterType === 'active'
                ? activeFighterData.status
                : retiredFighterData.status}
            </Text>
          </Text>
        </Grid>
      </Grid>
    );
  };

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
        <Modal size='5xl' isCentered isOpen={isOpen} onClose={onClose}>
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
            maxH="300px"
            justifySelf="center"
            pos="relative"
            top={{
              '2xl': '-90px',
              xl: '-90px',
              lg: '-90px',
              md: '-90px',
              sm: '-100px',
              base: '-100px',
            }}
            left={{
              '2xl': '-90px',
              xl: '-90px',
              lg: '-70px',
              md: '-90px',
              sm: '0px',
              base: '0',
            }}
            transition="0.5s"
          >
            <Image
              h="auto"
              src={
                fighterType === 'active'
                  ? activeFighterData.image
                  : retiredFighterData.image
              }
            />
          </Box>

          <FighterData fighterType={fighterType} />
        </Grid>
      </Box>
    </>
  );
}
