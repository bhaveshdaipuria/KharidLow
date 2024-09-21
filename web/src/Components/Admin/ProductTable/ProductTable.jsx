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

const ProductTable = () => {
	const [allProductsData, setAllProductsData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

	const [selectedProduct, setSelectedProduct] = useState("");

	useEffect(() => {
		setLoading(true);
		getAllProducts()
			.then((res) => {
				setLoading(false);
				setAllProductsData(res);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	}, []);

	const [isPriceSlabModalOpen, setIsPriceSlabModalOpen] = useState(false);
	const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);

	const makeStockEditable = (_e, index) => {
		console.log(index);
	};

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
                                        <tbody>
                                            {allProductsData.map((product, index) => (
                                                <tr key={index}>
                                                    <td><div className="text-center">{index + 1}</div></td>
                                                    <td>
                                                        <div className="text-center flex justify-center">
                                                            <div className="product-image">
                                                                <img src={`http://localhost:3000/${product.mainImage}`} alt="Product Main Image" className="image-view" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><div className="text-center text-capitalize">{product.productName}</div></td>
                                                    <td><div className="text-center">{product.sku}</div></td>
                                                    <td><div className="text-center text-capitalize">{product.item}</div></td>
                                                    <td className="text-emerald"><div className="text-center">{product.basePrice}</div></td>
                                                    <td className="text-emerald"><div className="text-center">{product.baseDiscount}%</div></td>
                                                    <td className="text-red text-center" >
                                                        <div className="text-center">
                                                            <FaPen title='Edit Product' className='btn text-md text-blue-600 action-btns' onClick={() => {
                                                                setSelectedProduct(product);
                                                                setIsPriceSlabModalOpen(true)
                                                            }} />
                                                        </div>
                                                    </td>
                                                    <td className="text-red">
                                                        <div className="text-center" style={{ fontWeight: 500 }}>
                                                            {/* {product.stock}  */}
                                                            11
                                                            <FaPen title='Edit Stock' className='mx-2 btn text-sm text-blue-600 action-btns' onClick={(e) => {
                                                                setSelectedProduct(product);
                                                                makeStockEditable(e, index)
                                                            }} />
                                                        </div>
                                                    </td>
                                                    <td className=''>
                                                        <FaPen title='Edit Product' className='btn text-md text-blue-600 action-btns' />
                                                        <FaEye title='Preview' className='btn text-md text-blue-600 action-btns'
                                                            onClick={() => {
                                                                setSelectedProduct(product);
                                                                setIsPreviewOpen(true)
                                                            }}
                                                        />
                                                        <RiDeleteBin5Fill
                                                            onClick={() => {
                                                                setSelectedProduct(product);
                                                                setIsConfirmationModalOpen(true)
                                                            }
                                                            }
                                                            title='Delete Item' className='btn text-md text-red-600 action-btns'></RiDeleteBin5Fill>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
