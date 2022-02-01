import { Heading, Stack } from '@chakra-ui/react';
import { GymTileData } from '../../types';

export default function GymTile({ datanumber, dataname }: GymTileData) {
  return (
    <Stack
      flexDirection="column"
      bg="linear-gradient(95.1deg, rgba(204, 204, 204, 0.1) 0%, rgba(204, 204, 204, 0.05) 101.67%)"
      _hover={{
        cursor: 'pointer',
        boxShadow: 'inset 0 -16px 28px -28px  #DBDBDC',
      }}
      transition="ease-in-out 0.2s"
      boxSizing="border-box"
      px="72px"
      py="24px"
      alignContent="center"
    >
      <Heading variant="header1">{datanumber}</Heading>
      <Heading variant="header4">{dataname}</Heading>
    </Stack>
  );
}
