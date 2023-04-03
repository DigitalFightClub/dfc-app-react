import { useEffect, useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Progress,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { FightingTrait, TrainingResult, TrainingResultStatus, TrainModalProps } from '../../types';
import FighterVerticalDetails from '../fighterModal/fighterVerticalDetails';

export type SuccessRate = 'Red' | 'Orange' | 'Yellow' | 'LightGreen' | 'Green';

export type TraitModalState = 'TRAIT_SELECT' | 'TRAIT_PROGRESS' | 'TRAIT_RESULT';

export default function TrainModal({ fighterData, fightingTraits, onClose }: TrainModalProps) {
  const [modalState, setModalState] = useState<TraitModalState>('TRAIT_SELECT');
  const [selectedTrait, setSelectedTrait] = useState<FightingTrait>(fightingTraits[0]);
  const [tkoValue, setTkoValue] = useState(1);
  const [meterImage, setMeterImage] = useState<string>('/images/RedMeter.png');
  const [trainingProgress, setTrainingProgress] = useState<number>(25);

  const trainingResult: TrainingResult = {
    status: TrainingResultStatus.SUCCESS,
    trait: { traitId: 2, trait: 'Speed' },
    improvement: 2,
  };

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
    const groupIndexB = 4 - groupB.findIndex((groupValue) => tko >= groupValue);
    console.log(groupIndexA, groupIndexB);
    console.log(resultLookup[groupIndexA]);
    console.log(resultLookup[groupIndexA][groupIndexB]);
    return resultLookup[groupIndexA][groupIndexB];
  };

  useEffect(() => {
    if (trainingProgress === 100) {
      setModalState('TRAIT_RESULT');
    }
  }, [trainingProgress]);

  const updateMeter = (trait: FightingTrait, traitValue: number, tko: number) => {
    setSelectedTrait(trait);
    setTkoValue(tko);
    const color: string = successRate(traitValue, tko).toString();
    setMeterImage(`/images/${color}Meter.png`);
  };

  const submitTrain = (trait: FightingTrait, tko: number) => {
    setModalState('TRAIT_PROGRESS');
    let counter = 0;
    const intervalId = setInterval(() => {
      // Update view properties here
      setTrainingProgress((old) => old + 25);

      counter++;
      if (counter === 3) {
        clearInterval(intervalId);
      }
    }, 1000);
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
        <div
          style={{
            position: 'absolute',
            width: '299px',
            height: '299px',
            left: '180px',
            top: '90px',
            /* Site color/Green */

            background: '#2ABB75',
            opacity:
              'TRAIT_RESULT' === modalState && TrainingResultStatus.SUCCESS === trainingResult.status ? '0.5' : '0',
            filter: 'blur(202px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '299px',
            height: '299px',
            left: '180px',
            top: '90px',
            /* Site color/Green */

            background: '#DF2151',
            opacity:
              'TRAIT_RESULT' === modalState && TrainingResultStatus.FAILURE === trainingResult.status ? '0.5' : '0',
            filter: 'blur(202px)',
          }}
        />
        {fighterData ? (
          <VStack gap="0">
            <HStack gap="5rem" mb="1rem">
              <Box
                mt="2.5rem"
                transform={'TRAIT_PROGRESS' === modalState ? 'translateX(12rem)' : ''}
                transition="transform 0.5s ease-in-out"
              >
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

              {/* Meter/TKO slider and Punching bag */}
              <HStack gap="5rem" mb="1rem" display={'TRAIT_RESULT' !== modalState ? 'flex' : 'none'}>
                <VStack
                  alignContent="center"
                  gap="4rem"
                  w="17rem"
                  // display={'TRAIT_SELECT' !== modalState ? 'none' : 'flex'}
                  opacity={'TRAIT_SELECT' === modalState ? 1 : 0}
                  transition="opacity 0.5s"
                >
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
                      onClick={() => submitTrain(selectedTrait, tkoValue)}
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
                <VStack
                  w="8rem"
                  transform={'TRAIT_SELECT' !== modalState ? 'translateX(-12rem)' : ''}
                  transition="transform 0.5s ease-in-out"
                >
                  <Image src="/images/Punching_bag.png" height="275px" />
                  <Text textAlign="center" fontFamily="Sora" fontWeight="semibold" fontSize="24px">
                    {selectedTrait?.trait}
                  </Text>
                </VStack>
              </HStack>

              {/* Results */}
              <VStack display={'TRAIT_RESULT' === modalState ? 'flex' : 'none'}>
                <Text textAlign="center" fontFamily="Sora" fontWeight="semibold" fontSize="24px">
                  {fighterData.name}{' '}
                  {TrainingResultStatus.SUCCESS === trainingResult.status ? 'improved:' : 'did not progress...'}
                </Text>
                <Text textAlign="center" fontFamily="Sora" fontWeight="semibold" fontSize="24px">
                  {TrainingResultStatus.SUCCESS === trainingResult.status
                    ? trainingResult.trait.trait + ' +' + trainingResult.improvement
                    : ''}
                </Text>
              </VStack>
            </HStack>
            <Box position="relative" w="100%" display="flex" justifyContent="center">
              <Box
                position="absolute"
                top="0"
                w="850px"
                opacity={'TRAIT_PROGRESS' === modalState ? 1 : 0}
                transition="opacity 0.5s"
              >
                <Text textAlign="left" fontFamily="Sora" fontWeight="semibold" fontSize="18px">
                  Started training!
                </Text>
                <Progress w="100%" colorScheme="green" value={trainingProgress} />
              </Box>
              <Wrap
                position="absolute"
                top="0"
                left="0"
                pb="1rem"
                spacing="1rem"
                justify="center"
                opacity={'TRAIT_SELECT' === modalState ? 1 : 0}
                transition="opacity 0.5s"
              >
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
            </Box>
          </VStack>
        ) : null}
      </Box>
    </Flex>
  );
}
