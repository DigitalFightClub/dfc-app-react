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

export default function TrainModal({ fighterData, fightingTraits, onClose }: TrainModalProps) {
  const [selectedTrait, setSelectedTrait] = useState<FightingTrait>(fightingTraits[0]);
  const [sliderValue, setSliderValue] = useState(1);

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
              <VStack alignContent="center" gap="2rem" w="17rem">
                <Image src="/images/RedMeter.png" height="100px" />
                <Button w="12rem" h="2.2rem" bg="#2ABB75" color="white" mx=".5rem" borderRadius="0" aria-label="Accept">
                  Train
                </Button>
                <Slider
                  aria-label="slider-ex-6"
                  min={1}
                  max={500}
                  defaultValue={1}
                  onChange={(val) => setSliderValue(val)}
                >
                  <SliderMark mt="5px" value={1}>
                    <Text textAlign="center" fontFamily="Sora" fontWeight="semibold" fontSize="16px">
                      1
                    </Text>
                  </SliderMark>
                  <SliderMark mt="5px" value={230}>
                    <Text textAlign="center" fontFamily="Sora" fontWeight="semibold" fontSize="16px">
                      TKO
                    </Text>
                  </SliderMark>
                  <SliderMark mt="5px" value={450}>
                    <Text textAlign="center" fontFamily="Sora" fontWeight="semibold" fontSize="16px">
                      500
                    </Text>
                  </SliderMark>
                  <SliderMark
                    value={sliderValue}
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-10"
                    ml="-5"
                    w="10"
                  >
                    {sliderValue}
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
                  onClick={() => setSelectedTrait(fightingTrait)}
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
