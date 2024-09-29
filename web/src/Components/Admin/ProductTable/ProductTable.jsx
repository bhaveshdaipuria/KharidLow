import React, { useEffect, useState } from "react";
import "./ProductTable.css"; // Import external CSS file
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Input, Select, useToast } from "@chakra-ui/react";
import { FaEye, FaMagnifyingGlass, FaPen } from "react-icons/fa6";
import ProductImagesModal from "../Modals/ProductImagesModal/ProductImagesModal";
import PriceSlabModal from "../Modals/PriceSlabModal/PriceSlabModal";
import { getAllProducts, getCategoryData } from "../../../Services/adminServices/productsService";
import Loader from "../../../comman/Loader/Loader";
import ProductPreviewModal from "../Modals/ProductPreviewModal/ProductPreviewModal";
import ConfirmationModal from "../Modals/ConfirmationModal/ConfirmationModal";
import { deleteProduct } from "../../../Services/adminServices/productsService";
import ProductTableRow from "./ProductTableRow/ProductTableRow";
import { useLoaderData } from "react-router-dom";

let categoryData = {};

const ProductTable = () => {
    const [allProductsData, setAllProductsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [subCatData, setSubCatData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCtaegory] = useState('');

    const [selectedProduct, setSelectedProduct] = useState("");

    const { products } = useLoaderData();

    useEffect(() => {
        // setLoading(true);


        async function fetchProducts() {
            try {
                // const res = await getAllProducts();
                setAllProductsData(products);
                console.log(allProductsData)
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    useEffect(() => {

        async function getCatData() {
            try {
                const res = await getCategoryData();
                if (res && typeof res === 'object') {
                    categoryData = res;
                    const catList = Object.keys(categoryData)
                    setCategories(() => catList);
                    setSelectedCategory(catList[0]);

                    const subCatList = Object.keys(categoryData[catList[0]]);

                    setSubCategories(() => subCatList);
                    setSelectedSubCtaegory(subCatList[0]);
                    subCatFilter();
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        if (allProductsData && (allProductsData.length > 0)) {
            getCatData();
        }

    }, [allProductsData])

    //debouncing
    useEffect(() => {
        const timeOut = setTimeout(() => {
            filter();
        }, 500);

        return () => clearTimeout(timeOut);
    }, [searchQuery, subCatData]);

    useEffect(() => {
        if (selectedCategory) {
            subCatFilter()
        }
    }, [selectedSubCategory]);

    // useEffect(() => {
    //     filter()
    // });

    const onCategoryChange = (e) => {
        const cat = e.target.value;

        setSelectedCategory(() => cat);

        console.log(cat);
        setSubCategories(() => Object.keys(categoryData[cat]));
        setSelectedSubCtaegory(() => subCategories[0]);
        subCatFilter();
    }

    const onSubCatChange = (e) => {
        const subCat = e.target.value;
        setSelectedSubCtaegory(() => subCat);
        subCatFilter();
    }

    const filter = () => {
        if (!searchQuery) {
            setFilteredData(subCatData)
        } else {
            setFilteredData(subCatData.filter((product) =>
                (product.productName && product.productName.toLowerCase().includes(searchQuery.toLowerCase()))
                || (product.sku && product.sku.toLowerCase().includes(searchQuery.toLowerCase()))
                || (product.item && product.item.toLowerCase().includes(searchQuery.toLowerCase()))
            ));
        }
    }

    const subCatFilter = () => {
        if (allProductsData && allProductsData.length) {
            console.log(allProductsData);
            setSubCatData(() => allProductsData.filter(obj => obj.subCategory === selectedSubCategory));
            filter();
        }
    }

    const [isPriceSlabModalOpen, setIsPriceSlabModalOpen] = useState(false);
    const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);

    const toast = useToast();

    const removeProd = async () => {
        try {
            console.log(selectedProduct);
            const res = await deleteProduct(selectedProduct._id);

            if (res.success) {
                setAllProductsData((prev) => prev.filter((item) => item._id !== selectedProduct._id));
                toast({
                    title: 'Product Deleted Successfully',
                    status: 'success',
                    isClosable: true
                });
            }

        } catch (err) {
            console.log(err);
            toast({
                title: 'Product Deletion Failed',
                status: 'error',
                isClosable: true
            });
        }

    };

    const onSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(() => query);
    }

    return (
        <>
            <div className="product-table-container">
                <main className="product-table-main">
                    <div className="product-table-wrapper">
                        <div className="product-table-card">
                            <header className="product-table-header">
                                <h2>Product List</h2>
                                <div className="table-operations grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="category-filters grid gap-2 grid-cols-2 ">
                                        <Select size="xs" value={selectedCategory} onChange={onCategoryChange}>

                                            <option value='' key='0' disabled>Select Category</option>
                                            {
                                                categories && categories.map((cat) => <option value={cat} key={cat}>{cat}</option>)
                                            }
                                        </Select>
                                        <Select size="xs" value={selectedSubCategory}
                                            onChange={onSubCatChange}>
                                            <option value='' key='0' disabled>Select Sub Category</option>
                                            {
                                                subCategories && subCategories.map((subCat) => <option value={subCat} key={subCat}>{subCat}</option>)
                                            }
                                        </Select>

                                    </div>
                                    <div className="search-filters grid gap-2 grid-cols-1 ">
                                        <div className="search-filter-input">
                                            {searchQuery && <FaMagnifyingGlass className='text-sm search-icon' />}
                                            <Input placeholder='Search' size='xs' value={searchQuery} onChange={onSearch} />
                                        </div>

                                    </div>
                                </div>
                            </header>
                            <div className="product-table-content">
                                <div className="product-table-table-container">
                                    <table className="product-table-table">
                                        <thead>
                                            <tr>
                                                <th><div className="text-center">#</div></th>
                                                <th><div className="text-center">Image</div></th>
                                                <th><div className="text-center">Name</div></th>
                                                <th><div className="text-center">SKU</div></th>
                                                <th><div className="text-center">Item Type</div></th>
                                                <th><div className="text-center">Price <small className="text-2xs">(each unit)</small> </div></th>
                                                <th><div className="text-center">Discount<small className="text-2xs">(each unit)</small></div></th>
                                                <th><div className="text-center">Net Price<small className="text-2xs">(each unit)</small></div></th>
                                                <th><div className="text-center">Price Slabs</div></th>
                                                <th><div className="text-center">Stock Quantity</div></th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {
                                            (filteredData && filteredData.length) ?
                                                <tbody>
                                                    {filteredData.map((product, index) => (
                                                        <ProductTableRow key={index} product={product} index={index}
                                                            setSelectedProduct={setSelectedProduct}
                                                            setIsAddImageModalOpen={setIsAddImageModalOpen}
                                                            setIsPriceSlabModalOpen={setIsPriceSlabModalOpen}
                                                            setIsPreviewOpen={setIsPreviewOpen}
                                                            setIsConfirmationModalOpen={setIsConfirmationModalOpen}
                                                            setAllProductsData={setAllProductsData}
                                                        />
                                                    ))}
                                                </tbody> : ''
                                        }
                                    </table>
                                    {
                                        (!filteredData || !filteredData.length) && <div className="w-full text-center no-data-found text-gray-700"> -----No Data Found-----</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>


            {/* modals */}
            {
                isAddImageModalOpen && <ProductImagesModal productDetails={selectedProduct} isOpen={isAddImageModalOpen} setIsOpen={setIsAddImageModalOpen}></ProductImagesModal>
            }
            {
                isPriceSlabModalOpen && <PriceSlabModal isOpen={isPriceSlabModalOpen} setIsOpen={setIsPriceSlabModalOpen}></PriceSlabModal>
            }
            {
                isPreviewOpen && <ProductPreviewModal isOpen={isPreviewOpen} setIsOpen={setIsPreviewOpen} productDetails={selectedProduct}></ProductPreviewModal>
            }
            {
                isConfirmationModalOpen && <ConfirmationModal isOpen={isConfirmationModalOpen} setIsOpen={setIsConfirmationModalOpen}
                    confirmationPass={'Confirm'} action={'Do you really want to delete this item?'}
                    onConfirmation={removeProd}></ConfirmationModal>
            }


            {/* Loader */}
            <Loader show={loading}></Loader>
        </>
    );
};

export default ProductTable;
