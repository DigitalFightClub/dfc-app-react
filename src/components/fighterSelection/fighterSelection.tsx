import {useDisclosure, Grid, HStack, Button, Collapse, Box, Flex } from '@chakra-ui/react';


export default function FighterSelection() {
const { isOpen, onToggle } = useDisclosure()

    return (
        <Flex w='100%'>
            <Grid container item xs={12} spacing={3}>
                <Grid container justifyContent="center">
                <HStack gap='0' spacing='0'>
                  <Button variant='primary' onClick={onToggle}>Active Fighters</Button>
                  <Button variant='secondary' onClick={onToggle}>Retired Fighters</Button>
                </HStack>

               <Collapse in={isOpen} animateOpacity>
                 <Box
                   p='40px'
                   color='white'
                   mt='4'
                   bg='teal.500'
                   rounded='md'
                   shadow='md'
                 >
                 </Box>
               </Collapse>
                </Grid>
            </Grid>
        </Flex>
    );
}
