// import Header from "comman/Header";
import { AiFillStar } from "react-icons/ai";
import { BsFillBagHeartFill } from "react-icons/bs";
import "./Category.css"
import Recommended from "../../comman/RecommendedCategory/Recommend";
import Sidebar from "../../comman/SidebarCategory/Sidebar";
import { useBreakpointValue } from "@chakra-ui/react";

// import categoryData  from "../../Data/CategoryData";

function Registration() {

    const isMobile = useBreakpointValue({ base: true, md: false });


    return (
        <>
            {
                !isMobile && <>
                    <Sidebar />
                    <Recommended />
                </>
            }
            <div className="card-container" >
                <div className="card">
                    <img src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg" className="card-img" />
                    <div className="card-details">
                        <h3 className="card-title">
                            Shoe
                        </h3>
                        <div className="card-reviews">
                            <AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" />
                            <spna className="total-reviews">4</spna>
                        </div>
                        <div className="card-price">
                            <div className="price">
                                <del>$300</del> 200
                            </div>
                            <div className="bag">
                                <BsFillBagHeartFill className="bag-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg" className="card-img" />
                    <div className="card-details">
                        <h3 className="card-title">
                            Shoe
                        </h3>
                        <div className="card-reviews">
                            <AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" />
                            <spna className="total-reviews">4</spna>
                        </div>
                        <div className="card-price">
                            <div className="price">
                                <del>$300</del> 200
                            </div>
                            <div className="bag">
                                <BsFillBagHeartFill className="bag-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg" className="card-img" />
                    <div className="card-details">
                        <h3 className="card-title">
                            Shoe
                        </h3>
                        <div className="card-reviews">
                            <AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" />
                            <spna className="total-reviews">4</spna>
                        </div>
                        <div className="card-price">
                            <div className="price">
                                <del>$300</del> 200
                            </div>
                            <div className="bag">
                                <BsFillBagHeartFill className="bag-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg" className="card-img" />
                    <div className="card-details">
                        <h3 className="card-title">
                            Shoe
                        </h3>
                        <div className="card-reviews">
                            <AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" />
                            <spna className="total-reviews">4</spna>
                        </div>
                        <div className="card-price">
                            <div className="price">
                                <del>$300</del> 200
                            </div>
                            <div className="bag">
                                <BsFillBagHeartFill className="bag-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg" className="card-img" />
                    <div className="card-details">
                        <h3 className="card-title">
                            Shoe
                        </h3>
                        <div className="card-reviews">
                            <AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" />
                            <spna className="total-reviews">4</spna>
                        </div>
                        <div className="card-price">
                            <div className="price">
                                <del>$300</del> 200
                            </div>
                            <div className="bag">
                                <BsFillBagHeartFill className="bag-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg" className="card-img" />
                    <div className="card-details">
                        <h3 className="card-title">
                            Shoe
                        </h3>
                        <div className="card-reviews">
                            <AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" />
                            <spna className="total-reviews">4</spna>
                        </div>
                        <div className="card-price">
                            <div className="price">
                                <del>$300</del> 200
                            </div>
                            <div className="bag">
                                <BsFillBagHeartFill className="bag-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg" className="card-img" />
                    <div className="card-details">
                        <h3 className="card-title">
                            Shoe
                        </h3>
                        <div className="card-reviews">
                            <AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" />
                            <spna className="total-reviews">4</spna>
                        </div>
                        <div className="card-price">
                            <div className="price">
                                <del>$300</del> 200
                            </div>
                            <div className="bag">
                                <BsFillBagHeartFill className="bag-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg" className="card-img" />
                    <div className="card-details">
                        <h3 className="card-title">
                            Shoe
                        </h3>
                        <div className="card-reviews">
                            <AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" />
                            <spna className="total-reviews">4</spna>
                        </div>
                        <div className="card-price">
                            <div className="price">
                                <del>$300</del> 200
                            </div>
                            <div className="bag">
                                <BsFillBagHeartFill className="bag-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg" className="card-img" />
                    <div className="card-details">
                        <h3 className="card-title">
                            Shoe
                        </h3>
                        <div className="card-reviews">
                            <AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" />
                            <spna className="total-reviews">4</spna>
                        </div>
                        <div className="card-price">
                            <div className="price">
                                <del>$300</del> 200
                            </div>
                            <div className="bag">
                                <BsFillBagHeartFill className="bag-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg" className="card-img" />
                    <div className="card-details">
                        <h3 className="card-title">
                            Shoe
                        </h3>
                        <div className="card-reviews">
                            <AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" />
                            <spna className="total-reviews">4</spna>
                        </div>
                        <div className="card-price">
                            <div className="price">
                                <del>$300</del> 200
                            </div>
                            <div className="bag">
                                <BsFillBagHeartFill className="bag-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg" className="card-img" />
                    <div className="card-details">
                        <h3 className="card-title">
                            Shoe
                        </h3>
                        <div className="card-reviews">
                            <AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" />
                            <spna className="total-reviews">4</spna>
                        </div>
                        <div className="card-price">
                            <div className="price">
                                <del>$300</del> 200
                            </div>
                            <div className="bag">
                                <BsFillBagHeartFill className="bag-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg" className="card-img" />
                    <div className="card-details">
                        <h3 className="card-title">
                            Shoe
                        </h3>
                        <div className="card-reviews">
                            <AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" />
                            <spna className="total-reviews">4</spna>
                        </div>
                        <div className="card-price">
                            <div className="price">
                                <del>$300</del> 200
                            </div>
                            <div className="bag">
                                <BsFillBagHeartFill className="bag-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg" className="card-img" />
                    <div className="card-details">
                        <h3 className="card-title">
                            Shoe
                        </h3>
                        <div className="card-reviews">
                            <AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" /><AiFillStar className="ratings-start" />
                            <spna className="total-reviews">4</spna>
                        </div>
                        <div className="card-price">
                            <div className="price">
                                <del>$300</del> 200
                            </div>
                            <div className="bag">
                                <BsFillBagHeartFill className="bag-icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration;