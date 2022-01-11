import React from 'react';

import { Container, Grid, Text} from '@chakra-ui/react';

export default function GymHeader() {

    return (
        <Grid>
            <Grid>
                <Text>xs=6</Text>
            </Grid>
            <Grid>
                <Container>
                    <Text>xs=12</Text>
                </Container>
                <Container>
                    <Text>xs=12</Text>
                </Container>
            </Grid>
        </Grid>
    );
}
