/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Text, Grid, Image, Heading, Progress, useColorModeValue, chakra } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { FighterModalProps2 as FighterModalProps, Stats } from '../../types';

// This is where the fighter image and basic data appears
export const FighterHeader = ({ fighterType, fighterData }: FighterModalProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const FighterData = ({ fighterType }: any) => {
    return (
      <Grid templateRows="repeat(3, 30px)" textAlign="center" minH="180px" minW="300px" gap="11px">
        <Heading variant="header2" textAlign="center">
          {fighterData.name}
        </Heading>

        <Heading variant="header3" textAlign="center">
          Record:
          <Text display="inline" color="primary.500">
            &nbsp;
            {fighterData.wins}
          </Text>
          {'-'}
          <Text display="inline" color="secondary.500">
            {fighterData.loses}
          </Text>
        </Heading>

        <Grid templateColumns="1fr" gap="11px">
          <Text variant="small">
            HEIGHT:&nbsp;&nbsp;
            <chakra.span display="inline" variant="small">
              {fighterData.height}
            </chakra.span>
          </Text>

          <Text variant="small">
            WEIGHT:&nbsp;&nbsp;
            <chakra.span display="inline" variant="small">
              {fighterData.weight}
            </chakra.span>
          </Text>

          <Text variant="small">
            GENDER:&nbsp;&nbsp;
            <chakra.span display="inline" variant="small">
              {fighterData.gender}
            </chakra.span>
          </Text>

          <Text variant="small">
            RECRUITED:&nbsp;&nbsp;
            <chakra.span display="inline" variant="small">
              {fighterData.recruited}
            </chakra.span>
          </Text>

          <Text variant="small">
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

  return (
    <Box
      boxSizing="border-box"
      transition="ease-in-out 0.4s"
      h="max-content"
      w="fit-content"
      py="24px"
      px="32px"
      alignContent="center"
    >
      <Grid templateColumns="1.75fr 2.5fr">
        <Box maxH="225px" justifySelf="center" alignSelf="center" pos="relative" pr="1rem">
          <Image boxSize="225px" src={fighterData.image} />
        </Box>

        <FighterData fighterType={fighterType} />
      </Grid>
    </Box>
  );
};

type FighterStats = {
  fighterStatistics: Stats[];
};

//Here's the fighter stats (bars and values)
// eslint-disable-next-line
export const FighterStats = ({ fighterStatistics }: FighterStats) => {
  return (
    <Grid mt="0px" templateColumns="repeat(2, 1fr)" templateRows="repeat(8, 55px)">
      {fighterStatistics.map((stat: any) => (
        <Box key={stat[0]} px="40px">
          <Heading pt="8px" pb="8px" variant="header3">
            {stat[0]}
            <Text display="inline" float="right">
              {stat[1]}/100
            </Text>
          </Heading>
          <Progress colorScheme={stat[1] >= 66 ? 'green' : stat[1] <= 33 ? 'red' : 'gray'} size="xs" value={stat[1]} />
        </Box>
      ))}
    </Grid>
  );
};

export function FighterHistory() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PagButton = (props: any) => {
    const activeStyle = {
      bg: useColorModeValue('#252A34', '#EEF0F1'),
      color: useColorModeValue('white', 'black'),
    };

    return (
      <Button
        mx={1}
        px={1}
        py={1}
        rounded="md"
        border="1px solid #4C5058"
        color="#4C5058"
        bg={useColorModeValue('white', 'gray.800')}
        opacity={props.disabled && 0.6}
        _hover={!props.disabled && activeStyle}
        cursor={props.disabled && 'not-allowed'}
        {...(props.active && activeStyle)}
      >
        {props.children}
      </Button>
    );
  };

  return (
    <Box bg="rgba(0, 0, 0, 0.3)" py="24px" px="40px">
      <Heading textAlign="center" variant="header3">
        Fight History
      </Heading>

      <Flex opacity="none" p={50} w="full" alignItems="center" justifyContent="center">
        <Flex>
          <PagButton>
            <ArrowBackIcon />
          </PagButton>
          <PagButton active>1</PagButton>
          <PagButton>2</PagButton>
          <PagButton>3</PagButton>
          <PagButton>
            <ArrowForwardIcon />
          </PagButton>
        </Flex>
      </Flex>
    </Box>
  );
}
