import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  StatGroup,
  HStack,
  Center,
  Image
} from '@chakra-ui/react';

export default function Minting() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Mint Fighters</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mint Your Fighters</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack>
              <StatGroup>
                <Stat>
                  <StatLabel>Cost per Fighter</StatLabel>
                  <StatNumber>0.05 wETH</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Current Balance</StatLabel>
                  <StatNumber>0.05 wETH</StatNumber>
                </Stat>
              </StatGroup>
            </Stack>
            
            <Stack align='center'>
              <Image src='/images/fighter_silhouette_guys.png' width='200px' />
            </Stack>

            <Stack align='center'>
              <Stat>
                <StatLabel>Total Cost</StatLabel>
                <StatNumber>0.05 wETH</StatNumber>
              </Stat>
            </Stack>

            <Stack direction='row' spacing={4} align='center'>
              <Button colorScheme='teal' variant='solid'>
                -
              </Button>

              <InputGroup size='lg'>
                <InputLeftAddon># of Fighters:</InputLeftAddon>
                <Input placeholder='0' type="number" />
              </InputGroup>

              <Button colorScheme='teal' variant='solid'>
                +
              </Button>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Submit & Sign TX
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}