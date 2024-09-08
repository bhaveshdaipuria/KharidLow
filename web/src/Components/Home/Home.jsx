import Footer from "../../comman/Footer/Footer";
import ProductScroll from "../../comman/ProductScroll/ProductScroll";
import CategoriesScroll from "./CategoriesScroll/CategoriesScroll";
import HeroSection from "./HeroSection/HeroSection";
import './Home.css'
import PromotionCards from "./PromotionCards/PromotionCards";

function Home() {
    return (
        <>
            {/* Hero Section */}
            <HeroSection>

            </HeroSection>

            <PromotionCards></PromotionCards>

            <CategoriesScroll></CategoriesScroll>

            <ProductScroll></ProductScroll>

        </>
    )
}

export default Home;