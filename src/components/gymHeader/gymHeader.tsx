
import { Container, Heading, Text } from '@chakra-ui/react';

export default function GymHeader() {

    //hardcoded as example
    const gymname = 'Red Dragon Gym';

    return (
        <Container>
                <Heading>
                    {gymname}
                </Heading>
        </Container>
    );
}
