import {
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaCross, FaEye, FaPen, FaThumbsUp } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./ProductTableRow.css";
import { CiCircleRemove } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { updateStock } from "../../../../Services/adminServices/productsService";
import { BACKEND } from "../../../../lib/config";

function ProductTableRow({ product, index, setIsAddImageModalOpen, setSelectedProduct, setIsPriceSlabModalOpen, setIsPreviewOpen, setIsConfirmationModalOpen,
    setAllProductsData
}) {
  const navigate = useNavigate();
  const [isStockEditMode, setIsStockEditMode] = useState(false);
  const [stock, setStock] = useState(0);

  const handleStockChange = (e) => {
    console.log(e);
    setStock(e);
  };

  const updateProductStock = async () => {
    try {
      const res = await updateStock(product._id, { stock: stock });
      if (res) {
        setAllProductsData((prev) =>
          prev.map((item) =>
            item._id === product._id ? { ...item, stock: stock } : item,
          ),
        );
      }
    } catch (err) {
      console.log(arr);
    } finally {
      setIsStockEditMode(false);
    }

   
  };

  const editProduct = () => {
    navigate('/admin/add-product', {
        state: {
            productDetails: {
                ...product,
                keyHighlights: (product.keyHighlights && (product.keyHighlights.length > 0)) ?JSON.parse(product.keyHighlights) : [],
                // keyHighlights: product.keyHighlights?JSON.parse(product.keyHighlights):[]
            }, isEditMode: true
        }
    });
}

  const openStockEditMode = () => {
    setSelectedProduct(product);
    const stock = product.stock || 0;
    setStock(stock);
    setIsStockEditMode(true);
  };

  return (
    <tr>
      <td>
        <div className="text-center">{index + 1}</div>
      </td>
      <td>
        <div className="text-center flex justify-center">
          <div className="product-image" onClick={() => {
            setSelectedProduct(product)
            setIsAddImageModalOpen(true)
            }}>
            <img
              src={`${BACKEND.API_URL}/products/productimage/${product.mainImage}`}
              alt="Product Main Image"
              className="image-view"
            />
          </div>
        </div>
      </td>
      <td>
        <div className="text-center text-capitalize">{product.productName}</div>
      </td>
      <td>
        <div className="text-center">{product.sku}</div>
      </td>
      <td>
        <div className="text-center text-capitalize">{product.item}</div>
      </td>
      <td className="text-emerald">
        <div className="text-center">{product.basePrice} rs</div>
      </td>
      <td className="text-emerald">
        <div className="text-center">{product.baseDiscount}%</div>
      </td>
      <td className="text-emerald">
        <div className="text-center">
          {product.basePrice - (product.baseDiscount / 100) * product.basePrice}{" "}
          rs
        </div>
      </td>
      <td className="text-red text-center">
        <div className="text-center">
          <FaPen
            title="Edit Product"
            className="btn text-md text-blue-600 action-btns"
            onClick={() => {
              setSelectedProduct(product);
              setIsPriceSlabModalOpen(true);
            }}
          />
        </div>
      </td>
      <td className="text-red">
        <div
          className="text-center edit-stock-container"
          style={{ fontWeight: 500 }}
        >
          {/* {product.stock}  */}
          {isStockEditMode ? (
            <>
              <NumberInput
                size="xs"
                style={{ width: "130px" }}
                name="stock"
                value={stock}
                onChange={(e) => {
                  handleStockChange(e);
                }}
              >
                <NumberInputField placeholder="Stock Quantity" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FaThumbsUp
                title="Save"
                className="mx-2 btn text-sm text-blue-600 action-btns"
                onClick={updateProductStock}
              />
              <RxCrossCircled
                title="Cancle"
                className="mx-2 btn text-sm text-red-600 action-btns"
                onClick={(e) => {
                  setIsStockEditMode(false);
                }}
              />
            </>
          ) : (
            <>
              {product.stock || 0}
              <FaPen
                title="Edit Stock"
                className="mx-2 btn text-sm text-blue-600 action-btns"
                onClick={openStockEditMode}
              />
            </>
          )}
        </div>
      </td>
      <td className="">
        <FaPen
          title="Edit Product"
          className="btn text-md text-blue-600 action-btns"
          onClick={editProduct}
        />
        <FaEye
          title="Preview"
          className="btn text-md text-blue-600 action-btns"
          onClick={() => {
            setSelectedProduct(product);
            setIsPreviewOpen(true);
          }}
        />
        <RiDeleteBin5Fill
          onClick={() => {
            setSelectedProduct(product);
            setIsConfirmationModalOpen(true);
          }}
          title="Delete Item"
          className="btn text-md text-red-600 action-btns"
        ></RiDeleteBin5Fill>
      </td>
    </tr>
  );
}

export default ProductTableRow;
