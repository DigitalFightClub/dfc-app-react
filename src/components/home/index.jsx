import { Grid, Container, Image, Stack, VStack, Box } from '@chakra-ui/react';

export const Home = () => {
  return (
    <Box>
      <Container maxW={{ xl: '100ch', lg: '80ch', md: '80ch', sm: '60ch' }} my="1rem">
        <Stack justifyContent="flex-start" my="40px">
          <Image src="/assets/home-banner.svg"></Image>
        </Stack>

        <VStack spacing="3rem" minW="100%">
          <Grid gap="30px" justifyContent="center">
            <Image src="/assets/home-fighers.svg"></Image>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};
