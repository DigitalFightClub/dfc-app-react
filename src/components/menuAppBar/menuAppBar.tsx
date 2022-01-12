import React from 'react';
import {Text, useDisclosure, Menu, MenuItem, MenuButton, MenuList, Flex, Box, Avatar} from '@chakra-ui/react';


export default function MenuAppBar() {
    const [auth, setAuth] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <div>
          {/* <FormGroup>
              <FormControlLabel
                  control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                  label={auth ? 'Logout' : 'Login'}
              />
          </FormGroup> */}
          <Box>
            <Flex
              as="header"
              align="center"
              justify="space-between"
              px="5"
              borderBottomWidth="1px"
              borderColor="gray.200"
              h="14"
            >
                  <Text >
                      Home
                  </Text>
                  <Text >
                      My Gym
                  </Text>
                  <Text>
                      Organizations
                  </Text>
                  <Text>
                      Challenges
                  </Text>
                  <Text>
                      TKO Tokens
                  </Text>
                  {auth && (
                    <div>
                      <Menu>
                        <MenuButton
                          onClick={onOpen}
                        >
                            <Avatar h='10' w='10' />
                        </MenuButton>

                        <MenuList>
                        <MenuItem onClick={onClose}>My Profile</MenuItem>
                        <MenuItem onClick={onClose}>Settings</MenuItem>
                        <MenuItem onClick={onClose}>Log Out</MenuItem>
                      </MenuList>
                    </Menu>
                  </div>
                  )}
              </Flex>
          </Box>
      </div>
    );
}
