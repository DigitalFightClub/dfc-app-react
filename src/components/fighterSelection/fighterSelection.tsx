import { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Grid, Stack, HStack, Button, Collapse } from '@chakra-ui/react';
import { useMoralis } from 'react-moralis';
import { NftUris, FighterInfo } from '../../types';
import FighterTile from '../fighterTile';
import { testMeta } from '../../utils/web3/moralis';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FighterSelection({ nftUris }: NftUris) {
  const [showActive, setShowActive] = useState(true);

  console.log(`selection: ${nftUris}`);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { Moralis, isInitialized, isInitializing } = useMoralis();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { isLoading, error, data } = useQueries('repoData', () =>
  //   fetch(url).then(res =>
  //     console.log(res.json())
  //   )
  // );

  // useQueries(
  //   fighterUris.map(uri => {
  //     return {
  //       queryKey: ['user', user.id],
  //       queryFn: () => fetchUserById(uri),
  //     }
  //   })
  // )

  const nftFighters = testMeta();

  const handleToggle = () => {
    if (showActive === false) {
      setShowActive(true);
    } else {
      setShowActive(false);
    }
  };

  return (
    <Stack minW="100%">
      <Grid gap="5rem">
        <HStack minW="100%" gap="0" spacing="0">
          <Button
            w="100%"
            variant="primary"
            bg={showActive ? 'primary.500' : 'none'}
            border="1px gray solid"
            onClick={handleToggle}
          >
            Active Fighters
          </Button>

          <Button
            w="100%"
            variant="secondary"
            bg={!showActive ? 'secondary.500' : 'none'}
            border="1px gray solid"
            onClick={handleToggle}
          >
            Retired Fighters
          </Button>
        </HStack>

        <Collapse in={showActive} animateOpacity>
          <Grid
            templateColumns={{
              xl: 'repeat(2, 518px)',
              lg: 'repeat(2, 450px)',
              md: '1fr',
              sm: '1fr',
              base: '1fr',
            }}
            w="100%"
            justifyItems="center"
            gap="5rem 4rem"
            pl={{ xl: '50px', lg: '50px', md: '0px', sm: '0px', base: '0px' }}
          >
            {nftFighters.map((fighterData: FighterInfo) => (
              <FighterTile key={fighterData.name} fighterData={fighterData} fighterType="active" />
            ))}
          </Grid>
        </Collapse>

        <Collapse in={!showActive} animateOpacity>
          <Grid
            templateColumns={{
              xl: 'repeat(2, 518px)',
              lg: 'repeat(2, 2fr)',
              md: '1fr',
              sm: '1fr',
              base: '1fr',
            }}
            w="100%"
            justifyItems="center"
            gap="5rem 4rem"
            pl={{ xl: '50px', lg: '50px', md: '0px', sm: '0px', base: '0px' }}
          >
            {nftFighters.map((fighterData: FighterInfo) => (
              <FighterTile key={fighterData.name} fighterData={fighterData} fighterType="inactive" />
            ))}
          </Grid>
        </Collapse>
      </Grid>
    </Stack>
  );
}
