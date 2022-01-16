
import { Box, Flex, Image, Grid, Text, Heading } from "@chakra-ui/react";

export default function FighterTile() {
  type FighterInfo = {
    name: string;
    record: string;
    age: string;
    height: string;
    weight: string;
    org: string;
    recruited: string;
    status: string;
  };

  const activeFighterData = {
    name: "Guy Hawkins",
    country: "US",
    wins: "37",
    loses: "0",
    age: "33",
    height: "193cm",
    weight: "89kg",
    org: "Professional Fighting Circuit",
    recruited: "19.10.2021",
    status: "Active",
  };

  const FighterData = () => {
    return (
      <Grid templateRows='repeat(3, 30px)'
      textAlign='left' gap='11px'>
        <Heading textAlign={{xl: 'left', lg: 'left', md: 'left', sm: 'center', base:'center'}} variant='header3'>
          {activeFighterData.name}
        </Heading>

        <Heading variant='header4' textAlign={{xl: 'left', lg: 'left', md: 'left', sm: 'center', base:'center'}}>Record:
        <Text display='inline'  color='primary.500'>&nbsp;{activeFighterData.wins}</Text>{'-'}<Text
        display='inline' color='secondary.500'>{activeFighterData.loses}</Text>
        </Heading>

        <Grid       templateColumns={{xl: '1', lg: '1fr', md: '1fr', sm: 'repeat(2, 1fr)', base: 'repeat(2, 1fr)'}}
        gap='11px'
        >

          <Text variant="micro">
            AGE:&nbsp;&nbsp;
            <Text display="inline" variant="small">
              {activeFighterData.age}
            </Text>
          </Text>

          <Text variant="micro">
            HEIGHT:&nbsp;&nbsp;
            <Text display="inline" variant="small">
              {activeFighterData.height}
            </Text>
          </Text>

          <Text variant="micro">
            WEIGHT:&nbsp;&nbsp;
            <Text display="inline" variant="small">
              {activeFighterData.weight}
            </Text>
          </Text>

          <Text variant="micro">
            ORG:&nbsp;&nbsp;
            <Text display="inline" variant="small">
              {activeFighterData.org}
            </Text>
          </Text>

          <Text variant="micro">
            RECRUITER:&nbsp;&nbsp;
            <Text display="inline" variant="small" >
              {activeFighterData.recruited}
            </Text>
          </Text>

          <Text variant="micro">
            STATUS:&nbsp;&nbsp;
            <Text display="inline" variant="small"
            fontWeight='400' color='green'>
              {activeFighterData.status}
            </Text>
          </Text>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box
      boxSizing="border-box"
      bg="linear-gradient(95.1deg, rgba(204, 204, 204, 0.1) 0%, rgba(204, 204, 204, 0.05) 101.67%)"
      transition="ease-in-out 0.4s"
      _hover={{cursor: 'pointer', boxShadow: 'inset 0 -48px 38px -48px  #2ABB75'}}
      h='fit-content'
      w='fit-content'
      py="24px"
      px='32px'
      alignContent="center"
    >
      <Grid direction='row' templateColumns={{xl: "1fr 1fr", lg: '200px 1fr', md: 'repeat(2, 1fr)', sm: '1fr'}}>

        <Box maxH='300px'
        pos="relative"
        top={{"2xl": '-90px', xl: '-90px', lg: '-90px', md: '-90px', sm: '-100px', base: '-100px'}}
        left={{"2xl": '-90px', xl: '-90px', lg: '-90px', md: '-90px', sm: '0px', base: '0'}}>
          <Image height='auto' src="/assets/neon-fighter.svg" />
        </Box>

        <FighterData />
      </Grid>
    </Box>
  );
}
