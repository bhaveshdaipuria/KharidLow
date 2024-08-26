import React from 'react';
import Slider from 'react-slick';
import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import './HeroSection.css';
import logo from '../../../assets/kllogo.png';
// import image1 from '../../../../public/images/image1.png'

const HeroSection = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Flex className="hero-container" flexDirection={isMobile ? 'column' : 'row'} background="#D1C4E9">
      {/* Carousel */}
      <Box className="carousel-container" flex={isMobile ? 'none' : '1'} width={isMobile ? '100%' : '50%'}>
        <Slider {...settings}>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="400px"
            background="#D1C4E9"
          >
            <img 
              src='images/image1.png'
              alt="Slide 1"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                borderRadius: '10px'
              }} 
            />
            {/* Uncomment the following if you want to overlay text */}
            {/* <Text 
              position="absolute"
              color="white"
              fontSize="2xl"
              backgroundColor="rgba(0, 0, 0, 0.5)" 
              padding="10px"
              borderRadius="md"
            >
              Text for Image 1
            </Text> */}
          </Box>
          {/* <div className=""></div> */}
          
          
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="400px"
            background="#D1C4E9"
          >
            <img 
              src='images/image2.png'
              alt="Slide 1"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                borderRadius: '10px'
              }} 
            />
            {/* Uncomment the following if you want to overlay text */}
            {/* <Text 
              position="absolute"
              color="white"
              fontSize="2xl"
              backgroundColor="rgba(0, 0, 0, 0.5)" 
              padding="10px"
              borderRadius="md"
            >
              Text for Image 1
            </Text> */}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="400px"
            background="#D1C4E9"
          >
            <img 
              src='images/image3.png'
              alt="Slide 1"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                borderRadius: '10px'
              }} 
            />
            {/* Uncomment the following if you want to overlay text */}
            {/* <Text 
              position="absolute"
              color="white"
              fontSize="2xl"
              backgroundColor="rgba(0, 0, 0, 0.5)" 
              padding="10px"
              borderRadius="md"
            >
              Text for Image 1
            </Text> */}
          </Box>
        </Slider>
      </Box>

      {/* Text Content */}
      <Box className="text-container" flex={isMobile ? 'none' : '1'} width={isMobile ? '100%' : '50%'} padding="16px" background="#D1C4E9">
        <Text fontSize="2xl" fontWeight="bold" color="black">
          Hero Section Title
        </Text>
        <Text mt={4} color="black">
          This is a brief description or slogan that describes the content of the hero section. It will change according to the image in the carousel.
        </Text>
      </Box>
    </Flex>
  );
};

export default HeroSection;
