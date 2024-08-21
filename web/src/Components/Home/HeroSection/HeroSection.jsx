import React from 'react';
import Slider from 'react-slick';
import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import './HeroSection.css';

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
    <Flex className="hero-container" flexDirection={isMobile ? 'column' : 'row'}>
      {/* Carousel */}
      <Box className="carousel-container" flex={isMobile ? 'none' : '1'} width={isMobile ? '100%' : '50%'}>
        <Slider {...settings}>
          <Box className="carousel-slide" style={{ backgroundImage: "url('../../../public/images/image1.jpg')" }}>
            <Text className="carousel-text">Text for Image 1</Text>
          </Box>
          <Box className="carousel-slide" style={{ backgroundImage: "url('/images/image2.jpg')" }}>
            <Text className="carousel-text">Text for Image 2</Text>
          </Box>
          <Box className="carousel-slide" style={{ backgroundImage: "url('/images/image3.jpg')" }}>
            <Text className="carousel-text">Text for Image 3</Text>
          </Box>
        </Slider>
      </Box>

      {/* Text Content */}
      <Box className="text-container" flex={isMobile ? 'none' : '1'} width={isMobile ? '100%' : '50%'} padding="16px">
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
