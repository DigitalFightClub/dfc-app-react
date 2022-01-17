import {Box, Button, Flex, Text, Grid, Image, Heading, Icon, useColorModeValue} from '@chakra-ui/react';

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'

type FighterInfo = {
  name: string;
  country: string;
  wins: string;
  loses: string;
  age: string;
  height: string;
  weight: string;
  org: string;
  recruited: string;
  status: string;
};

type FighterModalProps = {
  fighterType: string;
  activeFighterData: FighterInfo;
  retiredFighterData: FighterInfo;
}

// This is where the fighter image and basic data appears
export const FighterHeader = ({fighterType, activeFighterData,
retiredFighterData}: FighterModalProps) => {

  const FighterData = ({fighterType}: any) => {
    return (
      <Grid templateRows='repeat(3, 30px)'
      textAlign='left' minH='180px' gap='11px'>
        <Heading textAlign={{xl: 'left', lg: 'left', md: 'left', sm: 'center', base:'center'}} variant='header3'>
          {fighterType === 'active' ? activeFighterData.name : retiredFighterData.name}
        </Heading>

        <Heading variant='header4' textAlign={{xl: 'left', lg: 'left', md: 'left', sm: 'center', base:'center'}}>Record:
        <Text display='inline'  color='primary.500'>&nbsp;{fighterType === 'active' ? activeFighterData.wins : retiredFighterData.wins}</Text>

        {'-'}

        <Text
        display='inline' color='secondary.500'>{fighterType === 'active' ? activeFighterData.loses : retiredFighterData.loses}</Text>
        </Heading>

        <Grid       templateColumns={{xl: '1', lg: '1fr', md: '1fr', sm: 'repeat(2, 1fr)', base: 'repeat(2, 1fr)'}}
        gap='11px'
        >

          <Text variant="micro">
            AGE:&nbsp;&nbsp;
            <Text display="inline" variant="small">
                    {fighterType === 'active' ? activeFighterData.age : retiredFighterData.age}
            </Text>
          </Text>

          <Text variant="micro">
            HEIGHT:&nbsp;&nbsp;
            <Text display="inline" variant="small">
                  {fighterType === 'active' ? activeFighterData.height : retiredFighterData.height}
            </Text>
          </Text>

          <Text variant="micro">
            WEIGHT:&nbsp;&nbsp;
            <Text display="inline" variant="small">
                {fighterType === 'active' ? activeFighterData.weight : retiredFighterData.weight}
            </Text>
          </Text>

          <Text variant="micro">
            ORG:&nbsp;&nbsp;
            <Text display="inline" variant="small">
                {fighterType === 'active' ? activeFighterData.org : retiredFighterData.org}
            </Text>
          </Text>

          <Text variant="micro">
            RECRUITER:&nbsp;&nbsp;
            <Text display="inline" variant="small" >
                {fighterType === 'active' ? activeFighterData.recruited : retiredFighterData.recruited}
            </Text>
          </Text>

          <Text variant="micro">
            STATUS:&nbsp;&nbsp;
            <Text display="inline" variant="small"
            fontWeight='400' color={fighterType === 'active' ? 'green' : 'red'}>
                {fighterType === 'active' ? activeFighterData.status : retiredFighterData.status}
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
      h='max-content'
      w='fit-content'
      py="24px"
      px='32px'
      alignContent="center"
    >
      <Grid templateColumns={{xl: "1fr 2fr", lg: '1fr 2fr', md: 'repeat(2, 1fr)', sm: '1fr', base: '1fr'}}>

        <Box maxH='300px'
        justifySelf='center'
        pos="relative"
        top={{"2xl": '-90px', xl: '-90px', lg: '-90px', md: '-90px', sm: '-100px', base: '-100px'}}
        left={{"2xl": '-90px', xl: '-90px', lg: '-90px', md: '-90px', sm: '0px', base: '0'}}>
          <Image  height='auto' src="/assets/neon-fighter.svg" />
        </Box>

        <FighterData fighterType={fighterType} />
      </Grid>
    </Box>
  )
}

//Here's the fighter stats (bars and values)
export const FighterStats = () => {
  return (
    <>
      YES
    </>
  )
}

export function FighterHistory() {

  const PagButton = (props: any) => {
    const activeStyle = {
      bg: useColorModeValue("#252A34", "#EEF0F1"),
      color: useColorModeValue("white", "black"),
    };

    return (
      <Button
        mx={1}
        px={4}
        py={2}
        rounded="md"
        bg={useColorModeValue("white", "gray.800")}
        color=''
        opacity={props.disabled && 0.6}
        _hover={!props.disabled && activeStyle}
        cursor={props.disabled && "not-allowed"}
        {...(props.active && activeStyle)}
      >
        {props.children}
      </Button>
    );
  };

  return (
    <Box>
      <Heading variant='header3'>
        Fighter History
      </Heading>

      <Flex
        bg={useColorModeValue("#F9FAFB", "gray.600")}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Flex>
          <PagButton>
            <Icon
              as={ArrowBackIcon}
              color='white'
              boxSize={4}
            />
          </PagButton>
          <PagButton active>1</PagButton>
          <PagButton>2</PagButton>
          <PagButton>3</PagButton>
          <PagButton>
            <Icon
              as={ArrowForwardIcon}
              color='white'
              boxSize={4}
            />
          </PagButton>
        </Flex>
      </Flex>
    </Box>
  )
}
