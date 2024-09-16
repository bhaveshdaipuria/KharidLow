import { Card, CardBody, ButtonGroup, Button, CardFooter, Heading, Image, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
// import './FeatureProducts.css'
import { HomeProductData } from '../../Data/HomeProductData';
import Carousel from 'react-multi-carousel';


const ProductScroll = () => {


    const isMobile = useBreakpointValue({ base: true, md: false });


    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    return (
        <>
            <div className="product-scroll-category-list">
                <h4 className="product-scroll-category-head">Featured Products</h4>
                <div className="product-scroll-container">
                    {
                        isMobile ?
                            HomeProductData.map((data, idx) => (
                                <Card maxW='md' key={idx} className='product-category-item homeProduct '>
                                    <CardBody className='cardBodyHomeProduct'>
                                        <Image
                                            className='homeProductImage'
                                            src={data.image}
                                            borderRadius='lg'
                                        />
                                        <Stack mt='6' className='homeProductDetails' spacing='3'>
                                            <Heading size='xs' className='product-scroll-item-head'>{data.name}</Heading>
                                            <Text color='blue.600' fontSize='md'>
                                                ${data.price}
                                            </Text>
                                        </Stack>
                                    </CardBody>
                                    <CardFooter>
                                        <ButtonGroup spacing='2' className='homeProductBtnGrp'>
                                            <Button variant='solid' colorScheme='blue' fontSize='small'>
                                                Buy now
                                            </Button>
                                            <Button variant='ghost' colorScheme='blue' fontSize='small'>
                                                Add to cart
                                            </Button>
                                        </ButtonGroup>
                                    </CardFooter>
                                </Card>
                            ))
                            :
                            <Carousel
                                swipeable={true}
                                draggable={true}
                                showDots={false}
                                responsive={responsive}
                                ssr={true} // means to render carousel on server-side.
                                infinite={true}
                                autoPlay={true}
                                autoPlaySpeed={4000}
                                keyBoardControl={true}
                                customTransition="all 1s"
                                transitionDuration={100}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                            >
                                {
                                    HomeProductData.map((data, idx) => (
                                        <Card maxW='md' key={idx} className='product-category-item homeProduct '>
                                            <CardBody className='cardBodyHomeProduct'>
                                                <Image
                                                    className='homeProductImage'
                                                    src={data.image}
                                                    borderRadius='lg'
                                                />
                                                <Stack mt='6' className='homeProductDetails' spacing='3'>
                                                    <Heading size='xs' className='product-scroll-item-head'>{data.name}</Heading>
                                                    <Text color='blue.600' fontSize='md'>
                                                        ${data.price}
                                                    </Text>
                                                </Stack>
                                            </CardBody>
                                            {/* <Divider /> */}
                                            <CardFooter>
                                                <ButtonGroup spacing='2' className='homeProductBtnGrp'>
                                                    <Button variant='solid' colorScheme='blue' fontSize='small'>
                                                        Buy now
                                                    </Button>
                                                    <Button variant='ghost' colorScheme='blue' fontSize='small'>
                                                        Add to cart
                                                    </Button>
                                                </ButtonGroup>
                                            </CardFooter>
                                        </Card>
                                    ))
                                }
                            </Carousel>
                    }

                </div>
            </div>
        </>
    )
}

export default ProductScroll;