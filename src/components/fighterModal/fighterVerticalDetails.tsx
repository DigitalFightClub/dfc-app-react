import { chakra, Box, Flex, Image, Text, VStack } from '@chakra-ui/react';

export interface FighterVerticalDetailsProps {
  fighterImage: string;
  fighterName: string;
  fighterStyle: string;
  fighterCountryCode: string;
  fighterWins: string;
  fighterLosses: string;
  fighterImageSize?: number;
  isCentered?: boolean;
}

export default function FighterVerticalDetails({
  fighterImage,
  fighterName,
  fighterStyle,
  fighterCountryCode,
  fighterWins,
  fighterLosses,
  fighterImageSize = 225,
  isCentered = false,
}: FighterVerticalDetailsProps) {
  return (
    <VStack marginBottom="1.5rem">
      <Box
        maxH={fighterImageSize}
        minH={fighterImageSize}
        minW={fighterImageSize}
        justifySelf="center"
        alignSelf="center"
        pos="relative"
        pr="1rem"
        marginBottom="10px"
      >
        <Image boxSize={fighterImageSize} src={fighterImage} />
      </Box>

      <Flex flexDirection="column" alignItems={isCentered ? 'center' : 'fles-start'} gap="11px" w="100%">
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
          {fighterName}
          {fighterCountryCode ? (
            <chakra.span ml="10px" className={`fi fi-${fighterCountryCode.toLowerCase()}`} />
          ) : null}
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
              {fighterWins}
            </chakra.span>
            {'-'}
            <chakra.span display="inline" color="secondary.500">
              {fighterLosses}
            </chakra.span>
          </Text>
        </Flex>
        {fighterStyle && <Flex direction="row" justify={{ base: 'center', md: 'left' }} mb="10px">
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
            fontSize="18px"
          >
            Style: {fighterStyle}
          </Text>
        </Flex> }
      </Flex>
    </VStack>
  );
}
