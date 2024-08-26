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

            <CategoriesScroll></CategoriesScroll>

            <ProductScroll></ProductScroll>

            <PromotionCards></PromotionCards>

        </>
    )
}

export default Home;