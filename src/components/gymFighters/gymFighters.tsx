import { Grid } from '@chakra-ui/react';

import FighterSelection from '../fighterSelection';
import FighterTile from '../fighterTile';

export default function GymFighters() {

    return (
        <Grid spacing={2}>
            <Grid justifyContent="center">
                <FighterSelection/>
            </Grid>
            <Grid  spacing={2}>
                <Grid justifyContent="center">
                    <FighterTile />
                </Grid>
                <Grid justifyContent="center">
                    <FighterTile />
                </Grid>
            </Grid>
            <Grid spacing={2}>
                <Grid justifyContent="center">
                    <FighterTile />
                </Grid>
                <Grid justifyContent="center">
                    <FighterTile />
                </Grid>
            </Grid>
        </Grid>
    );
}
