import { Row, Col } from 'react-bootstrap';
import FeatureProducts from "../../comman/FeatureProducts/FeatureProducts"
import Footer from "../../comman/Footer/Footer";
import ProductScroll from "../../comman/ProductScroll/ProductScroll";
import CategoriesScroll from "./CategoriesScroll/CategoriesScroll";
import HeroSection from "./HeroSection/HeroSection";
import './Home.css'
import PromotionCards from "./PromotionCards/PromotionCards";
import { CiLocationOn } from "react-icons/ci";
import { BiTransfer } from "react-icons/bi";
import { FaEarthEurope } from "react-icons/fa6";
import { IoLockClosedOutline } from "react-icons/io5";
import newsImg from "../../assets/productImages/newsLetter.png"
import Testimonial from '../../comman/Testimonial/Testimonial';

function Home() {
    return (
        <>
            {/* Hero Section */}
            <HeroSection />
            <PromotionCards />
            <CategoriesScroll />
            <ProductScroll />
            <FeatureProducts />

            {/* service section */}
                <div className="homeServiceSection">
                    <Row>
                        <Col xs={12} md={3}>
                            <div className='homeServiceCard shipping'>
                                <div className='homeServiceIcon'>
                                    <CiLocationOn />
                                </div>
                                <div className='homeServiceDetails'>
                                    <h5>Free Shipping</h5>
                                    <p>On all orders above 495.00</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={3}>
                            <div className='homeServiceCard easyReturn'>
                                <div className='homeServiceIcon'>
                                    <BiTransfer />
                                </div>
                                <div className='homeServiceDetails'>
                                    <h5>Earn Returns</h5>
                                    <p>Easy return & refund policy</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={3}>
                            <div className='homeServiceCard fastShipping'>
                                <div className='homeServiceIcon'>
                                    <FaEarthEurope />
                                </div>
                                <div className='homeServiceDetails'>
                                    <h5>Fash Shipping</h5>
                                    <p>Order by 2 pm; same day dispatch</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={3}>
                            <div className='homeServiceCard checkout'>
                                <div className='homeServiceIcon'>
                                    <IoLockClosedOutline />
                                </div>
                                <div className='homeServiceDetails'>
                                    <h5>100% secure Checkout</h5>
                                    <p>UPI / Bank Transfer / Card / Wallet</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>


            {/* news letter */}
            <div className='homeNewsLetterServices'>
                <Row>
                    <Col xs={12} lg={8} >
                        <div className='homeLeftNewsLetter'>
                            <div className='homeNewsHeading'>
                                Subscribe For Our LOTS Mailer To Get Best Offers
                            </div>
                            <div className='homeLeftInput my-2 '>
                                <input className='mx-2' placeholder='Enter your email id here' />
                                <input className='mx-2' placeholder='Enter your mobile number' />
                                <button className='mx-2' >SUBSCRIBE</button>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} lg={4} >
                        <div className='homeRightNewsLetter'>
                            <div className='homeNewsLetterImg'>
                                <img src={newsImg} alt="newsImg" />
                            </div>
                            <div className='homeRightData'>
                                <h4 className='mobile'>1860-123-5687</h4>
                                <h5 className='email' >contactus@cpwi.in</h5>
                                <h6 className='time'>Everyday 9:00 AM - 6:00 PM</h6>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>


            {/* testimonial */}
            <Testimonial />
        </>
    )
}

export default Home;