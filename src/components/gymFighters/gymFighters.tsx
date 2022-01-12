import { Box, Stack, VStack } from '@chakra-ui/react';

import FighterSelection from '../fighterSelection';
import FighterTile from '../fighterTile';

export default function GymFighters() {

    return (
        <VStack w='100%'>
            <Stack minW='100%'>
                <FighterSelection/>
            </Stack>

            <Stack>
              <FighterTile />
            </Stack>

        </VStack>
    );
}
