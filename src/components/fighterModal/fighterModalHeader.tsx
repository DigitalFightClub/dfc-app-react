/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Image, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { SET_FIGHTER_CHALLENGE } from '../../config/events';
import { FighterModalProps2 as FighterModalProps } from '../../types';
import { dfcAction } from '../../types/actions';
import FighterData from '../fighterData';

// This is where the fighter image and basic data appears
export const FighterModalHeader = ({ fighterData, isHorizontal }: FighterModalProps) => {
  const dispatch = useDispatch();

  const handleChallenge = () => {
    dispatch(dfcAction(SET_FIGHTER_CHALLENGE, {}));
  };

  return (
    <Box boxSizing="border-box" transition="ease-in-out 0.4s" w="100%" py="24px" px="32px" alignContent="center">
      {isHorizontal ? (
        <Grid templateColumns="1.75fr 2.5fr">
          <Box maxH="225px" minH="225px" minW="225px" justifySelf="center" alignSelf="center" pos="relative" pr="1rem">
            <Image boxSize="225px" src={fighterData ? fighterData.image : undefined} />
          </Box>

          <FighterData fighterInfo={fighterData} handleChallenge={handleChallenge} />
        </Grid>
      ) : (
        <VStack marginBottom="30px">
          <Box
            maxH="225px"
            minH="225px"
            minW="225px"
            justifySelf="center"
            alignSelf="center"
            pos="relative"
            pr="1rem"
            marginBottom="10px"
          >
            <Image boxSize="225px" src={fighterData ? fighterData.image : undefined} />
          </Box>

          <FighterData fighterInfo={fighterData} handleChallenge={handleChallenge} />
        </VStack>
      )}
    </Box>
  );
};
