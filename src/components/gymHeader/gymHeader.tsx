
import { Container, Text } from '@chakra-ui/react';

export default function GymHeader() {

    //hardcoded as example
    const gymname = 'Red Dragon Gym';

    return (
        <Container>
                <Text>
                    {gymname}
                </Text>
        </Container>
    );
}
