import React from 'react';
import { Box, Flex, Text, Input, HStack, Link, IconButton, useColorMode, useMediaQuery } from '@chakra-ui/react';
import { SearchIcon, AtSignIcon, StarIcon, InfoIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import './Header.css';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <Box className="header-container" boxShadow="md">
      <Flex className="header-flex">
        {/* Logo */}
        <Box className="logo">
          <Text className="logo-text">KL</Text>
        </Box>

        {/* Navigation Menu - Only visible on larger screens */}
        {isLargerThan768 && (
          <HStack className="nav-menu">
            <Link href="#" className="nav-item">Home</Link>
            <Link href="#" className="nav-item">Products</Link>
            <Link href="#" className="nav-item">Contact Us</Link>
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
          <IconButton aria-label="Toggle Dark Mode" icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode} colorScheme="teal" variant="ghost" />
          <IconButton aria-label="Wishlist" icon={<StarIcon />} colorScheme="teal" variant="ghost" />
          <IconButton aria-label="Cart" icon={<AtSignIcon />} colorScheme="teal" variant="ghost" />
          <IconButton aria-label="Profile" icon={<InfoIcon />} colorScheme="teal" variant="ghost" />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
