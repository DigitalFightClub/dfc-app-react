/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEthers, shortenIfAddress } from '@usedapp/core';
import {
  useDisclosure,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Flex,
  Box,
  Avatar,
  Button,
  Text,
  Center,
  Image,
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import { verifyNetwork } from '../../utils/web3/connect';
import detectEthereumProvider from '@metamask/detect-provider';

export default function MenuAppBar() {
  const [auth, setAuth] = useState(false);
  const { activateBrowserWallet, deactivate, account, chainId, error } = useEthers();
  const [activateError, setActivateError] = useState('');

  // useEffect(() => {
  //   window.addEventListener('load', function () {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     //@ts-ignore
  //     if (typeof web3 !== 'undefined') {
  //       console.log('web3 is enabled');
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //       //@ts-ignore
  //       if (window.ethereum === true) {
  //         console.log('MetaMask is active');
  //       } else {
  //         console.log('MetaMask is not available');
  //       }
  //     } else {
  //       alert('Please install MetaMask!');
  //     }
  //   });
  // }, []);

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
      console.log(account);
      verifyNetwork(chainId);
    }
  };

  const disconnectWallet = () => {
    deactivate();
  };

  useEffect(() => {
    if (error) {
      // setActivateError(error.message)
      if (error.message.includes('rejected')) {
        // alert('You have to accept the MetaMask PopUp! \n Try again & click "Next" then "Connect".')
        setActivateError('User did not accept MetaMask Connection!');
      }

      if (error.message.includes('Unsupported chain')) {
        // alert('Going to switch (and add) the proper Polygon Network')
        // console.log(chainId)
        // setActivateError(`Wrong blockchain active: ${getChainName(chainId)}`)
        // addNetwork()
      }

      if (error.name == 'UnsupportedChainIdError') {
        setActivateError('Please add Polygon network!');
        // addNetwork();
      }

      if (error.name == 'NoEthereumProviderError') {
        setActivateError('Please install MetaMask!');
      }

      if (error.message.includes('Unsupported')) {
        // addNetwork();
      }

      console.log(JSON.stringify(error.message));
    }
  }, [error]);

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
          <Image h="3rem" display="inline" src="/assets/logo.svg"></Image>
          <NavLink to="/">
            <Button>Home</Button>
          </NavLink>
          <NavLink to="/gym">
            <Button>My Gym</Button>
          </NavLink>
          <NavLink to="/organizaions">
            <Button>Organizations</Button>
          </NavLink>

          {!account ? <Button onClick={() => connectWallet()}>Connect Wallet</Button> : null}
          {/* <Button isDisabled>Wallet: {shortenIfAddress(account ? account : '')}</Button> */}
          {account && (
            <div>
              <Menu>
                <BellIcon w={8} h={8}></BellIcon>

                <MenuButton onClick={onOpen}>
                  <Text>Wallet: {shortenIfAddress(account ? account : '')}</Text>
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
