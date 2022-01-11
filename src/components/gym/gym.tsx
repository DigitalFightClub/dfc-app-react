import { Grid } from '@chakra-ui/react';

import GymTile from '../gymTile';
import GymHeader from '../gymHeader';

export default function Gym() {

    return (
        <div>
            <Grid>
                <Grid >
                    <Grid justifyContent="center"
                    >
                        <GymHeader />
                    </Grid>
                </Grid>

                <Grid>
                    <Grid
                    justifyContent='center'
                    spacing={3}
                    columns={3}
                    >
                        <GymTile datanumber='4' dataname='Active Fighters'/>
                        <GymTile datanumber='32-26' dataname='Active Fight Record'/>
                        <GymTile datanumber='1337' dataname='$TKO Tokens'/>
                        <GymTile datanumber='2' dataname='Retired Fighters'/>
                        <GymTile datanumber='59-42' dataname='Overall Fight Record'/>
                        <GymTile datanumber='1' dataname='Championships Held' />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
