import { useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { FightingTrait, TrainModalProps } from '../../types';
import FighterVerticalDetails from '../fighterModal/fighterVerticalDetails';

export type SuccessRate = 'Red' | 'Orange' | 'Yellow' | 'LightGreen' | 'Green';

export default function TrainModal({ fighterData, fightingTraits, onClose }: TrainModalProps) {
  const [selectedTrait, setSelectedTrait] = useState<FightingTrait>(fightingTraits[0]);
  const [tkoValue, setTkoValue] = useState(1);
  const [meterImage, setMeterImage] = useState<string>('/images/RedMeter.png');

  const successRate = (traitValue: number, tko: number): SuccessRate => {
    const groupA = [81, 61, 41, 21, 1];
    const groupB = [401, 301, 201, 101, 1];

    const resultLookup: SuccessRate[][] = [
      ['LightGreen', 'LightGreen', 'LightGreen', 'Green', 'Green'],
      ['Yellow', 'Yellow', 'LightGreen', 'LightGreen', 'Green'],
      ['Orange', 'Yellow', 'Yellow', 'LightGreen', 'LightGreen'],
      ['Red', 'Orange', 'Orange', 'Yellow', 'Yellow'],
      ['Red', 'Red', 'Red', 'Orange', 'Yellow'],
    ];

    const groupIndexA = 4 - groupA.findIndex((groupValue) => traitValue >= groupValue);
    const groupIndexB =  4 - groupB.findIndex((groupValue) => tko >= groupValue);
    console.log(groupIndexA, groupIndexB);
    console.log(resultLookup[groupIndexA]);
    console.log(resultLookup[groupIndexA][groupIndexB]);
    return resultLookup[groupIndexA][groupIndexB];
  };

  const updateMeter = (trait: FightingTrait, traitValue: number, tko: number) => {
    setSelectedTrait(trait);
    setTkoValue(tko);
    const color: string = successRate(traitValue, tko).toString();
    setMeterImage(`/images/${color}Meter.png`);
  };

  return (
    <Flex
      bgImage="/assets/background.svg"
      bgRepeat={{ base: 'repeat-y', lg: 'repeat-x' }}
      h={{ base: '1400px', md: '100%' }}
      w="100%"
    >
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
        zIndex="200"
        onClick={onClose}
      >
        <CloseIcon />
      </Button>
      <Box position="relative" overflow="hidden" w="1024px" h="500px">
        {fighterData ? (
          <VStack gap="0">
            <HStack gap="5rem" mb="1rem">
              <Box mt="2.5rem">
                <FighterVerticalDetails
                  fighterId={fighterData.fighterId}
                  fighterImage={fighterData.image}
                  fighterName={fighterData.name}
                  fighterStyle={''}
                  fighterCountryCode={fighterData.countryCode}
                  isCentered={true}
                  showRecord={false}
                />
              </Box>
              <VStack alignContent="center" gap="4rem" w="17rem">
                <VStack alignContent="center" w="17rem">
                  <Text textAlign="center" fontFamily="Sora" fontWeight="semibold" fontSize="20px">
                    Success Rate
                  </Text>
                  <Image src={meterImage} height="100px" />
                  <Button
                    w="12rem"
                    h="2.2rem"
                    bg="#2ABB75"
                    color="white"
                    mx=".5rem"
                    borderRadius="0"
                    aria-label="Accept"
                  >
                    Train
                  </Button>
                </VStack>
                <Slider
                  aria-label="slider-ex-6"
                  min={1}
                  max={500}
                  defaultValue={1}
                  onChange={(val) =>
                    updateMeter(selectedTrait, fighterData.stats[selectedTrait.trait.toLowerCase()], val)
                  }
                >
                  <SliderMark mt="5px" value={1}>
                    <Text textAlign="center" fontFamily="Sora" fontWeight="semibold" fontSize="16px">
                      1
                    </Text>
                  </SliderMark>
                  <SliderMark mt="5px" value={220}>
                    <Text textAlign="center" fontFamily="Sora" fontWeight="semibold" fontSize="18px">
                      TKO
                    </Text>
                  </SliderMark>
                  <SliderMark mt="5px" value={450}>
                    <Text textAlign="center" fontFamily="Sora" fontWeight="semibold" fontSize="16px">
                      500
                    </Text>
                  </SliderMark>
                  <SliderMark value={tkoValue} textAlign="center" bg="gray.600" color="white" mt="-10" ml="-5" w="10">
                    {tkoValue}
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </VStack>
              <VStack w="8rem">
                <Image src="/images/Punching_bag.png" height="275px" />
                <Text textAlign="center" fontFamily="Sora" fontWeight="semibold" fontSize="24px">
                  {selectedTrait?.trait}
                </Text>
              </VStack>
            </HStack>
            {/* {1 === 0 ? (
                    <Center>
                      <Progress w="300px" hasStripe size="xs" isIndeterminate colorScheme="green" />
                    </Center>
                  ) : ( */}
            <Wrap pb="1rem" spacing="1rem" justify="center">
              {fightingTraits.map((fightingTrait) => (
                <Button
                  key={fightingTrait.traitId}
                  w="13rem"
                  h="2.8rem"
                  bg="gray.600"
                  color="white"
                  mx="1.5rem"
                  borderRadius="0"
                  _hover={{ bg: '#F26322' }}
                  _active={{ bg: '#F26322' }}
                  isActive={selectedTrait?.traitId === fightingTrait.traitId}
                  onClick={() =>
                    updateMeter(fightingTrait, fighterData.stats[fightingTrait.trait.toLowerCase()], tkoValue)
                  }
                >
                  {fightingTrait.trait} ({fighterData.stats[fightingTrait.trait.toLowerCase()]})
                </Button>
              ))}
            </Wrap>
            {/* )} */}
          </VStack>
        ) : null}
      </Box>
    </Flex>
  );
}
