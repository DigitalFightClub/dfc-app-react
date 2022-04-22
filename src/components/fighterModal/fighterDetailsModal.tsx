import { Center, Grid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { FighterInfo, FighterStatistics } from '../../types';
import FighterHistory from '../fighterHistory';
import getFighterStatistics from '../fighterStatistics/fighterStatistics';
import FighterStatList from '../fighterStats/fighterStats';
import { FighterModalHeader } from './fighterModalHeader';

export interface FighterDetailsModalProps {
  fighterData: FighterInfo;
}

export default function FighterDetailsModal({ fighterData }: FighterDetailsModalProps) {
  const fighterStatistics: FighterStatistics = getFighterStatistics(fighterData);

  return (
    <>
      {/* Desktop friendly tabbed layout */}
      <Grid templateColumns="2fr 1fr" w="100%" display={{ base: 'none', lg: 'flex' }}>
        <Grid templateRows="1fr 1.5fr">
          <FighterModalHeader fighterData={fighterData} isHorizontal={true} />
          <FighterStatList fighterStatistics={fighterStatistics.wide} />
        </Grid>

        <FighterHistory fighterId={fighterData.fighterId} />
      </Grid>

      {/* Tablet friendly tabbed layout */}
      <Grid templateColumns="1fr" w="100%" display={{ base: 'none', md: 'flex', lg: 'none' }}>
        <Stack w="100%">
          <FighterModalHeader fighterData={fighterData} isHorizontal={true} />

          <Tabs>
            <Center>
              <TabList>
                <Tab>Fighter Stats</Tab>
                <Tab>Fight History</Tab>
              </TabList>
            </Center>

            <TabPanels minH="500px">
              <TabPanel>
                <FighterStatList fighterStatistics={fighterStatistics.wide} />
              </TabPanel>
              <TabPanel>
                <FighterHistory fighterId={fighterData.fighterId} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Grid>

      {/* Mobile friendly tabbed layout */}
      <VStack w="100%" display={{ base: 'flex', md: 'none' }}>
        <FighterModalHeader fighterData={fighterData} isHorizontal={false} />

        <Tabs>
          <Center>
            <TabList>
              <Tab>Fighter Stats</Tab>
              <Tab>Fight History</Tab>
            </TabList>
          </Center>

          <TabPanels>
            <TabPanel>
              <FighterStatList fighterStatistics={fighterStatistics.slim} slim />
            </TabPanel>
            <TabPanel>
              <FighterHistory fighterId={fighterData.fighterId} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </>
  );
}
