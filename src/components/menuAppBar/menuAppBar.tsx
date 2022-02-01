import React, { useState } from 'react';
import { useEthers, shortenIfAddress } from '@usedapp/core';
import { useDisclosure, Menu, MenuItem, MenuButton, MenuList, Flex, Box, Avatar, Button, Text } from '@chakra-ui/react';
import { verifyNetwork } from '../../utils/web3/connect';

export default function MenuAppBar() {
  const [auth, setAuth] = useState(false);
  const { activateBrowserWallet, account, chainId, deactivate} = useEthers();
  // const [activateError, setActivateError] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isOpen, onOpen, onClose } = useDisclosure();

  const connectWallet = () => {
    // setActivateError('')
    // console.log('activateError: ', activateError)
    activateBrowserWallet();
    console.log(account);
    if (account) {
      verifyNetwork(chainId);
    }
  };

  const disconnectWallet = () => {
    deactivate();
  };

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
          <Button>Home</Button>
          <Button>My Gym</Button>
          <Button>Organizations</Button>
          <Button>Challenges</Button>
          {!account ? <Button onClick={() => connectWallet()}>Connect Wallet</Button> : null}
          {/* <Button isDisabled>Wallet: {shortenIfAddress(account ? account : '')}</Button> */}
          {account && (
            <div>
              <Menu>
                <MenuButton onClick={onOpen}>
                  <Button>Wallet: {shortenIfAddress(account ? account : '')}</Button>
                </MenuButton>

                <MenuList>
                  {/* <MenuItem onClick={onClose}>My Profile</MenuItem>
                  <MenuItem onClick={onClose}>Settings</MenuItem> */}
                  <MenuItem onClick={disconnectWallet}>Disconnect Wallet</MenuItem>
                </MenuList>
              </Menu>
            </div>
          )}
        </Flex>
      </Box>
    </div>
  );
}
