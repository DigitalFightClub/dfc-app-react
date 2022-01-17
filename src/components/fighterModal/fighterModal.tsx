import {Box, Button, Grid} from '@chakra-ui/react';

import {FighterHeader, FighterStats, FighterHistory} from './fighterModalComponents';

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
};

type FighterModalProps = {
  fighterType: string;
  onClose: () => void;
  activeFighterData: FighterInfo;
  retiredFighterData: FighterInfo;
}

export default function FighterModal({fighterType, onClose, activeFighterData,
retiredFighterData}: FighterModalProps) {

  return (
    <Box>
      <Button onClose={onClose}>
      x
      </Button>

      <Grid direction='columns'>
        <Grid
        direction='columns'
        templateRows='1fr 2fr'
        >
          <FighterHeader
                fighterType={fighterType}
                activeFighterData={activeFighterData}
                retiredFighterData={retiredFighterData}
          />
          <FighterStats />
        </Grid>

      <FighterHistory />

      </Grid>
    </Box>
  )
}
