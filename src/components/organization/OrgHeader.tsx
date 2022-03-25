import { Center, Checkbox, Divider, Flex, HStack, Image, Switch, Text } from '@chakra-ui/react';
import { useState } from 'react';

export interface OrgHeaderProps {
  orgIcon: string | undefined;
  orgName: string | undefined;
  orgCategory: string | undefined;
  selectedFighterName: string | undefined;
}

export default function OrgHeader({ orgIcon, orgName, orgCategory, selectedFighterName }: OrgHeaderProps) {
  // Filter state
  const [selectAvailable, setSelectAvailable] = useState<boolean>(false);
  const [selectOnlineOnly, setSelectOnlineOnly] = useState<boolean>(false);
  const [selectChallengers, setSelectChallengers] = useState<boolean>(false);

  return (
    <Flex
      flexDirection="column"
      maxW="48.125rem"
      h="2054px"
      px="1.5rem"
      py="2rem"
      gap="1rem"
      bgGradient="linear(to-r, rgba(204, 204, 204, 0.1), rgba(204, 204, 204, 0.05))"
    >
      <Center>
        {orgIcon ? <Image h="3.375rem" w="3.375rem" display="inline" src={orgIcon} mr="1rem" /> : null}
        <Text fontSize="42px" fontWeight="semibold">
          {orgName ? orgName : ''}
        </Text>
      </Center>
      <Center>
        <Text fontSize="24px" fontWeight="normal">
          {orgCategory ? orgCategory : ''}
        </Text>
      </Center>

      <Center>
        {selectedFighterName ? (
          <Text fontSize="24px" fontWeight="normal">
            {selectedFighterName}
          </Text>
        ) : (
          <Text fontSize="16px" fontWeight="normal" fontStyle="italic">
            No Fighter Selected
          </Text>
        )}
      </Center>

      <Center flexWrap="wrap" gap="40px">
        <HStack>
          <Text color={selectAvailable ? 'grey' : 'white'}>All</Text>
          <Switch colorScheme="teal" size="md" onChange={() => setSelectAvailable(!selectAvailable)} />
          <Text color={!selectAvailable ? 'grey' : 'white'}>Available</Text>
        </HStack>
        <HStack>
          <Text color={selectOnlineOnly ? 'grey' : 'white'}>All</Text>
          <Switch colorScheme="teal" size="md" onChange={() => setSelectOnlineOnly(!selectOnlineOnly)} />
          <Text color={!selectOnlineOnly ? 'grey' : 'white'}>Online Only</Text>
        </HStack>
        <HStack>
          <Text color={selectChallengers ? 'grey' : 'white'}>All</Text>
          <Switch colorScheme="teal" size="md" onChange={() => setSelectChallengers(!selectChallengers)} />
          <Text color={!selectChallengers ? 'grey' : 'white'}>Challengers</Text>
        </HStack>
        <Checkbox colorScheme="teal">Default All</Checkbox>
      </Center>
      <Divider />
    </Flex>
  );
}
