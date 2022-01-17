import { Flex, Button, Grid } from "@chakra-ui/react";

import {
  FighterHeader,
  FighterStats,
  FighterHistory,
} from "./fighterModalComponents";

import {CloseIcon} from '@chakra-ui/icons';

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
  image: string;
};

type FighterModalProps = {
  fighterType: string;
  onClose: () => void;
  activeFighterData: FighterInfo;
  retiredFighterData: FighterInfo;
};

type Stats = [string, number];

type FighterStatistics = Stats[];

export default function FighterModal({
  fighterType,
  onClose,
  activeFighterData,
  retiredFighterData,
}: FighterModalProps) {

  const fighterStatistics: FighterStatistics = [
    ['Power', 44],
    ['Kickboxing', 37],
    ['Speed', 66],
    ['BJJ', 88],
    ['Strenght', 67],
    ['Karate', 55],
    ['Flexibility', 86],
    ['Wrestling', 89],
    ['Conditioning', 95],
    ['Judo', 86],
    ['Balance', 46],
    ['Muay Thai', 94],
    ['Reflex', 41],
    ['Taekwondo', 73],
    ['Footwork', 75],
    ['Sambo', 49]
  ]

  return (
    <Flex bgImage="/assets/background.svg" bgRepeat='repeat-x' h='fit-content' w='fit-content' minW="550px"
    >

    <Button
      w='0px'
      justifySelf='end'
      bg='white'
      color='black'
      borderRadius='18px'
      _hover={{color: 'white', bg: 'gray'}}
      transition='0.5s'
      position='absolute'
      top='-10px'
      right='-10px'
      size='sm'
      p='0px'
      onClick={onClose}><CloseIcon/></Button>

      <Grid templateColumns="2fr 1fr">
        <Grid  direction="columns" templateRows="1fr 1.5fr">
          <FighterHeader
            fighterType={fighterType}
            activeFighterData={activeFighterData}
            retiredFighterData={retiredFighterData}
          />
          <FighterStats fighterStatistics={fighterStatistics} />
        </Grid>

        <FighterHistory />
      </Grid>
    </Flex>
  );
}
