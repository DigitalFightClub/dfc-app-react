import { Box, Grid, Heading, Progress, Text } from '@chakra-ui/react';
import { FighterStats, Stats } from '../../types';

// Here's the fighter stats (bars and values)
export default function FighterStatList({ fighterStatistics }: FighterStats) {
  return (
    <Grid mt="0px" templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} templateRows="repeat(8, 55px)">
      {fighterStatistics.map((stat: Stats) => (
        <Box key={stat[0]} px={{ base: '5px', md: '40px' }}>
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
}
