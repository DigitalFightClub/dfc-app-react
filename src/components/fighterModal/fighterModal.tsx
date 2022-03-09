import { Flex, Button, Grid, Tabs, TabList, TabPanels, Tab, TabPanel, Stack, Center, VStack } from '@chakra-ui/react';
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
        onClick={onClose}
      >
        <CloseIcon />
      </Button>

      {/* Desktop friendly tabbed layout */}
      <Grid templateColumns="2fr 1fr" w="100%" display={{ base: 'none', lg: 'flex' }}>
        <Grid templateRows="1fr 1.5fr">
          <FighterHeader fighterType={fighterType} fighterData={fighterData} isHorizontal={true} />
          <FighterStats fighterStatistics={fighterStatistics} />
        </Grid>

        <FighterHistory />
      </Grid>

      {/* Tablet friendly tabbed layout */}
      <Grid templateColumns="1fr" w="100%" display={{ base: 'none', md: 'flex', lg: 'none' }}>
        <Stack w="100%">
          <FighterHeader fighterType={fighterType} fighterData={fighterData} isHorizontal={true} />

          <Tabs>
            <Center>
              <TabList>
                <Tab>Fighter Stats</Tab>
                <Tab>Fight History</Tab>
              </TabList>
            </Center>

            <TabPanels minH="500px">
              <TabPanel>
                <FighterStats fighterStatistics={fighterStatistics} />
              </TabPanel>
              <TabPanel>
                <FighterHistory />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Grid>

      {/* Mobile friendly tabbed layout */}
      <VStack w="100%" display={{ base: 'flex', md: 'none' }}>
        <FighterHeader fighterType={fighterType} fighterData={fighterData} isHorizontal={false} />

        <Tabs>
          <Center>
            <TabList>
              <Tab>Fighter Stats</Tab>
              <Tab>Fight History</Tab>
            </TabList>
          </Center>

          <TabPanels>
            <TabPanel>
              <FighterStats fighterStatistics={fighterStatistics} />
            </TabPanel>
            <TabPanel>
              <FighterHistory />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Flex>
  );
}
