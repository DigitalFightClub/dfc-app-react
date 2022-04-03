import {
  Pagination,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPageGroup,
  PaginationPrevious,
  PaginationSeparator,
} from '@ajna/pagination';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { chakra, Select, useColorModeValue } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

export interface OrgPaginationProps {
  pagesCount: number;
  currentPage: number;
  offset: number;
  pageSize: number;
  totalItems: number;
  pages: number[];
  isDisabled: boolean;
  handlePageChange: (nextPage: number) => void;
  handlePageSizeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function OrgPagination({
  pagesCount,
  currentPage,
  offset,
  pageSize,
  totalItems,
  pages,
  isDisabled,
  handlePageChange,
  handlePageSizeChange,
}: OrgPaginationProps) {
  const activeStyle = {
    bg: useColorModeValue('#252A34', '#EEF0F1'),
    color: useColorModeValue('white', 'black'),
  };
  const greyColor = useColorModeValue('white', 'gray.800');

  return (
    <Pagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      isDisabled={isDisabled}
      onPageChange={handlePageChange}
    >
      <PaginationContainer align="center" justify="space-between" p={4} w="full">
        <chakra.span>
          {offset + 1}-{offset + pageSize} of {totalItems}
        </chakra.span>
        <PaginationPrevious _hover={activeStyle} bg={greyColor}>
          <ArrowBackIcon />
        </PaginationPrevious>
        <PaginationPageGroup
          isInline
          align="center"
          separator={<PaginationSeparator isDisabled bg="gray.800" fontSize="sm" w={7} jumpSize={11} />}
        >
          {pages.map((page: number) => (
            <PaginationPage
              w={8}
              key={`pagination_page_${page}`}
              page={page}
              fontSize="sm"
              _hover={activeStyle}
              bg={greyColor}
              _current={activeStyle}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext _hover={activeStyle} bg={greyColor}>
          <ArrowForwardIcon />
        </PaginationNext>
        <chakra.span>
          Per Page:
          <Select w="60px" variant="unstyled" colorScheme="green" value={pageSize} onChange={handlePageSizeChange}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </Select>
        </chakra.span>
      </PaginationContainer>
    </Pagination>
  );
}
