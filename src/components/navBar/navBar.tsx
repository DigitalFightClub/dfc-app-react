/* eslint-disable react/prop-types */
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
  IconButton,
} from '@chakra-ui/react';
import { BellIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { verifyNetwork } from '../../utils/web3/connect';
import detectEthereumProvider from '@metamask/detect-provider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavButton = ({ children, isLast, to = '/' }: any) => {
  return (
    <NavLink to={to}>
      <Button mb={{ base: isLast ? 0 : 8, sm: 0 }} mr={{ base: 0, sm: isLast ? 0 : 8 }} display="block">
        {children}
      </Button>
    </NavLink>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavBar = (props: any) => {
  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);
  const [display, changeDisplay] = useState('none');
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
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      px="5"
      borderBottomWidth="1px"
      borderColor="gray.200"
      h="14"
      w="100%"
    >
      {/* Desktop */}
      <Image h="3rem" display="inline" src="/assets/logo.svg"></Image>

      <Box display={{ base: show ? 'block' : 'none', md: 'block' }} flexBasis={{ base: '100%', md: 'auto' }}>
        <Flex
          align="center"
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <NavButton to="/">Home</NavButton>
          <NavButton to="/gym">My Gym</NavButton>
          <NavButton to="/organizaions">Organizations</NavButton>
          <NavButton onClick={onOpen}>Mint New Fighters</NavButton>
        </Flex>
      </Box>

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

      <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <HamburgerIcon />}
      </Box>
    </Flex>
  );
};

export default NavBar;
