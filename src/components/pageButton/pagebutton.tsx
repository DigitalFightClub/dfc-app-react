import { Button, useColorModeValue } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PagButton(props: any) {
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
}
