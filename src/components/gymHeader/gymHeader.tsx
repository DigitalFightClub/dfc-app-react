
import { Heading, HStack, Image } from '@chakra-ui/react';

export default function GymHeader() {

    //hardcoded as example
    const gymname = 'Red Dragon Gym';

    return (
        <HStack
        align='center'
        >
        <Image
          h='1.75rem'
          w='1.75rem'
          display='inline'
          src='/red-dragon-gym.svg'/>
            <Heading >
            {gymname}
            </Heading>
        </HStack>
    );
}
