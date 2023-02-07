import { chakra, Box, Flex, Image, Text, VStack, Skeleton } from '@chakra-ui/react';
import { useFighterRecord } from '../../hooks/fighter.hooks';

export interface FighterVerticalDetailsProps {
  fighterId: number;
  fighterImage: string;
  fighterName: string;
  fighterStyle: string;
  fighterCountryCode: string;
  fighterImageSize?: number;
  isCentered?: boolean;
  showRecord?: boolean;
}

export default function FighterVerticalDetails({
  fighterId,
  fighterImage,
  fighterName,
  fighterStyle,
  fighterCountryCode,
  fighterImageSize = 225,
  isCentered = false,
  showRecord = true,
}: FighterVerticalDetailsProps) {
  const { data: fighterRecord, isLoading: isRecordLoading } = useFighterRecord(fighterId);

  return (
    <VStack>
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

        <Skeleton isLoaded={!isRecordLoading}>
          <Flex direction="row" justify={{ base: 'center', md: 'left' }} mb="10px">
            {showRecord ? (
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
                  {fighterRecord ? fighterRecord.wins : 0}
                </chakra.span>
                {'-'}
                <chakra.span display="inline" color="secondary.500">
                  {fighterRecord ? fighterRecord.losses : 0}
                </chakra.span>
              </Text>
            ) : null}
          </Flex>
        </Skeleton>
        {fighterStyle && (
          <Flex direction="row" justify={{ base: 'center', md: 'left' }} mb="10px">
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
          </Flex>
        )}
      </Flex>
    </VStack>
  );
}
