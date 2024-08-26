import React from 'react';
import { Box, Flex, Text, Input, HStack, Link, IconButton, useColorMode, useMediaQuery } from '@chakra-ui/react';
import { SearchIcon, AtSignIcon, StarIcon, InfoIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaCartShopping, FaRegHeart } from 'react-icons/fa6'
import './Header.css';
import logo from '../assets/kllogo.png';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <Box className="header-container" boxShadow="md">
      <Flex className="header-flex">
        {/* Logo */}
        <Box className="logo">
        <img className="logo-text" src={logo} alt="KharidLow Logo" />
        </Box>

        {/* Navigation Menu - Only visible on larger screens */}
        {isLargerThan768 && (
          <HStack className="nav-menu">
            <Link href="#" className="nav-item">Home</Link>
            <Link href="#" className="nav-item">Category</Link>
            <Link href="#" className="nav-item">New Arrival</Link>
          </HStack>
        )}

        {/* Search Bar */}
        <Box className="search-bar">
          <Input
            placeholder="Search for products..."
            bg="white"
            color="gray.800"
            borderRadius="full"
            pl={4}
            pr="3rem" /* Adjust padding to make space for the icon */
            boxShadow="sm"
            className='search-input'
          />
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            colorScheme="teal"
            className="search-icon"
            variant="unstyled" /* Removes default button styling */
          />
        </Box>

        {/* Icons Section */}
        <HStack className="icons-section">
          {/* <IconButton aria-label="Toggle Dark Mode" icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode} colorScheme="teal" variant="ghost" />
          <IconButton aria-label="Wishlist" icon={<StarIcon />} colorScheme="teal" variant="ghost" /> */}
          <IconButton aria-label="Cart" icon={<FaCartShopping size={25} className='header-icon' />} variant="ghost" />
          <IconButton aria-label="Profile" icon={<FaRegHeart size={25} className='header-icon' />} variant="ghost" />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
