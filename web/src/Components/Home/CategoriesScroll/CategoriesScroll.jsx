import './CategoriesScroll.css'
import menImage from "../../../assets/men.jpg";
import womenImage from "../../../assets/women.jpg";
import kidImage from "../../../assets/kids.jpg";
import bagImage from "../../../assets/bag.jpg";
import homeImage from "../../../assets/homefurnish.jpg";

function CategoriesScroll() {
    return (
        <>
            <div className="category-list">
                <h4 className="category-head">Categories</h4>
                <div className="scroll-container">
                    <img className="category-item" src={menImage} alt="men image" />
                    <img className="category-item" src={womenImage} alt="men image" />
                    <img className="category-item" src={kidImage} alt="men image" />
                    <img className="category-item" src={bagImage} alt="men image" />
                    <img className="category-item" src={homeImage} alt="men image" />
                    <img className="category-item" src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="" />
                </div>
            </div>
        </>
    )
}

export default CategoriesScroll;