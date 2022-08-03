/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEthers, shortenIfAddress } from '@usedapp/core';
import {
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  Flex,
  Box,
  Button,
  Text,
  Image,
  Stack,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import { BellIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { verifyNetwork } from '../../utils/web3/connect';

const NavBar = (props: any) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Image h="3rem" display="inline" src="/assets/logo.svg"></Image>
      <WalletConnect base="block" md="none" />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
      <WalletConnect base="none" md="block" />
    </NavBarContainer>
  );
};

const WalletConnect = ({ base, md, ...props }: any) => {
  const { activateBrowserWallet, deactivate, account, chainId, error, active } = useEthers();
  const [activateError, setActivateError] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const connectWallet = () => {
    // setActivateError('')
    // console.log('activateError: ', activateError)
    activateBrowserWallet();
    console.log(account, chainId, active);
    if (account) {
      console.log(account);
      verifyNetwork(chainId);
    }
  };

  const disconnectWallet = () => {
    deactivate();
  };

  useEffect(() => {
    console.log('Wallet Active', active, account, chainId, error);
    if (active && account) {
      console.log(account);
      verifyNetwork(chainId);
    }
  }, [active, account, chainId, error]);

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

      if (error.message === 'Already processing eth_requestAccounts. Please wait.') {
        toast.closeAll();
        toast({
          position: 'top',
          description: 'Unlock Metamask from browser toolbar...',
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
      }

      console.log(JSON.stringify(error.message), error);
    }
  }, [error, toast]);

  return (
    <Box display={{ base: base, md: md }}>
      {!account ? <Button onClick={() => connectWallet()}>Connect Wallet</Button> : null}
      {account && (
        <Menu>
          <BellIcon w={6} h={6} />
          <MenuButton onClick={onOpen}>
            <Text>Wallet: {shortenIfAddress(account ? account : '')}</Text>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={disconnectWallet}>Disconnect Wallet</MenuItem>
          </MenuList>
        </Menu>
      )}
    </Box>
  );
};

const MenuToggle = ({ toggle, isOpen }: any) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Box>
  );
};

const NavButton = ({ children, isLast, to = '/', ...rest }: any) => {
  return (
    <NavLink to={to}>
      <Button display="block" {...rest}>
        {children}
      </Button>
    </NavLink>
  );
};

const MenuLinks = ({ isOpen }: any) => {
  return (
    <Box display={{ base: isOpen ? 'block' : 'none', md: 'block' }} flexBasis={{ base: '100%', md: 'auto' }}>
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <NavButton to="/">Home</NavButton>
        <NavButton to="/gym">My Gym</NavButton>
        <NavButton to="/orgs">Organizations</NavButton>
        <NavButton to="/minting">Mint New Fighters</NavButton>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }: any) => {
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" mb={8} p={8} {...props}>
      {children}
    </Flex>
  );
};

export default NavBar;
