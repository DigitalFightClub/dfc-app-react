import { Flex, Button, Grid } from "@chakra-ui/react";

import {
  FighterHeader,
  FighterStats,
  FighterHistory,
} from "./fighterModalComponents";

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

export default function FighterModal({
  fighterType,
  onClose,
  activeFighterData,
  retiredFighterData,
}: FighterModalProps) {
  return (
    <Flex bgImage="/assets/background.svg" bgRepeat='repeat-x' w='fit-content' minW="500px"
    >

      <Grid templateColumns="2fr 1fr 1px">
        <Grid direction="columns" templateRows="1fr 2fr">
          <FighterHeader
            fighterType={fighterType}
            activeFighterData={activeFighterData}
            retiredFighterData={retiredFighterData}
          />
          <FighterStats />
        </Grid>

        <FighterHistory />

        <Button
          bg='white'
          color='black'
          borderRadius='18px'
          _hover={{color: 'white', bg: 'gray'}}
          pos='relative'
          top='-20px'
          left='-20px'
          onClick={onClose}>x</Button>
      </Grid>
    </Flex>
  );
}
