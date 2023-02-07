import {
  Container,
  VStack,
  Box,
  Flex,
  Heading,
  Image,
  Button,
  Text,
  UnorderedList,
  ListItem,
  HStack,
  Spacer,
  Center,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Wrap,
  Tooltip,
  // Progress,
} from '@chakra-ui/react';

// import { useTKOBalance } from '../../hooks/tko.hooks';
import { useSelector } from 'react-redux';
import { AppState } from '../../types';
import { FighterDetails } from '../organization/FighterDetails';
import FighterStatList from '../fighterStats/fighterStats';
import getFighterStatistics from '../fighterStatistics/fighterStatistics';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import FighterVerticalDetails from '../fighterModal/fighterVerticalDetails';

export default function Improve() {
  // Redux Hooks
  const { selectedFighter, fightingTraits } = useSelector((state: AppState) => state.organizationState);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const { data: tko = 0, isLoading: isTKOLoading } = useTKOBalance();

  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <Modal
          closeOnOverlayClick={false}
          size="5xl"
          isCentered={true}
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior="outside"
        >
          <ModalOverlay />
          <ModalContent>
            <Flex
              bgImage="/assets/background.svg"
              bgRepeat={{ base: 'repeat-y', lg: 'repeat-x' }}
              h={{ base: '1400px', md: '100%' }}
              w="100%"
            >
              <Button
                w="0px"
                justifySelf="end"
                bg="white"
                color="black"
                borderRadius="18px"
                _hover={{ color: 'white', bg: 'gray' }}
                transition="0.5s"
                position="absolute"
                top="-10px"
                right="-10px"
                size="sm"
                p="0px"
                zIndex="200"
                onClick={handleClose}
              >
                <CloseIcon />
              </Button>
              <Box position="relative" overflow="hidden" w="1024px" h="500px">
                {selectedFighter ? (
                  <VStack gap="2rem">
                    <HStack gap="5rem">
                      <FighterVerticalDetails
                        fighterId={selectedFighter.fighterId}
                        fighterImage={selectedFighter.image}
                        fighterName={selectedFighter.name}
                        fighterStyle={''}
                        fighterCountryCode={selectedFighter.countryCode}
                        isCentered={true}
                        showRecord={false}
                      />
                      <VStack alignContent="center" gap="1.5rem" w="17rem">
                        <Text>Proving Grounds</Text>
                        <Text>Middleweight Category</Text>
                        <Text>3 Rounds</Text>
                        <Button
                          w="9rem"
                          h="2.2rem"
                          bg="#2ABB75"
                          color="white"
                          mx=".5rem"
                          borderRadius="0"
                          aria-label="Accept"
                        >
                          Accept
                        </Button>
                      </VStack>
                      <Image src="/images/Punching_bag.png" height="312px" />
                    </HStack>
                    {/* {1 === 0 ? (
                      <Center>
                        <Progress w="300px" hasStripe size="xs" isIndeterminate colorScheme="green" />
                      </Center>
                    ) : ( */}
                    <Wrap pb="1rem" spacing="1rem" justify="center">
                      {fightingTraits.map((fightingTrait) => (
                        <Button
                          key={fightingTrait.traitId}
                          w="13rem"
                          h="2.8rem"
                          bg="gray.600"
                          color="white"
                          mx="1.5rem"
                          borderRadius="0"
                          _hover={{ bg: '#F26322' }}
                          _active={{ bg: '#F26322' }}
                          // isActive={selectedStyle === fightingStyle.styleId}
                          // onClick={() => setSelectedStyle(fightingStyle.styleId)}
                        >
                          {fightingTrait.trait}
                        </Button>
                      ))}
                    </Wrap>
                    {/* )} */}
                  </VStack>
                ) : null}
              </Box>
            </Flex>
          </ModalContent>
        </Modal>
      )}

      <Box>
        <Container maxW={{ xl: '100ch', lg: '80ch', md: '80ch', sm: '60ch' }} my="1rem">
          <Flex gap="30px">
            {selectedFighter ? (
              <VStack
                w="23.125rem"
                h={showDetails ? '99rem' : '43rem'}
                px="2rem"
                bgGradient="linear(to-r, rgba(204, 204, 204, 0.1), rgba(204, 204, 204, 0.05))"
              >
                <FighterDetails fighterData={selectedFighter} />
                {showDetails ? (
                  <>
                    <Button color="#2ABB75" variant="link" onClick={() => setShowDetails(!showDetails)}>
                      Show less
                    </Button>
                    <FighterStatList fighterStatistics={getFighterStatistics(selectedFighter).slim} slim />
                  </>
                ) : (
                  <Button color="#2ABB75" variant="link" onClick={() => setShowDetails(!showDetails)}>
                    Show more
                  </Button>
                )}
              </VStack>
            ) : (
              <Heading>
                Select a fighter from the{' '}
                <Link to="/gym" style={{ color: '#F26322', textDecoration: 'underline' }}>
                  Gym
                </Link>
              </Heading>
            )}

            {/* Improve Options Panel */}
            {selectedFighter ? (
              <VStack>
                <Box
                  position="relative"
                  boxSizing="border-box"
                  bg="linear-gradient(95.1deg, rgba(204, 204, 204, 0.1) 0%, rgba(204, 204, 204, 0.05) 101.67%)"
                  transition="ease-in-out 0.4s"
                  h="385px"
                  w="770px"
                  py="18px"
                  px="32px"
                  alignContent="center"
                >
                  <Flex ml="2.5rem" h="100%">
                    <Image src="/images/Punching_bag.png" height="312px" />
                    <VStack spacing="0" ml="3.5rem" mr="2.5rem" alignItems="flex-start" textAlign="left">
                      <Text variant="micro" fontFamily="Sora" fontWeight="600" fontSize="32px">
                        Train
                      </Text>
                      <Text variant="micro" fontFamily="Sora" fontWeight="400" fontSize="18px">
                        Spend your $TKO with a chance to improve a fighting trait
                      </Text>
                      <Spacer />
                      <HStack gap="6rem">
                        <UnorderedList color="#2ABB75" spacing="1rem">
                          <ListItem>
                            <Text variant="micro" fontFamily="Sora" fontWeight="400" fontSize="16px" color="#FFFFFF">
                              Power
                            </Text>
                          </ListItem>
                          <ListItem>
                            <Text variant="micro" fontFamily="Sora" fontWeight="400" fontSize="16px" color="#FFFFFF">
                              Strength
                            </Text>
                          </ListItem>
                          <ListItem>
                            <Text variant="micro" fontFamily="Sora" fontWeight="400" fontSize="16px" color="#FFFFFF">
                              Speed
                            </Text>
                          </ListItem>
                          <ListItem>
                            <Text variant="micro" fontFamily="Sora" fontWeight="400" fontSize="16px" color="#FFFFFF">
                              Flexibility
                            </Text>
                          </ListItem>
                        </UnorderedList>
                        <UnorderedList color="#2ABB75" spacing="1rem">
                          <ListItem>
                            <Text variant="micro" fontFamily="Sora" fontWeight="400" fontSize="16px" color="#FFFFFF">
                              Conditioning
                            </Text>
                          </ListItem>
                          <ListItem>
                            <Text variant="micro" fontFamily="Sora" fontWeight="400" fontSize="16px" color="#FFFFFF">
                              Balance
                            </Text>
                          </ListItem>
                          <ListItem>
                            <Text variant="micro" fontFamily="Sora" fontWeight="400" fontSize="16px" color="#FFFFFF">
                              Reflex
                            </Text>
                          </ListItem>
                          <ListItem>
                            <Text variant="micro" fontFamily="Sora" fontWeight="400" fontSize="16px" color="#FFFFFF">
                              Footwork
                            </Text>
                          </ListItem>
                        </UnorderedList>
                      </HStack>
                      <Spacer />
                      <HStack gap="1rem">
                        <Box
                          w="13rem"
                          h="2.5rem"
                          p=".5rem"
                          bg="linear-gradient(95.1deg, rgba(204, 204, 204, 0.1) 0%, rgba(204, 204, 204, 0.05) 101.67%);"
                          color="#CCCCCC"
                        >
                          <Center gap=".25rem">
                            <Image src="/images/Vectortimer.png" height="15.9px" />
                            00:00:00
                          </Center>
                        </Box>
                        <Button
                          w="13rem"
                          h="2.5rem"
                          p=".5rem"
                          bg="#2ABB75"
                          color="white"
                          borderRadius="0"
                          onClick={onOpen}
                        >
                          Train
                        </Button>
                      </HStack>
                    </VStack>
                  </Flex>
                </Box>
                <Image src="/images/sparring.png" h="385px" w="770px" />
              </VStack>
            ) : null}
          </Flex>
        </Container>
      </Box>
    </>
  );
}
