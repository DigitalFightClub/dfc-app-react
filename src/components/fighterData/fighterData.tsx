import { chakra, Grid, Text, Heading, Flex, Tooltip, IconButton, Button } from '@chakra-ui/react';
import { FighterInfo } from '../../types';
import { PunchIcon } from '../dfcIcons/PunchIcon';
import { FlexIcon } from '../dfcIcons/FlexIcon';
import { useHistory } from 'react-router';

export interface FighterDataProps {
  isTile?: boolean;
  fighterInfo: FighterInfo;
  fighterType: string;
}

export default function FighterData({ isTile = false, fighterInfo: fighterData, fighterType }: FighterDataProps) {
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

        {/* Tablet and up buttons */}
        <Flex justify="left" display={(isTile) ? 'none' : { base: 'none', md: 'flex' }}>
          <Button
            w="6rem"
            h="2.375rem"
            bg="#2ABB75"
            color="white"
            mx=".5rem"
            borderRadius="0"
            aria-label="Fight"
            onClick={orgPage}
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
          >
            Improve
          </Button>
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
}
