import { Box, Divider, Grid, Heading, Progress, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { Stats } from '../../types';

export interface FighterStatsProps {
  fighterStatistics: Stats[];
  slim?: boolean;
}

// Here's the fighter stats (bars and values)
export default function FighterStatList({ fighterStatistics, slim = false }: FighterStatsProps) {
  const traits: Stats[] = fighterStatistics.filter((stat: Stats, index: number) => index < 8);
  const traitElements: ReactElement[] = traits.map((stat: Stats) => (
    <Box key={stat[0]} px={slim ? '5px' : '40px'}>
      <Heading pt="8px" pb="8px" variant="header3" textAlign="left">
        {stat[0]}
        <Text display="inline" float="right">
          {stat[1]}/100
        </Text>
      </Heading>
      <Progress colorScheme={stat[1] >= 66 ? 'green' : stat[1] <= 33 ? 'red' : 'gray'} size="xs" value={stat[1]} />
    </Box>
  ));
  const skills: Stats[] = fighterStatistics.filter((stat: Stats, index: number) => index > 8);
  const skillElements: ReactElement[] = skills.map((stat: Stats) => (
    <Box key={stat[0]} px={slim ? '5px' : '40px'}>
      <Heading pt="8px" pb="8px" variant="header3" textAlign="left">
        {stat[0]}
        <Text display="inline" float="right">
          {stat[1]}/100
        </Text>
      </Heading>
      <Progress colorScheme={stat[1] >= 66 ? 'green' : stat[1] <= 33 ? 'red' : 'gray'} size="xs" value={stat[1]} />
    </Box>
  ));

  return (
    <Grid
      mt="0px"
      templateColumns={slim ? '1fr' : 'repeat(2, 1fr)'}
      templateRows={slim ? 'repeat(16, 55px)' : 'repeat(8, 55px)'}
      w="100%"
    >
      {!slim ? (
        fighterStatistics.map((stat: Stats) => (
          <Box key={stat[0]} px={slim ? '5px' : '40px'}>
            <Heading pt="8px" pb="8px" variant="header3" textAlign="left">
              {stat[0]}
              <Text display="inline" float="right">
                {stat[1]}/100
              </Text>
            </Heading>
            <Progress
              colorScheme={stat[1] >= 66 ? 'green' : stat[1] <= 33 ? 'red' : 'gray'}
              size="xs"
              value={stat[1]}
            />
          </Box>
        ))
      ) : (
        <>
          {traitElements}
          <Divider mt="25px" />
          {skillElements}
        </>
      )}
    </Grid>
  );
}
