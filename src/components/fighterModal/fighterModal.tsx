import { Flex, Button, Grid } from '@chakra-ui/react';
import { FighterModalProps, FighterStatistics } from '../../types';
import { FighterHeader, FighterStats, FighterHistory } from './fighterModalComponents';
import { CloseIcon } from '@chakra-ui/icons';

export default function FighterModal({ fighterType, onClose, fighterData }: FighterModalProps) {
  const fighterStatistics: FighterStatistics = [
    ['Power', fighterData.stats.power],
    ['Kickboxing', fighterData.stats.kickboxing],
    ['Speed', fighterData.stats.speed],
    ['BJJ', fighterData.stats.bjj],
    ['Strength', fighterData.stats.strength],
    ['Karate', fighterData.stats.karate],
    ['Flexibility', fighterData.stats.flexibility],
    ['Wrestling', fighterData.stats.wrestling],
    ['Conditioning', fighterData.stats.conditioning],
    ['Judo', fighterData.stats.judo],
    ['Balance', fighterData.stats.balance],
    ['Muay Thai', fighterData.stats.mauyThai],
    ['Reflex', fighterData.stats.reflex],
    ['Taekwondo', fighterData.stats.taekwondo],
    ['Footwork', fighterData.stats.footwork],
    ['Sambo', fighterData.stats.sambo],
  ];

  return (
    <Flex bgImage="/assets/background.svg" bgRepeat={{md: 'repeat-y', lg: 'repeat-x'}} h="100%" w="100%">
      <Button
        w="0px"
        justifySelf="end"
        bg="white"
        color="black"
        borderRadius="18px"
        _hover={{ color: 'white', bg: 'gray' }}
        transition="0.5s"
        position="absolute"
        top="-10px"
        right="-10px"
        size="sm"
        p="0px"
        onClick={onClose}
      >
        <CloseIcon />
      </Button>

      <Grid templateColumns={{md: '1fr', lg: '2fr 1fr'}} w="100%">
        <Grid templateRows="1fr 1.5fr">
          <FighterHeader fighterType={fighterType} fighterData={fighterData} />
          <FighterStats fighterStatistics={fighterStatistics} />
        </Grid>

        <FighterHistory />
      </Grid>
    </Flex>
  );
}
