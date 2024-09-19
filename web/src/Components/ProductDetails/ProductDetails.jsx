
import { FaRegHeart, FaRegStar, FaStar } from 'react-icons/fa6'
import './ProductDetails.css'
import CountCalculator from '../../comman/CountCalculator/CountCalculator'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useState } from 'react'

function ProductDetails({ productDetails }) {

    //var for deciding active image src of the imges
    const [activeImageSrc, setActiveImageSrc] = useState('');
    return (
        <>
            {console.log(productDetails)}
            <div className="product-details">
                <div className="product-details-inner">
                    <div className="product-view">
                        <div className="product-view-inner">
                            <div className="product-main-image">
                                <img src="https://getketchadmin.getketch.com/product/8909107424479/300/HLTS005214_1.jpg" alt="" />
                            </div>
                            <div className="product-other-image">
                                <img src={productDetails.mainImage} alt="Product Main Image" />
                                {
                                    productDetails && productDetails.productImages && productDetails.productImages.map((img) => (<div className="other-img">
                                        <img src="	https://getketchadmin.getketch.com/product/8909107424479/300/HLTS005214_1.jpg"
                                            onClick={() => { setActiveImageSrc(img) }}
                                            alt="" />
                                    </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="product-desciption">
                        <div className="product-intro">
                            <div className="head-n-wishlist">
                                <div className="headings">
                                    <h3>
                                        <b>{productDetails && productDetails.productName}</b>
                                    </h3>
                                    <div className="product-tagline">
                                        {productDetails && productDetails.subHead}
                                    </div>
                                    <div className="product-rating">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaRegStar />
                                        <FaRegStar />
                                    </div>
                                    <div className="price-n-discount">
                                        <span className="price">{productDetails && productDetails.basePrice}</span>
                                        <sup className="discount">{productDetails && productDetails.baseDiscount}% OFF</sup>
                                        <span className="discounted-price">799</span>
                                    </div>
                                </div>

                                <div className="wishlist-btn" title='Add to wishlist'>
                                    <FaRegHeart size={25} className='wishlist-icon' />
                                </div>

                            </div>

                            <CountCalculator></CountCalculator>

                            {/* <div className="product-variations">
                                <div className="variation-heading">Sizes</div>
                                <div className="variation-items">
                                    <div className="item">28</div>
                                    <div className="item">30</div>
                                    <div className="item">32</div>
                                    <div className="item">34</div>
                                    <div className="item">36</div>
                                    <div className="item">38</div>
                                </div>
                            </div> */}
                            {/* <div className="product-variations">
                                <div className="variation-heading">Colors</div>
                                <div className="variation-items">
                                    <div className="item"></div>
                                    <div className="item"></div>
                                    <div className="item"></div>
                                    <div className="item"></div>
                                    <div className="item"></div>
                                    <div className="item"></div>
                                    <div className="item"></div>
                                    <div className="item"></div>
                                </div>
                            </div> */}
                            <ButtonGroup spacing='2' className='product-buttons'>
                                <Button variant='solid' colorScheme='blue' fontSize='medium'>
                                    Buy now
                                </Button>
                                <Button variant='ghost' colorScheme='blue' fontSize='medium'>
                                    Add to cart
                                </Button>
                            </ButtonGroup>

                            <div className="product-summary">
                                {productDetails && productDetails.summary}
                            </div>

                            {/* <div className="key-highlights"> */}
                            <div className="highlights-container">
                                <h2>Key Highlights</h2>
                                <div className="row">
                                    <div className="highlight-item">
                                        <span className="label">Design</span>
                                        <span className="value">Graphic Print</span>
                                    </div>
                                    <div className="highlight-item">
                                        <span className="label">Fit</span>
                                        <span className="value">Oversized Fit</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="highlight-item">
                                        <span className="label">Neck</span>
                                        <span className="value">Round Neck</span>
                                    </div>
                                    <div className="highlight-item">
                                        <span className="label">Occasion</span>
                                        <span className="value">Casual Wear</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="highlight-item">
                                        <span className="label">Sleeve Style</span>
                                        <span className="value">Half Sleeve</span>
                                    </div>
                                    <div className="highlight-item">
                                        <span className="label">Wash Care</span>
                                        <span className="value">Gentle Machine Wash</span>
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProductDetails