import {useState} from 'react';
import { Grid, Stack, HStack, Button, Collapse, Box, Flex } from '@chakra-ui/react';


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
        <Flex w='100%'>
            <Stack >
                <Grid minW='100%' justifyContent="center">

                  <HStack minW='100%' gap='0' spacing='0'>
                    <Button w='100%' variant='primary'
                    bg='none'
                    border='1px gray solid'
                    _focus={{bg: 'primary.500'}} onClick={handleToggle}>Active Fighters</Button>

                    <Button w='100%' variant='secondary'
                    bg='none'
                    _focus={{bg: 'secondary.500'}}
                    border='1px gray solid'
                    onClick={handleToggle}>Retired Fighters</Button>
                  </HStack>

                 <Collapse in={showActive} animateOpacity>
                   <Box
                     p='40px'
                     color='white'
                     mt='4'
                     bg='teal.500'
                     rounded='md'
                     shadow='md'
                   >
                   </Box>
                 </Collapse>

                 <Collapse in={showRetired} animateOpacity>
                   <Box
                     p='40px'
                     color='white'
                     mt='4'
                     bg='orange'
                     rounded='md'
                     shadow='md'
                   >
                   </Box>
                 </Collapse>

                </Grid>
            </Stack>
        </Flex>
    );
}
