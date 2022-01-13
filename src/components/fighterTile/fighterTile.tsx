
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
    record: "37-0",
    age: "33",
    height: "193cm",
    weight: "89kg",
    org: "Professional Fighting Circuit",
    recruited: "19.10.2021",
    status: "Active",
  };

  const FighterData = () => {
    return (
      <Grid templateRows='repeat(6, 30px)' textAlign='left' gap='11px'>
        <Box>
          <Heading variant='header2'>
            {activeFighterData.name}
          </Heading>
        </Box>

        <Text variant="small">
          AGE:{" "}
          <Text display="inline" variant="micro">
            {activeFighterData.age}
          </Text>
        </Text>

        <Text variant="small">
          HEIGHT:{" "}
          <Text display="inline" variant="micro">
            {activeFighterData.height}
          </Text>
        </Text>

        <Text variant="small">
          WEIGHT:{" "}
          <Text display="inline" variant="micro">
            {activeFighterData.weight}
          </Text>
        </Text>

        <Text variant="small">
          ORG:{" "}
          <Text display="inline" variant="micro">
            {activeFighterData.org}
          </Text>
        </Text>

        <Text variant="small">
          RECRUITER:{" "}
          <Text display="inline" variant="micro" >
            {activeFighterData.recruited}
          </Text>
        </Text>

        <Text variant="small">
          STATUS:{" "}
          <Text display="inline" variant="micro"
          fontWeight='100' color='green'>
            {activeFighterData.status}
          </Text>
        </Text>
      </Grid>
    );
  };

  return (
    <Box
      boxSizing="border-box"
      bg="linear-gradient(95.1deg, rgba(204, 204, 204, 0.1) 0%, rgba(204, 204, 204, 0.05) 101.67%);"
      transition="ease-in-out 0.2s"
      _hover={{cursor: 'pointer', boxShadow: 'inset 0 -48px 38px -48px  #2ABB75'}}
      h='327px'
      w='510px'
      py="24px"
      px='32px'
      alignContent="center"
    >
      <Flex templateColumns="1fr 4fr">

        <Box height='50%' width='50%' pos="relative" top='-90px' left='-70px'>
          <Image src="/assets/neon-fighter.svg" />
        </Box>

        <FighterData />
      </Flex>
    </Box>
  );
}
