import {Grid, Text } from '@chakra-ui/react';


export default function FighterSelection() {

    return (
        <Grid gap={2}>
            <Grid container item xs={12} spacing={3}>
                <Grid container justifyContent="center">
                    <Text>
                        Active Fighters | Retired Fighters
                    </Text>
                </Grid>
            </Grid>
        </Grid>
    );
}
