import { useEffect, useState } from 'react';
import { Heading, Button, HStack, Image, Input } from '@chakra-ui/react';
import { EditIcon, CheckIcon } from '@chakra-ui/icons';

export default function GymHeader() {
  const [changeGym, setChangeGym] = useState<boolean>(false);

  const getGymName = () => {
    let gymName = 'Red Dragon Gym';
    const result = window.localStorage.getItem('gym_name');
    if (result) {
      gymName = result;
    }
    return gymName;
  };

  const [gymname, setGymname] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    React.ChangeEvent<HTMLInputElement> | string | any
  >(getGymName());

  useEffect(() => {
    window.localStorage.setItem('gym_name', gymname);
  }, [gymname]);

  return (
    <HStack align="center" justify="left">
      <Image h="1.75rem" w="1.75rem" display="inline" src="/assets/red-dragon-gym.svg" />
      {changeGym ? (
        <>
          <Input textTransform="uppercase" value={gymname} onChange={(event) => setGymname(event.target.value)} />
          <Button display="inline" onClick={() => setChangeGym(false)}>
            <CheckIcon />
          </Button>
        </>
      ) : (
        <>
          <Heading textTransform="uppercase">{gymname}</Heading>

          <Button display="inline" onClick={() => setChangeGym(true)}>
            <EditIcon />
          </Button>
        </>
      )}
    </HStack>
  );
}
