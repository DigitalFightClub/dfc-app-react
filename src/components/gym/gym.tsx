import { Grid, Container, Stack, VStack, Box} from '@chakra-ui/react';

import GymTile from '../gymTile';
import GymHeader from '../gymHeader';

export default function Gym() {

    return (
            <Box>
              <Container my='1rem'>
                <Grid
                justifyItems='start'
                my='40px'
                >
                    <GymHeader />
                </Grid>

                <Grid
                templateColumns={{xl: 'repeat(3, 370px)', lg: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)', sm: '1fr', base: '1fr'}}
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
              </Container>
            </Box>
    );
}
