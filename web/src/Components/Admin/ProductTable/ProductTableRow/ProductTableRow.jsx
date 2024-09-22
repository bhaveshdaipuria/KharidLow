import React, { useState } from 'react'
import { FaEye, FaPen } from 'react-icons/fa6';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

function ProductTableRow({ product, index, setSelectedProduct, setIsPriceSlabModalOpen, setIsPreviewOpen, setIsConfirmationModalOpen }) {

    const navigate = useNavigate();
    const [isEditMode, seIsEditMode] = useState(false);

    const editProduct = () => {
        navigate('/admin/add-product', { state: { productDetails: product, isEditMode: true } });
    }

    return (
        <tr>
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
                    }} />
                </div>
            </td>
            <td className=''>
                <FaPen title='Edit Product' className='btn text-md text-blue-600 action-btns'
                    onClick={editProduct} />
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
    )
}

export default ProductTableRow
