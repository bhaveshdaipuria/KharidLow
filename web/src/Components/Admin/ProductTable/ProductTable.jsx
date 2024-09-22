import React, { useEffect, useState } from "react";
import "./ProductTable.css"; // Import external CSS file
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Input, Select } from "@chakra-ui/react";
import { FaEye, FaMagnifyingGlass, FaPen } from "react-icons/fa6";
import ProductImagesModal from "../Modals/ProductImagesModal/ProductImagesModal";
import PriceSlabModal from "../Modals/PriceSlabModal/PriceSlabModal";
import { getAllProducts } from "../../../Services/adminServices/productsService";
import Loader from "../../../comman/Loader/Loader";
import ProductPreviewModal from "../Modals/ProductPreviewModal/ProductPreviewModal";
import ConfirmationModal from "../Modals/ConfirmationModal/ConfirmationModal";
import { deleteProduct } from "../../../Services/adminServices/productsService";
import ProductTableRow from "./ProductTableRow/ProductTableRow";

const ProductTable = () => {
    const [allProductsData, setAllProductsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState("");

    useEffect(() => {
        setLoading(true);

        async function fetchProducts() {
            try {
                const res = await getAllProducts();
                setLoading(false);
                setAllProductsData(res);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const [isPriceSlabModalOpen, setIsPriceSlabModalOpen] = useState(false);
    const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);

    const delProduct = async (id) => {
        await deleteProduct(id)
            .then((res) => {
                setAllProductsData((prev) => prev.filter((item) => item._id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                                        <Select placeholder="Select Category" size="xs">
                                            <option>United Arab Emirates</option>
                                            <option>Nigeria</option>
                                        </Select>
                                        <Select placeholder="Select Category" size="xs">
                                            <option>United Arab Emirates</option>
                                            <option>Nigeria</option>
                                        </Select>

                                    </div>
                                    <div className="search-filters grid gap-2 grid-cols-2 ">
                                        <div className="search-filter-input">
                                            <FaMagnifyingGlass className='text-sm search-icon' />
                                            <Input placeholder='Search' size='xs' />
                                        </div>

                                        <Select placeholder='Filter' size='xs'>
                                            <option>United Arab Emirates</option>
                                            <option>Nigeria</option>
                                        </Select>

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
                                                <th><div className="text-center">Price</div></th>
                                                <th><div className="text-center">Discount</div></th>
                                                <th><div className="text-center">Price Slabs</div></th>
                                                <th><div className="text-center">Stock Quantity</div></th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {
                                            (allProductsData && allProductsData.length) ?
                                                <tbody>
                                                    {allProductsData.map((product, index) => (
                                                        <ProductTableRow key={index} product={product} index={index}
                                                            setSelectedProduct={setSelectedProduct}
                                                            setIsPriceSlabModalOpen={setIsPriceSlabModalOpen}
                                                            setIsPreviewOpen={setIsPreviewOpen}
                                                            setIsConfirmationModalOpen={setIsConfirmationModalOpen}
                                                        />
                                                    ))}
                                                </tbody> : ''
                                        } 
                                    </table>
                                    {
                                        (!allProductsData || !allProductsData.length) && <div className="w-full text-center no-data-found text-gray-700"> -----No Data Found-----</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>


            {/* modals */}
            {
                isAddImageModalOpen && <ProductImagesModal isOpen={isAddImageModalOpen} setIsOpen={setIsAddImageModalOpen}></ProductImagesModal>
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
                    onConfirmation={() => { deleteProduct(selectedProduct._id) }}></ConfirmationModal>
            }


            {/* Loader */}
            <Loader show={loading}></Loader>
        </>
    );
};

export default ProductTable;
