import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, useColorModeValue, VStack } from '@chakra-ui/react';
import { FightHistoryBrief, MatchResult } from '../../types';
import FighterHistoryRow from './fighterHistoryRow';

export interface FighterHistoryProps {
  fighterId: number;
  fighterImage: string;
  loading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FighterHistory({ fighterId, fighterImage, loading }: FighterHistoryProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PagButton = (props: any) => {
    const activeStyle = {
      bg: useColorModeValue('#252A34', '#EEF0F1'),
      color: useColorModeValue('white', 'black'),
    };

    return (
      <Button
        mx={1}
        px={1}
        py={1}
        rounded="md"
        border="1px solid #4C5058"
        color="#4C5058"
        bg={useColorModeValue('white', 'gray.800')}
        opacity={props.disabled && 0.6}
        _hover={!props.disabled && activeStyle}
        cursor={props.disabled && 'not-allowed'}
        {...(props.active && activeStyle)}
      >
        {props.children}
      </Button>
    );
  };

  const fighterHistory: FightHistoryBrief[] = [
    {
      matchId: '1',
      challengerName: 'Bastian Bender',
      challengerImage: fighterImage,
      opponentName: 'Awaiza Sarwar',
      opponentImage:
        'https://lh3.googleusercontent.com/DxpdvS00hmj9yaUUG0u-Bs1cGD1ZZ6offUZIieMD5ePI0WtxOuXNZa4W2muSeTHqOzxKfMfE7svsXM8_4cLD_ZKhylgHkQf8BcqHzw=w600',
      matchResult: MatchResult.WIN,
      matchDetails: '2nd Round Stoppage',
    },
    {
      matchId: '2',
      challengerName: 'Bastian Bender',
      challengerImage: fighterImage,
      opponentName: 'Awaiza Sarwar',
      opponentImage:
        'https://lh3.googleusercontent.com/DxpdvS00hmj9yaUUG0u-Bs1cGD1ZZ6offUZIieMD5ePI0WtxOuXNZa4W2muSeTHqOzxKfMfE7svsXM8_4cLD_ZKhylgHkQf8BcqHzw=w600',
      matchResult: MatchResult.WIN,
      matchDetails: '2nd Round Stoppage',
    },
    {
      matchId: '3',
      challengerName: 'Bastian Bender',
      challengerImage: fighterImage,
      opponentName: 'Awaiza Sarwar',
      opponentImage:
        'https://lh3.googleusercontent.com/DxpdvS00hmj9yaUUG0u-Bs1cGD1ZZ6offUZIieMD5ePI0WtxOuXNZa4W2muSeTHqOzxKfMfE7svsXM8_4cLD_ZKhylgHkQf8BcqHzw=w600',
      matchResult: MatchResult.WIN,
      matchDetails: '2nd Round Stoppage',
    },
    {
      matchId: '4',
      challengerName: 'Bastian Bender',
      challengerImage: fighterImage,
      opponentName: 'Awaiza Sarwar',
      opponentImage:
        'https://lh3.googleusercontent.com/DxpdvS00hmj9yaUUG0u-Bs1cGD1ZZ6offUZIieMD5ePI0WtxOuXNZa4W2muSeTHqOzxKfMfE7svsXM8_4cLD_ZKhylgHkQf8BcqHzw=w600',
      matchResult: MatchResult.LOSS,
      matchDetails: '2nd Round Stoppage',
    },
    {
      matchId: '5',
      challengerName: 'Bastian Bender',
      challengerImage: fighterImage,
      opponentName: 'Awaiza Sarwar',
      opponentImage:
        'https://lh3.googleusercontent.com/DxpdvS00hmj9yaUUG0u-Bs1cGD1ZZ6offUZIieMD5ePI0WtxOuXNZa4W2muSeTHqOzxKfMfE7svsXM8_4cLD_ZKhylgHkQf8BcqHzw=w600',
      matchResult: MatchResult.WIN,
      matchDetails: '2nd Round Stoppage',
    },
    {
      matchId: '6',
      challengerName: 'Bastian Bender',
      challengerImage: fighterImage,
      opponentName: 'Awaiza Sarwar',
      opponentImage:
        'https://lh3.googleusercontent.com/DxpdvS00hmj9yaUUG0u-Bs1cGD1ZZ6offUZIieMD5ePI0WtxOuXNZa4W2muSeTHqOzxKfMfE7svsXM8_4cLD_ZKhylgHkQf8BcqHzw=w600',
      matchResult: MatchResult.WIN,
      matchDetails: '2nd Round Stoppage',
    },
  ];

  return (
    <Box bg="rgba(0, 0, 0, 0.3)" py="24px" px={{ base: '0px', md: '40px' }} minH={{ base: '835px', md: '472px' }}>
      <Heading textAlign="center" variant="header3" fontWeight="semibold">
        Fight History
      </Heading>

      <VStack w="100%">
        {fighterHistory.map((match) => (
          <FighterHistoryRow key={match.matchId} fightHistoryBrief={match}></FighterHistoryRow>
        ))}
      </VStack>

      <Flex
        opacity="none"
        pt={15}
        pb={5}
        px={{ base: 10, md: 50 }}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Flex>
          <PagButton>
            <ArrowBackIcon />
          </PagButton>
          <PagButton active>1</PagButton>
          <PagButton>2</PagButton>
          <PagButton>3</PagButton>
          <PagButton>
            <ArrowForwardIcon />
          </PagButton>
        </Flex>
      </Flex>
    </Box>
  );
}
