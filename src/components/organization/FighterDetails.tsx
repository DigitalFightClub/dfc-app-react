/* eslint-disable @typescript-eslint/no-explicit-any */
import { chakra, Box, Text, VStack } from '@chakra-ui/react';
import { FighterInfo, FighterStatus } from '../../types';
import 'flag-icons/css/flag-icons.min.css';
import FighterVerticalDetails from '../fighterModal/fighterVerticalDetails';

export interface FighterDetailsProps {
  fighterData: FighterInfo;
}

// This is where the fighter image and basic data appears
export const FighterDetails = ({ fighterData }: FighterDetailsProps) => {
  return (
    <Box boxSizing="border-box" transition="ease-in-out 0.4s" w="100%" alignContent="center">
      <VStack marginBottom="30px" alignItems="flex-start">
        <FighterVerticalDetails
          fighterImage={fighterData.image}
          fighterCountryCode={fighterData.countryCode}
          fighterName={fighterData.name}
          fighterStyle={''}
          fighterWins={fighterData.wins}
          fighterLosses={fighterData.loses}
          fighterImageSize={312}
        />

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
          <chakra.span
            display="inline"
            fontWeight="400"
            color={fighterData.status === FighterStatus.ACTIVE ? 'green' : 'red'}
          >
            {fighterData.status}
          </chakra.span>
        </Text>
      </VStack>
    </Box>
  );
};
