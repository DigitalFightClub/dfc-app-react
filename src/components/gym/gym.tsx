import { Grid, Container, Stack, VStack, Box} from '@chakra-ui/react';

import GymTile from '../gymTile';
import GymHeader from '../gymHeader';
import GymFighters from '../gymFighters';

export default function Gym() {

    return (
            <Box>
              <Container
               maxW={{'xl': '100ch', lg: '80ch', md: '80ch', sm:'60ch'}}
               my='1rem'>
                <Stack
                justifyContent='flex-start'
                my='40px'
                minW='100%'
                >
                    <GymHeader />
                </Stack>

                <VStack
                gap='3rem'
                minW='100%'
                >
                <Grid
                templateColumns={{xl: 'repeat(3, 370px)', lg: 'repeat(3, 1fr)', md: 'repeat(3, 1fr)', sm: 'repeat(2, 1fr)', base: '1fr'}}
                gap='30px'
                justifyContent='center'
                >
                    <GymTile datanumber='4' dataname='Active Fighters'/>
                    <GymTile datanumber='32-26' dataname='Active Fight Record'/>
                    <GymTile datanumber='1337' dataname='$TKO Tokens'/>
                    <GymTile datanumber='2' dataname='Retired Fighters'/>
                    <GymTile datanumber='59-42' dataname='Overall Fight Record'/>
                    <GymTile datanumber='1' dataname='Championships Held' />
                </Grid>

                <GymFighters />
                </VStack>
              </Container>
            </Box>
    );
}
