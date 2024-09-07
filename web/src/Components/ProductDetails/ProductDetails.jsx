
import { FaRegHeart, FaRegStar, FaStar } from 'react-icons/fa6'
import './ProductDetails.css'
import CountCalculator from '../../comman/CountCalculator/CountCalculator'
import { Button, ButtonGroup } from '@chakra-ui/react'

function ProductDetails() {
    return (
        <>
            <div className="product-details">
                <div className="product-details-inner">
                    <div className="product-view">
                        <div className="product-view-inner">
                            <div className="product-main-image">
                                <img src="	https://getketchadmin.getketch.com/product/8909107424479/300/HLTS005214_1.jpg" alt="" />
                            </div>
                            <div className="product-other-image">
                                <div className="other-img">
                                    <img src="	https://getketchadmin.getketch.com/product/8909107424479/300/HLTS005214_1.jpg" alt="" />
                                </div>
                                <div className="other-img">
                                    <img src="	https://getketchadmin.getketch.com/product/8909107424479/300/HLTS005214_1.jpg" alt="" />
                                </div>
                                <div className="other-img">
                                    <img src="	https://getketchadmin.getketch.com/product/8909107424479/300/HLTS005214_1.jpg" alt="" />
                                </div>
                                <div className="other-img">
                                    <img src="	https://getketchadmin.getketch.com/product/8909107424479/300/HLTS005214_1.jpg" alt="" />
                                </div>
                                <div className="other-img">
                                    <img src="	https://getketchadmin.getketch.com/product/8909107424479/300/HLTS005214_1.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-desciption">
                        <div className="product-intro">
                            <div className="head-n-wishlist">
                                <div className="headings">
                                    <h3>
                                        <b>Product Name</b>
                                    </h3>
                                    <div className="product-tagline">
                                        Tag Line about the product
                                    </div>
                                    <div className="product-rating">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaRegStar />
                                        <FaRegStar />
                                    </div>
                                    <div className="price-n-discount">
                                        <span className="price">999</span>
                                        <sup className="discount">20% OFF</sup>
                                        <span className="discounted-price">799</span>
                                    </div>
                                </div>

                                <div className="wishlist-btn" title='Add to wishlist'>
                                    <FaRegHeart size={25} className='wishlist-icon' />
                                </div>

                            </div>

                            <CountCalculator></CountCalculator>

                            <div className="product-variations">
                                <div className="variation-heading">Sizes</div>
                                <div className="variation-items">
                                    <div className="item">28</div>
                                    <div className="item">30</div>
                                    <div className="item">32</div>
                                    <div className="item">34</div>
                                    <div className="item">36</div>
                                    <div className="item">38</div>
                                </div>
                            </div>
                            <div className="product-variations">
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
                            </div>
                            <ButtonGroup spacing='2' className='product-buttons'>
                                <Button variant='solid' colorScheme='blue' fontSize='medium'>
                                    Buy now
                                </Button>
                                <Button variant='ghost' colorScheme='blue' fontSize='medium'>
                                    Add to cart
                                </Button>
                            </ButtonGroup>

                            <div className="product-summary">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam et sunt, aut magnam nostrum qui numquam eligendi voluptas consequuntur quod veritatis iusto amet deleniti aspernatur animi inventore nemo earum possimus consectetur dolor modi voluptates nobis? At ex alias quos esse quaerat, distinctio dignissimos beatae doloribus minus, totam sit aliquam, recusandae exercitationem qui deleniti possimus expedita cupiditate ab deserunt consequatur minima nam illo sint. Nam, optio dolorum asperiores earum, sit quidem natus dolores aperiam voluptatem voluptas, itaque quis labore quas omnis!
                            </div>

                            {/* <div className="key-highlights"> */}
                                <div class="highlights-container">
                                    <h2>Key Highlights</h2>
                                    <div class="row">
                                        <div class="highlight-item">
                                            <span class="label">Design</span>
                                            <span class="value">Graphic Print</span>
                                        </div>
                                        <div class="highlight-item">
                                            <span class="label">Fit</span>
                                            <span class="value">Oversized Fit</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="highlight-item">
                                            <span class="label">Neck</span>
                                            <span class="value">Round Neck</span>
                                        </div>
                                        <div class="highlight-item">
                                            <span class="label">Occasion</span>
                                            <span class="value">Casual Wear</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="highlight-item">
                                            <span class="label">Sleeve Style</span>
                                            <span class="value">Half Sleeve</span>
                                        </div>
                                        <div class="highlight-item">
                                            <span class="label">Wash Care</span>
                                            <span class="value">Gentle Machine Wash</span>
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