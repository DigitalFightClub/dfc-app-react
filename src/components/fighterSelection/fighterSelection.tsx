import {useState} from 'react';
import { Grid, Stack, HStack, Button, Collapse, Box, Flex } from '@chakra-ui/react';
import FighterTile from '../fighterTile';


export default function FighterSelection() {
  const [showActive, setShowActive] = useState(true);
  const [showRetired, setShowRetired] = useState(false);

  const handleToggle = () => {
    if (showActive == false) {
      setShowActive(true);
      setShowRetired(false);
    } else if (showActive == true) {
      setShowRetired(true);
      setShowActive(false);
    }
  };

    return (
        <Flex minW='100%'>
            <Stack minW='100%' >
                <Grid minW='100%'>

                  <HStack minW='100%' gap='0' spacing='0'>
                    <Button w='100%' variant='primary'
                    bg={showActive ? 'primary.500' : 'none'}
                    border='1px gray solid'
                    onClick={handleToggle}>Active Fighters</Button>

                    <Button w='100%' variant='secondary'
                    bg={showRetired ? 'secondary.500' : 'none'}
                    border='1px gray solid'
                    onClick={handleToggle}>Retired Fighters</Button>
                  </HStack>

                 <Collapse in={showActive} animateOpacity>
                   <Grid
                    templateColumns={{xl: 'repeat(2, 518px)', lg: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', sm: '1fr', base: '1fr'}}
                    justifyItems='center'
                    gap='5rem 8rem'
                   >
                      <FighterTile />
                      <FighterTile />
                      <FighterTile />
                      <FighterTile />
                      <FighterTile />
                      <FighterTile />
                   </Grid>
                 </Collapse>

                 <Collapse in={showRetired} animateOpacity>
                   <Grid>
                      <FighterTile />
                   </Grid>
                 </Collapse>

                </Grid>
            </Stack>
        </Flex>
    );
}
