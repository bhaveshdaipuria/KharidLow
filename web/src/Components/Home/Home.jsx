import ProductScroll from "../../comman/ProductScroll/ProductScroll";
import HeroSection from "./HeroSection/HeroSection";
import './Home.css'

function Home() {
    return (
        <>
            {/* Hero Section */}
            <HeroSection>

            </HeroSection>

            <div className="category-list">
                <h4 className="category-head">Categories</h4>
                <div className="scroll-container">
                    <div className="category-item">1</div>
                    <div className="category-item">2</div>
                    <div className="category-item">3</div>
                    <div className="category-item">4</div>
                    <div className="category-item">5</div>
                    <div className="category-item">6</div>
                </div>
            </div>

            <ProductScroll></ProductScroll>


        </>
    )
}

export default Home;