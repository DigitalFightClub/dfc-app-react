import { useState } from 'react';
import { Grid, Stack, HStack, Button, Collapse } from '@chakra-ui/react';
import { FighterInfo } from '../../types';
import FighterTile from '../fighterTile';

export interface FighterSelectionProps {
  gymFighters: FighterInfo[];
  loadingGymFitghers: boolean;
}

export default function FighterSelection({ gymFighters, loadingGymFitghers }: FighterSelectionProps) {
  const [showActive, setShowActive] = useState(true);

  const handleToggle = () => {
    if (showActive === false) {
      setShowActive(true);
    } else {
      setShowActive(false);
    }
  };

  return (
    <Stack minW="100%">
      <Grid gap="5rem">
        <HStack minW="100%" gap="0" spacing="0">
          <Button
            w="100%"
            variant="primary"
            bg={showActive ? 'primary.500' : 'none'}
            border="1px gray solid"
            onClick={handleToggle}
            isDisabled
          >
            Active Fighters
          </Button>

          <Button
            w="100%"
            variant="secondary"
            bg={!showActive ? 'secondary.500' : 'none'}
            border="1px gray solid"
            onClick={handleToggle}
            isDisabled
          >
            Retired Fighters
          </Button>
        </HStack>

        <Collapse in={showActive} animateOpacity>
          <Grid
            templateColumns={{
              xl: 'repeat(2, 518px)',
              lg: 'repeat(2, 450px)',
              md: '1fr',
              sm: '1fr',
              base: '1fr',
            }}
            w="100%"
            justifyItems="center"
            gap="5rem 4rem"
            pl={{ xl: '50px', lg: '50px', md: '0px', sm: '0px', base: '0px' }}
          >
            {!loadingGymFitghers ? (
              gymFighters.map((fighterData: FighterInfo) => (
                <FighterTile key={fighterData.name} fighterData={fighterData} fighterType="active" />
              ))
            ) : (
              <FighterTile loadingGymFitghers />
            )}
          </Grid>
        </Collapse>

        {/* <Collapse in={!showActive} animateOpacity>
          <Grid
            templateColumns={{
              xl: 'repeat(2, 518px)',
              lg: 'repeat(2, 2fr)',
              md: '1fr',
              sm: '1fr',
              base: '1fr',
            }}
            w="100%"
            justifyItems="center"
            gap="5rem 4rem"
            pl={{ xl: '50px', lg: '50px', md: '0px', sm: '0px', base: '0px' }}
          >
            {gymFighters.map((fighterData: FighterInfo) => (
              <FighterTile key={fighterData.name} fighterData={null} fighterType="inactive" />
            ))}
          </Grid>
        </Collapse> */}
      </Grid>
    </Stack>
  );
}
