import React, { useState } from 'react';
import { Box, Flex, Text, Input, HStack, Link, IconButton, useColorMode, useMediaQuery, Slide, SlideFade } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FaCartShopping, FaRegHeart } from 'react-icons/fa6';
import { RiAccountCircleFill } from "react-icons/ri";
import './Header.css';
import logo from '../assets/kllogo.png';
import { NavLink } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import { FaBars } from "react-icons/fa6";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");


  // State to manage the visibility of the profile menu
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };



  return (
    <Box className="header-container" boxShadow="md">
      <Flex className="header-flex">
        {/* Logo */}
        <Box className="logo">
          <NavLink to="/" >
            <img className="logo-text" src={logo} alt="KharidLow Logo" />
          </NavLink>
        </Box>

        {/* Navigation Menu - Only visible on larger screens */}
        {isLargerThan768 && (
          <HStack className="nav-menu">
            <Link href="/" className="nav-item">Home</Link>
            <Link href="/category" className="nav-item">Category</Link>
            <Link href="/new-arrival" className="nav-item">New Arrival</Link>
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

          {/* <IconButton className="icons-inner-section" aria-label="Cart" icon={<FaCartShopping size={25} className='header-icon' />} variant="ghost" /> */}

          <IconButton className="icons-inner-section" aria-label="Profile" icon={<FaRegHeart size={25} className='header-icon' />} variant="ghost" />

          {/* <IconButton className="icons-inner-section" onClick={toggleProfileMenu} aria-label="Profile" icon={<RiAccountCircleFill size={25} className='header-icon' />} variant="ghost" /> */}
          <FaBars className="icons-inner-section" onClick={toggleProfileMenu} aria-label="Profile" style={{ fontSize: "1.5rem", cursor: "pointer" }} />

        </HStack>

        {/* Backdrop Layer */}
        {isProfileMenuOpen && (
          <Box
            className="Slidebackdrop"
            onClick={() => setProfileMenuOpen(false)} // Close menu when backdrop is clicked
          />
        )}


        {/* Profile Menu */}
        <Slide direction="right" style={{ zIndex: "20" }} in={isProfileMenuOpen}>
          <Box
            className="profile-side-menu"
            position="absolute"
            top="0"
            right="0"
            bg="white"
            boxShadow="xs"
            p={4}
            borderRadius="md"
            height="100%"
            color="black"
          >
            <div className='slide_menu_head'>
              <h2>Menu</h2>
              <RxCross1 className='closeIcon' onClick={() => { setProfileMenuOpen(false) }} />
            </div>
            <Link href="/" className="profile-menu-item">Home</Link>
            <Link href="/register" className="profile-menu-item">Catergory</Link>
            <Link href="/login" className="profile-menu-item">New Arrival</Link>
            <Link href="#" className="profile-menu-item">Logout</Link>
          </Box>
        </Slide>




      </Flex>
    </Box>
  );
};

export default Header;
