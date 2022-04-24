import { usePagination } from '@ajna/pagination';
import { Box, Heading, Skeleton, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFightHistory } from '../../hooks/history.hooks';
import { FightHistoryBrief } from '../../types';
import DfcPagination from '../pagination/DfcPagination';
import FighterHistoryRow from './fighterHistoryRow';

export interface FighterHistoryProps {
  fighterId: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FighterHistory({ fighterId }: FighterHistoryProps) {
  const { data: fighterHistory = [], isLoading: loadingFighterHistory } = useFightHistory(fighterId);

  // component state
  const [renderFighterHistory, setRenderFighterHistory] = useState<FightHistoryBrief[]>([]);

  // paging state
  const { currentPage, setCurrentPage, pagesCount, pages, setIsDisabled, isDisabled, pageSize, offset } = usePagination(
    {
      total: fighterHistory.length,
      limits: {
        outer: 1,
        inner: 1,
      },
      initialState: { pageSize: 6, isDisabled: true, currentPage: 1 },
    }
  );

  useEffect(() => {
    if (fighterHistory) {
      // console.log('Got Fighter History', JSON.stringify(fighterHistory));
      pageHistory(currentPage);
      setIsDisabled(false);
    }
  }, [fighterHistory, currentPage]);

  // paging handlers
  const handlePageChange = (nextPage: number): void => {
    setCurrentPage(nextPage);
    console.log('request new data with ->', nextPage);
  };

  const pageHistory = (nextPage: number) => {
    const newHistory: FightHistoryBrief[] = [];
    console.log(`page history ${offset} < ${nextPage} * ${pageSize}`);
    for (let i = offset; i < nextPage * pageSize; i++) {
      if (fighterHistory[i]) {
        newHistory.push({ ...fighterHistory[i] });
      }
    }
    setRenderFighterHistory(newHistory);
  };

  let historyContent: React.ReactElement = (
    <Skeleton isLoaded={false}>
      <Box h="100px" w="325px"></Box>
    </Skeleton>
  );
  if (!loadingFighterHistory) {
    historyContent = (
      <>
        {renderFighterHistory.map((match) => (
          <FighterHistoryRow key={match.matchId} fightHistoryBrief={match}></FighterHistoryRow>
        ))}
      </>
    );
  }

  return (
    <Box bg="rgba(0, 0, 0, 0.3)" py="24px" px={{ base: '0px', md: '40px' }} minH={{ base: '835px', md: '472px' }}>
      <Heading textAlign="center" variant="header3" fontWeight="semibold">
        Fight History
      </Heading>

      <VStack w="100%">{historyContent}</VStack>
      <DfcPagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        offset={offset}
        pageSize={pageSize}
        totalItems={fighterHistory ? fighterHistory.length : 0}
        pages={pages}
        isDisabled={isDisabled}
        handlePageChange={handlePageChange}
        handlePageSizeChange={null}
      />
    </Box>
  );
}
