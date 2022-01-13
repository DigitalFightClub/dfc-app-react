import { Stack, VStack } from '@chakra-ui/react';

import FighterSelection from '../fighterSelection';

export default function GymFighters() {

    return (
        <VStack w='100%'>
            <Stack minW='100%'>
                <FighterSelection/>
            </Stack>
        </VStack>
    );
}
