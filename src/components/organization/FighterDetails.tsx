/* eslint-disable @typescript-eslint/no-explicit-any */
import { chakra, Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { FighterInfo } from '../../types';

export interface FighterDetailsProps {
  fighterType: string;
  fighterData: FighterInfo;
}

// This is where the fighter image and basic data appears
export const FighterDetails = ({ fighterType, fighterData }: FighterDetailsProps) => {
  return (
    <Box boxSizing="border-box" transition="ease-in-out 0.4s" w="100%" alignContent="center">
      <VStack marginBottom="30px">
        <Box
          maxH="312px"
          minH="312px"
          minW="312px"
          justifySelf="center"
          alignSelf="center"
          pos="relative"
          pr="1rem"
          marginBottom="10px"
        >
          <Image boxSize="312px" src={fighterData.image} />
        </Box>

        <Flex flexDirection="column" textAlign="left" gap="11px" w="100%">
          <Text
            textAlign={{
              xl: 'left',
              lg: 'left',
              md: 'left',
              sm: 'center',
              base: 'center',
            }}
            fontFamily="Sora"
            fontWeight="semibold"
            fontSize="24px"
          >
            {fighterData.name}
          </Text>

          <Flex direction="row" justify={{ base: 'center', md: 'left' }} mb="10px">
            <Text
              fontFamily="Sora"
              fontWeight="normal"
              fontSize="24px"
              mr=".5rem"
              textAlign={{
                xl: 'left',
                lg: 'left',
                md: 'left',
                sm: 'center',
                base: 'center',
              }}
              whiteSpace="nowrap"
            >
              Record:
              <chakra.span display="inline" color="primary.500">
                &nbsp;
                {fighterData.wins}
              </chakra.span>
              {'-'}
              <chakra.span display="inline" color="secondary.500">
                {fighterData.loses}
              </chakra.span>
            </Text>
          </Flex>

          <Text variant="micro" fontFamily="Sora" fontWeight="normal" fontSize="18px">
            HEIGHT:&nbsp;&nbsp;
            <chakra.span display="inline">{fighterData.height}</chakra.span>
          </Text>

          <Text variant="micro" fontFamily="Sora" fontWeight="normal" fontSize="18px">
            WEIGHT:&nbsp;&nbsp;
            <chakra.span display="inline">{fighterData.weight}</chakra.span>
          </Text>

          <Text variant="micro" fontFamily="Sora" fontWeight="normal" fontSize="18px">
            GENDER:&nbsp;&nbsp;
            <chakra.span display="inline">{fighterData.gender}</chakra.span>
          </Text>

          <Text variant="micro" fontFamily="Sora" fontWeight="normal" fontSize="18px">
            RECRUITED:&nbsp;&nbsp;
            <chakra.span display="inline">{fighterData.recruited}</chakra.span>
          </Text>

          <Text variant="micro" fontFamily="Sora" fontWeight="normal" fontSize="18px">
            STATUS:&nbsp;&nbsp;
            <chakra.span display="inline" fontWeight="400" color={fighterType === 'active' ? 'green' : 'red'}>
              {fighterData.status}
            </chakra.span>
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};
