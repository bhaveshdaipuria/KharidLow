import './CategoriesScroll.css'
import { HomeCategoryData } from "../../../Data/HomeCategoryData";



function CategoriesScroll() {
    return (
        <>
            <div className="category-list">
                <h4 className="category-head">Categories</h4>
                <div className="scroll-container">

                    {
                        HomeCategoryData.map((dt, ind) => (
                            <div className='tets' key={ind}>
                                <img className="home-category-item " src={dt.image} alt="cat-image" />
                                <p className='homeCategoryTitle' >{dt.name}</p>
                            </div>
                        ))
                    }

                    {/* <img className="category-item" src={womenImage} alt="men image" />
                    <img className="category-item" src={kidImage} alt="men image" />
                    <img className="category-item" src={bagImage} alt="men image" />
                    <img className="category-item" src={homeImage} alt="men image" />
                    <img className="category-item" src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="" /> */}

                </div>
            </div>
        </>
    )
}

export default CategoriesScroll;